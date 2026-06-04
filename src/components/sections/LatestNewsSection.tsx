"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Calendar, ArrowRight, Newspaper } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import type { News } from "@/types/database"

export default function LatestNewsSection() {
  const [news, setNews] = useState<News[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()
    supabase.from("news").select("*").eq("status", "published")
      .order("published_at", { ascending: false }).limit(3)
      .then(({ data }) => { setNews(data ?? []); setLoading(false) })
  }, [])

  // Ne rien afficher s'il n'y a aucune actualité
  if (!loading && news.length === 0) return null

  return (
    <section style={{ background: "#fff", padding: "96px 5%", position: "relative" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        {/* En-tête */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "16px", marginBottom: "44px" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "7px", fontSize: "10px", fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase", padding: "6px 16px", borderRadius: "999px", background: "#ECFDF5", color: "#059669", border: "1px solid #A7F3D0", marginBottom: "16px" }}>
              <Newspaper size={11} /> Actualités
            </span>
            <h2 style={{ fontSize: "clamp(1.8rem,3.5vw,2.6rem)", fontWeight: 900, color: "#1A3A8F", margin: 0, letterSpacing: "-0.02em" }}>
              Les dernières nouvelles
            </h2>
          </motion.div>

          <Link href="/actualites"
            style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "11px 22px", borderRadius: "12px", background: "#F8FAFC", border: "1.5px solid #E2E8F0", color: "#1A3A8F", fontWeight: 700, fontSize: "0.88rem", textDecoration: "none", transition: "all 0.2s" }}
            onMouseEnter={e => { const el = e.currentTarget; el.style.background = "#EFF6FF"; el.style.borderColor = "#1E9FE8" }}
            onMouseLeave={e => { const el = e.currentTarget; el.style.background = "#F8FAFC"; el.style.borderColor = "#E2E8F0" }}>
            Toutes les actualités <ArrowRight size={15} />
          </Link>
        </div>

        {/* Grille */}
        {loading ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "20px" }} className="news-home-grid">
            {[...Array(3)].map((_, i) => (
              <div key={i} style={{ borderRadius: "20px", background: "#F1F5F9", height: "300px", animation: "pulse 1.5s ease-in-out infinite" }} />
            ))}
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "20px" }} className="news-home-grid">
            {news.map((item, idx) => {
              const date = item.published_at
                ? new Date(item.published_at).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })
                : ""
              return (
                <motion.div key={item.id}
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: idx * 0.08 }}>
                  <Link href="/actualites" style={{ textDecoration: "none", display: "block", height: "100%" }}>
                    <div style={{ background: "#fff", borderRadius: "20px", overflow: "hidden", border: "1.5px solid #E2E8F0", boxShadow: "0 2px 16px rgba(0,0,0,0.05)", height: "100%", display: "flex", flexDirection: "column", transition: "transform 0.25s, box-shadow 0.25s, border-color 0.25s", cursor: "pointer" }}
                      onMouseEnter={e => { const el = e.currentTarget; el.style.transform = "translateY(-4px)"; el.style.boxShadow = "0 16px 48px rgba(26,58,143,0.1)"; el.style.borderColor = "#BFDBFE" }}
                      onMouseLeave={e => { const el = e.currentTarget; el.style.transform = "translateY(0)"; el.style.boxShadow = "0 2px 16px rgba(0,0,0,0.05)"; el.style.borderColor = "#E2E8F0" }}>

                      {item.image_url ? (
                        <div style={{ height: "170px", overflow: "hidden" }}>
                          <img src={item.image_url} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        </div>
                      ) : (
                        <div style={{ height: "6px", background: `linear-gradient(90deg, hsl(${(idx * 60) % 360},70%,55%), hsl(${(idx * 60 + 50) % 360},70%,65%))` }} />
                      )}

                      <div style={{ padding: "20px 22px", flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
                        {date && (
                          <p style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "0.72rem", color: "#94A3B8", margin: 0, letterSpacing: "0.04em", textTransform: "uppercase", fontWeight: 600 }}>
                            <Calendar size={10} />{date}
                          </p>
                        )}
                        <h3 style={{ fontSize: "0.98rem", fontWeight: 800, color: "#1A3A8F", margin: 0, lineHeight: 1.35, letterSpacing: "-0.01em" }}>{item.title}</h3>
                        <p style={{ fontSize: "0.84rem", color: "#64748B", lineHeight: 1.7, margin: 0, flex: 1 }}>
                          {item.excerpt.length > 110 ? item.excerpt.slice(0, 110) + "…" : item.excerpt}
                        </p>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", fontSize: "0.8rem", color: "#1E9FE8", fontWeight: 700, marginTop: "4px" }}>
                          Lire la suite <ArrowRight size={13} />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
