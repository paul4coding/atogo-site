import { NextResponse, type NextRequest } from "next/server"
import { query } from "@/lib/db"
import { requireAdmin, serverError } from "@/lib/api"
import type { TenderResponse } from "@/types/database"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

/** Réponses aux appels d'offres, avec le titre et la référence de l'AO joints. */
export async function GET(req: NextRequest) {
  const auth = await requireAdmin(req)
  if ("response" in auth) return auth.response

  try {
    const rows = await query<TenderResponse & { tender_title: string | null; tender_ref: string | null }>(
      `select r.*, t.title as tender_title, t.ref as tender_ref
         from tender_responses r
         left join tenders t on t.id = r.tender_id
        order by r.created_at desc`
    )

    const items: TenderResponse[] = rows.map(({ tender_title, tender_ref, ...response }) => ({
      ...response,
      tenders: tender_title && tender_ref ? { title: tender_title, ref: tender_ref } : null,
    }))
    return NextResponse.json(items)
  } catch (err) {
    return serverError(err, "admin/tender-responses:list")
  }
}
