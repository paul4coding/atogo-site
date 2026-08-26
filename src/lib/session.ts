import { SignJWT, jwtVerify } from "jose"
import type { NextRequest } from "next/server"

/**
 * Session admin — remplace Supabase Auth.
 *
 * Un JWT signé (HS256) est déposé dans un cookie httpOnly. Le middleware le
 * vérifie AVANT de servir une page /admin, et chaque route `/api/admin/*` le
 * revérifie côté serveur : une redirection de middleware protège l'affichage,
 * pas les données.
 *
 * `jose` est utilisé plutôt que `jsonwebtoken` parce qu'il fonctionne dans le
 * runtime Edge du middleware, qui n'a pas accès aux modules natifs de Node.
 */

export const SESSION_COOKIE = "atogo_session"

/** Durée de vie de la session, en secondes (12 h par défaut). */
export const SESSION_MAX_AGE = Number(process.env.SESSION_MAX_AGE ?? 12 * 60 * 60)

export interface SessionPayload {
  sub: string    // id de l'admin
  email: string
}

function secretKey(): Uint8Array {
  const secret = process.env.SESSION_SECRET
  if (!secret || secret.length < 32) {
    throw new Error(
      "SESSION_SECRET manquant ou trop court (32 caractères minimum). " +
      "Générez-en un avec : openssl rand -base64 48"
    )
  }
  return new TextEncoder().encode(secret)
}

export async function createSessionToken(payload: SessionPayload): Promise<string> {
  return new SignJWT({ email: payload.email })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(payload.sub)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE}s`)
    .sign(secretKey())
}

/** Retourne la session si le jeton est valide et non expiré, sinon null. */
export async function verifySessionToken(token: string | undefined): Promise<SessionPayload | null> {
  if (!token) return null
  try {
    const { payload } = await jwtVerify(token, secretKey())
    if (!payload.sub || typeof payload.email !== "string") return null
    return { sub: payload.sub, email: payload.email }
  } catch {
    // Signature invalide, jeton expiré ou malformé : pas de session.
    return null
  }
}

/** Lit et vérifie la session portée par une requête. */
export async function getSession(req: NextRequest): Promise<SessionPayload | null> {
  return verifySessionToken(req.cookies.get(SESSION_COOKIE)?.value)
}

/** Options du cookie de session — httpOnly pour qu'aucun script client ne le lise. */
export function sessionCookieOptions(maxAge: number = SESSION_MAX_AGE) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge,
  }
}
