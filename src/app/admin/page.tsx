"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Briefcase, Users, Newspaper, FileText, MessageSquare, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  const [stats, setStats] = useState({ offers:0, applications:0, news:0, tenders:0, responses:0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()
    Promise.all([
      supabase.from("job_offers").select("id", { count:"exact", head:true }),
      supabase.from("applications").select("id", { count:"exact", head:true }),
      supabase.from("news").select("id", { count:"exact", head:true }),
      supabase.from("tenders").select("id", { count:"exact", head:true }),
      supabase.from("tender_responses").select("id", { count:"exact", head:true }),
    ]).then(([o, a, n, t, r]) => {
      setStats({ offers: o.count??0, applications: a.count??0, news: n.count??0, tenders: t.count??0, responses: r.count??0 })
      setLoading(false)
    })
  }, [])

  const cards = [
    { href:"/admin/offres",        Icon:Briefcase,     label:"Offres d'emploi",  value:stats.offers,       color:"#1E9FE8", bg:"#EFF9FF" },
    { href:"/admin/candidatures",  Icon:Users,          label:"Candidatures",     value:stats.applications, color:"#7C3AED", bg:"#F5F3FF" },
    { href:"/admin/actualites",    Icon:Newspaper,      label:"Actualités",       value:stats.news,         color:"#10B981", bg:"#ECFDF5" },
    { href:"/admin/appels-offres", Icon:FileText,       label:"Appels d'offres",  value:stats.tenders,      color:"#F59E0B", bg:"#FFFBEB" },
    { href:"/admin/reponses-ao",   Icon:MessageSquare,  label:"Réponses AO",      value:stats.responses,    color:"#EF4444", bg:"#FEF2F2" },
  ]

  return (
    <div>
      <div style={{ marginBottom:"32px" }}>
        <h1 style={{ fontSize:"1.75rem", fontWeight:800, color:"#1A3A8F", margin:"0 0 6px" }}>Dashboard</h1>
        <p style={{ fontSize:"0.9rem", color:"#94A3B8", margin:0 }}>Vue d&apos;ensemble de la plateforme @TOGO</p>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(200px, 1fr))", gap:"16px", marginBottom:"40px" }}>
        {cards.map(({ href, Icon, label, value, color, bg }) => (
          <Link key={href} href={href} style={{ textDecoration:"none" }}>
            <div style={{ background:"#fff", borderRadius:"16px", padding:"24px", border:"1.5px solid #E2E8F0", boxShadow:"0 2px 8px rgba(0,0,0,0.04)", transition:"transform 0.2s, box-shadow 0.2s", cursor:"pointer" }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform="translateY(-2px)"; (e.currentTarget as HTMLDivElement).style.boxShadow="0 8px 24px rgba(0,0,0,0.08)" }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform="translateY(0)"; (e.currentTarget as HTMLDivElement).style.boxShadow="0 2px 8px rgba(0,0,0,0.04)" }}>
              <div style={{ width:"44px", height:"44px", borderRadius:"12px", background:bg, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:"16px" }}>
                <Icon size={22} color={color} />
              </div>
              <p style={{ fontSize:"1.8rem", fontWeight:800, color:"#1A3A8F", margin:"0 0 4px", lineHeight:1 }}>
                {loading ? "—" : value}
              </p>
              <p style={{ fontSize:"0.82rem", color:"#94A3B8", margin:0 }}>{label}</p>
            </div>
          </Link>
        ))}
      </div>

      <div style={{ background:"#fff", borderRadius:"16px", padding:"28px", border:"1.5px solid #E2E8F0" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"20px" }}>
          <TrendingUp size={18} color="#1E9FE8" />
          <h2 style={{ fontSize:"1rem", fontWeight:700, color:"#1A3A8F", margin:0 }}>Actions rapides</h2>
        </div>
        <div style={{ display:"flex", gap:"12px", flexWrap:"wrap" }}>
          {[
            { href:"/admin/offres",        label:"+ Nouvelle offre d'emploi" },
            { href:"/admin/actualites",    label:"+ Publier une actualité"   },
            { href:"/admin/appels-offres", label:"+ Créer un appel d'offres" },
          ].map(({ href, label }) => (
            <Link key={href} href={href} style={{ padding:"10px 18px", borderRadius:"10px", background:"#F8FAFC", border:"1.5px solid #E2E8F0", color:"#1A3A8F", fontWeight:600, fontSize:"0.85rem", textDecoration:"none", transition:"background 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.background="#EFF9FF")}
              onMouseLeave={e => (e.currentTarget.style.background="#F8FAFC")}>
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
