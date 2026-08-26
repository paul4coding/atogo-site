import { NextResponse, type NextRequest } from "next/server"
import { query, queryOne } from "@/lib/db"
import { badRequest, oneOf, requireAdmin, serverError, str } from "@/lib/api"
import { JOB_STATUSES, type News } from "@/types/database"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET(req: NextRequest) {
  const auth = await requireAdmin(req)
  if ("response" in auth) return auth.response

  try {
    return NextResponse.json(await query<News>("select * from news order by created_at desc"))
  } catch (err) {
    return serverError(err, "admin/news:list")
  }
}

export async function POST(req: NextRequest) {
  const auth = await requireAdmin(req)
  if ("response" in auth) return auth.response

  try {
    const body = await req.json()

    const title = str(body.title)
    const excerpt = str(body.excerpt)
    const content = str(body.content)
    if (!title || !excerpt || !content) {
      return badRequest("Titre, résumé et contenu sont obligatoires.")
    }

    const status = oneOf(body.status, JOB_STATUSES) ?? "draft"
    // Publier sans date explicite horodate l'article maintenant.
    const publishedAt = body.published_at ?? (status === "published" ? new Date().toISOString() : null)

    const row = await queryOne<News>(
      `insert into news (title, excerpt, content, image_url, status, published_at)
       values ($1, $2, $3, $4, $5, $6)
       returning *`,
      [title, excerpt, content, str(body.image_url) ?? null, status, publishedAt]
    )
    return NextResponse.json(row, { status: 201 })
  } catch (err) {
    return serverError(err, "admin/news:create")
  }
}
