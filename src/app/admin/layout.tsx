"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import Image from "next/image"
import { createClient } from "@/lib/supabase/client"
import {
  LayoutDashboard, Briefcase, Users, Newspaper,
  FileText, MessageSquare, LogOut, Tags, Settings,
} from "lucide-react"

const NAV = [
  { href:"/admin",               Icon:LayoutDashboard, label:"Dashboard"         },
  { href:"/admin/offres",        Icon:Briefcase,       label:"Offres d'emploi"   },
  { href:"/admin/candidatures",  Icon:Users,           label:"Candidatures"      },
  { href:"/admin/actualites",    Icon:Newspaper,       label:"Actualités"        },
  { href:"/admin/appels-offres", Icon:FileText,        label:"Appels d'offres"   },
  { href:"/admin/reponses-ao",   Icon:MessageSquare,   label:"Réponses AO"       },
  { href:"/admin/domaines",      Icon:Tags,            label:"Domaines"          },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [checking, setChecking] = useState(true)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session && pathname !== "/admin/login") router.replace("/admin/login")
      setChecking(false)
    })
  }, [pathname])

  async function signOut() {
    await supabase.auth.signOut()
    router.replace("/admin/login")
  }

  if (pathname === "/admin/login") return <>{children}</>
  if (checking) return <div style={{ height:"100vh", display:"flex", alignItems:"center", justifyContent:"center", color:"#94A3B8", fontSize:"0.9rem" }}>Vérification...</div>

  return (
    <div style={{ display:"flex", minHeight:"100vh", background:"#F8FAFC" }}>
      {/* Sidebar */}
      <aside style={{ width:"240px", background:"linear-gradient(180deg,#0A1530 0%,#0F1E4A 100%)", flexShrink:0, display:"flex", flexDirection:"column", position:"fixed", top:0, left:0, height:"100vh", zIndex:50, boxShadow:"4px 0 24px rgba(0,0,0,0.2)" }}>
        {/* Logo avec lévitation */}
        <div style={{ padding:"28px 20px 18px", borderBottom:"1px solid rgba(255,255,255,0.07)", textAlign:"center" }}>
          <div style={{ display:"inline-block", animation:"float 3.5s ease-in-out infinite" }}>
            <Image src="/images/logo.png" alt="@TOGO" width={130} height={44} unoptimized
              style={{ height:"42px", width:"auto", filter:"brightness(0) invert(1)", display:"block" }} />
          </div>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"6px", marginTop:"8px" }}>
            <span style={{ width:"5px", height:"5px", borderRadius:"50%", background:"#10B981", animation:"pulse 2s infinite" }} />
            <p style={{ fontSize:"0.65rem", color:"rgba(255,255,255,0.3)", margin:0, letterSpacing:"0.12em", textTransform:"uppercase" }}>Administration</p>
          </div>
        </div>

        <nav style={{ flex:1, padding:"16px 12px", overflowY:"auto" }}>
          {NAV.map(({ href, Icon, label }) => {
            const active = pathname === href
            return (
              <Link key={href} href={href} style={{
                display:"flex", alignItems:"center", gap:"10px", padding:"10px 12px",
                borderRadius:"10px", marginBottom:"3px", textDecoration:"none",
                background: active ? "rgba(30,159,232,0.18)" : "transparent",
                color: active ? "#60C8FF" : "rgba(255,255,255,0.5)",
                transition:"all 0.2s", fontSize:"0.875rem", fontWeight: active ? 600 : 400,
                borderLeft: active ? "3px solid #1E9FE8" : "3px solid transparent",
              }}>
                <Icon size={17} /> {label}
              </Link>
            )
          })}
        </nav>

        {/* Bas sidebar : paramètres + déconnexion */}
        <div style={{ padding:"12px", borderTop:"1px solid rgba(255,255,255,0.07)" }}>
          <Link href="/admin/parametres" style={{
            display:"flex", alignItems:"center", gap:"10px", padding:"10px 12px", borderRadius:"10px",
            marginBottom:"4px", textDecoration:"none",
            background: pathname==="/admin/parametres" ? "rgba(30,159,232,0.18)" : "transparent",
            color: pathname==="/admin/parametres" ? "#60C8FF" : "rgba(255,255,255,0.45)",
            fontSize:"0.875rem", fontWeight: pathname==="/admin/parametres" ? 600 : 400,
            borderLeft: pathname==="/admin/parametres" ? "3px solid #1E9FE8" : "3px solid transparent",
            transition:"all 0.2s",
          }}>
            <Settings size={17}/> Paramètres
          </Link>
          <button onClick={signOut} style={{
            display:"flex", alignItems:"center", gap:"10px", padding:"10px 12px", borderRadius:"10px",
            background:"transparent", color:"rgba(255,255,255,0.35)", border:"none", cursor:"pointer",
            width:"100%", fontSize:"0.875rem", fontFamily:"inherit", borderLeft:"3px solid transparent",
            transition:"all 0.2s",
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color="#FF6B6B"; (e.currentTarget as HTMLButtonElement).style.background="rgba(239,68,68,0.1)" }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color="rgba(255,255,255,0.35)"; (e.currentTarget as HTMLButtonElement).style.background="transparent" }}>
            <LogOut size={17}/> Déconnexion
          </button>
        </div>
      </aside>

      {/* Main */}
      <main style={{ marginLeft:"240px", flex:1, padding:"32px", minWidth:0 }} className="admin-main">
        {children}
      </main>
    </div>
  )
}
