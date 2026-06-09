import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

/**
 * Protection serveur des routes /admin.
 * Vérifie la session Supabase (via cookies) AVANT de servir la page.
 * Couplé aux politiques RLS, l'espace admin est protégé en profondeur.
 */
export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          response = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  const path = request.nextUrl.pathname
  const isLogin = path === "/admin/login"

  // Pas connecté + page admin (hors login) → redirige vers login
  if (!user && !isLogin) {
    const url = request.nextUrl.clone()
    url.pathname = "/admin/login"
    return NextResponse.redirect(url)
  }

  // Déjà connecté + sur la page login → redirige vers le dashboard
  if (user && isLogin) {
    const url = request.nextUrl.clone()
    url.pathname = "/admin"
    return NextResponse.redirect(url)
  }

  return response
}

export const config = {
  // S'applique uniquement aux routes admin
  matcher: ["/admin/:path*"],
}
