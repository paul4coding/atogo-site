import { NextResponse, type NextRequest } from "next/server"
import { notFound, requireAdmin, serverError } from "@/lib/api"
import { readFile } from "@/lib/storage"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

type Params = { params: Promise<{ name: string }> }

/**
 * Lecture du bucket PRIVÉ `cvs` (CV, lettres de motivation, dossiers AO).
 *
 * Remplace les URLs signées Supabase : plutôt qu'un lien temporaire signé, le
 * fichier n'est accessible que par cette route, qui exige une session admin.
 * Aucun lien ne « fuite » donc hors de l'espace admin, et il n'y a pas d'URL
 * à faire expirer.
 */
export async function GET(req: NextRequest, { params }: Params) {
  const auth = await requireAdmin(req)
  if ("response" in auth) return auth.response

  try {
    const { name } = await params
    const file = await readFile("cvs", decodeURIComponent(name))
    if (!file) return notFound("Fichier introuvable.")

    return new NextResponse(file.stream, {
      headers: {
        "Content-Type": file.contentType,
        "Content-Length": String(file.size),
        // `inline` : les PDF s'ouvrent dans l'onglet, le reste est téléchargé.
        "Content-Disposition": `inline; filename="${encodeURIComponent(file.filename)}"`,
        "Cache-Control": "private, no-store",
      },
    })
  } catch (err) {
    return serverError(err, "admin/files")
  }
}
