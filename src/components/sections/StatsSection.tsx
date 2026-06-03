"use client"

import CountUp from "react-countup"
import { motion } from "framer-motion"
import { Users, Layers, Smartphone, Award } from "lucide-react"
import { STATS } from "@/constants/data"
import { useScrollAnimation } from "@/hooks/useScrollAnimation"

const STAT_META = [
  { Icon: Users,      color: "#1E9FE8", glow: "rgba(30,159,232,0.5)",   bg: "linear-gradient(135deg,#1A3A8F,#1E9FE8)" },
  { Icon: Layers,     color: "#10B981", glow: "rgba(16,185,129,0.5)",   bg: "linear-gradient(135deg,#0D7A4E,#10B981)" },
  { Icon: Smartphone, color: "#FBBF24", glow: "rgba(251,191,36,0.5)",   bg: "linear-gradient(135deg,#B45309,#FBBF24)" },
  { Icon: Award,      color: "#A78BFA", glow: "rgba(167,139,250,0.5)",  bg: "linear-gradient(135deg,#5B21B6,#A78BFA)" },
]

export default function StatsSection() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      style={{
        position: "relative",
        background: "#070F2B",
        padding: "100px 0",
        overflow: "hidden",
      }}
    >
      {/* Glow central */}
      <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:"800px", height:"400px", background:"radial-gradient(ellipse,rgba(30,159,232,0.06) 0%,transparent 70%)", pointerEvents:"none" }} />

      {/* Ligne décorative haut */}
      <div style={{ position:"absolute", top:0, left:0, right:0, height:"1px", background:"linear-gradient(90deg,transparent 0%,rgba(30,159,232,0.4) 30%,rgba(16,185,129,0.4) 70%,transparent 100%)" }} />
      <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"1px", background:"linear-gradient(90deg,transparent 0%,rgba(30,159,232,0.3) 50%,transparent 100%)" }} />

      <div style={{ padding:"0 5%", position:"relative", zIndex:1 }}>

        {/* Badge */}
        <motion.div initial={{ opacity:0, y:12 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.4 }}
          style={{ textAlign:"center", marginBottom:"64px" }}
        >
          <span style={{ fontSize:"11px", fontWeight:700, letterSpacing:"0.16em", textTransform:"uppercase", padding:"7px 20px", borderRadius:"999px", background:"rgba(30,159,232,0.12)", color:"#60C8FF", border:"1px solid rgba(30,159,232,0.2)" }}>
            @TOGO en chiffres
          </span>
        </motion.div>

        {/* Grid 4 cards */}
        <div className="stats-grid">
          {STATS.map((stat, i) => {
            const { Icon, color, glow, bg } = STAT_META[i]
            return (
              <motion.div key={stat.label}
                initial={{ opacity:0, y:40 }}
                whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }}
                transition={{ duration:0.6, delay:i*0.12, ease:[0.22,1,0.36,1] }}
                whileHover={{ y:-6, transition:{ duration:0.2 } }}
                style={{
                  position:"relative", borderRadius:"24px",
                  background:"rgba(255,255,255,0.04)",
                  border:"1px solid rgba(255,255,255,0.08)",
                  padding:"40px 28px 36px",
                  overflow:"hidden", cursor:"default",
                  backdropFilter:"blur(8px)",
                }}
              >
                {/* Glow coin */}
                <div style={{ position:"absolute", top:"-40px", right:"-40px", width:"120px", height:"120px", borderRadius:"50%", background:`radial-gradient(circle,${glow} 0%,transparent 70%)`, pointerEvents:"none" }} />

                {/* Ligne colorée haut */}
                <div style={{ position:"absolute", top:0, left:0, right:0, height:"3px", background:bg, borderRadius:"24px 24px 0 0" }} />

                {/* Icône avec glow */}
                <div style={{ position:"relative", marginBottom:"28px", display:"inline-block" }}>
                  <div style={{ width:"56px", height:"56px", borderRadius:"16px", background:bg, display:"flex", alignItems:"center", justifyContent:"center", boxShadow:`0 8px 32px ${glow}` }}>
                    <Icon size={26} color="#fff" />
                  </div>
                  {/* Halo pulsé */}
                  <motion.div
                    animate={{ scale:[1,1.4,1], opacity:[0.4,0,0.4] }}
                    transition={{ duration:2.5, repeat:Infinity, ease:"easeInOut", delay:i*0.6 }}
                    style={{ position:"absolute", inset:"-8px", borderRadius:"24px", background:bg, zIndex:-1, opacity:0.3 }}
                  />
                </div>

                {/* Chiffre */}
                <p style={{ fontSize:"clamp(2.4rem,4vw,3.6rem)", fontWeight:900, color:"#fff", margin:"0 0 6px", lineHeight:1, letterSpacing:"-0.03em" }}>
                  {isVisible ? <CountUp end={stat.value} duration={2.2} separator=" " /> : "0"}
                  <span style={{ color, fontSize:"0.65em" }}>{stat.suffix}</span>
                </p>

                {/* Label */}
                <p style={{ fontSize:"0.9rem", fontWeight:500, color:"rgba(255,255,255,0.45)", margin:"0 0 20px", letterSpacing:"0.01em" }}>
                  {stat.label}
                </p>

                {/* Barre de progression */}
                <div style={{ height:"3px", background:"rgba(255,255,255,0.07)", borderRadius:"999px", overflow:"hidden" }}>
                  <motion.div
                    initial={{ width:"0%" }}
                    whileInView={{ width: i === 0 ? "90%" : i === 1 ? "70%" : i === 2 ? "50%" : "80%" }}
                    viewport={{ once:true }}
                    transition={{ duration:1.2, delay:0.5 + i*0.15, ease:"easeOut" }}
                    style={{ height:"100%", background:bg, borderRadius:"999px" }}
                  />
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
