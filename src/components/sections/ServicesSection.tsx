"use client"

import { motion } from "framer-motion"
import { Wallet, Server, TrendingUp, Shield, FileText } from "lucide-react"
import { SERVICES } from "@/constants/data"

const ICON_MAP = { Wallet, Server, TrendingUp, Shield, FileText }

export default function ServicesSection() {
  return (
    <section className="py-24" style={{ background: "var(--color-bg-alt)" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span
            className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full"
            style={{ background: "var(--color-brand-light)", color: "var(--color-brand-dark)" }}
          >
            Ce que nous faisons
          </span>
          <h2 className="mt-4 text-4xl font-semibold" style={{ color: "var(--color-text-heading)" }}>
            Nos services
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => {
            const Icon = ICON_MAP[service.icon as keyof typeof ICON_MAP]
            const isDanaya = service.color === "danaya"

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                  style={{
                    background: isDanaya ? "var(--color-danaya-bg)" : "var(--color-brand-light)",
                  }}
                >
                  <Icon
                    size={22}
                    style={{ color: isDanaya ? "var(--color-danaya-primary)" : "var(--color-brand-primary)" }}
                  />
                </div>
                <h3 className="font-semibold text-lg mb-2" style={{ color: "var(--color-text-heading)" }}>
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-body)" }}>
                  {service.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
