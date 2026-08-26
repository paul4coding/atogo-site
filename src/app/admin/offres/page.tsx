"use client"

import { useEffect, useState } from "react"
import { createJobOffer, deleteJobOffer, fetchJobOffers, updateJobOffer } from "@/lib/api-client"
import type { JobOffer } from "@/types/database"
import { Plus, Pencil, Trash2, Eye, EyeOff, Loader2, X, Save } from "lucide-react"

const EMPTY: Omit<JobOffer,"id"|"created_at"|"updated_at"> = {
  title:"", department:"", contract_type:"CDI", location:"Lomé, Togo", description:"", requirements:[], status:"draft"
}

export default function AdminOffres() {
  const [offers, setOffers]   = useState<JobOffer[]>([])
  const [loading, setLoading] = useState(true)
  const [form, setForm]       = useState<typeof EMPTY>(EMPTY)
  const [editId, setEditId]   = useState<string|null>(null)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving]   = useState(false)
  const [reqInput, setReqInput] = useState("")

  async function load() {
    try { setOffers(await fetchJobOffers()) } catch { setOffers([]) }
    setLoading(false)
  }
  useEffect(() => { load() }, [])

  function openNew() { setForm(EMPTY); setEditId(null); setReqInput(""); setShowForm(true) }
  function openEdit(o: JobOffer) { setForm({title:o.title,department:o.department,contract_type:o.contract_type,location:o.location,description:o.description,requirements:o.requirements,status:o.status}); setEditId(o.id); setReqInput(""); setShowForm(true) }

  async function save() {
    setSaving(true)
    try {
      // `updated_at` est désormais posé par le serveur (now()), pas par le client.
      if (editId) await updateJobOffer(editId, form)
      else        await createJobOffer(form)
      await load()
      setShowForm(false)
    } catch (err) {
      alert(err instanceof Error ? err.message : "Enregistrement impossible.")
    }
    setSaving(false)
  }

  async function toggleStatus(o: JobOffer) {
    try {
      await updateJobOffer(o.id, { status: o.status==="published" ? "draft" : "published" })
      await load()
    } catch (err) {
      alert(err instanceof Error ? err.message : "Changement de statut impossible.")
    }
  }

  async function del(id: string) {
    if (!confirm("Supprimer cette offre ?")) return
    try { await deleteJobOffer(id); await load() }
    catch (err) { alert(err instanceof Error ? err.message : "Suppression impossible.") }
  }

  function addReq() {
    if (!reqInput.trim()) return
    setForm(f => ({ ...f, requirements:[...f.requirements, reqInput.trim()] }))
    setReqInput("")
  }

  return (
    <div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"28px" }}>
        <div>
          <h1 style={{ fontSize:"1.6rem", fontWeight:800, color:"#1A3A8F", margin:"0 0 4px" }}>Offres d&apos;emploi</h1>
          <p style={{ fontSize:"0.85rem", color:"#94A3B8", margin:0 }}>{offers.length} offre{offers.length>1?"s":""}</p>
        </div>
        <button onClick={openNew} style={{ display:"flex", alignItems:"center", gap:"8px", padding:"11px 20px", borderRadius:"10px", background:"#1E9FE8", color:"#fff", fontWeight:700, fontSize:"0.88rem", border:"none", cursor:"pointer" }}>
          <Plus size={16}/> Nouvelle offre
        </button>
      </div>

      {loading ? <div style={{ textAlign:"center", padding:"48px", color:"#94A3B8" }}><Loader2 size={24} style={{ animation:"spin 1s linear infinite", display:"block", margin:"0 auto" }}/></div>
       : offers.length === 0 ? <p style={{ color:"#94A3B8", textAlign:"center", padding:"48px" }}>Aucune offre. Créez la première !</p>
       : (
        <div style={{ display:"flex", flexDirection:"column", gap:"12px" }}>
          {offers.map(o => (
            <div key={o.id} style={{ background:"#fff", borderRadius:"12px", padding:"18px 20px", border:"1.5px solid #E2E8F0", display:"flex", justifyContent:"space-between", alignItems:"center", gap:"16px" }}>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"4px", flexWrap:"wrap" }}>
                  <span style={{ fontSize:"10px", fontWeight:700, padding:"3px 8px", borderRadius:"999px", background: o.status==="published" ? "#ECFDF5" : "#F1F5F9", color: o.status==="published" ? "#10B981" : "#64748B" }}>
                    {o.status==="published" ? "Publié" : "Brouillon"}
                  </span>
                  <span style={{ fontSize:"0.75rem", color:"#94A3B8" }}>{o.contract_type} · {o.department}</span>
                </div>
                <p style={{ fontSize:"0.95rem", fontWeight:600, color:"#1A3A8F", margin:0, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{o.title}</p>
              </div>
              <div style={{ display:"flex", gap:"8px", flexShrink:0 }}>
                <button onClick={() => toggleStatus(o)} title={o.status==="published"?"Dépublier":"Publier"} style={{ width:"34px", height:"34px", borderRadius:"8px", border:"1px solid #E2E8F0", background:"transparent", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color: o.status==="published" ? "#10B981" : "#94A3B8" }}>
                  {o.status==="published" ? <Eye size={15}/> : <EyeOff size={15}/>}
                </button>
                <button onClick={() => openEdit(o)} style={{ width:"34px", height:"34px", borderRadius:"8px", border:"1px solid #E2E8F0", background:"transparent", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color:"#64748B" }}><Pencil size={15}/></button>
                <button onClick={() => del(o.id)} style={{ width:"34px", height:"34px", borderRadius:"8px", border:"1px solid #FEE2E2", background:"transparent", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color:"#EF4444" }}><Trash2 size={15}/></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal formulaire */}
      {showForm && (
        <div style={{ position:"fixed", inset:0, zIndex:100, display:"flex", alignItems:"center", justifyContent:"center", padding:"16px" }} onClick={e => { if (e.target===e.currentTarget) setShowForm(false) }}>
          <div style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.4)", backdropFilter:"blur(4px)" }} />
          <div style={{ position:"relative", background:"#fff", borderRadius:"20px", width:"100%", maxWidth:"600px", maxHeight:"90vh", overflowY:"auto", padding:"32px", boxShadow:"0 24px 80px rgba(0,0,0,0.15)" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"24px" }}>
              <h2 style={{ fontSize:"1.2rem", fontWeight:700, color:"#1A3A8F", margin:0 }}>{editId ? "Modifier l'offre" : "Nouvelle offre d'emploi"}</h2>
              <button onClick={() => setShowForm(false)} style={{ width:"32px", height:"32px", borderRadius:"8px", border:"1px solid #E2E8F0", background:"transparent", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color:"#94A3B8" }}><X size={15}/></button>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:"14px" }}>
              {(["title","department","contract_type","location"] as const).map(k => (
                <div key={k}>
                  <label style={{ fontSize:"0.78rem", fontWeight:600, color:"#64748B", display:"block", marginBottom:"5px", textTransform:"capitalize" }}>{k.replace("_"," ")}</label>
                  <input value={form[k]} onChange={e => setForm(f=>({...f,[k]:e.target.value}))}
                    style={{ width:"100%", padding:"10px 12px", borderRadius:"8px", border:"1.5px solid #E2E8F0", fontSize:"0.88rem", fontFamily:"inherit", outline:"none", boxSizing:"border-box" }} />
                </div>
              ))}
              <div>
                <label style={{ fontSize:"0.78rem", fontWeight:600, color:"#64748B", display:"block", marginBottom:"5px" }}>Description</label>
                <textarea value={form.description} onChange={e => setForm(f=>({...f,description:e.target.value}))} rows={4}
                  style={{ width:"100%", padding:"10px 12px", borderRadius:"8px", border:"1.5px solid #E2E8F0", fontSize:"0.88rem", fontFamily:"inherit", outline:"none", resize:"vertical", boxSizing:"border-box" }} />
              </div>
              <div>
                <label style={{ fontSize:"0.78rem", fontWeight:600, color:"#64748B", display:"block", marginBottom:"5px" }}>Profil recherché</label>
                <div style={{ display:"flex", gap:"8px", marginBottom:"8px" }}>
                  <input value={reqInput} onChange={e => setReqInput(e.target.value)} onKeyDown={e => e.key==="Enter" && (e.preventDefault(), addReq())} placeholder="Ajouter un critère (Enter)"
                    style={{ flex:1, padding:"9px 12px", borderRadius:"8px", border:"1.5px solid #E2E8F0", fontSize:"0.88rem", fontFamily:"inherit", outline:"none" }} />
                  <button onClick={addReq} style={{ padding:"9px 14px", borderRadius:"8px", background:"#1E9FE8", color:"#fff", fontWeight:700, fontSize:"0.82rem", border:"none", cursor:"pointer" }}>Ajouter</button>
                </div>
                {form.requirements.map((r,i) => (
                  <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"6px 10px", borderRadius:"6px", background:"#F8FAFC", marginBottom:"4px" }}>
                    <span style={{ fontSize:"0.82rem", color:"#475569" }}>{r}</span>
                    <button onClick={() => setForm(f=>({...f,requirements:f.requirements.filter((_,j)=>j!==i)}))} style={{ background:"none", border:"none", cursor:"pointer", color:"#EF4444", padding:0 }}><X size={13}/></button>
                  </div>
                ))}
              </div>
              <div>
                <label style={{ fontSize:"0.78rem", fontWeight:600, color:"#64748B", display:"block", marginBottom:"5px" }}>Statut</label>
                <select value={form.status} onChange={e => setForm(f=>({...f,status:e.target.value as "draft"|"published"}))}
                  style={{ width:"100%", padding:"10px 12px", borderRadius:"8px", border:"1.5px solid #E2E8F0", fontSize:"0.88rem", fontFamily:"inherit", outline:"none", background:"#fff" }}>
                  <option value="draft">Brouillon</option>
                  <option value="published">Publié</option>
                </select>
              </div>
              <button onClick={save} disabled={saving}
                style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"8px", padding:"12px", borderRadius:"10px", background:"#1A3A8F", color:"#fff", fontWeight:700, border:"none", cursor: saving?"not-allowed":"pointer", opacity:saving?0.75:1 }}>
                {saving ? <><Loader2 size={15} style={{ animation:"spin 1s linear infinite" }}/> Enregistrement...</> : <><Save size={15}/> Enregistrer</>}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
