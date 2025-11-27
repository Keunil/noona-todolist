"use client"

import { useEffect } from "react"
import Hero from "@/components/hero"
import ServiceFeatures from "@/components/service-features"
import FAQ from "@/components/faq"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"

export default function ClientPage() {
  // Add this useEffect to handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowDown") {
        e.preventDefault()
        window.scrollBy({ top: window.innerHeight, behavior: "smooth" })
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        window.scrollBy({ top: -window.innerHeight, behavior: "smooth" })
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <ServiceFeatures />
        <div className="bg-gray-50">
          <FAQ />
          <Footer />
        </div>
      </main>
    </div>
  )
}
