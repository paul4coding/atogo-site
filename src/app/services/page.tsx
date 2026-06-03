"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Wallet, Server, TrendingUp, Shield, FileText, ArrowRight, Check } from "lucide-react"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"

const SERVICES_DETAIL = [
  {
    id: "fintech",
    icon: Wallet,
    title: "Fintech & DanayaCash",
    tagline: "Transfert d'argent mobile en Afrique de l'Ouest",
    description: "DanayaCash est notre solution phare de transfert d'argent mobile. Rapide, sécurisé et disponible dans 8 pays d'Afrique de l'Ouest.",
    features: [
      "Transfert instantané en moins de 5 secondes",
      "Disponible 24h/7j sans interruption",
      "Couverture dans 8 pays : Togo, Bénin, Ghana, CI...",
      "Compatible Mobile Money, carte bancaire",
      "Chiffrement de bout en bout",
      "Application iOS & Android",
    ],
    color: "#0D7A4E", bg: "linear-gradient(135deg,#0D7A4E,#10B981)",
    lightBg: "#D1FAE5", href: "/danayacash",
  },
  {
    id: "it",
    icon: Server,
    title: "Solutions Informatiques",
    tagline: "Infrastructure IT & développement sur mesure",
    description: "Nous concevons et déployons des solutions informatiques adaptées à vos besoins : intégration de systèmes, infrastructure réseau, développement d'applications.",
    features: [
      "Audit et conseil en architecture SI",
      "Intégration ERP/CRM et systèmes tiers",
      "Infrastructure réseau et cloud",
      "Développement d'applications sur mesure",
      "Maintenance et support technique",
      "Formation des équipes IT",
    ],
    color: "#1E9FE8", bg: "linear-gradient(135deg,#1A3A8F,#1E9FE8)",
    lightBg: "#E3F4FD", href: "/contact",
  },
  {
    id: "marketing",
    icon: TrendingUp,
    title: "Marketing Digital",
    tagline: "Visibilité & croissance en ligne",
    description: "Stratégies digitales complètes pour renforcer votre présence en ligne, acquérir des clients et booster votre chiffre d'affaires en Afrique.",
    features: [
      "Stratégie de communication digitale",
      "Gestion des réseaux sociaux",
      "Campagnes publicitaires Meta & Google",
      "SEO et référencement naturel",
      "Création de contenu et copywriting",
      "Analyse de performance et reporting",
    ],
    color: "#7C3AED", bg: "linear-gradient(135deg,#7C3AED,#A78BFA)",
    lightBg: "#EDE9FE", href: "/contact",
  },
  {
    id: "cybersec",
    icon: Shield,
    title: "Cybersécurité",
    tagline: "Protection & audit de vos systèmes",
    description: "Protégez votre entreprise contre les cybermenaces. Nous réalisons des audits de sécurité, mettons en place des solutions de protection et formons vos équipes.",
    features: [
      "Audit de sécurité et test de pénétration",
      "Mise en place de pare-feu et antivirus",
      "Protection des données sensibles (RGPD)",
      "Formation et sensibilisation des équipes",
      "Plan de continuité d'activité (PCA)",
      "Surveillance et détection des incidents",
    ],
    color: "#DC2626", bg: "linear-gradient(135deg,#DC2626,#F87171)",
    lightBg: "#FEE2E2", href: "/contact",
  },
  {
    id: "content",
    icon: FileText,
    title: "Développement de Contenus",
    tagline: "Création & intégration de contenus digitaux",
    description: "Nous créons et intégrons des contenus digitaux de qualité pour tous vos supports : sites web, réseaux sociaux, applications, supports print et audiovisuels.",
    features: [
      "Rédaction web et articles de blog",
      "Création graphique et identité visuelle",
      "Production vidéo et motion design",
      "Conception de sites vitrine et e-commerce",
      "Supports print (brochures, flyers, affiches)",
      "Photographie corporate",
    ],
    color: "#D97706", bg: "linear-gradient(135deg,#D97706,#FBBF24)",
    lightBg: "#FEF3C7", href: "/contact",
  },
]

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main>

        {/* ── Hero ──────────────────────────────────────────────────────── */}
        <div style={{
          background: "linear-gradient(135deg, #f0f7ff 0%, #ffffff 60%, #f8faff 100%)",
          paddingTop: "68px",
        }}>
          <div style={{ padding: "72px 5% 56px", textAlign: "center" }}>
            <motion.span
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              style={{
                display: "inline-block", fontSize: "11px", fontWeight: 700,
                letterSpacing: "0.14em", textTransform: "uppercase",
                padding: "7px 18px", borderRadius: "999px",
                background: "var(--color-brand-light)", color: "var(--color-brand-dark)",
                marginBottom: "20px",
              }}
            >
              Ce que nous faisons
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{
                fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 700,
                color: "var(--color-text-heading)", margin: "0 0 16px",
              }}
            >
              Nos services
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              style={{
                fontSize: "1.1rem", color: "var(--color-text-body)",
                maxWidth: "540px", margin: "0 auto", lineHeight: 1.7,
              }}
            >
              Des solutions complètes pour accompagner votre transformation digitale
              en Afrique de l&apos;Ouest.
            </motion.p>
          </div>
        </div>

        {/* ── Services détaillés ────────────────────────────────────────── */}
        <div style={{ background: "#f8fafc", padding: "80px 0" }}>
          <div style={{ padding: "0 5%", display: "flex", flexDirection: "column", gap: "32px" }}>
            {SERVICES_DETAIL.map((s, i) => {
              const Icon = s.icon
              const isEven = i % 2 === 0
              return (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: 0.1 }}
                  style={{
                    background: "#fff", borderRadius: "20px",
                    boxShadow: "0 2px 20px rgba(0,0,0,0.06)",
                    overflow: "hidden",
                    display: "grid",
                    gridTemplateColumns: isEven ? "1fr 2fr" : "2fr 1fr",
                  }}
                  className="service-card-grid"
                >
                  {/* Panneau coloré */}
                  {isEven && (
                    <div style={{
                      background: s.bg, padding: "48px 40px",
                      display: "flex", flexDirection: "column",
                      justifyContent: "center", gap: "20px",
                    }}>
                      <div style={{
                        width: "60px", height: "60px", borderRadius: "16px",
                        background: "rgba(255,255,255,0.2)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        <Icon size={28} color="#fff" />
                      </div>
                      <div>
                        <p style={{ fontSize: "1.4rem", fontWeight: 800, color: "#fff", margin: "0 0 8px" }}>
                          {s.title}
                        </p>
                        <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.75)", margin: 0, lineHeight: 1.6 }}>
                          {s.tagline}
                        </p>
                      </div>
                      <Link href={s.href} style={{
                        display: "inline-flex", alignItems: "center", gap: "8px",
                        background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)",
                        color: "#fff", fontWeight: 700, fontSize: "0.88rem",
                        padding: "10px 20px", borderRadius: "8px", textDecoration: "none",
                        transition: "background 0.2s", alignSelf: "flex-start",
                      }}
                        onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.25)")}
                        onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.15)")}
                      >
                        En savoir plus <ArrowRight size={14} />
                      </Link>
                    </div>
                  )}

                  {/* Panneau contenu */}
                  <div style={{ padding: "48px 40px" }}>
                    {!isEven && (
                      <div style={{
                        display: "flex", alignItems: "center", gap: "14px", marginBottom: "20px",
                      }}>
                        <div style={{
                          width: "48px", height: "48px", borderRadius: "12px",
                          background: s.bg,
                          display: "flex", alignItems: "center", justifyContent: "center",
                        }}>
                          <Icon size={22} color="#fff" />
                        </div>
                        <div>
                          <p style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--color-text-heading)", margin: 0 }}>{s.title}</p>
                          <p style={{ fontSize: "0.82rem", color: s.color, margin: 0, fontWeight: 600 }}>{s.tagline}</p>
                        </div>
                      </div>
                    )}
                    <p style={{
                      fontSize: "0.95rem", color: "var(--color-text-body)",
                      lineHeight: 1.75, marginBottom: "28px",
                    }}>
                      {s.description}
                    </p>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                      {s.features.map(f => (
                        <div key={f} style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                          <div style={{
                            width: "18px", height: "18px", borderRadius: "50%", flexShrink: 0, marginTop: "1px",
                            background: s.lightBg, display: "flex", alignItems: "center", justifyContent: "center",
                          }}>
                            <Check size={11} color={s.color} strokeWidth={3} />
                          </div>
                          <span style={{ fontSize: "0.82rem", color: "var(--color-text-body)", lineHeight: 1.5 }}>{f}</span>
                        </div>
                      ))}
                    </div>
                    {!isEven && (
                      <Link href={s.href} style={{
                        display: "inline-flex", alignItems: "center", gap: "8px",
                        color: s.color, fontWeight: 700, fontSize: "0.88rem",
                        textDecoration: "none", marginTop: "24px",
                        transition: "gap 0.2s",
                      }}
                        onMouseEnter={e => (e.currentTarget.style.gap = "12px")}
                        onMouseLeave={e => (e.currentTarget.style.gap = "8px")}
                      >
                        Nous contacter <ArrowRight size={14} />
                      </Link>
                    )}
                  </div>

                  {/* Panneau coloré côté droit pour les pairs */}
                  {!isEven && (
                    <div style={{
                      background: s.bg, padding: "48px 40px",
                      display: "flex", flexDirection: "column",
                      justifyContent: "center", gap: "20px",
                    }}>
                      <div style={{
                        width: "60px", height: "60px", borderRadius: "16px",
                        background: "rgba(255,255,255,0.2)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        <Icon size={28} color="#fff" />
                      </div>
                      <p style={{ fontSize: "1.1rem", fontWeight: 800, color: "#fff", margin: 0 }}>
                        {s.title}
                      </p>
                      <p style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.75)", margin: 0, lineHeight: 1.6 }}>
                        {s.tagline}
                      </p>
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* ── CTA ───────────────────────────────────────────────────────── */}
        <div style={{
          background: "linear-gradient(135deg, #1A3A8F, #1E9FE8)",
          padding: "72px 5%", textAlign: "center",
        }}>
          <p style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 700, color: "#fff", margin: "0 0 12px" }}>
            Un projet en tête ?
          </p>
          <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.8)", margin: "0 0 32px" }}>
            Contactez-nous et obtenons ensemble la meilleure solution pour vous.
          </p>
          <Link href="/contact" style={{
            display: "inline-flex", alignItems: "center", gap: "10px",
            background: "#fff", color: "#1A3A8F",
            fontWeight: 800, fontSize: "1rem",
            padding: "15px 36px", borderRadius: "12px",
            textDecoration: "none", boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
          }}>
            Nous contacter <ArrowRight size={18} />
          </Link>
        </div>

      </main>
      <Footer />
    </>
  )
}
