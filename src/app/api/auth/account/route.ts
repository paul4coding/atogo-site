import { NextResponse, type NextRequest } from "next/server"
import { findAdminByEmail, findAdminById, updateAdminEmail, updateAdminPassword, verifyPassword } from "@/lib/auth"
import { createSessionToken, SESSION_COOKIE, sessionCookieOptions } from "@/lib/session"
import { badRequest, isEmail, requireAdmin, serverError } from "@/lib/api"

export const runtime = "nodejs"

/**
 * Modification du compte admin (page /admin/parametres).
 * Les deux opérations exigent le mot de passe actuel : le cookie de session
 * seul ne suffit pas à changer les identifiants.
 */
export async function PATCH(req: NextRequest) {
  const auth = await requireAdmin(req)
  if ("response" in auth) return auth.response

  try {
    const { action, currentPassword, email, newPassword } = await req.json()

    const user = await findAdminById(auth.session.sub)
    if (!user) return badRequest("Compte introuvable.")

    if (typeof currentPassword !== "string" || !(await verifyPassword(currentPassword, user.password_hash))) {
      return NextResponse.json({ error: "Mot de passe actuel incorrect." }, { status: 403 })
    }

    if (action === "email") {
      if (!isEmail(email)) return badRequest("Adresse email invalide.")
      if (email.toLowerCase() === user.email.toLowerCase()) return badRequest("L'adresse est déjà la même.")

      const taken = await findAdminByEmail(email)
      if (taken) return badRequest("Cette adresse est déjà utilisée.")

      await updateAdminEmail(user.id, email)

      // Le nouvel email doit figurer dans le jeton : on réémet la session.
      const token = await createSessionToken({ sub: user.id, email })
      const res = NextResponse.json({ success: true, email })
      res.cookies.set(SESSION_COOKIE, token, sessionCookieOptions())
      return res
    }

    if (action === "password") {
      if (typeof newPassword !== "string" || newPassword.length < 8) {
        return badRequest("Le nouveau mot de passe doit faire au moins 8 caractères.")
      }
      await updateAdminPassword(user.id, newPassword)
      return NextResponse.json({ success: true })
    }

    return badRequest("Action inconnue.")
  } catch (err) {
    return serverError(err, "auth/account")
  }
}
