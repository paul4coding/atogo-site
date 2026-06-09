import { NextRequest } from "next/server"

// Limite de débit en mémoire (par IP).
// Note : sur du serverless multi-instances, c'est une protection de base
// (anti-spam naïf). Pour une protection forte en production, utiliser
// un store partagé type Upstash Redis.

type Hit = { count: number; resetAt: number }
const store = new Map<string, Hit>()

// Nettoyage périodique pour éviter la fuite mémoire
function cleanup(now: number) {
  if (store.size < 5000) return
  for (const [k, v] of store) if (v.resetAt < now) store.delete(k)
}

export function getClientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for")
  if (fwd) return fwd.split(",")[0].trim()
  return req.headers.get("x-real-ip") ?? "unknown"
}

/**
 * Retourne true si la requête est autorisée, false si la limite est atteinte.
 * @param key   identifiant (ex: `${ip}:contact`)
 * @param limit nombre de requêtes autorisées dans la fenêtre
 * @param windowMs durée de la fenêtre en ms
 */
export function rateLimit(key: string, limit = 5, windowMs = 60_000): boolean {
  const now = Date.now()
  cleanup(now)
  const hit = store.get(key)

  if (!hit || hit.resetAt < now) {
    store.set(key, { count: 1, resetAt: now + windowMs })
    return true
  }
  if (hit.count >= limit) return false
  hit.count++
  return true
}
