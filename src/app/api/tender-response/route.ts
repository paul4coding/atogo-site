import { NextRequest, NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/server"
import { validateFile, safeFilename, DOC_TYPES } from "@/lib/validate-file"
import { rateLimit, getClientIp } from "@/lib/rate-limit"

export async function POST(req: NextRequest) {
  // Anti-spam : 5 réponses / 10 min / IP
  const ip = getClientIp(req)
  if (!rateLimit(`${ip}:tender`, 5, 10 * 60_000)) {
    return NextResponse.json({ error: "Trop de tentatives. Réessayez dans quelques minutes." }, { status: 429 })
  }

  const supabase = createAdminClient()
  const formData = await req.formData()

  const tender_id = formData.get("tender_id") as string
  const company_name = (formData.get("company_name") as string || "").trim()
  const contact_name = (formData.get("contact_name") as string || "").trim()
  const email = (formData.get("email") as string || "").trim()
  const phone = formData.get("phone") as string | null
  const message = formData.get("message") as string | null
  const docFile = formData.get("document") as File | null

  if (!tender_id || company_name.length < 2 || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ error: "Champs invalides." }, { status: 400 })
  }

  let document_url: string | null = null

  if (docFile && docFile.size > 0) {
    const err = validateFile(docFile, DOC_TYPES)
    if (err) return NextResponse.json({ error: err }, { status: 400 })

    // Proforma confidentielle → bucket privé `cvs`, on stocke le CHEMIN
    const ext = docFile.name.split(".").pop()?.toLowerCase() ?? "bin"
    const path = `proforma-${tender_id}-${Date.now()}-${safeFilename(company_name)}.${ext}`
    const { error: uploadError } = await supabase.storage
      .from("cvs")
      .upload(path, docFile, { contentType: docFile.type })

    if (uploadError) {
      return NextResponse.json({ error: "Erreur upload document: " + uploadError.message }, { status: 500 })
    }
    document_url = path
  }

  const { error } = await supabase.from("tender_responses").insert({
    tender_id,
    company_name,
    contact_name,
    email,
    phone: phone || null,
    message: message || null,
    document_url,
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
