import { randomBytes, scrypt as scryptCb, timingSafeEqual } from "node:crypto"
import { promisify } from "node:util"
import { query, queryOne } from "@/lib/db"

/**
 * Mots de passe administrateurs — remplace la gestion Supabase Auth.
 *
 * On utilise `scrypt` de node:crypto plutôt qu'une dépendance externe :
 * il est mémoire-dur (résistant au cracking GPU), disponible partout où Node
 * tourne, et n'ajoute aucun module natif à compiler dans l'image Docker.
 *
 * Format stocké en base :  scrypt:N:r:p:<sel hex>:<empreinte hex>
 * Les paramètres sont inclus dans la chaîne pour pouvoir les durcir plus tard
 * sans invalider les mots de passe existants.
 */

const scrypt = promisify(scryptCb) as (
  password: string, salt: Buffer, keylen: number, options: { N: number; r: number; p: number }
) => Promise<Buffer>

const N = 16384   // coût CPU/mémoire
const R = 8       // taille de bloc
const P = 1       // parallélisme
const KEYLEN = 64

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16)
  const key = await scrypt(password, salt, KEYLEN, { N, r: R, p: P })
  return `scrypt:${N}:${R}:${P}:${salt.toString("hex")}:${key.toString("hex")}`
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const parts = stored.split(":")
  if (parts.length !== 6 || parts[0] !== "scrypt") return false

  const [, n, r, p, saltHex, hashHex] = parts
  const salt = Buffer.from(saltHex, "hex")
  const expected = Buffer.from(hashHex, "hex")

  let actual: Buffer
  try {
    actual = await scrypt(password, salt, expected.length, { N: Number(n), r: Number(r), p: Number(p) })
  } catch {
    return false
  }
  // Comparaison à temps constant : évite de fuiter le hash octet par octet.
  return actual.length === expected.length && timingSafeEqual(actual, expected)
}

export interface AdminUser {
  id: string
  email: string
  password_hash: string
  created_at: string
  updated_at: string
}

export function findAdminByEmail(email: string) {
  return queryOne<AdminUser>(
    "select * from admin_users where lower(email) = lower($1)",
    [email.trim()]
  )
}

export function findAdminById(id: string) {
  return queryOne<AdminUser>("select * from admin_users where id = $1", [id])
}

export async function updateAdminEmail(id: string, email: string): Promise<void> {
  await query(
    "update admin_users set email = $2, updated_at = now() where id = $1",
    [id, email.trim()]
  )
}

export async function updateAdminPassword(id: string, password: string): Promise<void> {
  await query(
    "update admin_users set password_hash = $2, updated_at = now() where id = $1",
    [id, await hashPassword(password)]
  )
}
