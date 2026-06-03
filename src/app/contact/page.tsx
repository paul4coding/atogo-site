"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { motion, AnimatePresence } from "framer-motion"
import {
  MapPin, Mail, Phone, Send, CheckCircle,
  Clock, MessageSquare, ChevronDown, ChevronUp,
} from "lucide-react"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import type { ContactFormData } from "@/types"

const schema = z.object({
  name:    z.string().min(2, "Nom requis"),
  email:   z.string().email("Email invalide"),
  phone:   z.string().optional(),
  service: z.string().min(1, "Sélectionnez un service"),
  message: z.string().min(10, "Message trop court (min. 10 caractères)"),
})

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "14px 16px",
  borderRadius: "10px", border: "1.5px solid #E2E8F0",
  fontSize: "0.9rem", color: "#1A3A8F",
  background: "#fff", outline: "none",
  transition: "border-color 0.2s, box-shadow 0.2s",
  boxSizing: "border-box", fontFamily: "inherit",
}

const SERVICES_OPTIONS = [
  "Transferts d'argent (National)",
  "Transferts d'argent (International)",
  "Solutions Informatiques",
  "Vente de Téléphones",
  "Marketing Digital",
  "Cybersécurité",
  "Développement de Contenus",
  "Autre",
]

const FAQS = [
  { q: "Quels sont vos horaires ?", a: "Nous sommes disponibles du lundi au samedi, de 8h à 18h. Pour les urgences, contactez-nous par email." },
  { q: "Combien de temps pour une réponse ?", a: "Nous nous engageons à répondre à toute demande sous 24h ouvrées, généralement bien plus vite." },
  { q: "Où êtes-vous situés ?", a: "Notre agence est basée à Lomé, Togo — Quartier Administratif. Nous intervenons également à distance pour toute l'Afrique de l'Ouest." },
  { q: "Proposez-vous des devis gratuits ?", a: "Oui, tous nos devis sont gratuits et sans engagement. Décrivez votre projet et nous vous revenons avec une proposition adaptée." },
]

export default function ContactPage() {
  const [sent, setSent]       = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } =
    useForm<ContactFormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: ContactFormData) => {
    const res = await fetch("/api/contact", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (res.ok) { setSent(true); reset() }
  }

  return (
    <>
      <Navbar />
      <main>

        {/* ── Hero ────────────────────────────────────────────────────── */}
        <div style={{
          background: "linear-gradient(160deg, #0F1E4A 0%, #1A3A8F 60%, #0F1E4A 100%)",
          paddingTop: "68px", position: "relative", overflow: "hidden",
        }}>
          <div style={{ position:"absolute", top:"-80px", right:"-80px", width:"400px", height:"400px", borderRadius:"50%", background:"radial-gradient(circle,rgba(30,159,232,0.1) 0%,transparent 70%)", pointerEvents:"none" }} />
          <div style={{ position:"absolute", bottom:"-40px", left:"-40px", width:"300px", height:"300px", borderRadius:"50%", background:"radial-gradient(circle,rgba(16,185,129,0.06) 0%,transparent 70%)", pointerEvents:"none" }} />

          <div style={{ padding:"72px 5% 64px", textAlign:"center", position:"relative", zIndex:1 }}>
            <motion.span initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.4 }}
              style={{ display:"inline-block", fontSize:"11px", fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", padding:"7px 18px", borderRadius:"999px", background:"rgba(30,159,232,0.15)", color:"#60C8FF", border:"1px solid rgba(30,159,232,0.25)", marginBottom:"20px" }}
            >On vous répond sous 24h</motion.span>

            <motion.h1 initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.55, delay:0.1 }}
              style={{ fontSize:"clamp(2.2rem,4.5vw,3.5rem)", fontWeight:700, color:"#fff", margin:"0 0 16px", lineHeight:1.1 }}
            >
              Parlons de votre<br />
              <span style={{ background:"linear-gradient(135deg,#1E9FE8,#10B981)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
                projet ensemble
              </span>
            </motion.h1>

            <motion.p initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5, delay:0.2 }}
              style={{ fontSize:"1.05rem", color:"rgba(255,255,255,0.65)", maxWidth:"480px", margin:"0 auto 40px", lineHeight:1.7 }}
            >
              Notre équipe à Lomé est là pour vous accompagner. Décrivez votre besoin et nous vous proposons la meilleure solution.
            </motion.p>

            {/* 3 badges */}
            <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.4, delay:0.3 }}
              style={{ display:"flex", gap:"16px", justifyContent:"center", flexWrap:"wrap" }}
            >
              {[
                { Icon:Clock,          label:"Réponse sous 24h"   },
                { Icon:CheckCircle,    label:"Devis gratuit"       },
                { Icon:MessageSquare,  label:"Conseil personnalisé"},
              ].map(({ Icon, label }) => (
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

        {/* ── Corps : infos + formulaire ───────────────────────────────── */}
        <div style={{ background:"#f8fafc", padding:"72px 5%" }}>
          <div className="contact-grid">

            {/* Colonne gauche — infos */}
            <motion.div initial={{ opacity:0, x:-24 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.55 }}
              style={{ display:"flex", flexDirection:"column", gap:"20px" }}
            >
              {/* Card principale */}
              <div style={{ background:"linear-gradient(135deg,#1A3A8F,#1E9FE8)", borderRadius:"20px", padding:"40px 32px", color:"#fff" }}>
                <h2 style={{ fontSize:"1.25rem", fontWeight:700, margin:"0 0 8px" }}>Nous trouver</h2>
                <p style={{ fontSize:"0.88rem", opacity:0.75, margin:"0 0 32px", lineHeight:1.6 }}>
                  Venez nous rendre visite ou contactez-nous par les moyens ci-dessous.
                </p>
                <div style={{ display:"flex", flexDirection:"column", gap:"20px" }}>
                  {[
                    { Icon:MapPin, title:"Adresse",   value:"Lomé, Togo — Quartier Administratif" },
                    { Icon:Mail,   title:"Email",      value:"contact@atogo.tg"                    },
                    { Icon:Phone,  title:"Téléphone",  value:"+228 XX XX XX XX"                    },
                    { Icon:Clock,  title:"Horaires",   value:"Lun–Sam · 8h–18h"                   },
                  ].map(({ Icon, title, value }) => (
                    <div key={title} style={{ display:"flex", gap:"14px", alignItems:"flex-start" }}>
                      <div style={{ width:"38px", height:"38px", borderRadius:"10px", flexShrink:0, background:"rgba(255,255,255,0.15)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                        <Icon size={16} color="#fff" />
                      </div>
                      <div>
                        <p style={{ fontSize:"0.68rem", opacity:0.6, margin:"0 0 2px", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.08em" }}>{title}</p>
                        <p style={{ fontSize:"0.88rem", margin:0, fontWeight:500 }}>{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Réassurance */}
              <div style={{ background:"#fff", borderRadius:"16px", padding:"24px", border:"1.5px solid #E2E8F0" }}>
                <div style={{ display:"flex", alignItems:"center", gap:"14px" }}>
                  <div style={{ width:"44px", height:"44px", borderRadius:"12px", flexShrink:0, background:"#D1FAE5", display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <CheckCircle size={20} color="#0D7A4E" />
                  </div>
                  <div>
                    <p style={{ fontSize:"0.9rem", fontWeight:700, color:"var(--color-text-heading)", margin:"0 0 3px" }}>Devis 100% gratuit</p>
                    <p style={{ fontSize:"0.78rem", color:"var(--color-text-muted)", margin:0 }}>Sans engagement · Réponse sous 24h</p>
                  </div>
                </div>
              </div>

              {/* Réseaux sociaux */}
              <div style={{ background:"#fff", borderRadius:"16px", padding:"24px", border:"1.5px solid #E2E8F0" }}>
                <p style={{ fontSize:"0.75rem", fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:"var(--color-text-muted)", margin:"0 0 16px" }}>Suivez-nous</p>
                <div style={{ display:"flex", gap:"10px" }}>
                  {[
                    { label:"LinkedIn", icon:"in", color:"#0A66C2" },
                    { label:"Facebook", icon:"f",  color:"#1877F2" },
                    { label:"Twitter",  icon:"𝕏",  color:"#000000" },
                  ].map(s => (
                    <motion.a key={s.label} href="#" aria-label={s.label}
                      whileHover={{ scale:1.12, rotate:5 }} whileTap={{ scale:0.9 }}
                      style={{ width:"40px", height:"40px", borderRadius:"10px", border:"1.5px solid #E2E8F0", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"0.82rem", fontWeight:800, color:"#64748B", textDecoration:"none", transition:"border-color 0.2s" }}
                      onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = s.color; (e.currentTarget as HTMLAnchorElement).style.color = s.color }}
                      onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "#E2E8F0"; (e.currentTarget as HTMLAnchorElement).style.color = "#64748B" }}
                    >{s.icon}</motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Colonne droite — formulaire */}
            <motion.div initial={{ opacity:0, x:24 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.55, delay:0.1 }}
              style={{ background:"#fff", borderRadius:"20px", padding:"44px 40px", boxShadow:"0 4px 40px rgba(0,0,0,0.07)", border:"1.5px solid #E2E8F0" }}
            >
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div key="success"
                    initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0 }}
                    style={{ textAlign:"center", padding:"48px 0" }}
                  >
                    <motion.div animate={{ scale:[1,1.15,1] }} transition={{ duration:0.5 }}
                      style={{ width:"72px", height:"72px", borderRadius:"50%", background:"#D1FAE5", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 20px" }}
                    >
                      <CheckCircle size={34} color="#0D7A4E" />
                    </motion.div>
                    <h3 style={{ fontSize:"1.3rem", fontWeight:700, color:"var(--color-text-heading)", margin:"0 0 10px" }}>Message envoyé !</h3>
                    <p style={{ fontSize:"0.9rem", color:"var(--color-text-body)", margin:"0 0 28px", lineHeight:1.6 }}>
                      Merci pour votre message. Notre équipe vous répond sous 24h.
                    </p>
                    <button onClick={() => setSent(false)} style={{ padding:"11px 28px", borderRadius:"10px", border:"1.5px solid #E2E8F0", background:"transparent", cursor:"pointer", fontSize:"0.88rem", color:"var(--color-text-body)", transition:"background 0.2s" }}
                      onMouseEnter={e => (e.currentTarget.style.background="#f8fafc")}
                      onMouseLeave={e => (e.currentTarget.style.background="transparent")}
                    >Envoyer un autre message</button>
                  </motion.div>
                ) : (
                  <motion.div key="form" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}>
                    <h2 style={{ fontSize:"1.3rem", fontWeight:700, color:"var(--color-text-heading)", margin:"0 0 6px" }}>Envoyez-nous un message</h2>
                    <p style={{ fontSize:"0.85rem", color:"var(--color-text-muted)", margin:"0 0 28px" }}>Tous les champs marqués * sont obligatoires.</p>

                    <form onSubmit={handleSubmit(onSubmit)} style={{ display:"flex", flexDirection:"column", gap:"16px" }}>
                      <div className="contact-form-row" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"14px" }}>
                        <div>
                          <label style={{ fontSize:"0.75rem", fontWeight:700, color:"var(--color-text-heading)", display:"block", marginBottom:"6px" }}>Nom complet *</label>
                          <input {...register("name")} placeholder="Jean Dupont" style={inputStyle}
                            onFocus={e => { e.target.style.borderColor="#1E9FE8"; e.target.style.boxShadow="0 0 0 3px rgba(30,159,232,0.1)" }}
                            onBlur={e  => { e.target.style.borderColor="#E2E8F0"; e.target.style.boxShadow="none" }}
                          />
                          {errors.name && <p style={{ fontSize:"0.72rem", color:"#EF4444", margin:"4px 0 0" }}>{errors.name.message}</p>}
                        </div>
                        <div>
                          <label style={{ fontSize:"0.75rem", fontWeight:700, color:"var(--color-text-heading)", display:"block", marginBottom:"6px" }}>Email *</label>
                          <input {...register("email")} placeholder="jean@exemple.com" type="email" style={inputStyle}
                            onFocus={e => { e.target.style.borderColor="#1E9FE8"; e.target.style.boxShadow="0 0 0 3px rgba(30,159,232,0.1)" }}
                            onBlur={e  => { e.target.style.borderColor="#E2E8F0"; e.target.style.boxShadow="none" }}
                          />
                          {errors.email && <p style={{ fontSize:"0.72rem", color:"#EF4444", margin:"4px 0 0" }}>{errors.email.message}</p>}
                        </div>
                      </div>

                      <div className="contact-form-row" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"14px" }}>
                        <div>
                          <label style={{ fontSize:"0.75rem", fontWeight:700, color:"var(--color-text-heading)", display:"block", marginBottom:"6px" }}>Téléphone</label>
                          <input {...register("phone")} placeholder="+228 XX XX XX XX" style={inputStyle}
                            onFocus={e => { e.target.style.borderColor="#1E9FE8"; e.target.style.boxShadow="0 0 0 3px rgba(30,159,232,0.1)" }}
                            onBlur={e  => { e.target.style.borderColor="#E2E8F0"; e.target.style.boxShadow="none" }}
                          />
                        </div>
                        <div>
                          <label style={{ fontSize:"0.75rem", fontWeight:700, color:"var(--color-text-heading)", display:"block", marginBottom:"6px" }}>Service concerné *</label>
                          <select {...register("service")} style={{ ...inputStyle, color:"#64748B" }}
                            onFocus={e => { e.target.style.borderColor="#1E9FE8"; e.target.style.boxShadow="0 0 0 3px rgba(30,159,232,0.1)" }}
                            onBlur={e  => { e.target.style.borderColor="#E2E8F0"; e.target.style.boxShadow="none" }}
                          >
                            <option value="">Choisir un service</option>
                            {SERVICES_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                          </select>
                          {errors.service && <p style={{ fontSize:"0.72rem", color:"#EF4444", margin:"4px 0 0" }}>{errors.service.message}</p>}
                        </div>
                      </div>

                      <div>
                        <label style={{ fontSize:"0.75rem", fontWeight:700, color:"var(--color-text-heading)", display:"block", marginBottom:"6px" }}>Votre message *</label>
                        <textarea {...register("message")} placeholder="Décrivez votre besoin en quelques lignes..." rows={5}
                          style={{ ...inputStyle, resize:"none" }}
                          onFocus={e => { e.target.style.borderColor="#1E9FE8"; e.target.style.boxShadow="0 0 0 3px rgba(30,159,232,0.1)" }}
                          onBlur={e  => { e.target.style.borderColor="#E2E8F0"; e.target.style.boxShadow="none" }}
                        />
                        {errors.message && <p style={{ fontSize:"0.72rem", color:"#EF4444", margin:"4px 0 0" }}>{errors.message.message}</p>}
                      </div>

                      <button type="submit" disabled={isSubmitting} style={{
                        display:"flex", alignItems:"center", justifyContent:"center", gap:"10px",
                        padding:"15px 32px", borderRadius:"10px", border:"none", cursor: isSubmitting ? "not-allowed" : "pointer",
                        background: isSubmitting ? "#94A3B8" : "linear-gradient(135deg,#1A3A8F,#1E9FE8)",
                        color:"#fff", fontWeight:700, fontSize:"0.95rem", width:"100%",
                        boxShadow:"0 6px 24px rgba(30,159,232,0.3)", transition:"transform 0.2s, box-shadow 0.2s",
                      }}
                        onMouseEnter={e => { if (!isSubmitting) { (e.currentTarget as HTMLButtonElement).style.transform="translateY(-2px)"; (e.currentTarget as HTMLButtonElement).style.boxShadow="0 12px 32px rgba(30,159,232,0.4)" }}}
                        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform="translateY(0)"; (e.currentTarget as HTMLButtonElement).style.boxShadow="0 6px 24px rgba(30,159,232,0.3)" }}
                      >
                        {isSubmitting ? "Envoi en cours..." : <><Send size={16} /> Envoyer le message</>}
                      </button>

                      <p style={{ fontSize:"0.73rem", color:"var(--color-text-muted)", textAlign:"center", margin:0 }}>
                        🔒 Vos données sont confidentielles et ne seront jamais partagées.
                      </p>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>

        {/* ── FAQ ─────────────────────────────────────────────────────── */}
        <div style={{ background:"#fff", padding:"72px 5%" }}>
          <div style={{ maxWidth:"720px", margin:"0 auto" }}>
            <div style={{ textAlign:"center", marginBottom:"48px" }}>
              <h2 style={{ fontSize:"clamp(1.6rem,3vw,2.2rem)", fontWeight:700, color:"var(--color-text-heading)", margin:"0 0 12px" }}>
                Questions fréquentes
              </h2>
              <p style={{ fontSize:"1rem", color:"var(--color-text-body)", margin:0 }}>Tout ce que vous devez savoir avant de nous contacter.</p>
            </div>

            <div style={{ display:"flex", flexDirection:"column", gap:"12px" }}>
              {FAQS.map((faq, i) => (
                <motion.div key={i}
                  initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }}
                  viewport={{ once:true }} transition={{ duration:0.4, delay:i*0.08 }}
                  style={{ background:"#f8fafc", borderRadius:"14px", border:"1.5px solid #E2E8F0", overflow:"hidden" }}
                >
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{
                    width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between",
                    padding:"20px 24px", background:"transparent", border:"none", cursor:"pointer",
                    textAlign:"left",
                  }}>
                    <span style={{ fontSize:"0.95rem", fontWeight:600, color:"var(--color-text-heading)" }}>{faq.q}</span>
                    <div style={{ flexShrink:0, marginLeft:"16px", color:"var(--color-brand-primary)" }}>
                      {openFaq === i ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </div>
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height:0, opacity:0 }} animate={{ height:"auto", opacity:1 }} exit={{ height:0, opacity:0 }}
                        transition={{ duration:0.25 }}
                        style={{ overflow:"hidden" }}
                      >
                        <p style={{ fontSize:"0.88rem", color:"var(--color-text-body)", lineHeight:1.75, margin:0, padding:"0 24px 20px" }}>
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

      </main>
      <Footer />
    </>
  )
}
