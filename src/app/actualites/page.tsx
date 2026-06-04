"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Newspaper, FileText, Calendar, Download, X,
  Loader2, Send, CheckCircle, Upload, Paperclip, ExternalLink,
} from "lucide-react"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import { createClient } from "@/lib/supabase/client"
import type { News, Tender } from "@/types/database"

type Tab = "actualites" | "appels-offres"

// ── Modal réponse appel d'offres ──────────────────────────────
function TenderResponseModal({ tender, onClose }: { tender: Tender; onClose: () => void }) {
  const [form, setForm] = useState({ company_name:"", contact_name:"", email:"", phone:"", message:"" })
  const [docFile, setDocFile] = useState<File | null>(null)
  const [status, setStatus] = useState<"idle"|"loading"|"success"|"error">("idle")
  const [errMsg, setErrMsg] = useState("")
  const fileRef = useRef<HTMLInputElement>(null)

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setStatus("loading")
    const fd = new FormData()
    fd.append("tender_id", tender.id)
    Object.entries(form).forEach(([k, v]) => fd.append(k, v))
    if (docFile) fd.append("document", docFile)

    const res = await fetch("/api/tender-response", { method:"POST", body:fd })
    if (res.ok) {
      setStatus("success")
    } else {
      const data = await res.json()
      setErrMsg(data.error ?? "Erreur inconnue")
      setStatus("error")
    }
  }

  return (
    <div style={{ position:"fixed", inset:0, zIndex:200, display:"flex", alignItems:"center", justifyContent:"center", padding:"16px" }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div style={{ position:"absolute", inset:0, background:"rgba(10,20,60,0.6)", backdropFilter:"blur(6px)" }} />
      <motion.div initial={{ opacity:0, scale:0.95, y:16 }} animate={{ opacity:1, scale:1, y:0 }} exit={{ opacity:0, scale:0.95 }}
        style={{ position:"relative", background:"#fff", borderRadius:"20px", width:"100%", maxWidth:"540px", boxShadow:"0 24px 80px rgba(0,0,0,0.18)", overflow:"hidden", maxHeight:"90vh", overflowY:"auto" }}>
        <div style={{ height:"5px", background:"#1A3A8F" }} />
        <div style={{ padding:"32px 32px 28px" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"24px" }}>
            <div>
              <span style={{ fontSize:"10px", fontWeight:800, textTransform:"uppercase", letterSpacing:"0.12em", padding:"4px 10px", borderRadius:"999px", background:"#EEF2FF", color:"#1A3A8F" }}>{tender.ref}</span>
              <h3 style={{ fontSize:"1.05rem", fontWeight:700, color:"var(--color-text-heading)", margin:"10px 0 2px" }}>Répondre à l&apos;appel d&apos;offres</h3>
              <p style={{ fontSize:"0.82rem", color:"var(--color-text-muted)", margin:0 }}>{tender.title}</p>
            </div>
            <button onClick={onClose} style={{ flexShrink:0, width:"34px", height:"34px", borderRadius:"8px", border:"1px solid #E2E8F0", background:"transparent", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color:"#94A3B8" }}><X size={15}/></button>
          </div>

          {status === "success" ? (
            <div style={{ textAlign:"center", padding:"32px 0 16px" }}>
              <CheckCircle size={48} color="#10B981" style={{ margin:"0 auto 16px", display:"block" }} />
              <p style={{ fontSize:"1rem", fontWeight:700, color:"var(--color-text-heading)", marginBottom:"8px" }}>Offre soumise !</p>
              <p style={{ fontSize:"0.85rem", color:"var(--color-text-body)", lineHeight:1.7, marginBottom:"24px" }}>Nous accusons réception de votre réponse et vous contacterons dans les meilleurs délais.</p>
              <button onClick={onClose} style={{ padding:"10px 24px", borderRadius:"10px", background:"#1A3A8F", color:"#fff", fontWeight:700, fontSize:"0.88rem", border:"none", cursor:"pointer" }}>Fermer</button>
            </div>
          ) : (
            <form onSubmit={submit} style={{ display:"flex", flexDirection:"column", gap:"14px" }}>
              <input required placeholder="Nom de la société *" value={form.company_name} onChange={set("company_name")}
                style={{ padding:"11px 14px", borderRadius:"10px", border:"1.5px solid #E2E8F0", fontSize:"0.88rem", fontFamily:"inherit", outline:"none" }} />
              <input required placeholder="Nom du contact *" value={form.contact_name} onChange={set("contact_name")}
                style={{ padding:"11px 14px", borderRadius:"10px", border:"1.5px solid #E2E8F0", fontSize:"0.88rem", fontFamily:"inherit", outline:"none" }} />
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px" }}>
                <input required type="email" placeholder="Email *" value={form.email} onChange={set("email")}
                  style={{ padding:"11px 14px", borderRadius:"10px", border:"1.5px solid #E2E8F0", fontSize:"0.88rem", fontFamily:"inherit", outline:"none" }} />
                <input type="tel" placeholder="Téléphone" value={form.phone} onChange={set("phone")}
                  style={{ padding:"11px 14px", borderRadius:"10px", border:"1.5px solid #E2E8F0", fontSize:"0.88rem", fontFamily:"inherit", outline:"none" }} />
              </div>
              <textarea placeholder="Message (optionnel)" value={form.message} onChange={set("message")} rows={3}
                style={{ padding:"11px 14px", borderRadius:"10px", border:"1.5px solid #E2E8F0", fontSize:"0.88rem", fontFamily:"inherit", outline:"none", resize:"vertical" }} />
              <div onClick={() => fileRef.current?.click()}
                style={{ display:"flex", alignItems:"center", gap:"10px", padding:"12px 14px", borderRadius:"10px", border:"1.5px dashed #CBD5E1", cursor:"pointer", background:"#F8FAFC" }}>
                <Upload size={16} color="#64748B" />
                <span style={{ fontSize:"0.85rem", color: docFile ? "#1A3A8F" : "#94A3B8" }}>
                  {docFile ? <><Paperclip size={13} style={{ display:"inline", marginRight:4 }}/>{docFile.name}</> : "Joindre votre proforma / devis (PDF recommandé)"}
                </span>
                <input ref={fileRef} type="file" accept=".pdf,.doc,.docx,.xls,.xlsx" style={{ display:"none" }} onChange={e => setDocFile(e.target.files?.[0] ?? null)} />
              </div>
              {status === "error" && <p style={{ fontSize:"0.82rem", color:"#DC2626", margin:0 }}>{errMsg}</p>}
              <button type="submit" disabled={status === "loading"}
                style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"8px", padding:"13px", borderRadius:"10px", background:"#1A3A8F", color:"#fff", fontWeight:700, fontSize:"0.9rem", border:"none", cursor: status === "loading" ? "not-allowed" : "pointer", opacity: status === "loading" ? 0.75 : 1 }}>
                {status === "loading" ? <><Loader2 size={16} style={{ animation:"spin 1s linear infinite" }}/> Envoi...</> : <><Send size={15}/> Soumettre mon offre</>}
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  )
}

// ── Card actualité — Featured (à la une) ─────────────────────
function FeaturedNewsCard({ item }: { item: News }) {
  const [expanded, setExpanded] = useState(false)
  const date = item.published_at
    ? new Date(item.published_at).toLocaleDateString("fr-FR", { day:"numeric", month:"long", year:"numeric" })
    : ""

  return (
    <motion.div initial={{ opacity:0, y:32 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6 }}
      style={{ borderRadius:"28px", overflow:"hidden", background:"#fff", boxShadow:"0 12px 64px rgba(15,30,74,0.13)", border:"1px solid #E2E8F0", cursor:"default" }}>

      {/* Image hero avec double overlay */}
      {item.image_url ? (
        <div style={{ height:"420px", position:"relative", overflow:"hidden" }}>
          <img src={item.image_url} alt={item.title}
            style={{ width:"100%", height:"100%", objectFit:"cover", transition:"transform 0.6s ease" }}
            onMouseEnter={e => (e.currentTarget.style.transform="scale(1.04)")}
            onMouseLeave={e => (e.currentTarget.style.transform="scale(1)")} />
          {/* Gradient overlay */}
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(180deg, rgba(6,13,38,0.1) 0%, rgba(6,13,38,0.15) 40%, rgba(6,13,38,0.75) 75%, rgba(6,13,38,0.92) 100%)" }} />

          {/* Badge + Titre overlay */}
          <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"32px 36px" }}>
            <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"14px" }}>
              <span style={{ fontSize:"9px", fontWeight:800, letterSpacing:"0.18em", textTransform:"uppercase", padding:"5px 14px", borderRadius:"999px", background:"rgba(30,159,232,0.85)", color:"#fff", backdropFilter:"blur(12px)", border:"1px solid rgba(30,159,232,0.5)" }}>
                À la une
              </span>
              {date && (
                <span style={{ display:"flex", alignItems:"center", gap:"5px", fontSize:"11px", color:"rgba(255,255,255,0.6)", fontWeight:500 }}>
                  <Calendar size={11}/>{date}
                </span>
              )}
            </div>
            <h2 style={{ fontSize:"clamp(1.4rem,2.5vw,1.9rem)", fontWeight:900, color:"#fff", margin:"0 0 10px", lineHeight:1.25, letterSpacing:"-0.01em", textShadow:"0 2px 16px rgba(0,0,0,0.3)" }}>
              {item.title}
            </h2>
            <p style={{ fontSize:"0.92rem", color:"rgba(255,255,255,0.7)", lineHeight:1.7, margin:0, maxWidth:"640px" }}>
              {item.excerpt}
            </p>
          </div>
        </div>
      ) : (
        <div style={{ background:"linear-gradient(135deg,#060D26,#1A3A8F)", padding:"48px 36px 36px", position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", top:"-40px", right:"-40px", width:"200px", height:"200px", borderRadius:"50%", background:"rgba(30,159,232,0.1)", pointerEvents:"none" }} />
          <span style={{ display:"inline-flex", alignItems:"center", gap:"6px", fontSize:"9px", fontWeight:800, letterSpacing:"0.18em", textTransform:"uppercase", padding:"5px 14px", borderRadius:"999px", background:"rgba(30,159,232,0.2)", color:"#60C8FF", border:"1px solid rgba(30,159,232,0.3)", marginBottom:"16px" }}>
            <span style={{ width:"5px", height:"5px", borderRadius:"50%", background:"#60C8FF", animation:"pulse 2s infinite" }} />
            À la une
          </span>
          {date && <p style={{ fontSize:"11px", color:"rgba(255,255,255,0.4)", marginBottom:"10px", display:"flex", alignItems:"center", gap:"5px" }}><Calendar size={11}/>{date}</p>}
          <h2 style={{ fontSize:"clamp(1.4rem,2.5vw,1.9rem)", fontWeight:900, color:"#fff", margin:"0 0 10px", lineHeight:1.25, letterSpacing:"-0.01em" }}>{item.title}</h2>
          <p style={{ fontSize:"0.92rem", color:"rgba(255,255,255,0.6)", lineHeight:1.7, margin:0 }}>{item.excerpt}</p>
        </div>
      )}

      {/* Contenu expandable */}
      {item.content && (
        <div style={{ padding:"24px 36px 28px", borderTop: item.image_url ? "none" : "1px solid #E2E8F0" }}>
          <AnimatePresence>
            {expanded && (
              <motion.div initial={{ height:0, opacity:0 }} animate={{ height:"auto", opacity:1 }} exit={{ height:0, opacity:0 }} transition={{ duration:0.3 }} style={{ overflow:"hidden" }}>
                <p style={{ fontSize:"0.92rem", color:"#475569", lineHeight:1.85, margin:"0 0 16px", paddingBottom:"16px", borderBottom:"1px solid #F1F5F9" }}>{item.content}</p>
              </motion.div>
            )}
          </AnimatePresence>
          <button onClick={() => setExpanded(!expanded)}
            style={{ display:"inline-flex", alignItems:"center", gap:"6px", fontSize:"0.85rem", color:"#1E9FE8", fontWeight:700, background:"none", border:"none", cursor:"pointer", padding:0, transition:"gap 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.gap="10px")}
            onMouseLeave={e => (e.currentTarget.style.gap="6px")}>
            {expanded ? "Réduire" : "Lire l'article complet"} {expanded ? "↑" : "→"}
          </button>
        </div>
      )}
    </motion.div>
  )
}

// ── Card actualité — Standard ─────────────────────────────────
function NewsCard({ item, idx }: { item: News; idx: number }) {
  const [expanded, setExpanded] = useState(false)
  const date = item.published_at
    ? new Date(item.published_at).toLocaleDateString("fr-FR", { day:"numeric", month:"short", year:"numeric" })
    : ""

  return (
    <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
      transition={{ duration:0.45, delay: idx * 0.06 }}
      style={{ background:"#fff", borderRadius:"22px", overflow:"hidden", border:"1.5px solid #E2E8F0", boxShadow:"0 2px 20px rgba(0,0,0,0.05)", display:"flex", flexDirection:"column", transition:"transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease", cursor:"default" }}
      onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform="translateY(-4px)"; el.style.boxShadow="0 16px 48px rgba(26,58,143,0.1)"; el.style.borderColor="#BFDBFE" }}
      onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform="translateY(0)"; el.style.boxShadow="0 2px 20px rgba(0,0,0,0.05)"; el.style.borderColor="#E2E8F0" }}>

      {/* Image ou accent bar */}
      {item.image_url ? (
        <div style={{ height:"180px", overflow:"hidden", position:"relative", flexShrink:0 }}>
          <img src={item.image_url} alt={item.title} style={{ width:"100%", height:"100%", objectFit:"cover", transition:"transform 0.4s" }}
            onMouseEnter={e => (e.currentTarget.style.transform="scale(1.05)")}
            onMouseLeave={e => (e.currentTarget.style.transform="scale(1)")} />
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(15,30,74,0.4) 0%, transparent 60%)" }} />
        </div>
      ) : (
        <div style={{ height:"5px", background:`linear-gradient(90deg, hsl(${(idx * 47) % 360}, 70%, 55%), hsl(${(idx * 47 + 60) % 360}, 70%, 65%))`, flexShrink:0 }} />
      )}

      <div style={{ padding:"20px 24px", flex:1, display:"flex", flexDirection:"column", gap:"8px" }}>
        {/* Date */}
        {date && (
          <p style={{ display:"flex", alignItems:"center", gap:"5px", fontSize:"0.7rem", color:"#94A3B8", margin:0, letterSpacing:"0.05em", textTransform:"uppercase", fontWeight:600 }}>
            <Calendar size={10}/>{date}
          </p>
        )}

        {/* Titre */}
        <h3 style={{ fontSize:"0.98rem", fontWeight:800, color:"#1A3A8F", margin:0, lineHeight:1.35, letterSpacing:"-0.01em", flex:1 }}>
          {item.title}
        </h3>

        {/* Excerpt */}
        <p style={{ fontSize:"0.84rem", color:"#64748B", lineHeight:1.7, margin:0 }}>
          {item.excerpt.length > 100 ? item.excerpt.slice(0, 100) + "…" : item.excerpt}
        </p>

        {/* Contenu expandable */}
        {item.content && (
          <>
            <AnimatePresence>
              {expanded && (
                <motion.p initial={{ height:0, opacity:0 }} animate={{ height:"auto", opacity:1 }} exit={{ height:0, opacity:0 }}
                  transition={{ duration:0.25 }}
                  style={{ fontSize:"0.84rem", color:"#475569", lineHeight:1.8, margin:"4px 0 0", paddingTop:"10px", borderTop:"1px solid #F1F5F9", overflow:"hidden" }}>
                  {item.content}
                </motion.p>
              )}
            </AnimatePresence>
            <button onClick={() => setExpanded(!expanded)}
              style={{ alignSelf:"flex-start", fontSize:"0.78rem", color:"#1E9FE8", fontWeight:700, background:"none", border:"none", cursor:"pointer", padding:0, marginTop:"4px" }}>
              {expanded ? "Réduire ↑" : "Lire la suite →"}
            </button>
          </>
        )}
      </div>
    </motion.div>
  )
}

// ── Card appel d'offres ───────────────────────────────────────
function TenderCard({ tender, idx, onRespond }: { tender: Tender; idx: number; onRespond: () => void }) {
  const isOpen = tender.deadline === "Ouvert" || tender.deadline === "ouvert"

  return (
    <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
      transition={{ duration:0.5, delay: idx * 0.06 }}
      style={{ background:"#fff", borderRadius:"24px", overflow:"hidden", boxShadow:"0 4px 28px rgba(0,0,0,0.06)", border:"1px solid #E2E8F0", display:"grid", gridTemplateColumns:"4px 1fr", transition:"box-shadow 0.25s, border-color 0.25s" }}
      onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.boxShadow="0 16px 56px rgba(26,58,143,0.1)"; el.style.borderColor="#BFDBFE" }}
      onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.boxShadow="0 4px 28px rgba(0,0,0,0.06)"; el.style.borderColor="#E2E8F0" }}>

      {/* Accent bar gauche */}
      <div style={{ background:"linear-gradient(180deg,#1A3A8F,#1E9FE8)", borderRadius:"0" }} />

      <div>
        {/* Header */}
        <div style={{ padding:"22px 28px 0", display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:"12px" }}>
          <div style={{ flex:1 }}>
            <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"10px", flexWrap:"wrap" }}>
              {/* Numéro */}
              <span style={{ width:"28px", height:"28px", borderRadius:"8px", background:"#EEF2FF", display:"inline-flex", alignItems:"center", justifyContent:"center", fontSize:"10px", fontWeight:800, color:"#1A3A8F", flexShrink:0 }}>
                {String(idx+1).padStart(2,"0")}
              </span>
              <span style={{ fontSize:"10px", fontWeight:800, letterSpacing:"0.14em", textTransform:"uppercase", padding:"5px 12px", borderRadius:"999px", background:"#F1F5F9", color:"#64748B", border:"1px solid #E2E8F0" }}>
                {tender.ref}
              </span>
            </div>
            <h3 style={{ fontSize:"1.08rem", fontWeight:800, color:"#1A3A8F", margin:0, lineHeight:1.3, letterSpacing:"-0.01em" }}>
              {tender.title}
            </h3>
          </div>

          {/* Statut */}
          <span style={{ flexShrink:0, display:"inline-flex", alignItems:"center", gap:"5px", fontSize:"11px", fontWeight:700, padding:"7px 14px", borderRadius:"999px", background: isOpen ? "#ECFDF5" : "#FFFBEB", color: isOpen ? "#059669" : "#D97706", border:`1px solid ${isOpen ? "#A7F3D0" : "#FDE68A"}` }}>
            <span style={{ width:"6px", height:"6px", borderRadius:"50%", background: isOpen ? "#10B981" : "#F59E0B", animation: isOpen ? "pulse 2s infinite" : "none" }} />
            {isOpen ? "Ouvert" : tender.deadline}
          </span>
        </div>

        {/* Séparateur */}
        <div style={{ margin:"16px 28px", height:"1px", background:"linear-gradient(90deg,#E2E8F0,transparent)" }} />

        <div style={{ padding:"0 28px 24px", display:"flex", flexDirection:"column", gap:"20px" }}>
          {/* Description */}
          <p style={{ fontSize:"0.88rem", color:"#475569", lineHeight:1.85, margin:0 }}>{tender.description}</p>

          {/* Zone document — design propre */}
          <div style={{ borderRadius:"16px", background: tender.document_url ? "linear-gradient(135deg,#EFF6FF,#DBEAFE)" : "#F8FAFC", border:`1px solid ${tender.document_url ? "#BFDBFE" : "#E2E8F0"}`, padding:"16px 20px", display:"flex", alignItems:"center", justifyContent:"space-between", gap:"16px", flexWrap:"wrap" }}>
            <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
              <div style={{ width:"44px", height:"44px", borderRadius:"12px", background: tender.document_url ? "#DBEAFE" : "#E2E8F0", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, boxShadow: tender.document_url ? "0 4px 12px rgba(30,159,232,0.15)" : "none" }}>
                <FileText size={20} color={tender.document_url ? "#1A3A8F" : "#CBD5E1"} />
              </div>
              <div>
                <p style={{ fontSize:"0.85rem", fontWeight:700, color: tender.document_url ? "#1A3A8F" : "#94A3B8", margin:"0 0 2px" }}>Cahier des charges</p>
                <p style={{ fontSize:"0.73rem", color: tender.document_url ? "#3B82F6" : "#94A3B8", margin:0, fontWeight:500 }}>
                  {tender.document_url ? "Document PDF disponible" : "Aucun document joint"}
                </p>
              </div>
            </div>
            {tender.document_url ? (
              <a href={tender.document_url} target="_blank" rel="noopener noreferrer"
                style={{ display:"inline-flex", alignItems:"center", gap:"7px", padding:"9px 18px", borderRadius:"10px", background:"#1A3A8F", color:"#fff", fontWeight:700, fontSize:"0.82rem", textDecoration:"none", boxShadow:"0 4px 16px rgba(26,58,143,0.2)", transition:"all 0.2s", flexShrink:0 }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background="#1E9FE8"; el.style.transform="translateY(-1px)" }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background="#1A3A8F"; el.style.transform="translateY(0)" }}>
                <Download size={13}/> Télécharger
              </a>
            ) : (
              <span style={{ fontSize:"0.75rem", color:"#CBD5E1", padding:"6px 12px", borderRadius:"8px", background:"#fff", border:"1px solid #E2E8F0" }}>Non disponible</span>
            )}
          </div>

          {/* CTA pleine largeur */}
          <button onClick={onRespond}
            style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"8px", padding:"14px", borderRadius:"14px", background:"linear-gradient(135deg,#1A3A8F 0%,#1E9FE8 100%)", color:"#fff", fontWeight:700, fontSize:"0.9rem", border:"none", cursor:"pointer", boxShadow:"0 6px 24px rgba(26,58,143,0.22)", fontFamily:"inherit", transition:"transform 0.2s, box-shadow 0.2s", letterSpacing:"0.01em" }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLButtonElement; el.style.transform="translateY(-1px)"; el.style.boxShadow="0 10px 32px rgba(26,58,143,0.3)" }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLButtonElement; el.style.transform="translateY(0)"; el.style.boxShadow="0 6px 24px rgba(26,58,143,0.22)" }}>
            <ExternalLink size={15}/> Répondre à cet appel d&apos;offres
          </button>
        </div>
      </div>
    </motion.div>
  )
}

// ── Page principale ───────────────────────────────────────────
export default function ActualitesPage() {
  const [tab, setTab] = useState<Tab>("actualites")
  const [news, setNews] = useState<News[]>([])
  const [tenders, setTenders] = useState<Tender[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedTender, setSelectedTender] = useState<Tender | null>(null)
  const h1Ref = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const supabase = createClient()
    Promise.all([
      supabase.from("news").select("*").eq("status","published").order("published_at",{ascending:false}),
      supabase.from("tenders").select("*").eq("status","published").order("created_at",{ascending:false}),
    ]).then(([{ data: n }, { data: t }]) => {
      setNews(n ?? [])
      setTenders(t ?? [])
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    if (!h1Ref.current) return
    import("animejs").then(({ animate, stagger, splitText }) => {
      if (!h1Ref.current) return
      const { chars } = splitText(h1Ref.current, { words: false, chars: true })
      animate(chars, {
        y: [
          { to: "-2.5rem", ease: "outExpo", duration: 500 },
          { to: 0, ease: "outBounce", duration: 700, delay: 100 },
        ],
        rotate: { from: "-0.5turn", delay: 0 },
        opacity: { from: 0, to: 1, duration: 80 },
        delay: stagger(40),
        ease: "inOutCirc",
      })
    })
  }, [])

  return (
    <>
      <Navbar />
      <AnimatePresence>
        {selectedTender && <TenderResponseModal tender={selectedTender} onClose={() => setSelectedTender(null)} />}
      </AnimatePresence>

      <main>
        {/* ── Hero ─────────────────────────────────────────────── */}
        <div style={{ background:"linear-gradient(160deg,#060D26 0%,#0F1E4A 45%,#1A3A8F 100%)", paddingTop:"68px", position:"relative", overflow:"hidden", minHeight:"360px" }}>
          {/* Orbes animés */}
          <div style={{ position:"absolute", top:"-120px", right:"-100px", width:"600px", height:"600px", borderRadius:"50%", background:"radial-gradient(circle,rgba(30,159,232,0.12) 0%,transparent 65%)", animation:"float 6s ease-in-out infinite", pointerEvents:"none" }} />
          <div style={{ position:"absolute", bottom:"-80px", left:"-80px", width:"400px", height:"400px", borderRadius:"50%", background:"radial-gradient(circle,rgba(16,185,129,0.08) 0%,transparent 65%)", animation:"float 8s ease-in-out infinite reverse", pointerEvents:"none" }} />
          <div style={{ position:"absolute", top:"30%", left:"20%", width:"200px", height:"200px", borderRadius:"50%", background:"radial-gradient(circle,rgba(30,159,232,0.06) 0%,transparent 70%)", animation:"float 5s ease-in-out infinite 2s", pointerEvents:"none" }} />

          {/* Grille décorative */}
          <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)", backgroundSize:"60px 60px", pointerEvents:"none" }} />

          <div style={{ padding:"80px 5% 72px", textAlign:"center", position:"relative", zIndex:1 }}>
            <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.45 }} style={{ marginBottom:"24px" }}>
              <span style={{ display:"inline-flex", alignItems:"center", gap:"8px", fontSize:"11px", fontWeight:700, letterSpacing:"0.16em", textTransform:"uppercase", padding:"8px 20px", borderRadius:"999px", background:"rgba(30,159,232,0.12)", color:"#60C8FF", border:"1px solid rgba(30,159,232,0.25)", backdropFilter:"blur(8px)" }}>
                <span style={{ width:"6px", height:"6px", borderRadius:"50%", background:"#60C8FF", animation:"pulse 2s infinite" }} />
                @TOGO — Lomé, Togo
              </span>
            </motion.div>

            <h1 ref={h1Ref} style={{ fontSize:"clamp(2.4rem,5vw,3.8rem)", fontWeight:900, color:"#fff", margin:"0 0 20px", lineHeight:1.05, letterSpacing:"-0.02em", overflow:"visible" }}>
              Actualités &amp; Appels d&apos;offres
            </h1>

            <motion.p initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5, delay:0.6 }}
              style={{ fontSize:"1.1rem", color:"rgba(255,255,255,0.6)", maxWidth:"540px", margin:"0 auto 40px", lineHeight:1.8 }}>
              Suivez nos dernières actualités et consultez nos appels d&apos;offres ouverts aux entreprises prestataires.
            </motion.p>

            {/* Stats rapides */}
            <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.4, delay:0.75 }}
              style={{ display:"flex", gap:"16px", justifyContent:"center", flexWrap:"wrap" }}>
              {[
                { val: loading ? "..." : `${news.length}`, label:"Actualités" },
                { val: loading ? "..." : `${tenders.length}`, label:"Appels d'offres" },
                { val: "Live", label:"Mis à jour" },
              ].map(({ val, label }) => (
                <div key={label} style={{ padding:"10px 20px", borderRadius:"12px", background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.1)", backdropFilter:"blur(8px)" }}>
                  <p style={{ fontSize:"1.2rem", fontWeight:800, color:"#fff", margin:0, lineHeight:1 }}>{val}</p>
                  <p style={{ fontSize:"0.7rem", color:"rgba(255,255,255,0.45)", margin:0, letterSpacing:"0.08em" }}>{label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          <div style={{ lineHeight:0 }}>
            <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" style={{ display:"block", width:"100%" }}>
              <path d="M0,30 C480,60 960,0 1440,30 L1440,60 L0,60 Z" fill="#ffffff" />
            </svg>
          </div>
        </div>

        {/* ── Tabs + Contenu ────────────────────────────────────── */}
        <div style={{ background:"#fff", padding:"64px 5% 80px" }}>
          {/* Tabs premium */}
          <div style={{ display:"flex", justifyContent:"center", marginBottom:"52px" }}>
            <div style={{ display:"inline-flex", background:"#fff", borderRadius:"18px", padding:"5px", boxShadow:"0 4px 28px rgba(0,0,0,0.08)", border:"1px solid #E2E8F0" }}>
              {([
                { key:"actualites",    Icon:Newspaper, label:"Actualités",      count: loading ? null : news.length },
                { key:"appels-offres", Icon:FileText,  label:"Appels d'offres", count: loading ? null : tenders.length },
              ] as const).map(t => (
                <button key={t.key} onClick={() => setTab(t.key)} style={{
                  display:"flex", alignItems:"center", gap:"10px", padding:"13px 26px", borderRadius:"14px",
                  border:"none", cursor:"pointer", fontFamily:"inherit", transition:"all 0.25s",
                  background: tab===t.key ? "linear-gradient(135deg,#1A3A8F 0%,#1E9FE8 100%)" : "transparent",
                  color: tab===t.key ? "#fff" : "#64748B",
                  boxShadow: tab===t.key ? "0 6px 24px rgba(30,159,232,0.28)" : "none",
                }}>
                  <t.Icon size={17}/>
                  <span style={{ fontSize:"0.875rem", fontWeight:700 }}>{t.label}</span>
                  {t.count !== null && (
                    <span style={{ fontSize:"10px", fontWeight:800, padding:"2px 8px", borderRadius:"999px",
                      background: tab===t.key ? "rgba(255,255,255,0.22)" : "#E2E8F0",
                      color: tab===t.key ? "#fff" : "#64748B" }}>
                      {t.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div style={{ maxWidth:"1100px", margin:"0 auto" }}>
            <AnimatePresence mode="wait">
              <motion.div key={tab} initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-10 }} transition={{ duration:0.28 }}>

                {/* ── Actualités ── */}
                {tab === "actualites" && (
                  loading ? (
                    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"20px" }}>
                      {[...Array(3)].map((_, i) => (
                        <div key={i} style={{ borderRadius:"22px", overflow:"hidden", background:"#F1F5F9", height: i===0 ? "480px" : "320px", gridColumn: i===0 ? "1/3" : "auto", animation:"pulse 1.5s ease-in-out infinite" }} />
                      ))}
                    </div>
                  ) : news.length === 0 ? (
                    <motion.div initial={{ opacity:0, scale:0.97 }} animate={{ opacity:1, scale:1 }} transition={{ duration:0.4 }}
                      style={{ textAlign:"center", padding:"80px 32px", background:"#F8FAFC", borderRadius:"28px", border:"2px dashed #E2E8F0" }}>
                      <div style={{ width:"80px", height:"80px", borderRadius:"24px", background:"linear-gradient(135deg,#EFF6FF,#E0F2FE)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 24px", boxShadow:"0 8px 32px rgba(30,159,232,0.1)" }}>
                        <Newspaper size={36} color="#93C5FD" />
                      </div>
                      <p style={{ fontSize:"1.2rem", fontWeight:800, color:"#1A3A8F", marginBottom:"8px", letterSpacing:"-0.01em" }}>Aucune actualité publiée</p>
                      <p style={{ fontSize:"0.9rem", color:"#94A3B8", lineHeight:1.7 }}>Revenez prochainement pour les dernières nouvelles de @TOGO.</p>
                    </motion.div>
                  ) : (
                    <div style={{ display:"flex", flexDirection:"column", gap:"24px" }}>
                      {/* Section header */}
                      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                        <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
                          <div style={{ width:"4px", height:"24px", borderRadius:"2px", background:"linear-gradient(#1A3A8F,#1E9FE8)" }} />
                          <p style={{ fontSize:"0.88rem", color:"#64748B", margin:0, fontWeight:500 }}>
                            <strong style={{ color:"#1A3A8F" }}>{news.length}</strong> article{news.length>1?"s":""} publiés
                          </p>
                        </div>
                        <span style={{ fontSize:"0.72rem", fontWeight:700, color:"#94A3B8", letterSpacing:"0.1em", textTransform:"uppercase" }}>
                          Trié par date
                        </span>
                      </div>

                      {/* Featured (à la une) */}
                      <FeaturedNewsCard item={news[0]} />

                      {/* Bento Grid pour les articles suivants */}
                      {news.length > 1 && (
                        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"20px" }}>
                          {news.slice(1).map((item, i) => (
                            <NewsCard key={item.id} item={item} idx={i+1} />
                          ))}
                        </div>
                      )}
                    </div>
                  )
                )}

                {/* ── Appels d'offres ── */}
                {tab === "appels-offres" && (
                  loading ? (
                    <div style={{ display:"flex", flexDirection:"column", gap:"16px" }}>
                      {[...Array(2)].map((_, i) => (
                        <div key={i} style={{ borderRadius:"24px", background:"#F1F5F9", height:"200px", animation:"pulse 1.5s ease-in-out infinite" }} />
                      ))}
                    </div>
                  ) : tenders.length === 0 ? (
                    <motion.div initial={{ opacity:0, scale:0.97 }} animate={{ opacity:1, scale:1 }} transition={{ duration:0.4 }}
                      style={{ textAlign:"center", padding:"80px 32px", background:"#F8FAFC", borderRadius:"28px", border:"2px dashed #E2E8F0" }}>
                      <div style={{ width:"80px", height:"80px", borderRadius:"24px", background:"linear-gradient(135deg,#EEF2FF,#DBEAFE)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 24px", boxShadow:"0 8px 32px rgba(30,159,232,0.1)" }}>
                        <FileText size={36} color="#93C5FD" />
                      </div>
                      <p style={{ fontSize:"1.2rem", fontWeight:800, color:"#1A3A8F", marginBottom:"8px", letterSpacing:"-0.01em" }}>Aucun appel d&apos;offres en cours</p>
                      <p style={{ fontSize:"0.9rem", color:"#94A3B8", lineHeight:1.7 }}>Les prochains appels d&apos;offres seront publiés ici.</p>
                    </motion.div>
                  ) : (
                    <div style={{ display:"flex", flexDirection:"column", gap:"16px" }}>
                      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"8px" }}>
                        <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
                          <div style={{ width:"4px", height:"24px", borderRadius:"2px", background:"linear-gradient(#1A3A8F,#1E9FE8)" }} />
                          <p style={{ fontSize:"0.88rem", color:"#64748B", margin:0, fontWeight:500 }}>
                            <strong style={{ color:"#1A3A8F" }}>{tenders.length}</strong> appel{tenders.length>1?"s":""} d&apos;offres ouvert{tenders.length>1?"s":""} · @TOGO
                          </p>
                        </div>
                        <span style={{ display:"inline-flex", alignItems:"center", gap:"5px", fontSize:"11px", fontWeight:700, padding:"5px 12px", borderRadius:"999px", background:"#ECFDF5", color:"#059669", border:"1px solid #A7F3D0" }}>
                          <span style={{ width:"5px", height:"5px", borderRadius:"50%", background:"#10B981", animation:"pulse 2s infinite" }} />
                          Soumissions ouvertes
                        </span>
                      </div>
                      {tenders.map((t, idx) => <TenderCard key={t.id} tender={t} idx={idx} onRespond={() => setSelectedTender(t)} />)}
                    </div>
                  )
                )}

              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
