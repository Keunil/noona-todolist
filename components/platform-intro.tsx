"use client"

import { motion } from "framer-motion"
import { Shield, CheckCircle, Users, BarChart3, Award, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PlatformIntro() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const slideIn = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 },
  }

  const features = [
    {
      title: "검증된 매물",
      description: "삼일회계법인의 딜 어드바이저들이 선별한 고품질 매물로 시간 낭비 없는 투자 기회",
      icon: <Shield className="h-6 w-6 text-[#F4511E]" />,
      stats: "100% 전문가 검증",
    },
    {
      title: "엄격한 심사",
      description: "엄격한 심사를 거친 투자자/매도자 등록 시스템으로 신뢰할 수 있는 거래 파트너 확보",
      icon: <CheckCircle className="h-6 w-6 text-[#F4511E]" />,
      stats: "3단계 검증 프로세스",
    },
    {
      title: "전문가 지원",
      description: "법률·세무·회계 전문가가 딜 전 과정을 지원하여 안전하고 효율적인 거래 진행",
      icon: <Users className="h-6 w-6 text-[#F4511E]" />,
      stats: "50+ 전담 전문가",
    },
  ]

  const statistics = [
    { value: "157+", label: "글로벌 네트워크 국가" },
    { value: "94%", label: "딜 성사율" },
    { value: "30+", label: "M&A 전문 파트너" },
  ]

  return (
    <section id="platform-intro" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mb-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            variants={fadeIn}
            className="lg:col-span-6"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">
              M&A, 이제는 정보가 아닌 <span className="text-[#F4511E]">신뢰의 싸움</span>입니다
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              삼일회계법인의 M&A 플랫폼에서 검증된 매물과 투자자를 만나보세요. 국내 최고의 전문가 네트워크와 함께
              성공적인 딜을 완성하세요.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button className="bg-[#F4511E] hover:bg-[#D73C11] text-white border-none rounded-none px-6 py-5 text-base">
                플랫폼 둘러보기
              </Button>
              <Button
                variant="outline"
                className="border-gray-300 text-gray-900 hover:bg-gray-100 hover:text-gray-900 rounded-none px-6 py-5 text-base"
              >
                성공 사례 확인하기
              </Button>
            </div>

            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-100">
              <div className="h-10 w-10 rounded-full bg-[#F4511E]/10 flex items-center justify-center">
                <Award className="h-5 w-5 text-[#F4511E]" />
              </div>
              <p className="text-gray-700">
                <span className="font-bold">삼일회계법인</span>는 국내 M&A 자문 시장에서{" "}
                <span className="font-bold">1위</span>를 차지하고 있습니다.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            variants={fadeIn}
            className="lg:col-span-6 relative"
          >
            <div className="relative z-10 bg-white p-6 rounded-lg shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {statistics.map((stat, index) => (
                  <div key={index} className="text-center p-4 bg-gray-50 rounded-md">
                    <p className="text-3xl font-bold text-[#F4511E] mb-1">{stat.value}</p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="relative h-[300px] rounded-lg overflow-hidden">
                <img
                  src="/placeholder.svg?key=u8m79"
                  alt="삼일회계법인 M&A Platform Dashboard"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <p className="text-xl font-bold mb-1">안전하고 효율적인 M&A 플랫폼</p>
                  <p className="text-sm opacity-90">검증된 매물과 투자자를 연결하는 최적의 솔루션</p>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 h-40 w-40 bg-[#F4511E]/5 rounded-full z-0"></div>
            <div className="absolute -bottom-6 -left-6 h-24 w-24 bg-[#F4511E]/5 rounded-full z-0"></div>
          </motion.div>
        </div>

        <div className="mb-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            variants={fadeIn}
            className="text-center mb-12"
          >
            <h3 className="text-3xl font-bold mb-4 text-gray-900">플랫폼의 핵심 가치</h3>
            <div className="w-20 h-1 bg-[#F4511E] mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                variants={slideIn}
                className="bg-white p-6 rounded-lg shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg hover:border-gray-200 text-center"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="h-14 w-14 rounded-full bg-[#F4511E]/10 flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <span className="text-sm font-bold text-[#F4511E] bg-[#F4511E]/10 px-3 py-1 rounded-full">
                    {feature.stats}
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
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
          className="bg-gray-50 p-8 rounded-lg border border-gray-100"
        >
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-full bg-[#F4511E]/10 flex items-center justify-center flex-shrink-0 mt-1">
              <BarChart3 className="h-6 w-6 text-[#F4511E]" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">시장을 선도하는 M&A 플랫폼</h3>
              <p className="text-gray-600 mb-4">
                삼일회계법인의 M&A 플랫폼은 단순한 매칭을 넘어 거래의 전 과정을 함께하는 파트너입니다. 우리의 전문성과
                글로벌 네트워크가 여러분의 성공적인 딜을 보장합니다.
              </p>
              <div className="flex items-center text-[#F4511E] font-medium cursor-pointer">
                <span>서비스 기능 자세히 보기</span>
                <ArrowRight className="h-4 w-4 ml-2" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
