import { NextResponse, type NextRequest } from "next/server"
import { query } from "@/lib/db"
import { isEmail, isUuid, serverError } from "@/lib/api"
import { saveFile } from "@/lib/storage"
import { DOC_TYPES, MAX_ZIP_SIZE, ZIP_TYPES, safeFilename, validateFile } from "@/lib/validate-file"
import { getClientIp, rateLimit } from "@/lib/rate-limit"

export const runtime = "nodejs"

export async function POST(req: NextRequest) {
  // Anti-spam : 5 réponses / 10 min / IP
  const ip = getClientIp(req)
  if (!rateLimit(`${ip}:tender`, 5, 10 * 60_000)) {
    return NextResponse.json({ error: "Trop de tentatives. Réessayez dans quelques minutes." }, { status: 429 })
  }

  try {
    const formData = await req.formData()

    const tenderId = (formData.get("tender_id") as string) || ""
    const companyName = ((formData.get("company_name") as string) || "").trim()
    const contactName = ((formData.get("contact_name") as string) || "").trim()
    const email = ((formData.get("email") as string) || "").trim()
    const phone = formData.get("phone") as string | null
    const message = formData.get("message") as string | null
    const docFile = formData.get("document")
    const zipFile = formData.get("dossier_zip")

    if (!isUuid(tenderId) || companyName.length < 2 || !isEmail(email)) {
      return NextResponse.json({ error: "Champs invalides." }, { status: 400 })
    }

    // Dossier ZIP obligatoire
    if (!(zipFile instanceof File) || zipFile.size === 0) {
      return NextResponse.json({ error: "Le dossier compressé (.zip) est obligatoire." }, { status: 400 })
    }
    if (!zipFile.name.toLowerCase().endsWith(".zip")) {
      return NextResponse.json({ error: "Seuls les fichiers .zip sont acceptés pour le dossier complet." }, { status: 400 })
    }
    const zipErr = validateFile(zipFile, ZIP_TYPES, MAX_ZIP_SIZE)
    if (zipErr) return NextResponse.json({ error: zipErr }, { status: 400 })

    // L'AO doit exister et être publié — sans RLS, c'est ici que ça se vérifie.
    const tender = await query<{ id: string }>(
      "select id from tenders where id = $1 and status = 'published'",
      [tenderId]
    )
    if (tender.length === 0) {
      return NextResponse.json({ error: "Appel d'offres introuvable ou clôturé." }, { status: 404 })
    }

    // Upload du dossier ZIP vers le bucket privé
    const zipPath = `ao-${tenderId}-${Date.now()}-${safeFilename(companyName)}.zip`
    await saveFile("cvs", zipPath, zipFile)

    // Document optionnel (proforma PDF, devis…)
    let documentUrl: string | null = null
    if (docFile instanceof File && docFile.size > 0) {
      const err = validateFile(docFile, DOC_TYPES)
      if (err) return NextResponse.json({ error: err }, { status: 400 })

      const ext = docFile.name.split(".").pop()?.toLowerCase() ?? "bin"
      const path = `proforma-${tenderId}-${Date.now()}-${safeFilename(companyName)}.${ext}`
      await saveFile("cvs", path, docFile)
      documentUrl = path
    }

    await query(
      `insert into tender_responses
         (tender_id, company_name, contact_name, email, phone, message, document_url, dossier_zip_url)
       values ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [tenderId, companyName, contactName, email, phone || null, message || null, documentUrl, zipPath]
    )

    return NextResponse.json({ success: true })
  } catch (err) {
    return serverError(err, "tender-response")
  }
}
