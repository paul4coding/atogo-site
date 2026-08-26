import { NextResponse, type NextRequest } from "next/server"
import { queryOne } from "@/lib/db"
import { badRequest, isUuid, notFound, oneOf, requireAdmin, serverError } from "@/lib/api"
import { APPLICATION_STATUSES, type Application } from "@/types/database"

export const runtime = "nodejs"

type Params = { params: Promise<{ id: string }> }

/** Seul le statut est modifiable — équivalent de l'ancienne politique « Auth update applications ». */
export async function PATCH(req: NextRequest, { params }: Params) {
  const auth = await requireAdmin(req)
  if ("response" in auth) return auth.response

  const { id } = await params
  if (!isUuid(id)) return badRequest("Identifiant invalide.")

  try {
    const { status } = await req.json()
    const valid = oneOf(status, APPLICATION_STATUSES)
    if (!valid) return badRequest("Statut invalide.")

    const row = await queryOne<Application>(
      "update applications set status = $1 where id = $2 returning *",
      [valid, id]
    )
    return row ? NextResponse.json(row) : notFound("Candidature introuvable.")
  } catch (err) {
    return serverError(err, "admin/applications:update")
  }
}
