"use client"

import { useEffect } from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { UserPlus, FileText, Handshake, ArrowRight, CheckCircle, ChevronRight } from "lucide-react"

export default function JoinProcess() {
  const [activeStep, setActiveStep] = useState(0)
  const [isHovering, setIsHovering] = useState(null)

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const steps = [
    {
      number: "01",
      title: "회원 가입 및 역할 선택",
      description: "매도자 또는 투자자로 회원 가입 후, 간단한 인증 절차를 진행합니다.",
      icon: <UserPlus className="h-6 w-6 text-white" />,
      benefits: ["5분 내 가입 완료", "간편한 본인 인증", "역할별 맞춤 인터페이스"],
      color: "#F4511E",
    },
    {
      number: "02",
      title: "기업/투자자 정보 입력",
      description: "매물 정보 또는 투자 조건을 입력하면 자문사의 검토가 진행됩니다.",
      icon: <FileText className="h-6 w-6 text-white" />,
      benefits: ["직관적인 정보 입력 폼", "자문사의 데이터 검증", "비공개 정보 보호"],
      color: "#E64A19",
    },
    {
      number: "03",
      title: "딜 매칭 및 자문사 상담",
      description: "조건에 맞는 매물/투자자가 매칭되면 자문사의 1:1 상담이 시작됩니다.",
      icon: <Handshake className="h-6 w-6 text-white" />,
      benefits: ["AI 기반 최적 매칭", "전담 자문사 배정", "맞춤형 딜 어드바이스"],
      color: "#BF360C",
    },
  ]

  // Auto-advance steps every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev === steps.length - 1 ? 0 : prev + 1))
    }, 4000)

    return () => clearInterval(interval)
  }, [steps.length])

  return (
    <section id="join-process" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            variants={fadeIn}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">플랫폼 참여 방법 안내</h2>
            <p className="text-xl text-gray-600 mb-8">
              간단한 3단계로 M&A 플랫폼에 참여하고 자문사의 지원을 받으세요. DealMate의 M&A 플랫폼은 사용자 친화적인
              프로세스로 빠르고 효율적인 참여가 가능합니다.
            </p>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-[#F4511E]/10 flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-[#F4511E]" />
                </div>
                <p className="font-medium text-gray-900">
                  평균 참여 소요 시간: <span className="text-[#F4511E] font-bold">15분</span>
                </p>
              </div>
              <p className="text-gray-600">
                간단한 정보 입력만으로 DealMate의 M&A 플랫폼에 참여할 수 있습니다. 복잡한 서류 작업이나 긴 대기 시간
                없이 빠르게 시작하세요.
              </p>
            </div>

            <div className="flex items-center text-[#F4511E] font-medium cursor-pointer">
              <span>자주 묻는 질문 확인하기</span>
              <ArrowRight className="h-4 w-4 ml-2" />
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            variants={fadeIn}
            className="relative h-[400px] rounded-lg overflow-hidden"
          >
            <img
              src="/placeholder.svg?key=u8m78"
              alt="DealMate 자문사들이 M&A 과정을 안내하는 모습"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8 text-white">
              <p className="text-2xl font-bold mb-2">자문사 지원</p>
              <p className="text-base mb-4">모든 단계에서 DealMate의 M&A 자문사가 함께합니다</p>
            </div>
          </motion.div>
        </div>

        {/* Interactive Process Steps */}
        <div className="mb-20">
          {/* Step Indicators */}
          <div className="flex justify-center mb-12">
            <div className="flex items-center">
              {steps.map((step, index) => (
                <div key={index} className="flex items-center">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative h-16 w-16 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg transition-all duration-300 ${
                      activeStep === index ? "scale-110" : "opacity-80 scale-100"
                    }`}
                    style={{ backgroundColor: step.color }}
                    onClick={() => setActiveStep(index)}
                  >
                    {step.number}
                    {activeStep === index && (
                      <motion.div
                        className="absolute -inset-2 rounded-full border-2"
                        style={{ borderColor: step.color }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                      />
                    )}
                  </motion.button>

                  {index < steps.length - 1 && (
                    <div className="w-16 h-1 bg-gray-200 mx-2 relative">
                      <motion.div
                        className="absolute top-0 left-0 h-full"
                        style={{ backgroundColor: step.color }}
                        initial={{ width: "0%" }}
                        animate={{ width: activeStep > index ? "100%" : "0%" }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0.7, y: 20, scale: 0.95 }}
                animate={{
                  opacity: activeStep === index ? 1 : 0.7,
                  y: activeStep === index ? 0 : 20,
                  scale: activeStep === index ? 1 : 0.95,
                }}
                transition={{ duration: 0.5 }}
                className={`bg-white rounded-lg shadow-md border transition-all duration-300 overflow-hidden ${
                  activeStep === index ? "border-2 shadow-lg transform-gpu" : "border-gray-100"
                }`}
                style={{ borderColor: activeStep === index ? step.color : "" }}
                onMouseEnter={() => setIsHovering(index)}
                onMouseLeave={() => setIsHovering(null)}
                onClick={() => setActiveStep(index)}
              >
                <div className="h-2" style={{ backgroundColor: step.color }}></div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div
                      className="h-12 w-12 rounded-full flex items-center justify-center mr-4"
                      style={{ backgroundColor: step.color }}
                    >
                      {step.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
                  </div>

                  <p className="text-gray-600 mb-6">{step.description}</p>

                  <div className="bg-gray-50 p-4 rounded-md">
                    <p className="text-sm font-medium text-gray-700 mb-2">주요 혜택:</p>
                    <ul className="space-y-3">
                      {step.benefits.map((benefit, i) => (
                        <motion.li
                          key={i}
                          className="flex items-center text-gray-600"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{
                            opacity: activeStep === index || isHovering === index ? 1 : 0.7,
                            x: activeStep === index || isHovering === index ? 0 : -10,
                          }}
                          transition={{ duration: 0.3, delay: i * 0.1 }}
                        >
                          <div
                            className="h-6 w-6 rounded-full flex items-center justify-center mr-2 flex-shrink-0"
                            style={{ backgroundColor: `${step.color}20` }}
                          >
                            <CheckCircle className="h-4 w-4" style={{ color: step.color }} />
                          </div>
                          <span>{benefit}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <motion.div
                    className="mt-6 flex justify-end"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: activeStep === index || isHovering === index ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Button
                      variant="ghost"
                      className="flex items-center text-sm font-medium p-0"
                      style={{ color: step.color }}
                    >
                      <span>자세히 보기</span>
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          variants={fadeIn}
          className="bg-gray-900 text-white p-8 rounded-lg text-center"
        >
          <h3 className="text-3xl font-bold mb-6">지금 바로 시작하세요</h3>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
            DealMate의 M&A 플랫폼에서 검증된 매물과 투자자, 자문사를 만나보세요.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
