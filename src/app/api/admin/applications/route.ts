import { NextResponse, type NextRequest } from "next/server"
import { query } from "@/lib/db"
import { requireAdmin, serverError } from "@/lib/api"
import type { Application } from "@/types/database"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

/**
 * Candidatures reçues. Le titre de l'offre visée était obtenu chez Supabase par
 * `select("*, job_offers(title)")` ; ici c'est une jointure SQL dont le résultat
 * est remis sous la même forme `job_offers: { title }`, pour que les composants
 * qui l'affichent n'aient pas à changer.
 */
export async function GET(req: NextRequest) {
  const auth = await requireAdmin(req)
  if ("response" in auth) return auth.response

  try {
    const rows = await query<Application & { job_title: string | null }>(
      `select a.*, j.title as job_title
         from applications a
         left join job_offers j on j.id = a.job_offer_id
        order by a.created_at desc`
    )

    const items: Application[] = rows.map(({ job_title, ...app }) => ({
      ...app,
      job_offers: job_title ? { title: job_title } : null,
    }))
    return NextResponse.json(items)
  } catch (err) {
    return serverError(err, "admin/applications:list")
  }
}
