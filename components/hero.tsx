"use client"
import { motion } from "framer-motion"

export default function Hero() {
  return (
    <section className="relative flex items-center min-h-screen">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/30 z-10"></div>
        <img
          src="/images/hero-background.jpg"
          alt="DealMate professionals in modern office environment"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight whitespace-nowrap md:whitespace-normal">
            Your next deals, powered by DealMate.
          </h1>

          <h2 className="text-xl md:text-2xl font-light text-white mb-12 max-w-3xl">
            Navigate your M&A opportunities with proven expertise and a network you can highly trust.
          </h2>
        </motion.div>
      </div>

      {/* Add scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  )
}
