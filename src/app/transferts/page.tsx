"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowRight, MapPin, ShieldCheck, Globe, Zap,
  Users, Building2, CheckCircle, PhoneCall,
  ArrowLeftRight, Banknote, Lock, BadgeCheck,
} from "lucide-react"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import { TRANSFER_STEPS } from "@/constants/data"

// Données enrichies locales
const NATIONAL_DETAIL = [
  {
    name: "Flooz",
    logo: "/images/flooz.png",
    tagline: "MOOV Money — Mobile Money Togo",
    desc: "Rechargez et transférez via le réseau MOOV. Disponible dans toutes nos agences.",
    features: ["Recharge rapide", "Transfert instantané", "Sans frais cachés"],
    color: "#F97316", glow: "rgba(249,115,22,0.18)", border: "rgba(249,115,22,0.28)",
  },
  {
    name: "MixBy Yas",
    logo: "/images/yas-agent.png",
    tagline: "Yas Agent — Transferts nationaux",
    desc: "Service Yas Agent agréé pour tous vos transferts Mobile Money au Togo.",
    features: ["Envoi immédiat", "Large réseau d'agents", "Sécurisé"],
    color: "#60A5FA", glow: "rgba(96,165,250,0.18)", border: "rgba(96,165,250,0.28)",
  },
]

const INTERNATIONAL_DETAIL = [
  {
    name: "Western Union",
    logo: "/images/western-union.webp",
    tagline: "Leader mondial du transfert d'argent",
    desc: "Envoyez dans plus de 200 pays et territoires. Le réseau le plus large au monde.",
    features: ["200+ pays couverts", "Disponible en quelques minutes", "Retrait flexible"],
    color: "#FBBF24", glow: "rgba(251,191,36,0.18)", border: "rgba(251,191,36,0.3)",
  },
  {
    name: "MoneyGram",
    logo: "/images/moneygram.webp",
    tagline: "Transferts rapides vers le monde entier",
    desc: "Recevez et envoyez de l'argent vers l'Europe, les Amériques et l'Asie.",
    features: ["Réseau mondial fiable", "Traitement en temps réel", "Suivi en ligne"],
    color: "#F87171", glow: "rgba(248,113,113,0.18)", border: "rgba(248,113,113,0.28)",
  },
  {
    name: "RIA Money Transfer",
    logo: "/images/ria.png",
    tagline: "Transferts abordables et sécurisés",
    desc: "Envoyez vers l'Europe et les Amériques avec les meilleurs taux du marché.",
    features: ["Taux compétitifs", "Europe & USA", "Rapide et sécurisé"],
    color: "#A78BFA", glow: "rgba(167,139,250,0.18)", border: "rgba(167,139,250,0.28)",
  },
]

const STATS = [
  { val: "6",        label: "Partenaires agréés",  Icon: Building2 },
  { val: "200+",     label: "Pays couverts",         Icon: Globe     },
  { val: "< 5 min",  label: "Délai moyen",           Icon: Zap       },
  { val: "50 000+",  label: "Clients satisfaits",    Icon: Users     },
]

export default function TransfertsPage() {
  const [tab, setTab] = useState<"national" | "international">("national")
  const h1Ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!h1Ref.current) return
    import("animejs").then(({ animate, stagger, splitText }) => {
      if (!h1Ref.current) return
      const { chars } = splitText(h1Ref.current, { words: false, chars: true })
      animate(chars, {
        y:       [{ to: "-2.5rem", ease: "outExpo", duration: 500 }, { to: 0, ease: "outBounce", duration: 700, delay: 100 }],
        rotate:  { from: "-0.5turn", delay: 0 },
        opacity: { from: 0, to: 1, duration: 80 },
        delay:   stagger(40),
        ease:    "inOutCirc",
      })
    })
  }, [])

  return (
    <>
      <Navbar />
      <main>

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <div style={{ background: "linear-gradient(160deg,#000000 0%,#030612 30%,#050B20 60%,#080F2A 100%)", paddingTop: "68px", position: "relative", overflow: "hidden", minHeight: "620px" }}>

          {/* Grille subtile */}
          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)", backgroundSize: "80px 80px", pointerEvents: "none" }} />

          {/* Orbes */}
          <div style={{ position: "absolute", top: "-140px", right: "-80px", width: "640px", height: "640px", borderRadius: "50%", background: "radial-gradient(circle,rgba(251,191,36,0.07) 0%,transparent 65%)", animation: "float 9s ease-in-out infinite", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: "-80px", left: "-120px", width: "520px", height: "520px", borderRadius: "50%", background: "radial-gradient(circle,rgba(30,159,232,0.08) 0%,transparent 65%)", animation: "float 11s ease-in-out infinite reverse", pointerEvents: "none" }} />
          <div style={{ position: "absolute", top: "35%", left: "42%", width: "300px", height: "300px", borderRadius: "50%", background: "radial-gradient(circle,rgba(124,58,237,0.05) 0%,transparent 70%)", animation: "float 7s ease-in-out infinite 2s", pointerEvents: "none" }} />

          <div style={{ padding: "76px 5% 0", position: "relative", zIndex: 1 }}>
            <div style={{ maxWidth: "880px", margin: "0 auto", textAlign: "center" }}>

              {/* Badges confiance */}
              <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
                style={{ marginBottom: "32px", display: "flex", justifyContent: "center", gap: "10px", flexWrap: "wrap" }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "7px", fontSize: "10.5px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", padding: "8px 18px", borderRadius: "999px", background: "rgba(251,191,36,0.1)", color: "#FDE68A", border: "1px solid rgba(251,191,36,0.22)", backdropFilter: "blur(10px)" }}>
                  <Lock size={10} /> Services financiers agréés
                </span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "7px", fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "7px 14px", borderRadius: "999px", background: "rgba(16,185,129,0.1)", color: "#6EE7B7", border: "1px solid rgba(16,185,129,0.2)" }}>
                  <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#10B981", animation: "pulse 2s infinite", display: "inline-block" }} />
                  Agence ouverte · Lomé, Togo
                </span>
              </motion.div>

              {/* H1 */}
              <h1 style={{ fontSize: "clamp(2.8rem,5.5vw,4.6rem)", fontWeight: 900, color: "#fff", margin: "0 0 12px", lineHeight: 1.0, letterSpacing: "-0.035em", overflow: "visible" }}>
                <span ref={h1Ref} style={{ display: "block" }}>Envoyez de l&apos;argent</span>
                <span style={{ background: "linear-gradient(135deg,#FBBF24 0%,#F59E0B 30%,#FDE68A 60%,#FBBF24 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", display: "block", backgroundSize: "200% auto", animation: "shimmer 4s linear infinite" }}>
                  partout, en toute confiance
                </span>
              </h1>

              <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.7 }}
                style={{ fontSize: "1.08rem", color: "rgba(255,255,255,0.52)", maxWidth: "540px", margin: "22px auto 0", lineHeight: 1.88 }}>
                Votre agence agréée à Lomé — Mobile Money Togo et transferts vers{" "}
                <strong style={{ color: "rgba(255,255,255,0.88)", fontWeight: 600 }}>200+ pays</strong>{" "}
                avec Western Union, MoneyGram et RIA.
              </motion.p>

              {/* CTA buttons */}
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.88 }}
                style={{ marginTop: "36px", display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
                <Link href="/contact"
                  style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "linear-gradient(135deg,#FBBF24,#F59E0B)", color: "#0A0A0A", fontWeight: 800, fontSize: "0.95rem", padding: "14px 32px", borderRadius: "12px", textDecoration: "none", boxShadow: "0 8px 32px rgba(251,191,36,0.32), 0 0 0 1px rgba(251,191,36,0.2)" }}>
                  Effectuer un transfert <ArrowRight size={17} />
                </Link>
                <a href="#partenaires"
                  style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.11)", color: "rgba(255,255,255,0.72)", fontWeight: 600, fontSize: "0.95rem", padding: "14px 28px", borderRadius: "12px", textDecoration: "none", backdropFilter: "blur(8px)", cursor: "pointer" }}>
                  Voir nos partenaires
                </a>
              </motion.div>

              {/* Logos partenaires */}
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 1.05 }}
                style={{ marginTop: "60px", marginBottom: "8px" }}>
                <p style={{ fontSize: "0.62rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(255,255,255,0.2)", marginBottom: "18px" }}>
                  Partenaires officiels agréés
                </p>
                <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
                  {[...NATIONAL_DETAIL, ...INTERNATIONAL_DETAIL].map((p, i) => (
                    <motion.div key={p.name}
                      initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 1.1 + i * 0.06 }}
                      style={{ background: "rgba(255,255,255,0.95)", borderRadius: "12px", padding: "10px 18px", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 20px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.8)", cursor: "default" }}>
                      <Image src={p.logo} alt={p.name} width={88} height={32} unoptimized style={{ height: "26px", width: "auto", objectFit: "contain" }} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Barre de stats */}
          <div style={{ padding: "44px 5% 0", position: "relative", zIndex: 1 }}>
            <div style={{ maxWidth: "900px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", background: "rgba(255,255,255,0.04)", borderRadius: "18px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)" }} className="hero-stats-grid">
              {STATS.map(({ val, label, Icon }, i) => (
                <motion.div key={label}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.55 + i * 0.1 }}
                  style={{ padding: "26px 20px", textAlign: "center", borderRight: i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", marginBottom: "7px" }}>
                    <Icon size={13} color="rgba(251,191,36,0.75)" />
                    <p style={{ fontSize: "0.57rem", fontWeight: 700, color: "rgba(255,255,255,0.28)", textTransform: "uppercase", letterSpacing: "0.12em", margin: 0 }}>{label}</p>
                  </div>
                  <p style={{ fontSize: "1.65rem", fontWeight: 900, color: "#fff", margin: 0, letterSpacing: "-0.03em", lineHeight: 1 }}>{val}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Vague de transition */}
          <div style={{ lineHeight: 0, marginTop: "52px" }}>
            <svg viewBox="0 0 1440 56" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", width: "100%" }}>
              <path d="M0,28 C360,56 720,0 1080,28 C1260,42 1380,14 1440,28 L1440,56 L0,56 Z" fill="#050B1E" />
            </svg>
          </div>
        </div>

        {/* ── TABS + CARTES PARTENAIRES ─────────────────────────────────── */}
        <div id="partenaires" style={{ background: "#050B1E", padding: "72px 5% 84px" }}>

          {/* En-tête section */}
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <motion.span initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "10.5px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", padding: "7px 16px", borderRadius: "999px", background: "rgba(30,159,232,0.1)", color: "#7DD3FC", border: "1px solid rgba(30,159,232,0.2)", marginBottom: "16px" }}>
              <Globe size={11} /> Couverture nationale &amp; internationale
            </motion.span>
            <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              style={{ fontSize: "clamp(1.6rem,3vw,2.2rem)", fontWeight: 800, color: "#fff", margin: 0, letterSpacing: "-0.02em" }}>
              Choisissez votre service de transfert
            </motion.h2>
          </div>

          {/* Sélecteur de tab */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "52px" }}>
            <div style={{ display: "inline-flex", background: "rgba(255,255,255,0.03)", borderRadius: "16px", padding: "5px", border: "1px solid rgba(255,255,255,0.07)", gap: "4px" }}>
              {([
                { key: "national",      Icon: MapPin,  label: "Transferts Nationaux",      sub: "Flooz · MixBy Yas"     },
                { key: "international", Icon: Globe,   label: "Transferts Internationaux",  sub: "WU · MoneyGram · RIA" },
              ] as const).map(t => (
                <button key={t.key} onClick={() => setTab(t.key)} style={{
                  display: "flex", alignItems: "center", gap: "10px",
                  padding: "13px 26px", borderRadius: "12px", border: "none", cursor: "pointer",
                  transition: "all 0.25s", fontFamily: "inherit",
                  background:   tab === t.key ? "linear-gradient(135deg,#1A3A8F,#1E9FE8)" : "transparent",
                  color:        tab === t.key ? "#fff" : "rgba(255,255,255,0.4)",
                  boxShadow:    tab === t.key ? "0 4px 24px rgba(30,159,232,0.25), inset 0 1px 0 rgba(255,255,255,0.08)" : "none",
                }}>
                  <t.Icon size={17} />
                  <div style={{ textAlign: "left" }}>
                    <p style={{ fontSize: "0.85rem", fontWeight: 700, margin: 0, lineHeight: 1.25 }}>{t.label}</p>
                    <p style={{ fontSize: "0.67rem", margin: 0, opacity: tab === t.key ? 0.65 : 0.38, lineHeight: 1.2, fontWeight: 500 }}>{t.sub}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Contenu des tabs */}
          <AnimatePresence mode="wait">
            <motion.div key={tab}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.28 }}>

              {tab === "national" && (
                <div>
                  <div style={{ textAlign: "center", marginBottom: "36px" }}>
                    <h3 style={{ fontSize: "1.08rem", fontWeight: 700, color: "#fff", margin: "0 0 8px" }}>Mobile Money au Togo</h3>
                    <p style={{ fontSize: "0.87rem", color: "rgba(255,255,255,0.42)", maxWidth: "460px", margin: "0 auto", lineHeight: 1.72 }}>
                      Rechargez et transférez via nos partenaires Mobile Money agréés — service rapide, en agence.
                    </p>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", maxWidth: "860px", margin: "0 auto" }} className="partners-grid">
                    {NATIONAL_DETAIL.map((p, i) => (
                      <motion.div key={p.name}
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.1 }}
                        whileHover={{ y: -5 }}
                        style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${p.border}`, borderRadius: "20px", overflow: "hidden", cursor: "default", transition: "box-shadow 0.3s, transform 0.3s" }}
                        onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = `0 20px 60px ${p.glow}` }}
                        onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = "none" }}>
                        {/* Accent coloré */}
                        <div style={{ height: "3px", background: `linear-gradient(90deg,${p.color},${p.color}60)` }} />

                        <div style={{ padding: "28px" }}>
                          {/* Header */}
                          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
                            <div style={{ background: "#fff", borderRadius: "12px", padding: "12px", boxShadow: `0 4px 20px ${p.glow}`, flexShrink: 0 }}>
                              <Image src={p.logo} alt={p.name} width={80} height={36} unoptimized style={{ height: "32px", width: "auto", objectFit: "contain", display: "block" }} />
                            </div>
                            <div>
                              <p style={{ fontSize: "1.05rem", fontWeight: 800, color: "#fff", margin: "0 0 4px" }}>{p.name}</p>
                              <p style={{ fontSize: "0.72rem", color: p.color, fontWeight: 600, margin: 0 }}>{p.tagline}</p>
                            </div>
                          </div>

                          <p style={{ fontSize: "0.84rem", color: "rgba(255,255,255,0.48)", lineHeight: 1.75, margin: "0 0 20px" }}>{p.desc}</p>

                          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                            {p.features.map(f => (
                              <div key={f} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: p.glow, border: `1px solid ${p.color}45`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                  <CheckCircle size={11} color={p.color} />
                                </div>
                                <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.62)", fontWeight: 500 }}>{f}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {tab === "international" && (
                <div>
                  <div style={{ textAlign: "center", marginBottom: "36px" }}>
                    <h3 style={{ fontSize: "1.08rem", fontWeight: 700, color: "#fff", margin: "0 0 8px" }}>Vers plus de 200 pays</h3>
                    <p style={{ fontSize: "0.87rem", color: "rgba(255,255,255,0.42)", maxWidth: "490px", margin: "0 auto", lineHeight: 1.72 }}>
                      Envoyez et recevez de l&apos;argent vers l&apos;Europe, les Amériques et le monde entier via nos partenaires internationaux.
                    </p>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "20px", maxWidth: "1020px", margin: "0 auto" }} className="partners-intl-grid">
                    {INTERNATIONAL_DETAIL.map((p, i) => (
                      <motion.div key={p.name}
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.1 }}
                        whileHover={{ y: -5 }}
                        style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${p.border}`, borderRadius: "20px", overflow: "hidden", cursor: "default", transition: "box-shadow 0.3s, transform 0.3s" }}
                        onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = `0 20px 60px ${p.glow}` }}
                        onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = "none" }}>
                        <div style={{ height: "3px", background: `linear-gradient(90deg,${p.color},${p.color}60)` }} />

                        <div style={{ padding: "26px 24px" }}>
                          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "12px", marginBottom: "18px" }}>
                            <div style={{ background: "#fff", borderRadius: "12px", padding: "11px 17px", boxShadow: `0 4px 20px ${p.glow}` }}>
                              <Image src={p.logo} alt={p.name} width={100} height={36} unoptimized style={{ height: "26px", width: "auto", objectFit: "contain", display: "block" }} />
                            </div>
                            <p style={{ fontSize: "0.7rem", color: p.color, fontWeight: 700, margin: 0, letterSpacing: "0.02em" }}>{p.tagline}</p>
                          </div>

                          <p style={{ fontSize: "0.81rem", color: "rgba(255,255,255,0.46)", lineHeight: 1.74, margin: "0 0 18px", textAlign: "center" }}>{p.desc}</p>

                          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                            {p.features.map(f => (
                              <div key={f} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                <CheckCircle size={12} color={p.color} style={{ flexShrink: 0 }} />
                                <span style={{ fontSize: "0.77rem", color: "rgba(255,255,255,0.58)", fontWeight: 500 }}>{f}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── COMMENT ÇA MARCHE ────────────────────────────────────────────── */}
        <div style={{ background: "linear-gradient(180deg,#040B1E 0%,#060D24 100%)", padding: "80px 5%", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <motion.span initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              style={{ display: "inline-block", fontSize: "10.5px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", padding: "7px 16px", borderRadius: "999px", background: "rgba(251,191,36,0.1)", color: "#FDE68A", border: "1px solid rgba(251,191,36,0.22)", marginBottom: "16px" }}>
              Simple &amp; rapide
            </motion.span>
            <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              style={{ fontSize: "clamp(1.6rem,3vw,2.2rem)", fontWeight: 800, color: "#fff", margin: 0, letterSpacing: "-0.02em" }}>
              Comment effectuer un transfert ?
            </motion.h2>
          </div>

          <div style={{ maxWidth: "900px", margin: "0 auto", position: "relative" }}>
            {/* Ligne de connexion */}
            <div style={{ position: "absolute", top: "36px", left: "16.67%", right: "16.67%", height: "1px", background: "linear-gradient(90deg,rgba(30,159,232,0.5),rgba(251,191,36,0.5),rgba(16,185,129,0.5))", zIndex: 0 }} className="steps-line" />

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "28px", position: "relative", zIndex: 1 }} className="steps-grid">
              {TRANSFER_STEPS.map((s, i) => {
                const StepIcons = [MapPin, ArrowLeftRight, Banknote]
                const StepIcon = StepIcons[i]
                const colors  = ["#1E9FE8", "#FBBF24", "#10B981"]
                const glows   = ["rgba(30,159,232,0.3)", "rgba(251,191,36,0.3)", "rgba(16,185,129,0.3)"]
                return (
                  <motion.div key={s.step}
                    initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.15 }}
                    style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>

                    <div style={{ width: "72px", height: "72px", borderRadius: "50%", background: `radial-gradient(circle,${colors[i]}18 0%,transparent 70%)`, border: `1.5px solid ${colors[i]}38`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "22px", boxShadow: `0 0 36px ${glows[i]}`, position: "relative" }}>
                      <StepIcon size={26} color={colors[i]} />
                      <span style={{ position: "absolute", top: "-8px", right: "-8px", width: "22px", height: "22px", borderRadius: "50%", background: colors[i], display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.62rem", fontWeight: 900, color: i === 1 ? "#0A0A0A" : "#fff", boxShadow: `0 2px 12px ${glows[i]}` }}>{s.step}</span>
                    </div>

                    <p style={{ fontSize: "0.95rem", fontWeight: 700, color: "#fff", margin: "0 0 10px" }}>{s.title}</p>
                    <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.44)", lineHeight: 1.76, margin: 0 }}>{s.description}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>

        {/* ── GARANTIES ────────────────────────────────────────────────────── */}
        <div style={{ background: "#fff", padding: "76px 5%" }}>
          <div style={{ maxWidth: "1060px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                style={{ fontSize: "clamp(1.4rem,2.5vw,1.9rem)", fontWeight: 800, color: "#1A3A8F", margin: "0 0 10px", letterSpacing: "-0.02em" }}>
                Pourquoi choisir @TOGO ?
              </motion.h2>
              <p style={{ fontSize: "0.9rem", color: "#64748B", margin: 0, lineHeight: 1.65 }}>Agréé, rapide, sécurisé — au service de votre famille et de vos proches.</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "20px" }} className="trust-grid">
              {[
                { Icon: ShieldCheck, color: "#0D7A4E", bg: "#D1FAE5", title: "100% Sécurisé",      desc: "Toutes les transactions sont vérifiées et sécurisées par nos partenaires agréés." },
                { Icon: Zap,         color: "#1E9FE8", bg: "#E3F4FD", title: "Service rapide",      desc: "Vos transactions sont traitées immédiatement, sans délai inutile." },
                { Icon: MapPin,      color: "#7C3AED", bg: "#EDE9FE", title: "Agence à Lomé",       desc: "Venez directement pour un service personnalisé et de confiance." },
                { Icon: PhoneCall,   color: "#D97706", bg: "#FEF3C7", title: "Support disponible",  desc: "Notre équipe est disponible du lundi au samedi pour vous accompagner." },
              ].map(({ Icon, color, bg, title, desc }, i) => (
                <motion.div key={title}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}
                  whileHover={{ y: -4 }}
                  style={{ background: "#fff", borderRadius: "18px", padding: "28px 22px", border: "1.5px solid #E2E8F0", transition: "box-shadow 0.25s, transform 0.25s", cursor: "default" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = "0 16px 48px rgba(0,0,0,0.08)" }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = "none" }}>
                  <div style={{ width: "50px", height: "50px", borderRadius: "14px", background: bg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
                    <Icon size={22} color={color} />
                  </div>
                  <p style={{ fontSize: "0.92rem", fontWeight: 700, color: "#1A3A8F", margin: "0 0 8px" }}>{title}</p>
                  <p style={{ fontSize: "0.79rem", color: "#64748B", lineHeight: 1.68, margin: 0 }}>{desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* ── CTA FINAL ────────────────────────────────────────────────────── */}
        <div style={{ background: "linear-gradient(160deg,#000000 0%,#050B1E 50%,#080F2A 100%)", padding: "88px 5%", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "720px", height: "380px", background: "radial-gradient(ellipse,rgba(251,191,36,0.06) 0%,transparent 65%)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "380px", height: "180px", background: "radial-gradient(ellipse,rgba(30,159,232,0.05) 0%,transparent 70%)", pointerEvents: "none" }} />

          <div style={{ position: "relative", zIndex: 1, maxWidth: "580px", margin: "0 auto" }}>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>

              <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "10px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", padding: "7px 16px", borderRadius: "999px", background: "rgba(251,191,36,0.1)", color: "#FDE68A", border: "1px solid rgba(251,191,36,0.22)", marginBottom: "24px" }}>
                <BadgeCheck size={11} /> Agence agréée — Lomé, Togo
              </span>

              <h2 style={{ fontSize: "clamp(1.8rem,3.5vw,2.7rem)", fontWeight: 900, color: "#fff", margin: "0 0 14px", lineHeight: 1.1, letterSpacing: "-0.03em" }}>
                Prêt à effectuer un transfert ?
              </h2>
              <p style={{ fontSize: "0.98rem", color: "rgba(255,255,255,0.48)", margin: "0 auto 40px", lineHeight: 1.78 }}>
                Venez dans notre agence ou contactez-nous. Service agréé, rapide et sécurisé.
              </p>

              <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
                <Link href="/contact"
                  style={{ display: "inline-flex", alignItems: "center", gap: "10px", background: "linear-gradient(135deg,#FBBF24,#F59E0B)", color: "#0A0A0A", fontWeight: 800, fontSize: "1rem", padding: "16px 38px", borderRadius: "14px", textDecoration: "none", boxShadow: "0 8px 40px rgba(251,191,36,0.35), 0 0 0 1px rgba(251,191,36,0.25)" }}>
                  Nous contacter <ArrowRight size={18} />
                </Link>
                <Link href="/services"
                  style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.11)", color: "rgba(255,255,255,0.72)", fontWeight: 600, fontSize: "1rem", padding: "16px 32px", borderRadius: "14px", textDecoration: "none", backdropFilter: "blur(8px)" }}>
                  Tous nos services
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

      </main>
      <Footer />
    </>
  )
}
