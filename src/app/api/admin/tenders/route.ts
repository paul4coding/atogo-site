import { NextResponse, type NextRequest } from "next/server"
import { query, queryOne } from "@/lib/db"
import { badRequest, oneOf, requireAdmin, serverError, str } from "@/lib/api"
import { JOB_STATUSES, type Tender } from "@/types/database"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET(req: NextRequest) {
  const auth = await requireAdmin(req)
  if ("response" in auth) return auth.response

  try {
    return NextResponse.json(await query<Tender>("select * from tenders order by created_at desc"))
  } catch (err) {
    return serverError(err, "admin/tenders:list")
  }
}

export async function POST(req: NextRequest) {
  const auth = await requireAdmin(req)
  if ("response" in auth) return auth.response

  try {
    const body = await req.json()

    const ref = str(body.ref)
    const title = str(body.title)
    const description = str(body.description)
    if (!ref || !title || !description) {
      return badRequest("Référence, titre et description sont obligatoires.")
    }

    const row = await queryOne<Tender>(
      `insert into tenders (ref, title, description, deadline, document_url, status)
       values ($1, $2, $3, $4, $5, $6)
       returning *`,
      [
        ref,
        title,
        description,
        str(body.deadline) ?? "Ouvert",
        str(body.document_url) ?? null,
        oneOf(body.status, JOB_STATUSES) ?? "draft",
      ]
    )
    return NextResponse.json(row, { status: 201 })
  } catch (err) {
    // `ref` est unique en base : on renvoie un message utile plutôt qu'un 500.
    if (err && typeof err === "object" && "code" in err && err.code === "23505") {
      return badRequest("Cette référence d'appel d'offres existe déjà.")
    }
    return serverError(err, "admin/tenders:create")
  }
}
