"use client"

import CountUp from "react-countup"
import { STATS } from "@/constants/data"
import { useScrollAnimation } from "@/hooks/useScrollAnimation"

export default function StatsSection() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="py-20"
      style={{ background: "var(--color-brand-dark)" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {STATS.map((stat) => (
            <div key={stat.label} className="space-y-2">
              <p className="text-4xl md:text-5xl font-bold text-white">
                {isVisible ? (
                  <CountUp end={stat.value} duration={2.5} separator=" " />
                ) : (
                  "0"
                )}
                <span style={{ color: "var(--color-brand-primary)" }}>{stat.suffix}</span>
              </p>
              <p className="text-sm text-white/60 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
