"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Quote, Star, ChevronRight, ChevronLeft, Building, User } from "lucide-react"

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const testimonials = [
    {
      id: 1,
      content:
        "3개월 만에 원하던 매물을 찾고 딜을 성사시켰어요. DealMate의 전문가들이 모든 과정을 함께해 주셔서 안심하고 진행할 수 있었습니다.",
      name: "전략적 투자자 A사 CFO",
      company: "제조업 대기업",
      industry: "제조",
      dealSize: "1,200억 원",
      rating: 5,
      image: "/placeholder.svg?key=u8m72",
      logo: "/placeholder.svg?key=u8m73",
    },
    {
      id: 2,
      content:
        "매각 전 재무 리스크 진단까지 받을 수 있어 안심됐습니다. 예상보다 높은 가치로 회사를 매각할 수 있었고, 세무 이슈도 사전에 해결할 수 있었습니다.",
      name: "중소기업 대표 B씨",
      company: "IT 서비스 기업",
      industry: "IT 서비스",
      dealSize: "350억 원",
      rating: 5,
      image: "/placeholder.svg?key=u8m74",
      logo: "/placeholder.svg?key=u8m75",
    },
    {
      id: 3,
      content:
        "투자 대상 기업의 실사 과정에서 발견하기 어려운 잠재적 리스크를 미리 파악할 수 있었습니다. 전문가의 조언이 없었다면 큰 문제가 될 뻔했습니다.",
      name: "벤처캐피탈 C사 대표",
      company: "투자 전문 기업",
      industry: "금융 투자",
      dealSize: "500억 원",
      rating: 5,
      image: "/placeholder.svg?key=u8m76",
      logo: "/placeholder.svg?key=u8m77",
    },
  ]

  const handlePrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }

  return (
    <section id="testimonials" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          variants={fadeIn}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">고객 리뷰</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            DealMate M&A 플랫폼을 통해 성공적인 딜을 경험한 고객들의 이야기입니다.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          variants={fadeIn}
          className="max-w-4xl mx-auto"
        >
          <div className="relative bg-white rounded-lg shadow-md overflow-hidden">
            <div className="absolute top-8 left-8 h-12 w-12 rounded-full bg-[#F4511E]/10 flex items-center justify-center z-10">
              <Quote className="h-6 w-6 text-[#F4511E]" />
            </div>

            <div className="p-8 pt-24">
              <div className="flex mb-6">
                {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                ))}
              </div>

              <p className="text-2xl font-light text-gray-800 mb-8 italic">"{testimonials[activeIndex].content}"</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={testimonials[activeIndex].image || "/placeholder.svg"}
                    alt={testimonials[activeIndex].name}
                    className="h-14 w-14 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonials[activeIndex].name}</h4>
                    <p className="text-gray-500 flex items-center">
                      <Building className="h-3 w-3 mr-1" />
                      {testimonials[activeIndex].company}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end">
                  <div className="text-sm text-gray-500 mb-1">거래 규모</div>
                  <div className="font-bold text-[#F4511E]">{testimonials[activeIndex].dealSize}</div>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center bg-gray-50 p-4 border-t border-gray-100">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                  <User className="h-4 w-4 text-gray-600" />
                </div>
                <span className="text-sm text-gray-700">{testimonials[activeIndex].industry} 산업</span>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={handlePrevious}
                  className="h-10 w-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                >
                  <ChevronLeft className="h-5 w-5 text-gray-700" />
                </button>
                <button
                  onClick={handleNext}
                  className="h-10 w-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                >
                  <ChevronRight className="h-5 w-5 text-gray-700" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
