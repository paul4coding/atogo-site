import { NextRequest, NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/server"

export async function POST(req: NextRequest) {
  const supabase = createAdminClient()
  const formData = await req.formData()

  const tender_id = formData.get("tender_id") as string
  const company_name = formData.get("company_name") as string
  const contact_name = formData.get("contact_name") as string
  const email = formData.get("email") as string
  const phone = formData.get("phone") as string | null
  const message = formData.get("message") as string | null
  const docFile = formData.get("document") as File | null

  let document_url: string | null = null

  if (docFile && docFile.size > 0) {
    const ext = docFile.name.split(".").pop()
    const filename = `${tender_id}-${Date.now()}-${company_name.replace(/\s+/g, "-").toLowerCase()}.${ext}`
    const { error: uploadError } = await supabase.storage
      .from("tender-docs")
      .upload(filename, docFile, { contentType: docFile.type })

    if (uploadError) {
      return NextResponse.json({ error: "Erreur upload document: " + uploadError.message }, { status: 500 })
    }

    const { data: urlData } = supabase.storage.from("tender-docs").getPublicUrl(filename)
    document_url = urlData.publicUrl
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
