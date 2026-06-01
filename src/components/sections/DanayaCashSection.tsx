"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowUpRight, Zap, ShieldCheck, Clock, Smartphone, CheckCircle2 } from "lucide-react"
import { DANAYACASH_COUNTRIES, DANAYACASH_STEPS } from "@/constants/data"

const fadeUp = {
  hidden:  { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as any },
  }),
}

const STEP_ICONS = [Smartphone, Zap, CheckCircle2]

export default function DanayaCashSection() {
  return (
    <section style={{
      position: "relative",
      background: "linear-gradient(160deg, #052E1C 0%, #0D3D28 40%, #0F4D33 100%)",
      padding: "100px 0 0",
      overflow: "hidden",
    }}>

      {/* ── Décors ────────────────────────────────────────────────────────── */}
      <div style={{
        position: "absolute", top: "-100px", right: "-100px",
        width: "500px", height: "500px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "80px", left: "-80px",
        width: "350px", height: "350px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(30,159,232,0.08) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ padding: "0 5%", position: "relative", zIndex: 1 }}>

        {/* ── En-tête avec logo ────────────────────────────────────────────── */}
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            style={{ marginBottom: "24px" }}
          >
            <Image
              src="/images/danayacash-logo.png"
              alt="DanayaCash"
              width={320} height={110}
              unoptimized
              style={{ height: "90px", width: "auto", display: "inline-block" }}
            />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.1 }}
            style={{
              fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 700,
              color: "#fff", margin: "0 0 16px", lineHeight: 1.2,
            }}
          >
            Transférez de l&apos;argent{" "}
            <span style={{ color: "#FBBF24" }}>en secondes</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              fontSize: "1.1rem", color: "rgba(255,255,255,0.65)",
              maxWidth: "520px", margin: "0 auto", lineHeight: 1.7,
            }}
          >
            DanayaCash rend le transfert d&apos;argent mobile simple, rapide et sécurisé
            partout en Afrique de l&apos;Ouest.
          </motion.p>
        </div>

        {/* ── Grid principal : étapes + avantages ──────────────────────────── */}
        <div className="danaya-grid">

          {/* Colonne gauche — 3 étapes */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <motion.p
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }} transition={{ duration: 0.4 }}
              style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.12em",
                textTransform: "uppercase", color: "rgba(255,255,255,0.35)", margin: "0 0 8px" }}
            >
              Comment ça marche
            </motion.p>

            {DANAYACASH_STEPS.map((s, i) => {
              const Icon = STEP_ICONS[i]
              return (
                <motion.div
                  key={s.step}
                  custom={i} variants={fadeUp} initial="hidden" whileInView="visible"
                  viewport={{ once: true }}
                  style={{
                    display: "flex", gap: "20px", alignItems: "flex-start",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "16px", padding: "24px",
                    transition: "background 0.2s",
                  }}
                  whileHover={{ background: "rgba(255,255,255,0.07)" }}
                >
                  {/* Icône + numéro */}
                  <div style={{ flexShrink: 0 }}>
                    <div style={{
                      width: "48px", height: "48px", borderRadius: "12px",
                      background: "linear-gradient(135deg, #0D7A4E, #10B981)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <Icon size={22} color="#fff" />
                    </div>
                  </div>
                  {/* Texte */}
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                      <span style={{
                        fontSize: "10px", fontWeight: 700, color: "#34D399",
                        background: "rgba(52,211,153,0.12)", padding: "2px 8px",
                        borderRadius: "999px",
                      }}>
                        Étape {s.step}
                      </span>
                    </div>
                    <p style={{ fontSize: "1rem", fontWeight: 600, color: "#fff", margin: "0 0 6px" }}>
                      {s.title}
                    </p>
                    <p style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.55)", margin: 0, lineHeight: 1.6 }}>
                      {s.description}
                    </p>
                  </div>
                </motion.div>
              )
            })}

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link href="/danayacash" style={{
                display: "inline-flex", alignItems: "center", gap: "10px",
                background: "linear-gradient(135deg, #0D7A4E, #10B981)",
                color: "#fff", fontWeight: 700, fontSize: "1rem",
                padding: "15px 32px", borderRadius: "12px",
                textDecoration: "none",
                boxShadow: "0 8px 32px rgba(13,122,78,0.4)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)"
                  ;(e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 14px 40px rgba(13,122,78,0.5)"
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)"
                  ;(e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 32px rgba(13,122,78,0.4)"
                }}
              >
                Découvrir DanayaCash <ArrowUpRight size={18} />
              </Link>
            </motion.div>
          </div>

          {/* Colonne droite — visuel + avantages */}
          <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>

            {/* Visuel photo DanayaCash */}
            <motion.div
              initial={{ opacity: 0, scale: 0.93 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }} transition={{ duration: 0.7 }}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Image
                src="/images/danayacash-visual.png"
                alt="DanayaCash — transfert d'argent en Afrique"
                width={380} height={420}
                unoptimized
                style={{
                  width: "min(340px, 100%)", height: "auto",
                  filter: "drop-shadow(0 20px 60px rgba(0,0,0,0.5))",
                }}
              />
            </motion.div>

            {/* 4 avantages en 2×2 */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              {[
                { Icon: Zap,         title: "Instantané",    desc: "Transfert en secondes" },
                { Icon: ShieldCheck, title: "Sécurisé",      desc: "Chiffrement bout en bout" },
                { Icon: Clock,       title: "24h/7j",        desc: "Disponible à toute heure" },
                { Icon: Smartphone,  title: "Mobile first",  desc: "iOS & Android" },
              ].map(({ Icon, title, desc }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "12px", padding: "16px",
                  }}
                >
                  <Icon size={18} color="#FBBF24" style={{ marginBottom: "8px" }} />
                  <p style={{ fontSize: "0.88rem", fontWeight: 700, color: "#fff", margin: "0 0 3px" }}>{title}</p>
                  <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.45)", margin: 0 }}>{desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Pays couverts */}
            <div style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(251,191,36,0.2)",
              borderRadius: "14px", padding: "20px",
            }}>
              <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em",
                textTransform: "uppercase", color: "rgba(255,255,255,0.35)", margin: "0 0 12px" }}>
                {DANAYACASH_COUNTRIES.length} pays couverts
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {DANAYACASH_COUNTRIES.map(c => (
                  <span key={c.code} style={{
                    display: "inline-flex", alignItems: "center", gap: "5px",
                    background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.2)",
                    borderRadius: "999px", padding: "4px 12px",
                    fontSize: "0.78rem", fontWeight: 600, color: "#fff",
                  }}>
                    <span style={{ fontSize: "0.65rem", color: "#FBBF24", fontWeight: 800 }}>{c.code}</span>
                    {c.name}
                  </span>
                ))}
              </div>
              <div style={{
                display: "flex", gap: "24px", marginTop: "16px",
                paddingTop: "16px", borderTop: "1px solid rgba(255,255,255,0.07)",
              }}>
                {[
                  { val: "2M+",  label: "transactions/mois" },
                  { val: "< 5s", label: "délai transfert" },
                  { val: "0%",   label: "frais cachés" },
                ].map(({ val, label }) => (
                  <div key={label}>
                    <p style={{ fontSize: "1.2rem", fontWeight: 800, color: "#FBBF24", margin: 0 }}>{val}</p>
                    <p style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.4)", margin: 0 }}>{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Vague de séparation vers la section suivante ─────────────────── */}
      <div style={{ lineHeight: 0 }}>
        <svg viewBox="0 0 1440 64" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", width: "100%" }}>
          <path d="M0,32 C480,64 960,0 1440,32 L1440,64 L0,64 Z" fill="#f8fafc" />
        </svg>
      </div>

    </section>
  )
}
