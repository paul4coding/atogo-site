"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeftRight, Server, Smartphone, TrendingUp, Shield, FileText, ArrowRight, Check } from "lucide-react"
import { SERVICES } from "@/constants/data"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ICON_MAP: Record<string, any> = {
  ArrowLeftRight, Server, Smartphone, TrendingUp, Shield, FileText,
}

const SERVICE_STYLES: Record<string, {
  iconBg: string; accent: string; lightBg: string
  badge?: string; features: string[]; number: string
}> = {
  transferts: {
    iconBg: "linear-gradient(135deg,#1A3A8F,#1E9FE8)", accent: "#1E9FE8", lightBg: "#E3F4FD",
    badge: "Service phare", number: "01",
    features: ["Flooz (MOOV Money)", "MixBy Yas", "Western Union", "MoneyGram", "RIA"],
  },
  it: {
    iconBg: "linear-gradient(135deg,#5B21B6,#7C3AED)", accent: "#7C3AED", lightBg: "#EDE9FE",
    number: "02",
    features: ["Intégration ERP/CRM", "Infrastructure réseau", "Dev sur mesure"],
  },
  phones: {
    iconBg: "linear-gradient(135deg,#0D7A4E,#10B981)", accent: "#0D7A4E", lightBg: "#D1FAE5",
    badge: "Nouveau", number: "03",
    features: ["Blackview", "Oukitel", "Doogee", "Garantie incluse"],
  },
  marketing: {
    iconBg: "linear-gradient(135deg,#B45309,#F59E0B)", accent: "#D97706", lightBg: "#FEF3C7",
    number: "04",
    features: ["Réseaux sociaux", "Campagnes Meta/Google", "SEO"],
  },
  cybersec: {
    iconBg: "linear-gradient(135deg,#DC2626,#F87171)", accent: "#DC2626", lightBg: "#FEE2E2",
    number: "05",
    features: ["Audit sécurité", "Protection RGPD", "Formation"],
  },
  content: {
    iconBg: "linear-gradient(135deg,#0E7490,#06B6D4)", accent: "#0891B2", lightBg: "#CFFAFE",
    number: "06",
    features: ["Rédaction web", "Création graphique", "Vidéo & motion"],
  },
}

export default function ServicesSection() {
  const [active, setActive] = useState<string | null>(null)

  return (
    <section style={{ background: "#f8fafc", padding: "100px 0" }}>
      <div style={{ padding: "0 5%" }}>

        {/* En-tête */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:"56px", flexWrap:"wrap", gap:"20px" }}>
          <div>
            <motion.span initial={{ opacity:0, y:12 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.4 }}
              style={{ display:"inline-block", fontSize:"11px", fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", padding:"7px 18px", borderRadius:"999px", background:"var(--color-brand-light)", color:"var(--color-brand-dark)", marginBottom:"14px" }}
            >Ce que nous faisons</motion.span>
            <motion.h2 initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.5, delay:0.1 }}
              style={{ fontSize:"clamp(1.8rem,3.5vw,2.8rem)", fontWeight:700, color:"var(--color-text-heading)", margin:0, lineHeight:1.15 }}
            >Nos services</motion.h2>
          </div>
          <motion.div initial={{ opacity:0, x:16 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.4, delay:0.2 }}>
            <Link href="/services" style={{ display:"inline-flex", alignItems:"center", gap:"8px", fontSize:"0.88rem", fontWeight:700, color:"var(--color-brand-primary)", textDecoration:"none", padding:"10px 20px", borderRadius:"999px", border:"1.5px solid var(--color-brand-primary)", transition:"background 0.2s, color 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.background="var(--color-brand-primary)"; e.currentTarget.style.color="#fff" }}
              onMouseLeave={e => { e.currentTarget.style.background="transparent"; e.currentTarget.style.color="var(--color-brand-primary)" }}
            >Voir tout <ArrowRight size={14} /></Link>
          </motion.div>
        </div>

        {/* Layout : grande card gauche + 5 petites droite */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"20px" }} className="services-main-grid">

          {/* Card vedette — Transferts */}
          {(() => {
            const service = SERVICES[0]
            const s = SERVICE_STYLES[service.id] ?? SERVICE_STYLES.transferts
            const Icon = ICON_MAP[service.icon] ?? ArrowRight
            const isActive = active === service.id
            return (
              <motion.div key={service.id}
                initial={{ opacity:0, x:-24 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.6 }}
                onMouseEnter={() => setActive(service.id)} onMouseLeave={() => setActive(null)}
                style={{ position:"relative", borderRadius:"24px", overflow:"hidden", background:"#fff", cursor:"default", boxShadow:"0 4px 24px rgba(0,0,0,0.08)", display:"flex", flexDirection:"column", minHeight:"420px" }}
              >
                <AnimatePresence>
                  {isActive && (
                    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.3 }}
                      style={{ position:"absolute", inset:0, background:s.iconBg, zIndex:0 }}
                    />
                  )}
                </AnimatePresence>
                <span style={{ position:"absolute", bottom:"-10px", right:"20px", fontSize:"7rem", fontWeight:900, lineHeight:1, color: isActive ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.04)", userSelect:"none", zIndex:1, transition:"color 0.3s" }}>{s.number}</span>

                <div style={{ padding:"40px 36px", position:"relative", zIndex:2, flex:1, display:"flex", flexDirection:"column" }}>
                  {s.badge && (
                    <span style={{ alignSelf:"flex-start", fontSize:"10px", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", padding:"5px 12px", borderRadius:"999px", background: isActive ? "rgba(255,255,255,0.2)" : s.lightBg, color: isActive ? "#fff" : s.accent, marginBottom:"24px", transition:"all 0.3s" }}>⭐ {s.badge}</span>
                  )}
                  <div style={{ width:"56px", height:"56px", borderRadius:"14px", background: isActive ? "rgba(255,255,255,0.2)" : s.iconBg, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:"20px", boxShadow:`0 8px 24px ${s.accent}40`, transition:"background 0.3s" }}>
                    <Icon size={26} color="#fff" />
                  </div>
                  <h3 style={{ fontSize:"1.35rem", fontWeight:800, margin:"0 0 10px", color: isActive ? "#fff" : "var(--color-text-heading)", transition:"color 0.3s" }}>{service.title}</h3>
                  <p style={{ fontSize:"0.9rem", lineHeight:1.7, margin:"0 0 20px", color: isActive ? "rgba(255,255,255,0.8)" : "var(--color-text-body)", transition:"color 0.3s" }}>{service.description}</p>
                  <div style={{ display:"flex", flexDirection:"column", gap:"8px", marginBottom:"24px" }}>
                    {s.features.map(f => (
                      <div key={f} style={{ display:"flex", alignItems:"center", gap:"10px" }}>
                        <div style={{ width:"18px", height:"18px", borderRadius:"50%", flexShrink:0, background: isActive ? "rgba(255,255,255,0.25)" : s.lightBg, display:"flex", alignItems:"center", justifyContent:"center", transition:"background 0.3s" }}>
                          <Check size={10} color={isActive ? "#fff" : s.accent} strokeWidth={3} />
                        </div>
                        <span style={{ fontSize:"0.83rem", fontWeight:500, color: isActive ? "rgba(255,255,255,0.9)" : "var(--color-text-body)", transition:"color 0.3s" }}>{f}</span>
                      </div>
                    ))}
                  </div>
                  <Link href="/transferts" style={{ marginTop:"auto", display:"inline-flex", alignItems:"center", gap:"8px", fontSize:"0.88rem", fontWeight:700, color: isActive ? "#fff" : s.accent, textDecoration:"none", transition:"color 0.3s" }}>
                    Voir nos transferts <ArrowRight size={15} />
                  </Link>
                </div>
              </motion.div>
            )
          })()}

          {/* 5 petites cards */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"20px" }} className="services-sub-grid">
            {SERVICES.slice(1).map((service, i) => {
              const Icon = ICON_MAP[service.icon] ?? ArrowRight
              const s = SERVICE_STYLES[service.id] ?? SERVICE_STYLES.it
              const isActive = active === service.id
              return (
                <motion.div key={service.id}
                  initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.5, delay:i*0.08 }}
                  onMouseEnter={() => setActive(service.id)} onMouseLeave={() => setActive(null)}
                  style={{ position:"relative", borderRadius:"20px", overflow:"hidden", background:"#fff", cursor:"default", boxShadow:"0 2px 12px rgba(0,0,0,0.06)", padding:"28px 24px", display:"flex", flexDirection:"column" }}
                >
                  <AnimatePresence>
                    {isActive && (
                      <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.25 }}
                        style={{ position:"absolute", inset:0, background:s.iconBg, zIndex:0 }}
                      />
                    )}
                  </AnimatePresence>
                  <span style={{ position:"absolute", bottom:"-8px", right:"12px", fontSize:"4.5rem", fontWeight:900, lineHeight:1, color: isActive ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.04)", userSelect:"none", zIndex:1, transition:"color 0.3s" }}>{s.number}</span>
                  <div style={{ position:"relative", zIndex:2, display:"flex", flexDirection:"column", height:"100%" }}>
                    {s.badge && (
                      <span style={{ alignSelf:"flex-start", fontSize:"9px", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", padding:"3px 9px", borderRadius:"999px", background: isActive ? "rgba(255,255,255,0.2)" : s.lightBg, color: isActive ? "#fff" : s.accent, marginBottom:"12px", transition:"all 0.3s" }}>{s.badge}</span>
                    )}
                    <div style={{ width:"44px", height:"44px", borderRadius:"12px", background: isActive ? "rgba(255,255,255,0.2)" : s.iconBg, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:"14px", boxShadow:`0 6px 16px ${s.accent}35`, transition:"background 0.3s" }}>
                      <Icon size={20} color="#fff" />
                    </div>
                    <h3 style={{ fontSize:"0.93rem", fontWeight:700, margin:"0 0 8px", color: isActive ? "#fff" : "var(--color-text-heading)", transition:"color 0.3s" }}>{service.title}</h3>
                    <p style={{ fontSize:"0.78rem", lineHeight:1.65, margin:"0 0 14px", color: isActive ? "rgba(255,255,255,0.75)" : "var(--color-text-body)", transition:"color 0.3s", flex:1 }}>{service.description}</p>
                    <div style={{ display:"flex", flexDirection:"column", gap:"5px", marginBottom:"14px" }}>
                      {s.features.slice(0,2).map(f => (
                        <div key={f} style={{ display:"flex", alignItems:"center", gap:"6px" }}>
                          <Check size={9} color={isActive ? "#fff" : s.accent} strokeWidth={3} style={{ flexShrink:0 }} />
                          <span style={{ fontSize:"0.73rem", fontWeight:500, color: isActive ? "rgba(255,255,255,0.85)" : "var(--color-text-muted)", transition:"color 0.3s" }}>{f}</span>
                        </div>
                      ))}
                    </div>
                    <Link href="/services" style={{ display:"inline-flex", alignItems:"center", gap:"6px", fontSize:"0.76rem", fontWeight:700, color: isActive ? "#fff" : s.accent, textDecoration:"none", transition:"color 0.3s" }}>
                      En savoir plus <ArrowRight size={11} />
                    </Link>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
