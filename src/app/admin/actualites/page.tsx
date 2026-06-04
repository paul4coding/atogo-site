"use client"

import { useEffect, useState, useRef } from "react"
import { createClient } from "@/lib/supabase/client"
import type { News } from "@/types/database"
import { Plus, Pencil, Trash2, Eye, EyeOff, Loader2, X, Save, Upload, ImageIcon } from "lucide-react"

const EMPTY: Omit<News,"id"|"created_at"> = { title:"", excerpt:"", content:"", image_url:null, status:"draft", published_at:null }

export default function AdminActualites() {
  const [items, setItems]       = useState<News[]>([])
  const [loading, setLoading]   = useState(true)
  const [form, setForm]         = useState<typeof EMPTY>(EMPTY)
  const [editId, setEditId]     = useState<string|null>(null)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving]     = useState(false)
  const [imgFile, setImgFile]   = useState<File|null>(null)
  const [preview, setPreview]   = useState<string|null>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const supabase = createClient()

  async function load() {
    const { data } = await supabase.from("news").select("*").order("created_at",{ascending:false})
    setItems(data ?? []); setLoading(false)
  }
  useEffect(() => { load() }, [])

  function openNew() { setForm(EMPTY); setEditId(null); setImgFile(null); setPreview(null); setShowForm(true) }
  function openEdit(n: News) {
    setForm({title:n.title,excerpt:n.excerpt,content:n.content,image_url:n.image_url,status:n.status,published_at:n.published_at})
    setEditId(n.id); setImgFile(null); setPreview(n.image_url); setShowForm(true)
  }

  function pickFile(file: File) {
    setImgFile(file)
    setPreview(URL.createObjectURL(file))
  }

  async function save() {
    setSaving(true)
    let image_url = form.image_url

    if (imgFile) {
      const ext = imgFile.name.split(".").pop()
      const filename = `news-${Date.now()}.${ext}`
      const { error } = await supabase.storage.from("news-images").upload(filename, imgFile, { contentType: imgFile.type })
      if (!error) {
        const { data } = supabase.storage.from("news-images").getPublicUrl(filename)
        image_url = data.publicUrl
      }
    }

    const data = { ...form, image_url, published_at: form.status==="published" && !form.published_at ? new Date().toISOString() : form.published_at }
    if (editId) await supabase.from("news").update(data).eq("id",editId)
    else        await supabase.from("news").insert(data)
    await load(); setSaving(false); setShowForm(false)
  }

  async function toggleStatus(n: News) {
    await supabase.from("news").update({ status: n.status==="published"?"draft":"published", published_at: n.status==="draft" ? new Date().toISOString() : n.published_at }).eq("id",n.id)
    await load()
  }

  async function del(id: string) {
    if (!confirm("Supprimer cet article ?")) return
    await supabase.from("news").delete().eq("id",id); await load()
  }

  return (
    <div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"28px" }}>
        <div>
          <h1 style={{ fontSize:"1.6rem", fontWeight:800, color:"#1A3A8F", margin:"0 0 4px" }}>Actualités</h1>
          <p style={{ fontSize:"0.85rem", color:"#94A3B8", margin:0 }}>{items.length} article{items.length>1?"s":""}</p>
        </div>
        <button onClick={openNew} style={{ display:"flex", alignItems:"center", gap:"8px", padding:"11px 20px", borderRadius:"10px", background:"#10B981", color:"#fff", fontWeight:700, fontSize:"0.88rem", border:"none", cursor:"pointer" }}>
          <Plus size={16}/> Nouvel article
        </button>
      </div>

      {loading ? <div style={{ textAlign:"center", padding:"48px", color:"#94A3B8" }}><Loader2 size={24} style={{ animation:"spin 1s linear infinite", display:"block", margin:"0 auto" }}/></div>
       : items.length===0 ? <p style={{ color:"#94A3B8", textAlign:"center", padding:"48px" }}>Aucun article. Créez le premier !</p>
       : (
        <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
          {items.map(n => (
            <div key={n.id} style={{ background:"#fff", borderRadius:"12px", padding:"16px 20px", border:"1.5px solid #E2E8F0", display:"flex", justifyContent:"space-between", alignItems:"center", gap:"16px" }}>
              <div style={{ flex:1, minWidth:0 }}>
                <span style={{ fontSize:"10px", fontWeight:700, padding:"3px 8px", borderRadius:"999px", background: n.status==="published"?"#ECFDF5":"#F1F5F9", color: n.status==="published"?"#10B981":"#64748B", marginRight:"8px" }}>
                  {n.status==="published" ? "Publié" : "Brouillon"}
                </span>
                <p style={{ fontSize:"0.95rem", fontWeight:600, color:"#1A3A8F", margin:"6px 0 2px", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{n.title}</p>
                <p style={{ fontSize:"0.8rem", color:"#94A3B8", margin:0, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{n.excerpt}</p>
              </div>
              <div style={{ display:"flex", gap:"8px" }}>
                <button onClick={() => toggleStatus(n)} style={{ width:"34px", height:"34px", borderRadius:"8px", border:"1px solid #E2E8F0", background:"transparent", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color: n.status==="published"?"#10B981":"#94A3B8" }}>
                  {n.status==="published" ? <Eye size={15}/> : <EyeOff size={15}/>}
                </button>
                <button onClick={() => openEdit(n)} style={{ width:"34px", height:"34px", borderRadius:"8px", border:"1px solid #E2E8F0", background:"transparent", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color:"#64748B" }}><Pencil size={15}/></button>
                <button onClick={() => del(n.id)} style={{ width:"34px", height:"34px", borderRadius:"8px", border:"1px solid #FEE2E2", background:"transparent", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color:"#EF4444" }}><Trash2 size={15}/></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div style={{ position:"fixed", inset:0, zIndex:100, display:"flex", alignItems:"center", justifyContent:"center", padding:"16px" }} onClick={e => { if (e.target===e.currentTarget) setShowForm(false) }}>
          <div style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.4)", backdropFilter:"blur(4px)" }} />
          <div style={{ position:"relative", background:"#fff", borderRadius:"20px", width:"100%", maxWidth:"640px", maxHeight:"90vh", overflowY:"auto", padding:"32px", boxShadow:"0 24px 80px rgba(0,0,0,0.15)" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"24px" }}>
              <h2 style={{ fontSize:"1.2rem", fontWeight:700, color:"#1A3A8F", margin:0 }}>{editId ? "Modifier l'article" : "Nouvel article"}</h2>
              <button onClick={() => setShowForm(false)} style={{ width:"32px", height:"32px", borderRadius:"8px", border:"1px solid #E2E8F0", background:"transparent", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color:"#94A3B8" }}><X size={15}/></button>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:"14px" }}>
              <div>
                <label style={{ fontSize:"0.78rem", fontWeight:600, color:"#64748B", display:"block", marginBottom:"5px" }}>Titre</label>
                <input value={form.title} onChange={e => setForm(f=>({...f,title:e.target.value}))}
                  style={{ width:"100%", padding:"10px 12px", borderRadius:"8px", border:"1.5px solid #E2E8F0", fontSize:"0.88rem", fontFamily:"inherit", outline:"none", boxSizing:"border-box" }} />
              </div>
              <div>
                <label style={{ fontSize:"0.78rem", fontWeight:600, color:"#64748B", display:"block", marginBottom:"5px" }}>Extrait / Résumé</label>
                <textarea value={form.excerpt} onChange={e => setForm(f=>({...f,excerpt:e.target.value}))} rows={2}
                  style={{ width:"100%", padding:"10px 12px", borderRadius:"8px", border:"1.5px solid #E2E8F0", fontSize:"0.88rem", fontFamily:"inherit", outline:"none", resize:"vertical", boxSizing:"border-box" }} />
              </div>
              <div>
                <label style={{ fontSize:"0.78rem", fontWeight:600, color:"#64748B", display:"block", marginBottom:"5px" }}>Contenu complet</label>
                <textarea value={form.content} onChange={e => setForm(f=>({...f,content:e.target.value}))} rows={6}
                  style={{ width:"100%", padding:"10px 12px", borderRadius:"8px", border:"1.5px solid #E2E8F0", fontSize:"0.88rem", fontFamily:"inherit", outline:"none", resize:"vertical", boxSizing:"border-box" }} />
              </div>
              <div>
                <label style={{ fontSize:"0.78rem", fontWeight:600, color:"#64748B", display:"block", marginBottom:"5px" }}>Image (optionnel)</label>
                {preview && (
                  <div style={{ position:"relative", marginBottom:"8px", borderRadius:"8px", overflow:"hidden", height:"160px", background:"#F1F5F9" }}>
                    <img src={preview} alt="Aperçu" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                    <button onClick={() => { setImgFile(null); setPreview(null); setForm(f=>({...f,image_url:null})) }}
                      style={{ position:"absolute", top:"8px", right:"8px", width:"26px", height:"26px", borderRadius:"50%", background:"rgba(0,0,0,0.5)", border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff" }}>
                      <X size={12}/>
                    </button>
                  </div>
                )}
                <div onClick={() => fileRef.current?.click()}
                  style={{ display:"flex", alignItems:"center", gap:"10px", padding:"12px 14px", borderRadius:"8px", border:"1.5px dashed #CBD5E1", cursor:"pointer", background:"#F8FAFC" }}>
                  {preview ? <ImageIcon size={15} color="#10B981"/> : <Upload size={15} color="#94A3B8"/>}
                  <span style={{ fontSize:"0.84rem", color: preview ? "#10B981" : "#94A3B8", fontWeight: preview ? 600 : 400 }}>
                    {preview ? "Changer l'image" : "Sélectionner une image (JPG, PNG, WebP)"}
                  </span>
                  <input ref={fileRef} type="file" accept="image/*" style={{ display:"none" }} onChange={e => e.target.files?.[0] && pickFile(e.target.files[0])} />
                </div>
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
                style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"8px", padding:"12px", borderRadius:"10px", background:"#10B981", color:"#fff", fontWeight:700, border:"none", cursor:saving?"not-allowed":"pointer", opacity:saving?0.75:1 }}>
                {saving ? <><Loader2 size={15} style={{ animation:"spin 1s linear infinite" }}/> Enregistrement...</> : <><Save size={15}/> Enregistrer</>}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
