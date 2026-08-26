import { NextResponse, type NextRequest } from "next/server"
import { findAdminByEmail, verifyPassword } from "@/lib/auth"
import { createSessionToken, SESSION_COOKIE, sessionCookieOptions } from "@/lib/session"
import { getClientIp, rateLimit } from "@/lib/rate-limit"
import { serverError } from "@/lib/api"

export const runtime = "nodejs"

export async function POST(req: NextRequest) {
  // Anti-force brute : 10 tentatives / 10 min / IP
  const ip = getClientIp(req)
  if (!rateLimit(`${ip}:login`, 10, 10 * 60_000)) {
    return NextResponse.json(
      { error: "Trop de tentatives de connexion. Réessayez dans quelques minutes." },
      { status: 429 }
    )
  }

  try {
    const { email, password } = await req.json()
    if (typeof email !== "string" || typeof password !== "string") {
      return NextResponse.json({ error: "Email ou mot de passe incorrect" }, { status: 401 })
    }

    const user = await findAdminByEmail(email)
    // Message identique dans les deux cas : ne pas révéler quels emails existent.
    if (!user || !(await verifyPassword(password, user.password_hash))) {
      return NextResponse.json({ error: "Email ou mot de passe incorrect" }, { status: 401 })
    }

    const token = await createSessionToken({ sub: user.id, email: user.email })
    const res = NextResponse.json({ success: true, email: user.email })
    res.cookies.set(SESSION_COOKIE, token, sessionCookieOptions())
    return res
  } catch (err) {
    return serverError(err, "auth/login")
  }
}
