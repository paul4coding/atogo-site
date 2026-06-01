import HeroSection from "@/components/sections/HeroSection"
import StatsSection from "@/components/sections/StatsSection"
import ServicesSection from "@/components/sections/ServicesSection"
import ContactSection from "@/components/sections/ContactSection"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <StatsSection />
        <ServicesSection />
        {/* TODO: DanayaCashSection */}
        {/* TODO: CyberSecSection */}
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
