import { NextResponse } from "next/server"
import { SESSION_COOKIE, sessionCookieOptions } from "@/lib/session"

export const runtime = "nodejs"

export async function POST() {
  const res = NextResponse.json({ success: true })
  // maxAge 0 : le navigateur supprime le cookie immédiatement.
  res.cookies.set(SESSION_COOKIE, "", sessionCookieOptions(0))
  return res
}
