import { NextResponse, type NextRequest } from "next/server"
import { query, queryOne } from "@/lib/db"
import { badRequest, oneOf, requireAdmin, serverError, str } from "@/lib/api"
import { JOB_STATUSES, type JobOffer } from "@/types/database"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET(req: NextRequest) {
  const auth = await requireAdmin(req)
  if ("response" in auth) return auth.response

  try {
    // L'admin voit tout (brouillons compris) — ex-politique « Auth full access ».
    return NextResponse.json(await query<JobOffer>("select * from job_offers order by created_at desc"))
  } catch (err) {
    return serverError(err, "admin/job-offers:list")
  }
}

export async function POST(req: NextRequest) {
  const auth = await requireAdmin(req)
  if ("response" in auth) return auth.response

  try {
    const body = await req.json()

    const title = str(body.title)
    const department = str(body.department)
    const contract_type = str(body.contract_type)
    const description = str(body.description)
    if (!title || !department || !contract_type || !description) {
      return badRequest("Titre, département, type de contrat et description sont obligatoires.")
    }

    const row = await queryOne<JobOffer>(
      `insert into job_offers (title, department, contract_type, location, description, requirements, status)
       values ($1, $2, $3, $4, $5, $6, $7)
       returning *`,
      [
        title,
        department,
        contract_type,
        str(body.location) ?? "Lomé, Togo",
        description,
        Array.isArray(body.requirements) ? body.requirements.map(String) : [],
        oneOf(body.status, JOB_STATUSES) ?? "draft",
      ]
    )
    return NextResponse.json(row, { status: 201 })
  } catch (err) {
    return serverError(err, "admin/job-offers:create")
  }
}
