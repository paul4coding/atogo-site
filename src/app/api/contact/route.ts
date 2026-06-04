import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  const { name, email, phone, service, message } = await req.json()

  const { error } = await resend.emails.send({
    from: "Contact @TOGO <onboarding@resend.dev>",
    to: ["tcheouafeipaulin@gmail.com"],
    replyTo: email,
    subject: `Nouveau message de ${name} — ${service}`,
    text: `
Nom: ${name}
Email: ${email}
Téléphone: ${phone ?? "—"}
Service: ${service}

${message}
    `.trim(),
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
