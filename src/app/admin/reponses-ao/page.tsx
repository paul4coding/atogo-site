"use client"

import { useEffect, useState } from "react"
import { fetchTenderResponses } from "@/lib/api-client"
import { openPrivateFile } from "@/lib/open-file"
import type { TenderResponse } from "@/types/database"
import { Loader2, FileDown, ChevronDown, ChevronUp } from "lucide-react"

export default function AdminReponsesAO() {
  const [items, setItems]     = useState<TenderResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen]       = useState<string|null>(null)

  useEffect(() => {
    fetchTenderResponses()
      .then(setItems)
      .catch(() => setItems([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <div style={{ marginBottom:"28px" }}>
        <h1 style={{ fontSize:"1.6rem", fontWeight:800, color:"#1A3A8F", margin:"0 0 4px" }}>Réponses aux appels d&apos;offres</h1>
        <p style={{ fontSize:"0.85rem", color:"#94A3B8", margin:0 }}>{items.length} réponse{items.length>1?"s":""} reçue{items.length>1?"s":""}</p>
      </div>

      {loading ? <div style={{ textAlign:"center", padding:"48px", color:"#94A3B8" }}><Loader2 size={24} style={{ animation:"spin 1s linear infinite", display:"block", margin:"0 auto" }}/></div>
       : items.length===0 ? <p style={{ color:"#94A3B8", textAlign:"center", padding:"48px" }}>Aucune réponse reçue.</p>
       : (
        <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
          {items.map(item => {
            const tender = (item as TenderResponse & {tenders?:{title:string;ref:string}|null}).tenders
            return (
              <div key={item.id} style={{ background:"#fff", borderRadius:"12px", border:"1.5px solid #E2E8F0", overflow:"hidden" }}>
                <div style={{ padding:"16px 20px", display:"flex", justifyContent:"space-between", alignItems:"center", gap:"12px", cursor:"pointer" }} onClick={() => setOpen(open===item.id ? null : item.id)}>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ display:"flex", gap:"8px", alignItems:"center", marginBottom:"4px" }}>
                      {tender && <span style={{ fontSize:"10px", fontWeight:700, padding:"3px 8px", borderRadius:"999px", background:"#EEF2FF", color:"#1A3A8F" }}>{tender.ref}</span>}
                      <span style={{ fontSize:"0.75rem", color:"#94A3B8" }}>{new Date(item.created_at).toLocaleDateString("fr-FR", { day:"numeric", month:"short", year:"numeric" })}</span>
                    </div>
                    <p style={{ fontSize:"0.95rem", fontWeight:600, color:"#1A3A8F", margin:"0 0 2px" }}>{item.company_name}</p>
                    <p style={{ fontSize:"0.8rem", color:"#94A3B8", margin:0 }}>{item.contact_name} · {item.email}</p>
                  </div>
                  <div style={{ display:"flex", gap:"8px", alignItems:"center" }}>
                    {item.document_url && (
                      <button onClick={e => { e.stopPropagation(); openPrivateFile(item.document_url) }} style={{ padding:"6px 12px", borderRadius:"7px", background:"#F8FAFC", border:"1px solid #E2E8F0", color:"#64748B", fontSize:"0.78rem", fontWeight:600, cursor:"pointer", display:"flex", alignItems:"center", gap:"5px", fontFamily:"inherit" }}>
                        <FileDown size={13}/> Proforma
                      </button>
                    )}
                    {open===item.id ? <ChevronUp size={16} color="#94A3B8"/> : <ChevronDown size={16} color="#94A3B8"/>}
                  </div>
                </div>

                {open===item.id && (
                  <div style={{ padding:"0 20px 20px", borderTop:"1px solid #F1F5F9" }}>
                    {tender && <p style={{ fontSize:"0.82rem", color:"#64748B", margin:"14px 0 4px", fontWeight:600 }}>AO : {tender.title}</p>}
                    {item.phone && <p style={{ fontSize:"0.83rem", color:"#64748B", margin:"8px 0" }}>📞 {item.phone}</p>}
                    {item.message && (
                      <>
                        <p style={{ fontSize:"0.78rem", fontWeight:600, color:"#94A3B8", margin:"12px 0 6px", textTransform:"uppercase", letterSpacing:"0.08em" }}>Message</p>
                        <p style={{ fontSize:"0.85rem", color:"#475569", lineHeight:1.75, whiteSpace:"pre-wrap", background:"#F8FAFC", padding:"14px", borderRadius:"8px", margin:0 }}>{item.message}</p>
                      </>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
