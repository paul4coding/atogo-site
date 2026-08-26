import { NextResponse, type NextRequest } from "next/server"
import { SESSION_COOKIE, verifySessionToken } from "@/lib/session"

/**
 * Protection serveur des routes /admin.
 * Vérifie le JWT de session (cookie httpOnly) AVANT de servir la page.
 *
 * Le middleware tourne dans le runtime Edge : il ne peut pas ouvrir de
 * connexion PostgreSQL. La vérification est donc purement cryptographique
 * (signature + expiration), ce qui suffit à décider d'un affichage. Les
 * DONNÉES, elles, restent protégées par `requireAdmin()` dans chaque route
 * `/api/admin/*` — c'est là que se joue le contrôle d'accès réel, à la place
 * des anciennes politiques RLS de Supabase.
 */
export async function middleware(request: NextRequest) {
  const session = await verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value)
  const path = request.nextUrl.pathname
  const isLogin = path === "/admin/login"

  // Pas connecté + page admin (hors login) → redirige vers login
  if (!session && !isLogin) {
    const url = request.nextUrl.clone()
    url.pathname = "/admin/login"
    return NextResponse.redirect(url)
  }

  // Déjà connecté + sur la page login → redirige vers le dashboard
  if (session && isLogin) {
    const url = request.nextUrl.clone()
    url.pathname = "/admin"
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  // S'applique uniquement aux routes admin
  matcher: ["/admin/:path*"],
}
