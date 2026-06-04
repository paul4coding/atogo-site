"use client"

import Image from "next/image"
import { motion } from "framer-motion"

const PARTNERS = [
  { name: "Flooz",         logo: "/images/flooz.png",          dark: false },
  { name: "MixBy Yas",     logo: "/images/yas-agent.png",      dark: false },
  { name: "Western Union", logo: "/images/western-union.webp", dark: false },
  { name: "MoneyGram",     logo: "/images/moneygram.webp",     dark: false },
  { name: "RIA",           logo: "/images/ria.png",            dark: false },
  { name: "Blackview",     logo: "/images/blackview.png",      dark: true  },
  { name: "Oukitel",       logo: "/images/oukitel2.jpg",       dark: false },
  { name: "Doogee",        logo: "/images/doogee2.png",        dark: false },
]

// Dupliquer pour le loop infini
const TRACK = [...PARTNERS, ...PARTNERS, ...PARTNERS]

export default function PartnersSection() {
  return (
    <section style={{ background: "#fff", padding: "56px 0", overflow: "hidden", borderTop: "1px solid #F1F5F9", borderBottom: "1px solid #F1F5F9" }}>

      {/* Keyframe injecté (impossible en inline) — le reste du style est inline pour fiabilité totale */}
      <style>{`@keyframes partnersScroll{from{transform:translate3d(0,0,0)}to{transform:translate3d(-33.3333%,0,0)}}`}</style>


      {/* Label centré */}
      <motion.p
        initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.4 }}
        style={{ textAlign: "center", fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#94A3B8", marginBottom: "32px" }}
      >
        Nos partenaires agréés
      </motion.p>

      {/* Bandeau défilant */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        {/* Dégradés bords */}
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "140px", background: "linear-gradient(to right, #fff, transparent)", zIndex: 2, pointerEvents: "none" }} />
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "140px", background: "linear-gradient(to left, #fff, transparent)", zIndex: 2, pointerEvents: "none" }} />

        <div style={{
          display: "flex",
          gap: "24px",
          width: "max-content",
          alignItems: "center",
          willChange: "transform",
          animation: "partnersScroll 28s linear infinite",
        }}>
          {TRACK.map((p, i) => (
            <div key={`${p.name}-${i}`} style={{
              background: "#F8FAFC",
              border: "1.5px solid #E2E8F0",
              borderRadius: "14px",
              padding: "14px 28px",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
              minWidth: "140px", height: "68px",
              transition: "border-color 0.2s, box-shadow 0.2s",
            }}>
              <Image
                src={p.logo}
                alt={p.name}
                width={110}
                height={44}
                unoptimized
                style={{
                  maxHeight: "40px",
                  width: "auto",
                  objectFit: "contain",
                  filter: p.dark ? "brightness(0)" : "none",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
