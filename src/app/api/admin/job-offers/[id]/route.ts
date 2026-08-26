import { NextResponse, type NextRequest } from "next/server"
import { buildUpdate, query, queryOne } from "@/lib/db"
import { badRequest, isUuid, notFound, requireAdmin, serverError } from "@/lib/api"
import type { JobOffer } from "@/types/database"

export const runtime = "nodejs"

const EDITABLE = ["title", "department", "contract_type", "location", "description", "requirements", "status"] as const

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

    // `updated_at` est géré par le serveur, jamais par le client.
    const row = await queryOne<JobOffer>(
      `update job_offers set ${sets.join(", ")}, updated_at = now()
        where id = $${values.length + 1}
        returning *`,
      [...values, id]
    )
    return row ? NextResponse.json(row) : notFound("Offre introuvable.")
  } catch (err) {
    return serverError(err, "admin/job-offers:update")
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  const auth = await requireAdmin(req)
  if ("response" in auth) return auth.response

  const { id } = await params
  if (!isUuid(id)) return badRequest("Identifiant invalide.")

  try {
    await query("delete from job_offers where id = $1", [id])
    return NextResponse.json({ success: true })
  } catch (err) {
    return serverError(err, "admin/job-offers:delete")
  }
}
