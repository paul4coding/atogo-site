import { NextResponse, type NextRequest } from "next/server"
import { query, queryOne } from "@/lib/db"
import { badRequest, requireAdmin, serverError, str } from "@/lib/api"
import type { Domain } from "@/types/database"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET(req: NextRequest) {
  const auth = await requireAdmin(req)
  if ("response" in auth) return auth.response

  try {
    return NextResponse.json(await query<Domain>("select * from domains order by sort_order"))
  } catch (err) {
    return serverError(err, "admin/domains:list")
  }
}

export async function POST(req: NextRequest) {
  const auth = await requireAdmin(req)
  if ("response" in auth) return auth.response

  try {
    const body = await req.json()

    const label = str(body.label)
    if (!label) return badRequest("Le libellé est obligatoire.")

    const row = await queryOne<Domain>(
      `insert into domains (label, color, active, sort_order)
       values ($1, $2, $3, $4)
       returning *`,
      [
        label,
        str(body.color) ?? "#1E9FE8",
        body.active !== false,
        Number.isInteger(body.sort_order) ? body.sort_order : 0,
      ]
    )
    return NextResponse.json(row, { status: 201 })
  } catch (err) {
    return serverError(err, "admin/domains:create")
  }
}
