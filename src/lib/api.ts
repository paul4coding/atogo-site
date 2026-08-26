import { NextResponse, type NextRequest } from "next/server"
import { getSession, type SessionPayload } from "@/lib/session"

/** Réponses d'erreur normalisées — le client lit toujours `{ error }`. */
export const badRequest = (message: string) => NextResponse.json({ error: message }, { status: 400 })
export const unauthorized = () => NextResponse.json({ error: "Non autorisé" }, { status: 401 })
export const notFound = (message = "Introuvable") => NextResponse.json({ error: message }, { status: 404 })

/**
 * Journalise l'erreur réelle côté serveur et renvoie un message générique :
 * un message d'erreur Postgres peut révéler la structure de la base.
 */
export function serverError(err: unknown, context: string) {
  console.error(`[api:${context}]`, err)
  return NextResponse.json({ error: "Erreur serveur." }, { status: 500 })
}

/**
 * Garde des routes `/api/admin/*`. Le middleware protège l'affichage des
 * pages ; c'est ici que les DONNÉES sont réellement protégées.
 * Retourne la session, ou une réponse 401 à renvoyer telle quelle.
 */
export async function requireAdmin(
  req: NextRequest
): Promise<{ session: SessionPayload } | { response: NextResponse }> {
  const session = await getSession(req)
  if (!session) return { response: unauthorized() }
  return { session }
}

/** Contraint une valeur à faire partie d'une liste blanche. */
export function oneOf<T extends string>(value: unknown, allowed: readonly T[]): T | null {
  return typeof value === "string" && (allowed as readonly string[]).includes(value) ? (value as T) : null
}

export function isEmail(value: unknown): value is string {
  return typeof value === "string" && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)
}

/** Chaîne non vide, nettoyée. Retourne null si trop courte. */
export function str(value: unknown, minLength = 1): string | null {
  if (typeof value !== "string") return null
  const trimmed = value.trim()
  return trimmed.length >= minLength ? trimmed : null
}

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

/** Un id invalide part en 400 plutôt qu'en erreur Postgres « invalid input syntax for uuid ». */
export function isUuid(value: unknown): value is string {
  return typeof value === "string" && UUID_RE.test(value)
}
