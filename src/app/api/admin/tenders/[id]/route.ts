import { NextResponse, type NextRequest } from "next/server"
import { buildUpdate, query, queryOne } from "@/lib/db"
import { badRequest, isUuid, notFound, requireAdmin, serverError } from "@/lib/api"
import type { Tender } from "@/types/database"

export const runtime = "nodejs"

const EDITABLE = ["ref", "title", "description", "deadline", "document_url", "status"] as const

type Params = { params: Promise<{ id: string }> }

export async function PATCH(req: NextRequest, { params }: Params) {
  const auth = await requireAdmin(req)
  if ("response" in auth) return auth.response

  const { id } = await params
  if (!isUuid(id)) return badRequest("Identifiant invalide.")

  try {
    const body = await req.json()
    const { sets, values } = buildUpdate(body, EDITABLE)
    if (sets.length === 0) return badRequest("Aucun champ à mettre à jour.")

    const row = await queryOne<Tender>(
      `update tenders set ${sets.join(", ")} where id = $${values.length + 1} returning *`,
      [...values, id]
    )
    return row ? NextResponse.json(row) : notFound("Appel d'offres introuvable.")
  } catch (err) {
    if (err && typeof err === "object" && "code" in err && err.code === "23505") {
      return badRequest("Cette référence d'appel d'offres existe déjà.")
    }
    return serverError(err, "admin/tenders:update")
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  const auth = await requireAdmin(req)
  if ("response" in auth) return auth.response

  const { id } = await params
  if (!isUuid(id)) return badRequest("Identifiant invalide.")

  try {
    // Les réponses liées partent en cascade (voir postgres/schema.sql).
    await query("delete from tenders where id = $1", [id])
    return NextResponse.json({ success: true })
  } catch (err) {
    return serverError(err, "admin/tenders:delete")
  }
}
