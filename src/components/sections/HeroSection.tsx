"use client"

import dynamic from "next/dynamic"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowDown } from "lucide-react"

const GlobeAfrica = dynamic(() => import("@/components/3d/GlobeAfrica"), { ssr: false })
const ParticlesBg = dynamic(() => import("@/components/3d/ParticlesBg"), { ssr: false })

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white">
      <ParticlesBg />

      <div className="max-w-7xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center py-24">
        {/* Text */}
        <div className="space-y-6">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full"
            style={{ background: "var(--color-brand-light)", color: "var(--color-brand-dark)" }}
          >
            Fintech · IT · Digital · Sécurité
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-6xl font-semibold leading-tight"
            style={{ color: "var(--color-brand-dark)" }}
          >
            L&apos;avenir digital<br />du Togo,<br />
            <span style={{ color: "var(--color-brand-primary)" }}>aujourd&apos;hui.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg max-w-md"
            style={{ color: "var(--color-text-body)" }}
          >
            Solutions fintech, informatiques, cybersécurité et marketing digital pour les entreprises et particuliers en Afrique de l&apos;Ouest.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              href="/danayacash"
              className="px-6 py-3 rounded-lg text-white font-medium transition-colors"
              style={{ backgroundColor: "var(--color-danaya-primary)" }}
            >
              Découvrir DanayaCash
            </Link>
            <Link
              href="/services"
              className="px-6 py-3 rounded-lg font-medium border transition-colors"
              style={{
                borderColor: "var(--color-brand-primary)",
                color: "var(--color-brand-primary)",
              }}
            >
              Nos services
            </Link>
          </motion.div>
        </div>

        {/* Globe */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="h-[400px] md:h-[500px]"
        >
          <GlobeAfrica />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        style={{ color: "var(--color-brand-primary)" }}
      >
        <ArrowDown size={24} />
      </motion.div>
    </section>
  )
}
