"use client"

import CountUp from "react-countup"
import { motion } from "framer-motion"
import { Users, TrendingUp, Globe, Award } from "lucide-react"
import { STATS } from "@/constants/data"
import { useScrollAnimation } from "@/hooks/useScrollAnimation"

const STAT_META = [
  { Icon: Users,      color: "#1E9FE8", bg: "rgba(30,159,232,0.12)"  },
  { Icon: TrendingUp, color: "#10B981", bg: "rgba(16,185,129,0.12)"  },
  { Icon: Globe,      color: "#A78BFA", bg: "rgba(167,139,250,0.12)" },
  { Icon: Award,      color: "#FBBF24", bg: "rgba(251,191,36,0.12)"  },
]

export default function StatsSection() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      style={{
        position: "relative",
        background: "linear-gradient(160deg, #0F1E4A 0%, #1A3A8F 60%, #0F1E4A 100%)",
        padding: "90px 0",
        overflow: "hidden",
      }}
    >
      {/* Décors en arrière-plan */}
      <div style={{
        position: "absolute", top: "-80px", left: "20%",
        width: "400px", height: "400px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(30,159,232,0.08) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "-60px", right: "15%",
        width: "300px", height: "300px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ padding: "0 5%", position: "relative", zIndex: 1 }}>

        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.4 }}
          style={{ textAlign: "center", marginBottom: "56px" }}
        >
          <span style={{
            fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em",
            textTransform: "uppercase", padding: "7px 18px", borderRadius: "999px",
            background: "rgba(30,159,232,0.15)", color: "#60C8FF",
            border: "1px solid rgba(30,159,232,0.25)",
          }}>
            @TOGO en chiffres
          </span>
        </motion.div>

        {/* Grid stats */}
        <div className="stats-grid">
          {STATS.map((stat, i) => {
            const { Icon, color, bg } = STAT_META[i]
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                style={{
                  display: "flex", flexDirection: "column", alignItems: "center",
                  padding: "40px 24px",
                  position: "relative",
                  // séparateur vertical entre les stats
                  borderRight: i < STATS.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none",
                }}
              >
                {/* Icône */}
                <div style={{
                  width: "52px", height: "52px", borderRadius: "14px",
                  background: bg, border: `1px solid ${color}30`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: "20px",
                }}>
                  <Icon size={22} color={color} />
                </div>

                {/* Chiffre animé */}
                <p style={{
                  fontSize: "clamp(1.6rem, 4vw, 3.2rem)", fontWeight: 800,
                  color: "#fff", margin: "0 0 6px", lineHeight: 1,
                  letterSpacing: "-0.02em",
                }}>
                  {isVisible ? (
                    <CountUp end={stat.value} duration={2.5} separator=" " />
                  ) : "0"}
                  <span style={{ color }}>{stat.suffix}</span>
                </p>

                {/* Label */}
                <p style={{
                  fontSize: "0.88rem", fontWeight: 500,
                  color: "rgba(255,255,255,0.5)", margin: 0,
                  textAlign: "center",
                }}>
                  {stat.label}
                </p>

                {/* Trait coloré sous le chiffre */}
                <motion.div
                  initial={{ width: 0 }} whileInView={{ width: "40px" }}
                  viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                  style={{
                    height: "3px", borderRadius: "999px",
                    background: color, marginTop: "16px",
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
