"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import HeroSection from "@/components/sections/hero-section"
import PillarsSection from "@/components/sections/pillars-section"
import AgendaSection from "@/components/sections/agenda-section"
import PricingSection from "@/components/sections/pricing-section"
import BoothGuidelinesSection from "@/components/sections/booth-guidelines-section"
import ContactSection from "@/components/sections/contact-section"
import Footer from "@/components/footer"
import Starfield from "@/components/starfield"
import BackToTop from "@/components/back-to-top"
import USPSection from "@/components/sections/usp-section"
import AdvisorsSection from "@/components/sections/advisors-section"
import BoothMapSection from "@/components/sections/booth-map-section"

export default function Home() {
  const [language, setLanguage] = useState<"vi" | "en">("vi")
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <main className="bg-gradient-to-b from-orange-50 via-yellow-50 to-red-50 text-gray-900 overflow-hidden">
      <Starfield />

      <Header language={language} onLanguageChange={setLanguage} />

      <div id="home">
        <HeroSection language={language} />
      </div>

      <PillarsSection language={language} />
      <USPSection language={language} />

      <div id="advisors">
        <AdvisorsSection language={language} />
      </div>

      <BoothMapSection language={language} />

      <div id="agenda">
        <AgendaSection language={language} />
      </div>

      <div id="pricing">
        <PricingSection language={language} />
      </div>

      <div id="booth">
        <BoothGuidelinesSection language={language} />
      </div>

      <ContactSection language={language} />

      <Footer language={language} />

      <BackToTop visible={showBackToTop} />
    </main>
  )
}
