"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { MessageSquare, Send } from "lucide-react"

export default function InquiryForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    source: "",
    inquiry: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      source: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Reset form and loading state
    setFormData({
      name: "",
      phone: "",
      email: "",
      source: "",
      inquiry: "",
    })
    setIsSubmitting(false)

    // Show success message
    toast({
      title: "문의가 접수되었습니다",
      description: "빠른 시일 내에 답변 드리겠습니다.",
    })

    // In a real app, you would send the form data to your backend
    console.log("Form submitted:", formData)
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      variants={fadeIn}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <div className="bg-[#F4511E] p-6 flex items-center justify-center">
        <MessageSquare className="h-6 w-6 text-white mr-3" />
        <h3 className="text-xl font-bold text-white">문의하기</h3>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6 text-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-gray-700">
              성함
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="홍길동"
              value={formData.name}
              onChange={handleChange}
              required
              className="border-gray-300"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-gray-700">
              연락처
            </Label>
            <Input
              id="phone"
              name="phone"
              placeholder="010-1234-5678"
              value={formData.phone}
              onChange={handleChange}
              required
              className="border-gray-300"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-700">
              이메일
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="border-gray-300"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="source" className="text-gray-700">
              PwC M&A 플랫폼을 어떻게 알게 되었나요?
            </Label>
            <Select value={formData.source} onValueChange={handleSelectChange} required>
              <SelectTrigger id="source" className="border-gray-300">
                <SelectValue placeholder="선택해주세요" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="search">인터넷 검색</SelectItem>
                <SelectItem value="sns">소셜 미디어</SelectItem>
                <SelectItem value="friend">지인 소개</SelectItem>
                <SelectItem value="news">뉴스/기사</SelectItem>
                <SelectItem value="event">세미나/이벤트</SelectItem>
                <SelectItem value="other">기타</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="inquiry" className="text-gray-700">
            무엇이 궁금하신가요?
          </Label>
          <Textarea
            id="inquiry"
            name="inquiry"
            placeholder="매각을 희망하는 기업에 대한 정보, M&A 절차, 기타 문의 사항 등"
            value={formData.inquiry}
            onChange={handleChange}
            required
            className="min-h-[120px] border-gray-300"
          />
        </div>

        <Button type="submit" className="w-full bg-[#F4511E] hover:bg-[#D73C11] text-white" disabled={isSubmitting}>
          {isSubmitting ? (
            "제출 중..."
          ) : (
            <span className="flex items-center">
              제출 <Send className="ml-2 h-4 w-4" />
            </span>
          )}
        </Button>

        <p className="text-center text-sm text-gray-500">상담 내용은 대외비로 철저히 보호됩니다.</p>
      </form>
    </motion.div>
  )
}
