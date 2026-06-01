"use client"

import dynamic from "next/dynamic"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowDown } from "lucide-react"

const GlobeAfrica = dynamic(() => import("@/components/3d/GlobeAfrica"), { ssr: false })
const ParticlesBg = dynamic(() => import("@/components/3d/ParticlesBg"), { ssr: false })

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-white" style={{ paddingTop: "64px" }}>
      <ParticlesBg />

      <div className="max-w-7xl mx-auto px-6 w-full min-h-[calc(100vh-4rem)] grid md:grid-cols-2 gap-12 items-center py-20">
        {/* Text */}
        <div className="space-y-6">
          <motion.span
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full"
            style={{ background: "var(--color-brand-light)", color: "var(--color-brand-dark)" }}
          >
            Fintech · IT · Digital · Sécurité
          </motion.span>

          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-5xl md:text-6xl font-semibold leading-tight"
            style={{ color: "var(--color-brand-dark)" }}
          >
            L&apos;avenir digital<br />du Togo,<br />
            <span style={{ color: "var(--color-brand-primary)" }}>aujourd&apos;hui.</span>
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-lg max-w-md leading-relaxed"
            style={{ color: "var(--color-text-body)" }}
          >
            Solutions fintech, informatiques, cybersécurité et marketing digital pour les entreprises et particuliers en Afrique de l&apos;Ouest.
          </motion.p>

          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap gap-4 pt-2"
          >
            <Link
              href="/danayacash"
              className="px-6 py-3 rounded-lg text-white font-medium transition-opacity hover:opacity-90"
              style={{ backgroundColor: "var(--color-danaya-primary)" }}
            >
              Découvrir DanayaCash
            </Link>
            <Link
              href="/services"
              className="px-6 py-3 rounded-lg font-medium border-2 transition-colors hover:bg-[var(--color-brand-light)]"
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
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="h-[380px] md:h-[480px]"
        >
          <GlobeAfrica />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        style={{ color: "var(--color-brand-primary)" }}
      >
        <ArrowDown size={22} />
      </motion.div>
    </section>
  )
}
