"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Mail, Lock, User, Eye, EyeOff, Building, Phone } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function SignUpForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    company: "",
    phone: "",
    userType: "seller",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false,
    marketing: false,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleAgreementChange = (name, checked) => {
    setAgreements((prev) => ({
      ...prev,
      [name]: checked,
    }))
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.email) {
      newErrors.email = "이메일을 입력해주세요."
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "유효한 이메일 주소를 입력해주세요."
    }

    if (!formData.password) {
      newErrors.password = "비밀번호를 입력해주세요."
    } else if (formData.password.length < 8) {
      newErrors.password = "비밀번호는 8자 이상이어야 합니다."
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "비밀번호가 일치하지 않습니다."
    }

    if (!formData.name) {
      newErrors.name = "이름을 입력해주세요."
    }

    if (!formData.company) {
      newErrors.company = "회사명을 입력해주세요."
    }

    if (!formData.phone) {
      newErrors.phone = "전화번호를 입력해주세요."
    }

    if (!agreements.terms || !agreements.privacy) {
      newErrors.agreements = "필수 약관에 동의해주세요."
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsLoading(false)

    console.log("Sign up with:", { ...formData, agreements })
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
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

      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.5 }}
            className="bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <div className="relative h-16 bg-[#F4511E] flex items-center justify-center">
              <Link
                href="/"
                className="absolute left-4 text-white hover:text-white/80 transition-colors"
                aria-label="홈으로 돌아가기"
              >
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <h1 className="text-xl font-bold text-white">회원가입</h1>
            </div>

            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-gray-700">회원 유형</Label>
                  <RadioGroup
                    defaultValue="seller"
                    className="flex space-x-4"
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, userType: value }))}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="seller" id="seller" />
                      <Label htmlFor="seller" className="cursor-pointer">
                        매도자
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="investor" id="investor" />
                      <Label htmlFor="investor" className="cursor-pointer">
                        투자자
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="advisor" id="advisor" />
                      <Label htmlFor="advisor" className="cursor-pointer">
                        자문사
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700">
                    이메일 주소 <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your.email@example.com"
                      className={`pl-10 ${errors.email ? "border-red-500" : ""}`}
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-700">
                    비밀번호 <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className={`pl-10 ${errors.password ? "border-red-500" : ""}`}
                      value={formData.password}
                      onChange={handleChange}
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
                  {errors.password ? (
                    <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                  ) : (
                    <p className="text-gray-500 text-xs mt-1">8자 이상의 비밀번호를 입력해주세요.</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-gray-700">
                    비밀번호 확인 <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className={`pl-10 ${errors.confirmPassword ? "border-red-500" : ""}`}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      aria-label={showConfirmPassword ? "비밀번호 숨기기" : "비밀번호 표시"}
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-700">
                    이름 <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="홍길동"
                      className={`pl-10 ${errors.name ? "border-red-500" : ""}`}
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company" className="text-gray-700">
                    회사명 <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="company"
                      name="company"
                      type="text"
                      placeholder="회사명을 입력해주세요"
                      className={`pl-10 ${errors.company ? "border-red-500" : ""}`}
                      value={formData.company}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  {errors.company && <p className="text-red-500 text-xs mt-1">{errors.company}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-gray-700">
                    전화번호 <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="010-1234-5678"
                      className={`pl-10 ${errors.phone ? "border-red-500" : ""}`}
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex items-start">
                    <Checkbox
                      id="terms"
                      checked={agreements.terms}
                      onCheckedChange={(checked) => handleAgreementChange("terms", checked === true)}
                      className="mt-1"
                    />
                    <Label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                      <span className="text-red-500 mr-1">*</span>
                      <Link href="/terms" className="text-[#F4511E] hover:underline">
                        서비스 이용약관
                      </Link>
                      에 동의합니다.
                    </Label>
                  </div>

                  <div className="flex items-start">
                    <Checkbox
                      id="privacy"
                      checked={agreements.privacy}
                      onCheckedChange={(checked) => handleAgreementChange("privacy", checked === true)}
                      className="mt-1"
                    />
                    <Label htmlFor="privacy" className="ml-2 text-sm text-gray-600">
                      <span className="text-red-500 mr-1">*</span>
                      <Link href="/privacy" className="text-[#F4511E] hover:underline">
                        개인정보 처리방침
                      </Link>
                      에 동의합니다.
                    </Label>
                  </div>

                  <div className="flex items-start">
                    <Checkbox
                      id="marketing"
                      checked={agreements.marketing}
                      onCheckedChange={(checked) => handleAgreementChange("marketing", checked === true)}
                      className="mt-1"
                    />
                    <Label htmlFor="marketing" className="ml-2 text-sm text-gray-600">
                      마케팅 정보 수신에 동의합니다. (선택)
                    </Label>
                  </div>

                  {errors.agreements && <p className="text-red-500 text-xs mt-1">{errors.agreements}</p>}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#F4511E] hover:bg-[#D73C11] text-white rounded-md py-6"
                  disabled={isLoading}
                >
                  {isLoading ? "처리 중..." : "회원가입"}
                </Button>
              </form>

              <div className="mt-6">
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">간편 회원가입</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button variant="outline" className="w-full py-6 bg-[#FEE500] hover:bg-[#FEE500]/90 border-[#FEE500]">
                    <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 3C6.477 3 2 6.477 2 10.75C2 13.452 3.594 15.81 6.032 17.238L5.091 20.546C5.025 20.775 5.196 21 5.438 21C5.531 21 5.621 20.963 5.688 20.896L9.516 17.803C10.306 17.934 11.143 18 12 18C17.523 18 22 14.523 22 10.75C22 6.477 17.523 3 12 3Z"
                        fill="#3C1E1E"
                      />
                    </svg>
                    카카오톡으로 시작하기
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full py-6 bg-[#03C75A] hover:bg-[#03C75A]/90 text-white border-[#03C75A]"
                  >
                    <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="white">
                      <path d="M16.273 12.845 7.376 0H0v24h7.726V11.156L16.624 24H24V0h-7.727v12.845Z" />
                    </svg>
                    네이버로 시작하기
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full py-6 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:opacity-90 text-white border-0"
                  >
                    <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="white">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.073-1.689-.073-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.057-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                    인스타그램으로 시작하기
                  </Button>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 text-center">
              <p className="text-sm text-gray-600">
                이미 계정이 있으신가요?{" "}
                <Link href="/signin" className="font-medium text-[#F4511E] hover:underline">
                  로그인
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </main>

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
