"use client"

import { useEffect, useState, useRef } from "react"
import { createTender, deleteTender, fetchTenders, updateTender, uploadFile } from "@/lib/api-client"
import type { Tender } from "@/types/database"
import { Plus, Pencil, Trash2, Eye, EyeOff, Loader2, X, Save, Upload, Paperclip } from "lucide-react"

const EMPTY: Omit<Tender,"id"|"created_at"> = { ref:"", title:"", description:"", deadline:"Ouvert", document_url:null, status:"draft" }

export default function AdminAppelsOffres() {
  const [items, setItems]     = useState<Tender[]>([])
  const [loading, setLoading] = useState(true)
  const [form, setForm]       = useState<typeof EMPTY>(EMPTY)
  const [editId, setEditId]   = useState<string|null>(null)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving]     = useState(false)
  const [saveError, setSaveError] = useState("")
  const [docFile, setDocFile]   = useState<File|null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  async function load() {
    try { setItems(await fetchTenders()) } catch { setItems([]) }
    setLoading(false)
  }
  useEffect(() => { load() }, [])

  function generateRef(count: number): string {
    const year = new Date().getFullYear()
    const num = String(count + 1).padStart(3, "0")
    return `AO-${year}-${num}`
  }

  function openNew() {
    const ref = generateRef(items.length)
    setForm({ ...EMPTY, ref })
    setEditId(null); setDocFile(null); setShowForm(true)
  }
  function openEdit(t: Tender) { setForm({ref:t.ref,title:t.title,description:t.description,deadline:t.deadline,document_url:t.document_url,status:t.status}); setEditId(t.id); setDocFile(null); setShowForm(true) }

  async function save() {
    setSaving(true)
    setSaveError("")
    let document_url = form.document_url

    if (docFile) {
      try {
        document_url = await uploadFile("tender-docs", docFile)
      } catch (err) {
        setSaveError("Erreur upload : " + (err instanceof Error ? err.message : "échec"))
        setSaving(false)
        return
      }
    }

    const payload = { ...form, document_url }
    try {
      if (editId) await updateTender(editId, payload)
      else        await createTender(payload)
    } catch (err) {
      setSaveError("Erreur base de données : " + (err instanceof Error ? err.message : "échec"))
      setSaving(false)
      return
    }

    await load()
    setSaving(false)
    setShowForm(false)
  }

  async function toggleStatus(t: Tender) {
    try {
      await updateTender(t.id, { status: t.status==="published" ? "draft" : "published" })
      await load()
    } catch (err) {
      alert(err instanceof Error ? err.message : "Changement de statut impossible.")
    }
  }

  async function del(id: string) {
    if (!confirm("Supprimer cet appel d'offres ?")) return
    try { await deleteTender(id); await load() }
    catch (err) { alert(err instanceof Error ? err.message : "Suppression impossible.") }
  }

  return (
    <div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"28px" }}>
        <div>
          <h1 style={{ fontSize:"1.6rem", fontWeight:800, color:"#1A3A8F", margin:"0 0 4px" }}>Appels d&apos;offres</h1>
          <p style={{ fontSize:"0.85rem", color:"#94A3B8", margin:0 }}>{items.length} appel{items.length>1?"s":""} d&apos;offres</p>
        </div>
        <button onClick={openNew} style={{ display:"flex", alignItems:"center", gap:"8px", padding:"11px 20px", borderRadius:"10px", background:"#1A3A8F", color:"#fff", fontWeight:700, fontSize:"0.88rem", border:"none", cursor:"pointer" }}>
          <Plus size={16}/> Nouvel AO
        </button>
      </div>

      {loading ? <div style={{ textAlign:"center", padding:"48px", color:"#94A3B8" }}><Loader2 size={24} style={{ animation:"spin 1s linear infinite", display:"block", margin:"0 auto" }}/></div>
       : items.length===0 ? <p style={{ color:"#94A3B8", textAlign:"center", padding:"48px" }}>Aucun appel d&apos;offres. Créez le premier !</p>
       : (
        <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
          {items.map(t => (
            <div key={t.id} style={{ background:"#fff", borderRadius:"12px", padding:"16px 20px", border:"1.5px solid #E2E8F0", display:"flex", justifyContent:"space-between", alignItems:"center", gap:"16px" }}>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ display:"flex", gap:"8px", marginBottom:"4px", flexWrap:"wrap" }}>
                  <span style={{ fontSize:"10px", fontWeight:700, padding:"3px 8px", borderRadius:"999px", background: t.status==="published"?"#EEF2FF":"#F1F5F9", color: t.status==="published"?"#1A3A8F":"#64748B" }}>{t.ref}</span>
                  <span style={{ fontSize:"10px", fontWeight:600, color:"#94A3B8", background: t.status==="published"?"#ECFDF5":"#F1F5F9", padding:"3px 8px", borderRadius:"999px" }}>{t.status==="published"?"Publié":"Brouillon"}</span>
                </div>
                <p style={{ fontSize:"0.95rem", fontWeight:600, color:"#1A3A8F", margin:"0 0 2px", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{t.title}</p>
                <p style={{ fontSize:"0.8rem", color:"#94A3B8", margin:0 }}>Délai : {t.deadline}</p>
              </div>
              <div style={{ display:"flex", gap:"8px" }}>
                <button onClick={() => toggleStatus(t)} style={{ width:"34px", height:"34px", borderRadius:"8px", border:"1px solid #E2E8F0", background:"transparent", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color: t.status==="published"?"#1A3A8F":"#94A3B8" }}>
                  {t.status==="published" ? <Eye size={15}/> : <EyeOff size={15}/>}
                </button>
                <button onClick={() => openEdit(t)} style={{ width:"34px", height:"34px", borderRadius:"8px", border:"1px solid #E2E8F0", background:"transparent", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color:"#64748B" }}><Pencil size={15}/></button>
                <button onClick={() => del(t.id)} style={{ width:"34px", height:"34px", borderRadius:"8px", border:"1px solid #FEE2E2", background:"transparent", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color:"#EF4444" }}><Trash2 size={15}/></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div style={{ position:"fixed", inset:0, zIndex:100, display:"flex", alignItems:"center", justifyContent:"center", padding:"16px" }} onClick={e => { if (e.target===e.currentTarget) setShowForm(false) }}>
          <div style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.4)", backdropFilter:"blur(4px)" }} />
          <div style={{ position:"relative", background:"#fff", borderRadius:"20px", width:"100%", maxWidth:"580px", maxHeight:"90vh", overflowY:"auto", padding:"32px", boxShadow:"0 24px 80px rgba(0,0,0,0.15)" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"24px" }}>
              <h2 style={{ fontSize:"1.2rem", fontWeight:700, color:"#1A3A8F", margin:0 }}>{editId ? "Modifier l'AO" : "Nouvel appel d'offres"}</h2>
              <button onClick={() => setShowForm(false)} style={{ width:"32px", height:"32px", borderRadius:"8px", border:"1px solid #E2E8F0", background:"transparent", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color:"#94A3B8" }}><X size={15}/></button>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:"14px" }}>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px" }}>
                <div>
                  <label style={{ fontSize:"0.78rem", fontWeight:600, color:"#64748B", display:"block", marginBottom:"5px" }}>Référence</label>
                  <div style={{ display:"flex", alignItems:"center", gap:"8px", padding:"10px 12px", borderRadius:"8px", border:"1.5px solid #E2E8F0", background:"#F8FAFC" }}>
                    <span style={{ fontSize:"0.88rem", fontWeight:700, color:"#1A3A8F", fontFamily:"monospace" }}>{form.ref}</span>
                    <span style={{ fontSize:"10px", color:"#94A3B8", background:"#F1F5F9", padding:"2px 7px", borderRadius:"999px", marginLeft:"auto" }}>Auto</span>
                  </div>
                </div>
                <div>
                  <label style={{ fontSize:"0.78rem", fontWeight:600, color:"#64748B", display:"block", marginBottom:"5px" }}>Délai</label>
                  <input value={form.deadline} onChange={e => setForm(f=>({...f,deadline:e.target.value}))} placeholder="ex: 30/06/2025 ou Ouvert"
                    style={{ width:"100%", padding:"10px 12px", borderRadius:"8px", border:"1.5px solid #E2E8F0", fontSize:"0.88rem", fontFamily:"inherit", outline:"none", boxSizing:"border-box" }} />
                </div>
              </div>
              <div>
                <label style={{ fontSize:"0.78rem", fontWeight:600, color:"#64748B", display:"block", marginBottom:"5px" }}>Titre</label>
                <input value={form.title} onChange={e => setForm(f=>({...f,title:e.target.value}))}
                  style={{ width:"100%", padding:"10px 12px", borderRadius:"8px", border:"1.5px solid #E2E8F0", fontSize:"0.88rem", fontFamily:"inherit", outline:"none", boxSizing:"border-box" }} />
              </div>
              <div>
                <label style={{ fontSize:"0.78rem", fontWeight:600, color:"#64748B", display:"block", marginBottom:"5px" }}>Description</label>
                <textarea value={form.description} onChange={e => setForm(f=>({...f,description:e.target.value}))} rows={4}
                  style={{ width:"100%", padding:"10px 12px", borderRadius:"8px", border:"1.5px solid #E2E8F0", fontSize:"0.88rem", fontFamily:"inherit", outline:"none", resize:"vertical", boxSizing:"border-box" }} />
              </div>
              <div>
                <label style={{ fontSize:"0.78rem", fontWeight:600, color:"#64748B", display:"block", marginBottom:"5px" }}>Cahier des charges (PDF)</label>
                <div onClick={() => fileRef.current?.click()} style={{ display:"flex", alignItems:"center", gap:"10px", padding:"12px 14px", borderRadius:"8px", border:"1.5px dashed #CBD5E1", cursor:"pointer", background:"#F8FAFC" }}>
                  <Upload size={15} color="#64748B" />
                  <span style={{ fontSize:"0.84rem", color: docFile ? "#1A3A8F" : "#94A3B8" }}>
                    {docFile ? <><Paperclip size={12} style={{ display:"inline", marginRight:4 }}/>{docFile.name}</> : form.document_url ? "Remplacer le document" : "Joindre un PDF"}
                  </span>
                  <input ref={fileRef} type="file" accept=".pdf,.doc,.docx" style={{ display:"none" }} onChange={e => setDocFile(e.target.files?.[0]??null)} />
                </div>
                {form.document_url && !docFile && <p style={{ fontSize:"0.75rem", color:"#10B981", margin:"4px 0 0" }}>✓ Document actuel : <a href={form.document_url} target="_blank" rel="noopener noreferrer" style={{ color:"#10B981" }}>voir</a></p>}
              </div>
              <div>
                <label style={{ fontSize:"0.78rem", fontWeight:600, color:"#64748B", display:"block", marginBottom:"5px" }}>Statut</label>
                <select value={form.status} onChange={e => setForm(f=>({...f,status:e.target.value as "draft"|"published"}))}
                  style={{ width:"100%", padding:"10px 12px", borderRadius:"8px", border:"1.5px solid #E2E8F0", fontSize:"0.88rem", fontFamily:"inherit", outline:"none", background:"#fff" }}>
                  <option value="draft">Brouillon</option>
                  <option value="published">Publié</option>
                </select>
              </div>
              {saveError && (
                <p style={{ fontSize:"0.82rem", color:"#DC2626", background:"#FEF2F2", padding:"10px 12px", borderRadius:"8px", margin:0 }}>{saveError}</p>
              )}
              <button onClick={save} disabled={saving}
                style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"8px", padding:"12px", borderRadius:"10px", background:"#1A3A8F", color:"#fff", fontWeight:700, border:"none", cursor:saving?"not-allowed":"pointer", opacity:saving?0.75:1 }}>
                {saving ? <><Loader2 size={15} style={{ animation:"spin 1s linear infinite" }}/> Enregistrement...</> : <><Save size={15}/> Enregistrer</>}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
