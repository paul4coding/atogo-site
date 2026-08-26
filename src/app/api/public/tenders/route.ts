import { NextResponse } from "next/server"
import { query } from "@/lib/db"
import { serverError } from "@/lib/api"
import type { Tender } from "@/types/database"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

/** Appels d'offres publiés (page /actualites, onglet « Appels d'offres »). */
export async function GET() {
  try {
    const rows = await query<Tender>(
      "select * from tenders where status = 'published' order by created_at desc"
    )
    return NextResponse.json(rows)
  } catch (err) {
    return serverError(err, "public/tenders")
  }
}
