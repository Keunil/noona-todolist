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
              <img
                src="https://crystalpng.com/wp-content/uploads/2025/05/pwc-logo.png"
                alt="PwC Logo"
                className="h-12 w-auto"
              />
              <div className="ml-4 border-l pl-4 flex flex-col justify-center border-gray-300">
                <span className="text-xl font-bold text-gray-900">M&A Platform</span>
                <span className="text-xs text-gray-500">삼일회계법인</span>
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
                    <span className="px-2 bg-white text-gray-500">또는</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <Button variant="outline" className="py-6">
                    <img src="/placeholder.svg?key=google-icon" alt="Google" className="h-5 w-5" />
                  </Button>
                  <Button variant="outline" className="py-6">
                    <img src="/placeholder.svg?key=apple-icon" alt="Apple" className="h-5 w-5" />
                  </Button>
                  <Button variant="outline" className="py-6">
                    <img src="/placeholder.svg?key=kakao-icon" alt="Kakao" className="h-5 w-5" />
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
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center">
              <img
                src="https://crystalpng.com/wp-content/uploads/2025/05/pwc-logo.png"
                alt="PwC Logo"
                className="h-8 w-auto"
              />
              <p className="ml-4 text-sm text-gray-500">© {new Date().getFullYear()} PwC. All rights reserved.</p>
            </div>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-sm text-gray-500 hover:text-gray-700">
                개인정보 처리방침
              </Link>
              <Link href="/terms" className="text-sm text-gray-500 hover:text-gray-700">
                이용약관
              </Link>
              <Link href="/contact" className="text-sm text-gray-500 hover:text-gray-700">
                문의하기
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
