"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  Wallet, Server, TrendingUp, Shield, FileText,
  ArrowRight, Check, Star, Clock, Users, Award,
} from "lucide-react"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"

const SERVICES_DETAIL = [
  {
    id: "fintech", num: "01",
    Icon: Wallet,
    title: "Fintech & DanayaCash",
    tagline: "Transfert d'argent mobile en Afrique de l'Ouest",
    description: "DanayaCash est notre solution phare de transfert d'argent mobile. Rapide, sécurisé et disponible dans 8 pays d'Afrique de l'Ouest, elle simplifie la vie de millions d'utilisateurs.",
    features: [
      "Transfert instantané en moins de 5 secondes",
      "Disponible 24h/7j sans interruption",
      "8 pays couverts : Togo, Bénin, Ghana, CI...",
      "Compatible Mobile Money & carte bancaire",
      "Chiffrement de bout en bout certifié",
      "Application iOS & Android",
    ],
    stats: [{ v: "8",    l: "pays" }, { v: "2M+", l: "transactions/mois" }, { v: "<5s", l: "délai" }],
    color: "#0D7A4E", bg: "linear-gradient(135deg,#0D7A4E,#10B981)",
    lightBg: "#D1FAE5", badge: "Produit phare", href: "/danayacash",
  },
  {
    id: "it", num: "02",
    Icon: Server,
    title: "Solutions Informatiques",
    tagline: "Infrastructure IT & développement sur mesure",
    description: "Nous concevons et déployons des solutions informatiques adaptées à vos besoins : intégration de systèmes, infrastructure réseau et développement d'applications métier.",
    features: [
      "Audit et conseil en architecture SI",
      "Intégration ERP/CRM et systèmes tiers",
      "Infrastructure réseau et cloud",
      "Développement d'applications sur mesure",
      "Maintenance et support technique dédié",
      "Formation des équipes IT",
    ],
    stats: [{ v: "50+",  l: "projets livrés" }, { v: "24/7", l: "support" }, { v: "100%", l: "satisfaction" }],
    color: "#1E9FE8", bg: "linear-gradient(135deg,#1A3A8F,#1E9FE8)",
    lightBg: "#E3F4FD", href: "/contact",
  },
  {
    id: "marketing", num: "03",
    Icon: TrendingUp,
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
    stats: [{ v: "3×",   l: "ROI moyen" }, { v: "90j", l: "premiers résultats" }, { v: "360°", l: "couverture" }],
    color: "#7C3AED", bg: "linear-gradient(135deg,#7C3AED,#A78BFA)",
    lightBg: "#EDE9FE", href: "/contact",
  },
  {
    id: "cybersec", num: "04",
    Icon: Shield,
    title: "Cybersécurité",
    tagline: "Protection & audit de vos systèmes",
    description: "Protégez votre entreprise contre les cybermenaces. Audits de sécurité, solutions de protection et formation de vos équipes aux bonnes pratiques.",
    features: [
      "Audit de sécurité et test de pénétration",
      "Mise en place de pare-feu et antivirus",
      "Protection des données (RGPD)",
      "Formation et sensibilisation des équipes",
      "Plan de continuité d'activité (PCA)",
      "Surveillance et détection des incidents",
    ],
    stats: [{ v: "0",    l: "incident non détecté" }, { v: "48h", l: "intervention" }, { v: "RGPD", l: "conforme" }],
    color: "#DC2626", bg: "linear-gradient(135deg,#DC2626,#F87171)",
    lightBg: "#FEE2E2", href: "/contact",
  },
  {
    id: "content", num: "05",
    Icon: FileText,
    title: "Développement de Contenus",
    tagline: "Création & intégration de contenus digitaux",
    description: "Nous créons et intégrons des contenus digitaux de qualité pour tous vos supports : web, réseaux sociaux, applications, supports print et audiovisuels.",
    features: [
      "Rédaction web et articles de blog",
      "Création graphique et identité visuelle",
      "Production vidéo et motion design",
      "Sites vitrine & e-commerce",
      "Supports print (brochures, flyers, affiches)",
      "Photographie corporate",
    ],
    stats: [{ v: "200+", l: "contenus/mois" }, { v: "FR/EN", l: "bilingue" }, { v: "48h", l: "livraison" }],
    color: "#D97706", bg: "linear-gradient(135deg,#D97706,#FBBF24)",
    lightBg: "#FEF3C7", href: "/contact",
  },
]

const WHY_US = [
  { Icon: Star,  title: "Expertise locale",  desc: "Une équipe basée à Lomé qui connaît les réalités du marché africain." },
  { Icon: Clock, title: "Réactivité",         desc: "Réponse sous 24h et suivi personnalisé tout au long du projet." },
  { Icon: Users, title: "Approche sur mesure", desc: "Chaque solution est conçue selon vos besoins et votre budget." },
  { Icon: Award, title: "Résultats prouvés",  desc: "50 000+ clients satisfaits et 5 ans d'expérience en Afrique." },
]

export default function ServicesPage() {
  const [active, setActive] = useState("fintech")
  const current = SERVICES_DETAIL.find(s => s.id === active)!

  return (
    <>
      <Navbar />
      <main>

        {/* ── Hero ──────────────────────────────────────────────────────── */}
        <div style={{
          background: "linear-gradient(160deg, #0F1E4A 0%, #1A3A8F 60%, #0F1E4A 100%)",
          paddingTop: "68px", position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", top: "-60px", right: "-60px",
            width: "400px", height: "400px", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(30,159,232,0.1) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />

          <div style={{ padding: "72px 5% 56px", position: "relative", zIndex: 1 }}>
            <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
              <motion.span
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                style={{
                  display: "inline-block", fontSize: "11px", fontWeight: 700,
                  letterSpacing: "0.14em", textTransform: "uppercase",
                  padding: "7px 18px", borderRadius: "999px",
                  background: "rgba(30,159,232,0.15)", color: "#60C8FF",
                  border: "1px solid rgba(30,159,232,0.25)", marginBottom: "20px",
                }}
              >Ce que nous faisons</motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.1 }}
                style={{
                  fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 700,
                  color: "#fff", margin: "0 0 16px",
                }}
              >
                Des solutions digitales<br />
                <span style={{ color: "#1E9FE8" }}>taillées pour l&apos;Afrique</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                style={{
                  fontSize: "1.05rem", color: "rgba(255,255,255,0.65)",
                  lineHeight: 1.7, marginBottom: "40px",
                }}
              >
                5 expertises complémentaires pour accélérer votre transformation digitale.
              </motion.p>

              {/* Pills navigation */}
              <motion.div
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center" }}
              >
                {SERVICES_DETAIL.map(s => (
                  <button
                    key={s.id}
                    onClick={() => setActive(s.id)}
                    style={{
                      padding: "9px 20px", borderRadius: "999px", cursor: "pointer",
                      fontWeight: 600, fontSize: "0.85rem", border: "none",
                      transition: "all 0.25s",
                      background: active === s.id ? s.color : "rgba(255,255,255,0.1)",
                      color: active === s.id ? "#fff" : "rgba(255,255,255,0.7)",
                      boxShadow: active === s.id ? `0 4px 16px ${s.color}60` : "none",
                      transform: active === s.id ? "scale(1.05)" : "scale(1)",
                    }}
                  >
                    {s.title}
                  </button>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Vague */}
          <div style={{ lineHeight: 0 }}>
            <svg viewBox="0 0 1440 48" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", width: "100%" }}>
              <path d="M0,24 C360,48 1080,0 1440,24 L1440,48 L0,48 Z" fill="#f8fafc" />
            </svg>
          </div>
        </div>

        {/* ── Service actif — grande carte ──────────────────────────────── */}
        <div style={{ background: "#f8fafc", padding: "64px 5%" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              style={{
                background: "#fff", borderRadius: "24px",
                boxShadow: "0 4px 40px rgba(0,0,0,0.08)",
                overflow: "hidden",
                display: "grid", gridTemplateColumns: "1fr 1.8fr",
              }}
              className="service-card-grid"
            >
              {/* Panneau coloré gauche */}
              <div style={{
                background: current.bg, padding: "56px 40px",
                display: "flex", flexDirection: "column", gap: "24px",
                position: "relative", overflow: "hidden",
              }}>
                {/* Cercles déco */}
                <div style={{
                  position: "absolute", bottom: "-60px", right: "-60px",
                  width: "200px", height: "200px", borderRadius: "50%",
                  background: "rgba(255,255,255,0.06)", pointerEvents: "none",
                }} />
                <div style={{
                  position: "absolute", top: "-40px", left: "-40px",
                  width: "150px", height: "150px", borderRadius: "50%",
                  background: "rgba(255,255,255,0.05)", pointerEvents: "none",
                }} />

                {/* Numéro */}
                <span style={{
                  fontSize: "0.7rem", fontWeight: 800, color: "rgba(255,255,255,0.4)",
                  letterSpacing: "0.2em",
                }}>{current.num} / 05</span>

                {/* Icône */}
                <div style={{
                  width: "72px", height: "72px", borderRadius: "20px",
                  background: "rgba(255,255,255,0.18)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <current.Icon size={34} color="#fff" />
                </div>

                <div>
                  {current.badge && (
                    <span style={{
                      display: "inline-block", fontSize: "10px", fontWeight: 700,
                      textTransform: "uppercase", letterSpacing: "0.1em",
                      padding: "4px 12px", borderRadius: "999px",
                      background: "rgba(255,255,255,0.2)", color: "#fff",
                      marginBottom: "12px",
                    }}>⭐ {current.badge}</span>
                  )}
                  <p style={{ fontSize: "1.5rem", fontWeight: 800, color: "#fff", margin: "0 0 8px", lineHeight: 1.2 }}>
                    {current.title}
                  </p>
                  <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.7)", margin: 0, lineHeight: 1.6 }}>
                    {current.tagline}
                  </p>
                </div>

                {/* Stats */}
                <div style={{ display: "flex", gap: "20px", paddingTop: "8px", flexWrap: "wrap" }}>
                  {current.stats.map(({ v, l }) => (
                    <div key={l}>
                      <p style={{ fontSize: "1.3rem", fontWeight: 900, color: "#fff", margin: 0 }}>{v}</p>
                      <p style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.55)", margin: 0 }}>{l}</p>
                    </div>
                  ))}
                </div>

                <Link href={current.href} style={{
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)",
                  color: "#fff", fontWeight: 700, fontSize: "0.88rem",
                  padding: "11px 22px", borderRadius: "10px", textDecoration: "none",
                  alignSelf: "flex-start", transition: "background 0.2s",
                }}
                  onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.28)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.15)")}
                >
                  {current.id === "fintech" ? "Découvrir DanayaCash" : "Nous contacter"} <ArrowRight size={14} />
                </Link>
              </div>

              {/* Panneau contenu droite */}
              <div style={{ padding: "56px 48px" }}>
                <p style={{
                  fontSize: "1rem", color: "var(--color-text-body)",
                  lineHeight: 1.8, marginBottom: "36px",
                  borderLeft: `4px solid ${current.color}`, paddingLeft: "20px",
                }}>
                  {current.description}
                </p>

                <p style={{
                  fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em",
                  textTransform: "uppercase", color: current.color, margin: "0 0 20px",
                }}>Ce que nous faisons pour vous</p>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "36px" }}>
                  {current.features.map(f => (
                    <div key={f} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                      <div style={{
                        width: "22px", height: "22px", borderRadius: "6px", flexShrink: 0, marginTop: "1px",
                        background: current.lightBg, display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        <Check size={12} color={current.color} strokeWidth={3} />
                      </div>
                      <span style={{ fontSize: "0.85rem", color: "var(--color-text-body)", lineHeight: 1.55 }}>{f}</span>
                    </div>
                  ))}
                </div>

                {/* Nav entre services */}
                <div style={{
                  display: "flex", gap: "8px", flexWrap: "wrap",
                  paddingTop: "28px", borderTop: "1px solid #E2E8F0",
                }}>
                  <span style={{ fontSize: "0.78rem", color: "var(--color-text-muted)", alignSelf: "center", marginRight: "4px" }}>Autres services :</span>
                  {SERVICES_DETAIL.filter(s => s.id !== active).map(s => (
                    <button key={s.id} onClick={() => setActive(s.id)} style={{
                      padding: "5px 14px", borderRadius: "999px", cursor: "pointer",
                      fontSize: "0.78rem", fontWeight: 600, border: `1px solid ${s.color}40`,
                      background: s.lightBg, color: s.color, transition: "transform 0.15s",
                    }}
                      onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
                      onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                    >{s.title}</button>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Pourquoi nous ─────────────────────────────────────────────── */}
        <div style={{ background: "#fff", padding: "72px 5%" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <h2 style={{
              fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 700,
              color: "var(--color-text-heading)", margin: "0 0 12px",
            }}>Pourquoi choisir @TOGO ?</h2>
            <p style={{ fontSize: "1rem", color: "var(--color-text-body)", margin: 0 }}>
              Une équipe locale avec une vision panafricaine.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "20px", maxWidth: "1000px", margin: "0 auto" }} className="why-grid">
            {WHY_US.map(({ Icon, title, desc }, i) => (
              <motion.div key={title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}
                style={{
                  background: "#f8fafc", borderRadius: "16px", padding: "28px 22px",
                  border: "1.5px solid #E2E8F0", textAlign: "center",
                  transition: "box-shadow 0.2s, transform 0.2s",
                }}
                whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(0,0,0,0.08)" }}
              >
                <div style={{
                  width: "52px", height: "52px", borderRadius: "14px",
                  background: "var(--color-brand-light)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 16px",
                }}>
                  <Icon size={22} color="var(--color-brand-primary)" />
                </div>
                <p style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--color-text-heading)", margin: "0 0 8px" }}>{title}</p>
                <p style={{ fontSize: "0.82rem", color: "var(--color-text-body)", lineHeight: 1.65, margin: 0 }}>{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── CTA ───────────────────────────────────────────────────────── */}
        <div style={{
          background: "#070F2B",
          padding: "96px 5%",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Cercle lumineux centre */}
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%,-50%)",
            width: "600px", height: "300px",
            background: "radial-gradient(ellipse, rgba(30,159,232,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />

          <div style={{ position: "relative", zIndex: 1 }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }} transition={{ duration: 0.5 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                background: "rgba(30,159,232,0.12)", border: "1px solid rgba(30,159,232,0.2)",
                color: "#60C8FF", fontSize: "11px", fontWeight: 700,
                letterSpacing: "0.14em", textTransform: "uppercase",
                padding: "7px 18px", borderRadius: "999px", marginBottom: "28px",
              }}
            >
              ✦ Démarrons ensemble
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.1 }}
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800,
                color: "#fff", margin: "0 0 16px", lineHeight: 1.15,
              }}
            >
              Votre projet mérite<br />
              <span style={{
                background: "linear-gradient(135deg, #1E9FE8, #10B981)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>la meilleure équipe.</span>
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.2 }}
              style={{
                fontSize: "1.05rem", color: "rgba(255,255,255,0.55)",
                margin: "0 auto 40px", maxWidth: "440px", lineHeight: 1.7,
              }}
            >
              Discutons de vos besoins et construisons ensemble la solution idéale.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.3 }}
              style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}
            >
              <Link href="/contact" style={{
                display: "inline-flex", alignItems: "center", gap: "10px",
                background: "linear-gradient(135deg,#1E9FE8,#0D7A4E)",
                color: "#fff", fontWeight: 800, fontSize: "1rem",
                padding: "16px 36px", borderRadius: "12px", textDecoration: "none",
                boxShadow: "0 8px 32px rgba(30,159,232,0.3)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 14px 40px rgba(30,159,232,0.4)" }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(30,159,232,0.3)" }}
              >
                Nous contacter <ArrowRight size={18} />
              </Link>
              <Link href="/about" style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)",
                color: "rgba(255,255,255,0.8)", fontWeight: 600, fontSize: "1rem",
                padding: "16px 32px", borderRadius: "12px", textDecoration: "none",
                transition: "background 0.2s",
              }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.12)")}
                onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.07)")}
              >
                En savoir plus sur nous
              </Link>
            </motion.div>
          </div>
        </div>

      </main>
      <Footer />
    </>
  )
}
