"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Wallet, Server, TrendingUp, Shield, FileText, ArrowRight } from "lucide-react"
import { SERVICES } from "@/constants/data"

const ICON_MAP = { Wallet, Server, TrendingUp, Shield, FileText }

// Couleur unique + dégradé d'icône par service
const SERVICE_STYLES: Record<string, {
  iconBg: string; iconColor: string; accent: string; badge?: string
}> = {
  fintech:    { iconBg: "linear-gradient(135deg,#0D7A4E,#10B981)", iconColor: "#fff", accent: "#0D7A4E", badge: "Produit phare" },
  it:         { iconBg: "linear-gradient(135deg,#1A3A8F,#1E9FE8)", iconColor: "#fff", accent: "#1E9FE8" },
  marketing:  { iconBg: "linear-gradient(135deg,#7C3AED,#A78BFA)", iconColor: "#fff", accent: "#7C3AED" },
  cybersec:   { iconBg: "linear-gradient(135deg,#DC2626,#F87171)", iconColor: "#fff", accent: "#DC2626" },
  content:    { iconBg: "linear-gradient(135deg,#D97706,#FBB  F24)", iconColor: "#fff", accent: "#D97706" },
}

export default function ServicesSection() {
  return (
    <section style={{ background: "#f8fafc", padding: "100px 0" }}>
      <div style={{ padding: "0 5%" }}>

        {/* ── En-tête ─────────────────────────────────────────────────────── */}
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
            Ce que nous faisons
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 700,
              color: "var(--color-text-heading)", margin: "0 0 14px", lineHeight: 1.2,
            }}
          >
            Nos services
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.2 }}
            style={{
              fontSize: "1.05rem", color: "var(--color-text-body)",
              maxWidth: "480px", margin: "0 auto", lineHeight: 1.7,
            }}
          >
            Des solutions complètes pour accélérer votre transformation digitale en Afrique.
          </motion.p>
        </div>

        {/* ── Grille des cards ─────────────────────────────────────────────── */}
        <div className="services-grid">
          {SERVICES.map((service, i) => {
            const Icon = ICON_MAP[service.icon as keyof typeof ICON_MAP]
            const s    = SERVICE_STYLES[service.id] ?? SERVICE_STYLES.it

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                style={{
                  position: "relative",
                  background: "#fff",
                  borderRadius: "16px",
                  padding: "32px 28px 28px",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                  cursor: "default",
                  overflow: "hidden",
                  transition: "box-shadow 0.2s",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = `0 12px 40px rgba(0,0,0,0.12)` }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 12px rgba(0,0,0,0.06)" }}
              >
                {/* Trait coloré en haut */}
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0,
                  height: "4px",
                  background: s.iconBg,
                  borderRadius: "16px 16px 0 0",
                }} />

                {/* Badge "Produit phare" */}
                {s.badge && (
                  <span style={{
                    position: "absolute", top: "16px", right: "16px",
                    fontSize: "10px", fontWeight: 700, letterSpacing: "0.08em",
                    textTransform: "uppercase", padding: "4px 10px", borderRadius: "999px",
                    background: "var(--color-danaya-bg)", color: "var(--color-danaya-primary)",
                  }}>
                    {s.badge}
                  </span>
                )}

                {/* Icône */}
                <div style={{
                  width: "52px", height: "52px", borderRadius: "14px",
                  background: s.iconBg,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: "20px",
                  boxShadow: `0 6px 20px ${s.accent}30`,
                }}>
                  <Icon size={24} color={s.iconColor} />
                </div>

                {/* Titre */}
                <h3 style={{
                  fontSize: "1.05rem", fontWeight: 700,
                  color: "var(--color-text-heading)", margin: "0 0 10px",
                }}>
                  {service.title}
                </h3>

                {/* Description */}
                <p style={{
                  fontSize: "0.88rem", lineHeight: 1.7,
                  color: "var(--color-text-body)", margin: "0 0 20px",
                }}>
                  {service.description}
                </p>

                {/* Lien */}
                <Link
                  href={service.id === "fintech" ? "/danayacash" : "/services"}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "6px",
                    fontSize: "0.82rem", fontWeight: 700,
                    color: s.accent, textDecoration: "none",
                    transition: "gap 0.2s",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.gap = "10px" }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.gap = "6px" }}
                >
                  En savoir plus <ArrowRight size={14} />
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
