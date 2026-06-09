import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { rateLimit, getClientIp } from "@/lib/rate-limit"

export async function POST(req: NextRequest) {
  // Instancié au runtime (la clé n'est pas dispo au build)
  const resend = new Resend(process.env.RESEND_API_KEY)

  // Anti-spam : 5 messages / 10 min / IP
  const ip = getClientIp(req)
  if (!rateLimit(`${ip}:contact`, 5, 10 * 60_000)) {
    return NextResponse.json({ error: "Trop de messages envoyés. Réessayez dans quelques minutes." }, { status: 429 })
  }

  const { name, email, phone, service, message } = await req.json()

  // Validation basique
  if (!name || String(name).trim().length < 2 || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(String(email))) {
    return NextResponse.json({ error: "Nom ou email invalide." }, { status: 400 })
  }
  if (!message || String(message).trim().length < 10) {
    return NextResponse.json({ error: "Message trop court." }, { status: 400 })
  }

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
