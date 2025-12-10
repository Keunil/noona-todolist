"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isHeroVisible, setIsHeroVisible] = useState(true)

  // Use ref to track the hero section
  const heroObserverRef = useRef(null)

  useEffect(() => {
    // Set up intersection observer to detect when hero is visible
    const heroSection = document.querySelector("section:first-of-type")

    if (heroSection) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          // When hero visibility changes, update state
          setIsHeroVisible(entry.isIntersecting)
        },
        {
          threshold: 0.1, // Trigger when at least 10% of the hero is visible
          rootMargin: "-80px 0px 0px 0px", // Account for navbar height
        },
      )

      observer.observe(heroSection)
      heroObserverRef.current = observer

      return () => {
        if (heroObserverRef.current) {
          observer.disconnect()
        }
      }
    }
  }, [])

  // Add smooth scroll function
  const handleNavClick = (e, targetId) => {
    e.preventDefault()
    const targetElement = document.getElementById(targetId)
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" })
    }
    setIsOpen(false)
  }

  const navLinks = [
    { name: "서비스 기능", href: "service-features" },
    { name: "FAQ", href: "faq" },
  ]

  // Determine if navbar should have dark text/background
  const shouldBeDark = !isHeroVisible

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        shouldBeDark ? "bg-white shadow-sm" : "bg-transparent",
      )}
    >
      <div className="max-w-screen-xl mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <div className="flex flex-col justify-center">
              <span className={cn("text-2xl font-bold", shouldBeDark ? "text-gray-900" : "text-white")}>DealMate</span>
              <span className={cn("text-xs", shouldBeDark ? "text-gray-500" : "text-white/70")}>M&A Platform</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={`#${link.href}`}
                className={cn(
                  "text-sm font-medium transition-colors",
                  shouldBeDark ? "text-gray-800 hover:text-black" : "text-white hover:text-gray-200",
                )}
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right side items - Sign up and Sign in buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/signup">
              <Button size="sm" className="rounded-none bg-[#F4511E] hover:bg-[#D73C11] text-white border-none">
                회원가입
              </Button>
            </Link>
            <Link href="/signin">
              <Button
                variant="outline"
                size="sm"
                className="rounded-none border-gray-300 text-gray-800 hover:bg-gray-100 bg-white"
              >
                로그인
              </Button>
            </Link>
          </div>

          {/* Mobile Navigation Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className={cn("md:hidden", shouldBeDark ? "text-gray-800" : "text-white")}
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d={isOpen ? "M18 6L6 18M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="px-6 py-4">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={`#${link.href}`}
                  className="text-gray-800 hover:text-black transition-colors py-2"
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 border-t border-gray-200 flex flex-col space-y-3">
                <Link href="/signup">
                  <Button className="w-full justify-start rounded-none bg-[#F4511E] hover:bg-[#D73C11] text-white">
                    회원가입
                  </Button>
                </Link>
                <Link href="/signin">
                  <Button
                    variant="outline"
                    className="w-full justify-start rounded-none bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
                  >
                    로그인
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
