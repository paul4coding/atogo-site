"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowRight, MapPin, ShieldCheck, Clock, Globe,
  Zap, Users, Building2, CheckCircle, PhoneCall,
  ArrowLeftRight, Banknote,
} from "lucide-react"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import { TRANSFER_NATIONAL, TRANSFER_INTERNATIONAL, TRANSFER_STEPS } from "@/constants/data"

// Détails enrichis par partenaire
const NATIONAL_DETAIL = [
  {
    name: "Flooz",
    logo: "/images/flooz.png",
    tagline: "MOOV Money — Mobile Money Togo",
    desc: "Rechargez et transférez via le réseau MOOV. Disponible dans toutes nos agences.",
    features: ["Recharge rapide", "Transfert instantané", "Sans frais cachés"],
    color: "#F97316", lightBg: "#FEF3C7",
  },
  {
    name: "MixBy Yas",
    logo: "/images/yas-agent.png",
    tagline: "Yas Agent — Transferts nationaux",
    desc: "Service Yas Agent agréé pour tous vos transferts Mobile Money au Togo.",
    features: ["Envoi immédiat", "Large réseau d'agents", "Sécurisé"],
    color: "#1D4ED8", lightBg: "#EFF6FF",
  },
]

const INTERNATIONAL_DETAIL = [
  {
    name: "Western Union",
    logo: "/images/western-union.webp",
    tagline: "Leader mondial du transfert d'argent",
    desc: "Envoyez de l'argent dans plus de 200 pays et territoires. Le réseau le plus large au monde.",
    features: ["200+ pays couverts", "Disponible en quelques minutes", "Options de retrait flexibles"],
    color: "#FBBF24", lightBg: "#FEF9C3",
  },
  {
    name: "MoneyGram",
    logo: "/images/moneygram.webp",
    tagline: "Transferts rapides vers le monde entier",
    desc: "Recevez et envoyez de l'argent vers l'Europe, les Amériques et l'Asie en toute confiance.",
    features: ["Réseau mondial fiable", "Traitement en temps réel", "Suivi en ligne"],
    color: "#DC2626", lightBg: "#FEE2E2",
  },
  {
    name: "RIA Money Transfer",
    logo: "/images/ria.png",
    tagline: "Transferts abordables et sécurisés",
    desc: "Envoyez de l'argent vers l'Europe et les Amériques avec les meilleurs taux du marché.",
    features: ["Taux compétitifs", "Disponible en Europe & USA", "Rapide et sécurisé"],
    color: "#7C3AED", lightBg: "#EDE9FE",
  },
]

const STATS = [
  { val: "6",     label: "Partenaires agréés",       Icon: Building2    },
  { val: "200+",  label: "Pays couverts",             Icon: Globe        },
  { val: "Immédiat", label: "Délai de traitement",   Icon: Zap          },
  { val: "50k+",  label: "Clients satisfaits",        Icon: Users        },
]

export default function TransfertsPage() {
  const [tab, setTab] = useState<"national" | "international">("national")

  return (
    <>
      <Navbar />
      <main>

        {/* ── Hero ────────────────────────────────────────────────────── */}
        <div style={{
          background: "linear-gradient(160deg,#070F2B 0%,#0F1E4A 40%,#1A3A8F 100%)",
          paddingTop: "68px", position: "relative", overflow: "hidden",
        }}>
          {/* Décos */}
          <div style={{ position:"absolute", top:"-80px", right:"-80px", width:"500px", height:"500px", borderRadius:"50%", background:"radial-gradient(circle,rgba(30,159,232,0.09) 0%,transparent 70%)", pointerEvents:"none" }} />
          <div style={{ position:"absolute", bottom:"0", left:"30%", width:"400px", height:"400px", borderRadius:"50%", background:"radial-gradient(circle,rgba(251,191,36,0.05) 0%,transparent 70%)", pointerEvents:"none" }} />

          <div style={{ padding:"80px 5% 0", position:"relative", zIndex:1 }}>
            <div style={{ maxWidth:"760px", margin:"0 auto", textAlign:"center" }}>
              <motion.span initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.4 }}
                style={{ display:"inline-block", fontSize:"11px", fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", padding:"7px 18px", borderRadius:"999px", background:"rgba(251,191,36,0.15)", color:"#FDE68A", border:"1px solid rgba(251,191,36,0.25)", marginBottom:"24px" }}
              >Services financiers agréés</motion.span>

              <motion.h1 initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.55, delay:0.1 }}
                style={{ fontSize:"clamp(2.2rem,4.5vw,3.6rem)", fontWeight:800, color:"#fff", margin:"0 0 20px", lineHeight:1.1 }}
              >
                Envoyez de l&apos;argent<br />
                <span style={{ background:"linear-gradient(135deg,#FBBF24,#F59E0B)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
                  partout, en toute confiance
                </span>
              </motion.h1>

              <motion.p initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5, delay:0.2 }}
                style={{ fontSize:"1.1rem", color:"rgba(255,255,255,0.65)", maxWidth:"560px", margin:"0 auto 40px", lineHeight:1.75 }}
              >
                Votre agence agréée à Lomé pour tous vos transferts d&apos;argent — Mobile Money au Togo et vers plus de 200 pays dans le monde.
              </motion.p>

              {/* Logos partenaires en bandeau */}
              <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5, delay:0.3 }}
                style={{ display:"flex", gap:"12px", justifyContent:"center", flexWrap:"wrap", marginBottom:"48px" }}
              >
                {[...NATIONAL_DETAIL, ...INTERNATIONAL_DETAIL].map(p => (
                  <div key={p.name} style={{ background:"#fff", borderRadius:"12px", padding:"10px 18px", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 2px 12px rgba(0,0,0,0.15)" }}>
                    <Image src={p.logo} alt={p.name} width={80} height={32} unoptimized
                      style={{ height:"28px", width:"auto", objectFit:"contain" }}
                    />
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Stats rapides */}
          <div style={{ padding:"0 5% 0", position:"relative", zIndex:1 }}>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"1px", background:"rgba(255,255,255,0.08)", borderRadius:"0", overflow:"hidden", maxWidth:"900px", margin:"0 auto" }} className="stats-grid">
              {STATS.map(({ val, label, Icon }, i) => (
                <motion.div key={label}
                  initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.4, delay:0.4 + i*0.08 }}
                  style={{ background:"rgba(255,255,255,0.04)", padding:"28px 24px", textAlign:"center", backdropFilter:"blur(4px)" }}
                >
                  <Icon size={20} color="#FBBF24" style={{ marginBottom:"10px" }} />
                  <p style={{ fontSize:"1.6rem", fontWeight:900, color:"#fff", margin:"0 0 4px", lineHeight:1 }}>{val}</p>
                  <p style={{ fontSize:"0.75rem", color:"rgba(255,255,255,0.5)", margin:0, fontWeight:500 }}>{label}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div style={{ lineHeight:0, marginTop:"1px" }}>
            <svg viewBox="0 0 1440 56" xmlns="http://www.w3.org/2000/svg" style={{ display:"block", width:"100%" }}>
              <path d="M0,28 C480,56 960,0 1440,28 L1440,56 L0,56 Z" fill="#f8fafc" />
            </svg>
          </div>
        </div>

        {/* ── Tabs national / international ─────────────────────────── */}
        <div style={{ background:"#f8fafc", padding:"72px 5%" }}>

          {/* Sélecteur de tab */}
          <div style={{ display:"flex", justifyContent:"center", marginBottom:"56px" }}>
            <div style={{ display:"inline-flex", background:"#fff", borderRadius:"14px", padding:"6px", boxShadow:"0 2px 16px rgba(0,0,0,0.08)", border:"1.5px solid #E2E8F0", gap:"4px" }}>
              {([
                { key:"national",      Icon:MapPin,          label:"Transferts Nationaux",      sub:"Flooz · MixBy Yas" },
                { key:"international", Icon:Globe,           label:"Transferts Internationaux",  sub:"WU · MoneyGram · RIA" },
              ] as const).map(t => (
                <button key={t.key} onClick={() => setTab(t.key)} style={{
                  display:"flex", alignItems:"center", gap:"10px",
                  padding:"14px 28px", borderRadius:"10px", border:"none", cursor:"pointer",
                  transition:"all 0.25s", fontFamily:"inherit",
                  background: tab === t.key ? "linear-gradient(135deg,#1A3A8F,#1E9FE8)" : "transparent",
                  color: tab === t.key ? "#fff" : "#64748B",
                  boxShadow: tab === t.key ? "0 4px 20px rgba(30,159,232,0.3)" : "none",
                }}>
                  <t.Icon size={18} />
                  <div style={{ textAlign:"left" }}>
                    <p style={{ fontSize:"0.88rem", fontWeight:700, margin:0, lineHeight:1.2 }}>{t.label}</p>
                    <p style={{ fontSize:"0.7rem", margin:0, opacity: tab === t.key ? 0.75 : 0.5, lineHeight:1.2 }}>{t.sub}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Contenu tab */}
          <AnimatePresence mode="wait">
            <motion.div key={tab}
              initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-8 }}
              transition={{ duration:0.3 }}
            >
              {tab === "national" && (
                <div>
                  <div style={{ textAlign:"center", marginBottom:"40px" }}>
                    <h2 style={{ fontSize:"clamp(1.5rem,3vw,2rem)", fontWeight:700, color:"var(--color-text-heading)", margin:"0 0 10px" }}>
                      Mobile Money au Togo
                    </h2>
                    <p style={{ fontSize:"0.95rem", color:"var(--color-text-body)", maxWidth:"500px", margin:"0 auto" }}>
                      Rechargez et transférez via nos partenaires Mobile Money agréés — service rapide, en agence.
                    </p>
                  </div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"24px", maxWidth:"900px", margin:"0 auto" }} className="partners-grid">
                    {NATIONAL_DETAIL.map((p, i) => (
                      <motion.div key={p.name}
                        initial={{ opacity:0, scale:0.96 }} animate={{ opacity:1, scale:1 }}
                        transition={{ duration:0.4, delay:i*0.1 }}
                        whileHover={{ y:-4, boxShadow:"0 16px 48px rgba(0,0,0,0.1)" }}
                        style={{ background:"#fff", borderRadius:"20px", overflow:"hidden", boxShadow:"0 2px 16px rgba(0,0,0,0.06)", border:"1.5px solid #E2E8F0", transition:"box-shadow 0.2s" }}
                      >
                        {/* Header coloré */}
                        <div style={{ background:`linear-gradient(135deg,${p.color}15,${p.color}08)`, borderBottom:`3px solid ${p.color}`, padding:"28px 28px 20px", display:"flex", alignItems:"center", gap:"20px" }}>
                          <div style={{ background:"#fff", borderRadius:"12px", padding:"12px", boxShadow:`0 4px 16px ${p.color}20`, flexShrink:0 }}>
                            <Image src={p.logo} alt={p.name} width={80} height={40} unoptimized
                              style={{ height:"36px", width:"auto", objectFit:"contain", display:"block" }}
                            />
                          </div>
                          <div>
                            <p style={{ fontSize:"1.05rem", fontWeight:800, color:"var(--color-text-heading)", margin:"0 0 4px" }}>{p.name}</p>
                            <p style={{ fontSize:"0.78rem", color:p.color, fontWeight:600, margin:0 }}>{p.tagline}</p>
                          </div>
                        </div>
                        {/* Body */}
                        <div style={{ padding:"24px 28px" }}>
                          <p style={{ fontSize:"0.88rem", color:"var(--color-text-body)", lineHeight:1.7, margin:"0 0 20px" }}>{p.desc}</p>
                          <div style={{ display:"flex", flexDirection:"column", gap:"8px" }}>
                            {p.features.map(f => (
                              <div key={f} style={{ display:"flex", alignItems:"center", gap:"10px" }}>
                                <CheckCircle size={14} color={p.color} style={{ flexShrink:0 }} />
                                <span style={{ fontSize:"0.82rem", color:"var(--color-text-body)", fontWeight:500 }}>{f}</span>
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
                  <div style={{ textAlign:"center", marginBottom:"40px" }}>
                    <h2 style={{ fontSize:"clamp(1.5rem,3vw,2rem)", fontWeight:700, color:"var(--color-text-heading)", margin:"0 0 10px" }}>
                      Vers plus de 200 pays
                    </h2>
                    <p style={{ fontSize:"0.95rem", color:"var(--color-text-body)", maxWidth:"500px", margin:"0 auto" }}>
                      Envoyez et recevez de l&apos;argent vers l&apos;Europe, les Amériques et le monde entier via nos partenaires internationaux.
                    </p>
                  </div>
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"24px", maxWidth:"1050px", margin:"0 auto" }} className="partners-intl-grid">
                    {INTERNATIONAL_DETAIL.map((p, i) => (
                      <motion.div key={p.name}
                        initial={{ opacity:0, scale:0.96 }} animate={{ opacity:1, scale:1 }}
                        transition={{ duration:0.4, delay:i*0.1 }}
                        whileHover={{ y:-4, boxShadow:"0 16px 48px rgba(0,0,0,0.1)" }}
                        style={{ background:"#fff", borderRadius:"20px", overflow:"hidden", boxShadow:"0 2px 16px rgba(0,0,0,0.06)", border:"1.5px solid #E2E8F0", transition:"box-shadow 0.2s" }}
                      >
                        <div style={{ background:`linear-gradient(135deg,${p.color}15,${p.color}06)`, borderBottom:`3px solid ${p.color}`, padding:"28px 24px 20px", display:"flex", flexDirection:"column", alignItems:"center", gap:"12px", textAlign:"center" }}>
                          <div style={{ background:"#fff", borderRadius:"12px", padding:"12px 16px", boxShadow:`0 4px 16px ${p.color}20` }}>
                            <Image src={p.logo} alt={p.name} width={100} height={40} unoptimized
                              style={{ height:"32px", width:"auto", objectFit:"contain", display:"block" }}
                            />
                          </div>
                          <p style={{ fontSize:"0.78rem", color:p.color, fontWeight:700, margin:0, letterSpacing:"0.02em" }}>{p.tagline}</p>
                        </div>
                        <div style={{ padding:"22px 24px" }}>
                          <p style={{ fontSize:"0.85rem", color:"var(--color-text-body)", lineHeight:1.7, margin:"0 0 16px" }}>{p.desc}</p>
                          <div style={{ display:"flex", flexDirection:"column", gap:"7px" }}>
                            {p.features.map(f => (
                              <div key={f} style={{ display:"flex", alignItems:"center", gap:"8px" }}>
                                <CheckCircle size={13} color={p.color} style={{ flexShrink:0 }} />
                                <span style={{ fontSize:"0.78rem", color:"var(--color-text-body)", fontWeight:500 }}>{f}</span>
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

        {/* ── Comment ça marche ──────────────────────────────────────── */}
        <div style={{ background:"#fff", padding:"80px 5%" }}>
          <div style={{ textAlign:"center", marginBottom:"56px" }}>
            <span style={{ display:"inline-block", fontSize:"11px", fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", padding:"7px 18px", borderRadius:"999px", background:"var(--color-brand-light)", color:"var(--color-brand-dark)", marginBottom:"16px" }}>Simple & rapide</span>
            <h2 style={{ fontSize:"clamp(1.6rem,3vw,2.2rem)", fontWeight:700, color:"var(--color-text-heading)", margin:0 }}>Comment effectuer un transfert ?</h2>
          </div>

          <div style={{ maxWidth:"900px", margin:"0 auto", position:"relative" }}>
            {/* Ligne de connexion */}
            <div style={{ position:"absolute", top:"36px", left:"calc(16.6% + 20px)", right:"calc(16.6% + 20px)", height:"2px", background:"linear-gradient(90deg,#1E9FE8,#10B981)", borderRadius:"999px", zIndex:0 }} className="steps-line" />

            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"24px", position:"relative", zIndex:1 }} className="steps-detail-grid">
              {TRANSFER_STEPS.map((s, i) => {
                const StepIcons = [MapPin, ArrowLeftRight, Banknote]
                const StepIcon = StepIcons[i]
                const colors = ["#1E9FE8", "#7C3AED", "#10B981"]
                return (
                  <motion.div key={s.step}
                    initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
                    viewport={{ once:true }} transition={{ duration:0.5, delay:i*0.15 }}
                    style={{ display:"flex", flexDirection:"column", alignItems:"center", textAlign:"center" }}
                  >
                    {/* Numéro avec icône */}
                    <div style={{ width:"72px", height:"72px", borderRadius:"50%", background:`linear-gradient(135deg,${colors[i]},${colors[i]}aa)`, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:"20px", boxShadow:`0 8px 24px ${colors[i]}40`, border:"4px solid #fff" }}>
                      <StepIcon size={28} color="#fff" />
                    </div>
                    <span style={{ fontSize:"10px", fontWeight:700, color:colors[i], letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:"8px" }}>Étape {s.step}</span>
                    <p style={{ fontSize:"0.95rem", fontWeight:700, color:"var(--color-text-heading)", margin:"0 0 10px" }}>{s.title}</p>
                    <p style={{ fontSize:"0.83rem", color:"var(--color-text-body)", lineHeight:1.7, margin:0 }}>{s.description}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>

        {/* ── Garanties ──────────────────────────────────────────────── */}
        <div style={{ background:"#f8fafc", padding:"64px 5%" }}>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"16px", maxWidth:"1000px", margin:"0 auto" }} className="why-grid">
            {[
              { Icon:ShieldCheck, color:"#0D7A4E", bg:"#D1FAE5", title:"100% Sécurisé",     desc:"Toutes les transactions sont vérifiées et sécurisées par nos partenaires agréés." },
              { Icon:Zap,         color:"#1E9FE8", bg:"#E3F4FD", title:"Service rapide",     desc:"Vos transactions sont traitées immédiatement, sans délai inutile." },
              { Icon:MapPin,      color:"#7C3AED", bg:"#EDE9FE", title:"Agence à Lomé",      desc:"Venez directement dans notre agence pour un service personnalisé et de confiance." },
              { Icon:PhoneCall,   color:"#D97706", bg:"#FEF3C7", title:"Support disponible", desc:"Notre équipe est disponible du lundi au samedi pour vous accompagner." },
            ].map(({ Icon, color, bg, title, desc }, i) => (
              <motion.div key={title}
                initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }} transition={{ duration:0.4, delay:i*0.08 }}
                whileHover={{ y:-4 }}
                style={{ background:"#fff", borderRadius:"16px", padding:"28px 22px", border:"1.5px solid #E2E8F0", transition:"box-shadow 0.2s, transform 0.2s" }}
              >
                <div style={{ width:"48px", height:"48px", borderRadius:"12px", background:bg, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:"16px" }}>
                  <Icon size={22} color={color} />
                </div>
                <p style={{ fontSize:"0.9rem", fontWeight:700, color:"var(--color-text-heading)", margin:"0 0 8px" }}>{title}</p>
                <p style={{ fontSize:"0.78rem", color:"var(--color-text-body)", lineHeight:1.65, margin:0 }}>{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── CTA ────────────────────────────────────────────────────── */}
        <div style={{ background:"linear-gradient(160deg,#070F2B,#0F1E4A)", padding:"80px 5%", textAlign:"center", position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:"600px", height:"300px", background:"radial-gradient(ellipse,rgba(251,191,36,0.07) 0%,transparent 70%)", pointerEvents:"none" }} />
          <div style={{ position:"relative", zIndex:1 }}>
            <p style={{ fontSize:"clamp(1.6rem,3.5vw,2.4rem)", fontWeight:800, color:"#fff", margin:"0 0 14px" }}>
              Prêt à effectuer un transfert ?
            </p>
            <p style={{ fontSize:"1rem", color:"rgba(255,255,255,0.6)", margin:"0 auto 36px", maxWidth:"440px", lineHeight:1.7 }}>
              Venez dans notre agence à Lomé ou contactez-nous. Service agréé, rapide et sécurisé.
            </p>
            <div style={{ display:"flex", gap:"14px", justifyContent:"center", flexWrap:"wrap" }}>
              <Link href="/contact" style={{ display:"inline-flex", alignItems:"center", gap:"10px", background:"linear-gradient(135deg,#FBBF24,#F59E0B)", color:"#070F2B", fontWeight:800, fontSize:"1rem", padding:"15px 36px", borderRadius:"12px", textDecoration:"none", boxShadow:"0 8px 32px rgba(251,191,36,0.35)", transition:"transform 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.transform="translateY(-2px)")}
                onMouseLeave={e => (e.currentTarget.style.transform="translateY(0)")}
              >
                Nous contacter <ArrowRight size={18} />
              </Link>
              <Link href="/services" style={{ display:"inline-flex", alignItems:"center", gap:"8px", background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.15)", color:"rgba(255,255,255,0.8)", fontWeight:600, fontSize:"1rem", padding:"15px 32px", borderRadius:"12px", textDecoration:"none" }}>
                Tous nos services
              </Link>
            </div>
          </div>
        </div>

      </main>
      <Footer />
    </>
  )
}
