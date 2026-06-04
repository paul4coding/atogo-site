"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Briefcase, FileText, MapPin, Clock, ChevronDown, ChevronUp,
  Send, Star, Users, Zap, X, Loader2, CheckCircle, Upload,
} from "lucide-react"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import { createClient } from "@/lib/supabase/client"
import type { JobOffer } from "@/types/database"

type Tab = "offres" | "spontanee"

// ── Modal candidature ─────────────────────────────────────────
type ModalOffer = { id: string; title: string; department: string; color: string } | null

function FileUploadField({ label, file, onPick, required, color }: {
  label: string; file: File|null; onPick: (f: File|null) => void; required?: boolean; color?: string
}) {
  const ref = useRef<HTMLInputElement>(null)
  const accent = color ?? "#1E9FE8"
  return (
    <div>
      <label style={{ fontSize:"0.78rem", fontWeight:700, color:"#475569", display:"block", marginBottom:"6px" }}>
        {label}{required && <span style={{ color:"#EF4444" }}> *</span>}
      </label>
      <div onClick={() => ref.current?.click()}
        style={{ display:"flex", alignItems:"center", gap:"10px", padding:"12px 14px", borderRadius:"10px", border:`1.5px ${file ? "solid #10B981" : "dashed #CBD5E1"}`, cursor:"pointer", background: file ? "#F0FDF4" : "#F8FAFC", transition:"all 0.2s" }}>
        {file ? <CheckCircle size={15} color="#10B981"/> : <Upload size={15} color="#94A3B8"/>}
        <span style={{ fontSize:"0.84rem", color: file ? "#10B981" : "#94A3B8", fontWeight: file ? 600 : 400, flex:1, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
          {file ? file.name : "Sélectionner un fichier (PDF, Word)"}
        </span>
        {file && (
          <button type="button" onClick={e => { e.stopPropagation(); if(ref.current) ref.current.value=""; onPick(null) }}
            style={{ background:"none", border:"none", cursor:"pointer", color:"#94A3B8", padding:0, display:"flex" }}><X size={13}/></button>
        )}
        <input ref={ref} type="file" accept=".pdf,.doc,.docx" style={{ display:"none" }} onChange={e => onPick(e.target.files?.[0] ?? null)} />
      </div>
    </div>
  )
}

function ApplyModal({ offer, onClose }: { offer: NonNullable<ModalOffer>; onClose: () => void }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "" })
  const [cvFile, setCvFile] = useState<File | null>(null)
  const [motivationFile, setMotivationFile] = useState<File | null>(null)
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errMsg, setErrMsg] = useState("")

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!cvFile) { setErrMsg("Le CV est obligatoire."); setStatus("error"); return }
    if (!motivationFile) { setErrMsg("La lettre de motivation est obligatoire."); setStatus("error"); return }
    setStatus("loading"); setErrMsg("")
    const fd = new FormData()
    fd.append("type", "application")
    fd.append("job_offer_id", offer.id)
    fd.append("name", form.name)
    fd.append("email", form.email)
    fd.append("phone", form.phone)
    fd.append("cover_letter", "")
    fd.append("cv", cvFile)
    fd.append("motivation", motivationFile)

    const res = await fetch("/api/apply", { method: "POST", body: fd })
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
        style={{ position:"relative", background:"#fff", borderRadius:"20px", width:"100%", maxWidth:"520px", boxShadow:"0 24px 80px rgba(0,0,0,0.18)", overflow:"hidden", maxHeight:"90vh", overflowY:"auto" }}>
        <div style={{ height:"5px", background: offer.color }} />
        <div style={{ padding:"32px 32px 28px" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"24px" }}>
            <div>
              <span style={{ fontSize:"10px", fontWeight:800, textTransform:"uppercase", letterSpacing:"0.12em", padding:"4px 10px", borderRadius:"999px", background:`${offer.color}18`, color:offer.color }}>Candidature</span>
              <h3 style={{ fontSize:"1.05rem", fontWeight:700, color:"var(--color-text-heading)", margin:"10px 0 2px" }}>{offer.title}</h3>
              <p style={{ fontSize:"0.82rem", color:"var(--color-text-muted)", margin:0 }}>{offer.department}</p>
            </div>
            <button onClick={onClose} style={{ flexShrink:0, width:"34px", height:"34px", borderRadius:"8px", border:"1px solid #E2E8F0", background:"transparent", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color:"#94A3B8" }}><X size={15}/></button>
          </div>

          {status === "success" ? (
            <div style={{ textAlign:"center", padding:"32px 0 16px" }}>
              <CheckCircle size={48} color="#10B981" style={{ margin:"0 auto 16px", display:"block" }} />
              <p style={{ fontSize:"1rem", fontWeight:700, color:"var(--color-text-heading)", marginBottom:"8px" }}>Candidature envoyée !</p>
              <p style={{ fontSize:"0.85rem", color:"var(--color-text-body)", lineHeight:1.7, marginBottom:"24px" }}>Nous avons bien reçu votre dossier et reviendrons vers vous sous 48h.</p>
              <button onClick={onClose} style={{ padding:"10px 24px", borderRadius:"10px", background:offer.color, color:"#fff", fontWeight:700, fontSize:"0.88rem", border:"none", cursor:"pointer" }}>Fermer</button>
            </div>
          ) : (
            <form onSubmit={submit} style={{ display:"flex", flexDirection:"column", gap:"14px" }}>
              <input required placeholder="Nom complet *" value={form.name} onChange={set("name")}
                style={{ padding:"11px 14px", borderRadius:"10px", border:"1.5px solid #E2E8F0", fontSize:"0.88rem", fontFamily:"inherit", outline:"none" }} />
              <input required type="email" placeholder="Email *" value={form.email} onChange={set("email")}
                style={{ padding:"11px 14px", borderRadius:"10px", border:"1.5px solid #E2E8F0", fontSize:"0.88rem", fontFamily:"inherit", outline:"none" }} />
              <input type="tel" placeholder="Téléphone" value={form.phone} onChange={set("phone")}
                style={{ padding:"11px 14px", borderRadius:"10px", border:"1.5px solid #E2E8F0", fontSize:"0.88rem", fontFamily:"inherit", outline:"none" }} />

              <div style={{ height:"1px", background:"#F1F5F9", margin:"2px 0" }} />
              <p style={{ fontSize:"0.78rem", fontWeight:700, color:"#64748B", margin:0, textTransform:"uppercase", letterSpacing:"0.08em" }}>Documents obligatoires</p>

              <FileUploadField label="Curriculum Vitae (CV)" file={cvFile} onPick={setCvFile} required color={offer.color} />
              <FileUploadField label="Lettre de motivation" file={motivationFile} onPick={setMotivationFile} required color={offer.color} />

              {status === "error" && <p style={{ fontSize:"0.82rem", color:"#DC2626", margin:0 }}>{errMsg}</p>}
              <button type="submit" disabled={status === "loading"}
                style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"8px", padding:"13px", borderRadius:"10px", background:offer.color, color:"#fff", fontWeight:700, fontSize:"0.9rem", border:"none", cursor: status === "loading" ? "not-allowed" : "pointer", opacity: status === "loading" ? 0.75 : 1 }}>
                {status === "loading" ? <><Loader2 size={16} style={{ animation:"spin 1s linear infinite" }}/> Envoi...</> : <><Send size={15}/> Envoyer ma candidature</>}
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  )
}

// ── Modal candidature spontanée ───────────────────────────────
function SpontaneousModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "" })
  const [cvFile, setCvFile] = useState<File | null>(null)
  const [motivationFile, setMotivationFile] = useState<File | null>(null)
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errMsg, setErrMsg] = useState("")
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!cvFile) { setErrMsg("Le CV est obligatoire."); setStatus("error"); return }
    if (!motivationFile) { setErrMsg("La lettre de motivation est obligatoire."); setStatus("error"); return }
    setStatus("loading"); setErrMsg("")
    const fd = new FormData()
    fd.append("type", "spontaneous")
    fd.append("name", form.name)
    fd.append("email", form.email)
    fd.append("phone", form.phone)
    fd.append("cover_letter", "")
    fd.append("cv", cvFile)
    fd.append("motivation", motivationFile)

    const res = await fetch("/api/apply", { method: "POST", body: fd })
    if (res.ok) { setStatus("success") }
    else { const data = await res.json(); setErrMsg(data.error ?? "Erreur inconnue"); setStatus("error") }
  }

  return (
    <div style={{ position:"fixed", inset:0, zIndex:200, display:"flex", alignItems:"center", justifyContent:"center", padding:"16px" }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div style={{ position:"absolute", inset:0, background:"rgba(10,20,60,0.6)", backdropFilter:"blur(6px)" }} />
      <motion.div initial={{ opacity:0, scale:0.95, y:16 }} animate={{ opacity:1, scale:1, y:0 }} exit={{ opacity:0, scale:0.95 }}
        style={{ position:"relative", background:"#fff", borderRadius:"20px", width:"100%", maxWidth:"520px", boxShadow:"0 24px 80px rgba(0,0,0,0.18)", overflow:"hidden", maxHeight:"90vh", overflowY:"auto" }}>
        <div style={{ height:"5px", background:"linear-gradient(135deg,#1A3A8F,#1E9FE8)" }} />
        <div style={{ padding:"32px 32px 28px" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"24px" }}>
            <div>
              <span style={{ fontSize:"10px", fontWeight:800, textTransform:"uppercase", letterSpacing:"0.12em", padding:"4px 10px", borderRadius:"999px", background:"#E3F4FD", color:"#1A3A8F" }}>Candidature spontanée</span>
              <h3 style={{ fontSize:"1.05rem", fontWeight:700, color:"var(--color-text-heading)", margin:"10px 0 2px" }}>Rejoindre @TOGO</h3>
              <p style={{ fontSize:"0.82rem", color:"var(--color-text-muted)", margin:0 }}>CV + lettre de motivation requis</p>
            </div>
            <button onClick={onClose} style={{ flexShrink:0, width:"34px", height:"34px", borderRadius:"8px", border:"1px solid #E2E8F0", background:"transparent", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color:"#94A3B8" }}><X size={15}/></button>
          </div>

          {status === "success" ? (
            <div style={{ textAlign:"center", padding:"32px 0 16px" }}>
              <CheckCircle size={48} color="#10B981" style={{ margin:"0 auto 16px", display:"block" }} />
              <p style={{ fontSize:"1rem", fontWeight:700, color:"var(--color-text-heading)", marginBottom:"8px" }}>Dossier reçu !</p>
              <p style={{ fontSize:"0.85rem", color:"var(--color-text-body)", lineHeight:1.7, marginBottom:"24px" }}>Nous conservons votre profil et vous contacterons si une opportunité se présente.</p>
              <button onClick={onClose} style={{ padding:"10px 24px", borderRadius:"10px", background:"#1A3A8F", color:"#fff", fontWeight:700, fontSize:"0.88rem", border:"none", cursor:"pointer" }}>Fermer</button>
            </div>
          ) : (
            <form onSubmit={submit} style={{ display:"flex", flexDirection:"column", gap:"14px" }}>
              <input required placeholder="Nom complet *" value={form.name} onChange={set("name")}
                style={{ padding:"11px 14px", borderRadius:"10px", border:"1.5px solid #E2E8F0", fontSize:"0.88rem", fontFamily:"inherit", outline:"none" }} />
              <input required type="email" placeholder="Email *" value={form.email} onChange={set("email")}
                style={{ padding:"11px 14px", borderRadius:"10px", border:"1.5px solid #E2E8F0", fontSize:"0.88rem", fontFamily:"inherit", outline:"none" }} />
              <input type="tel" placeholder="Téléphone" value={form.phone} onChange={set("phone")}
                style={{ padding:"11px 14px", borderRadius:"10px", border:"1.5px solid #E2E8F0", fontSize:"0.88rem", fontFamily:"inherit", outline:"none" }} />

              <div style={{ height:"1px", background:"#F1F5F9", margin:"2px 0" }} />
              <p style={{ fontSize:"0.78rem", fontWeight:700, color:"#64748B", margin:0, textTransform:"uppercase", letterSpacing:"0.08em" }}>Documents obligatoires</p>

              <FileUploadField label="Curriculum Vitae (CV)" file={cvFile} onPick={setCvFile} required />
              <FileUploadField label="Lettre de motivation" file={motivationFile} onPick={setMotivationFile} required />

              {status === "error" && <p style={{ fontSize:"0.82rem", color:"#DC2626", margin:0 }}>{errMsg}</p>}

              <div style={{ display:"flex", alignItems:"center", gap:"8px", padding:"10px 12px", borderRadius:"8px", background:"#FFFBEB", border:"1px solid #FDE68A" }}>
                <span style={{ fontSize:"0.78rem", color:"#92400E" }}>Les deux documents sont obligatoires pour soumettre votre dossier.</span>
              </div>

              <button type="submit" disabled={status === "loading"}
                style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"8px", padding:"13px", borderRadius:"10px", background:"linear-gradient(135deg,#1A3A8F,#1E9FE8)", color:"#fff", fontWeight:700, fontSize:"0.9rem", border:"none", cursor: status === "loading" ? "not-allowed" : "pointer", opacity: status === "loading" ? 0.75 : 1 }}>
                {status === "loading" ? <><Loader2 size={16} style={{ animation:"spin 1s linear infinite" }}/> Envoi...</> : <><Send size={15}/> Envoyer mon dossier</>}
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  )
}

// ── Card offre d'emploi ───────────────────────────────────────
const COLORS = ["#1E9FE8","#7C3AED","#10B981","#F59E0B","#EF4444","#0891B2"]

function JobCard({ offer, idx, onApply }: { offer: JobOffer; idx: number; onApply: () => void }) {
  const [open, setOpen] = useState(false)
  const color = COLORS[idx % COLORS.length]

  return (
    <motion.div initial={{ opacity:0, y:28 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
      transition={{ duration:0.5, delay: idx * 0.07 }}
      style={{ borderRadius:"20px", overflow:"hidden", background:"#fff",
        boxShadow: open ? `0 16px 56px rgba(0,0,0,0.1), 0 0 0 1.5px ${color}30` : "0 2px 24px rgba(0,0,0,0.06), 0 0 0 1.5px #E2E8F0",
        transition:"box-shadow 0.3s ease" }}>

      {/* Barre accent colorée */}
      <div style={{ height:"4px", background:`linear-gradient(90deg, ${color} 0%, ${color}66 100%)` }} />

      <div style={{ padding:"24px 28px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:"12px" }}>
          <div style={{ flex:1 }}>
            {/* Tags */}
            <div style={{ display:"flex", gap:"6px", marginBottom:"12px", flexWrap:"wrap", alignItems:"center" }}>
              <span style={{ fontSize:"10px", fontWeight:800, letterSpacing:"0.1em", textTransform:"uppercase", padding:"5px 12px", borderRadius:"999px", background:`${color}14`, color, border:`1px solid ${color}28` }}>
                {offer.contract_type}
              </span>
              <span style={{ fontSize:"10px", fontWeight:600, padding:"5px 12px", borderRadius:"999px", background:"#F1F5F9", color:"#64748B" }}>
                {offer.department}
              </span>
              <span style={{ display:"flex", alignItems:"center", gap:"4px", fontSize:"10px", color:"#94A3B8", padding:"5px 10px", borderRadius:"999px", background:"#F8FAFC", border:"1px solid #E2E8F0", marginLeft:"auto" }}>
                <MapPin size={10}/>{offer.location}
              </span>
            </div>
            {/* Titre */}
            <h3 style={{ fontSize:"1.1rem", fontWeight:700, color:"#0F172A", margin:"0 0 4px", lineHeight:1.3 }}>{offer.title}</h3>
            {!open && <p style={{ fontSize:"0.78rem", color:color, fontWeight:600, margin:"8px 0 0", cursor:"pointer" }} onClick={() => setOpen(true)}>Voir les détails & postuler →</p>}
          </div>

          <button onClick={() => setOpen(!open)}
            style={{ width:"40px", height:"40px", borderRadius:"12px", border:`1.5px solid ${open ? color : "#E2E8F0"}`,
              background: open ? `${color}12` : "#F8FAFC", cursor:"pointer", display:"flex", alignItems:"center",
              justifyContent:"center", color: open ? color : "#94A3B8", flexShrink:0, transition:"all 0.25s" }}>
            {open ? <ChevronUp size={17}/> : <ChevronDown size={17}/>}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ height:0, opacity:0 }} animate={{ height:"auto", opacity:1 }} exit={{ height:0, opacity:0 }}
            transition={{ duration:0.3 }} style={{ overflow:"hidden" }}>
            <div style={{ padding:"0 28px 28px" }}>
              <div style={{ height:"1px", background:`linear-gradient(90deg, ${color}30, transparent)`, marginBottom:"20px" }} />

              {/* Description */}
              <div style={{ background:`${color}07`, borderRadius:"14px", padding:"16px 20px", marginBottom:"20px", borderLeft:`3px solid ${color}` }}>
                <p style={{ fontSize:"0.88rem", color:"#475569", lineHeight:1.85, margin:0 }}>{offer.description}</p>
              </div>

              {/* Requirements grid */}
              {offer.requirements?.length > 0 && (
                <div style={{ marginBottom:"24px" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"12px" }}>
                    <div style={{ width:"20px", height:"3px", borderRadius:"2px", background:color }} />
                    <p style={{ fontSize:"0.7rem", fontWeight:800, textTransform:"uppercase", letterSpacing:"0.14em", color:"#94A3B8", margin:0 }}>Profil recherché</p>
                  </div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"8px" }}>
                    {offer.requirements.map(r => (
                      <div key={r} style={{ display:"flex", gap:"8px", alignItems:"flex-start", padding:"9px 12px", background:"#F8FAFC", borderRadius:"10px", border:"1px solid #F1F5F9" }}>
                        <div style={{ width:"5px", height:"5px", borderRadius:"50%", background:color, flexShrink:0, marginTop:"6px" }} />
                        <span style={{ fontSize:"0.82rem", color:"#475569", lineHeight:1.5 }}>{r}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button onClick={onApply}
                style={{ display:"inline-flex", alignItems:"center", gap:"8px", padding:"12px 28px", borderRadius:"12px",
                  background:`linear-gradient(135deg, ${color} 0%, ${color}bb 100%)`, color:"#fff", fontWeight:700,
                  fontSize:"0.88rem", border:"none", cursor:"pointer", boxShadow:`0 6px 24px ${color}40`, fontFamily:"inherit",
                  letterSpacing:"0.02em" }}>
                <Send size={14}/> Postuler à ce poste
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ── Page principale ───────────────────────────────────────────
export default function CarrierePage() {
  const [tab, setTab] = useState<Tab>("offres")
  const [offers, setOffers] = useState<JobOffer[]>([])
  const [domains, setDomains] = useState<{ id:string; label:string; color:string }[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOffer, setModalOffer] = useState<ModalOffer>(null)
  const [showSpontaneous, setShowSpontaneous] = useState(false)
  const h1Ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const supabase = createClient()
    Promise.all([
      supabase.from("job_offers").select("*").eq("status", "published").order("created_at", { ascending: false }),
      supabase.from("domains").select("id,label,color").eq("active", true).order("sort_order"),
    ]).then(([{ data: o }, { data: d }]) => {
      setOffers(o ?? [])
      setDomains(d ?? [])
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
          { to: "-2.75rem", ease: "outExpo", duration: 600 },
          { to: 0, ease: "outBounce", duration: 800, delay: 100 },
        ],
        rotate: { from: "-1turn", delay: 0 },
        opacity: { from: 0, to: 1, duration: 100 },
        delay: stagger(50),
        ease: "inOutCirc",
      })
    })
  }, [])

  return (
    <>
      <Navbar />
      <AnimatePresence>
        {modalOffer && <ApplyModal offer={modalOffer} onClose={() => setModalOffer(null)} />}
        {showSpontaneous && <SpontaneousModal onClose={() => setShowSpontaneous(false)} />}
      </AnimatePresence>

      <main>
        {/* ── Hero ─────────────────────────────────────────────── */}
        <div style={{ background:"linear-gradient(160deg,#060D26 0%,#0F1E4A 45%,#1A3A8F 100%)", paddingTop:"68px", position:"relative", overflow:"hidden", minHeight:"420px" }}>
          {/* Orbes animés */}
          <div style={{ position:"absolute", top:"-100px", right:"-120px", width:"600px", height:"600px", borderRadius:"50%", background:"radial-gradient(circle,rgba(30,159,232,0.13) 0%,transparent 65%)", animation:"float 7s ease-in-out infinite", pointerEvents:"none" }} />
          <div style={{ position:"absolute", bottom:"-60px", left:"-60px", width:"400px", height:"400px", borderRadius:"50%", background:"radial-gradient(circle,rgba(16,185,129,0.09) 0%,transparent 65%)", animation:"float 9s ease-in-out infinite reverse", pointerEvents:"none" }} />
          <div style={{ position:"absolute", top:"40%", right:"25%", width:"180px", height:"180px", borderRadius:"50%", background:"radial-gradient(circle,rgba(124,58,237,0.07) 0%,transparent 70%)", animation:"float 6s ease-in-out infinite 1s", pointerEvents:"none" }} />

          {/* Grille décorative */}
          <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)", backgroundSize:"60px 60px", pointerEvents:"none" }} />

          <div style={{ padding:"88px 5% 72px", textAlign:"center", position:"relative", zIndex:1 }}>
            <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.4 }} style={{ marginBottom:"28px" }}>
              <span style={{ display:"inline-flex", alignItems:"center", gap:"8px", fontSize:"11px", fontWeight:700, letterSpacing:"0.16em", textTransform:"uppercase", padding:"8px 20px", borderRadius:"999px", background:"rgba(30,159,232,0.12)", color:"#60C8FF", border:"1px solid rgba(30,159,232,0.25)", backdropFilter:"blur(8px)" }}>
                <span style={{ width:"6px", height:"6px", borderRadius:"50%", background:"#60C8FF", display:"inline-block" }} />
                Rejoignez @TOGO
              </span>
            </motion.div>

            <h1 style={{ fontSize:"clamp(2.4rem,5vw,3.9rem)", fontWeight:900, color:"#fff", margin:"0 0 20px", lineHeight:1.05, letterSpacing:"-0.02em", overflow:"visible" }}>
              <span ref={h1Ref} style={{ display:"block" }}>Construisons l&apos;avenir digital</span>
              <span style={{ background:"linear-gradient(135deg,#1E9FE8 0%,#10B981 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
                du Togo ensemble
              </span>
            </h1>

            <motion.p initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5, delay:0.7 }}
              style={{ fontSize:"1.1rem", color:"rgba(255,255,255,0.6)", maxWidth:"540px", margin:"0 auto 44px", lineHeight:1.8 }}>
              Offres d&apos;emploi, stages et candidatures spontanées — rejoignez une équipe engagée pour la transformation digitale de l&apos;Afrique.
            </motion.p>

            <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.4, delay:0.85 }}
              style={{ display:"flex", gap:"16px", justifyContent:"center", flexWrap:"wrap" }}>
              {[
                { Icon:Briefcase, val: loading ? "..." : `${offers.length}`, label:"Postes ouverts" },
                { Icon:Users,     val:"Lomé",                                label:"Basé au Togo"  },
                { Icon:Star,      val:"48h",                                 label:"Délai réponse" },
              ].map(({ Icon, val, label }) => (
                <div key={label} style={{ display:"flex", alignItems:"center", gap:"10px", background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.1)", padding:"12px 22px", borderRadius:"14px", backdropFilter:"blur(8px)" }}>
                  <Icon size={16} color="#60C8FF" />
                  <div style={{ textAlign:"left" }}>
                    <p style={{ fontSize:"1.1rem", fontWeight:800, color:"#fff", margin:0, lineHeight:1 }}>{val}</p>
                    <p style={{ fontSize:"0.7rem", color:"rgba(255,255,255,0.45)", margin:0, letterSpacing:"0.06em" }}>{label}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <div style={{ lineHeight:0 }}>
            <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" style={{ display:"block", width:"100%" }}>
              <path d="M0,30 C480,60 960,0 1440,30 L1440,60 L0,60 Z" fill="#f8fafc" />
            </svg>
          </div>
        </div>

        {/* ── Tabs + Contenu ────────────────────────────────────── */}
        <div style={{ background:"#F1F5F9", padding:"64px 5% 80px" }}>

          {/* Tabs premium */}
          <div style={{ display:"flex", justifyContent:"center", marginBottom:"52px" }}>
            <div style={{ display:"inline-flex", background:"#fff", borderRadius:"18px", padding:"5px", boxShadow:"0 4px 28px rgba(0,0,0,0.08)", border:"1px solid #E2E8F0" }}>
              {([
                { key:"offres",    Icon:Briefcase, label:"Offres d'emploi",       count: loading ? null : offers.length },
                { key:"spontanee", Icon:FileText,  label:"Candidature spontanée", count: null },
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

          <div style={{ maxWidth:"860px", margin:"0 auto" }}>
            <AnimatePresence mode="wait">
              <motion.div key={tab} initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-10 }} transition={{ duration:0.28 }}>

                {/* ── Offres d'emploi ── */}
                {tab === "offres" && (
                  <div>
                    {loading ? (
                      <div style={{ textAlign:"center", padding:"64px", color:"#94A3B8" }}>
                        <Loader2 size={32} style={{ animation:"spin 1s linear infinite", margin:"0 auto 16px", display:"block" }} />
                        <p style={{ fontSize:"0.9rem" }}>Chargement des offres...</p>
                      </div>
                    ) : offers.length === 0 ? (
                      <motion.div initial={{ opacity:0, scale:0.97 }} animate={{ opacity:1, scale:1 }} transition={{ duration:0.4 }}
                        style={{ textAlign:"center", padding:"72px 32px", background:"#fff", borderRadius:"24px", border:"2px dashed #E2E8F0", boxShadow:"0 2px 16px rgba(0,0,0,0.04)" }}>
                        <div style={{ width:"72px", height:"72px", borderRadius:"20px", background:"linear-gradient(135deg,#EFF6FF,#E0F2FE)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 20px" }}>
                          <Briefcase size={32} color="#93C5FD" />
                        </div>
                        <p style={{ fontSize:"1.1rem", fontWeight:700, color:"#1A3A8F", marginBottom:"8px" }}>Aucune offre publiée pour l&apos;instant</p>
                        <p style={{ fontSize:"0.88rem", color:"#94A3B8", marginBottom:"28px", lineHeight:1.7 }}>Revenez prochainement ou déposez une candidature spontanée.</p>
                        <button onClick={() => setTab("spontanee")}
                          style={{ padding:"12px 28px", borderRadius:"12px", background:"linear-gradient(135deg,#1A3A8F,#1E9FE8)", color:"#fff", fontWeight:700, fontSize:"0.9rem", border:"none", cursor:"pointer", boxShadow:"0 4px 20px rgba(30,159,232,0.28)" }}>
                          Candidature spontanée →
                        </button>
                      </motion.div>
                    ) : (
                      <div style={{ display:"flex", flexDirection:"column", gap:"16px" }}>
                        <div style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"4px" }}>
                          <div style={{ width:"3px", height:"20px", borderRadius:"2px", background:"linear-gradient(#1A3A8F,#1E9FE8)" }} />
                          <p style={{ fontSize:"0.85rem", color:"#64748B", margin:0, fontWeight:500 }}>
                            <strong style={{ color:"#1A3A8F" }}>{offers.length}</strong> poste{offers.length > 1 ? "s" : ""} ouvert{offers.length > 1 ? "s" : ""} · Lomé, Togo
                          </p>
                        </div>
                        {offers.map((offer, idx) => (
                          <JobCard key={offer.id} offer={offer} idx={idx}
                            onApply={() => setModalOffer({ id:offer.id, title:offer.title, department:offer.department, color:COLORS[idx % COLORS.length] })} />
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* ── Candidature spontanée ── */}
                {tab === "spontanee" && (
                  <div>
                    {/* Carte principale */}
                    <div style={{ background:"#fff", borderRadius:"24px", overflow:"hidden", boxShadow:"0 8px 48px rgba(0,0,0,0.08)", border:"1px solid #E2E8F0", marginBottom:"20px" }}>
                      {/* Header gradient */}
                      <div style={{ background:"linear-gradient(135deg,#0F1E4A 0%,#1A3A8F 60%,#1E9FE8 100%)", padding:"40px 44px 44px", position:"relative", overflow:"hidden" }}>
                        <div style={{ position:"absolute", top:"-40px", right:"-40px", width:"220px", height:"220px", borderRadius:"50%", background:"rgba(255,255,255,0.04)", pointerEvents:"none" }} />
                        <div style={{ position:"absolute", bottom:"-60px", left:"30%", width:"180px", height:"180px", borderRadius:"50%", background:"rgba(30,159,232,0.12)", pointerEvents:"none" }} />
                        <span style={{ display:"inline-flex", alignItems:"center", gap:"6px", fontSize:"10px", fontWeight:800, letterSpacing:"0.14em", textTransform:"uppercase", padding:"6px 14px", borderRadius:"999px", background:"rgba(255,255,255,0.12)", color:"rgba(255,255,255,0.8)", border:"1px solid rgba(255,255,255,0.18)", marginBottom:"16px" }}>
                          <span style={{ width:"5px", height:"5px", borderRadius:"50%", background:"#60C8FF" }} />
                          Candidature spontanée
                        </span>
                        <h2 style={{ fontSize:"clamp(1.5rem,2.8vw,2rem)", fontWeight:800, color:"#fff", margin:"0 0 10px", lineHeight:1.2, letterSpacing:"-0.01em" }}>
                          Votre profil nous intéresse,<br/>même sans offre publiée
                        </h2>
                        <p style={{ fontSize:"0.92rem", color:"rgba(255,255,255,0.65)", lineHeight:1.75, margin:0, maxWidth:"480px" }}>
                          Envoyez votre CV et lettre de motivation. Nous conservons tous les profils et vous contactons dès qu&apos;une opportunité correspond.
                        </p>
                      </div>

                      {/* Corps */}
                      <div style={{ padding:"36px 44px" }}>
                        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"40px", alignItems:"start" }}>
                          {/* Avantages */}
                          <div>
                            <p style={{ fontSize:"0.72rem", fontWeight:800, textTransform:"uppercase", letterSpacing:"0.14em", color:"#94A3B8", marginBottom:"16px" }}>Pourquoi nous rejoindre</p>
                            <div style={{ display:"flex", flexDirection:"column", gap:"12px", marginBottom:"32px" }}>
                              {[
                                { Icon:Zap,   text:"Réponse sous 48h ouvrées",       color:"#F59E0B" },
                                { Icon:Users, text:"Équipe soudée et bienveillante",  color:"#1E9FE8" },
                                { Icon:Star,  text:"Projets concrets et impactants",  color:"#7C3AED" },
                                { Icon:Clock, text:"Profil conservé 12 mois",         color:"#10B981" },
                              ].map(({ Icon, text, color }) => (
                                <div key={text} style={{ display:"flex", alignItems:"center", gap:"12px", padding:"10px 14px", borderRadius:"12px", background:"#F8FAFC", border:"1px solid #F1F5F9" }}>
                                  <div style={{ width:"32px", height:"32px", borderRadius:"10px", background:`${color}14`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                                    <Icon size={15} color={color}/>
                                  </div>
                                  <span style={{ fontSize:"0.85rem", color:"#475569", fontWeight:500 }}>{text}</span>
                                </div>
                              ))}
                            </div>
                            <button onClick={() => setShowSpontaneous(true)}
                              style={{ display:"inline-flex", alignItems:"center", gap:"10px", padding:"14px 32px", borderRadius:"14px", background:"linear-gradient(135deg,#1A3A8F,#1E9FE8)", color:"#fff", fontWeight:700, fontSize:"0.92rem", border:"none", cursor:"pointer", boxShadow:"0 6px 28px rgba(30,159,232,0.32)", fontFamily:"inherit", letterSpacing:"0.01em" }}>
                              <Send size={16}/> Soumettre mon dossier
                            </button>
                          </div>

                          {/* Domaines */}
                          <div>
                            <p style={{ fontSize:"0.72rem", fontWeight:800, textTransform:"uppercase", letterSpacing:"0.14em", color:"#94A3B8", marginBottom:"16px" }}>Domaines qui nous intéressent</p>
                            <div style={{ display:"flex", flexWrap:"wrap", gap:"10px" }}>
                              {domains.map(({ id, label, color }) => (
                                <span key={id} style={{ display:"inline-flex", alignItems:"center", gap:"7px", padding:"8px 14px", borderRadius:"12px", background:`${color}10`, border:`1.5px solid ${color}25`, fontSize:"0.82rem", fontWeight:600, color, transition:"all 0.2s" }}
                                  onMouseEnter={e => { (e.currentTarget as HTMLSpanElement).style.background=`${color}20`; (e.currentTarget as HTMLSpanElement).style.transform="translateY(-1px)" }}
                                  onMouseLeave={e => { (e.currentTarget as HTMLSpanElement).style.background=`${color}10`; (e.currentTarget as HTMLSpanElement).style.transform="translateY(0)" }}>
                                  <span style={{ width:"6px", height:"6px", borderRadius:"50%", background:color, flexShrink:0 }} />
                                  {label}
                                </span>
                              ))}
                              {domains.length === 0 && <p style={{ fontSize:"0.85rem", color:"#94A3B8" }}>Aucun domaine configuré.</p>}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
