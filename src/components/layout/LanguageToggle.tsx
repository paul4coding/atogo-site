"use client"

import { useState, useEffect } from "react"
import { Globe } from "lucide-react"

// Lit la langue active depuis le cookie googtrans (format "/fr/en")
function getLang(): "fr" | "en" {
  if (typeof document === "undefined") return "fr"
  const m = document.cookie.match(/googtrans=\/[^/]+\/([^;]+)/)
  return m && m[1] === "en" ? "en" : "fr"
}

// Pose le cookie sur le domaine courant (et variantes) puis recharge
function setLang(lang: "fr" | "en") {
  const value = lang === "en" ? "/fr/en" : "/fr/fr"
  const host = window.location.hostname
  // cookie simple
  document.cookie = `googtrans=${value};path=/`
  // cookie sur le domaine (utile en prod)
  document.cookie = `googtrans=${value};path=/;domain=${host}`
  document.cookie = `googtrans=${value};path=/;domain=.${host}`
  window.location.reload()
}

export default function LanguageToggle() {
  const [lang, setLangState] = useState<"fr" | "en">("fr")

  useEffect(() => { setLangState(getLang()) }, [])

  function toggle() {
    setLang(lang === "fr" ? "en" : "fr")
  }

  return (
    <button onClick={toggle} aria-label="Changer de langue"
      title={lang === "fr" ? "Switch to English" : "Passer en français"}
      style={{
        display: "inline-flex", alignItems: "center", gap: "6px",
        padding: "7px 12px", borderRadius: "8px", cursor: "pointer",
        border: "1.5px solid var(--nav-border, #E2E8F0)",
        background: "transparent", color: "var(--nav-text, #475569)",
        fontWeight: 700, fontSize: "0.78rem", fontFamily: "inherit",
        transition: "all 0.2s", letterSpacing: "0.02em",
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = "#1E9FE8"; e.currentTarget.style.color = "#1E9FE8" }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--nav-border, #E2E8F0)"; e.currentTarget.style.color = "var(--nav-text, #475569)" }}
    >
      <Globe size={14} />
      <span>{lang === "fr" ? "FR" : "EN"}</span>
    </button>
  )
}
