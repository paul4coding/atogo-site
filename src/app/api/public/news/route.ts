import { NextResponse, type NextRequest } from "next/server"
import { query } from "@/lib/db"
import { serverError } from "@/lib/api"
import type { News } from "@/types/database"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

/**
 * Actualités publiées — remplace la lecture Supabase directe côté navigateur.
 * Le filtre `status = 'published'` remplace la politique RLS
 * « Public read published news ».
 */
export async function GET(req: NextRequest) {
  try {
    const limitParam = Number(req.nextUrl.searchParams.get("limit"))
    const limit = Number.isInteger(limitParam) && limitParam > 0 ? Math.min(limitParam, 100) : null

    const rows = await query<News>(
      `select * from news
        where status = 'published'
        order by published_at desc nulls last, created_at desc
        ${limit ? "limit $1" : ""}`,
      limit ? [limit] : []
    )
    return NextResponse.json(rows)
  } catch (err) {
    return serverError(err, "public/news")
  }
}
