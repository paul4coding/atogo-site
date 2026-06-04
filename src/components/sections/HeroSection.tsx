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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    transition: { duration: 0.6, delay: i * 0.13, ease: [0.22, 1, 0.36, 1] as any },
  }),
}

// Animation clip-reveal mot par mot (même effet que AnimeJS splitText)
const TITLE_WORDS = ["L'avenir", "digital", "du", "Togo,"]
const HIGHLIGHT   = "aujourd'hui."

function SplitTitle() {
  return (
    <h1 style={{
      fontSize: "clamp(2.6rem, 5vw, 3.75rem)",
      fontWeight: 600, lineHeight: 1.3,
      color: "var(--color-brand-dark)",
      margin: 0, display: "flex", flexWrap: "wrap",
      columnGap: "0.3em", rowGap: "0.1em",
    }}>
      {TITLE_WORDS.map((word, i) => (
        /* Chaque mot est enveloppé dans un "clip" */
        <span key={word} style={{ overflow: "hidden", display: "inline-block", lineHeight: 1.3 }}>
          <motion.span
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{
              duration: 0.65, delay: 0.1 + i * 0.1,
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              ease: [0.16, 1, 0.3, 1] as any,
            }}
            style={{ display: "inline-block" }}
          >
            {word}
          </motion.span>
        </span>
      ))}
      {/* Mot gradient */}
      <span style={{ overflow: "hidden", display: "inline-block", lineHeight: 1.3 }}>
        <motion.span
          initial={{ y: "110%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          transition={{
            duration: 0.65, delay: 0.1 + TITLE_WORDS.length * 0.1,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ease: [0.16, 1, 0.3, 1] as any,
          }}
          style={{
            display: "inline-block",
            background: "linear-gradient(135deg, var(--color-brand-primary) 0%, #1A3A8F 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {HIGHLIGHT}
        </motion.span>
      </span>
    </h1>
  )
}

export default function HeroSection() {

  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        paddingTop: "68px",
        background: "linear-gradient(150deg, #EBF5FF 0%, #ffffff 40%, #F8FAFF 100%)",
      }}
    >
      <ParticlesBg />

      {/* Grille décorative subtile */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "linear-gradient(rgba(30,159,232,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(30,159,232,0.04) 1px,transparent 1px)",
        backgroundSize: "60px 60px", pointerEvents: "none",
      }} />

      {/* Blob décoratif haut-droite */}
      <div style={{
        position: "absolute", top: "-120px", right: "-120px",
        width: "560px", height: "560px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(30,159,232,0.1) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "10%", left: "-80px",
        width: "360px", height: "360px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(26,58,143,0.05) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Grid 2 colonnes (inline car Tailwind v4 JIT) */}
      <div className="hero-grid">

        {/* ── Colonne gauche : texte ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

          {/* Badge */}
          <motion.span
            custom={0} variants={fadeUp} initial="hidden" animate="visible"
            style={{
              display: "inline-flex", alignItems: "center", gap: "6px", alignSelf: "flex-start",
              fontSize: "11px", fontWeight: 700,
              letterSpacing: "0.14em", textTransform: "uppercase",
              padding: "8px 18px", borderRadius: "999px",
              background: "var(--color-brand-light)",
              color: "var(--color-brand-dark)",
              border: "1px solid rgba(26,58,143,0.14)",
            }}
          >
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#1E9FE8", display: "inline-block", animation: "pulse 2s infinite" }} />
            Lomé, Togo · Depuis 2019
          </motion.span>

          {/* Titre H1 — clip-reveal mot par mot */}
          <SplitTitle />

          {/* Sous-titre */}
          <motion.p
            custom={2} variants={fadeUp} initial="hidden" animate="visible"
            style={{
              fontSize: "1.15rem", lineHeight: 1.82, maxWidth: "480px",
              color: "var(--color-text-body)", margin: 0,
            }}
          >
            Transferts d&apos;argent, solutions IT, cybersécurité, marketing digital
            et vente de téléphones — pour les entreprises et particuliers au Togo.
          </motion.p>

          {/* CTAs */}
          <motion.div
            custom={3} variants={fadeUp} initial="hidden" animate="visible"
            style={{ display: "flex", flexWrap: "wrap", gap: "12px", paddingTop: "8px", alignItems: "center" }}
          >
            <Link
              href="/services"
              style={{
                padding: "15px 34px", borderRadius: "10px",
                background: "linear-gradient(135deg, #1A3A8F, #1E9FE8)",
                color: "#fff", fontWeight: 700, fontSize: "1rem",
                textDecoration: "none", boxShadow: "0 4px 20px rgba(30,159,232,0.35)",
                transition: "transform 0.2s, box-shadow 0.2s",
                display: "inline-flex", alignItems: "center", gap: "8px",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 32px rgba(30,159,232,0.45)" }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 4px 20px rgba(30,159,232,0.35)" }}
            >
              Nos services
            </Link>
            <Link
              href="/transferts"
              style={{
                padding: "15px 32px", borderRadius: "10px",
                border: "1.5px solid #CBD5E1",
                color: "var(--color-brand-dark)", fontWeight: 600, fontSize: "1rem",
                textDecoration: "none", background: "#fff",
                transition: "border-color 0.2s, box-shadow 0.2s",
                display: "inline-flex", alignItems: "center", gap: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "#1E9FE8"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 4px 16px rgba(30,159,232,0.15)" }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "#CBD5E1"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)" }}
            >
              Transferts d&apos;argent
            </Link>
          </motion.div>

          {/* Stats — 4 métriques clés */}
          <motion.div
            custom={4} variants={fadeUp} initial="hidden" animate="visible"
            style={{ display: "flex", gap: "0", paddingTop: "8px", flexWrap: "wrap", border: "1px solid #E2E8F0", borderRadius: "14px", background: "#fff", overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.05)", alignSelf: "flex-start" }}
          >
            {[
              { val: "50 000+", label: "Clients" },
              { val: "200+",    label: "Pays couverts" },
              { val: "5 ans",   label: "Expérience" },
              { val: "6",       label: "Services" },
            ].map(({ val, label }, i) => (
              <div key={label} style={{ padding: "16px 22px", borderRight: i < 3 ? "1px solid #E2E8F0" : "none", textAlign: "center", minWidth: "90px" }}>
                <p style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--color-brand-dark)", margin: "0 0 2px", letterSpacing: "-0.02em" }}>{val}</p>
                <p style={{ fontSize: "0.7rem", color: "var(--color-text-muted)", margin: 0, fontWeight: 500 }}>{label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Colonne droite : Globe 3D ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="hero-globe"
          style={{ height: "calc(100vh - 68px)", position: "relative" }}
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
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#ffffff" />
        </svg>
      </div>
    </section>
  )
}
