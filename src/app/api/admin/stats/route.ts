import { NextResponse, type NextRequest } from "next/server"
import { queryOne } from "@/lib/db"
import { requireAdmin, serverError } from "@/lib/api"
import type { AdminStats } from "@/types/database"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

/**
 * Compteurs du tableau de bord. Les cinq comptages tiennent dans une seule
 * requête : un aller-retour au lieu des cinq appels `head:true` de la version
 * Supabase.
 */
export async function GET(req: NextRequest) {
  const auth = await requireAdmin(req)
  if ("response" in auth) return auth.response

  try {
    const row = await queryOne<Record<keyof AdminStats, string>>(
      `select (select count(*) from job_offers)       ::text as offers,
              (select count(*) from applications)     ::text as applications,
              (select count(*) from news)             ::text as news,
              (select count(*) from tenders)          ::text as tenders,
              (select count(*) from tender_responses) ::text as responses`
    )

    const stats: AdminStats = {
      offers: Number(row?.offers ?? 0),
      applications: Number(row?.applications ?? 0),
      news: Number(row?.news ?? 0),
      tenders: Number(row?.tenders ?? 0),
      responses: Number(row?.responses ?? 0),
    }
    return NextResponse.json(stats)
  } catch (err) {
    return serverError(err, "admin/stats")
  }
}
