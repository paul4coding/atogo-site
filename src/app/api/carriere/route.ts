import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  const { type, offerTitle, offerRef, name, company, email, phone, message } = await req.json()

  const isAO = type === "appel-offre"

  const subject = isAO
    ? `[AO] ${offerRef} — ${offerTitle} — ${company}`
    : `[Candidature] ${offerTitle} — ${name}`

  const body = isAO
    ? `
Appel d'offres : ${offerTitle}
Référence      : ${offerRef}

Société        : ${company}
Contact        : ${name}
Email          : ${email}
Téléphone      : ${phone ?? "—"}

Message :
${message}
    `.trim()
    : `
Poste visé : ${offerTitle}

Nom        : ${name}
Email      : ${email}
Téléphone  : ${phone ?? "—"}

Lettre de motivation :
${message}
    `.trim()

  const { error } = await resend.emails.send({
    from: "Carrière @TOGO <onboarding@resend.dev>",
    to: ["tcheouafeipaulin@gmail.com"],
    replyTo: email,
    subject,
    text: body,
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
