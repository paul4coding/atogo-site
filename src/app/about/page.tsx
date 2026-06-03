"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Target, Eye, Heart, ArrowRight, Globe, Users, Zap, Shield } from "lucide-react"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"

const VALUES = [
  { Icon: Zap,    color: "#1E9FE8", bg: "rgba(30,159,232,0.1)",  title: "Innovation",   desc: "Nous adoptons les meilleures technologies pour transformer l'Afrique." },
  { Icon: Shield, color: "#0D7A4E", bg: "rgba(13,122,78,0.1)",   title: "Confiance",    desc: "Sécurité et transparence au cœur de chaque solution que nous déployons." },
  { Icon: Users,  color: "#7C3AED", bg: "rgba(124,58,237,0.1)",  title: "Proximité",    desc: "Une équipe locale qui comprend les enjeux du marché africain." },
  { Icon: Globe,  color: "#D97706", bg: "rgba(217,119,6,0.1)",   title: "Impact",       desc: "Chaque solution contribue au développement numérique de l'Afrique." },
]

const TIMELINE = [
  { year: "2019", title: "Fondation de @TOGO", desc: "Création de la société à Lomé avec une vision claire : accompagner les entreprises et particuliers vers l'avenir numérique." },
  { year: "2020", title: "Services de transferts", desc: "Lancement des services de transferts d'argent nationaux (Flooz, MixBy Yas) et partenariats avec Western Union et MoneyGram." },
  { year: "2021", title: "Expansion des partenariats", desc: "Extension du réseau de transferts internationaux avec RIA et renforcement de la présence locale à Lomé." },
  { year: "2023", title: "Solutions IT & Marketing", desc: "Lancement officiel des divisions Solutions Informatiques, Cybersécurité et Marketing Digital pour les entreprises." },
  { year: "2024", title: "Vente de téléphones", desc: "Devenir revendeur agréé Blackview, Oukitel et Doogee — smartphones robustes adaptés au marché africain." },
]

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>

        {/* ── Hero ──────────────────────────────────────────────────────── */}
        <div style={{
          background: "linear-gradient(135deg, #f0f7ff 0%, #ffffff 60%, #f8faff 100%)",
          paddingTop: "68px",
        }}>
          <div style={{ padding: "80px 5% 64px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "center" }} className="about-hero-grid">
              <div>
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
                >Notre histoire</motion.span>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.1 }}
                  style={{
                    fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700,
                    color: "var(--color-text-heading)", margin: "0 0 20px", lineHeight: 1.15,
                  }}
                >
                  La référence digitale<br />
                  <span style={{ color: "var(--color-brand-primary)" }}>au Togo</span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  style={{
                    fontSize: "1.05rem", color: "var(--color-text-body)",
                    lineHeight: 1.75, maxWidth: "480px", marginBottom: "32px",
                  }}
                >
                  Fondée à Lomé en 2019, @TOGO accompagne entreprises et particuliers
                  avec des services de transferts d&apos;argent, solutions IT, cybersécurité,
                  marketing digital et vente de téléphones.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  style={{ display: "flex", gap: "32px", flexWrap: "wrap" }}
                >
                  {[
                    { val: "5 ans", label: "d'expérience" },
                    { val: "6",    label: "services proposés" },
                    { val: "50k+", label: "clients satisfaits" },
                  ].map(({ val, label }) => (
                    <div key={label}>
                      <p style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--color-brand-primary)", margin: 0 }}>{val}</p>
                      <p style={{ fontSize: "0.8rem", color: "var(--color-text-muted)", margin: 0 }}>{label}</p>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Logo flottant */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
              >
                <motion.div
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                  style={{
                    background: "linear-gradient(135deg, #1A3A8F, #1E9FE8)",
                    borderRadius: "32px", padding: "48px",
                    boxShadow: "0 24px 80px rgba(30,159,232,0.25)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  <Image src="/images/logo.png" alt="@TOGO" width={200} height={66}
                    unoptimized style={{ height: "66px", width: "auto", filter: "brightness(0) invert(1)" }}
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* ── Mission / Vision ──────────────────────────────────────────── */}
        <div style={{ background: "#f8fafc", padding: "80px 5%" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "24px", maxWidth: "1100px", margin: "0 auto" }} className="mvv-grid">
            {[
              { Icon: Target, color: "#1E9FE8", bg: "linear-gradient(135deg,#1A3A8F,#1E9FE8)", title: "Notre mission", text: "Rendre les services digitaux et financiers accessibles à tous au Togo — transferts d'argent, IT, cybersécurité, marketing et téléphones." },
              { Icon: Eye,    color: "#0D7A4E", bg: "linear-gradient(135deg,#0D7A4E,#10B981)", title: "Notre vision",  text: "Devenir la référence des services numériques et financiers en Afrique de l'Ouest, en plaçant le client au centre de chaque solution." },
              { Icon: Heart,  color: "#7C3AED", bg: "linear-gradient(135deg,#7C3AED,#A78BFA)", title: "Nos valeurs",  text: "Innovation, confiance, proximité et impact social. Chaque décision est guidée par notre engagement envers l'Afrique." },
            ].map(({ Icon, bg, title, text }) => (
              <motion.div key={title}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5 }}
                style={{
                  background: "#fff", borderRadius: "20px", padding: "36px 28px",
                  boxShadow: "0 2px 16px rgba(0,0,0,0.06)", overflow: "hidden",
                  position: "relative",
                }}
              >
                <div style={{
                  width: "52px", height: "52px", borderRadius: "14px",
                  background: bg, display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: "20px",
                }}>
                  <Icon size={24} color="#fff" />
                </div>
                <p style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--color-text-heading)", margin: "0 0 12px" }}>{title}</p>
                <p style={{ fontSize: "0.88rem", color: "var(--color-text-body)", lineHeight: 1.75, margin: 0 }}>{text}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Valeurs ───────────────────────────────────────────────────── */}
        <div style={{ background: "#fff", padding: "80px 5%" }}>
          <div style={{ textAlign: "center", marginBottom: "52px" }}>
            <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 700, color: "var(--color-text-heading)", margin: 0 }}>
              Ce qui nous définit
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "20px", maxWidth: "1000px", margin: "0 auto" }} className="values-grid">
            {VALUES.map(({ Icon, color, bg, title, desc }, i) => (
              <motion.div key={title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}
                style={{ background: bg, borderRadius: "16px", padding: "28px 22px" }}
              >
                <div style={{
                  width: "48px", height: "48px", borderRadius: "12px",
                  background: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: "16px", boxShadow: `0 4px 16px ${color}25`,
                }}>
                  <Icon size={22} color={color} />
                </div>
                <p style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--color-text-heading)", margin: "0 0 8px" }}>{title}</p>
                <p style={{ fontSize: "0.82rem", color: "var(--color-text-body)", lineHeight: 1.65, margin: 0 }}>{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Timeline ──────────────────────────────────────────────────── */}
        <div style={{ background: "#f8fafc", padding: "80px 5%" }}>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 700, color: "var(--color-text-heading)", margin: 0 }}>
              Notre parcours
            </h2>
          </div>
          <div style={{ maxWidth: "700px", margin: "0 auto", position: "relative" }}>
            {/* Ligne verticale */}
            <div style={{
              position: "absolute", left: "28px", top: 0, bottom: 0,
              width: "2px", background: "linear-gradient(to bottom, #1E9FE8, #0D7A4E)",
            }} />
            <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
              {TIMELINE.map((t, i) => (
                <motion.div key={t.year}
                  initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                  style={{ display: "flex", gap: "28px", alignItems: "flex-start", paddingLeft: "8px" }}
                >
                  {/* Point */}
                  <div style={{
                    width: "42px", height: "42px", borderRadius: "50%", flexShrink: 0,
                    background: "linear-gradient(135deg, #1A3A8F, #1E9FE8)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: "0 0 0 4px #f8fafc",
                    zIndex: 1,
                  }}>
                    <span style={{ fontSize: "0.65rem", fontWeight: 800, color: "#fff" }}>{t.year}</span>
                  </div>
                  {/* Contenu */}
                  <div style={{
                    background: "#fff", borderRadius: "14px", padding: "20px 24px",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.06)", flex: 1,
                  }}>
                    <p style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--color-text-heading)", margin: "0 0 6px" }}>{t.title}</p>
                    <p style={{ fontSize: "0.85rem", color: "var(--color-text-body)", lineHeight: 1.65, margin: 0 }}>{t.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* ── CTA ───────────────────────────────────────────────────────── */}
        <div style={{
          background: "linear-gradient(135deg, #1A3A8F, #1E9FE8)",
          padding: "72px 5%", textAlign: "center",
        }}>
          <p style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 700, color: "#fff", margin: "0 0 12px" }}>
            Rejoignez l&apos;aventure @TOGO
          </p>
          <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.8)", margin: "0 0 32px" }}>
            Travaillons ensemble à la transformation digitale de l&apos;Afrique.
          </p>
          <Link href="/contact" style={{
            display: "inline-flex", alignItems: "center", gap: "10px",
            background: "#fff", color: "#1A3A8F",
            fontWeight: 800, fontSize: "1rem",
            padding: "15px 36px", borderRadius: "12px", textDecoration: "none",
          }}>
            Nous contacter <ArrowRight size={18} />
          </Link>
        </div>

      </main>
      <Footer />
    </>
  )
}
