"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"
import { NAV_ITEMS } from "@/constants/data"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header style={{
      position: "fixed", top: 0, width: "100%", zIndex: 50, height: "68px",
      transition: "all 0.3s ease",
      background: scrolled ? "rgba(255,255,255,0.85)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(0,0,0,0.06)" : "none",
      boxShadow: scrolled ? "0 1px 20px rgba(0,0,0,0.06)" : "none",
    }}>
      <nav style={{
        width: "100%",
        padding: "0 4% 0 4%", height: "68px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
          <Image
            src="/images/logo.png"
            alt="@TOGO"
            width={140}
            height={46}
            priority
            unoptimized
            style={{ height: "52px", width: "auto" }}
          />
        </Link>

        {/* Desktop links */}
        <ul style={{
          display: "flex", alignItems: "center", gap: "32px",
          listStyle: "none", margin: 0, padding: 0,
        }}
          className="nav-desktop"
        >
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link href={item.href} style={{
                fontSize: "0.9rem", fontWeight: 500,
                color: "#475569", textDecoration: "none",
                transition: "color 0.2s",
              }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--color-brand-primary)")}
                onMouseLeave={e => (e.currentTarget.style.color = "#475569")}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA desktop */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }} className="nav-cta">
          <Link href="/contact" style={{
            fontSize: "0.88rem", fontWeight: 600,
            padding: "9px 20px", borderRadius: "8px",
            background: "var(--color-brand-primary)",
            color: "#fff", textDecoration: "none",
            transition: "background 0.2s",
          }}
            onMouseEnter={e => (e.currentTarget.style.background = "var(--color-brand-hover)")}
            onMouseLeave={e => (e.currentTarget.style.background = "var(--color-brand-primary)")}
          >
            Contact
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          style={{
            display: "none", padding: "8px",
            background: "none", border: "none", cursor: "pointer",
          }}
          className="nav-mobile-btn"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div style={{
          background: "#fff",
          borderTop: "1px solid rgba(0,0,0,0.06)",
          padding: "16px 24px",
          display: "flex", flexDirection: "column", gap: "16px",
        }}>
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href}
              style={{ fontSize: "0.95rem", fontWeight: 500, color: "#334155", textDecoration: "none" }}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/contact" style={{
            padding: "10px 20px", borderRadius: "8px", textAlign: "center",
            background: "var(--color-brand-primary)", color: "#fff",
            fontWeight: 600, textDecoration: "none",
          }}
            onClick={() => setOpen(false)}
          >
            Contact
          </Link>
        </div>
      )}
    </header>
  )
}
