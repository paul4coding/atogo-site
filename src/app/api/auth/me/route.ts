import { NextResponse, type NextRequest } from "next/server"
import { getSession } from "@/lib/session"
import { unauthorized } from "@/lib/api"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET(req: NextRequest) {
  const session = await getSession(req)
  if (!session) return unauthorized()
  return NextResponse.json({ id: session.sub, email: session.email })
}
