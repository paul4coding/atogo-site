import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { requireAdmin } from "@/lib/api"

export const runtime = "nodejs"

type Status = "pending" | "reviewed" | "accepted" | "rejected"

// Échappe les caractères HTML pour éviter toute injection dans l'email
function esc(s: string): string {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

function emailContent(status: Status, name: string, jobTitle: string | null) {
  const poste = jobTitle ? `<strong>${esc(jobTitle)}</strong>` : "votre candidature spontanée"
  const date = new Date().toLocaleDateString("fr-FR", { weekday:"long", day:"numeric", month:"long", year:"numeric" })

  const configs: Record<Status, { subject: string; badge: string; badgeBg: string; heading: string; body: string }> = {
    pending: {
      subject: `Candidature reçue — @TOGO`,
      badge: "Candidature reçue",
      badgeBg: "#F59E0B",
      heading: "Nous avons bien reçu votre dossier",
      body: `Votre dossier de candidature pour ${poste} a bien été enregistré. Notre équipe l'examinera dans les meilleurs délais et vous contactera sous <strong>48 heures ouvrées</strong>.`,
    },
    reviewed: {
      subject: `Candidature en cours d'examen — @TOGO`,
      badge: "En cours d'examen",
      badgeBg: "#1E9FE8",
      heading: "Votre candidature est examinée",
      body: `Bonne nouvelle ! Votre dossier pour ${poste} est actuellement examiné par notre équipe. Nous revenons vers vous très prochainement avec une réponse définitive.`,
    },
    accepted: {
      subject: `🎉 Candidature retenue — @TOGO`,
      badge: "Candidature retenue",
      badgeBg: "#10B981",
      heading: "Félicitations, votre profil nous intéresse !",
      body: `Nous avons le plaisir de vous informer que votre candidature pour ${poste} a été <strong>retenue</strong>. Un membre de notre équipe vous contactera très prochainement pour convenir des prochaines étapes.`,
    },
    rejected: {
      subject: `Candidature — Réponse de @TOGO`,
      badge: "Suite non retenue",
      badgeBg: "#64748B",
      heading: "Réponse à votre candidature",
      body: `Après examen attentif de votre dossier pour ${poste}, nous avons le regret de vous informer que nous ne donnons pas suite à votre candidature. Cette décision ne remet pas en cause la qualité de votre profil, mais tient à nos besoins actuels. Nous conservons votre dossier et n'hésitons pas à vous recontacter si une opportunité correspondant à votre profil se présente.`,
    },
  }

  const c = configs[status]

  return {
    subject: c.subject,
    html: `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${c.subject}</title></head>
<body style="margin:0;padding:0;background:#F1F5F9;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F1F5F9;padding:40px 16px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;">

        <!-- Header -->
        <tr><td style="background:linear-gradient(135deg,#0F1E4A 0%,#1A3A8F 100%);border-radius:16px 16px 0 0;padding:32px 40px;text-align:center;">
          <p style="margin:0 0 4px;font-size:28px;font-weight:900;letter-spacing:-0.5px;color:#fff;">@TOGO</p>
          <p style="margin:0;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:rgba(255,255,255,0.45);">Lomé, Togo — Solutions Digitales</p>
        </td></tr>

        <!-- Badge statut -->
        <tr><td style="background:#fff;padding:0 40px;">
          <div style="margin-top:-1px;padding:20px 0 0;text-align:center;">
            <span style="display:inline-block;background:${c.badgeBg};color:#fff;font-size:11px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;padding:6px 18px;border-radius:999px;">${c.badge}</span>
          </div>
        </td></tr>

        <!-- Corps -->
        <tr><td style="background:#fff;padding:24px 40px 32px;">
          <p style="font-size:14px;color:#94A3B8;margin:0 0 20px;">Le ${date}</p>
          <h1 style="font-size:22px;font-weight:800;color:#1A3A8F;margin:0 0 16px;line-height:1.25;">${c.heading}</h1>
          <p style="font-size:15px;color:#475569;line-height:1.8;margin:0 0 20px;">Bonjour <strong>${esc(name)}</strong>,</p>
          <p style="font-size:15px;color:#475569;line-height:1.8;margin:0 0 28px;">${c.body}</p>

          <div style="background:#F8FAFC;border-left:4px solid #1E9FE8;border-radius:0 8px 8px 0;padding:16px 20px;margin-bottom:28px;">
            <p style="font-size:13px;color:#64748B;margin:0;line-height:1.7;">
              Pour toute question, contactez-nous à <a href="mailto:contact@arobase.tg" style="color:#1E9FE8;text-decoration:none;font-weight:600;">contact@arobase.tg</a><br/>
              ou rendez-vous sur <a href="https://atogo.tg" style="color:#1E9FE8;text-decoration:none;font-weight:600;">atogo.tg</a>
            </p>
          </div>

          <p style="font-size:15px;color:#475569;line-height:1.8;margin:0;">Cordialement,<br/><strong style="color:#1A3A8F;">L'équipe @TOGO</strong></p>
        </td></tr>

        <!-- Footer -->
        <tr><td style="background:#0F1E4A;border-radius:0 0 16px 16px;padding:24px 40px;text-align:center;">
          <p style="font-size:12px;color:rgba(255,255,255,0.4);margin:0 0 6px;">@TOGO — Ago BKS1, Imm. D&D, Bvd Faure GNASSINGBE, Lomé, Togo</p>
          <p style="font-size:11px;color:rgba(255,255,255,0.25);margin:0;">Cet email a été envoyé automatiquement, merci de ne pas y répondre directement.</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`,
  }
}

const VALID_STATUS: Status[] = ["pending", "reviewed", "accepted", "rejected"]

export async function POST(req: NextRequest) {
  // Route d'envoi d'email déclenchée depuis l'espace admin : sans cette garde,
  // n'importe qui pourrait la marteler pour envoyer des mails en notre nom.
  const auth = await requireAdmin(req)
  if ("response" in auth) return auth.response

  const { name, email, status, jobTitle } = await req.json()

  // Validation stricte des entrées
  if (!name || !email || !status) {
    return NextResponse.json({ error: "Paramètres manquants" }, { status: 400 })
  }
  if (!VALID_STATUS.includes(status)) {
    return NextResponse.json({ error: "Statut invalide" }, { status: 400 })
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(String(email))) {
    return NextResponse.json({ error: "Email invalide" }, { status: 400 })
  }

  const { subject, html } = emailContent(status as Status, name, jobTitle ?? null)

  // Instancié au runtime (la clé n'est pas dispo au build)
  const resend = new Resend(process.env.RESEND_API_KEY)

  const { error } = await resend.emails.send({
    from: "Carrière @TOGO <onboarding@resend.dev>",
    to: ["tcheouafeipaulin@gmail.com"],   // temporaire — remplacer par [email] après vérification du domaine atogo.tg
    replyTo: email,
    subject: `[Notif candidat: ${email}] ${subject}`,
    html,
  })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
