"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { NAV_ITEMS } from "@/constants/data"
import { Mail, MapPin, Phone, ArrowUpRight, Zap, Shield, Globe } from "lucide-react"

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

      {/* ── Bande CTA ─────────────────────────────────────────────────── */}
      <div style={{
        position: "relative",
        background: "linear-gradient(135deg, #1565C0 0%, #1E9FE8 50%, #0D7A4E 100%)",
        padding: "56px 5%",
        overflow: "hidden",
      }}>
        {/* Cercles décoratifs en arrière-plan */}
        <div style={{
          position: "absolute", top: "-60px", right: "10%",
          width: "280px", height: "280px", borderRadius: "50%",
          background: "rgba(255,255,255,0.05)", pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: "-80px", right: "25%",
          width: "200px", height: "200px", borderRadius: "50%",
          background: "rgba(255,255,255,0.04)", pointerEvents: "none",
        }} />

        <div className="footer-cta">
          {/* Texte gauche */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <p style={{ fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)", fontWeight: 800, margin: 0, lineHeight: 1.2 }}>
              Prêt à transformer<br />votre entreprise ?
            </p>
            <p style={{ fontSize: "1rem", opacity: 0.85, margin: 0 }}>
              Notre équipe vous répond rapidement et vous accompagne.
            </p>

            {/* Badges de réassurance */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginTop: "4px" }}>
              {[
                { Icon: Zap,    text: "Réponse sous 24h" },
                { Icon: Shield, text: "100% confidentiel" },
                { Icon: Globe,  text: "8 pays couverts"  },
              ].map(({ Icon, text }) => (
                <div key={text} style={{
                  display: "inline-flex", alignItems: "center", gap: "6px",
                  background: "rgba(255,255,255,0.12)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: "999px", padding: "6px 14px",
                  fontSize: "0.82rem", fontWeight: 600,
                }}>
                  <Icon size={13} />
                  {text}
                </div>
              ))}
            </div>
          </div>

          {/* Bouton CTA */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
            <Link href="/contact" style={{
              display: "inline-flex", alignItems: "center", gap: "10px",
              background: "#fff", color: "#1A3A8F",
              fontWeight: 800, fontSize: "1rem",
              padding: "16px 36px", borderRadius: "12px",
              textDecoration: "none", whiteSpace: "nowrap",
              boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-3px)"
                e.currentTarget.style.boxShadow = "0 14px 40px rgba(0,0,0,0.3)"
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "translateY(0)"
                e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.2)"
              }}
            >
              Nous contacter <ArrowUpRight size={18} />
            </Link>
            <span style={{ fontSize: "0.78rem", opacity: 0.7 }}>Gratuit · Sans engagement</span>
          </div>
        </div>
      </div>

      {/* ── Corps du footer ────────────────────────────────────────────── */}
      <div className="footer-grid">

        {/* Colonne 1 — Marque */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px", alignItems: "flex-start" }}>
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src="/images/logo.png"
              alt="@TOGO"
              width={300} height={100}
              unoptimized
              style={{ height: "48px", width: "auto", objectFit: "contain", filter: "brightness(0) invert(1)", display: "block", marginLeft: 0 }}
            />
          </motion.div>
          <p style={{ fontSize: "0.9rem", lineHeight: 1.7, color: "rgba(255,255,255,0.6)", maxWidth: "260px", margin: 0 }}>
            La référence Fintech & Solutions Digitales au Togo. Nous accompagnons entreprises et particuliers vers l&apos;avenir numérique.
          </p>
          {/* Réseaux sociaux */}
          <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
            {SOCIALS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
                whileHover={{ scale: 1.2, rotate: 8, y: -4 }}
                whileTap={{ scale: 0.88 }}
                style={{
                  width: "38px", height: "38px", flexShrink: 0,
                  borderRadius: "10px",
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <a
                  href={s.href}
                  aria-label={s.label}
                  style={{
                    width: "100%", height: "100%",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "0.82rem", fontWeight: 800,
                    color: "rgba(255,255,255,0.8)",
                    textDecoration: "none",
                  }}
                >
                  {s.icon}
                </a>
              </motion.div>
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
