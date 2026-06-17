"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Briefcase, MapPin, Clock, ChevronDown, ChevronUp,
  Send, Star, Users, Zap, Upload, X, CheckCircle, Loader2,
} from "lucide-react"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import SuccessAnimation from "@/components/ui/SuccessAnimation"
import { createClient } from "@/lib/supabase/client"
import type { JobOffer } from "@/types/database"

// Couleur par type de contrat
const CONTRACT_COLOR: Record<string, string> = {
  CDI:    "#1E9FE8",
  CDD:    "#0891B2",
  Stage:  "#7C3AED",
  Freelance: "#F59E0B",
}
function colorFor(contract: string) {
  for (const [k, v] of Object.entries(CONTRACT_COLOR)) {
    if (contract.toLowerCase().includes(k.toLowerCase())) return v
  }
  return "#10B981"
}

// ── Champ upload fichier ───────────────────────────────────────
function FileField({ label, file, onPick, hint, required, color }: {
  label: string; file: File | null; onPick: (f: File | null) => void
  hint: string; required?: boolean; color?: string
}) {
  const ref = useRef<HTMLInputElement>(null)
  return (
    <div>
      <label style={{ fontSize:"0.77rem", fontWeight:700, color:"#475569", display:"block", marginBottom:"6px", textTransform:"uppercase", letterSpacing:"0.05em" }}>
        {label}{required && <span style={{ color:"#EF4444" }}> *</span>}
      </label>
      <div onClick={() => ref.current?.click()} style={{
        display:"flex", alignItems:"center", gap:"10px", padding:"13px 16px", borderRadius:"12px", cursor:"pointer",
        border:`2px ${file ? "solid" : "dashed"} ${file ? "#10B981" : "#CBD5E1"}`,
        background: file ? "#F0FDF4" : "#F8FAFC", transition:"all 0.2s",
      }}>
        {file ? <CheckCircle size={16} color="#10B981" style={{ flexShrink:0 }} /> : <Upload size={16} color="#94A3B8" style={{ flexShrink:0 }} />}
        <span style={{ fontSize:"0.84rem", color: file ? "#10B981" : "#94A3B8", fontWeight: file ? 600 : 400, flex:1, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
          {file ? file.name : hint}
        </span>
        {file && (
          <button type="button" onClick={e => { e.stopPropagation(); if(ref.current) ref.current.value=""; onPick(null) }}
            style={{ background:"none", border:"none", cursor:"pointer", color:"#94A3B8", padding:0, display:"flex" }}>
            <X size={13}/>
          </button>
        )}
        <input ref={ref} type="file" accept=".pdf,.doc,.docx" style={{ display:"none" }}
          onChange={e => onPick(e.target.files?.[0] ?? null)} />
      </div>
    </div>
  )
}

// ── Modal candidature ──────────────────────────────────────────
function ApplyModal({ offer, onClose, onSuccess }: {
  offer: JobOffer; onClose: () => void; onSuccess: () => void
}) {
  const color = colorFor(offer.contract_type)
  const [form, setForm] = useState({ name:"", email:"", phone:"" })
  const [cv, setCv] = useState<File|null>(null)
  const [motivation, setMotivation] = useState<File|null>(null)
  const [status, setStatus] = useState<"idle"|"loading"|"error">("idle")
  const [err, setErr] = useState("")
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => setForm(f => ({ ...f, [k]: e.target.value }))

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!cv)         { setErr("Le CV est obligatoire."); return }
    if (!motivation) { setErr("La lettre de motivation est obligatoire."); return }
    setStatus("loading"); setErr("")

    const fd = new FormData()
    fd.append("type", "application")
    fd.append("job_offer_id", offer.id)
    fd.append("name", form.name)
    fd.append("email", form.email)
    fd.append("phone", form.phone)
    fd.append("cover_letter", "")
    fd.append("cv", cv)
    fd.append("motivation", motivation)

    const res = await fetch("/api/apply", { method:"POST", body:fd })
    if (res.ok) {
      onClose(); onSuccess()
    } else {
      const data = await res.json()
      setErr(data.error ?? "Erreur lors de l'envoi.")
      setStatus("error")
    }
  }

  return (
    <div style={{ position:"fixed", inset:0, zIndex:200, display:"flex", alignItems:"center", justifyContent:"center", padding:"16px" }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div style={{ position:"absolute", inset:0, background:"rgba(7,15,43,0.65)", backdropFilter:"blur(6px)" }} />
      <motion.div initial={{ opacity:0, scale:0.94, y:16 }} animate={{ opacity:1, scale:1, y:0 }} exit={{ opacity:0, scale:0.94 }}
        transition={{ type:"spring", stiffness:320, damping:28 }}
        style={{ position:"relative", background:"#fff", borderRadius:"24px", width:"100%", maxWidth:"500px", boxShadow:"0 24px 80px rgba(0,0,0,0.18)", overflow:"hidden", maxHeight:"90vh", overflowY:"auto" }}>
        <div style={{ height:"5px", background:color }} />
        <div style={{ padding:"32px 32px 28px" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"24px" }}>
            <div>
              <span style={{ fontSize:"10px", fontWeight:800, textTransform:"uppercase", letterSpacing:"0.12em", padding:"4px 10px", borderRadius:"999px", background:`${color}18`, color }}>Candidature</span>
              <h3 style={{ fontSize:"1.05rem", fontWeight:700, color:"#1A3A8F", margin:"10px 0 2px" }}>{offer.title}</h3>
              <p style={{ fontSize:"0.82rem", color:"#94A3B8", margin:0 }}>{offer.department}</p>
            </div>
            <button onClick={onClose} style={{ flexShrink:0, width:"34px", height:"34px", borderRadius:"8px", border:"1px solid #E2E8F0", background:"transparent", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color:"#94A3B8" }}><X size={15}/></button>
          </div>
          <form onSubmit={submit} style={{ display:"flex", flexDirection:"column", gap:"14px" }}>
            <input required placeholder="Nom complet *" value={form.name} onChange={set("name")}
              style={{ padding:"12px 14px", borderRadius:"10px", border:"1.5px solid #E2E8F0", fontSize:"0.88rem", fontFamily:"inherit", outline:"none" }} />
            <input required type="email" placeholder="Email *" value={form.email} onChange={set("email")}
              style={{ padding:"12px 14px", borderRadius:"10px", border:"1.5px solid #E2E8F0", fontSize:"0.88rem", fontFamily:"inherit", outline:"none" }} />
            <input type="tel" placeholder="Téléphone" value={form.phone} onChange={set("phone")}
              style={{ padding:"12px 14px", borderRadius:"10px", border:"1.5px solid #E2E8F0", fontSize:"0.88rem", fontFamily:"inherit", outline:"none" }} />
            <div style={{ height:"1px", background:"#F1F5F9" }} />
            <p style={{ fontSize:"0.72rem", fontWeight:700, color:"#64748B", margin:0, textTransform:"uppercase", letterSpacing:"0.08em" }}>Documents obligatoires (PDF ou Word)</p>
            <FileField label="CV" file={cv} onPick={setCv} hint="Sélectionner votre CV" required color={color} />
            <FileField label="Lettre de motivation" file={motivation} onPick={setMotivation} hint="Sélectionner votre lettre de motivation" required color={color} />
            {err && <p style={{ fontSize:"0.82rem", color:"#DC2626", margin:0 }}>{err}</p>}
            <button type="submit" disabled={status === "loading"}
              style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"8px", padding:"13px 24px", borderRadius:"10px", background: status === "loading" ? "#94A3B8" : color, color:"#fff", fontWeight:700, fontSize:"0.9rem", border:"none", cursor: status === "loading" ? "default" : "pointer" }}>
              {status === "loading" ? <><Loader2 size={15} style={{ animation:"spin 1s linear infinite" }}/> Envoi en cours…</> : <><Send size={15}/> Envoyer ma candidature</>}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  )
}

// ── Card offre d'emploi ────────────────────────────────────────
function JobCard({ offer, onApply }: { offer: JobOffer; onApply: () => void }) {
  const [open, setOpen] = useState(false)
  const color = colorFor(offer.contract_type)
  return (
    <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.45 }}
      style={{ background:"#fff", borderRadius:"16px", border:"1.5px solid #E2E8F0", overflow:"hidden", boxShadow:"0 2px 12px rgba(0,0,0,0.05)" }}>
      <div style={{ height:"4px", background:color }} />
      <div style={{ padding:"22px 26px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:"12px" }}>
          <div style={{ flex:1 }}>
            <div style={{ display:"flex", gap:"8px", marginBottom:"8px", flexWrap:"wrap" }}>
              <span style={{ fontSize:"10px", fontWeight:800, textTransform:"uppercase", letterSpacing:"0.1em", padding:"4px 10px", borderRadius:"999px", background:`${color}15`, color }}>{offer.contract_type}</span>
              <span style={{ fontSize:"10px", fontWeight:600, color:"#64748B", background:"#F1F5F9", padding:"4px 10px", borderRadius:"999px" }}>{offer.department}</span>
            </div>
            <h3 style={{ fontSize:"1rem", fontWeight:700, color:"#1A3A8F", margin:"0 0 6px" }}>{offer.title}</h3>
            <div style={{ display:"flex", gap:"14px", flexWrap:"wrap" }}>
              <span style={{ display:"flex", alignItems:"center", gap:"4px", fontSize:"0.78rem", color:"#64748B" }}><MapPin size={12}/>{offer.location}</span>
              <span style={{ display:"flex", alignItems:"center", gap:"4px", fontSize:"0.78rem", color:"#64748B" }}><Briefcase size={12}/>{offer.department}</span>
              <span style={{ display:"flex", alignItems:"center", gap:"4px", fontSize:"0.78rem", color:"#64748B" }}><Clock size={12}/>{new Date(offer.created_at).toLocaleDateString("fr-FR", { day:"numeric", month:"long", year:"numeric" })}</span>
            </div>
          </div>
          <button onClick={() => setOpen(!open)} style={{ flexShrink:0, width:"34px", height:"34px", borderRadius:"10px", border:"1.5px solid #E2E8F0", background:"transparent", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color:"#64748B" }}>
            {open ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
          </button>
        </div>
        <AnimatePresence>
          {open && (
            <motion.div initial={{ height:0, opacity:0 }} animate={{ height:"auto", opacity:1 }} exit={{ height:0, opacity:0 }} transition={{ duration:0.22 }} style={{ overflow:"hidden" }}>
              <div style={{ paddingTop:"16px", borderTop:"1px solid #F1F5F9", marginTop:"14px" }}>
                <p style={{ fontSize:"0.87rem", color:"#64748B", lineHeight:1.75, marginBottom:"14px" }}>{offer.description}</p>
                {offer.requirements?.length > 0 && (
                  <>
                    <p style={{ fontSize:"0.72rem", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em", color:"#94A3B8", margin:"0 0 8px" }}>Profil recherché</p>
                    <div style={{ display:"flex", flexDirection:"column", gap:"5px", marginBottom:"18px" }}>
                      {offer.requirements.map((r, i) => (
                        <div key={i} style={{ display:"flex", gap:"8px", alignItems:"center" }}>
                          <div style={{ width:"6px", height:"6px", borderRadius:"50%", background:color, flexShrink:0 }} />
                          <span style={{ fontSize:"0.83rem", color:"#64748B" }}>{r}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
                <button onClick={onApply} style={{ display:"inline-flex", alignItems:"center", gap:"8px", padding:"11px 22px", borderRadius:"10px", background:color, color:"#fff", fontWeight:700, fontSize:"0.88rem", border:"none", cursor:"pointer" }}>
                  <Send size={14}/> Postuler
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

// ── Candidature spontanée ──────────────────────────────────────
function SpontaneousForm({ onSuccess }: { onSuccess: () => void }) {
  const [form, setForm] = useState({ name:"", email:"", phone:"", message:"" })
  const [cv, setCv] = useState<File|null>(null)
  const [motivation, setMotivation] = useState<File|null>(null)
  const [status, setStatus] = useState<"idle"|"loading"|"error">("idle")
  const [err, setErr] = useState("")
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm(f => ({ ...f, [k]: e.target.value }))

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!cv)         { setErr("Votre CV est obligatoire."); return }
    if (!motivation) { setErr("La lettre de motivation est obligatoire."); return }
    setStatus("loading"); setErr("")

    const fd = new FormData()
    fd.append("type", "spontaneous")
    fd.append("name", form.name)
    fd.append("email", form.email)
    fd.append("phone", form.phone)
    fd.append("cover_letter", form.message)
    fd.append("cv", cv)
    fd.append("motivation", motivation)

    const res = await fetch("/api/apply", { method:"POST", body:fd })
    if (res.ok) {
      onSuccess()
    } else {
      const data = await res.json()
      setErr(data.error ?? "Erreur lors de l'envoi.")
      setStatus("error")
    }
  }

  return (
    <form onSubmit={submit} style={{ display:"flex", flexDirection:"column", gap:"14px" }}>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px" }}>
        <input required placeholder="Nom complet *" value={form.name} onChange={set("name")}
          style={{ padding:"12px 14px", borderRadius:"10px", border:"1.5px solid #E2E8F0", fontSize:"0.88rem", fontFamily:"inherit", outline:"none" }} />
        <input required type="email" placeholder="Email *" value={form.email} onChange={set("email")}
          style={{ padding:"12px 14px", borderRadius:"10px", border:"1.5px solid #E2E8F0", fontSize:"0.88rem", fontFamily:"inherit", outline:"none" }} />
      </div>
      <input type="tel" placeholder="Téléphone" value={form.phone} onChange={set("phone")}
        style={{ padding:"12px 14px", borderRadius:"10px", border:"1.5px solid #E2E8F0", fontSize:"0.88rem", fontFamily:"inherit", outline:"none" }} />
      <textarea required placeholder="Présentez-vous et décrivez le poste souhaité… *" value={form.message} onChange={set("message")} rows={4}
        style={{ padding:"12px 14px", borderRadius:"10px", border:"1.5px solid #E2E8F0", fontSize:"0.88rem", fontFamily:"inherit", outline:"none", resize:"vertical" }} />
      <p style={{ fontSize:"0.72rem", fontWeight:700, color:"#64748B", margin:"2px 0 -4px", textTransform:"uppercase", letterSpacing:"0.08em" }}>Documents obligatoires (PDF ou Word)</p>
      <FileField label="CV" file={cv} onPick={setCv} hint="Joindre votre CV" required color="#1E9FE8" />
      <FileField label="Lettre de motivation" file={motivation} onPick={setMotivation} hint="Joindre votre lettre de motivation" required color="#1E9FE8" />
      {err && <p style={{ fontSize:"0.82rem", color:"#DC2626", margin:0 }}>{err}</p>}
      <button type="submit" disabled={status === "loading"}
        style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"8px", padding:"13px 24px", borderRadius:"10px", background: status === "loading" ? "#94A3B8" : "#1E9FE8", color:"#fff", fontWeight:700, fontSize:"0.9rem", border:"none", cursor: status === "loading" ? "default" : "pointer" }}>
        {status === "loading" ? <><Loader2 size={15} style={{ animation:"spin 1s linear infinite" }}/> Envoi en cours…</> : <><Send size={15}/> Envoyer ma candidature spontanée</>}
      </button>
    </form>
  )
}

// ── Page principale ────────────────────────────────────────────
export default function CarrierePage() {
  const [offers, setOffers] = useState<JobOffer[]>([])
  const [loading, setLoading] = useState(true)
  const [applyOffer, setApplyOffer] = useState<JobOffer | null>(null)
  const [successCfg, setSuccessCfg] = useState<{ visible:boolean; title:string; subtitle:string }>({ visible:false, title:"", subtitle:"" })

  function showSuccess(title: string, subtitle: string) {
    setSuccessCfg({ visible:true, title, subtitle })
  }

  useEffect(() => {
    const supabase = createClient()
    supabase
      .from("job_offers")
      .select("*")
      .eq("status", "published")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setOffers(data ?? [])
        setLoading(false)
      })
  }, [])

  return (
    <>
      <SuccessAnimation
        visible={successCfg.visible}
        title={successCfg.title}
        subtitle={successCfg.subtitle}
        onClose={() => setSuccessCfg(s => ({ ...s, visible:false }))}
      />
      <AnimatePresence>
        {applyOffer && (
          <ApplyModal key="apply" offer={applyOffer} onClose={() => setApplyOffer(null)}
            onSuccess={() => showSuccess("Candidature envoyée !", "Nous avons bien reçu votre dossier. Réponse sous 48h.")}
          />
        )}
      </AnimatePresence>

      <Navbar />
      <main>

        {/* ── Hero ──────────────────────────────────────────────── */}
        <div style={{ background:"linear-gradient(160deg,#0F1E4A 0%,#1A3A8F 60%,#0F1E4A 100%)", paddingTop:"68px", position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", top:"-80px", right:"-80px", width:"450px", height:"450px", borderRadius:"50%", background:"radial-gradient(circle,rgba(30,159,232,0.1) 0%,transparent 70%)", pointerEvents:"none" }} />
          <div style={{ padding:"80px 5% 64px", textAlign:"center", position:"relative", zIndex:1 }}>
            <motion.span initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.4 }}
              style={{ display:"inline-block", fontSize:"11px", fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", padding:"7px 18px", borderRadius:"999px", background:"rgba(30,159,232,0.15)", color:"#60C8FF", border:"1px solid rgba(30,159,232,0.25)", marginBottom:"20px" }}
            >Rejoignez @TOGO</motion.span>

            <motion.h1 initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.55, delay:0.1 }}
              style={{ fontSize:"clamp(2.2rem,4.5vw,3.4rem)", fontWeight:800, color:"#fff", margin:"0 0 16px", lineHeight:1.1 }}
            >
              Construisons l&apos;avenir digital<br />
              <span style={{ background:"linear-gradient(135deg,#1E9FE8,#10B981)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
                du Togo ensemble
              </span>
            </motion.h1>

            <motion.p initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5, delay:0.2 }}
              style={{ fontSize:"1.05rem", color:"rgba(255,255,255,0.65)", maxWidth:"520px", margin:"0 auto 40px", lineHeight:1.75 }}
            >
              Offres d&apos;emploi et candidatures spontanées — rejoignez une équipe engagée pour la transformation digitale de l&apos;Afrique.
            </motion.p>

            <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.4, delay:0.3 }}
              style={{ display:"flex", gap:"16px", justifyContent:"center", flexWrap:"wrap" }}
            >
              {[
                { Icon:Users,    val: loading ? "—" : `${offers.length}`, label:"Postes ouverts" },
                { Icon:Briefcase,val:"Lomé",                               label:"Basé à"        },
                { Icon:Star,     val:"48h",                                label:"Délai réponse" },
              ].map(({ Icon, val, label }) => (
                <div key={label} style={{ display:"flex", alignItems:"center", gap:"10px", background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.12)", padding:"12px 20px", borderRadius:"12px" }}>
                  <Icon size={16} color="#60C8FF" />
                  <div style={{ textAlign:"left" }}>
                    <p style={{ fontSize:"1.1rem", fontWeight:800, color:"#fff", margin:0, lineHeight:1 }}>{val}</p>
                    <p style={{ fontSize:"0.72rem", color:"rgba(255,255,255,0.5)", margin:0 }}>{label}</p>
                  </div>
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

        {/* ── Offres d'emploi ────────────────────────────────────── */}
        <div style={{ background:"#f8fafc", padding:"64px 5%" }}>
          <div style={{ maxWidth:"820px", margin:"0 auto" }}>
            <div style={{ marginBottom:"32px" }}>
              <span style={{ display:"inline-block", fontSize:"11px", fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", padding:"7px 18px", borderRadius:"999px", background:"var(--color-brand-light)", color:"var(--color-brand-dark)", marginBottom:"12px" }}>
                Offres d&apos;emploi
              </span>
              <h2 style={{ fontSize:"clamp(1.5rem,3vw,2rem)", fontWeight:800, color:"#1A3A8F", margin:"0 0 6px" }}>
                Postes disponibles chez @TOGO
              </h2>
            </div>

            {loading ? (
              <div style={{ textAlign:"center", padding:"64px 0", color:"#94A3B8" }}>
                <Loader2 size={32} style={{ animation:"spin 1s linear infinite", margin:"0 auto 12px", display:"block" }} />
                <p style={{ fontSize:"0.88rem" }}>Chargement des offres…</p>
              </div>
            ) : offers.length === 0 ? (
              <div style={{ textAlign:"center", padding:"64px 0" }}>
                <Briefcase size={40} color="#CBD5E1" style={{ margin:"0 auto 16px", display:"block" }} />
                <p style={{ fontSize:"1rem", fontWeight:600, color:"#64748B", margin:"0 0 6px" }}>Aucune offre disponible pour le moment</p>
                <p style={{ fontSize:"0.85rem", color:"#94A3B8" }}>Revenez bientôt ou envoyez une candidature spontanée ci-dessous.</p>
              </div>
            ) : (
              <div style={{ display:"flex", flexDirection:"column", gap:"16px" }}>
                <p style={{ fontSize:"0.85rem", color:"#94A3B8", marginBottom:"4px" }}>{offers.length} offre{offers.length > 1 ? "s" : ""} disponible{offers.length > 1 ? "s" : ""} · Lomé, Togo</p>
                {offers.map(o => <JobCard key={o.id} offer={o} onApply={() => setApplyOffer(o)} />)}
              </div>
            )}
          </div>
        </div>

        {/* ── Candidature spontanée ──────────────────────────────── */}
        <div style={{ background:"#fff", padding:"72px 5%" }}>
          <div style={{ maxWidth:"900px", margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1.4fr", gap:"48px", alignItems:"start" }} className="about-hero-grid">
            <div>
              <span style={{ display:"inline-block", fontSize:"11px", fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", padding:"7px 18px", borderRadius:"999px", background:"var(--color-brand-light)", color:"var(--color-brand-dark)", marginBottom:"16px" }}>
                Candidature spontanée
              </span>
              <h2 style={{ fontSize:"clamp(1.4rem,2.5vw,1.9rem)", fontWeight:700, color:"#1A3A8F", margin:"0 0 12px" }}>
                Vous ne trouvez pas<br />le poste idéal ?
              </h2>
              <p style={{ fontSize:"0.9rem", color:"#64748B", lineHeight:1.75, marginBottom:"24px" }}>
                Envoyez-nous votre CV et votre lettre de motivation. Nous gardons les profils intéressants pour nos prochaines opportunités.
              </p>
              <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
                {[
                  { Icon:Zap,   text:"Réponse sous 48h"               },
                  { Icon:Users, text:"Équipe soudée et bienveillante" },
                  { Icon:Star,  text:"Projets concrets et impactants" },
                ].map(({ Icon, text }) => (
                  <div key={text} style={{ display:"flex", alignItems:"center", gap:"10px" }}>
                    <Icon size={14} color="#1E9FE8" />
                    <span style={{ fontSize:"0.85rem", color:"#64748B" }}>{text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background:"#f8fafc", borderRadius:"20px", padding:"32px", border:"1.5px solid #E2E8F0" }}>
              <SpontaneousForm onSuccess={() => showSuccess("Candidature reçue !", "Merci pour votre intérêt — nous vous contactons si votre profil correspond à nos besoins.")} />
            </div>
          </div>
        </div>

      </main>
      <Footer />
    </>
  )
}
