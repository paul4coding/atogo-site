"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  Briefcase, FileText, MapPin, Clock,
  ChevronDown, ChevronUp, Send, Star, Users, Zap,
  Upload, X, CheckCircle, Archive,
} from "lucide-react"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import SuccessAnimation from "@/components/ui/SuccessAnimation"

type Tab = "bons-plans" | "appels-offres"

// ── Données ──────────────────────────────────────────────────────────────────
const BONS_PLANS = [
  {
    id: "bp1", type: "Emploi", contract: "CDI", color: "#1E9FE8",
    title: "Chargé(e) de transferts d'argent",
    department: "Services Financiers", location: "Lomé, Togo",
    description: "Nous recherchons un(e) agent(e) pour la gestion des transferts nationaux et internationaux en agence. Accueil clients, traitement des opérations Flooz, MixBy Yas, Western Union, MoneyGram et RIA.",
    profile: ["Bac+2 minimum", "Bonne maîtrise des outils informatiques", "Sens du service client", "Rigueur et discrétion"],
  },
  {
    id: "bp2", type: "Stage", contract: "Stage 3–6 mois", color: "#7C3AED",
    title: "Développeur(se) Web Full Stack",
    department: "Solutions Informatiques", location: "Lomé, Togo",
    description: "Stage de développement web au sein de notre division IT. Participation à des projets clients concrets, développement d'applications sur mesure.",
    profile: ["Formation en informatique", "Maîtrise React / Node.js", "Autonomie et créativité", "Esprit d'équipe"],
  },
  {
    id: "bp3", type: "Emploi", contract: "CDI", color: "#10B981",
    title: "Commercial(e) Solutions IT",
    department: "Marketing & Commercial", location: "Lomé, Togo",
    description: "Développement du portefeuille clients pour nos services informatiques et téléphones. Prospection, présentation des offres et suivi des ventes.",
    profile: ["Bac+2 Commerce ou équivalent", "Expérience vente souhaitée", "Dynamisme et persévérance", "Connaissance du marché local"],
  },
  {
    id: "bp4", type: "Stage", contract: "Stage 3–6 mois", color: "#F59E0B",
    title: "Assistant(e) Marketing Digital",
    department: "Marketing Digital", location: "Lomé, Togo",
    description: "Assistance à la gestion des réseaux sociaux, création de contenus et suivi des campagnes publicitaires pour @TOGO et ses clients.",
    profile: ["Formation marketing/communication", "Maîtrise des réseaux sociaux", "Créativité et rédaction", "Sens de l'esthétique"],
  },
]

const APPELS_OFFRES = [
  {
    id: "ao1", ref: "AO-2025-001", color: "#1A3A8F",
    title: "Développement d'une application de gestion",
    client: "@TOGO Interne", deadline: "Ouvert",
    description: "Développement d'une application web de gestion interne pour le suivi des transferts et des ventes de téléphones. Stack souhaitée : Next.js / Node.js / PostgreSQL.",
    requirements: ["Expérience minimum 2 ans", "Références de projets similaires", "Disponibilité sous 30 jours", "Société ou freelance enregistré(e)"],
    deliverables: ["Application web responsive", "Documentation technique", "Formation utilisateurs", "Support 3 mois"],
  },
  {
    id: "ao2", ref: "AO-2025-002", color: "#DC2626",
    title: "Audit de sécurité informatique",
    client: "@TOGO Interne", deadline: "Ouvert",
    description: "Audit complet de notre infrastructure informatique, test de pénétration et recommandations de sécurité. Rapport détaillé et plan d'action attendus.",
    requirements: ["Certification sécurité (CEH, CISSP ou équivalent)", "Expérience audit en entreprise", "Discrétion et confidentialité", "Rapport en français"],
    deliverables: ["Rapport d'audit complet", "Tests de pénétration", "Plan de remédiation", "Présentation direction"],
  },
  {
    id: "ao3", ref: "AO-2025-003", color: "#0891B2",
    title: "Création de supports de communication",
    client: "@TOGO — Campagne 2025", deadline: "Ouvert",
    description: "Création de l'ensemble des supports visuels pour la campagne 2025 : affiches, flyers, bannières digitales, posts réseaux sociaux.",
    requirements: ["Portfolio graphisme requis", "Maîtrise Adobe Creative Suite", "Respect de la charte graphique", "Livraison formats print & digital"],
    deliverables: ["Affiches A3/A4", "Flyers recto-verso", "Bannières web", "Pack réseaux sociaux"],
  },
]

// ── Champ upload fichier ──────────────────────────────────────────────────────
function FileField({
  label, file, onPick, accept, hint, required, color,
}: {
  label: string; file: File | null; onPick: (f: File | null) => void
  accept: string; hint: string; required?: boolean; color?: string
}) {
  const ref = useRef<HTMLInputElement>(null)

  return (
    <div>
      <label style={{ fontSize:"0.77rem", fontWeight:700, color:"#475569", display:"block", marginBottom:"6px", textTransform:"uppercase", letterSpacing:"0.05em" }}>
        {label}{required && <span style={{ color:"#EF4444" }}> *</span>}
      </label>
      <div onClick={() => ref.current?.click()} style={{
        display:"flex", alignItems:"center", gap:"10px",
        padding:"13px 16px", borderRadius:"12px", cursor:"pointer",
        border: `2px ${file ? "solid" : "dashed"} ${file ? "#10B981" : "#CBD5E1"}`,
        background: file ? "#F0FDF4" : "#F8FAFC", transition:"all 0.2s",
      }}>
        {file
          ? <CheckCircle size={16} color="#10B981" style={{ flexShrink:0 }} />
          : <Upload size={16} color="#94A3B8" style={{ flexShrink:0 }} />
        }
        <span style={{ fontSize:"0.84rem", color: file ? "#10B981" : "#94A3B8", fontWeight: file ? 600 : 400, flex:1, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
          {file ? file.name : hint}
        </span>
        {file && (
          <button type="button" onClick={e => { e.stopPropagation(); if(ref.current) ref.current.value=""; onPick(null) }}
            style={{ background:"none", border:"none", cursor:"pointer", color:"#94A3B8", padding:0, display:"flex" }}
          ><X size={13}/></button>
        )}
        <input ref={ref} type="file" accept={accept} style={{ display:"none" }}
          onChange={e => onPick(e.target.files?.[0] ?? null)}
        />
      </div>
    </div>
  )
}

// ── Modal candidature emploi/stage ────────────────────────────────────────────
function ApplyModal({ offer, onClose, onSuccess }: { offer: typeof BONS_PLANS[0]; onClose: () => void; onSuccess: () => void }) {
  const [form, setForm] = useState({ name:"", email:"", phone:"" })
  const [cv, setCv] = useState<File|null>(null)
  const [motivation, setMotivation] = useState<File|null>(null)
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState("")
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => setForm(f => ({ ...f, [k]: e.target.value }))

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!cv)         { setErr("Le CV est obligatoire."); return }
    if (!motivation) { setErr("La lettre de motivation est obligatoire."); return }
    setLoading(true); setErr("")
    await new Promise(r => setTimeout(r, 1200))
    setLoading(false); onClose(); onSuccess()
  }

  return (
    <div style={{ position:"fixed", inset:0, zIndex:200, display:"flex", alignItems:"center", justifyContent:"center", padding:"16px" }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div style={{ position:"absolute", inset:0, background:"rgba(7,15,43,0.65)", backdropFilter:"blur(6px)" }} />
      <motion.div initial={{ opacity:0, scale:0.94, y:16 }} animate={{ opacity:1, scale:1, y:0 }} exit={{ opacity:0, scale:0.94 }}
        transition={{ type:"spring", stiffness:320, damping:28 }}
        style={{ position:"relative", background:"#fff", borderRadius:"24px", width:"100%", maxWidth:"500px", boxShadow:"0 24px 80px rgba(0,0,0,0.18)", overflow:"hidden", maxHeight:"90vh", overflowY:"auto" }}
      >
        <div style={{ height:"5px", background:offer.color }} />
        <div style={{ padding:"32px 32px 28px" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"24px" }}>
            <div>
              <span style={{ fontSize:"10px", fontWeight:800, textTransform:"uppercase", letterSpacing:"0.12em", padding:"4px 10px", borderRadius:"999px", background:`${offer.color}18`, color:offer.color }}>Candidature</span>
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
            <p style={{ fontSize:"0.72rem", fontWeight:700, color:"#64748B", margin:0, textTransform:"uppercase", letterSpacing:"0.08em" }}>Documents obligatoires (PDF)</p>
            <FileField label="CV" file={cv} onPick={setCv} accept=".pdf,.doc,.docx" hint="Sélectionner votre CV (PDF ou Word)" required color={offer.color} />
            <FileField label="Lettre de motivation" file={motivation} onPick={setMotivation} accept=".pdf,.doc,.docx" hint="Sélectionner votre lettre de motivation" required color={offer.color} />
            {err && <p style={{ fontSize:"0.82rem", color:"#DC2626", margin:0 }}>{err}</p>}
            <button type="submit" disabled={loading}
              style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"8px", padding:"13px 24px", borderRadius:"10px", background: loading ? "#94A3B8" : offer.color, color:"#fff", fontWeight:700, fontSize:"0.9rem", border:"none", cursor: loading ? "default" : "pointer" }}
            >{loading ? "Envoi en cours…" : <><Send size={15}/> Envoyer ma candidature</>}</button>
          </form>
        </div>
      </motion.div>
    </div>
  )
}

// ── Modal appel d'offres — dossier .zip uniquement ────────────────────────────
function AoModal({ offer, onClose, onSuccess }: { offer: typeof APPELS_OFFRES[0]; onClose: () => void; onSuccess: () => void }) {
  const [form, setForm] = useState({ name:"", email:"", phone:"", company:"" })
  const [dossier, setDossier] = useState<File|null>(null)
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState("")
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => setForm(f => ({ ...f, [k]: e.target.value }))

  function handleZipPick(f: File | null) {
    if (f && !f.name.toLowerCase().endsWith(".zip")) {
      setErr("❌ Seuls les dossiers compressés .zip sont acceptés pour les appels d'offres.")
      return
    }
    setErr(""); setDossier(f)
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!dossier)                               { setErr("Le dossier .zip est obligatoire."); return }
    if (!dossier.name.toLowerCase().endsWith(".zip")) { setErr("Seuls les fichiers .zip sont acceptés."); return }
    setLoading(true); setErr("")
    await new Promise(r => setTimeout(r, 1400))
    setLoading(false); onClose(); onSuccess()
  }

  return (
    <div style={{ position:"fixed", inset:0, zIndex:200, display:"flex", alignItems:"center", justifyContent:"center", padding:"16px" }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div style={{ position:"absolute", inset:0, background:"rgba(7,15,43,0.65)", backdropFilter:"blur(6px)" }} />
      <motion.div initial={{ opacity:0, scale:0.94, y:16 }} animate={{ opacity:1, scale:1, y:0 }} exit={{ opacity:0, scale:0.94 }}
        transition={{ type:"spring", stiffness:320, damping:28 }}
        style={{ position:"relative", background:"#fff", borderRadius:"24px", width:"100%", maxWidth:"500px", boxShadow:"0 24px 80px rgba(0,0,0,0.18)", overflow:"hidden", maxHeight:"90vh", overflowY:"auto" }}
      >
        <div style={{ height:"5px", background:offer.color }} />
        <div style={{ padding:"32px 32px 28px" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"24px" }}>
            <div>
              <span style={{ fontSize:"10px", fontWeight:800, textTransform:"uppercase", letterSpacing:"0.12em", padding:"4px 10px", borderRadius:"999px", background:`${offer.color}18`, color:offer.color }}>Réf. {offer.ref}</span>
              <h3 style={{ fontSize:"1.05rem", fontWeight:700, color:"#1A3A8F", margin:"10px 0 2px" }}>{offer.title}</h3>
            </div>
            <button onClick={onClose} style={{ flexShrink:0, width:"34px", height:"34px", borderRadius:"8px", border:"1px solid #E2E8F0", background:"transparent", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color:"#94A3B8" }}><X size={15}/></button>
          </div>
          <form onSubmit={submit} style={{ display:"flex", flexDirection:"column", gap:"14px" }}>
            <input required placeholder="Nom du responsable *" value={form.name} onChange={set("name")}
              style={{ padding:"12px 14px", borderRadius:"10px", border:"1.5px solid #E2E8F0", fontSize:"0.88rem", fontFamily:"inherit", outline:"none" }} />
            <input required placeholder="Société / Structure *" value={form.company} onChange={set("company")}
              style={{ padding:"12px 14px", borderRadius:"10px", border:"1.5px solid #E2E8F0", fontSize:"0.88rem", fontFamily:"inherit", outline:"none" }} />
            <input required type="email" placeholder="Email *" value={form.email} onChange={set("email")}
              style={{ padding:"12px 14px", borderRadius:"10px", border:"1.5px solid #E2E8F0", fontSize:"0.88rem", fontFamily:"inherit", outline:"none" }} />
            <input type="tel" placeholder="Téléphone" value={form.phone} onChange={set("phone")}
              style={{ padding:"12px 14px", borderRadius:"10px", border:"1.5px solid #E2E8F0", fontSize:"0.88rem", fontFamily:"inherit", outline:"none" }} />

            {/* Encart info ZIP */}
            <div style={{ background:"#FEF3C7", borderRadius:"10px", padding:"12px 14px", display:"flex", gap:"10px", alignItems:"flex-start" }}>
              <Archive size={16} color="#D97706" style={{ flexShrink:0, marginTop:"2px" }} />
              <div>
                <p style={{ fontSize:"0.8rem", fontWeight:700, color:"#92400E", margin:"0 0 3px" }}>Dossier compressé obligatoire</p>
                <p style={{ fontSize:"0.75rem", color:"#B45309", margin:0, lineHeight:1.55 }}>
                  Regroupez tous vos documents (devis, références, attestations, CV équipe…) dans un seul fichier <strong>.zip</strong>. Les PDF seuls ne sont <strong>pas acceptés</strong>.
                </p>
              </div>
            </div>

            <FileField label="Dossier complet (.zip uniquement)" file={dossier} onPick={handleZipPick} accept=".zip" hint="Sélectionner votre dossier .zip" required color={offer.color} />
            {err && <p style={{ fontSize:"0.82rem", color:"#DC2626", margin:0 }}>{err}</p>}
            <button type="submit" disabled={loading}
              style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"8px", padding:"14px 24px", borderRadius:"10px", background: loading ? "#94A3B8" : offer.color, color:"#fff", fontWeight:700, fontSize:"0.95rem", border:"none", cursor: loading ? "default" : "pointer" }}
            >{loading ? "Envoi en cours…" : <><Send size={15}/> Soumettre l&apos;offre</>}</button>
          </form>
        </div>
      </motion.div>
    </div>
  )
}

// ── Cards ─────────────────────────────────────────────────────────────────────
function BonPlanCard({ offer, onApply }: { offer: typeof BONS_PLANS[0]; onApply: () => void }) {
  const [open, setOpen] = useState(false)
  return (
    <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.45 }}
      style={{ background:"#fff", borderRadius:"16px", border:"1.5px solid #E2E8F0", overflow:"hidden", boxShadow:"0 2px 12px rgba(0,0,0,0.05)" }}
    >
      <div style={{ height:"4px", background:offer.color }} />
      <div style={{ padding:"22px 26px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:"12px" }}>
          <div style={{ flex:1 }}>
            <div style={{ display:"flex", gap:"8px", marginBottom:"8px", flexWrap:"wrap" }}>
              <span style={{ fontSize:"10px", fontWeight:800, textTransform:"uppercase", letterSpacing:"0.1em", padding:"4px 10px", borderRadius:"999px", background:`${offer.color}15`, color:offer.color }}>{offer.type}</span>
              <span style={{ fontSize:"10px", fontWeight:600, color:"#64748B", background:"#F1F5F9", padding:"4px 10px", borderRadius:"999px" }}>{offer.contract}</span>
            </div>
            <h3 style={{ fontSize:"1rem", fontWeight:700, color:"#1A3A8F", margin:"0 0 6px" }}>{offer.title}</h3>
            <div style={{ display:"flex", gap:"14px", flexWrap:"wrap" }}>
              <span style={{ display:"flex", alignItems:"center", gap:"4px", fontSize:"0.78rem", color:"#64748B" }}><MapPin size={12}/>{offer.location}</span>
              <span style={{ display:"flex", alignItems:"center", gap:"4px", fontSize:"0.78rem", color:"#64748B" }}><Briefcase size={12}/>{offer.department}</span>
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
                <p style={{ fontSize:"0.72rem", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em", color:"#94A3B8", margin:"0 0 8px" }}>Profil recherché</p>
                <div style={{ display:"flex", flexDirection:"column", gap:"5px", marginBottom:"18px" }}>
                  {offer.profile.map(p => (
                    <div key={p} style={{ display:"flex", gap:"8px", alignItems:"center" }}>
                      <div style={{ width:"6px", height:"6px", borderRadius:"50%", background:offer.color, flexShrink:0 }} />
                      <span style={{ fontSize:"0.83rem", color:"#64748B" }}>{p}</span>
                    </div>
                  ))}
                </div>
                <button onClick={onApply} style={{ display:"inline-flex", alignItems:"center", gap:"8px", padding:"11px 22px", borderRadius:"10px", background:offer.color, color:"#fff", fontWeight:700, fontSize:"0.88rem", border:"none", cursor:"pointer" }}>
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

function AoCard({ offer, onSubmit }: { offer: typeof APPELS_OFFRES[0]; onSubmit: () => void }) {
  const [open, setOpen] = useState(false)
  return (
    <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.45 }}
      style={{ background:"#fff", borderRadius:"16px", border:"1.5px solid #E2E8F0", overflow:"hidden", boxShadow:"0 2px 12px rgba(0,0,0,0.05)" }}
    >
      <div style={{ height:"4px", background:offer.color }} />
      <div style={{ padding:"22px 26px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:"12px" }}>
          <div style={{ flex:1 }}>
            <div style={{ display:"flex", gap:"8px", marginBottom:"8px", flexWrap:"wrap" }}>
              <span style={{ fontSize:"10px", fontWeight:800, textTransform:"uppercase", letterSpacing:"0.1em", padding:"4px 10px", borderRadius:"999px", background:`${offer.color}15`, color:offer.color }}>Réf. {offer.ref}</span>
              <span style={{ fontSize:"10px", fontWeight:600, color:"#D97706", background:"#FEF3C7", padding:"4px 10px", borderRadius:"999px", display:"flex", alignItems:"center", gap:"4px" }}>
                <Archive size={10}/> Dossier .zip requis
              </span>
            </div>
            <h3 style={{ fontSize:"1rem", fontWeight:700, color:"#1A3A8F", margin:"0 0 6px" }}>{offer.title}</h3>
            <div style={{ display:"flex", gap:"14px", flexWrap:"wrap" }}>
              <span style={{ display:"flex", alignItems:"center", gap:"4px", fontSize:"0.78rem", color:"#64748B" }}><FileText size={12}/>{offer.client}</span>
              <span style={{ display:"flex", alignItems:"center", gap:"4px", fontSize:"0.78rem", color:"#64748B" }}><Clock size={12}/>{offer.deadline}</span>
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
                <p style={{ fontSize:"0.87rem", color:"#64748B", lineHeight:1.75, marginBottom:"16px" }}>{offer.description}</p>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"16px", marginBottom:"18px" }}>
                  <div>
                    <p style={{ fontSize:"0.7rem", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em", color:"#94A3B8", margin:"0 0 8px" }}>Prérequis</p>
                    {offer.requirements.map(r => (
                      <div key={r} style={{ display:"flex", gap:"7px", alignItems:"flex-start", marginBottom:"5px" }}>
                        <div style={{ width:"5px", height:"5px", borderRadius:"50%", background:offer.color, flexShrink:0, marginTop:"6px" }} />
                        <span style={{ fontSize:"0.8rem", color:"#64748B" }}>{r}</span>
                      </div>
                    ))}
                  </div>
                  <div>
                    <p style={{ fontSize:"0.7rem", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em", color:"#94A3B8", margin:"0 0 8px" }}>Livrables attendus</p>
                    {offer.deliverables.map(d => (
                      <div key={d} style={{ display:"flex", gap:"7px", alignItems:"flex-start", marginBottom:"5px" }}>
                        <div style={{ width:"5px", height:"5px", borderRadius:"50%", background:offer.color, flexShrink:0, marginTop:"6px" }} />
                        <span style={{ fontSize:"0.8rem", color:"#64748B" }}>{d}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <button onClick={onSubmit} style={{ display:"inline-flex", alignItems:"center", gap:"8px", padding:"12px 24px", borderRadius:"10px", background:offer.color, color:"#fff", fontWeight:700, fontSize:"0.9rem", border:"none", cursor:"pointer" }}>
                  <Send size={15}/> Soumettre l&apos;offre
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

// ── Candidature spontanée ─────────────────────────────────────────────────────
function SpontaneousForm({ onSuccess }: { onSuccess: () => void }) {
  const [form, setForm] = useState({ name:"", email:"", phone:"", message:"" })
  const [cv, setCv] = useState<File|null>(null)
  const [motivation, setMotivation] = useState<File|null>(null)
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState("")
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm(f => ({ ...f, [k]: e.target.value }))

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!cv) { setErr("Votre CV est obligatoire."); return }
    if (!motivation) { setErr("La lettre de motivation est obligatoire."); return }
    setLoading(true); setErr("")
    await new Promise(r => setTimeout(r, 1200))
    setLoading(false); onSuccess()
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
      <FileField label="CV" file={cv} onPick={setCv} accept=".pdf,.doc,.docx" hint="Joindre votre CV" required color="#1E9FE8" />
      <FileField label="Lettre de motivation" file={motivation} onPick={setMotivation} accept=".pdf,.doc,.docx" hint="Joindre votre lettre de motivation" required color="#1E9FE8" />
      {err && <p style={{ fontSize:"0.82rem", color:"#DC2626", margin:0 }}>{err}</p>}
      <button type="submit" disabled={loading}
        style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"8px", padding:"13px 24px", borderRadius:"10px", background: loading ? "#94A3B8" : "#1E9FE8", color:"#fff", fontWeight:700, fontSize:"0.9rem", border:"none", cursor: loading ? "default" : "pointer" }}
      >{loading ? "Envoi en cours…" : <><Send size={15}/> Envoyer ma candidature spontanée</>}</button>
    </form>
  )
}

// ── Page principale ───────────────────────────────────────────────────────────
export default function CarrierePage() {
  const [tab, setTab] = useState<Tab>("bons-plans")
  const [applyOffer, setApplyOffer] = useState<typeof BONS_PLANS[0] | null>(null)
  const [aoOffer,    setAoOffer]    = useState<typeof APPELS_OFFRES[0] | null>(null)
  const [successCfg, setSuccessCfg] = useState<{ visible:boolean; title:string; subtitle:string }>({ visible:false, title:"", subtitle:"" })

  function showSuccess(title: string, subtitle: string) {
    setSuccessCfg({ visible:true, title, subtitle })
  }

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
        {aoOffer && (
          <AoModal key="ao" offer={aoOffer} onClose={() => setAoOffer(null)}
            onSuccess={() => showSuccess("Offre soumise !", "Votre dossier a bien été reçu. Notre équipe reviendra vers vous.")}
          />
        )}
      </AnimatePresence>

      <Navbar />
      <main>

        {/* ── Hero ──────────────────────────────────────────────────── */}
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
              Offres d&apos;emploi, stages et appels d&apos;offres — rejoignez une équipe engagée pour la transformation digitale de l&apos;Afrique.
            </motion.p>

            <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.4, delay:0.3 }}
              style={{ display:"flex", gap:"16px", justifyContent:"center", flexWrap:"wrap" }}
            >
              {[
                { Icon:Users,   val:`${BONS_PLANS.length}`,     label:"Postes ouverts"  },
                { Icon:Archive, val:`${APPELS_OFFRES.length}`,  label:"Appels d'offres" },
                { Icon:Star,    val:"Lomé",                      label:"Basé à"          },
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

        {/* ── Tabs + contenu ────────────────────────────────────────── */}
        <div style={{ background:"#f8fafc", padding:"64px 5%" }}>
          <div style={{ display:"flex", justifyContent:"center", marginBottom:"48px" }}>
            <div style={{ display:"inline-flex", background:"#fff", borderRadius:"14px", padding:"6px", boxShadow:"0 2px 16px rgba(0,0,0,0.08)", border:"1.5px solid #E2E8F0", gap:"4px" }}>
              {([
                { key:"bons-plans",    Icon:Briefcase, label:"Bons plans",      sub:`${BONS_PLANS.length} offres`      },
                { key:"appels-offres", Icon:Archive,   label:"Appels d'offres", sub:`${APPELS_OFFRES.length} en cours` },
              ] as const).map(t => (
                <button key={t.key} onClick={() => setTab(t.key)} style={{
                  display:"flex", alignItems:"center", gap:"10px", padding:"14px 28px", borderRadius:"10px",
                  border:"none", cursor:"pointer", transition:"all 0.25s", fontFamily:"inherit",
                  background: tab === t.key ? "linear-gradient(135deg,#1A3A8F,#1E9FE8)" : "transparent",
                  color: tab === t.key ? "#fff" : "#64748B",
                  boxShadow: tab === t.key ? "0 4px 20px rgba(30,159,232,0.3)" : "none",
                }}>
                  <t.Icon size={18} />
                  <div style={{ textAlign:"left" }}>
                    <p style={{ fontSize:"0.88rem", fontWeight:700, margin:0, lineHeight:1.2 }}>{t.label}</p>
                    <p style={{ fontSize:"0.7rem", margin:0, opacity: tab === t.key ? 0.75 : 0.5 }}>{t.sub}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div style={{ maxWidth:"820px", margin:"0 auto" }}>
            <AnimatePresence mode="wait">
              <motion.div key={tab} initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-8 }} transition={{ duration:0.25 }}>
                {tab === "bons-plans" && (
                  <div style={{ display:"flex", flexDirection:"column", gap:"16px" }}>
                    <p style={{ fontSize:"0.85rem", color:"#94A3B8", marginBottom:"4px" }}>{BONS_PLANS.length} opportunités disponibles · Lomé, Togo</p>
                    {BONS_PLANS.map(o => <BonPlanCard key={o.id} offer={o} onApply={() => setApplyOffer(o)} />)}
                  </div>
                )}
                {tab === "appels-offres" && (
                  <div style={{ display:"flex", flexDirection:"column", gap:"16px" }}>
                    <p style={{ fontSize:"0.85rem", color:"#94A3B8", marginBottom:"4px" }}>{APPELS_OFFRES.length} appels d&apos;offres ouverts · Dossier .zip obligatoire</p>
                    {APPELS_OFFRES.map(o => <AoCard key={o.id} offer={o} onSubmit={() => setAoOffer(o)} />)}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ── Candidature spontanée ─────────────────────────────────── */}
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
                Envoyez-nous votre CV et présentez-vous. Nous gardons les profils intéressants pour nos prochaines opportunités.
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
