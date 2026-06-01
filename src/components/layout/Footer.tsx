"use client"

import Link from "next/link"
import Image from "next/image"
import { NAV_ITEMS } from "@/constants/data"
import { Mail, MapPin, Phone, ArrowUpRight } from "lucide-react"

const SERVICES = [
  { label: "Fintech & DanayaCash", href: "/danayacash" },
  { label: "Solutions Informatiques", href: "/services" },
  { label: "Marketing Digital", href: "/services" },
  { label: "Cybersécurité", href: "/services" },
]

const SOCIALS = [
  { label: "LinkedIn",  href: "#", icon: "in" },
  { label: "Facebook",  href: "#", icon: "f"  },
  { label: "Twitter/X", href: "#", icon: "𝕏"  },
]

export default function Footer() {
  return (
    <footer style={{ background: "#0F1E4A", color: "#fff" }}>

      {/* ── Bande supérieure CTA ───────────────────────────────────────── */}
      <div style={{
        background: "linear-gradient(135deg, #1E9FE8 0%, #1A3A8F 100%)",
        padding: "48px 5%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "24px",
      }}>
        <div>
          <p style={{ fontSize: "1.5rem", fontWeight: 700, margin: 0 }}>
            Prêt à transformer votre entreprise ?
          </p>
          <p style={{ fontSize: "1rem", opacity: 0.85, margin: "6px 0 0" }}>
            Contactez-nous et obtenez une réponse sous 24h.
          </p>
        </div>
        <Link href="/contact" style={{
          display: "inline-flex", alignItems: "center", gap: "8px",
          background: "#fff", color: "#1A3A8F",
          fontWeight: 700, fontSize: "0.95rem",
          padding: "14px 28px", borderRadius: "10px",
          textDecoration: "none", whiteSpace: "nowrap",
          transition: "transform 0.2s",
        }}
          onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-2px)")}
          onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}
        >
          Nous contacter <ArrowUpRight size={16} />
        </Link>
      </div>

      {/* ── Corps du footer ────────────────────────────────────────────── */}
      <div style={{
        padding: "64px 5% 48px",
        display: "grid",
        gridTemplateColumns: "2fr 1fr 1fr 1.4fr",
        gap: "48px",
      }}>

        {/* Colonne 1 — Marque */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <Image
            src="/images/logo.png"
            alt="@TOGO"
            width={300} height={100}
            unoptimized
            style={{ height: "48px", width: "auto", objectFit: "contain", filter: "brightness(0) invert(1)" }}
          />
          <p style={{ fontSize: "0.9rem", lineHeight: 1.7, color: "rgba(255,255,255,0.6)", maxWidth: "260px", margin: 0 }}>
            La référence Fintech & Solutions Digitales au Togo. Nous accompagnons entreprises et particuliers vers l&apos;avenir numérique.
          </p>
          {/* Réseaux sociaux */}
          <div style={{ display: "flex", gap: "10px" }}>
            {SOCIALS.map(s => (
              <Link key={s.label} href={s.href} aria-label={s.label} style={{
                width: "36px", height: "36px",
                borderRadius: "8px",
                border: "1px solid rgba(255,255,255,0.12)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "0.8rem", fontWeight: 700, color: "rgba(255,255,255,0.7)",
                textDecoration: "none", transition: "background 0.2s, color 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = "#1E9FE8"; e.currentTarget.style.color = "#fff" }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(255,255,255,0.7)" }}
              >{s.icon}</Link>
            ))}
          </div>
        </div>

        {/* Colonne 2 — Navigation */}
        <div>
          <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "20px" }}>
            Navigation
          </p>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
            {NAV_ITEMS.map(item => (
              <li key={item.href}>
                <Link href={item.href} style={{
                  fontSize: "0.9rem", color: "rgba(255,255,255,0.65)", textDecoration: "none",
                  transition: "color 0.2s",
                }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.65)")}
                >{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Colonne 3 — Services */}
        <div>
          <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "20px" }}>
            Services
          </p>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
            {SERVICES.map(s => (
              <li key={s.label}>
                <Link href={s.href} style={{
                  fontSize: "0.9rem", color: "rgba(255,255,255,0.65)", textDecoration: "none",
                  transition: "color 0.2s",
                }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.65)")}
                >{s.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Colonne 4 — Contact */}
        <div>
          <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "20px" }}>
            Contact
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {[
              { Icon: MapPin, text: "Lomé, Togo — Quartier Administratif" },
              { Icon: Mail,   text: "contact@atogo.tg" },
              { Icon: Phone,  text: "+228 XX XX XX XX" },
            ].map(({ Icon, text }) => (
              <div key={text} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                <Icon size={15} style={{ color: "#1E9FE8", flexShrink: 0, marginTop: "2px" }} />
                <span style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.5 }}>{text}</span>
              </div>
            ))}
          </div>

          {/* Badge DanayaCash */}
          <div style={{
            marginTop: "24px",
            padding: "14px 16px",
            borderRadius: "10px",
            background: "rgba(13,122,78,0.18)",
            border: "1px solid rgba(16,185,129,0.25)",
          }}>
            <p style={{ fontSize: "0.78rem", fontWeight: 700, color: "#10B981", margin: "0 0 4px", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              DanayaCash
            </p>
            <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.6)", margin: 0, lineHeight: 1.5 }}>
              Transfert mobile rapide · 8 pays · 2M+ transactions/mois
            </p>
          </div>
        </div>
      </div>

      {/* ── Barre de copyright ─────────────────────────────────────────── */}
      <div style={{
        borderTop: "1px solid rgba(255,255,255,0.08)",
        padding: "20px 5%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "12px",
      }}>
        <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.3)", margin: 0 }}>
          © {new Date().getFullYear()} @TOGO. Tous droits réservés.
        </p>
        <div style={{ display: "flex", gap: "24px" }}>
          {["Mentions légales", "Politique de confidentialité"].map(l => (
            <Link key={l} href="#" style={{
              fontSize: "0.8rem", color: "rgba(255,255,255,0.3)", textDecoration: "none",
              transition: "color 0.2s",
            }}
              onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}
            >{l}</Link>
          ))}
        </div>
      </div>

    </footer>
  )
}
