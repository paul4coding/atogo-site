import type { Metadata } from "next"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import ContactSection from "@/components/sections/ContactSection"

export const metadata: Metadata = {
  title: "Contact",
  description: "Contactez @TOGO — réponse sous 24h. Lomé, Togo.",
}

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <div style={{
          background: "linear-gradient(135deg, #f0f7ff 0%, #ffffff 60%, #f8faff 100%)",
          paddingTop: "68px",
        }}>
          <div style={{
            padding: "64px 5% 48px",
            textAlign: "center",
          }}>
            <span style={{
              display: "inline-block", fontSize: "11px", fontWeight: 700,
              letterSpacing: "0.14em", textTransform: "uppercase",
              padding: "7px 18px", borderRadius: "999px",
              background: "var(--color-brand-light)", color: "var(--color-brand-dark)",
              marginBottom: "20px",
            }}>
              On vous répond sous 24h
            </span>
            <h1 style={{
              fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700,
              color: "var(--color-text-heading)", margin: "0 0 14px",
            }}>
              Parlons de votre projet
            </h1>
            <p style={{
              fontSize: "1.05rem", color: "var(--color-text-body)",
              maxWidth: "480px", margin: "0 auto",
            }}>
              Notre équipe à Lomé est disponible du lundi au samedi, de 8h à 18h.
            </p>
          </div>
        </div>

        {/* Formulaire complet */}
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
