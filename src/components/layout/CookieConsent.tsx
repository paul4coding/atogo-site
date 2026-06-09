"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Cookie, X, Check } from "lucide-react"

const STORAGE_KEY = "atogo-cookie-consent"

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  // Affiche le bandeau seulement si aucun choix n'a été enregistré
  useEffect(() => {
    const choice = localStorage.getItem(STORAGE_KEY)
    if (!choice) {
      // petit délai pour ne pas gêner le chargement initial
      const t = setTimeout(() => setVisible(true), 1200)
      return () => clearTimeout(t)
    }
  }, [])

  function decide(value: "accepted" | "refused") {
    localStorage.setItem(STORAGE_KEY, value)
    localStorage.setItem(STORAGE_KEY + "-date", new Date().toISOString())
    setVisible(false)
    // Si refusé → on s'assure qu'aucun tracking ne tourne (placeholder)
    if (value === "accepted") {
      window.dispatchEvent(new CustomEvent("cookie-consent-accepted"))
    }
  }

  if (!visible) return null

  return (
    <div style={{
      position: "fixed", bottom: "20px", left: "20px", right: "20px",
      zIndex: 100, display: "flex", justifyContent: "center",
      pointerEvents: "none",
    }}>
      <div style={{
        pointerEvents: "auto",
        maxWidth: "680px", width: "100%",
        background: "var(--surface)",
        borderRadius: "18px",
        border: "1px solid var(--surface-border)",
        boxShadow: "0 16px 56px rgba(15,30,74,0.18)",
        padding: "20px 24px",
        display: "flex", alignItems: "center", gap: "18px",
        flexWrap: "wrap",
        animation: "cookieSlideUp 0.45s cubic-bezier(0.22,1,0.36,1)",
      }}>
        {/* Icône */}
        <div style={{
          width: "48px", height: "48px", borderRadius: "14px", flexShrink: 0,
          background: "linear-gradient(135deg,#1A3A8F,#1E9FE8)",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 6px 18px rgba(30,159,232,0.3)",
        }}>
          <Cookie size={22} color="#fff" />
        </div>

        {/* Texte */}
        <div style={{ flex: 1, minWidth: "240px" }}>
          <p style={{ fontSize: "0.92rem", fontWeight: 700, color: "var(--color-text-heading)", margin: "0 0 4px" }}>
            Nous respectons votre vie privée
          </p>
          <p style={{ fontSize: "0.82rem", color: "var(--color-text-body)", margin: 0, lineHeight: 1.6 }}>
            Ce site utilise des cookies pour améliorer votre expérience et mesurer son audience.{" "}
            <Link href="/contact" style={{ color: "#1E9FE8", fontWeight: 600, textDecoration: "none" }}>
              En savoir plus
            </Link>
          </p>
        </div>

        {/* Boutons */}
        <div style={{ display: "flex", gap: "10px", flexShrink: 0 }}>
          <button onClick={() => decide("refused")}
            style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              padding: "10px 18px", borderRadius: "10px",
              background: "transparent", border: "1.5px solid #E2E8F0",
              color: "#64748B", fontWeight: 600, fontSize: "0.85rem",
              cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s",
            }}
            onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = "#CBD5E1"; el.style.background = "#F8FAFC" }}
            onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = "#E2E8F0"; el.style.background = "transparent" }}>
            <X size={14} /> Refuser
          </button>
          <button onClick={() => decide("accepted")}
            style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              padding: "10px 20px", borderRadius: "10px",
              background: "linear-gradient(135deg,#1A3A8F,#1E9FE8)", border: "none",
              color: "#fff", fontWeight: 700, fontSize: "0.85rem",
              cursor: "pointer", fontFamily: "inherit",
              boxShadow: "0 4px 16px rgba(30,159,232,0.3)", transition: "transform 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-1px)")}
            onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}>
            <Check size={14} /> Accepter
          </button>
        </div>
      </div>

      {/* Animation d'apparition */}
      <style>{`@keyframes cookieSlideUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </div>
  )
}
