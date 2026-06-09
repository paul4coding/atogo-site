"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

const SQRT_5000 = Math.sqrt(5000)

interface Item {
  tempId: number
  testimonial: string
  by: string
  role: string
  imgSrc: string
}

// Vrais témoignages — contexte @TOGO / Lomé
const TESTIMONIALS: Item[] = [
  {
    tempId: 0,
    testimonial: "Je fais mes transferts Western Union chez @TOGO depuis 2 ans. Service rapide, équipe accueillante et toujours disponible. Je recommande sans hésiter.",
    by: "Koffi Mensah", role: "Commerçant, Lomé",
    imgSrc: "/images/client-1.webp",
  },
  {
    tempId: 1,
    testimonial: "Ils ont mis en place tout notre système informatique et nous accompagnent sur la cybersécurité. Une équipe locale qui comprend vraiment nos besoins.",
    by: "Aïcha Diallo", role: "Gérante PME, Lomé",
    imgSrc: "/images/client-2.webp",
  },
  {
    tempId: 2,
    testimonial: "Pour mes transferts Flooz et MixBy Yas, c'est mon agence de confiance. Toujours rapide, jamais de mauvaise surprise sur les frais. Bravo @TOGO !",
    by: "Fatou Bintou", role: "Cliente régulière",
    imgSrc: "/images/client-3.webp",
  },
  {
    tempId: 3,
    testimonial: "Achat de 3 téléphones Blackview pour mon équipe terrain. Robustes, abordables et un vrai conseil avant l'achat. Exactement ce qu'il nous fallait.",
    by: "Emmanuel Adjovi", role: "Entrepreneur",
    imgSrc: "/images/client-4.avif",
  },
  {
    tempId: 4,
    testimonial: "Leur équipe a géré toute notre stratégie digitale et nos réseaux sociaux. Résultats au rendez-vous, communication claire. Un partenaire fiable.",
    by: "Pascal Kodjo", role: "Directeur Marketing",
    imgSrc: "/images/client-5.avif",
  },
]

interface CardProps {
  position: number
  item: Item
  handleMove: (steps: number) => void
  cardSize: number
}

function TestimonialCard({ position, item, handleMove, cardSize }: CardProps) {
  const isCenter = position === 0

  return (
    <div
      onClick={() => handleMove(position)}
      style={{
        position: "absolute", left: "50%", top: "50%", cursor: "pointer",
        width: cardSize, height: cardSize, padding: "32px",
        borderWidth: "2px", borderStyle: "solid",
        transition: "all 0.5s cubic-bezier(0.4,0,0.2,1)",
        zIndex: isCenter ? 10 : 0,
        background: isCenter ? "linear-gradient(150deg,#0F1E4A 0%,#1A3A8F 55%,#1E9FE8 100%)" : "var(--surface)",
        color: isCenter ? "#fff" : "var(--color-text-heading)",
        borderColor: isCenter ? "#1E9FE8" : "var(--surface-border)",
        clipPath: "polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)",
        transform: `translate(-50%,-50%) translateX(${(cardSize / 1.5) * position}px) translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px) rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)`,
        boxShadow: isCenter ? "0px 8px 0px 4px rgba(15,30,74,0.15)" : "0 4px 24px rgba(0,0,0,0.06)",
      }}
    >
      {/* Ligne diagonale décorative (coin coupé) */}
      <span style={{
        position: "absolute", display: "block", transformOrigin: "top right",
        transform: "rotate(45deg)", right: -2, top: 48,
        width: SQRT_5000, height: 2,
        background: isCenter ? "rgba(255,255,255,0.25)" : "var(--surface-border)",
      }} />

      {/* Guillemet filigrane */}
      <Quote size={48} style={{ position: "absolute", top: 22, right: 28, opacity: isCenter ? 0.18 : 0.06 }}
        color={isCenter ? "#fff" : "#1E9FE8"} fill={isCenter ? "#fff" : "#1E9FE8"} />

      {/* Photo */}
      <img
        src={item.imgSrc}
        alt={item.by}
        style={{
          marginBottom: 16, height: 56, width: 48, objectFit: "cover", objectPosition: "top",
          background: "#F1F5F9",
          boxShadow: isCenter ? "3px 3px 0px rgba(255,255,255,0.4)" : "3px 3px 0px #F1F5F9",
        }}
      />

      {/* Texte */}
      <h3 style={{
        fontSize: cardSize < 320 ? "0.95rem" : "1.15rem", fontWeight: 600, lineHeight: 1.5, margin: 0,
        color: isCenter ? "#fff" : "var(--color-text-heading)",
      }}>
        « {item.testimonial} »
      </h3>

      {/* Auteur */}
      <p style={{
        position: "absolute", bottom: 32, left: 32, right: 32, marginTop: 8,
        fontSize: "0.85rem", fontStyle: "italic", lineHeight: 1.4,
        color: isCenter ? "rgba(255,255,255,0.82)" : "var(--color-text-body)",
      }}>
        — {item.by}, <span style={{ fontStyle: "normal", fontWeight: 600 }}>{item.role}</span>
      </p>
    </div>
  )
}

export default function TestimonialsSection() {
  const [cardSize, setCardSize] = useState(365)
  const [list, setList] = useState<Item[]>(TESTIMONIALS)

  const handleMove = (steps: number) => {
    const newList = [...list]
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift()
        if (!item) return
        newList.push({ ...item, tempId: Math.random() })
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop()
        if (!item) return
        newList.unshift({ ...item, tempId: Math.random() })
      }
    }
    setList(newList)
  }

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)")
      setCardSize(matches ? 365 : 290)
    }
    updateSize()
    window.addEventListener("resize", updateSize)
    return () => window.removeEventListener("resize", updateSize)
  }, [])

  // Auto-rotation
  useEffect(() => {
    const t = setInterval(() => handleMove(1), 5500)
    return () => clearInterval(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list])

  return (
    <section style={{ background: "var(--surface-alt)", padding: "88px 5% 72px", position: "relative", overflow: "hidden" }}>
      {/* Décor */}
      <div style={{ position: "absolute", top: "8%", right: "-100px", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle,rgba(30,159,232,0.05) 0%,transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "0", left: "-80px", width: "320px", height: "320px", borderRadius: "50%", background: "radial-gradient(circle,rgba(16,185,129,0.04) 0%,transparent 70%)", pointerEvents: "none" }} />

      {/* En-tête */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
        style={{ textAlign: "center", marginBottom: "24px", position: "relative", zIndex: 1 }}>
        <span style={{ display: "inline-block", fontSize: "10px", fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase", padding: "6px 16px", borderRadius: "999px", background: "#EFF6FF", color: "#1E9FE8", border: "1px solid #BFDBFE", marginBottom: "16px" }}>
          Ils nous font confiance
        </span>
        <h2 style={{ fontSize: "clamp(1.8rem,3.5vw,2.6rem)", fontWeight: 900, color: "var(--color-text-heading)", margin: "0 0 12px", letterSpacing: "-0.02em" }}>
          Ce que disent nos clients
        </h2>
        <p style={{ fontSize: "1rem", color: "var(--color-text-body)", margin: 0, lineHeight: 1.7 }}>
          Plus de 50 000 clients nous font confiance à Lomé et en Afrique de l&apos;Ouest.
        </p>
      </motion.div>

      {/* Scène stagger */}
      <div style={{ position: "relative", width: "100%", height: 540, overflow: "hidden" }}>
        {list.map((item, index) => {
          const position = list.length % 2
            ? index - (list.length - 1) / 2
            : index - list.length / 2
          return (
            <TestimonialCard
              key={item.tempId}
              item={item}
              handleMove={handleMove}
              position={position}
              cardSize={cardSize}
            />
          )
        })}

        {/* Contrôles */}
        <div style={{ position: "absolute", bottom: 8, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 12, zIndex: 20 }}>
          {[
            { dir: -1, Icon: ChevronLeft, label: "Précédent" },
            { dir: 1, Icon: ChevronRight, label: "Suivant" },
          ].map(({ dir, Icon, label }) => (
            <button key={label} onClick={() => handleMove(dir)} aria-label={label}
              style={{ width: 52, height: 52, display: "flex", alignItems: "center", justifyContent: "center", background: "var(--surface)", border: "2px solid var(--surface-border)", color: "var(--color-text-heading)", cursor: "pointer", transition: "all 0.2s" }}
              onMouseEnter={e => { const el = e.currentTarget; el.style.background = "linear-gradient(135deg,#1A3A8F,#1E9FE8)"; el.style.color = "#fff"; el.style.borderColor = "#1E9FE8" }}
              onMouseLeave={e => { const el = e.currentTarget; el.style.background = "var(--surface)"; el.style.color = "var(--color-text-heading)"; el.style.borderColor = "var(--surface-border)" }}>
              <Icon size={22} />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
