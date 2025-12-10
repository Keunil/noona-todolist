"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Mail, Lock, Eye, EyeOff } from "lucide-react"

export default function SignInForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Reset loading state
    setIsLoading(false)

    // In a real app, you would handle authentication here
    console.log("Sign in with:", { email, password })
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-6">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="flex flex-col justify-center">
                <span className="text-2xl font-bold text-gray-900">DealMate</span>
                <span className="text-xs text-gray-500">M&A Platform</span>
              </div>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.5 }}
            className="bg-white shadow-lg rounded-lg overflow-hidden"
          >
            {/* Form Header */}
            <div className="relative h-16 bg-[#F4511E] flex items-center justify-center">
              <Link
                href="/"
                className="absolute left-4 text-white hover:text-white/80 transition-colors"
                aria-label="홈으로 돌아가기"
              >
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <h1 className="text-xl font-bold text-white">로그인</h1>
            </div>

            {/* Form Content */}
            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700">
                    이메일 주소
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      className="pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="password" className="text-gray-700">
                      비밀번호
                    </Label>
                    <Link href="/forgot-password" className="text-sm text-[#F4511E] hover:underline">
                      비밀번호 찾기
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 표시"}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center">
                  <Checkbox
                    id="remember-me"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked === true)}
                  />
                  <Label htmlFor="remember-me" className="ml-2 text-sm text-gray-600">
                    30일 동안 로그인 유지
                  </Label>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#F4511E] hover:bg-[#D73C11] text-white rounded-md py-6"
                  disabled={isLoading}
                >
                  {isLoading ? "로그인 중..." : "로그인"}
                </Button>
              </form>

              {/* Social Login Options */}
              <div className="mt-6">
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">간편 로그인</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <Button type="button" className="py-6 bg-[#FEE500] hover:bg-[#FDD835] text-[#3C1E1E]">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 3C6.5 3 2 6.6 2 11c0 2.8 1.9 5.3 4.8 6.7L6 22l4.4-2.6c.5.1 1 .1 1.6.1 5.5 0 10-3.6 10-8S17.5 3 12 3z" />
                    </svg>
                  </Button>
                  <Button type="button" className="py-6 bg-[#03C75A] hover:bg-[#02B350] text-white">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M16.273 12.845 7.376 0H0v24h7.726V11.156L16.624 24H24V0h-7.727v12.845z" />
                    </svg>
                  </Button>
                  <Button
                    type="button"
                    className="py-6 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:opacity-90 text-white"
                  >
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                    </svg>
                  </Button>
                </div>
              </div>
            </div>

            {/* Sign Up Link */}
            <div className="px-6 py-4 bg-gray-50 text-center">
              <p className="text-sm text-gray-600">
                계정이 없으신가요?{" "}
                <Link href="/signup" className="font-medium text-[#F4511E] hover:underline">
                  회원가입
                </Link>
              </p>
            </div>
          </motion.div>

          {/* Terms and Privacy */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-6 text-center text-xs text-gray-500"
          >
            로그인함으로써{" "}
            <Link href="/terms" className="text-[#F4511E] hover:underline">
              서비스 이용약관
            </Link>{" "}
            및{" "}
            <Link href="/privacy" className="text-[#F4511E] hover:underline">
              개인정보 처리방침
            </Link>
            에 동의하게 됩니다.
          </motion.p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white py-4 border-t border-gray-200">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center">
            <span className="text-lg font-bold text-gray-900">DealMate</span>
            <p className="ml-4 text-sm text-gray-500">© {new Date().getFullYear()} DealMate. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
