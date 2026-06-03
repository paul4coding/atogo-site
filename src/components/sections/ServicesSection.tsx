"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Wallet, Server, TrendingUp, Shield, FileText, ArrowRight, Check } from "lucide-react"
import { SERVICES } from "@/constants/data"

const ICON_MAP = { Wallet, Server, TrendingUp, Shield, FileText }

const SERVICE_STYLES: Record<string, {
  iconBg: string
  accent: string
  lightBg: string
  badge?: string
  features: string[]
  number: string
}> = {
  fintech: {
    iconBg: "linear-gradient(135deg,#0D7A4E,#10B981)",
    accent: "#0D7A4E", lightBg: "#D1FAE5",
    badge: "Produit phare",
    number: "01",
    features: ["Transfert en moins de 5 secondes", "8 pays couverts en Afrique de l'Ouest", "Compatible Mobile Money & carte bancaire"],
  },
  it: {
    iconBg: "linear-gradient(135deg,#1A3A8F,#1E9FE8)",
    accent: "#1E9FE8", lightBg: "#E3F4FD",
    number: "02",
    features: ["Intégration ERP/CRM sur mesure", "Infrastructure réseau & cloud", "Support technique dédié"],
  },
  marketing: {
    iconBg: "linear-gradient(135deg,#7C3AED,#A78BFA)",
    accent: "#7C3AED", lightBg: "#EDE9FE",
    number: "03",
    features: ["Stratégie réseaux sociaux", "Campagnes Meta & Google Ads", "SEO & création de contenu"],
  },
  cybersec: {
    iconBg: "linear-gradient(135deg,#DC2626,#F87171)",
    accent: "#DC2626", lightBg: "#FEE2E2",
    number: "04",
    features: ["Audit & test de pénétration", "Protection des données (RGPD)", "Formation des équipes"],
  },
  content: {
    iconBg: "linear-gradient(135deg,#D97706,#FBBF24)",
    accent: "#D97706", lightBg: "#FEF3C7",
    number: "05",
    features: ["Rédaction web & copywriting", "Création graphique & vidéo", "Sites vitrine & e-commerce"],
  },
}

export default function ServicesSection() {
  const [active, setActive] = useState<string | null>(null)

  return (
    <section style={{ background: "#f8fafc", padding: "100px 0" }}>
      <div style={{ padding: "0 5%" }}>

        {/* ── En-tête ─────────────────────────────────────────────── */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "56px", flexWrap: "wrap", gap: "20px" }}>
          <div>
            <motion.span
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.4 }}
              style={{
                display: "inline-block", fontSize: "11px", fontWeight: 700,
                letterSpacing: "0.14em", textTransform: "uppercase",
                padding: "7px 18px", borderRadius: "999px",
                background: "var(--color-brand-light)", color: "var(--color-brand-dark)",
                marginBottom: "14px",
              }}
            >Ce que nous faisons</motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              style={{
                fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 700,
                color: "var(--color-text-heading)", margin: 0, lineHeight: 1.15,
              }}
            >Nos services</motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.2 }}
          >
            <Link href="/services" style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              fontSize: "0.88rem", fontWeight: 700,
              color: "var(--color-brand-primary)", textDecoration: "none",
              padding: "10px 20px", borderRadius: "999px",
              border: "1.5px solid var(--color-brand-primary)",
              transition: "background 0.2s, color 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "var(--color-brand-primary)"; e.currentTarget.style.color = "#fff" }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--color-brand-primary)" }}
            >
              Voir tout <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>

        {/* ── Layout : 1 grande card + 4 petites ───────────────────── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }} className="services-main-grid">

          {/* Card vedette — DanayaCash (pleine hauteur gauche) */}
          {(() => {
            const service = SERVICES[0]
            const s = SERVICE_STYLES[service.id]
            const Icon = ICON_MAP[service.icon as keyof typeof ICON_MAP]
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                onMouseEnter={() => setActive(service.id)}
                onMouseLeave={() => setActive(null)}
                style={{
                  position: "relative", borderRadius: "24px", overflow: "hidden",
                  background: "#fff", cursor: "default",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
                  display: "flex", flexDirection: "column",
                  minHeight: "420px",
                }}
              >
                {/* Fond coloré animé */}
                <AnimatePresence>
                  {active === service.id && (
                    <motion.div
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        position: "absolute", inset: 0,
                        background: s.iconBg,
                        zIndex: 0,
                      }}
                    />
                  )}
                </AnimatePresence>

                {/* Numéro déco */}
                <span style={{
                  position: "absolute", bottom: "-10px", right: "20px",
                  fontSize: "8rem", fontWeight: 900, lineHeight: 1,
                  color: active === service.id ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.04)",
                  userSelect: "none", zIndex: 1, transition: "color 0.3s",
                }}>{s.number}</span>

                <div style={{ padding: "40px 36px", position: "relative", zIndex: 2, flex: 1, display: "flex", flexDirection: "column" }}>
                  {/* Badge */}
                  <span style={{
                    alignSelf: "flex-start", fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em",
                    textTransform: "uppercase", padding: "5px 12px", borderRadius: "999px",
                    background: active === service.id ? "rgba(255,255,255,0.2)" : s.lightBg,
                    color: active === service.id ? "#fff" : s.accent,
                    marginBottom: "28px", transition: "background 0.3s, color 0.3s",
                  }}>⭐ {s.badge}</span>

                  {/* Icône */}
                  <div style={{
                    width: "60px", height: "60px", borderRadius: "16px",
                    background: active === service.id ? "rgba(255,255,255,0.2)" : s.iconBg,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    marginBottom: "24px", transition: "background 0.3s",
                    boxShadow: `0 8px 24px ${s.accent}40`,
                  }}>
                    <Icon size={28} color="#fff" />
                  </div>

                  <h3 style={{
                    fontSize: "1.4rem", fontWeight: 800, margin: "0 0 12px",
                    color: active === service.id ? "#fff" : "var(--color-text-heading)",
                    transition: "color 0.3s",
                  }}>{service.title}</h3>

                  <p style={{
                    fontSize: "0.92rem", lineHeight: 1.7, margin: "0 0 24px",
                    color: active === service.id ? "rgba(255,255,255,0.8)" : "var(--color-text-body)",
                    transition: "color 0.3s",
                  }}>{service.description}</p>

                  {/* Features */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "28px" }}>
                    {s.features.map(f => (
                      <div key={f} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div style={{
                          width: "20px", height: "20px", borderRadius: "50%", flexShrink: 0,
                          background: active === service.id ? "rgba(255,255,255,0.25)" : s.lightBg,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          transition: "background 0.3s",
                        }}>
                          <Check size={11} color={active === service.id ? "#fff" : s.accent} strokeWidth={3} />
                        </div>
                        <span style={{
                          fontSize: "0.85rem", fontWeight: 500,
                          color: active === service.id ? "rgba(255,255,255,0.9)" : "var(--color-text-body)",
                          transition: "color 0.3s",
                        }}>{f}</span>
                      </div>
                    ))}
                  </div>

                  <Link href="/danayacash" style={{
                    marginTop: "auto", display: "inline-flex", alignItems: "center", gap: "8px",
                    fontSize: "0.88rem", fontWeight: 700,
                    color: active === service.id ? "#fff" : s.accent,
                    textDecoration: "none", transition: "color 0.3s",
                  }}>
                    Découvrir DanayaCash <ArrowRight size={15} />
                  </Link>
                </div>
              </motion.div>
            )
          })()}

          {/* 4 petites cards droite */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }} className="services-sub-grid">
            {SERVICES.slice(1).map((service, i) => {
              const Icon = ICON_MAP[service.icon as keyof typeof ICON_MAP]
              const s = SERVICE_STYLES[service.id] ?? SERVICE_STYLES.it
              const isActive = active === service.id

              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  onMouseEnter={() => setActive(service.id)}
                  onMouseLeave={() => setActive(null)}
                  style={{
                    position: "relative", borderRadius: "20px", overflow: "hidden",
                    background: "#fff", cursor: "default",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                    padding: "28px 24px",
                    display: "flex", flexDirection: "column", gap: "0",
                  }}
                >
                  {/* Fond coloré au hover */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        style={{ position: "absolute", inset: 0, background: s.iconBg, zIndex: 0 }}
                      />
                    )}
                  </AnimatePresence>

                  {/* Numéro déco */}
                  <span style={{
                    position: "absolute", bottom: "-8px", right: "12px",
                    fontSize: "5rem", fontWeight: 900, lineHeight: 1,
                    color: isActive ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.04)",
                    userSelect: "none", zIndex: 1, transition: "color 0.3s",
                  }}>{s.number}</span>

                  <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", height: "100%" }}>
                    {/* Icône */}
                    <div style={{
                      width: "48px", height: "48px", borderRadius: "12px",
                      background: isActive ? "rgba(255,255,255,0.2)" : s.iconBg,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      marginBottom: "16px", transition: "background 0.3s",
                      boxShadow: `0 6px 16px ${s.accent}35`,
                    }}>
                      <Icon size={22} color="#fff" />
                    </div>

                    <h3 style={{
                      fontSize: "0.95rem", fontWeight: 700, margin: "0 0 8px",
                      color: isActive ? "#fff" : "var(--color-text-heading)",
                      transition: "color 0.3s",
                    }}>{service.title}</h3>

                    <p style={{
                      fontSize: "0.8rem", lineHeight: 1.65, margin: "0 0 16px",
                      color: isActive ? "rgba(255,255,255,0.75)" : "var(--color-text-body)",
                      transition: "color 0.3s", flex: 1,
                    }}>{service.description}</p>

                    {/* 2 features rapides */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "16px" }}>
                      {s.features.slice(0, 2).map(f => (
                        <div key={f} style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                          <Check size={10} color={isActive ? "#fff" : s.accent} strokeWidth={3} style={{ flexShrink: 0 }} />
                          <span style={{
                            fontSize: "0.75rem", fontWeight: 500,
                            color: isActive ? "rgba(255,255,255,0.85)" : "var(--color-text-muted)",
                            transition: "color 0.3s",
                          }}>{f}</span>
                        </div>
                      ))}
                    </div>

                    <Link href="/services" style={{
                      display: "inline-flex", alignItems: "center", gap: "6px",
                      fontSize: "0.78rem", fontWeight: 700,
                      color: isActive ? "#fff" : s.accent,
                      textDecoration: "none", transition: "color 0.3s",
                    }}>
                      En savoir plus <ArrowRight size={12} />
                    </Link>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
