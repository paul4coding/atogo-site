"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Smartphone, Zap, ShieldCheck, Clock, ArrowRight, Globe, CheckCircle2 } from "lucide-react"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import { DANAYACASH_COUNTRIES, DANAYACASH_STEPS } from "@/constants/data"

const STEP_ICONS = [Smartphone, Zap, CheckCircle2]

export default function DanayaCashPage() {
  return (
    <>
      <Navbar />
      <main>

        {/* ── Hero ──────────────────────────────────────────────────────── */}
        <div style={{
          background: "linear-gradient(160deg, #052E1C 0%, #0D3D28 50%, #0F4D33 100%)",
          paddingTop: "68px", position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", top: "-80px", right: "-80px",
            width: "400px", height: "400px", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />
          <div style={{ padding: "80px 5% 72px", textAlign: "center", position: "relative", zIndex: 1 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Image src="/images/danayacash-logo.png" alt="DanayaCash"
                width={320} height={110} unoptimized
                style={{ height: "80px", width: "auto", display: "inline-block", marginBottom: "24px" }}
              />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.15 }}
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700,
                color: "#fff", margin: "0 0 16px", lineHeight: 1.15,
              }}
            >
              Envoyez de l&apos;argent partout<br />
              <span style={{ color: "#FBBF24" }}>en Afrique de l&apos;Ouest</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.7)", maxWidth: "500px", margin: "0 auto 36px", lineHeight: 1.7 }}
            >
              DanayaCash rend le transfert d&apos;argent mobile simple, instantané et sécurisé dans 8 pays.
            </motion.p>

            {/* Stats rapides */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              style={{ display: "flex", justifyContent: "center", gap: "40px", flexWrap: "wrap" }}
            >
              {[
                { val: "8",    label: "pays couverts" },
                { val: "2M+",  label: "transactions/mois" },
                { val: "< 5s", label: "délai de transfert" },
                { val: "0%",   label: "frais cachés" },
              ].map(({ val, label }) => (
                <div key={label} style={{ textAlign: "center" }}>
                  <p style={{ fontSize: "1.6rem", fontWeight: 900, color: "#FBBF24", margin: 0 }}>{val}</p>
                  <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.5)", margin: 0 }}>{label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Vague */}
          <div style={{ lineHeight: 0 }}>
            <svg viewBox="0 0 1440 48" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", width: "100%" }}>
              <path d="M0,24 C360,48 1080,0 1440,24 L1440,48 L0,48 Z" fill="#f8fafc" />
            </svg>
          </div>
        </div>

        {/* ── Comment ça marche ──────────────────────────────────────────── */}
        <div style={{ background: "#f8fafc", padding: "80px 5%" }}>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <span style={{
              display: "inline-block", fontSize: "11px", fontWeight: 700,
              letterSpacing: "0.14em", textTransform: "uppercase",
              padding: "7px 18px", borderRadius: "999px",
              background: "var(--color-brand-light)", color: "var(--color-brand-dark)",
              marginBottom: "16px",
            }}>Simple comme bonjour</span>
            <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", fontWeight: 700, color: "var(--color-text-heading)", margin: 0 }}>
              Comment ça marche ?
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px", maxWidth: "900px", margin: "0 auto" }} className="danaya-steps-grid">
            {DANAYACASH_STEPS.map((step, i) => {
              const Icon = STEP_ICONS[i]
              return (
                <motion.div key={step.step}
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.12 }}
                  style={{
                    background: "#fff", borderRadius: "20px", padding: "36px 28px",
                    boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
                    position: "relative", overflow: "hidden",
                    borderTop: "4px solid",
                    borderColor: "#10B981",
                  }}
                >
                  <span style={{
                    position: "absolute", top: "20px", right: "20px",
                    fontSize: "3rem", fontWeight: 900,
                    color: "rgba(16,185,129,0.07)", lineHeight: 1,
                  }}>0{step.step}</span>
                  <div style={{
                    width: "52px", height: "52px", borderRadius: "14px",
                    background: "linear-gradient(135deg,#0D7A4E,#10B981)",
                    display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px",
                  }}>
                    <Icon size={24} color="#fff" />
                  </div>
                  <p style={{ fontSize: "1rem", fontWeight: 700, color: "var(--color-text-heading)", margin: "0 0 10px" }}>{step.title}</p>
                  <p style={{ fontSize: "0.87rem", color: "var(--color-text-body)", lineHeight: 1.7, margin: 0 }}>{step.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* ── Avantages ─────────────────────────────────────────────────── */}
        <div style={{ background: "#fff", padding: "80px 5%" }}>
          <div style={{ textAlign: "center", marginBottom: "52px" }}>
            <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 700, color: "var(--color-text-heading)", margin: 0 }}>
              Pourquoi choisir DanayaCash ?
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "20px", maxWidth: "1000px", margin: "0 auto" }} className="danaya-advantages-grid">
            {[
              { Icon: Zap,         color: "#FBBF24", bg: "rgba(251,191,36,0.1)",   title: "Instantané",     desc: "Votre argent arrive en moins de 5 secondes." },
              { Icon: ShieldCheck, color: "#10B981", bg: "rgba(16,185,129,0.1)",   title: "100% Sécurisé",  desc: "Chiffrement de bout en bout certifié." },
              { Icon: Clock,       color: "#1E9FE8", bg: "rgba(30,159,232,0.1)",   title: "24h/7j",         desc: "Disponible à toute heure, tous les jours." },
              { Icon: Globe,       color: "#A78BFA", bg: "rgba(167,139,250,0.1)",  title: "8 pays",         desc: "Réseau en expansion en Afrique de l'Ouest." },
            ].map(({ Icon, color, bg, title, desc }) => (
              <motion.div key={title}
                initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ duration: 0.4 }}
                style={{
                  background: bg, borderRadius: "16px", padding: "28px 24px",
                  textAlign: "center",
                }}
              >
                <div style={{
                  width: "52px", height: "52px", borderRadius: "14px",
                  background: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 16px", boxShadow: `0 4px 16px ${color}30`,
                }}>
                  <Icon size={24} color={color} />
                </div>
                <p style={{ fontSize: "1rem", fontWeight: 700, color: "var(--color-text-heading)", margin: "0 0 8px" }}>{title}</p>
                <p style={{ fontSize: "0.82rem", color: "var(--color-text-body)", margin: 0, lineHeight: 1.6 }}>{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Pays couverts ─────────────────────────────────────────────── */}
        <div style={{
          background: "linear-gradient(160deg, #052E1C, #0F4D33)",
          padding: "80px 5%",
        }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 700, color: "#fff", margin: "0 0 12px" }}>
              Réseau de couverture
            </h2>
            <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.6)", margin: 0 }}>
              {DANAYACASH_COUNTRIES.length} pays couverts, en expansion continue
            </p>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "14px", justifyContent: "center", maxWidth: "700px", margin: "0 auto 56px" }}>
            {DANAYACASH_COUNTRIES.map((c, i) => (
              <motion.div key={c.code}
                initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.06 }}
                style={{
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.25)",
                  borderRadius: "999px", padding: "10px 20px",
                  color: "#fff", fontSize: "0.9rem", fontWeight: 600,
                }}
              >
                <span style={{ fontSize: "0.72rem", color: "#FBBF24", fontWeight: 800 }}>{c.code}</span>
                {c.name}
              </motion.div>
            ))}
          </div>

          {/* CTA téléchargement */}
          <div style={{ textAlign: "center" }}>
            <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.8)", margin: "0 0 24px" }}>
              Rejoignez des milliers d&apos;utilisateurs qui font confiance à DanayaCash
            </p>
            <Link href="/contact" style={{
              display: "inline-flex", alignItems: "center", gap: "10px",
              background: "linear-gradient(135deg,#FBBF24,#F59E0B)",
              color: "#052E1C", fontWeight: 800, fontSize: "1rem",
              padding: "16px 40px", borderRadius: "12px", textDecoration: "none",
              boxShadow: "0 8px 32px rgba(251,191,36,0.35)",
            }}>
              Commencer maintenant <ArrowRight size={18} />
            </Link>
          </div>
        </div>

      </main>
      <Footer />
    </>
  )
}
