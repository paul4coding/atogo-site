"use client"

import { useState, useEffect, useRef } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { motion, AnimatePresence } from "framer-motion"
import {
  MapPin, Mail, Phone, Send, CheckCircle, Clock,
  MessageSquare, ChevronDown, ChevronUp, Shield,
  Users, Star, Building2, ArrowRight, Zap,
} from "lucide-react"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import SuccessAnimation from "@/components/ui/SuccessAnimation"
import type { ContactFormData } from "@/types"

const schema = z.object({
  name:    z.string().min(2, "Nom requis"),
  email:   z.string().email({ message: "Email invalide" }),
  phone:   z.string().optional(),
  service: z.string().min(1, "Sélectionnez un service"),
  message: z.string().min(10, "Message trop court (min. 10 caractères)"),
})

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
  { q: "Quels sont vos horaires ?",        a: "Nous sommes disponibles du lundi au samedi, de 8h à 18h. Pour les urgences, contactez-nous par email." },
  { q: "Combien de temps pour une réponse ?", a: "Nous nous engageons à répondre à toute demande sous 24h ouvrées, généralement bien plus vite." },
  { q: "Où êtes-vous situés ?",             a: "Notre agence est basée à Ago BKS1, Immeuble D&D, Boulevard Faure GNASSINGBE, 08BP8535, Lomé-TOGO. Nous intervenons également à distance pour toute l'Afrique de l'Ouest." },
  { q: "Proposez-vous des devis gratuits ?", a: "Oui, tous nos devis sont gratuits et sans engagement. Décrivez votre projet et nous vous revenons avec une proposition adaptée." },
]

const inputBase: React.CSSProperties = {
  width: "100%", padding: "13px 16px",
  borderRadius: "12px", border: "1.5px solid #E2E8F0",
  fontSize: "0.9rem", color: "#0F172A",
  background: "#F8FAFC", outline: "none",
  transition: "border-color 0.2s, box-shadow 0.2s, background 0.2s",
  boxSizing: "border-box", fontFamily: "inherit",
}

function InputField({ children }: { children: React.ReactNode }) {
  return <div style={{ display:"flex", flexDirection:"column", gap:"6px" }}>{children}</div>
}

function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label style={{ fontSize:"0.75rem", fontWeight:700, color:"#475569", letterSpacing:"0.04em", textTransform:"uppercase" }}>
      {children}{required && <span style={{ color:"#EF4444", marginLeft:"3px" }}>*</span>}
    </label>
  )
}

export default function ContactPage() {
  const [sent, setSent]       = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [msgLen, setMsgLen]   = useState(0)
  const h1Ref = useRef<HTMLHeadingElement>(null)

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset, watch } =
    useForm<ContactFormData>({ resolver: zodResolver(schema) })

  const msgValue = watch("message", "")
  useEffect(() => { setMsgLen(msgValue?.length ?? 0) }, [msgValue])

  useEffect(() => {
    if (!h1Ref.current) return
    import("animejs").then(({ animate, stagger, splitText }) => {
      if (!h1Ref.current) return
      const { chars } = splitText(h1Ref.current, { words: false, chars: true })
      animate(chars, {
        y:       [{ to: "-2.5rem", ease:"outExpo", duration:500 }, { to:0, ease:"outBounce", duration:700, delay:100 }],
        rotate:  { from: "-0.5turn", delay: 0 },
        opacity: { from: 0, to: 1, duration: 80 },
        delay:   stagger(40),
        ease:    "inOutCirc",
      })
    })
  }, [])

  const onSubmit = async (data: ContactFormData) => {
    const res = await fetch("/api/contact", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (res.ok) { handleSuccess(); reset() }
  }

  const [showSuccess, setShowSuccess] = useState(false)
  const handleSuccess = () => { setSent(true); setShowSuccess(true) }

  function focusStyle(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    e.target.style.borderColor = "#1E9FE8"
    e.target.style.boxShadow   = "0 0 0 4px rgba(30,159,232,0.08)"
    e.target.style.background  = "#fff"
  }
  function blurStyle(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    e.target.style.borderColor = "#E2E8F0"
    e.target.style.boxShadow   = "none"
    e.target.style.background  = "#F8FAFC"
  }

  return (
    <>
      <SuccessAnimation
        visible={showSuccess}
        title="Message envoyé !"
        subtitle="Notre équipe à Lomé vous répondra sous 24h ouvrées."
        onClose={() => setShowSuccess(false)}
      />
      <Navbar />
      <main>

        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <div style={{ background:"linear-gradient(160deg,#060D26 0%,#0F1E4A 45%,#1A3A8F 100%)", paddingTop:"68px", position:"relative", overflow:"hidden", minHeight:"380px" }}>
          <div style={{ position:"absolute", top:"-100px", right:"-80px", width:"560px", height:"560px", borderRadius:"50%", background:"radial-gradient(circle,rgba(30,159,232,0.12) 0%,transparent 65%)", animation:"float 7s ease-in-out infinite", pointerEvents:"none" }} />
          <div style={{ position:"absolute", bottom:"-60px", left:"-60px", width:"380px", height:"380px", borderRadius:"50%", background:"radial-gradient(circle,rgba(16,185,129,0.08) 0%,transparent 65%)", animation:"float 9s ease-in-out infinite reverse", pointerEvents:"none" }} />
          <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)", backgroundSize:"60px 60px", pointerEvents:"none" }} />

          <div style={{ padding:"80px 5% 72px", textAlign:"center", position:"relative", zIndex:1 }}>
            <motion.div initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.4 }} style={{ marginBottom:"22px" }}>
              <span style={{ display:"inline-flex", alignItems:"center", gap:"8px", fontSize:"11px", fontWeight:700, letterSpacing:"0.16em", textTransform:"uppercase", padding:"8px 20px", borderRadius:"999px", background:"rgba(30,159,232,0.12)", color:"#60C8FF", border:"1px solid rgba(30,159,232,0.25)", backdropFilter:"blur(8px)" }}>
                <span style={{ width:"6px", height:"6px", borderRadius:"50%", background:"#60C8FF", animation:"pulse 2s infinite" }} />
                On vous répond sous 24h
              </span>
            </motion.div>

            <h1 ref={h1Ref} style={{ fontSize:"clamp(2.4rem,5vw,3.8rem)", fontWeight:900, color:"#fff", margin:"0 0 20px", lineHeight:1.05, letterSpacing:"-0.02em", overflow:"visible" }}>
              Parlons de votre projet
            </h1>

            <motion.p initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5, delay:0.65 }}
              style={{ fontSize:"1.05rem", color:"rgba(255,255,255,0.6)", maxWidth:"500px", margin:"0 auto 40px", lineHeight:1.8 }}>
              Notre équipe à Lomé est là pour vous accompagner. Décrivez votre besoin, nous proposons la meilleure solution.
            </motion.p>

            <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.4, delay:0.8 }}
              style={{ display:"flex", gap:"14px", justifyContent:"center", flexWrap:"wrap" }}>
              {[
                { Icon:Clock,         label:"Réponse sous 24h"    },
                { Icon:CheckCircle,   label:"Devis gratuit"        },
                { Icon:MessageSquare, label:"Conseil personnalisé" },
              ].map(({ Icon, label }) => (
                <div key={label} style={{ display:"flex", alignItems:"center", gap:"8px", background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.1)", padding:"9px 20px", borderRadius:"999px", backdropFilter:"blur(8px)" }}>
                  <Icon size={14} color="#60C8FF" />
                  <span style={{ fontSize:"0.82rem", color:"rgba(255,255,255,0.8)", fontWeight:500 }}>{label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          <div style={{ lineHeight:0 }}>
            <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" style={{ display:"block", width:"100%" }}>
              <path d="M0,30 C480,60 960,0 1440,30 L1440,60 L0,60 Z" fill="#F1F5F9" />
            </svg>
          </div>
        </div>

        {/* ── Corps ─────────────────────────────────────────────────────── */}
        <div style={{ background:"#F1F5F9", padding:"72px 5% 80px" }}>
          <div style={{ maxWidth:"1200px", margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1.4fr", gap:"32px", alignItems:"start" }} className="contact-grid">

            {/* ── Colonne gauche ── */}
            <motion.div initial={{ opacity:0, x:-24 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.55 }}
              style={{ display:"flex", flexDirection:"column", gap:"16px" }}>

              {/* Card infos premium */}
              <div style={{ borderRadius:"22px", overflow:"hidden", boxShadow:"0 8px 48px rgba(15,30,74,0.18)" }}>
                <div style={{ background:"linear-gradient(135deg,#060D26 0%,#1A3A8F 100%)", padding:"32px 28px 28px", position:"relative", overflow:"hidden" }}>
                  <div style={{ position:"absolute", top:"-40px", right:"-40px", width:"180px", height:"180px", borderRadius:"50%", background:"rgba(30,159,232,0.1)", pointerEvents:"none" }} />
                  <p style={{ fontSize:"0.7rem", fontWeight:800, textTransform:"uppercase", letterSpacing:"0.16em", color:"rgba(255,255,255,0.4)", margin:"0 0 16px" }}>Nous trouver</p>
                  <div style={{ display:"flex", flexDirection:"column", gap:"16px" }}>
                    {[
                      { Icon:MapPin, title:"Adresse",  value:"Ago BKS1, Imm. D&D, Bvd Faure GNASSINGBE, 08BP8535, Lomé-TOGO" },
                      { Icon:Mail,   title:"Email",    value:"contact@arobase.tg" },
                      { Icon:Phone,  title:"Tél",      value:"+228 93 17 01 01" },
                      { Icon:Clock,  title:"Horaires", value:"Lun–Sam · 8h00–18h00" },
                    ].map(({ Icon, title, value }) => (
                      <div key={title} style={{ display:"flex", gap:"12px", alignItems:"center" }}>
                        <div style={{ width:"36px", height:"36px", borderRadius:"10px", background:"rgba(30,159,232,0.18)", border:"1px solid rgba(30,159,232,0.25)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                          <Icon size={15} color="#60C8FF" />
                        </div>
                        <div>
                          <p style={{ fontSize:"0.65rem", color:"rgba(255,255,255,0.4)", margin:0, textTransform:"uppercase", letterSpacing:"0.1em", fontWeight:600 }}>{title}</p>
                          <p style={{ fontSize:"0.88rem", color:"#fff", margin:0, fontWeight:500 }}>{value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Métriques de confiance */}
                <div style={{ background:"#fff", padding:"22px 28px", display:"grid", gridTemplateColumns:"1fr 1fr", gap:"16px", borderTop:"1px solid #E2E8F0" }}>
                  {[
                    { Icon:Users,     val:"50 000+", label:"Clients actifs",    color:"#1E9FE8" },
                    { Icon:Building2, val:"OSEOR",   label:"Filiale du groupe", color:"#10B981" },
                    { Icon:Star,      val:"5 ans",   label:"D'expérience",      color:"#F59E0B" },
                    { Icon:Zap,       val:"24h",     label:"Délai de réponse",  color:"#7C3AED" },
                  ].map(({ Icon, val, label, color }) => (
                    <div key={label} style={{ display:"flex", alignItems:"center", gap:"10px", padding:"10px 12px", borderRadius:"12px", background:"#F8FAFC", border:"1px solid #F1F5F9" }}>
                      <div style={{ width:"32px", height:"32px", borderRadius:"8px", background:`${color}12`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                        <Icon size={15} color={color} />
                      </div>
                      <div>
                        <p style={{ fontSize:"0.9rem", fontWeight:800, color:"#0F172A", margin:0, lineHeight:1 }}>{val}</p>
                        <p style={{ fontSize:"0.68rem", color:"#94A3B8", margin:0 }}>{label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Réseaux sociaux */}
              <div style={{ background:"#fff", borderRadius:"18px", padding:"22px 24px", border:"1px solid #E2E8F0", boxShadow:"0 2px 16px rgba(0,0,0,0.04)" }}>
                <p style={{ fontSize:"0.7rem", fontWeight:800, letterSpacing:"0.14em", textTransform:"uppercase", color:"#94A3B8", margin:"0 0 14px" }}>Suivez @TOGO</p>
                <div style={{ display:"flex", gap:"10px" }}>
                  {[
                    { label:"LinkedIn", letter:"in", color:"#0A66C2", bg:"#EEF2FF" },
                    { label:"Facebook", letter:"f",  color:"#1877F2", bg:"#EFF6FF" },
                    { label:"Twitter",  letter:"𝕏",  color:"#000",   bg:"#F1F5F9" },
                  ].map(s => (
                    <motion.a key={s.label} href="#" aria-label={s.label}
                      whileHover={{ y:-3 }} whileTap={{ scale:0.92 }}
                      style={{ flex:1, height:"44px", borderRadius:"12px", border:`1.5px solid #E2E8F0`, display:"flex", alignItems:"center", justifyContent:"center", gap:"6px", fontSize:"0.8rem", fontWeight:700, color:"#64748B", textDecoration:"none", transition:"all 0.2s", background:"#F8FAFC", cursor:"pointer" }}
                      onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background=s.bg; el.style.borderColor=s.color; el.style.color=s.color }}
                      onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background="#F8FAFC"; el.style.borderColor="#E2E8F0"; el.style.color="#64748B" }}
                    >
                      <span>{s.letter}</span>
                      <span style={{ fontSize:"0.72rem" }}>{s.label}</span>
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* ── Colonne droite : Formulaire ── */}
            <motion.div initial={{ opacity:0, x:24 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.55, delay:0.1 }}
              style={{ background:"#fff", borderRadius:"24px", overflow:"hidden", boxShadow:"0 8px 48px rgba(0,0,0,0.07)", border:"1px solid #E2E8F0" }}>

              {/* En-tête formulaire */}
              <div style={{ background:"linear-gradient(135deg,#0F1E4A 0%,#1A3A8F 100%)", padding:"28px 36px", position:"relative", overflow:"hidden" }}>
                <div style={{ position:"absolute", top:"-30px", right:"-30px", width:"160px", height:"160px", borderRadius:"50%", background:"rgba(255,255,255,0.04)", pointerEvents:"none" }} />
                <h2 style={{ fontSize:"1.25rem", fontWeight:800, color:"#fff", margin:"0 0 4px", letterSpacing:"-0.01em" }}>Envoyez-nous un message</h2>
                <p style={{ fontSize:"0.83rem", color:"rgba(255,255,255,0.5)", margin:0 }}>Les champs marqués * sont obligatoires · Réponse sous 24h</p>
              </div>

              <div style={{ padding:"36px" }}>
                <AnimatePresence mode="wait">
                  {sent ? (
                    <motion.div key="success"
                      initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0 }}
                      style={{ textAlign:"center", padding:"48px 16px" }}>
                      <motion.div animate={{ scale:[1,1.15,1] }} transition={{ duration:0.5, delay:0.1 }}
                        style={{ width:"80px", height:"80px", borderRadius:"24px", background:"linear-gradient(135deg,#ECFDF5,#D1FAE5)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 24px", boxShadow:"0 8px 32px rgba(16,185,129,0.2)" }}>
                        <CheckCircle size={38} color="#059669" />
                      </motion.div>
                      <h3 style={{ fontSize:"1.4rem", fontWeight:800, color:"#1A3A8F", margin:"0 0 10px" }}>Message envoyé !</h3>
                      <p style={{ fontSize:"0.9rem", color:"#64748B", margin:"0 0 32px", lineHeight:1.7 }}>
                        Merci pour votre message. Notre équipe vous répond sous 24h ouvrées.
                      </p>
                      <button onClick={() => setSent(false)}
                        style={{ display:"inline-flex", alignItems:"center", gap:"8px", padding:"12px 28px", borderRadius:"12px", border:"1.5px solid #E2E8F0", background:"#F8FAFC", cursor:"pointer", fontSize:"0.88rem", color:"#475569", fontWeight:600, transition:"all 0.2s", fontFamily:"inherit" }}
                        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background="#EFF6FF"; (e.currentTarget as HTMLButtonElement).style.borderColor="#1E9FE8"; (e.currentTarget as HTMLButtonElement).style.color="#1E9FE8" }}
                        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background="#F8FAFC"; (e.currentTarget as HTMLButtonElement).style.borderColor="#E2E8F0"; (e.currentTarget as HTMLButtonElement).style.color="#475569" }}>
                        <ArrowRight size={15}/> Envoyer un autre message
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div key="form" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}>
                      <form onSubmit={handleSubmit(onSubmit)} style={{ display:"flex", flexDirection:"column", gap:"18px" }}>

                        {/* Nom + Email */}
                        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"14px" }} className="contact-form-row">
                          <InputField>
                            <FieldLabel required>Nom complet</FieldLabel>
                            <input {...register("name")} placeholder="paul kossi" style={inputBase}
                              onFocus={focusStyle} onBlur={blurStyle} />
                            {errors.name && <p style={{ fontSize:"0.72rem", color:"#EF4444", margin:0 }}>{errors.name.message}</p>}
                          </InputField>
                          <InputField>
                            <FieldLabel required>Email</FieldLabel>
                            <input {...register("email")} type="email" placeholder="paulkossi@exemple.com" style={inputBase}
                              onFocus={focusStyle} onBlur={blurStyle} />
                            {errors.email && <p style={{ fontSize:"0.72rem", color:"#EF4444", margin:0 }}>{errors.email.message}</p>}
                          </InputField>
                        </div>

                        {/* Téléphone + Service */}
                        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"14px" }} className="contact-form-row">
                          <InputField>
                            <FieldLabel>Téléphone</FieldLabel>
                            <input {...register("phone")} placeholder="+228 XX XX XX XX" style={inputBase}
                              onFocus={focusStyle} onBlur={blurStyle} />
                          </InputField>
                          <InputField>
                            <FieldLabel required>Service concerné</FieldLabel>
                            <select {...register("service")} style={{ ...inputBase, color:"#64748B", cursor:"pointer" }}
                              onFocus={focusStyle} onBlur={blurStyle}>
                              <option value="">Choisir un service</option>
                              {SERVICES_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                            {errors.service && <p style={{ fontSize:"0.72rem", color:"#EF4444", margin:0 }}>{errors.service.message}</p>}
                          </InputField>
                        </div>

                        {/* Message */}
                        <InputField>
                          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                            <FieldLabel required>Votre message</FieldLabel>
                            <span style={{ fontSize:"0.7rem", color: msgLen > 10 ? "#10B981" : "#94A3B8", fontWeight:600 }}>{msgLen} car.</span>
                          </div>
                          <textarea {...register("message")} placeholder="Décrivez votre besoin en quelques lignes..." rows={5}
                            style={{ ...inputBase, resize:"none" }}
                            onFocus={focusStyle as unknown as React.FocusEventHandler<HTMLTextAreaElement>}
                            onBlur={blurStyle as unknown as React.FocusEventHandler<HTMLTextAreaElement>}
                          />
                          {errors.message && <p style={{ fontSize:"0.72rem", color:"#EF4444", margin:0 }}>{errors.message.message}</p>}
                        </InputField>

                        {/* Bouton */}
                        <motion.button type="submit" disabled={isSubmitting}
                          whileHover={!isSubmitting ? { y:-2, boxShadow:"0 16px 40px rgba(30,159,232,0.35)" } : {}}
                          whileTap={!isSubmitting ? { scale:0.98 } : {}}
                          style={{
                            display:"flex", alignItems:"center", justifyContent:"center", gap:"10px",
                            padding:"15px 32px", borderRadius:"14px", border:"none",
                            cursor: isSubmitting ? "not-allowed" : "pointer",
                            background: isSubmitting ? "#94A3B8" : "linear-gradient(135deg,#1A3A8F 0%,#1E9FE8 100%)",
                            color:"#fff", fontWeight:700, fontSize:"0.95rem", width:"100%",
                            boxShadow:"0 6px 24px rgba(30,159,232,0.28)",
                            transition:"background 0.2s", fontFamily:"inherit",
                          }}>
                          {isSubmitting
                            ? <><span style={{ width:"16px", height:"16px", borderRadius:"50%", border:"2px solid rgba(255,255,255,0.4)", borderTopColor:"#fff", animation:"spin 0.8s linear infinite", display:"inline-block" }}/> Envoi en cours...</>
                            : <><Send size={16}/> Envoyer le message</>
                          }
                        </motion.button>

                        {/* Badge sécurité */}
                        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"7px", padding:"10px 16px", borderRadius:"10px", background:"#F8FAFC", border:"1px solid #F1F5F9" }}>
                          <Shield size={13} color="#10B981" />
                          <p style={{ fontSize:"0.73rem", color:"#64748B", margin:0 }}>
                            Vos données sont confidentielles et ne seront jamais partagées
                          </p>
                        </div>

                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── FAQ ──────────────────────────────────────────────────────── */}
        <div style={{ background:"#fff", padding:"80px 5%" }}>
          <div style={{ maxWidth:"760px", margin:"0 auto" }}>
            <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.5 }}
              style={{ textAlign:"center", marginBottom:"52px" }}>
              <span style={{ display:"inline-block", fontSize:"10px", fontWeight:800, letterSpacing:"0.16em", textTransform:"uppercase", padding:"6px 16px", borderRadius:"999px", background:"#EFF6FF", color:"#1E9FE8", border:"1px solid #BFDBFE", marginBottom:"14px" }}>
                FAQ
              </span>
              <h2 style={{ fontSize:"clamp(1.7rem,3vw,2.4rem)", fontWeight:900, color:"#1A3A8F", margin:"0 0 12px", letterSpacing:"-0.02em" }}>
                Questions fréquentes
              </h2>
              <p style={{ fontSize:"1rem", color:"#64748B", margin:0, lineHeight:1.7 }}>Tout ce que vous devez savoir avant de nous contacter.</p>
            </motion.div>

            <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
              {FAQS.map((faq, i) => (
                <motion.div key={i}
                  initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }}
                  viewport={{ once:true }} transition={{ duration:0.4, delay:i*0.07 }}
                  style={{ borderRadius:"16px", border:`1.5px solid ${openFaq===i ? "#BFDBFE" : "#E2E8F0"}`, overflow:"hidden", background: openFaq===i ? "#F0F9FF" : "#fff", transition:"all 0.25s" }}>
                  <button onClick={() => setOpenFaq(openFaq===i ? null : i)} style={{
                    width:"100%", display:"flex", alignItems:"center", gap:"16px",
                    padding:"20px 24px", background:"transparent", border:"none", cursor:"pointer", textAlign:"left",
                  }}>
                    <span style={{ width:"28px", height:"28px", borderRadius:"8px", background: openFaq===i ? "#1E9FE8" : "#F1F5F9", color: openFaq===i ? "#fff" : "#94A3B8", fontSize:"11px", fontWeight:800, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, transition:"all 0.25s" }}>
                      {String(i+1).padStart(2,"0")}
                    </span>
                    <span style={{ flex:1, fontSize:"0.95rem", fontWeight:600, color: openFaq===i ? "#1A3A8F" : "#0F172A" }}>{faq.q}</span>
                    <div style={{ flexShrink:0, color: openFaq===i ? "#1E9FE8" : "#94A3B8", transition:"color 0.2s" }}>
                      {openFaq===i ? <ChevronUp size={18}/> : <ChevronDown size={18}/>}
                    </div>
                  </button>
                  <AnimatePresence>
                    {openFaq===i && (
                      <motion.div initial={{ height:0, opacity:0 }} animate={{ height:"auto", opacity:1 }} exit={{ height:0, opacity:0 }} transition={{ duration:0.25 }} style={{ overflow:"hidden" }}>
                        <p style={{ fontSize:"0.9rem", color:"#475569", lineHeight:1.8, margin:0, padding:"0 24px 20px 68px" }}>{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            {/* CTA bas de FAQ */}
            <motion.div initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.45, delay:0.3 }}
              style={{ marginTop:"40px", padding:"28px 32px", borderRadius:"20px", background:"linear-gradient(135deg,#0F1E4A,#1A3A8F)", display:"flex", justifyContent:"space-between", alignItems:"center", gap:"20px", flexWrap:"wrap" }}>
              <div>
                <p style={{ fontSize:"1rem", fontWeight:700, color:"#fff", margin:"0 0 4px" }}>Vous avez d&apos;autres questions ?</p>
                <p style={{ fontSize:"0.85rem", color:"rgba(255,255,255,0.55)", margin:0 }}>Notre équipe est disponible du lundi au samedi.</p>
              </div>
              <a href="mailto:contact@arobase.tg"
                style={{ display:"inline-flex", alignItems:"center", gap:"8px", padding:"12px 24px", borderRadius:"12px", background:"rgba(255,255,255,0.1)", color:"#fff", fontWeight:700, fontSize:"0.88rem", textDecoration:"none", border:"1px solid rgba(255,255,255,0.2)", transition:"background 0.2s", backdropFilter:"blur(8px)", cursor:"pointer" }}
                onMouseEnter={e => (e.currentTarget.style.background="rgba(30,159,232,0.3)")}
                onMouseLeave={e => (e.currentTarget.style.background="rgba(255,255,255,0.1)")}>
                <Mail size={15}/> contact@arobase.tg
              </a>
            </motion.div>
          </div>
        </div>

      </main>
      <Footer />
    </>
  )
}
