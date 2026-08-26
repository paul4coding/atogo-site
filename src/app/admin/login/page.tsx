"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { login } from "@/lib/api-client"
import { Loader2, Lock } from "lucide-react"

export default function AdminLogin() {
  const [email, setEmail]       = useState("")
  const [password, setPassword] = useState("")
  const [error, setError]       = useState("")
  const [loading, setLoading]   = useState(false)
  const router = useRouter()

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true); setError("")
    try {
      await login(email, password)
      // `refresh()` force le middleware à relire le cookie tout juste posé,
      // sinon la redirection peut retomber sur la page de login.
      router.replace("/admin")
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Email ou mot de passe incorrect")
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight:"100vh", background:"linear-gradient(160deg,#0F1E4A 0%,#1A3A8F 100%)", display:"flex", alignItems:"center", justifyContent:"center", padding:"24px" }}>
      <div style={{ background:"#fff", borderRadius:"20px", padding:"40px 36px", width:"100%", maxWidth:"400px", boxShadow:"0 24px 80px rgba(0,0,0,0.25)" }}>
        <div style={{ textAlign:"center", marginBottom:"32px" }}>
          <Image src="/images/logo.png" alt="@TOGO" width={120} height={40} unoptimized style={{ height:"44px", width:"auto", margin:"0 auto 16px" }} />
          <div style={{ display:"inline-flex", alignItems:"center", gap:"6px", padding:"6px 14px", borderRadius:"999px", background:"#EEF2FF", marginBottom:"8px" }}>
            <Lock size={12} color="#1A3A8F" />
            <span style={{ fontSize:"11px", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em", color:"#1A3A8F" }}>Espace Admin</span>
          </div>
          <h1 style={{ fontSize:"1.5rem", fontWeight:800, color:"#1A3A8F", margin:"8px 0 4px" }}>Connexion</h1>
          <p style={{ fontSize:"0.85rem", color:"#94A3B8" }}>Accès réservé à l&apos;équipe @TOGO</p>
        </div>

        <form onSubmit={submit} style={{ display:"flex", flexDirection:"column", gap:"16px" }}>
          <div>
            <label style={{ fontSize:"0.82rem", fontWeight:600, color:"#475569", display:"block", marginBottom:"6px" }}>Email</label>
            <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@atogo.tg"
              style={{ width:"100%", padding:"12px 14px", borderRadius:"10px", border:"1.5px solid #E2E8F0", fontSize:"0.9rem", fontFamily:"inherit", outline:"none", boxSizing:"border-box" }} />
          </div>
          <div>
            <label style={{ fontSize:"0.82rem", fontWeight:600, color:"#475569", display:"block", marginBottom:"6px" }}>Mot de passe</label>
            <input type="password" required value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••"
              style={{ width:"100%", padding:"12px 14px", borderRadius:"10px", border:"1.5px solid #E2E8F0", fontSize:"0.9rem", fontFamily:"inherit", outline:"none", boxSizing:"border-box" }} />
          </div>
          {error && <p style={{ fontSize:"0.83rem", color:"#DC2626", margin:0, textAlign:"center" }}>{error}</p>}
          <button type="submit" disabled={loading}
            style={{ padding:"13px", borderRadius:"10px", background:"linear-gradient(135deg,#1A3A8F,#1E9FE8)", color:"#fff", fontWeight:700, fontSize:"0.9rem", border:"none", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.8 : 1, display:"flex", alignItems:"center", justifyContent:"center", gap:"8px" }}>
            {loading ? <><Loader2 size={16} style={{ animation:"spin 1s linear infinite" }}/> Connexion...</> : "Se connecter"}
          </button>
        </form>
      </div>
    </div>
  )
}
