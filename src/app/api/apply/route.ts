import { NextRequest, NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/server"

export async function POST(req: NextRequest) {
  const supabase = createAdminClient()
  const formData = await req.formData()

  const type = formData.get("type") as "application" | "spontaneous"
  const job_offer_id = formData.get("job_offer_id") as string | null
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const phone = formData.get("phone") as string | null
  const cover_letter = (formData.get("cover_letter") as string) || ""
  const cvFile = formData.get("cv") as File | null
  const motivationFile = formData.get("motivation") as File | null

  async function uploadFile(file: File, prefix: string): Promise<string | null> {
    const ext = file.name.split(".").pop()
    const filename = `${prefix}-${Date.now()}-${name.replace(/\s+/g, "-").toLowerCase()}.${ext}`
    const { error } = await supabase.storage.from("cvs").upload(filename, file, { contentType: file.type })
    if (error) return null
    return supabase.storage.from("cvs").getPublicUrl(filename).data.publicUrl
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
