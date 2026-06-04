"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Plus, Trash2, GripVertical, Loader2, Save, X, ToggleLeft, ToggleRight } from "lucide-react"

interface Domain {
  id: string
  label: string
  color: string
  active: boolean
  sort_order: number
  created_at: string
}

const PRESET_COLORS = ["#1E9FE8","#10B981","#F59E0B","#EF4444","#7C3AED","#0891B2","#1A3A8F","#F97316","#EC4899","#6366F1"]

export default function AdminDomaines() {
  const [items, setItems]       = useState<Domain[]>([])
  const [loading, setLoading]   = useState(true)
  const [saving, setSaving]     = useState<string|null>(null)
  const [showAdd, setShowAdd]   = useState(false)
  const [newLabel, setNewLabel] = useState("")
  const [newColor, setNewColor] = useState("#1E9FE8")
  const [adding, setAdding]     = useState(false)
  const supabase = createClient()

  async function load() {
    const { data } = await supabase.from("domains").select("*").order("sort_order")
    setItems(data ?? [])
    setLoading(false)
  }
  useEffect(() => { load() }, [])

  async function toggleActive(d: Domain) {
    setSaving(d.id)
    await supabase.from("domains").update({ active: !d.active }).eq("id", d.id)
    await load()
    setSaving(null)
  }

  async function del(d: Domain) {
    if (!confirm(`Supprimer "${d.label}" ?`)) return
    setSaving(d.id)
    await supabase.from("domains").delete().eq("id", d.id)
    await load()
    setSaving(null)
  }

  async function add() {
    if (!newLabel.trim()) return
    setAdding(true)
    await supabase.from("domains").insert({
      label: newLabel.trim(),
      color: newColor,
      active: true,
      sort_order: items.length + 1,
    })
    setNewLabel(""); setNewColor("#1E9FE8"); setShowAdd(false)
    await load()
    setAdding(false)
  }

  async function updateColor(id: string, color: string) {
    await supabase.from("domains").update({ color }).eq("id", id)
    setItems(prev => prev.map(d => d.id === id ? { ...d, color } : d))
  }

  return (
    <div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"28px" }}>
        <div>
          <h1 style={{ fontSize:"1.6rem", fontWeight:800, color:"#1A3A8F", margin:"0 0 4px" }}>Domaines d&apos;intérêt</h1>
          <p style={{ fontSize:"0.85rem", color:"#94A3B8", margin:0 }}>Affiché sur la page Carrière — Candidature spontanée</p>
        </div>
        <button onClick={() => setShowAdd(true)} style={{ display:"flex", alignItems:"center", gap:"8px", padding:"11px 20px", borderRadius:"10px", background:"#7C3AED", color:"#fff", fontWeight:700, fontSize:"0.88rem", border:"none", cursor:"pointer" }}>
          <Plus size={16}/> Nouveau domaine
        </button>
      </div>

      {/* Formulaire ajout */}
      {showAdd && (
        <div style={{ background:"#fff", borderRadius:"16px", padding:"24px", border:"1.5px solid #E2E8F0", marginBottom:"20px", boxShadow:"0 4px 20px rgba(0,0,0,0.06)" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"20px" }}>
            <h3 style={{ fontSize:"1rem", fontWeight:700, color:"#1A3A8F", margin:0 }}>Nouveau domaine</h3>
            <button onClick={() => setShowAdd(false)} style={{ background:"none", border:"none", cursor:"pointer", color:"#94A3B8" }}><X size={16}/></button>
          </div>
          <div style={{ display:"flex", gap:"12px", flexWrap:"wrap", alignItems:"flex-end" }}>
            <div style={{ flex:1, minWidth:"200px" }}>
              <label style={{ fontSize:"0.78rem", fontWeight:600, color:"#64748B", display:"block", marginBottom:"6px" }}>Nom du domaine</label>
              <input value={newLabel} onChange={e => setNewLabel(e.target.value)} onKeyDown={e => e.key==="Enter" && add()}
                placeholder="ex: Intelligence Artificielle"
                style={{ width:"100%", padding:"10px 12px", borderRadius:"8px", border:"1.5px solid #E2E8F0", fontSize:"0.88rem", fontFamily:"inherit", outline:"none", boxSizing:"border-box" }} />
            </div>
            <div>
              <label style={{ fontSize:"0.78rem", fontWeight:600, color:"#64748B", display:"block", marginBottom:"6px" }}>Couleur</label>
              <div style={{ display:"flex", gap:"6px", flexWrap:"wrap" }}>
                {PRESET_COLORS.map(c => (
                  <button key={c} onClick={() => setNewColor(c)}
                    style={{ width:"28px", height:"28px", borderRadius:"50%", background:c, border: newColor===c ? "3px solid #1A3A8F" : "2px solid transparent", cursor:"pointer", transition:"transform 0.15s", transform: newColor===c ? "scale(1.2)" : "scale(1)" }} />
                ))}
              </div>
            </div>
            <button onClick={add} disabled={adding || !newLabel.trim()}
              style={{ padding:"10px 20px", borderRadius:"8px", background:"#7C3AED", color:"#fff", fontWeight:700, fontSize:"0.88rem", border:"none", cursor: adding||!newLabel.trim() ? "not-allowed" : "pointer", opacity: adding||!newLabel.trim() ? 0.6 : 1, display:"flex", alignItems:"center", gap:"6px" }}>
              {adding ? <Loader2 size={14} style={{ animation:"spin 1s linear infinite" }}/> : <Save size={14}/>}
              Ajouter
            </button>
          </div>
          {/* Aperçu */}
          {newLabel && (
            <div style={{ marginTop:"16px", paddingTop:"16px", borderTop:"1px solid #F1F5F9" }}>
              <p style={{ fontSize:"0.75rem", color:"#94A3B8", marginBottom:"8px" }}>Aperçu :</p>
              <div style={{ display:"inline-flex", alignItems:"center", gap:"8px" }}>
                <div style={{ width:"8px", height:"8px", borderRadius:"50%", background:newColor }} />
                <span style={{ fontSize:"0.88rem", color:"#475569", fontWeight:500 }}>{newLabel}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Liste */}
      {loading ? (
        <div style={{ textAlign:"center", padding:"48px" }}><Loader2 size={24} color="#94A3B8" style={{ animation:"spin 1s linear infinite", display:"block", margin:"0 auto" }}/></div>
      ) : (
        <div style={{ display:"flex", flexDirection:"column", gap:"8px" }}>
          {items.map(d => (
            <div key={d.id} style={{ background:"#fff", borderRadius:"12px", padding:"14px 18px", border:`1.5px solid ${d.active ? "#E2E8F0" : "#F1F5F9"}`, display:"flex", alignItems:"center", gap:"14px", opacity: d.active ? 1 : 0.55, transition:"all 0.2s" }}>
              <GripVertical size={16} color="#CBD5E1" style={{ flexShrink:0, cursor:"grab" }} />

              {/* Couleur */}
              <div style={{ position:"relative", flexShrink:0 }}>
                <div style={{ width:"20px", height:"20px", borderRadius:"50%", background:d.color, border:"2px solid rgba(0,0,0,0.08)" }} />
              </div>

              {/* Label */}
              <p style={{ flex:1, fontSize:"0.92rem", fontWeight:600, color: d.active ? "#1A3A8F" : "#94A3B8", margin:0 }}>{d.label}</p>

              {/* Couleurs rapides */}
              <div style={{ display:"flex", gap:"4px" }}>
                {PRESET_COLORS.slice(0,5).map(c => (
                  <button key={c} onClick={() => updateColor(d.id, c)}
                    style={{ width:"18px", height:"18px", borderRadius:"50%", background:c, border: d.color===c ? "2px solid #1A3A8F" : "1px solid transparent", cursor:"pointer" }} />
                ))}
              </div>

              {/* Toggle actif */}
              <button onClick={() => toggleActive(d)} disabled={saving===d.id}
                style={{ display:"flex", alignItems:"center", gap:"6px", padding:"6px 12px", borderRadius:"8px", border:"1px solid", borderColor: d.active ? "#BBF7D0" : "#E2E8F0", background: d.active ? "#ECFDF5" : "#F8FAFC", color: d.active ? "#059669" : "#94A3B8", fontWeight:600, fontSize:"0.78rem", cursor:"pointer", transition:"all 0.2s" }}>
                {saving===d.id ? <Loader2 size={13} style={{ animation:"spin 1s linear infinite" }}/> : d.active ? <ToggleRight size={15}/> : <ToggleLeft size={15}/>}
                {d.active ? "Actif" : "Masqué"}
              </button>

              <button onClick={() => del(d)} disabled={saving===d.id}
                style={{ width:"32px", height:"32px", borderRadius:"8px", border:"1px solid #FEE2E2", background:"transparent", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color:"#EF4444", flexShrink:0 }}>
                <Trash2 size={14}/>
              </button>
            </div>
          ))}

          {items.length === 0 && (
            <div style={{ textAlign:"center", padding:"48px", color:"#94A3B8" }}>
              <p>Aucun domaine. Cliquez sur "Nouveau domaine" pour commencer.</p>
            </div>
          )}
        </div>
      )}

      <div style={{ marginTop:"20px", padding:"14px 18px", borderRadius:"10px", background:"#F8FAFC", border:"1px solid #E2E8F0" }}>
        <p style={{ fontSize:"0.82rem", color:"#64748B", margin:0 }}>
          💡 Les domaines <strong>masqués</strong> ne s&apos;affichent plus sur la page Carrière mais restent dans la base de données. Les domaines <strong>actifs</strong> sont visibles par tous les visiteurs.
        </p>
      </div>
    </div>
  )
}
