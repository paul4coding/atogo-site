import { NextResponse } from "next/server"
import { notFound, serverError } from "@/lib/api"
import { isBucket, isPublicBucket, readFile } from "@/lib/storage"

export const runtime = "nodejs"

type Params = { params: Promise<{ bucket: string; name: string }> }

/**
 * Lecture des buckets PUBLICS (`news-images`, `tender-docs`) — remplace les
 * URLs publiques Supabase Storage.
 *
 * Le bucket demandé est vérifié contre la liste blanche : impossible de faire
 * servir `cvs` (privé) par cette route, même en devinant un nom de fichier.
 */
export async function GET(_req: Request, { params }: Params) {
  try {
    const { bucket, name } = await params

    if (!isBucket(bucket) || !isPublicBucket(bucket)) return notFound("Fichier introuvable.")

    const file = await readFile(bucket, decodeURIComponent(name))
    if (!file) return notFound("Fichier introuvable.")

    return new NextResponse(file.stream, {
      headers: {
        "Content-Type": file.contentType,
        "Content-Length": String(file.size),
        "Content-Disposition": `inline; filename="${encodeURIComponent(file.filename)}"`,
        // Les noms de fichiers portent un horodatage : le contenu ne change
        // jamais sous une même URL, on peut donc cacher agressivement.
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    })
  } catch (err) {
    return serverError(err, "files")
  }
}
