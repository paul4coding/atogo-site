"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowUpRight, MapPin, Clock, ShieldCheck } from "lucide-react"
import { TRANSFER_NATIONAL, TRANSFER_INTERNATIONAL, TRANSFER_STEPS } from "@/constants/data"

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1, ease: [0.22,1,0.36,1] as any } }),
}

export default function TransfersSection() {
  return (
    <section style={{
      position: "relative",
      background: "linear-gradient(160deg, #000000 0%, #030612 30%, #050B20 60%, #080F2A 100%)",
      padding: "100px 0 0",
      overflow: "hidden",
    }}>
      {/* Grille */}
      <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)", backgroundSize:"80px 80px", pointerEvents:"none" }} />
      {/* Décors */}
      <div style={{ position:"absolute", top:"-80px", right:"-80px", width:"500px", height:"500px", borderRadius:"50%", background:"radial-gradient(circle,rgba(251,191,36,0.07) 0%,transparent 65%)", animation:"float 9s ease-in-out infinite", pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:"80px", left:"-60px", width:"380px", height:"380px", borderRadius:"50%", background:"radial-gradient(circle,rgba(30,159,232,0.08) 0%,transparent 65%)", animation:"float 11s ease-in-out infinite reverse", pointerEvents:"none" }} />

      <div style={{ padding: "0 5%", position: "relative", zIndex: 1 }}>

        {/* En-tête */}
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <motion.span
            initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ duration:0.5 }}
            style={{
              display:"inline-block", fontSize:"11px", fontWeight:700,
              letterSpacing:"0.14em", textTransform:"uppercase",
              padding:"7px 18px", borderRadius:"999px",
              background:"rgba(30,159,232,0.15)", color:"#60C8FF",
              border:"1px solid rgba(30,159,232,0.25)", marginBottom:"20px",
            }}
          >Services financiers</motion.span>

          <motion.h2
            initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ duration:0.55, delay:0.1 }}
            style={{ fontSize:"clamp(2rem,4vw,3rem)", fontWeight:700, color:"#fff", margin:"0 0 16px", lineHeight:1.15 }}
          >
            Transferts d&apos;argent{" "}
            <span style={{ color:"#60C8FF" }}>national & international</span>
          </motion.h2>

          <motion.p
            initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ duration:0.5, delay:0.2 }}
            style={{ fontSize:"1.05rem", color:"rgba(255,255,255,0.6)", maxWidth:"520px", margin:"0 auto", lineHeight:1.7 }}
          >
            Envoyez et recevez de l&apos;argent facilement, en toute sécurité, vers le Togo et partout dans le monde.
          </motion.p>
        </div>

        {/* Grid 2 colonnes */}
        <div className="transfers-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"32px", marginBottom:"80px" }}>

          {/* National */}
          <motion.div
            initial={{ opacity:0, x:-24 }} whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true }} transition={{ duration:0.55 }}
            style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(30,159,232,0.22)", borderRadius:"20px", padding:"36px 32px", backdropFilter:"blur(8px)" }}
          >
            <div style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"24px" }}>
              <div style={{ width:"44px", height:"44px", borderRadius:"12px", background:"rgba(30,159,232,0.15)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <MapPin size={20} color="#1E9FE8" />
              </div>
              <div>
                <p style={{ fontSize:"1rem", fontWeight:700, color:"#fff", margin:0 }}>Transferts Nationaux</p>
                <p style={{ fontSize:"0.78rem", color:"rgba(255,255,255,0.5)", margin:0 }}>Mobile Money au Togo</p>
              </div>
            </div>

            <div style={{ display:"flex", flexWrap:"wrap", gap:"12px" }}>
              {TRANSFER_NATIONAL.map((t) => (
                <div key={t.name} style={{
                  background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.12)",
                  borderRadius:"12px", padding:"14px 18px",
                  display:"flex", alignItems:"center", gap:"10px",
                }}>
                  {t.logo ? (
                    <Image src={t.logo} alt={t.name} width={60} height={40} unoptimized
                      style={{ height:"32px", width:"auto", objectFit:"contain" }}
                    />
                  ) : (
                    <span style={{ fontSize:"0.9rem", fontWeight:800, color:"#fff" }}>{t.name}</span>
                  )}
                </div>
              ))}
            </div>

            <p style={{ fontSize:"0.82rem", color:"rgba(255,255,255,0.5)", marginTop:"20px", lineHeight:1.6 }}>
              Recharges et transferts Mobile Money via Flooz (MOOV), Yas Agent et MixBy — rapides et sans frais cachés.
            </p>
          </motion.div>

          {/* International */}
          <motion.div
            initial={{ opacity:0, x:24 }} whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true }} transition={{ duration:0.55, delay:0.1 }}
            style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(251,191,36,0.28)", borderRadius:"20px", padding:"36px 32px", backdropFilter:"blur(8px)" }}
          >
            <div style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"24px" }}>
              <div style={{ width:"44px", height:"44px", borderRadius:"12px", background:"rgba(251,191,36,0.12)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <ArrowUpRight size={20} color="#FBBF24" />
              </div>
              <div>
                <p style={{ fontSize:"1rem", fontWeight:700, color:"#fff", margin:0 }}>Transferts Internationaux</p>
                <p style={{ fontSize:"0.78rem", color:"rgba(255,255,255,0.5)", margin:0 }}>Vers l&apos;Europe, l&apos;Amérique et plus</p>
              </div>
            </div>

            <div style={{ display:"flex", flexWrap:"wrap", gap:"12px" }}>
              {TRANSFER_INTERNATIONAL.map((t) => (
                <div key={t.name} style={{
                  background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.12)",
                  borderRadius:"12px", padding:"14px 18px",
                  display:"flex", alignItems:"center", justifyContent:"center",
                }}>
                  <Image src={t.logo} alt={t.name} width={100} height={40} unoptimized
                    style={{ height:"30px", width:"auto", objectFit:"contain" }}
                  />
                </div>
              ))}
            </div>

            <p style={{ fontSize:"0.82rem", color:"rgba(255,255,255,0.5)", marginTop:"20px", lineHeight:1.6 }}>
              Envois et réceptions via Western Union, MoneyGram et RIA — couverture mondiale, traitement immédiat.
            </p>
          </motion.div>
        </div>

        {/* 3 étapes */}
        <div style={{ marginBottom:"80px" }}>
          <p style={{ fontSize:"0.75rem", fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:"rgba(255,255,255,0.35)", textAlign:"center", marginBottom:"32px" }}>
            Comment ça marche
          </p>
          <div className="steps-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"20px" }}>
            {TRANSFER_STEPS.map((s, i) => (
              <motion.div key={s.step}
                custom={i} variants={fadeUp} initial="hidden" whileInView="visible"
                viewport={{ once:true }}
                style={{
                  background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)",
                  borderRadius:"16px", padding:"28px 24px",
                  display:"flex", flexDirection:"column", gap:"14px",
                }}
              >
                <span style={{
                  fontSize:"10px", fontWeight:700, color:"#60C8FF",
                  background:"rgba(30,159,232,0.12)", padding:"3px 10px", borderRadius:"999px",
                  alignSelf:"flex-start",
                }}>Étape {s.step}</span>
                <p style={{ fontSize:"0.95rem", fontWeight:700, color:"#fff", margin:0 }}>{s.title}</p>
                <p style={{ fontSize:"0.83rem", color:"rgba(255,255,255,0.55)", margin:0, lineHeight:1.65 }}>{s.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Badges de confiance + CTA */}
        <div style={{
          display:"flex", alignItems:"center", justifyContent:"space-between",
          flexWrap:"wrap", gap:"24px", paddingBottom:"72px",
        }}>
          <div style={{ display:"flex", gap:"24px", flexWrap:"wrap" }}>
            {[
              { Icon:ShieldCheck, text:"Transactions sécurisées" },
              { Icon:Clock,       text:"Service rapide" },
              { Icon:MapPin,      text:"Agence à Lomé" },
            ].map(({ Icon, text }) => (
              <div key={text} style={{ display:"flex", alignItems:"center", gap:"8px" }}>
                <Icon size={16} color="#60C8FF" />
                <span style={{ fontSize:"0.85rem", color:"rgba(255,255,255,0.65)", fontWeight:500 }}>{text}</span>
              </div>
            ))}
          </div>
          <Link href="/transferts" style={{
            display:"inline-flex", alignItems:"center", gap:"10px",
            background:"linear-gradient(135deg,#FBBF24,#F59E0B)",
            color:"#0A0A0A", fontWeight:800, fontSize:"0.95rem",
            padding:"14px 32px", borderRadius:"12px", textDecoration:"none",
            boxShadow:"0 8px 32px rgba(251,191,36,0.35), 0 0 0 1px rgba(251,191,36,0.2)",
          }}>
            Voir tous les transferts <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>

      {/* Vague */}
      <div style={{ lineHeight:0 }}>
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" style={{ display:"block", width:"100%" }}>
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#f8fafc" />
        </svg>
      </div>
    </section>
  )
}
