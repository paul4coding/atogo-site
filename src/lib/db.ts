import { Pool, type PoolClient, type QueryResultRow } from "pg"

/**
 * Pool de connexions PostgreSQL, partagé par toutes les routes API.
 *
 * Le navigateur ne parle jamais à la base : seules les routes `/api/*`
 * (runtime Node.js) importent ce module. Tout le contrôle d'accès qui était
 * assuré par les politiques RLS de Supabase vit désormais dans ces routes.
 *
 * En dev, Next.js recharge les modules à chaque édition : on mémorise le pool
 * sur `globalThis` pour ne pas ouvrir une nouvelle grappe de connexions à
 * chaque hot-reload (et finir par saturer `max_connections`).
 */

const globalForDb = globalThis as unknown as { __atogoPool?: Pool }

function createPool(): Pool {
  const connectionString = process.env.DATABASE_URL
  if (!connectionString) {
    throw new Error(
      "DATABASE_URL manquant. Renseignez-le dans .env.local (dev) ou .env (Docker) — voir .env.example."
    )
  }

  return new Pool({
    connectionString,
    // `DATABASE_SSL=true` pour un Postgres managé (Neon, RDS, Scaleway…).
    // En local et en Docker sur réseau privé, le TLS n'est pas nécessaire.
    ssl: process.env.DATABASE_SSL === "true" ? { rejectUnauthorized: false } : undefined,
    max: Number(process.env.DATABASE_POOL_MAX ?? 10),
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 10_000,
  })
}

export function getPool(): Pool {
  if (!globalForDb.__atogoPool) globalForDb.__atogoPool = createPool()
  return globalForDb.__atogoPool
}

/** Exécute une requête et retourne les lignes. Les paramètres sont TOUJOURS
 *  passés via `$1, $2…` — jamais interpolés dans la chaîne SQL. */
export async function query<T extends QueryResultRow = QueryResultRow>(
  text: string,
  params: unknown[] = []
): Promise<T[]> {
  const res = await getPool().query<T>(text, params)
  return res.rows
}

/** Comme `query`, mais retourne la première ligne (ou null). */
export async function queryOne<T extends QueryResultRow = QueryResultRow>(
  text: string,
  params: unknown[] = []
): Promise<T | null> {
  const rows = await query<T>(text, params)
  return rows[0] ?? null
}

/** Compte les lignes d'une table. Le nom de table n'est jamais fourni par
 *  l'utilisateur — il est codé en dur par les appelants. */
export async function count(table: string): Promise<number> {
  const row = await queryOne<{ n: string }>(`select count(*)::text as n from ${table}`)
  return Number(row?.n ?? 0)
}

/** Transaction : la callback reçoit un client dédié, commit auto / rollback en cas d'erreur. */
export async function transaction<T>(fn: (client: PoolClient) => Promise<T>): Promise<T> {
  const client = await getPool().connect()
  try {
    await client.query("begin")
    const result = await fn(client)
    await client.query("commit")
    return result
  } catch (err) {
    await client.query("rollback")
    throw err
  } finally {
    client.release()
  }
}

/**
 * Construit un `SET col = $n` à partir d'un payload et d'une LISTE BLANCHE de
 * colonnes. Les noms de colonnes ne viennent jamais du client : seules celles
 * présentes dans `allowed` sont reprises, ce qui interdit toute injection par
 * nom de champ et tout write sur une colonne non prévue (id, created_at…).
 */
export function buildUpdate(
  payload: Record<string, unknown>,
  allowed: readonly string[]
): { sets: string[]; values: unknown[] } {
  const sets: string[] = []
  const values: unknown[] = []
  for (const col of allowed) {
    if (!Object.hasOwn(payload, col)) continue
    values.push(payload[col])
    sets.push(`${col} = $${values.length}`)
  }
  return { sets, values }
}
