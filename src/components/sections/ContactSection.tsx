"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { motion } from "framer-motion"
import { MapPin, Mail, Phone, Send, CheckCircle } from "lucide-react"
import type { ContactFormData } from "@/types"

const schema = z.object({
  name:    z.string().min(2, "Nom requis"),
  email:   z.string().email("Email invalide"),
  phone:   z.string().optional(),
  service: z.string().min(1, "Sélectionnez un service"),
  message: z.string().min(10, "Message trop court (min. 10 caractères)"),
})

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "14px 16px",
  borderRadius: "10px", border: "1.5px solid #E2E8F0",
  fontSize: "0.9rem", color: "#1A3A8F",
  background: "#fff", outline: "none",
  transition: "border-color 0.2s, box-shadow 0.2s",
  boxSizing: "border-box",
}

const INFOS = [
  { Icon: MapPin, title: "Adresse",    value: "Ago BKS1, Imm. D&D, Bvd Faure GNASSINGBE — Lomé, Togo" },
  { Icon: Mail,   title: "Email",      value: "contact@arobase.tg"                                     },
  { Icon: Phone,  title: "Téléphone",  value: "+228 93 17 01 01"                                        },
]

export default function ContactSection() {
  const [sent, setSent] = useState(false)

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } =
    useForm<ContactFormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: ContactFormData) => {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (res.ok) { setSent(true); reset() }
  }

  return (
    <section id="contact" style={{ background: "#f8fafc", padding: "100px 0" }}>
      <div style={{ padding: "0 5%" }}>

        {/* ── En-tête ────────────────────────────────────────────────────── */}
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <motion.span
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.4 }}
            style={{
              display: "inline-block", fontSize: "11px", fontWeight: 700,
              letterSpacing: "0.14em", textTransform: "uppercase",
              padding: "7px 18px", borderRadius: "999px",
              background: "var(--color-brand-light)", color: "var(--color-brand-dark)",
              marginBottom: "16px",
            }}
          >
            Parlons de votre projet
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 700,
              color: "var(--color-text-heading)", margin: "0 0 14px",
            }}
          >
            Contactez-nous
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.2 }}
            style={{ fontSize: "1rem", color: "var(--color-text-body)", margin: 0 }}
          >
            Notre équipe à Lomé vous répond sous 24h.
          </motion.p>
        </div>

        {/* ── Layout 2 colonnes ──────────────────────────────────────────── */}
        <div className="contact-grid">

          {/* ── Colonne gauche — infos de contact ─────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.55 }}
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            {/* Carte infos */}
            <div style={{
              background: "linear-gradient(135deg, #1A3A8F 0%, #1E9FE8 100%)",
              borderRadius: "20px", padding: "36px 32px",
              color: "#fff",
            }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, margin: "0 0 8px" }}>
                Prêt à démarrer ?
              </h3>
              <p style={{ fontSize: "0.88rem", opacity: 0.8, margin: "0 0 32px", lineHeight: 1.6 }}>
                Que ce soit pour DanayaCash, une solution IT ou un projet digital, nous sommes là.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {INFOS.map(({ Icon, title, value }) => (
                  <div key={title} style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                    <div style={{
                      width: "38px", height: "38px", borderRadius: "10px", flexShrink: 0,
                      background: "rgba(255,255,255,0.15)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <Icon size={16} color="#fff" />
                    </div>
                    <div>
                      <p style={{ fontSize: "0.7rem", opacity: 0.6, margin: "0 0 2px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>{title}</p>
                      <p style={{ fontSize: "0.88rem", margin: 0, fontWeight: 500 }}>{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Badge réponse */}
            <div style={{
              background: "#fff", borderRadius: "14px", padding: "20px 24px",
              border: "1.5px solid #E2E8F0",
              display: "flex", alignItems: "center", gap: "14px",
            }}>
              <div style={{
                width: "44px", height: "44px", borderRadius: "12px", flexShrink: 0,
                background: "var(--color-danaya-bg)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <CheckCircle size={20} color="var(--color-danaya-primary)" />
              </div>
              <div>
                <p style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--color-text-heading)", margin: "0 0 2px" }}>
                  Réponse garantie sous 24h
                </p>
                <p style={{ fontSize: "0.78rem", color: "var(--color-text-muted)", margin: 0 }}>
                  Du lundi au samedi · 8h – 18h
                </p>
              </div>
            </div>
          </motion.div>

          {/* ── Colonne droite — formulaire ────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.1 }}
            style={{
              background: "#fff", borderRadius: "20px", padding: "40px 36px",
              boxShadow: "0 4px 32px rgba(0,0,0,0.07)",
              border: "1.5px solid #E2E8F0",
            }}
          >
            {sent ? (
              /* ── Message de succès ── */
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div style={{
                  width: "64px", height: "64px", borderRadius: "50%",
                  background: "var(--color-danaya-bg)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 20px",
                }}>
                  <CheckCircle size={30} color="var(--color-danaya-primary)" />
                </div>
                <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--color-text-heading)", margin: "0 0 10px" }}>
                  Message envoyé !
                </h3>
                <p style={{ fontSize: "0.9rem", color: "var(--color-text-body)", margin: "0 0 24px" }}>
                  Nous vous répondons sous 24h.
                </p>
                <button
                  onClick={() => setSent(false)}
                  style={{
                    padding: "10px 24px", borderRadius: "8px", border: "1.5px solid #E2E8F0",
                    background: "transparent", cursor: "pointer",
                    fontSize: "0.88rem", color: "var(--color-text-body)",
                  }}
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              /* ── Formulaire ── */
              <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div className="contact-form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                  <div>
                    <input
                      {...register("name")}
                      placeholder="Nom complet *"
                      style={inputStyle}
                      onFocus={e => { e.target.style.borderColor = "#1E9FE8"; e.target.style.boxShadow = "0 0 0 3px rgba(30,159,232,0.1)" }}
                      onBlur={e  => { e.target.style.borderColor = "#E2E8F0"; e.target.style.boxShadow = "none" }}
                    />
                    {errors.name && <p style={{ fontSize: "0.75rem", color: "#EF4444", margin: "4px 0 0" }}>{errors.name.message}</p>}
                  </div>
                  <div>
                    <input
                      {...register("email")}
                      placeholder="Email *"
                      type="email"
                      style={inputStyle}
                      onFocus={e => { e.target.style.borderColor = "#1E9FE8"; e.target.style.boxShadow = "0 0 0 3px rgba(30,159,232,0.1)" }}
                      onBlur={e  => { e.target.style.borderColor = "#E2E8F0"; e.target.style.boxShadow = "none" }}
                    />
                    {errors.email && <p style={{ fontSize: "0.75rem", color: "#EF4444", margin: "4px 0 0" }}>{errors.email.message}</p>}
                  </div>
                </div>

                <input
                  {...register("phone")}
                  placeholder="Téléphone (optionnel)"
                  style={inputStyle}
                  onFocus={e => { e.target.style.borderColor = "#1E9FE8"; e.target.style.boxShadow = "0 0 0 3px rgba(30,159,232,0.1)" }}
                  onBlur={e  => { e.target.style.borderColor = "#E2E8F0"; e.target.style.boxShadow = "none" }}
                />

                <div>
                  <select
                    {...register("service")}
                    style={{ ...inputStyle, color: "#64748B" }}
                    onFocus={e => { e.target.style.borderColor = "#1E9FE8"; e.target.style.boxShadow = "0 0 0 3px rgba(30,159,232,0.1)" }}
                    onBlur={e  => { e.target.style.borderColor = "#E2E8F0"; e.target.style.boxShadow = "none" }}
                  >
                    <option value="">Service concerné *</option>
                    <option value="fintech">Fintech / DanayaCash</option>
                    <option value="it">Solutions Informatiques</option>
                    <option value="marketing">Marketing Digital</option>
                    <option value="cybersec">Cybersécurité</option>
                    <option value="content">Développement de Contenus</option>
                  </select>
                  {errors.service && <p style={{ fontSize: "0.75rem", color: "#EF4444", margin: "4px 0 0" }}>{errors.service.message}</p>}
                </div>

                <div>
                  <textarea
                    {...register("message")}
                    placeholder="Votre message *"
                    rows={5}
                    style={{ ...inputStyle, resize: "none", fontFamily: "inherit" }}
                    onFocus={e => { e.target.style.borderColor = "#1E9FE8"; e.target.style.boxShadow = "0 0 0 3px rgba(30,159,232,0.1)" }}
                    onBlur={e  => { e.target.style.borderColor = "#E2E8F0"; e.target.style.boxShadow = "none" }}
                  />
                  {errors.message && <p style={{ fontSize: "0.75rem", color: "#EF4444", margin: "4px 0 0" }}>{errors.message.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
                    padding: "15px 32px", borderRadius: "10px", border: "none", cursor: "pointer",
                    background: isSubmitting
                      ? "#94A3B8"
                      : "linear-gradient(135deg, #1A3A8F, #1E9FE8)",
                    color: "#fff", fontWeight: 700, fontSize: "0.95rem",
                    width: "100%", transition: "opacity 0.2s, transform 0.2s",
                    boxShadow: "0 6px 24px rgba(30,159,232,0.3)",
                  }}
                  onMouseEnter={e => { if (!isSubmitting) (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)" }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)" }}
                >
                  {isSubmitting ? "Envoi en cours..." : <><Send size={16} /> Envoyer le message</>}
                </button>

                <p style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", textAlign: "center", margin: 0 }}>
                  Vos données sont confidentielles et ne seront jamais partagées.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
