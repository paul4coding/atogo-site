import { NextResponse, type NextRequest } from "next/server"
import { query } from "@/lib/db"
import { isEmail, isUuid, serverError } from "@/lib/api"
import { saveFile } from "@/lib/storage"
import { DOC_TYPES, safeFilename, validateFile } from "@/lib/validate-file"
import { getClientIp, rateLimit } from "@/lib/rate-limit"

export const runtime = "nodejs"

export async function POST(req: NextRequest) {
  // Anti-spam : 5 candidatures / 10 min / IP
  const ip = getClientIp(req)
  if (!rateLimit(`${ip}:apply`, 5, 10 * 60_000)) {
    return NextResponse.json({ error: "Trop de tentatives. Réessayez dans quelques minutes." }, { status: 429 })
  }

  try {
    const formData = await req.formData()

    const type = formData.get("type") === "spontaneous" ? "spontaneous" : "application"
    const jobOfferId = formData.get("job_offer_id") as string | null
    const name = ((formData.get("name") as string) || "").trim()
    const email = ((formData.get("email") as string) || "").trim()
    const phone = formData.get("phone") as string | null
    const coverLetter = (formData.get("cover_letter") as string) || ""
    const cvFile = formData.get("cv")
    const motivationFile = formData.get("motivation")

    if (name.length < 2 || !isEmail(email)) {
      return NextResponse.json({ error: "Nom ou email invalide." }, { status: 400 })
    }

    // Un id d'offre malformé partirait en erreur Postgres : on le refuse ici.
    if (jobOfferId && !isUuid(jobOfferId)) {
      return NextResponse.json({ error: "Offre invalide." }, { status: 400 })
    }

    for (const f of [cvFile, motivationFile]) {
      if (f instanceof File && f.size > 0) {
        const err = validateFile(f, DOC_TYPES)
        if (err) return NextResponse.json({ error: err }, { status: 400 })
      }
    }

    /**
     * Écriture dans le bucket privé `cvs`. Comme avec Supabase, la base ne
     * stocke que le CHEMIN du fichier, pas une URL : l'accès passe ensuite
     * par `/api/admin/files/<nom>`, protégé par la session admin.
     */
    async function upload(file: File, prefix: string): Promise<string | null> {
      const ext = file.name.split(".").pop()?.toLowerCase() ?? "bin"
      const stored = `${prefix}-${Date.now()}-${safeFilename(name)}.${ext}`
      try {
        return await saveFile("cvs", stored, file)
      } catch (err) {
        console.error("[api:apply] upload", err)
        return null
      }
    }

    const cvUrl = cvFile instanceof File && cvFile.size > 0 ? await upload(cvFile, "cv") : null
    const motivationUrl =
      motivationFile instanceof File && motivationFile.size > 0 ? await upload(motivationFile, "motivation") : null

    await query(
      `insert into applications (type, job_offer_id, name, email, phone, cover_letter, cv_url, motivation_url)
       values ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [type, jobOfferId || null, name, email, phone || null, coverLetter, cvUrl, motivationUrl]
    )

    return NextResponse.json({ success: true })
  } catch (err) {
    return serverError(err, "apply")
  }
}
