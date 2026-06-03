"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowLeftRight, Server, Smartphone, TrendingUp, Shield, FileText,
  ArrowRight, Check, Star, Clock, Users, Award,
} from "lucide-react"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import { PHONE_BRANDS, TRANSFER_NATIONAL, TRANSFER_INTERNATIONAL } from "@/constants/data"

const SERVICES_DETAIL = [
  {
    id: "transferts", num: "01",
    Icon: ArrowLeftRight,
    title: "Transferts d'argent",
    tagline: "National & International",
    description: "Envoyez et recevez de l'argent au Togo et dans le monde entier via nos partenaires agréés : Flooz, Yas, MixBy pour le national, Western Union, MoneyGram et RIA pour l'international.",
    features: [
      "Flooz (MOOV Money) — Mobile Money national",
      "Yas Agent — transferts nationaux rapides",
      "MixBy — paiements et transferts",
      "Western Union — couverture mondiale",
      "MoneyGram — réseau international",
      "RIA Money Transfer — Europe & Amériques",
    ],
    stats: [{ v: "6",    l: "partenaires" }, { v: "World", l: "couverture" }, { v: "Rapide", l: "traitement" }],
    color: "#1E9FE8", bg: "linear-gradient(135deg,#1A3A8F,#1E9FE8)",
    lightBg: "#E3F4FD", href: "/transferts",
  },
  {
    id: "it", num: "02",
    Icon: Server,
    title: "Solutions Informatiques",
    tagline: "Infrastructure IT & développement sur mesure",
    description: "Nous concevons et déployons des solutions informatiques adaptées à vos besoins : intégration de systèmes, infrastructure réseau et développement d'applications métier.",
    features: [
      "Audit et conseil en architecture SI",
      "Intégration ERP/CRM et systèmes tiers",
      "Infrastructure réseau et cloud",
      "Développement d'applications sur mesure",
      "Maintenance et support technique dédié",
      "Formation des équipes IT",
    ],
    stats: [{ v: "50+",  l: "projets livrés" }, { v: "24/7", l: "support" }, { v: "100%", l: "satisfaction" }],
    color: "#7C3AED", bg: "linear-gradient(135deg,#5B21B6,#7C3AED)",
    lightBg: "#EDE9FE", href: "/contact",
  },
  {
    id: "phones", num: "03",
    Icon: Smartphone,
    title: "Vente de Téléphones",
    tagline: "Blackview · Oukitel · Doogee",
    description: "Revendeur agréé des marques Blackview, Oukitel et Doogee — des smartphones robustes, aux grandes batteries, adaptés aux conditions africaines et à prix abordable.",
    features: [
      "Blackview — smartphones robustes et haut de gamme",
      "Oukitel — grandes batteries jusqu'à 15 000 mAh",
      "Doogee — résistants et abordables",
      "Garantie constructeur incluse",
      "Service après-vente disponible",
      "Conseil personnalisé en boutique",
    ],
    stats: [{ v: "3",     l: "marques" }, { v: "Garanti", l: "constructeur" }, { v: "SAV", l: "disponible" }],
    color: "#0D7A4E", bg: "linear-gradient(135deg,#0D7A4E,#10B981)",
    lightBg: "#D1FAE5", href: "/contact",
  },
  {
    id: "marketing", num: "04",
    Icon: TrendingUp,
    title: "Marketing Digital",
    tagline: "Visibilité & croissance en ligne",
    description: "Stratégies digitales complètes pour renforcer votre présence en ligne, acquérir des clients et booster votre chiffre d'affaires en Afrique.",
    features: [
      "Stratégie de communication digitale",
      "Gestion des réseaux sociaux",
      "Campagnes publicitaires Meta & Google",
      "SEO et référencement naturel",
      "Création de contenu et copywriting",
      "Analyse de performance et reporting",
    ],
    stats: [{ v: "3×",   l: "ROI moyen" }, { v: "90j", l: "premiers résultats" }, { v: "360°", l: "couverture" }],
    color: "#D97706", bg: "linear-gradient(135deg,#B45309,#F59E0B)",
    lightBg: "#FEF3C7", href: "/contact",
  },
  {
    id: "cybersec", num: "05",
    Icon: Shield,
    title: "Cybersécurité",
    tagline: "Protection & audit de vos systèmes",
    description: "Protégez votre entreprise contre les cybermenaces. Audits de sécurité, solutions de protection et formation de vos équipes aux bonnes pratiques.",
    features: [
      "Audit de sécurité et test de pénétration",
      "Mise en place de pare-feu et antivirus",
      "Protection des données (RGPD)",
      "Formation et sensibilisation des équipes",
      "Plan de continuité d'activité (PCA)",
      "Surveillance et détection des incidents",
    ],
    stats: [{ v: "0",    l: "incident non détecté" }, { v: "48h", l: "intervention" }, { v: "RGPD", l: "conforme" }],
    color: "#DC2626", bg: "linear-gradient(135deg,#DC2626,#F87171)",
    lightBg: "#FEE2E2", href: "/contact",
  },
  {
    id: "content", num: "06",
    Icon: FileText,
    title: "Développement de Contenus",
    tagline: "Création & intégration de contenus digitaux",
    description: "Nous créons et intégrons des contenus digitaux de qualité pour tous vos supports : web, réseaux sociaux, applications, supports print et audiovisuels.",
    features: [
      "Rédaction web et articles de blog",
      "Création graphique et identité visuelle",
      "Production vidéo et motion design",
      "Sites vitrine & e-commerce",
      "Supports print (brochures, flyers, affiches)",
      "Photographie corporate",
    ],
    stats: [{ v: "200+", l: "contenus/mois" }, { v: "FR/EN", l: "bilingue" }, { v: "48h", l: "livraison" }],
    color: "#0891B2", bg: "linear-gradient(135deg,#0E7490,#06B6D4)",
    lightBg: "#CFFAFE", href: "/contact",
  },
]

const WHY_US = [
  { Icon: Star,  title: "Expertise locale",   desc: "Une équipe basée à Lomé qui connaît les réalités du marché africain." },
  { Icon: Clock, title: "Réactivité",          desc: "Réponse sous 24h et suivi personnalisé tout au long du projet." },
  { Icon: Users, title: "Approche sur mesure", desc: "Chaque solution est conçue selon vos besoins et votre budget." },
  { Icon: Award, title: "Résultats prouvés",   desc: "50 000+ clients satisfaits et 5 ans d'expérience en Afrique." },
]

export default function ServicesPage() {
  const [active, setActive] = useState("transferts")
  const current = SERVICES_DETAIL.find(s => s.id === active)!

  return (
    <>
      <Navbar />
      <main>

        {/* ── Hero ──────────────────────────────────────────────────────── */}
        <div style={{ background:"linear-gradient(160deg,#0F1E4A 0%,#1A3A8F 60%,#0F1E4A 100%)", paddingTop:"68px", position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", top:"-60px", right:"-60px", width:"400px", height:"400px", borderRadius:"50%", background:"radial-gradient(circle,rgba(30,159,232,0.1) 0%,transparent 70%)", pointerEvents:"none" }} />
          <div style={{ padding:"72px 5% 56px", position:"relative", zIndex:1 }}>
            <div style={{ maxWidth:"700px", margin:"0 auto", textAlign:"center" }}>
              <motion.span initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.4 }}
                style={{ display:"inline-block", fontSize:"11px", fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", padding:"7px 18px", borderRadius:"999px", background:"rgba(30,159,232,0.15)", color:"#60C8FF", border:"1px solid rgba(30,159,232,0.25)", marginBottom:"20px" }}
              >Ce que nous faisons</motion.span>

              <motion.h1 initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.55, delay:0.1 }}
                style={{ fontSize:"clamp(2rem,4vw,3.2rem)", fontWeight:700, color:"#fff", margin:"0 0 16px" }}
              >
                6 expertises au service<br />
                <span style={{ color:"#1E9FE8" }}>de votre réussite</span>
              </motion.h1>

              <motion.p initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.4, delay:0.2 }}
                style={{ fontSize:"1.05rem", color:"rgba(255,255,255,0.65)", lineHeight:1.7, marginBottom:"40px" }}
              >
                Transferts, informatique, téléphones, marketing, cybersécurité et contenus — tout pour votre digital au Togo.
              </motion.p>

              {/* Pills */}
              <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.4, delay:0.3 }}
                style={{ display:"flex", flexWrap:"wrap", gap:"10px", justifyContent:"center" }}
              >
                {SERVICES_DETAIL.map(s => (
                  <button key={s.id} onClick={() => setActive(s.id)} style={{
                    padding:"9px 18px", borderRadius:"999px", cursor:"pointer",
                    fontWeight:600, fontSize:"0.82rem", border:"none",
                    transition:"all 0.25s",
                    background: active === s.id ? s.color : "rgba(255,255,255,0.1)",
                    color: active === s.id ? "#fff" : "rgba(255,255,255,0.7)",
                    boxShadow: active === s.id ? `0 4px 16px ${s.color}60` : "none",
                    transform: active === s.id ? "scale(1.05)" : "scale(1)",
                  }}>{s.title}</button>
                ))}
              </motion.div>
            </div>
          </div>
          <div style={{ lineHeight:0 }}>
            <svg viewBox="0 0 1440 48" xmlns="http://www.w3.org/2000/svg" style={{ display:"block", width:"100%" }}>
              <path d="M0,24 C360,48 1080,0 1440,24 L1440,48 L0,48 Z" fill="#f8fafc" />
            </svg>
          </div>
        </div>

        {/* ── Carte service active ───────────────────────────────────────── */}
        <div style={{ background:"#f8fafc", padding:"64px 5%" }}>
          <AnimatePresence mode="wait">
            <motion.div key={active}
              initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-10 }}
              transition={{ duration:0.35 }}
              style={{ background:"#fff", borderRadius:"24px", boxShadow:"0 4px 40px rgba(0,0,0,0.08)", overflow:"hidden", display:"grid", gridTemplateColumns:"1fr 1.8fr" }}
              className="service-card-grid"
            >
              {/* Panneau coloré */}
              <div style={{ background:current.bg, padding:"56px 40px", display:"flex", flexDirection:"column", gap:"24px", position:"relative", overflow:"hidden" }}>
                <div style={{ position:"absolute", bottom:"-60px", right:"-60px", width:"200px", height:"200px", borderRadius:"50%", background:"rgba(255,255,255,0.06)", pointerEvents:"none" }} />
                <span style={{ fontSize:"0.7rem", fontWeight:800, color:"rgba(255,255,255,0.4)", letterSpacing:"0.2em" }}>{current.num} / 06</span>
                <div style={{ width:"72px", height:"72px", borderRadius:"20px", background:"rgba(255,255,255,0.18)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <current.Icon size={34} color="#fff" />
                </div>
                <div>
                  <p style={{ fontSize:"1.5rem", fontWeight:800, color:"#fff", margin:"0 0 8px", lineHeight:1.2 }}>{current.title}</p>
                  <p style={{ fontSize:"0.9rem", color:"rgba(255,255,255,0.7)", margin:0, lineHeight:1.6 }}>{current.tagline}</p>
                </div>
                <div style={{ display:"flex", gap:"20px", flexWrap:"wrap" }}>
                  {current.stats.map(({ v, l }) => (
                    <div key={l}>
                      <p style={{ fontSize:"1.2rem", fontWeight:900, color:"#fff", margin:0 }}>{v}</p>
                      <p style={{ fontSize:"0.72rem", color:"rgba(255,255,255,0.55)", margin:0 }}>{l}</p>
                    </div>
                  ))}
                </div>

                {/* Logos transferts ou téléphones */}
                {current.id === "transferts" && (
                  <div style={{ display:"flex", flexWrap:"wrap", gap:"8px" }}>
                    {[...TRANSFER_NATIONAL, ...TRANSFER_INTERNATIONAL].filter(t => t.logo).slice(0,4).map(t => (
                      <div key={t.name} style={{ background:"rgba(255,255,255,0.15)", borderRadius:"8px", padding:"6px 10px" }}>
                        <Image src={t.logo!} alt={t.name} width={60} height={28} unoptimized style={{ height:"22px", width:"auto", objectFit:"contain" }} />
                      </div>
                    ))}
                  </div>
                )}
                {current.id === "phones" && (
                  <div style={{ display:"flex", flexDirection:"column", gap:"8px" }}>
                    {PHONE_BRANDS.map(b => (
                      <div key={b.name} style={{ background:"rgba(255,255,255,0.12)", borderRadius:"8px", padding:"8px 14px" }}>
                        <Image src={b.logo} alt={b.name} width={80} height={28} unoptimized style={{ height:"20px", width:"auto", objectFit:"contain", filter:"brightness(0) invert(1)" }} />
                      </div>
                    ))}
                  </div>
                )}

                <Link href={current.href} style={{ display:"inline-flex", alignItems:"center", gap:"8px", background:"rgba(255,255,255,0.15)", border:"1px solid rgba(255,255,255,0.3)", color:"#fff", fontWeight:700, fontSize:"0.88rem", padding:"11px 22px", borderRadius:"10px", textDecoration:"none", alignSelf:"flex-start", transition:"background 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.28)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.15)")}
                >
                  {current.id === "transferts" ? "Voir les transferts" : current.id === "phones" ? "Nos téléphones" : "Nous contacter"} <ArrowRight size={14} />
                </Link>
              </div>

              {/* Panneau contenu */}
              <div style={{ padding:"56px 48px" }}>
                <p style={{ fontSize:"1rem", color:"var(--color-text-body)", lineHeight:1.8, marginBottom:"32px", borderLeft:`4px solid ${current.color}`, paddingLeft:"20px" }}>
                  {current.description}
                </p>
                <p style={{ fontSize:"11px", fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:current.color, margin:"0 0 20px" }}>Ce que nous proposons</p>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px", marginBottom:"32px" }}>
                  {current.features.map(f => (
                    <div key={f} style={{ display:"flex", alignItems:"flex-start", gap:"10px" }}>
                      <div style={{ width:"22px", height:"22px", borderRadius:"6px", flexShrink:0, marginTop:"1px", background:current.lightBg, display:"flex", alignItems:"center", justifyContent:"center" }}>
                        <Check size={12} color={current.color} strokeWidth={3} />
                      </div>
                      <span style={{ fontSize:"0.85rem", color:"var(--color-text-body)", lineHeight:1.55 }}>{f}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display:"flex", gap:"8px", flexWrap:"wrap", paddingTop:"24px", borderTop:"1px solid #E2E8F0" }}>
                  <span style={{ fontSize:"0.78rem", color:"var(--color-text-muted)", alignSelf:"center", marginRight:"4px" }}>Autres :</span>
                  {SERVICES_DETAIL.filter(s => s.id !== active).map(s => (
                    <button key={s.id} onClick={() => setActive(s.id)} style={{ padding:"5px 14px", borderRadius:"999px", cursor:"pointer", fontSize:"0.78rem", fontWeight:600, border:`1px solid ${s.color}40`, background:s.lightBg, color:s.color, transition:"transform 0.15s" }}
                      onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
                      onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                    >{s.title}</button>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Marques téléphones — 3 cards premium ─────────────────────── */}
        <div style={{ background:"#0F1E4A", padding:"72px 5%", position:"relative", overflow:"hidden" }}>
          {/* Déco */}
          <div style={{ position:"absolute", top:"-60px", left:"50%", transform:"translateX(-50%)", width:"700px", height:"350px", background:"radial-gradient(ellipse,rgba(30,159,232,0.07) 0%,transparent 70%)", pointerEvents:"none" }} />

          {/* En-tête */}
          <div style={{ textAlign:"center", marginBottom:"48px", position:"relative", zIndex:1 }}>
            <motion.span initial={{ opacity:0, y:12 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.4 }}
              style={{ display:"inline-block", fontSize:"11px", fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", padding:"7px 18px", borderRadius:"999px", background:"rgba(30,159,232,0.15)", color:"#60C8FF", border:"1px solid rgba(30,159,232,0.25)", marginBottom:"16px" }}
            >Revendeur agréé</motion.span>
            <motion.h2 initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.5, delay:0.1 }}
              style={{ fontSize:"clamp(1.6rem,3vw,2.2rem)", fontWeight:700, color:"#fff", margin:"0 0 12px" }}
            >Nos marques de téléphones</motion.h2>
            <motion.p initial={{ opacity:0, y:10 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.4, delay:0.2 }}
              style={{ fontSize:"0.95rem", color:"rgba(255,255,255,0.5)", margin:0 }}
            >Smartphones robustes, grandes batteries, adaptés aux conditions africaines</motion.p>
          </div>

          {/* 3 cards côte à côte */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"24px", maxWidth:"900px", margin:"0 auto", position:"relative", zIndex:1 }} className="phones-grid">
            {PHONE_BRANDS.map((b, i) => (
              <motion.div key={b.name}
                initial={{ opacity:0, y:32 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }} transition={{ duration:0.55, delay:i*0.12 }}
                whileHover={{ y:-8, transition:{ duration:0.2 } }}
                style={{
                  background:"rgba(255,255,255,0.05)",
                  border:"1px solid rgba(255,255,255,0.1)",
                  borderRadius:"20px", padding:"40px 28px",
                  textAlign:"center", cursor:"default",
                  backdropFilter:"blur(8px)",
                  position:"relative", overflow:"hidden",
                  transition:"box-shadow 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.boxShadow = "0 20px 60px rgba(30,159,232,0.2)"}
                onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.boxShadow = "none"}
              >
                {/* Numéro déco */}
                <span style={{ position:"absolute", top:"-12px", right:"16px", fontSize:"5rem", fontWeight:900, color:"rgba(255,255,255,0.04)", lineHeight:1, userSelect:"none" }}>0{i+1}</span>

                {/* Logo sur fond blanc */}
                <div style={{ background:"#fff", borderRadius:"14px", padding:"16px 24px", display:"inline-flex", alignItems:"center", justifyContent:"center", marginBottom:"24px", boxShadow:"0 4px 20px rgba(0,0,0,0.2)", minWidth:"140px", height:"64px" }}>
                  <Image src={b.logo} alt={b.name} width={130} height={48} unoptimized
                    style={{ maxHeight:"42px", width:"auto", objectFit:"contain" }}
                  />
                </div>

                {/* Nom + desc */}
                <p style={{ fontSize:"1rem", fontWeight:700, color:"#fff", margin:"0 0 8px" }}>{b.name}</p>
                <p style={{ fontSize:"0.82rem", color:"rgba(255,255,255,0.5)", margin:"0 0 20px", lineHeight:1.5 }}>{b.desc}</p>

                {/* Badge "Agréé" */}
                <span style={{ display:"inline-flex", alignItems:"center", gap:"6px", fontSize:"0.72rem", fontWeight:700, color:"#60C8FF", background:"rgba(30,159,232,0.12)", border:"1px solid rgba(30,159,232,0.2)", padding:"5px 12px", borderRadius:"999px" }}>
                  ✓ Revendeur agréé
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Pourquoi nous ─────────────────────────────────────────────── */}
        <div style={{ background:"#f8fafc", padding:"72px 5%" }}>
          <div style={{ textAlign:"center", marginBottom:"48px" }}>
            <h2 style={{ fontSize:"clamp(1.6rem,3vw,2.2rem)", fontWeight:700, color:"var(--color-text-heading)", margin:"0 0 12px" }}>Pourquoi choisir @TOGO ?</h2>
            <p style={{ fontSize:"1rem", color:"var(--color-text-body)", margin:0 }}>Une équipe locale avec une vision panafricaine.</p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"20px", maxWidth:"1000px", margin:"0 auto" }} className="why-grid">
            {WHY_US.map(({ Icon, title, desc }, i) => (
              <motion.div key={title}
                initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }} transition={{ duration:0.4, delay:i*0.08 }}
                whileHover={{ y:-4, boxShadow:"0 12px 32px rgba(0,0,0,0.08)" }}
                style={{ background:"#fff", borderRadius:"16px", padding:"28px 22px", border:"1.5px solid #E2E8F0", textAlign:"center" }}
              >
                <div style={{ width:"52px", height:"52px", borderRadius:"14px", background:"var(--color-brand-light)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px" }}>
                  <Icon size={22} color="var(--color-brand-primary)" />
                </div>
                <p style={{ fontSize:"0.95rem", fontWeight:700, color:"var(--color-text-heading)", margin:"0 0 8px" }}>{title}</p>
                <p style={{ fontSize:"0.82rem", color:"var(--color-text-body)", lineHeight:1.65, margin:0 }}>{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── CTA ───────────────────────────────────────────────────────── */}
        <div style={{ background:"#070F2B", padding:"96px 5%", textAlign:"center", position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:"600px", height:"300px", background:"radial-gradient(ellipse,rgba(30,159,232,0.08) 0%,transparent 70%)", pointerEvents:"none" }} />
          <div style={{ position:"relative", zIndex:1 }}>
            <p style={{ fontSize:"clamp(2rem,4vw,2.8rem)", fontWeight:800, color:"#fff", margin:"0 0 16px" }}>
              Votre projet mérite<br />
              <span style={{ background:"linear-gradient(135deg,#1E9FE8,#10B981)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
                la meilleure équipe.
              </span>
            </p>
            <p style={{ fontSize:"1.05rem", color:"rgba(255,255,255,0.55)", margin:"0 auto 40px", maxWidth:"440px", lineHeight:1.7 }}>
              Discutons de vos besoins. Réponse sous 24h.
            </p>
            <div style={{ display:"flex", gap:"14px", justifyContent:"center", flexWrap:"wrap" }}>
              <Link href="/contact" style={{ display:"inline-flex", alignItems:"center", gap:"10px", background:"linear-gradient(135deg,#1E9FE8,#0D7A4E)", color:"#fff", fontWeight:800, fontSize:"1rem", padding:"16px 36px", borderRadius:"12px", textDecoration:"none", boxShadow:"0 8px 32px rgba(30,159,232,0.3)" }}>
                Nous contacter <ArrowRight size={18} />
              </Link>
              <Link href="/about" style={{ display:"inline-flex", alignItems:"center", gap:"8px", background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.15)", color:"rgba(255,255,255,0.8)", fontWeight:600, fontSize:"1rem", padding:"16px 32px", borderRadius:"12px", textDecoration:"none" }}>
                En savoir plus sur nous
              </Link>
            </div>
          </div>
        </div>

      </main>
      <Footer />
    </>
  )
}
