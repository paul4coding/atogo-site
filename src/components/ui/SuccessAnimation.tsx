"use client"

import { useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle } from "lucide-react"

interface Props {
  visible: boolean
  title?: string
  subtitle?: string
  onClose?: () => void
  autoDismissMs?: number
}

export default function SuccessAnimation({
  visible,
  title = "Envoyé avec succès !",
  subtitle = "Nous vous répondrons très prochainement.",
  onClose,
  autoDismissMs = 3500,
}: Props) {
  useEffect(() => {
    if (!visible) return
    const t = setTimeout(() => onClose?.(), autoDismissMs)
    return () => clearTimeout(t)
  }, [visible, autoDismissMs, onClose])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: "fixed", inset: 0, zIndex: 300,
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "24px",
            background: "rgba(7,15,43,0.75)",
            backdropFilter: "blur(8px)",
          }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 24 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: -16 }}
            transition={{ type: "spring", stiffness: 320, damping: 28, delay: 0.05 }}
            onClick={e => e.stopPropagation()}
            style={{
              background: "#fff", borderRadius: "28px",
              padding: "52px 48px 44px",
              textAlign: "center", maxWidth: "400px", width: "100%",
              boxShadow: "0 32px 100px rgba(0,0,0,0.25)",
              position: "relative", overflow: "hidden",
            }}
          >
            {/* Halo de fond */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 2.5, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{
                position: "absolute", top: "50%", left: "50%",
                transform: "translate(-50%,-50%)",
                width: "200px", height: "200px", borderRadius: "50%",
                background: "radial-gradient(circle, rgba(30,159,232,0.08) 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />

            {/* Logo @TOGO avec effet fill */}
            <div style={{ position: "relative", display: "inline-block", marginBottom: "28px" }}>
              {/* Logo gris en dessous */}
              <Image
                src="/images/logo.png"
                alt="@TOGO"
                width={160}
                height={54}
                unoptimized
                style={{ height: "48px", width: "auto", filter: "grayscale(1) opacity(0.12)", display: "block" }}
              />
              {/* Logo couleur qui se remplit de gauche à droite */}
              <motion.div
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                animate={{ clipPath: "inset(0 0% 0 0)" }}
                transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                style={{ position: "absolute", inset: 0 }}
              >
                <Image
                  src="/images/logo.png"
                  alt="@TOGO"
                  width={160}
                  height={54}
                  unoptimized
                  style={{ height: "48px", width: "auto", display: "block" }}
                />
              </motion.div>
            </div>

            {/* Cercle check animé */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.9 }}
              style={{ marginBottom: "20px" }}
            >
              <div style={{
                width: "64px", height: "64px", borderRadius: "50%",
                background: "linear-gradient(135deg, #0D7A4E, #10B981)",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto",
                boxShadow: "0 8px 32px rgba(16,185,129,0.35)",
              }}>
                <motion.div
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 1.1 }}
                >
                  <CheckCircle size={30} color="#fff" strokeWidth={2.5} />
                </motion.div>
              </div>
            </motion.div>

            {/* Textes */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 1.0 }}
              style={{ fontSize: "1.15rem", fontWeight: 800, color: "#1A3A8F", margin: "0 0 8px" }}
            >
              {title}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 1.15 }}
              style={{ fontSize: "0.87rem", color: "#64748B", lineHeight: 1.65, margin: "0 0 28px" }}
            >
              {subtitle}
            </motion.p>

            {/* Barre de progression auto-dismiss */}
            <div style={{ height: "3px", background: "#F1F5F9", borderRadius: "999px", overflow: "hidden" }}>
              <motion.div
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: autoDismissMs / 1000, ease: "linear", delay: 0.3 }}
                style={{ height: "100%", background: "linear-gradient(90deg, #1E9FE8, #10B981)", borderRadius: "999px" }}
              />
            </div>
            <p style={{ fontSize: "0.7rem", color: "#94A3B8", marginTop: "8px" }}>Fermeture automatique…</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
