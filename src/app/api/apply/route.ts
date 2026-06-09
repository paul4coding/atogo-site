import { NextRequest, NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/server"
import { validateFile, safeFilename, DOC_TYPES } from "@/lib/validate-file"
import { rateLimit, getClientIp } from "@/lib/rate-limit"

export async function POST(req: NextRequest) {
  // Anti-spam : 5 candidatures / 10 min / IP
  const ip = getClientIp(req)
  if (!rateLimit(`${ip}:apply`, 5, 10 * 60_000)) {
    return NextResponse.json({ error: "Trop de tentatives. Réessayez dans quelques minutes." }, { status: 429 })
  }

  const supabase = createAdminClient()
  const formData = await req.formData()

  const type = formData.get("type") as "application" | "spontaneous"
  const job_offer_id = formData.get("job_offer_id") as string | null
  const name = (formData.get("name") as string || "").trim()
  const email = (formData.get("email") as string || "").trim()
  const phone = formData.get("phone") as string | null
  const cover_letter = (formData.get("cover_letter") as string) || ""
  const cvFile = formData.get("cv") as File | null
  const motivationFile = formData.get("motivation") as File | null

  // Validation basique des champs
  if (name.length < 2 || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ error: "Nom ou email invalide." }, { status: 400 })
  }

  // Validation des fichiers
  for (const f of [cvFile, motivationFile]) {
    if (f && f.size > 0) {
      const err = validateFile(f, DOC_TYPES)
      if (err) return NextResponse.json({ error: err }, { status: 400 })
    }
  }

  // Upload vers le bucket privé `cvs` — on stocke le CHEMIN (pas une URL publique)
  async function uploadFile(file: File, prefix: string): Promise<string | null> {
    const ext = file.name.split(".").pop()?.toLowerCase() ?? "bin"
    const path = `${prefix}-${Date.now()}-${safeFilename(name)}.${ext}`
    const { error } = await supabase.storage.from("cvs").upload(path, file, { contentType: file.type })
    if (error) return null
    return path
  }

  const cv_url = cvFile && cvFile.size > 0 ? await uploadFile(cvFile, "cv") : null
  const motivation_url = motivationFile && motivationFile.size > 0 ? await uploadFile(motivationFile, "motivation") : null

  const { error } = await supabase.from("applications").insert({
    type,
    job_offer_id: job_offer_id || null,
    name,
    email,
    phone: phone || null,
    cover_letter,
    cv_url,
    motivation_url,
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
