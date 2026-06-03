"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import {
  Target, Eye, Heart, ArrowRight,
  Globe, Users, Zap, Shield,
  MapPin, CheckCircle,
} from "lucide-react"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"

const VALUES = [
  { Icon: Zap,    color: "#1E9FE8", grad: "linear-gradient(135deg,#1A3A8F,#1E9FE8)", title: "Innovation",  desc: "Nous adoptons les meilleures technologies pour accélérer la transformation numérique de l'Afrique." },
  { Icon: Shield, color: "#0D7A4E", grad: "linear-gradient(135deg,#0D7A4E,#10B981)", title: "Confiance",   desc: "Sécurité et transparence absolues au cœur de chaque solution que nous déployons." },
  { Icon: Users,  color: "#7C3AED", grad: "linear-gradient(135deg,#5B21B6,#7C3AED)", title: "Proximité",  desc: "Une équipe locale basée à Lomé qui comprend profondément les réalités du marché africain." },
  { Icon: Globe,  color: "#D97706", grad: "linear-gradient(135deg,#B45309,#F59E0B)", title: "Impact",     desc: "Chaque service contribue concrètement au développement numérique et économique de l'Afrique." },
]

const TIMELINE = [
  { year: "2019", side: "right", color: "#1E9FE8", title: "Fondation de @TOGO",         desc: "Création à Lomé avec une mission claire : accompagner entreprises et particuliers vers l'avenir numérique en Afrique de l'Ouest." },
  { year: "2020", side: "left",  color: "#10B981", title: "Services de transferts",      desc: "Lancement des services de transferts nationaux (Flooz, MixBy Yas) et signature des premiers partenariats Western Union & MoneyGram." },
  { year: "2021", side: "right", color: "#7C3AED", title: "Expansion internationale",    desc: "Extension du réseau avec RIA Money Transfer et consolidation de notre présence comme agence agréée de référence à Lomé." },
  { year: "2023", side: "left",  color: "#F59E0B", title: "Nouvelles divisions",         desc: "Lancement officiel des divisions Solutions Informatiques, Cybersécurité et Marketing Digital pour les entreprises togolaises." },
  { year: "2024", side: "right", color: "#DC2626", title: "Revendeur téléphones agréé",  desc: "Partenariat avec Blackview, Oukitel et Doogee — smartphones robustes et abordables, adaptés aux conditions africaines." },
]

const ENGAGEMENTS = [
  "Agent agréé Western Union",
  "Agent agréé MoneyGram",
  "Partenaire RIA Money Transfer",
  "Revendeur agréé Blackview",
  "Revendeur agréé Oukitel",
  "Revendeur agréé Doogee",
]

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>

        {/* ── Hero ────────────────────────────────────────────────────── */}
        <div style={{
          background: "linear-gradient(160deg,#070F2B 0%,#0F1E4A 45%,#1A3A8F 100%)",
          paddingTop: "68px", position: "relative", overflow: "hidden",
        }}>
          <div style={{ position:"absolute", top:"-80px", right:"-80px", width:"500px", height:"500px", borderRadius:"50%", background:"radial-gradient(circle,rgba(30,159,232,0.1) 0%,transparent 70%)", pointerEvents:"none" }} />
          <div style={{ position:"absolute", bottom:"0", left:"30%", width:"400px", height:"300px", background:"radial-gradient(ellipse,rgba(16,185,129,0.06) 0%,transparent 70%)", pointerEvents:"none" }} />

          <div style={{ padding:"80px 5% 0", position:"relative", zIndex:1 }}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"64px", alignItems:"center", paddingBottom:"64px" }} className="about-hero-grid">

              {/* Texte */}
              <div>
                <motion.span initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.4 }}
                  style={{ display:"inline-block", fontSize:"11px", fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", padding:"7px 18px", borderRadius:"999px", background:"rgba(30,159,232,0.15)", color:"#60C8FF", border:"1px solid rgba(30,159,232,0.25)", marginBottom:"24px" }}
                >Notre histoire</motion.span>

                <motion.h1 initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.55, delay:0.1 }}
                  style={{ fontSize:"clamp(2.2rem,4.5vw,3.4rem)", fontWeight:800, color:"#fff", margin:"0 0 20px", lineHeight:1.1 }}
                >
                  La référence digitale<br />
                  <span style={{ background:"linear-gradient(135deg,#1E9FE8,#10B981)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
                    au Togo
                  </span>
                </motion.h1>

                <motion.p initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5, delay:0.2 }}
                  style={{ fontSize:"1.05rem", color:"rgba(255,255,255,0.65)", lineHeight:1.8, maxWidth:"480px", marginBottom:"36px" }}
                >
                  Fondée à Lomé en 2019, @TOGO accompagne entreprises et particuliers
                  avec des services de transferts, solutions IT, cybersécurité,
                  marketing digital et vente de téléphones.
                </motion.p>

                {/* Stats */}
                <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.4, delay:0.3 }}
                  style={{ display:"flex", gap:"0", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:"16px", overflow:"hidden" }}
                >
                  {[
                    { val:"5 ans", label:"d'expérience"    },
                    { val:"6",     label:"services"         },
                    { val:"50k+",  label:"clients satisfaits"},
                  ].map(({ val, label }, i) => (
                    <div key={label} style={{ flex:1, padding:"20px 16px", textAlign:"center", borderRight: i < 2 ? "1px solid rgba(255,255,255,0.08)" : "none" }}>
                      <p style={{ fontSize:"1.5rem", fontWeight:900, color:"#fff", margin:"0 0 4px", lineHeight:1 }}>{val}</p>
                      <p style={{ fontSize:"0.72rem", color:"rgba(255,255,255,0.45)", margin:0, fontWeight:500 }}>{label}</p>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Logo flottant + accréditations */}
              <motion.div initial={{ opacity:0, x:24 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.7, delay:0.2 }}
                style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"28px" }}
              >
                <motion.div
                  animate={{ y:[0,-14,0] }}
                  transition={{ duration:3.5, repeat:Infinity, ease:"easeInOut" }}
                  style={{ background:"rgba(255,255,255,0.07)", backdropFilter:"blur(12px)", border:"1px solid rgba(255,255,255,0.12)", borderRadius:"28px", padding:"48px 56px", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 24px 80px rgba(0,0,0,0.3)" }}
                >
                  <Image src="/images/logo.png" alt="@TOGO" width={200} height={66} unoptimized
                    style={{ height:"66px", width:"auto", filter:"brightness(0) invert(1)" }}
                  />
                </motion.div>

                {/* Accréditations */}
                <div style={{ display:"flex", flexWrap:"wrap", gap:"8px", justifyContent:"center", maxWidth:"320px" }}>
                  {ENGAGEMENTS.map(e => (
                    <span key={e} style={{ display:"inline-flex", alignItems:"center", gap:"5px", fontSize:"0.72rem", fontWeight:600, color:"rgba(255,255,255,0.7)", background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.12)", padding:"5px 12px", borderRadius:"999px" }}>
                      <CheckCircle size={10} color="#10B981" />
                      {e}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          <div style={{ lineHeight:0 }}>
            <svg viewBox="0 0 1440 48" xmlns="http://www.w3.org/2000/svg" style={{ display:"block", width:"100%" }}>
              <path d="M0,24 C360,48 1080,0 1440,24 L1440,48 L0,48 Z" fill="#f8fafc" />
            </svg>
          </div>
        </div>

        {/* ── Mission / Vision / Valeurs — section sombre immersive ─── */}
        <div style={{ background:"#070F2B", padding:"96px 5%", position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:"800px", height:"400px", background:"radial-gradient(ellipse,rgba(30,159,232,0.07) 0%,transparent 70%)", pointerEvents:"none" }} />

          <div style={{ position:"relative", zIndex:1 }}>
            <motion.div initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
              style={{ textAlign:"center", marginBottom:"64px" }}
            >
              <span style={{ fontSize:"11px", fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", padding:"7px 18px", borderRadius:"999px", background:"rgba(30,159,232,0.12)", color:"#60C8FF", border:"1px solid rgba(30,159,232,0.2)" }}>
                Notre raison d&apos;être
              </span>
            </motion.div>

            <div style={{ display:"grid", gridTemplateColumns:"1fr 1px 1fr 1px 1fr", gap:"0", maxWidth:"1100px", margin:"0 auto" }} className="mvv-dark-grid">
              {[
                { Icon:Target, color:"#1E9FE8", num:"01", title:"Notre mission", text:"Rendre les services digitaux et financiers accessibles à tous au Togo — transferts, IT, cybersécurité, marketing et téléphones." },
                { Icon:Eye,    color:"#10B981", num:"02", title:"Notre vision",  text:"Devenir la référence des services numériques et financiers en Afrique de l'Ouest, en plaçant le client au centre de tout." },
                { Icon:Heart,  color:"#A78BFA", num:"03", title:"Nos valeurs",  text:"Innovation, confiance, proximité et impact social — les piliers qui guident chaque décision et chaque service que nous offrons." },
              ].map(({ Icon, color, num, title, text }, i) => (
                <>
                  <motion.div key={title}
                    initial={{ opacity:0, y:32 }} whileInView={{ opacity:1, y:0 }}
                    viewport={{ once:true }} transition={{ duration:0.6, delay:i*0.15 }}
                    style={{ padding:"0 48px", textAlign:"center" }}
                  >
                    {/* Numéro */}
                    <p style={{ fontSize:"0.65rem", fontWeight:800, color, letterSpacing:"0.2em", marginBottom:"20px" }}>{num}</p>
                    {/* Icône */}
                    <div style={{ width:"64px", height:"64px", borderRadius:"50%", border:`2px solid ${color}40`, background:`${color}12`, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 24px" }}>
                      <Icon size={28} color={color} />
                    </div>
                    <p style={{ fontSize:"1rem", fontWeight:700, color:"#fff", margin:"0 0 14px", letterSpacing:"0.01em" }}>{title}</p>
                    <p style={{ fontSize:"0.85rem", color:"rgba(255,255,255,0.5)", lineHeight:1.8, margin:0 }}>{text}</p>
                  </motion.div>
                  {/* Séparateur vertical */}
                  {i < 2 && <div key={`sep-${i}`} style={{ background:"rgba(255,255,255,0.08)", width:"1px", margin:"0" }} />}
                </>
              ))}
            </div>
          </div>
        </div>

        {/* ── Valeurs — layout horizontal numéroté ──────────────────── */}
        <div style={{ background:"#fff", padding:"80px 5%" }}>
          <div style={{ maxWidth:"1000px", margin:"0 auto" }}>
            <motion.div initial={{ opacity:0, y:12 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
              style={{ marginBottom:"48px" }}
            >
              <h2 style={{ fontSize:"clamp(1.8rem,3.5vw,2.6rem)", fontWeight:800, color:"var(--color-text-heading)", margin:"0 0 12px" }}>
                Ce qui nous<br />
                <span style={{ background:"linear-gradient(135deg,#1E9FE8,#10B981)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
                  définit vraiment
                </span>
              </h2>
              <p style={{ fontSize:"1rem", color:"var(--color-text-muted)", margin:0, maxWidth:"400px" }}>
                4 valeurs fondamentales qui guident chacune de nos actions.
              </p>
            </motion.div>

            <div style={{ display:"flex", flexDirection:"column", gap:"2px" }}>
              {VALUES.map(({ Icon, color, grad, title, desc }, i) => (
                <motion.div key={title}
                  initial={{ opacity:0, x:-24 }} whileInView={{ opacity:1, x:0 }}
                  viewport={{ once:true }} transition={{ duration:0.5, delay:i*0.1 }}
                  whileHover={{ x:8, transition:{ duration:0.2 } }}
                  style={{
                    display:"grid", gridTemplateColumns:"64px 1fr",
                    gap:"24px", alignItems:"center",
                    padding:"24px 28px", borderRadius:"16px",
                    background: i % 2 === 0 ? "#f8fafc" : "#fff",
                    border:"1.5px solid #F1F5F9",
                    cursor:"default", transition:"background 0.2s",
                  }}
                  onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = `${color}08`}
                  onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = i % 2 === 0 ? "#f8fafc" : "#fff"}
                >
                  {/* Numéro + icône */}
                  <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"6px" }}>
                    <span style={{ fontSize:"0.65rem", fontWeight:800, color, letterSpacing:"0.1em" }}>0{i+1}</span>
                    <div style={{ width:"44px", height:"44px", borderRadius:"12px", background:grad, display:"flex", alignItems:"center", justifyContent:"center", boxShadow:`0 4px 16px ${color}30` }}>
                      <Icon size={20} color="#fff" />
                    </div>
                  </div>
                  {/* Texte */}
                  <div>
                    <p style={{ fontSize:"1rem", fontWeight:700, color:"var(--color-text-heading)", margin:"0 0 6px" }}>{title}</p>
                    <p style={{ fontSize:"0.85rem", color:"var(--color-text-body)", lineHeight:1.7, margin:0 }}>{desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Timeline alternée ─────────────────────────────────────── */}
        <div style={{ background:"#f8fafc", padding:"80px 5%" }}>
          <div style={{ textAlign:"center", marginBottom:"64px" }}>
            <span style={{ display:"inline-block", fontSize:"11px", fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", padding:"7px 18px", borderRadius:"999px", background:"var(--color-brand-light)", color:"var(--color-brand-dark)", marginBottom:"16px" }}>Depuis 2019</span>
            <h2 style={{ fontSize:"clamp(1.6rem,3vw,2.2rem)", fontWeight:700, color:"var(--color-text-heading)", margin:0 }}>Notre parcours</h2>
          </div>

          <div style={{ maxWidth:"800px", margin:"0 auto", position:"relative" }}>
            {/* Ligne centrale */}
            <div style={{ position:"absolute", left:"50%", top:"24px", bottom:"24px", width:"2px", background:"linear-gradient(to bottom,#1E9FE8,#F59E0B,#DC2626)", transform:"translateX(-50%)", borderRadius:"999px" }} className="timeline-center-line" />

            <div style={{ display:"flex", flexDirection:"column", gap:"40px" }}>
              {TIMELINE.map((t, i) => {
                const isRight = t.side === "right"
                return (
                  <motion.div key={t.year}
                    initial={{ opacity:0, x: isRight ? 40 : -40 }}
                    whileInView={{ opacity:1, x:0 }}
                    viewport={{ once:true }} transition={{ duration:0.55, delay:i*0.1 }}
                    style={{ display:"grid", gridTemplateColumns:"1fr 48px 1fr", gap:"0", alignItems:"start" }} className="timeline-row"
                  >
                    {/* Côté gauche */}
                    <div style={{ paddingRight:"24px", paddingTop:"8px" }}>
                      {!isRight && (
                        <div style={{ background:"#fff", borderRadius:"16px", padding:"22px 24px", boxShadow:"0 4px 20px rgba(0,0,0,0.07)", border:"1.5px solid #E2E8F0", borderLeft:`4px solid ${t.color}` }}>
                          <p style={{ fontSize:"0.95rem", fontWeight:700, color:"var(--color-text-heading)", margin:"0 0 8px" }}>{t.title}</p>
                          <p style={{ fontSize:"0.83rem", color:"var(--color-text-body)", lineHeight:1.7, margin:0 }}>{t.desc}</p>
                        </div>
                      )}
                    </div>

                    {/* Point central */}
                    <div style={{ display:"flex", justifyContent:"center", alignItems:"flex-start", paddingTop:"4px" }}>
                      <div style={{ width:"48px", height:"48px", borderRadius:"50%", background:`linear-gradient(135deg,${t.color},${t.color}99)`, display:"flex", alignItems:"center", justifyContent:"center", boxShadow:`0 0 0 4px #f8fafc, 0 0 0 6px ${t.color}30`, flexShrink:0, zIndex:1 }}>
                        <span style={{ fontSize:"0.6rem", fontWeight:900, color:"#fff", letterSpacing:"0.05em" }}>{t.year}</span>
                      </div>
                    </div>

                    {/* Côté droit */}
                    <div style={{ paddingLeft:"24px", paddingTop:"8px" }}>
                      {isRight && (
                        <div style={{ background:"#fff", borderRadius:"16px", padding:"22px 24px", boxShadow:"0 4px 20px rgba(0,0,0,0.07)", border:"1.5px solid #E2E8F0", borderRight:`4px solid ${t.color}` }}>
                          <p style={{ fontSize:"0.95rem", fontWeight:700, color:"var(--color-text-heading)", margin:"0 0 8px" }}>{t.title}</p>
                          <p style={{ fontSize:"0.83rem", color:"var(--color-text-body)", lineHeight:1.7, margin:0 }}>{t.desc}</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>

        {/* ── Basé à Lomé ───────────────────────────────────────────── */}
        <div style={{ background:"#fff", padding:"72px 5%" }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"56px", alignItems:"center", maxWidth:"1000px", margin:"0 auto" }} className="about-hero-grid">
            <motion.div initial={{ opacity:0, x:-20 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.55 }}>
              <span style={{ display:"inline-block", fontSize:"11px", fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", padding:"7px 18px", borderRadius:"999px", background:"var(--color-brand-light)", color:"var(--color-brand-dark)", marginBottom:"20px" }}>Où nous trouver</span>
              <h2 style={{ fontSize:"clamp(1.6rem,3vw,2.2rem)", fontWeight:700, color:"var(--color-text-heading)", margin:"0 0 16px" }}>
                Basés à Lomé,<br />ouverts sur l&apos;Afrique
              </h2>
              <p style={{ fontSize:"0.95rem", color:"var(--color-text-body)", lineHeight:1.8, marginBottom:"28px" }}>
                Notre agence est établie au cœur de Lomé. Nous accueillons nos clients en personne pour tous les services de transferts, conseils IT et achat de téléphones.
              </p>
              <div style={{ display:"flex", flexDirection:"column", gap:"12px" }}>
                {[
                  { Icon:MapPin, text:"Lomé, Togo — Quartier Administratif" },
                  { Icon:Globe,  text:"Couverture : Afrique de l'Ouest & international" },
                  { Icon:Users,  text:"Lun–Sam · 8h–18h · Service personnalisé" },
                ].map(({ Icon, text }) => (
                  <div key={text} style={{ display:"flex", alignItems:"center", gap:"12px" }}>
                    <div style={{ width:"36px", height:"36px", borderRadius:"10px", background:"var(--color-brand-light)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                      <Icon size={16} color="var(--color-brand-primary)" />
                    </div>
                    <span style={{ fontSize:"0.9rem", color:"var(--color-text-body)" }}>{text}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Card Lomé */}
            <motion.div initial={{ opacity:0, x:20 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.55, delay:0.1 }}
              style={{ background:"linear-gradient(135deg,#0F1E4A,#1A3A8F)", borderRadius:"24px", padding:"48px", color:"#fff", position:"relative", overflow:"hidden" }}
            >
              <div style={{ position:"absolute", top:"-40px", right:"-40px", width:"200px", height:"200px", borderRadius:"50%", background:"rgba(30,159,232,0.1)", pointerEvents:"none" }} />
              <p style={{ fontSize:"3rem", margin:"0 0 8px" }}>🇹🇬</p>
              <p style={{ fontSize:"1.4rem", fontWeight:800, color:"#fff", margin:"0 0 8px" }}>Lomé, Togo</p>
              <p style={{ fontSize:"0.88rem", color:"rgba(255,255,255,0.6)", margin:"0 0 28px", lineHeight:1.6 }}>
                Capitale économique du Togo, carrefour de l&apos;Afrique de l&apos;Ouest.
              </p>
              <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
                {ENGAGEMENTS.slice(0,4).map(e => (
                  <div key={e} style={{ display:"flex", alignItems:"center", gap:"8px" }}>
                    <CheckCircle size={14} color="#10B981" />
                    <span style={{ fontSize:"0.82rem", color:"rgba(255,255,255,0.75)", fontWeight:500 }}>{e}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── CTA ───────────────────────────────────────────────────── */}
        <div style={{ background:"#070F2B", padding:"88px 5%", textAlign:"center", position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:"600px", height:"300px", background:"radial-gradient(ellipse,rgba(30,159,232,0.08) 0%,transparent 70%)", pointerEvents:"none" }} />
          <div style={{ position:"relative", zIndex:1 }}>
            <motion.p initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.5 }}
              style={{ fontSize:"clamp(1.8rem,4vw,2.8rem)", fontWeight:800, color:"#fff", margin:"0 0 14px" }}
            >
              Rejoignez l&apos;aventure @TOGO
            </motion.p>
            <motion.p initial={{ opacity:0, y:12 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.4, delay:0.1 }}
              style={{ fontSize:"1rem", color:"rgba(255,255,255,0.55)", margin:"0 auto 36px", maxWidth:"440px", lineHeight:1.7 }}
            >
              Travaillons ensemble pour votre transformation digitale.
            </motion.p>
            <Link href="/contact" style={{ display:"inline-flex", alignItems:"center", gap:"10px", background:"linear-gradient(135deg,#1E9FE8,#10B981)", color:"#fff", fontWeight:800, fontSize:"1rem", padding:"16px 40px", borderRadius:"12px", textDecoration:"none", boxShadow:"0 8px 32px rgba(30,159,232,0.3)", transition:"transform 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.transform="translateY(-2px)")}
              onMouseLeave={e => (e.currentTarget.style.transform="translateY(0)")}
            >
              Nous contacter <ArrowRight size={18} />
            </Link>
          </div>
        </div>

      </main>
      <Footer />
    </>
  )
}
