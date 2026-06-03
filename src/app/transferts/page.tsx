"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, MapPin, ShieldCheck, Clock, Globe, Banknote } from "lucide-react"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import { TRANSFER_NATIONAL, TRANSFER_INTERNATIONAL, TRANSFER_STEPS } from "@/constants/data"

export default function TransfertsPage() {
  return (
    <>
      <Navbar />
      <main>

        {/* ── Hero ──────────────────────────────────────────────────────── */}
        <div style={{
          background: "linear-gradient(160deg, #0F1E4A 0%, #1A3A8F 60%, #0F1E4A 100%)",
          paddingTop: "68px", position: "relative", overflow: "hidden",
        }}>
          <div style={{ position:"absolute", top:"-60px", right:"-60px", width:"400px", height:"400px", borderRadius:"50%", background:"radial-gradient(circle,rgba(30,159,232,0.1) 0%,transparent 70%)", pointerEvents:"none" }} />
          <div style={{ padding:"80px 5% 64px", textAlign:"center", position:"relative", zIndex:1 }}>
            <motion.span initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.4 }}
              style={{ display:"inline-block", fontSize:"11px", fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", padding:"7px 18px", borderRadius:"999px", background:"rgba(30,159,232,0.15)", color:"#60C8FF", border:"1px solid rgba(30,159,232,0.25)", marginBottom:"20px" }}
            >Services financiers</motion.span>

            <motion.h1 initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.55, delay:0.1 }}
              style={{ fontSize:"clamp(2rem,4vw,3.2rem)", fontWeight:700, color:"#fff", margin:"0 0 16px", lineHeight:1.15 }}
            >
              Transferts d&apos;argent<br />
              <span style={{ color:"#FBBF24" }}>national & international</span>
            </motion.h1>

            <motion.p initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5, delay:0.2 }}
              style={{ fontSize:"1.05rem", color:"rgba(255,255,255,0.65)", maxWidth:"520px", margin:"0 auto 40px", lineHeight:1.7 }}
            >
              Votre agence de confiance à Lomé pour envoyer et recevoir de l&apos;argent partout au Togo et dans le monde.
            </motion.p>

            <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.4, delay:0.3 }}
              style={{ display:"flex", gap:"24px", justifyContent:"center", flexWrap:"wrap" }}
            >
              {[{ Icon:Globe, label:"Couverture mondiale" }, { Icon:ShieldCheck, label:"100% sécurisé" }, { Icon:Clock, label:"Service rapide" }].map(({ Icon, label }) => (
                <div key={label} style={{ display:"flex", alignItems:"center", gap:"8px", background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.12)", padding:"8px 18px", borderRadius:"999px" }}>
                  <Icon size={14} color="#60C8FF" />
                  <span style={{ fontSize:"0.82rem", color:"rgba(255,255,255,0.8)", fontWeight:500 }}>{label}</span>
                </div>
              ))}
            </motion.div>
          </div>
          <div style={{ lineHeight:0 }}>
            <svg viewBox="0 0 1440 48" xmlns="http://www.w3.org/2000/svg" style={{ display:"block", width:"100%" }}>
              <path d="M0,24 C360,48 1080,0 1440,24 L1440,48 L0,48 Z" fill="#f8fafc" />
            </svg>
          </div>
        </div>

        {/* ── Transferts nationaux ──────────────────────────────────────── */}
        <div style={{ background:"#f8fafc", padding:"80px 5%" }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"48px", alignItems:"start", maxWidth:"1100px", margin:"0 auto" }} className="transfers-detail-grid">

            <div>
              <div style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"28px" }}>
                <div style={{ width:"48px", height:"48px", borderRadius:"12px", background:"var(--color-brand-light)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <MapPin size={22} color="var(--color-brand-primary)" />
                </div>
                <div>
                  <h2 style={{ fontSize:"1.5rem", fontWeight:700, color:"var(--color-text-heading)", margin:0 }}>Transferts Nationaux</h2>
                  <p style={{ fontSize:"0.85rem", color:"var(--color-text-muted)", margin:0 }}>Mobile Money au Togo</p>
                </div>
              </div>

              <p style={{ fontSize:"0.95rem", color:"var(--color-text-body)", lineHeight:1.75, marginBottom:"32px" }}>
                Rechargez votre compte Mobile Money ou transférez de l&apos;argent à vos proches au Togo via nos partenaires agréés. Service disponible en agence, rapide et sans frais cachés.
              </p>

              <div style={{ display:"flex", flexDirection:"column", gap:"16px" }}>
                {TRANSFER_NATIONAL.map((t) => (
                  <div key={t.name} style={{
                    background:"#fff", border:"1.5px solid #E2E8F0", borderRadius:"14px",
                    padding:"20px 24px", display:"flex", alignItems:"center", gap:"20px",
                    boxShadow:"0 2px 8px rgba(0,0,0,0.04)",
                  }}>
                    {t.logo ? (
                      <Image src={t.logo} alt={t.name} width={80} height={50} unoptimized
                        style={{ height:"40px", width:"auto", objectFit:"contain", flexShrink:0 }}
                      />
                    ) : (
                      <span style={{ fontSize:"1.1rem", fontWeight:800, color:"var(--color-brand-primary)", flexShrink:0 }}>{t.name}</span>
                    )}
                    <div>
                      <p style={{ fontSize:"0.95rem", fontWeight:700, color:"var(--color-text-heading)", margin:"0 0 2px" }}>{t.name}</p>
                      <p style={{ fontSize:"0.8rem", color:"var(--color-text-muted)", margin:0 }}>{t.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"28px" }}>
                <div style={{ width:"48px", height:"48px", borderRadius:"12px", background:"#FEF3C7", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <Globe size={22} color="#D97706" />
                </div>
                <div>
                  <h2 style={{ fontSize:"1.5rem", fontWeight:700, color:"var(--color-text-heading)", margin:0 }}>Transferts Internationaux</h2>
                  <p style={{ fontSize:"0.85rem", color:"var(--color-text-muted)", margin:0 }}>Vers le monde entier</p>
                </div>
              </div>

              <p style={{ fontSize:"0.95rem", color:"var(--color-text-body)", lineHeight:1.75, marginBottom:"32px" }}>
                Envoyez et recevez de l&apos;argent depuis et vers l&apos;Europe, les États-Unis et partout dans le monde grâce à nos partenaires internationaux de confiance.
              </p>

              <div style={{ display:"flex", flexDirection:"column", gap:"16px" }}>
                {TRANSFER_INTERNATIONAL.map((t) => (
                  <div key={t.name} style={{
                    background:"#fff", border:"1.5px solid #E2E8F0", borderRadius:"14px",
                    padding:"20px 24px", display:"flex", alignItems:"center", gap:"20px",
                    boxShadow:"0 2px 8px rgba(0,0,0,0.04)",
                  }}>
                    <Image src={t.logo} alt={t.name} width={100} height={50} unoptimized
                      style={{ height:"36px", width:"auto", objectFit:"contain", flexShrink:0 }}
                    />
                    <div>
                      <p style={{ fontSize:"0.95rem", fontWeight:700, color:"var(--color-text-heading)", margin:"0 0 2px" }}>{t.name}</p>
                      <p style={{ fontSize:"0.8rem", color:"var(--color-text-muted)", margin:0 }}>{t.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Comment ça marche ─────────────────────────────────────────── */}
        <div style={{ background:"#fff", padding:"80px 5%" }}>
          <h2 style={{ fontSize:"clamp(1.6rem,3vw,2.2rem)", fontWeight:700, color:"var(--color-text-heading)", textAlign:"center", margin:"0 0 48px" }}>
            Comment effectuer un transfert ?
          </h2>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"24px", maxWidth:"900px", margin:"0 auto" }} className="steps-detail-grid">
            {TRANSFER_STEPS.map((s, i) => (
              <motion.div key={s.step}
                initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }} transition={{ duration:0.5, delay:i*0.1 }}
                style={{
                  background:"#f8fafc", borderRadius:"20px", padding:"36px 28px",
                  borderTop:"4px solid var(--color-brand-primary)",
                  position:"relative", overflow:"hidden",
                }}
              >
                <span style={{ position:"absolute", bottom:"-10px", right:"16px", fontSize:"6rem", fontWeight:900, color:"rgba(30,159,232,0.06)", lineHeight:1 }}>0{s.step}</span>
                <div style={{ width:"44px", height:"44px", borderRadius:"12px", background:"var(--color-brand-light)", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:"16px" }}>
                  <Banknote size={20} color="var(--color-brand-primary)" />
                </div>
                <p style={{ fontSize:"0.95rem", fontWeight:700, color:"var(--color-text-heading)", margin:"0 0 8px" }}>{s.title}</p>
                <p style={{ fontSize:"0.85rem", color:"var(--color-text-body)", lineHeight:1.7, margin:0 }}>{s.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── CTA ───────────────────────────────────────────────────────── */}
        <div style={{ background:"linear-gradient(135deg,#1A3A8F,#1E9FE8)", padding:"72px 5%", textAlign:"center" }}>
          <p style={{ fontSize:"clamp(1.4rem,3vw,2rem)", fontWeight:700, color:"#fff", margin:"0 0 12px" }}>
            Besoin d&apos;effectuer un transfert ?
          </p>
          <p style={{ fontSize:"1rem", color:"rgba(255,255,255,0.8)", margin:"0 0 32px" }}>
            Venez nous rendre visite à notre agence à Lomé ou contactez-nous.
          </p>
          <Link href="/contact" style={{
            display:"inline-flex", alignItems:"center", gap:"10px",
            background:"#fff", color:"#1A3A8F", fontWeight:800, fontSize:"1rem",
            padding:"15px 36px", borderRadius:"12px", textDecoration:"none",
            boxShadow:"0 8px 32px rgba(0,0,0,0.2)",
          }}>
            Nous contacter <ArrowRight size={18} />
          </Link>
        </div>

      </main>
      <Footer />
    </>
  )
}
