"use client"

import CountUp from "react-countup"
import { motion } from "framer-motion"
import { Users, TrendingUp, Globe, Award } from "lucide-react"
import { STATS } from "@/constants/data"
import { useScrollAnimation } from "@/hooks/useScrollAnimation"

const STAT_META = [
  { Icon: Users,      color: "#1E9FE8", glow: "rgba(30,159,232,0.35)",  bg: "rgba(30,159,232,0.12)",  border: "rgba(30,159,232,0.25)"  },
  { Icon: TrendingUp, color: "#10B981", glow: "rgba(16,185,129,0.35)",  bg: "rgba(16,185,129,0.12)",  border: "rgba(16,185,129,0.25)"  },
  { Icon: Globe,      color: "#A78BFA", glow: "rgba(167,139,250,0.35)", bg: "rgba(167,139,250,0.12)", border: "rgba(167,139,250,0.25)" },
  { Icon: Award,      color: "#FBBF24", glow: "rgba(251,191,36,0.35)",  bg: "rgba(251,191,36,0.12)",  border: "rgba(251,191,36,0.25)"  },
]

export default function StatsSection() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      style={{
        position: "relative",
        background: "linear-gradient(160deg, #070F2B 0%, #0F1E4A 50%, #070F2B 100%)",
        padding: "90px 0",
        overflow: "hidden",
      }}
    >
      {/* Glow décoratif centre */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: "600px", height: "300px",
        background: "radial-gradient(ellipse, rgba(30,159,232,0.06) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ padding: "0 5%", position: "relative", zIndex: 1 }}>

        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.4 }}
          style={{ textAlign: "center", marginBottom: "52px" }}
        >
          <span style={{
            fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em",
            textTransform: "uppercase", padding: "7px 18px", borderRadius: "999px",
            background: "rgba(30,159,232,0.12)", color: "#60C8FF",
            border: "1px solid rgba(30,159,232,0.2)",
          }}>
            @TOGO en chiffres
          </span>
        </motion.div>

        {/* Grid 2×2 glassmorphism */}
        <div className="stats-grid" style={{ maxWidth: "900px", margin: "0 auto" }}>
          {STATS.map((stat, i) => {
            const { Icon, color, glow, bg, border } = STAT_META[i]
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 32, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                style={{
                  position: "relative",
                  background: "rgba(255,255,255,0.04)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  border: `1px solid ${border}`,
                  borderRadius: "20px",
                  padding: "36px 32px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "16px",
                  overflow: "hidden",
                  cursor: "default",
                }}
              >
                {/* Glow coin haut-gauche */}
                <div style={{
                  position: "absolute", top: "-30px", left: "-30px",
                  width: "120px", height: "120px", borderRadius: "50%",
                  background: `radial-gradient(circle, ${glow} 0%, transparent 70%)`,
                  pointerEvents: "none",
                }} />

                {/* Icône */}
                <div style={{
                  width: "54px", height: "54px", borderRadius: "14px",
                  background: bg, border: `1px solid ${border}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: `0 0 20px ${glow}`,
                }}>
                  <Icon size={24} color={color} />
                </div>

                {/* Chiffre */}
                <div>
                  <p style={{
                    fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 900,
                    color: "#fff", margin: "0 0 4px", lineHeight: 1,
                    letterSpacing: "-0.02em",
                  }}>
                    {isVisible
                      ? <CountUp end={stat.value} duration={2.5} separator=" " />
                      : "0"}
                    <span style={{ color, marginLeft: "2px" }}>{stat.suffix}</span>
                  </p>
                  <p style={{
                    fontSize: "0.92rem", fontWeight: 500,
                    color: "rgba(255,255,255,0.5)", margin: 0,
                  }}>
                    {stat.label}
                  </p>
                </div>

                {/* Barre colorée en bas */}
                <motion.div
                  initial={{ width: 0 }} whileInView={{ width: "48px" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.4 + i * 0.1 }}
                  style={{
                    height: "3px", borderRadius: "999px",
                    background: `linear-gradient(90deg, ${color}, transparent)`,
                  }}
                />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
