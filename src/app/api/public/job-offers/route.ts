import { NextResponse } from "next/server"
import { query } from "@/lib/db"
import { serverError } from "@/lib/api"
import type { JobOffer } from "@/types/database"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

/** Offres d'emploi publiées (page /carriere). */
export async function GET() {
  try {
    const rows = await query<JobOffer>(
      "select * from job_offers where status = 'published' order by created_at desc"
    )
    return NextResponse.json(rows)
  } catch (err) {
    return serverError(err, "public/job-offers")
  }
}
