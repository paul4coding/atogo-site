import { createReadStream } from "node:fs"
import { mkdir, stat, unlink, writeFile } from "node:fs/promises"
import path from "node:path"
import { Readable } from "node:stream"

/**
 * Stockage de fichiers sur disque — remplace Supabase Storage.
 *
 * Les trois « buckets » deviennent trois sous-dossiers de STORAGE_DIR :
 *   cvs         → PRIVÉ  : CV, lettres de motivation, dossiers AO (.zip)
 *   tender-docs → PUBLIC : cahiers des charges
 *   news-images → PUBLIC : images des actualités
 *
 * « Privé » ne dépend plus d'une politique RLS : le dossier n'est servi par
 * aucun chemin statique. Le seul accès est `/api/admin/files/<nom>`, qui exige
 * une session admin valide. Les buckets publics passent par `/api/files/...`.
 *
 * ⚠ STORAGE_DIR doit pointer sur un volume persistant. Sur un système de
 * fichiers éphémère (Vercel, Cloud Run sans volume), les fichiers disparaissent
 * au redéploiement — voir DEPLOY.md.
 */

export const BUCKETS = {
  cvs:            { public: false },
  "tender-docs":  { public: true  },
  "news-images":  { public: true  },
} as const

export type Bucket = keyof typeof BUCKETS

export function isBucket(value: string): value is Bucket {
  return Object.hasOwn(BUCKETS, value)
}

export function isPublicBucket(bucket: Bucket): boolean {
  return BUCKETS[bucket].public
}

function storageRoot(): string {
  return path.resolve(process.env.STORAGE_DIR ?? path.join(process.cwd(), "storage"))
}

/**
 * Résout un nom de fichier en chemin absolu, en refusant toute tentative de
 * sortie du bucket (`../`, chemin absolu, séparateur Windows…).
 * Retourne null si le nom est refusé.
 */
export function resolvePath(bucket: Bucket, name: string): string | null {
  // Un nom de fichier, pas un chemin : aucun séparateur n'est toléré.
  if (!name || name.includes("/") || name.includes("\\") || name.includes("\0")) return null
  if (name === "." || name === "..") return null

  const dir = path.join(storageRoot(), bucket)
  const full = path.join(dir, name)

  // Ceinture et bretelles : le chemin résolu doit rester sous le bucket.
  if (!full.startsWith(dir + path.sep)) return null
  return full
}

/** Écrit un fichier dans un bucket et retourne le nom stocké en base. */
export async function saveFile(bucket: Bucket, name: string, file: File): Promise<string> {
  const full = resolvePath(bucket, name)
  if (!full) throw new Error(`Nom de fichier invalide : ${name}`)

  await mkdir(path.dirname(full), { recursive: true })
  await writeFile(full, Buffer.from(await file.arrayBuffer()))
  return name
}

export async function deleteFile(bucket: Bucket, name: string): Promise<void> {
  const full = resolvePath(bucket, name)
  if (!full) return
  await unlink(full).catch(() => {})   // déjà absent : rien à faire
}

export interface StoredFile {
  stream: ReadableStream
  size: number
  contentType: string
  filename: string
}

/**
 * Ouvre un fichier en lecture. Retourne null s'il n'existe pas.
 * Le contenu est streamé : un dossier AO de 50 Mo ne passe pas par la mémoire.
 */
export async function readFile(bucket: Bucket, name: string): Promise<StoredFile | null> {
  const full = resolvePath(bucket, name)
  if (!full) return null

  let info
  try {
    info = await stat(full)
  } catch {
    return null
  }
  if (!info.isFile()) return null

  return {
    stream: Readable.toWeb(createReadStream(full)) as ReadableStream,
    size: info.size,
    contentType: contentTypeFor(name),
    filename: name,
  }
}

/** URL de lecture d'un fichier de bucket public, telle que stockée en base. */
export function publicUrl(bucket: Bucket, name: string): string {
  return `/api/files/${bucket}/${encodeURIComponent(name)}`
}

const MIME: Record<string, string> = {
  pdf:  "application/pdf",
  doc:  "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  xls:  "application/vnd.ms-excel",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  zip:  "application/zip",
  png:  "image/png",
  jpg:  "image/jpeg",
  jpeg: "image/jpeg",
  webp: "image/webp",
  avif: "image/avif",
  gif:  "image/gif",
  svg:  "image/svg+xml",
}

export function contentTypeFor(name: string): string {
  const ext = name.split(".").pop()?.toLowerCase() ?? ""
  return MIME[ext] ?? "application/octet-stream"
}
