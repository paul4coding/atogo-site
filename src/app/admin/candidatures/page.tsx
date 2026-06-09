"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { openPrivateFile } from "@/lib/supabase/signed-url"
import type { Application } from "@/types/database"
import { Loader2, FileDown, ChevronDown, ChevronUp } from "lucide-react"

const STATUS_LABELS = { pending:"En attente", reviewed:"Examiné", accepted:"Accepté", rejected:"Refusé" }
const STATUS_COLORS = { pending:"#F59E0B", reviewed:"#1E9FE8", accepted:"#10B981", rejected:"#EF4444" }
const STATUS_BG    = { pending:"#FFFBEB", reviewed:"#EFF9FF", accepted:"#ECFDF5", rejected:"#FEF2F2" }

export default function AdminCandidatures() {
  const [items, setItems]     = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen]       = useState<string|null>(null)
  const [filter, setFilter]   = useState<"all"|"application"|"spontaneous">("all")
  const [toast, setToast]     = useState<{msg:string; ok:boolean} | null>(null)
  const supabase = createClient()

  function showToast(msg: string, ok = true) {
    setToast({ msg, ok })
    setTimeout(() => setToast(null), 3500)
  }

  async function load() {
    const { data } = await supabase
      .from("applications")
      .select("*, job_offers(title)")
      .order("created_at",{ascending:false})
    setItems(data as Application[] ?? [])
    setLoading(false)
  }
  useEffect(() => { load() }, [])

  async function updateStatus(id: string, status: Application["status"], item: Application) {
    await supabase.from("applications").update({ status }).eq("id", id)
    await load()

    // Envoyer l'email de notification
    const jobTitle = (item as Application & {job_offers?:{title:string}|null}).job_offers?.title ?? null
    const res = await fetch("/api/admin/notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: item.name, email: item.email, status, jobTitle }),
    })
    if (res.ok) {
      showToast(`Email envoyé à ${item.email}`)
    } else {
      const data = await res.json().catch(() => ({}))
      showToast(`Email non envoyé : ${data.error ?? "erreur inconnue"}`, false)
    }
  }

  const filtered = filter === "all" ? items : items.filter(i => i.type === filter)

  return (
    <div>
      {/* Toast notification */}
      {toast && (
        <div style={{ position:"fixed", top:"24px", right:"24px", zIndex:999, padding:"14px 20px", borderRadius:"12px", background: toast.ok ? "#ECFDF5" : "#FEF2F2", border:`1.5px solid ${toast.ok ? "#6EE7B7" : "#FCA5A5"}`, color: toast.ok ? "#065F46" : "#991B1B", fontSize:"0.875rem", fontWeight:600, boxShadow:"0 8px 24px rgba(0,0,0,0.1)", display:"flex", alignItems:"center", gap:"8px" }}>
          <span>{toast.ok ? "✓" : "⚠"}</span> {toast.msg}
        </div>
      )}

      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"28px", flexWrap:"wrap", gap:"12px" }}>
        <div>
          <h1 style={{ fontSize:"1.6rem", fontWeight:800, color:"#1A3A8F", margin:"0 0 4px" }}>Candidatures</h1>
          <p style={{ fontSize:"0.85rem", color:"#94A3B8", margin:0 }}>{items.length} reçue{items.length>1?"s":""}</p>
        </div>
        <div style={{ display:"flex", gap:"8px" }}>
          {(["all","application","spontaneous"] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{ padding:"8px 16px", borderRadius:"8px", border:"1.5px solid", borderColor: filter===f ? "#1E9FE8" : "#E2E8F0", background: filter===f ? "#EFF9FF" : "#fff", color: filter===f ? "#1E9FE8" : "#64748B", fontWeight:600, fontSize:"0.82rem", cursor:"pointer" }}>
              {f==="all" ? "Toutes" : f==="application" ? "Sur offre" : "Spontanées"}
            </button>
          ))}
        </div>
      </div>

      {loading ? <div style={{ textAlign:"center", padding:"48px", color:"#94A3B8" }}><Loader2 size={24} style={{ animation:"spin 1s linear infinite", display:"block", margin:"0 auto" }}/></div>
       : filtered.length === 0 ? <p style={{ color:"#94A3B8", textAlign:"center", padding:"48px" }}>Aucune candidature.</p>
       : (
        <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
          {filtered.map(item => (
            <div key={item.id} style={{ background:"#fff", borderRadius:"12px", border:"1.5px solid #E2E8F0", overflow:"hidden" }}>
              <div style={{ padding:"16px 20px", display:"flex", justifyContent:"space-between", alignItems:"center", gap:"12px", cursor:"pointer" }} onClick={() => setOpen(open===item.id ? null : item.id)}>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ display:"flex", gap:"8px", alignItems:"center", marginBottom:"4px", flexWrap:"wrap" }}>
                    <span style={{ fontSize:"10px", fontWeight:700, padding:"3px 8px", borderRadius:"999px", background: STATUS_BG[item.status], color: STATUS_COLORS[item.status] }}>{STATUS_LABELS[item.status]}</span>
                    <span style={{ fontSize:"10px", fontWeight:600, color:"#94A3B8", background:"#F1F5F9", padding:"3px 8px", borderRadius:"999px" }}>
                      {item.type==="spontaneous" ? "Spontanée" : `Offre: ${(item as Application & {job_offers?:{title:string}|null}).job_offers?.title ?? "—"}`}
                    </span>
                  </div>
                  <p style={{ fontSize:"0.95rem", fontWeight:600, color:"#1A3A8F", margin:"0 0 2px" }}>{item.name}</p>
                  <p style={{ fontSize:"0.8rem", color:"#94A3B8", margin:0 }}>{item.email} · {new Date(item.created_at).toLocaleDateString("fr-FR")}</p>
                </div>
                <div style={{ display:"flex", gap:"8px", alignItems:"center" }}>
                  {item.cv_url && (
                    <button onClick={e => { e.stopPropagation(); openPrivateFile(item.cv_url) }} style={{ padding:"6px 12px", borderRadius:"7px", background:"#F8FAFC", border:"1px solid #E2E8F0", color:"#64748B", fontSize:"0.78rem", fontWeight:600, cursor:"pointer", display:"flex", alignItems:"center", gap:"5px", fontFamily:"inherit" }}>
                      <FileDown size={13}/> CV
                    </button>
                  )}
                  {(item as Application & {motivation_url?:string|null}).motivation_url && (
                    <button onClick={e => { e.stopPropagation(); openPrivateFile((item as Application & {motivation_url?:string|null}).motivation_url!) }} style={{ padding:"6px 12px", borderRadius:"7px", background:"#EFF9FF", border:"1px solid #BAE6FD", color:"#0369A1", fontSize:"0.78rem", fontWeight:600, cursor:"pointer", display:"flex", alignItems:"center", gap:"5px", fontFamily:"inherit" }}>
                      <FileDown size={13}/> Lettre
                    </button>
                  )}
                  {open===item.id ? <ChevronUp size={16} color="#94A3B8"/> : <ChevronDown size={16} color="#94A3B8"/>}
                </div>
              </div>

              {open===item.id && (
                <div style={{ padding:"0 20px 20px", borderTop:"1px solid #F1F5F9" }}>
                  <p style={{ fontSize:"0.82rem", fontWeight:600, color:"#64748B", margin:"16px 0 6px" }}>Lettre de motivation</p>
                  <p style={{ fontSize:"0.85rem", color:"#475569", lineHeight:1.75, whiteSpace:"pre-wrap", background:"#F8FAFC", padding:"14px", borderRadius:"8px", margin:"0 0 16px" }}>{item.cover_letter}</p>
                  {item.phone && <p style={{ fontSize:"0.82rem", color:"#64748B", margin:"0 0 16px" }}>📞 {item.phone}</p>}
                  <div style={{ display:"flex", gap:"8px", flexWrap:"wrap" }}>
                    <p style={{ fontSize:"0.78rem", fontWeight:600, color:"#64748B", margin:"0 0 6px 0", width:"100%" }}>Changer le statut :</p>
                    {(Object.keys(STATUS_LABELS) as Array<Application["status"]>).map(s => (
                      <button key={s} onClick={() => updateStatus(item.id, s, item)}
                        style={{ padding:"7px 14px", borderRadius:"7px", border:"1.5px solid", borderColor: item.status===s ? STATUS_COLORS[s] : "#E2E8F0", background: item.status===s ? STATUS_BG[s] : "#fff", color: item.status===s ? STATUS_COLORS[s] : "#64748B", fontSize:"0.78rem", fontWeight:600, cursor:"pointer" }}>
                        {STATUS_LABELS[s]}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
