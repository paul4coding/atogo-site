#!/usr/bin/env node
/**
 * Crée (ou met à jour) un compte administrateur.
 *
 * Remplace « Authentication → Users → Add user » du dashboard Supabase.
 *
 *   pnpm admin:create admin@atogo.tg 'MotDePasseFort!'
 *
 * Si l'email existe déjà, son mot de passe est remplacé — c'est aussi la
 * procédure de réinitialisation en cas d'oubli.
 */

import { randomBytes, scrypt as scryptCb } from "node:crypto"
import { promisify } from "node:util"
import { readFileSync } from "node:fs"
import pg from "pg"

const scrypt = promisify(scryptCb)

// Mêmes paramètres que src/lib/auth.ts — les deux doivent rester alignés.
const N = 16384, R = 8, P = 1, KEYLEN = 64

async function hashPassword(password) {
  const salt = randomBytes(16)
  const key = await scrypt(password, salt, KEYLEN, { N, r: R, p: P })
  return `scrypt:${N}:${R}:${P}:${salt.toString("hex")}:${key.toString("hex")}`
}

/** Charge DATABASE_URL depuis .env.local puis .env si l'env ne le fournit pas. */
function loadEnv() {
  if (process.env.DATABASE_URL) return
  for (const file of [".env.local", ".env"]) {
    try {
      for (const line of readFileSync(file, "utf8").split("\n")) {
        const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/)
        if (m && !process.env[m[1]]) {
          process.env[m[1]] = m[2].replace(/^["']|["']$/g, "")
        }
      }
    } catch {
      // fichier absent : on passe au suivant
    }
  }
}

async function main() {
  const [email, password] = process.argv.slice(2)

  if (!email || !password) {
    console.error("Usage : pnpm admin:create <email> <mot-de-passe>")
    process.exit(1)
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    console.error("Erreur : adresse email invalide.")
    process.exit(1)
  }
  if (password.length < 8) {
    console.error("Erreur : le mot de passe doit faire au moins 8 caractères.")
    process.exit(1)
  }

  loadEnv()
  if (!process.env.DATABASE_URL) {
    console.error("Erreur : DATABASE_URL introuvable (ni dans l'environnement, ni dans .env.local/.env).")
    process.exit(1)
  }

  const client = new pg.Client({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_SSL === "true" ? { rejectUnauthorized: false } : undefined,
  })
  await client.connect()

  try {
    const hash = await hashPassword(password)
    const { rows } = await client.query(
      `insert into admin_users (email, password_hash)
       values ($1, $2)
       on conflict (email) do update
         set password_hash = excluded.password_hash, updated_at = now()
       returning id, email, (xmax = 0) as created`,
      [email.trim(), hash]
    )

    const user = rows[0]
    console.log(
      user.created
        ? `Compte admin créé : ${user.email}`
        : `Mot de passe mis à jour pour : ${user.email}`
    )
  } finally {
    await client.end()
  }
}

main().catch(err => {
  console.error("Échec :", err.message)
  process.exit(1)
})
