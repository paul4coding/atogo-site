"use client"

import Link from "next/link"
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

        {/* ── En-tête ──────────────────────────────────────────────────────── */}
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <motion.span
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            style={{
              display: "inline-block",
              fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em",
              textTransform: "uppercase", padding: "7px 18px", borderRadius: "999px",
              background: "rgba(16,185,129,0.15)", color: "#34D399",
              border: "1px solid rgba(16,185,129,0.3)", marginBottom: "20px",
            }}
          >
            Produit phare
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.1 }}
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700,
              color: "#fff", margin: "0 0 16px", lineHeight: 1.15,
            }}
          >
            Transférez de l&apos;argent{" "}
            <span style={{ color: "#34D399" }}>en secondes</span>
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
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: "48px", alignItems: "start", marginBottom: "80px",
        }}>

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

          {/* Colonne droite — avantages + pays */}
          <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>

            {/* Avantages clés */}
            <div>
              <p style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.12em",
                textTransform: "uppercase", color: "rgba(255,255,255,0.35)", margin: "0 0 20px" }}>
                Pourquoi DanayaCash ?
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                {[
                  { Icon: Zap,        title: "Instantané",    desc: "Transfert en quelques secondes" },
                  { Icon: ShieldCheck, title: "100% sécurisé", desc: "Chiffrement de bout en bout" },
                  { Icon: Clock,      title: "24h/7j",        desc: "Disponible à toute heure" },
                  { Icon: Smartphone, title: "Mobile first",  desc: "Application iOS & Android" },
                ].map(({ Icon, title, desc }) => (
                  <motion.div
                    key={title}
                    initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }} transition={{ duration: 0.4 }}
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "14px", padding: "20px 18px",
                    }}
                  >
                    <Icon size={20} color="#34D399" style={{ marginBottom: "10px" }} />
                    <p style={{ fontSize: "0.9rem", fontWeight: 700, color: "#fff", margin: "0 0 4px" }}>{title}</p>
                    <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.5)", margin: 0 }}>{desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Pays couverts */}
            <div style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(16,185,129,0.2)",
              borderRadius: "16px", padding: "24px",
            }}>
              <p style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.12em",
                textTransform: "uppercase", color: "rgba(255,255,255,0.35)", margin: "0 0 16px" }}>
                Réseau de couverture — {DANAYACASH_COUNTRIES.length} pays
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {DANAYACASH_COUNTRIES.map(c => (
                  <motion.div
                    key={c.code}
                    initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    style={{
                      display: "inline-flex", alignItems: "center", gap: "6px",
                      background: "rgba(16,185,129,0.1)",
                      border: "1px solid rgba(16,185,129,0.2)",
                      borderRadius: "999px", padding: "6px 14px",
                      fontSize: "0.82rem", fontWeight: 600, color: "#fff",
                    }}
                  >
                    <span style={{ fontSize: "0.7rem", color: "#34D399", fontWeight: 700 }}>{c.code}</span>
                    {c.name}
                  </motion.div>
                ))}
              </div>

              {/* Mini stats */}
              <div style={{
                display: "flex", gap: "32px", marginTop: "20px",
                paddingTop: "20px", borderTop: "1px solid rgba(255,255,255,0.08)",
              }}>
                {[
                  { val: "2M+",  label: "transactions/mois" },
                  { val: "< 5s", label: "délai de transfert" },
                  { val: "0%",   label: "frais cachés" },
                ].map(({ val, label }) => (
                  <div key={label}>
                    <p style={{ fontSize: "1.3rem", fontWeight: 800, color: "#34D399", margin: 0 }}>{val}</p>
                    <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.45)", margin: 0 }}>{label}</p>
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
