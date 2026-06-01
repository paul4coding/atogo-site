"use client"

import dynamic from "next/dynamic"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowDown } from "lucide-react"

const GlobeAfrica = dynamic(() => import("@/components/3d/GlobeAfrica"), { ssr: false })
const ParticlesBg = dynamic(() => import("@/components/3d/ParticlesBg"), { ssr: false })

const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.13, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function HeroSection() {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
        paddingTop: "68px",
        background: "linear-gradient(135deg, #f0f7ff 0%, #ffffff 45%, #f8faff 100%)",
      }}
    >
      <ParticlesBg />

      {/* Blob décoratif haut-droite */}
      <div style={{
        position: "absolute", top: "-120px", right: "-120px",
        width: "500px", height: "500px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(30,159,232,0.08) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Grid 2 colonnes (inline car Tailwind v4 JIT) */}
      <div style={{
        maxWidth: "1400px",
        margin: "0 auto",
        padding: "0 5%",
        minHeight: "calc(100vh - 64px)",
        display: "grid",
        gridTemplateColumns: "1fr 1.1fr",
        gap: "40px",
        alignItems: "center",
      }}>

        {/* ── Colonne gauche : texte ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

          {/* Badge */}
          <motion.span
            custom={0} variants={fadeUp} initial="hidden" animate="visible"
            style={{
              display: "inline-block", alignSelf: "flex-start",
              fontSize: "12px", fontWeight: 700,
              letterSpacing: "0.14em", textTransform: "uppercase",
              padding: "8px 18px", borderRadius: "999px",
              background: "var(--color-brand-light)",
              color: "var(--color-brand-dark)",
            }}
          >
            Fintech · IT · Digital · Sécurité
          </motion.span>

          {/* Titre H1 */}
          <motion.h1
            custom={1} variants={fadeUp} initial="hidden" animate="visible"
            style={{
              fontSize: "clamp(2.6rem, 5vw, 3.75rem)",
              fontWeight: 600,
              lineHeight: 1.1,
              color: "var(--color-brand-dark)",
              margin: 0,
            }}
          >
            L&apos;avenir digital<br />
            du Togo,{" "}
            <span style={{
              background: "linear-gradient(135deg, var(--color-brand-primary) 0%, #0D7A4E 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              aujourd&apos;hui.
            </span>
          </motion.h1>

          {/* Sous-titre */}
          <motion.p
            custom={2} variants={fadeUp} initial="hidden" animate="visible"
            style={{
              fontSize: "1.2rem", lineHeight: 1.8, maxWidth: "500px",
              color: "var(--color-text-body)", margin: 0,
            }}
          >
            Solutions fintech, informatiques, cybersécurité et marketing digital
            pour les entreprises et particuliers en Afrique de l&apos;Ouest.
          </motion.p>

          {/* CTAs */}
          <motion.div
            custom={3} variants={fadeUp} initial="hidden" animate="visible"
            style={{ display: "flex", flexWrap: "wrap", gap: "14px", paddingTop: "8px", alignItems: "center" }}
          >
            <Link
              href="/danayacash"
              style={{
                padding: "15px 32px", borderRadius: "10px",
                background: "linear-gradient(135deg, #0D7A4E 0%, #10B981 100%)",
                color: "#fff", fontWeight: 600, fontSize: "1rem",
                textDecoration: "none", boxShadow: "0 4px 20px rgba(13,122,78,0.3)",
                transition: "transform 0.2s, box-shadow 0.2s",
                display: "inline-flex", alignItems: "center",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 28px rgba(13,122,78,0.4)" }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 4px 20px rgba(13,122,78,0.3)" }}
            >
              Découvrir DanayaCash
            </Link>
            <Link
              href="/services"
              style={{
                padding: "15px 32px", borderRadius: "10px",
                border: "2px solid var(--color-brand-primary)",
                color: "var(--color-brand-primary)", fontWeight: 600, fontSize: "1rem",
                textDecoration: "none", background: "transparent",
                transition: "background 0.2s, color 0.2s",
                display: "inline-flex", alignItems: "center",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "var(--color-brand-light)" }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "transparent" }}
            >
              Nos services
            </Link>
          </motion.div>

          {/* Badges de confiance */}
          <motion.div
            custom={4} variants={fadeUp} initial="hidden" animate="visible"
            style={{ display: "flex", gap: "20px", paddingTop: "4px", flexWrap: "wrap" }}
          >
            {[
              { val: "8", label: "pays couverts" },
              { val: "2M+", label: "transactions/mois" },
              { val: "5 ans", label: "d'expérience" },
            ].map(({ val, label }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{
                  fontSize: "1.15rem", fontWeight: 700,
                  color: "var(--color-brand-primary)",
                }}>{val}</span>
                <span style={{ fontSize: "0.85rem", color: "var(--color-text-muted)" }}>{label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Colonne droite : Globe 3D ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ height: "min(520px, calc(100vh - 160px))", position: "relative", overflow: "hidden" }}
        >
          <GlobeAfrica />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        style={{
          position: "absolute", bottom: "28px",
          left: "50%", transform: "translateX(-50%)",
          color: "var(--color-brand-primary)",
        }}
      >
        <ArrowDown size={22} />
      </motion.div>

      {/* Vague de séparation */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, lineHeight: 0 }}>
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", width: "100%" }}>
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#f8fafc" />
        </svg>
      </div>
    </section>
  )
}
