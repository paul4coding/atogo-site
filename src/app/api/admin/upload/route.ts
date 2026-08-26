import { NextResponse, type NextRequest } from "next/server"
import { badRequest, requireAdmin, serverError } from "@/lib/api"
import { isBucket, isPublicBucket, publicUrl, saveFile, type Bucket } from "@/lib/storage"
import { DOC_TYPES, IMAGE_TYPES, safeFilename, validateFile } from "@/lib/validate-file"

export const runtime = "nodejs"

/**
 * Upload admin vers un bucket PUBLIC — remplace `supabase.storage.upload()`
 * suivi de `getPublicUrl()` dans les pages Actualités et Appels d'offres.
 *
 * Retourne `{ url }`, une URL relative servie par `/api/files/...`, qui est
 * stockée telle quelle en base (`news.image_url`, `tenders.document_url`).
 */

// Types autorisés par bucket : une image d'actualité n'a rien à faire en .docx.
const ALLOWED_TYPES: Record<string, string[]> = {
  "news-images": IMAGE_TYPES,
  "tender-docs": DOC_TYPES,
}

export async function POST(req: NextRequest) {
  const auth = await requireAdmin(req)
  if ("response" in auth) return auth.response

  try {
    const formData = await req.formData()
    const file = formData.get("file")
    const bucketName = String(formData.get("bucket") ?? "")

    if (!(file instanceof File)) return badRequest("Aucun fichier reçu.")
    if (!isBucket(bucketName)) return badRequest("Bucket inconnu.")

    const bucket: Bucket = bucketName
    // Les fichiers du bucket privé arrivent par les formulaires publics
    // (/api/apply, /api/tender-response), jamais par cette route.
    if (!isPublicBucket(bucket)) return badRequest("Ce bucket n'accepte pas les uploads directs.")

    const err = validateFile(file, ALLOWED_TYPES[bucket] ?? [])
    if (err) return badRequest(err)

    const prefix = bucket === "news-images" ? "news" : "ao"
    const name = `${prefix}-${Date.now()}-${safeFilename(file.name)}`
    await saveFile(bucket, name, file)

    return NextResponse.json({ url: publicUrl(bucket, name), name })
  } catch (err) {
    return serverError(err, "admin/upload")
  }
}
