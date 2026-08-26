import { NextResponse, type NextRequest } from "next/server"
import { buildUpdate, query, queryOne } from "@/lib/db"
import { badRequest, isUuid, notFound, requireAdmin, serverError } from "@/lib/api"
import type { Domain } from "@/types/database"

export const runtime = "nodejs"

const EDITABLE = ["label", "color", "active", "sort_order"] as const

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

    const row = await queryOne<Domain>(
      `update domains set ${sets.join(", ")} where id = $${values.length + 1} returning *`,
      [...values, id]
    )
    return row ? NextResponse.json(row) : notFound("Domaine introuvable.")
  } catch (err) {
    return serverError(err, "admin/domains:update")
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  const auth = await requireAdmin(req)
  if ("response" in auth) return auth.response

  const { id } = await params
  if (!isUuid(id)) return badRequest("Identifiant invalide.")

  try {
    await query("delete from domains where id = $1", [id])
    return NextResponse.json({ success: true })
  } catch (err) {
    return serverError(err, "admin/domains:delete")
  }
}
