"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import {
  Smartphone, BatteryFull, ShieldCheck, Building2,
  Package, BadgeCheck, Headphones, ArrowRight,
} from "lucide-react"

const BRANDS = [
  {
    name: "Blackview", logo: "/images/blackview.png",
    tagline: "Robustesse militaire",
    spec: "Norme IP68/IP69K — résistants à l'eau, la poussière et les chocs",
    Icon: ShieldCheck, color: "#1E9FE8",
  },
  {
    name: "Oukitel", logo: "/images/oukitel2.jpg",
    tagline: "Autonomie extrême",
    spec: "Batteries jusqu'à 15 000 mAh — plusieurs jours sans recharge",
    Icon: BatteryFull, color: "#10B981",
  },
  {
    name: "Doogee", logo: "/images/doogee2.png",
    tagline: "Fiable & abordable",
    spec: "Le meilleur rapport qualité-prix pour équiper vos équipes",
    Icon: Smartphone, color: "#F59E0B",
  },
]

const B2B = [
  { Icon: Package,    title: "Commandes en volume",   desc: "Tarifs dégressifs pour l'équipement de flottes et grandes quantités." },
  { Icon: BadgeCheck, title: "Revendeur agréé",       desc: "Distributeur officiel Blackview, Oukitel et Doogee au Togo." },
  { Icon: ShieldCheck,title: "Garantie constructeur", desc: "Tous nos appareils sont couverts par la garantie d'origine." },
  { Icon: Headphones, title: "SAV dédié entreprises", desc: "Un interlocuteur unique et un support après-vente réactif." },
]

export default function PhonesSection() {
  return (
    <section style={{ background: "var(--surface)", padding: "100px 5%", position: "relative", overflow: "hidden" }}>
      {/* Décor */}
      <div style={{ position: "absolute", top: "-80px", right: "-80px", width: "440px", height: "440px", borderRadius: "50%", background: "radial-gradient(circle,rgba(30,159,232,0.06) 0%,transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* En-tête */}
        <div style={{ textAlign: "center", maxWidth: "640px", margin: "0 auto 56px" }}>
          <motion.span initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}
            style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "10px", fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase", padding: "7px 16px", borderRadius: "999px", background: "var(--color-brand-light)", color: "#1E9FE8", border: "1px solid rgba(30,159,232,0.2)", marginBottom: "18px" }}>
            <Building2 size={12} /> Fournisseur agréé · Entreprises
          </motion.span>

          <motion.h2 initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.05 }}
            style={{ fontSize: "clamp(1.9rem,3.8vw,2.8rem)", fontWeight: 900, color: "var(--color-text-heading)", margin: "0 0 16px", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
            Nous équipons les entreprises en{" "}
            <span style={{ background: "linear-gradient(135deg,#1E9FE8,#10B981)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              smartphones robustes
            </span>
          </motion.h2>

          <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
            style={{ fontSize: "1.05rem", color: "var(--color-text-body)", lineHeight: 1.75, margin: 0 }}>
            Distributeur officiel <strong>Blackview</strong>, <strong>Oukitel</strong> et <strong>Doogee</strong>, @TOGO fournit les grandes sociétés en téléphones professionnels résistants — pour les équipes terrain, la logistique et tous les métiers exigeants.
          </motion.p>
        </div>

        {/* Cartes marques */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "20px", marginBottom: "56px" }} className="phones-brands-grid">
          {BRANDS.map((b, i) => (
            <motion.div key={b.name}
              initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{ background: "var(--surface)", borderRadius: "22px", border: "1.5px solid var(--surface-border)", overflow: "hidden", boxShadow: "0 4px 28px rgba(0,0,0,0.06)", transition: "transform 0.25s, box-shadow 0.25s, border-color 0.25s" }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = "translateY(-5px)"; el.style.boxShadow = `0 18px 48px ${b.color}22`; el.style.borderColor = b.color }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = "translateY(0)"; el.style.boxShadow = "0 4px 28px rgba(0,0,0,0.06)"; el.style.borderColor = "var(--surface-border)" }}>

              {/* Barre accent */}
              <div style={{ height: "4px", background: `linear-gradient(90deg,${b.color},${b.color}66)` }} />

              <div style={{ padding: "28px 26px" }}>
                {/* Logo */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
                  <div style={{ background: "var(--surface-alt)", borderRadius: "12px", padding: "10px 16px", display: "inline-flex", alignItems: "center", border: "1px solid var(--surface-border)" }}>
                    <Image src={b.logo} alt={b.name} width={100} height={32} unoptimized style={{ height: "26px", width: "auto", objectFit: "contain" }} />
                  </div>
                  <div style={{ width: "42px", height: "42px", borderRadius: "12px", background: `${b.color}14`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <b.Icon size={20} color={b.color} />
                  </div>
                </div>

                <p style={{ fontSize: "1.15rem", fontWeight: 800, color: "var(--color-text-heading)", margin: "0 0 4px" }}>{b.name}</p>
                <p style={{ fontSize: "0.82rem", fontWeight: 700, color: b.color, margin: "0 0 12px", textTransform: "uppercase", letterSpacing: "0.04em" }}>{b.tagline}</p>
                <p style={{ fontSize: "0.88rem", color: "var(--color-text-body)", lineHeight: 1.7, margin: 0 }}>{b.spec}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bandeau B2B + CTA */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}
          style={{ borderRadius: "28px", overflow: "hidden", background: "linear-gradient(135deg,#0F1E4A 0%,#1A3A8F 55%,#1E9FE8 100%)", position: "relative" }}>
          <div style={{ position: "absolute", top: "-50px", right: "-30px", width: "240px", height: "240px", borderRadius: "50%", background: "rgba(255,255,255,0.05)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: "-60px", left: "20%", width: "200px", height: "200px", borderRadius: "50%", background: "rgba(16,185,129,0.12)", pointerEvents: "none" }} />

          <div style={{ padding: "44px 44px", position: "relative", zIndex: 1 }}>
            {/* Atouts B2B */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "20px", marginBottom: "36px" }} className="phones-b2b-grid">
              {B2B.map(({ Icon, title, desc }) => (
                <div key={title} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.18)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon size={20} color="#60C8FF" />
                  </div>
                  <p style={{ fontSize: "0.92rem", fontWeight: 700, color: "#fff", margin: "6px 0 0" }}>{title}</p>
                  <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.6, margin: 0 }}>{desc}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "20px", flexWrap: "wrap", paddingTop: "28px", borderTop: "1px solid rgba(255,255,255,0.12)" }}>
              <div>
                <p style={{ fontSize: "1.15rem", fontWeight: 800, color: "#fff", margin: "0 0 4px" }}>Un projet d&apos;équipement pour votre société ?</p>
                <p style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.6)", margin: 0 }}>Recevez un devis entreprise personnalisé sous 24h.</p>
              </div>
              <Link href="/contact"
                style={{ display: "inline-flex", alignItems: "center", gap: "9px", padding: "14px 30px", borderRadius: "12px", background: "#fff", color: "#1A3A8F", fontWeight: 800, fontSize: "0.92rem", textDecoration: "none", boxShadow: "0 8px 28px rgba(0,0,0,0.25)", transition: "transform 0.2s", flexShrink: 0 }}
                onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-2px)")}
                onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}>
                Demander un devis entreprise <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
