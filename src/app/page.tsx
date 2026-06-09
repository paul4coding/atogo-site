import HeroSection from "@/components/sections/HeroSection"
import PartnersSection from "@/components/sections/PartnersSection"
import ServicesSection from "@/components/sections/ServicesSection"
import PhonesSection from "@/components/sections/PhonesSection"
import TransfersSection from "@/components/sections/TransfersSection"
import TestimonialsSection from "@/components/sections/TestimonialsSection"
import LatestNewsSection from "@/components/sections/LatestNewsSection"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <PartnersSection />
        <ServicesSection />
        <PhonesSection />
        <TransfersSection />
        <TestimonialsSection />
        <LatestNewsSection />
      </main>
      <Footer />
    </>
  )
}
