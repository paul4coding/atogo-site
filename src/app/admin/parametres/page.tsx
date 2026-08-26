"use client"

import { useState, useEffect } from "react"
import { me, updateAccountEmail, updateAccountPassword } from "@/lib/api-client"
import { Save, Loader2, CheckCircle, Mail, Lock, Eye, EyeOff, ShieldCheck } from "lucide-react"

export default function AdminParametres() {
  const [userEmail, setUserEmail]     = useState("")
  const [newEmail, setNewEmail]       = useState("")
  // Le changement d'email exige lui aussi le mot de passe actuel : le cookie
  // de session seul ne doit pas suffire à détourner un compte admin.
  const [emailPwd, setEmailPwd]       = useState("")
  const [currentPwd, setCurrentPwd]  = useState("")
  const [newPwd, setNewPwd]           = useState("")
  const [confirmPwd, setConfirmPwd]  = useState("")
  const [showPwd, setShowPwd]         = useState(false)
  const [showNewPwd, setShowNewPwd]   = useState(false)
  const [emailStatus, setEmailStatus] = useState<"idle"|"loading"|"success"|"error">("idle")
  const [pwdStatus, setPwdStatus]     = useState<"idle"|"loading"|"success"|"error">("idle")
  const [emailMsg, setEmailMsg]       = useState("")
  const [pwdMsg, setPwdMsg]           = useState("")

  useEffect(() => {
    me().then(session => {
      if (session?.email) { setUserEmail(session.email); setNewEmail(session.email) }
    })
  }, [])

  async function updateEmail(e: React.FormEvent) {
    e.preventDefault()
    if (newEmail === userEmail) { setEmailMsg("L'adresse est déjà la même."); setEmailStatus("error"); return }
    setEmailStatus("loading"); setEmailMsg("")
    try {
      const { email } = await updateAccountEmail(emailPwd, newEmail)
      setUserEmail(email); setEmailPwd("")
      setEmailMsg("Email mis à jour."); setEmailStatus("success")
    } catch (err) {
      setEmailMsg(err instanceof Error ? err.message : "Mise à jour impossible."); setEmailStatus("error")
    }
  }

  async function updatePassword(e: React.FormEvent) {
    e.preventDefault()
    if (newPwd !== confirmPwd) { setPwdMsg("Les mots de passe ne correspondent pas."); setPwdStatus("error"); return }
    if (newPwd.length < 8) { setPwdMsg("Minimum 8 caractères requis."); setPwdStatus("error"); return }
    setPwdStatus("loading"); setPwdMsg("")
    try {
      // Le serveur revérifie le mot de passe actuel avant d'appliquer le changement.
      await updateAccountPassword(currentPwd, newPwd)
      setPwdMsg("Mot de passe mis à jour avec succès."); setPwdStatus("success")
      setCurrentPwd(""); setNewPwd(""); setConfirmPwd("")
    } catch (err) {
      setPwdMsg(err instanceof Error ? err.message : "Mise à jour impossible."); setPwdStatus("error")
    }
  }

  const inputStyle: React.CSSProperties = {
    width:"100%", padding:"12px 14px", borderRadius:"10px", border:"1.5px solid #E2E8F0",
    fontSize:"0.9rem", fontFamily:"inherit", outline:"none", boxSizing:"border-box",
    background:"#F8FAFC", color:"#1A3A8F",
  }

  return (
    <div style={{ maxWidth:"600px" }}>
      <div style={{ marginBottom:"36px" }}>
        <h1 style={{ fontSize:"1.6rem", fontWeight:800, color:"#1A3A8F", margin:"0 0 6px" }}>Paramètres du compte</h1>
        <p style={{ fontSize:"0.85rem", color:"#94A3B8", margin:0 }}>Gérez vos informations de connexion administrateur</p>
      </div>

      {/* Badge compte actuel */}
      <div style={{ display:"flex", alignItems:"center", gap:"12px", padding:"14px 18px", borderRadius:"14px", background:"linear-gradient(135deg,#EFF6FF,#DBEAFE)", border:"1.5px solid #BFDBFE", marginBottom:"32px" }}>
        <div style={{ width:"40px", height:"40px", borderRadius:"12px", background:"linear-gradient(135deg,#1A3A8F,#1E9FE8)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
          <ShieldCheck size={20} color="#fff"/>
        </div>
        <div>
          <p style={{ fontSize:"0.78rem", fontWeight:600, color:"#64748B", margin:"0 0 2px", textTransform:"uppercase", letterSpacing:"0.08em" }}>Compte connecté</p>
          <p style={{ fontSize:"0.92rem", fontWeight:700, color:"#1A3A8F", margin:0 }}>{userEmail || "..."}</p>
        </div>
        <span style={{ marginLeft:"auto", fontSize:"10px", fontWeight:800, padding:"4px 10px", borderRadius:"999px", background:"rgba(16,185,129,0.15)", color:"#059669", border:"1px solid rgba(16,185,129,0.25)" }}>
          Admin
        </span>
      </div>

      {/* ── Changer l'email ── */}
      <div style={{ background:"#fff", borderRadius:"20px", border:"1.5px solid #E2E8F0", overflow:"hidden", marginBottom:"20px", boxShadow:"0 2px 16px rgba(0,0,0,0.04)" }}>
        <div style={{ padding:"20px 24px", borderBottom:"1px solid #F1F5F9", display:"flex", alignItems:"center", gap:"10px" }}>
          <div style={{ width:"36px", height:"36px", borderRadius:"10px", background:"#EFF6FF", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <Mail size={17} color="#1E9FE8"/>
          </div>
          <div>
            <p style={{ fontSize:"0.95rem", fontWeight:700, color:"#1A3A8F", margin:0 }}>Adresse email</p>
            <p style={{ fontSize:"0.78rem", color:"#94A3B8", margin:0 }}>Confirmée par votre mot de passe actuel</p>
          </div>
        </div>
        <form onSubmit={updateEmail} style={{ padding:"22px 24px", display:"flex", flexDirection:"column", gap:"14px" }}>
          <div>
            <label style={{ fontSize:"0.78rem", fontWeight:600, color:"#64748B", display:"block", marginBottom:"6px" }}>Nouvelle adresse email</label>
            <input type="email" required value={newEmail} onChange={e => setNewEmail(e.target.value)} style={inputStyle} />
          </div>
          <div>
            <label style={{ fontSize:"0.78rem", fontWeight:600, color:"#64748B", display:"block", marginBottom:"6px" }}>Mot de passe actuel</label>
            <input type="password" required value={emailPwd} onChange={e => setEmailPwd(e.target.value)} style={inputStyle} />
          </div>
          {emailMsg && (
            <div style={{ display:"flex", alignItems:"center", gap:"8px", padding:"10px 14px", borderRadius:"10px", background: emailStatus==="success" ? "#ECFDF5" : "#FEF2F2", border:`1px solid ${emailStatus==="success" ? "#6EE7B7" : "#FCA5A5"}` }}>
              {emailStatus==="success" && <CheckCircle size={14} color="#059669"/>}
              <p style={{ fontSize:"0.82rem", color: emailStatus==="success" ? "#065F46" : "#991B1B", margin:0 }}>{emailMsg}</p>
            </div>
          )}
          <button type="submit" disabled={emailStatus==="loading"}
            style={{ display:"inline-flex", alignItems:"center", gap:"8px", padding:"11px 22px", borderRadius:"10px", background:"#1E9FE8", color:"#fff", fontWeight:700, fontSize:"0.88rem", border:"none", cursor: emailStatus==="loading" ? "not-allowed" : "pointer", opacity: emailStatus==="loading" ? 0.75 : 1, alignSelf:"flex-start" }}>
            {emailStatus==="loading" ? <><Loader2 size={15} style={{ animation:"spin 1s linear infinite" }}/> Mise à jour...</> : <><Save size={15}/> Mettre à jour l&apos;email</>}
          </button>
        </form>
      </div>

      {/* ── Changer le mot de passe ── */}
      <div style={{ background:"#fff", borderRadius:"20px", border:"1.5px solid #E2E8F0", overflow:"hidden", boxShadow:"0 2px 16px rgba(0,0,0,0.04)" }}>
        <div style={{ padding:"20px 24px", borderBottom:"1px solid #F1F5F9", display:"flex", alignItems:"center", gap:"10px" }}>
          <div style={{ width:"36px", height:"36px", borderRadius:"10px", background:"#F5F3FF", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <Lock size={17} color="#7C3AED"/>
          </div>
          <div>
            <p style={{ fontSize:"0.95rem", fontWeight:700, color:"#1A3A8F", margin:0 }}>Mot de passe</p>
            <p style={{ fontSize:"0.78rem", color:"#94A3B8", margin:0 }}>Minimum 8 caractères</p>
          </div>
        </div>
        <form onSubmit={updatePassword} style={{ padding:"22px 24px", display:"flex", flexDirection:"column", gap:"14px" }}>
          {/* Mot de passe actuel */}
          <div>
            <label style={{ fontSize:"0.78rem", fontWeight:600, color:"#64748B", display:"block", marginBottom:"6px" }}>Mot de passe actuel</label>
            <div style={{ position:"relative" }}>
              <input type={showPwd ? "text" : "password"} required value={currentPwd} onChange={e => setCurrentPwd(e.target.value)}
                style={{ ...inputStyle, paddingRight:"44px" }} />
              <button type="button" onClick={() => setShowPwd(!showPwd)}
                style={{ position:"absolute", right:"12px", top:"50%", transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer", color:"#94A3B8" }}>
                {showPwd ? <EyeOff size={16}/> : <Eye size={16}/>}
              </button>
            </div>
          </div>
          {/* Nouveau mot de passe */}
          <div>
            <label style={{ fontSize:"0.78rem", fontWeight:600, color:"#64748B", display:"block", marginBottom:"6px" }}>Nouveau mot de passe</label>
            <div style={{ position:"relative" }}>
              <input type={showNewPwd ? "text" : "password"} required value={newPwd} onChange={e => setNewPwd(e.target.value)}
                style={{ ...inputStyle, paddingRight:"44px" }} />
              <button type="button" onClick={() => setShowNewPwd(!showNewPwd)}
                style={{ position:"absolute", right:"12px", top:"50%", transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer", color:"#94A3B8" }}>
                {showNewPwd ? <EyeOff size={16}/> : <Eye size={16}/>}
              </button>
            </div>
            {/* Indicateur de force */}
            {newPwd && (
              <div style={{ marginTop:"8px" }}>
                <div style={{ height:"4px", borderRadius:"2px", background:"#E2E8F0", overflow:"hidden" }}>
                  <div style={{ height:"100%", borderRadius:"2px", transition:"width 0.3s, background 0.3s",
                    width: newPwd.length < 8 ? "25%" : newPwd.length < 12 ? "60%" : "100%",
                    background: newPwd.length < 8 ? "#EF4444" : newPwd.length < 12 ? "#F59E0B" : "#10B981" }} />
                </div>
                <p style={{ fontSize:"0.72rem", color: newPwd.length < 8 ? "#EF4444" : newPwd.length < 12 ? "#F59E0B" : "#10B981", margin:"4px 0 0" }}>
                  {newPwd.length < 8 ? "Trop court" : newPwd.length < 12 ? "Moyen" : "Fort"}
                </p>
              </div>
            )}
          </div>
          {/* Confirmation */}
          <div>
            <label style={{ fontSize:"0.78rem", fontWeight:600, color:"#64748B", display:"block", marginBottom:"6px" }}>Confirmer le nouveau mot de passe</label>
            <input type="password" required value={confirmPwd} onChange={e => setConfirmPwd(e.target.value)}
              style={{ ...inputStyle, borderColor: confirmPwd && confirmPwd !== newPwd ? "#FCA5A5" : "#E2E8F0" }} />
            {confirmPwd && confirmPwd !== newPwd && (
              <p style={{ fontSize:"0.75rem", color:"#EF4444", margin:"4px 0 0" }}>Les mots de passe ne correspondent pas</p>
            )}
          </div>

          {pwdMsg && (
            <div style={{ display:"flex", alignItems:"center", gap:"8px", padding:"10px 14px", borderRadius:"10px", background: pwdStatus==="success" ? "#ECFDF5" : "#FEF2F2", border:`1px solid ${pwdStatus==="success" ? "#6EE7B7" : "#FCA5A5"}` }}>
              {pwdStatus==="success" && <CheckCircle size={14} color="#059669"/>}
              <p style={{ fontSize:"0.82rem", color: pwdStatus==="success" ? "#065F46" : "#991B1B", margin:0 }}>{pwdMsg}</p>
            </div>
          )}

          <button type="submit" disabled={pwdStatus==="loading" || (!!confirmPwd && confirmPwd !== newPwd)}
            style={{ display:"inline-flex", alignItems:"center", gap:"8px", padding:"11px 22px", borderRadius:"10px", background:"#7C3AED", color:"#fff", fontWeight:700, fontSize:"0.88rem", border:"none", cursor: pwdStatus==="loading" ? "not-allowed" : "pointer", opacity: pwdStatus==="loading" ? 0.75 : 1, alignSelf:"flex-start" }}>
            {pwdStatus==="loading" ? <><Loader2 size={15} style={{ animation:"spin 1s linear infinite" }}/> Mise à jour...</> : <><Lock size={15}/> Changer le mot de passe</>}
          </button>
        </form>
      </div>
    </div>
  )
}
