"use client"

import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, BarChart4, UserCheck, Award, Briefcase } from "lucide-react"

export default function ServiceFeatures() {
  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  }

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const cardAnimation = {
    hidden: { opacity: 0, y: 70, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
    hover: {
      y: -15,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { type: "spring", stiffness: 400, damping: 10 },
    },
  }

  const sellerFeatures = [
    {
      title: "인수자 사전 인증 시스템",
      description: "모든 매수자는 철저한 사전 인증 절차를 거쳐 검증된 투자자만 매물 정보에 접근할 수 있습니다",
      icon: <UserCheck className="h-6 w-6 text-[#F4511E]" />,
    },
    {
      title: "관련성 기반 매물 공개 구조",
      description: "매물의 민감도에 따라 비공개/제한 공개/공개를 선택하여 정보 유출 위험을 최소화합니다",
      icon: <Shield className="h-6 w-6 text-[#F4511E]" />,
    },
  ]

  const investorFeatures = [
    {
      title: "매도자 사전 인증 프로세스",
      description: "모든 매도자는 기업 실사 및 법적 검증을 거쳐 신뢰할 수 있는 매물만 제공합니다",
      icon: <UserCheck className="h-6 w-6 text-[#F4511E]" />,
    },
    {
      title: "매각자실사(VDD) 인증제",
      description: "매도자가 제공하는 VDD 리포트를 전문가가 검증하여 투자 리스크를 사전에 파악합니다",
      icon: <Award className="h-6 w-6 text-[#F4511E]" />,
    },
  ]

  const expertFeatures = [
    {
      title: "플랫폼 기반 추천 연계",
      description: "AI 매칭 시스템을 통해 전문성에 맞는 프로젝트를 자동으로 추천받습니다",
      icon: <BarChart4 className="h-6 w-6 text-[#F4511E]" />,
    },
    {
      title: "RFP 기반 협업 시스템",
      description: "체계적인 제안 요청서(RFP) 프로세스로 효율적인 프로젝트 수주가 가능합니다",
      icon: <Briefcase className="h-6 w-6 text-[#F4511E]" />,
    },
  ]

  return (
    <section id="service-features" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <Tabs defaultValue="seller" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-12 bg-transparent border-b border-gray-200 rounded-none p-0 h-auto">
            <TabsTrigger
              value="seller"
              className="text-lg py-4 rounded-none border-b-2 border-transparent data-[state=active]:border-[#F4511E] data-[state=active]:text-black data-[state=active]:bg-transparent relative overflow-hidden group"
            >
              <span>매도자를 위한 기능</span>
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 w-full bg-[#F4511E]/20"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </TabsTrigger>
            <TabsTrigger
              value="investor"
              className="text-lg py-4 rounded-none border-b-2 border-transparent data-[state=active]:border-[#F4511E] data-[state=active]:text-black data-[state=active]:bg-transparent relative overflow-hidden group"
            >
              <span>매수자를 위한 기능</span>
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 w-full bg-[#F4511E]/20"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </TabsTrigger>
            <TabsTrigger
              value="expert"
              className="text-lg py-4 rounded-none border-b-2 border-transparent data-[state=active]:border-[#F4511E] data-[state=active]:text-black data-[state=active]:bg-transparent relative overflow-hidden group"
            >
              <span>자문사를 위한 기능</span>
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 w-full bg-[#F4511E]/20"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </TabsTrigger>
          </TabsList>

          <TabsContent value="seller">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {sellerFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={cardAnimation}
                  whileHover="hover"
                  className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md hover:border-gray-200"
                >
                  <div className="h-12 w-12 rounded-full bg-[#F4511E]/10 flex items-center justify-center mb-6">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.3, type: "spring" }}
                    >
                      {feature.icon}
                    </motion.div>
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="investor">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {investorFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={cardAnimation}
                  whileHover="hover"
                  className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md hover:border-gray-200"
                >
                  <div className="h-12 w-12 rounded-full bg-[#F4511E]/10 flex items-center justify-center mb-6">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.3, type: "spring" }}
                    >
                      {feature.icon}
                    </motion.div>
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="expert">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {expertFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={cardAnimation}
                  whileHover="hover"
                  className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md hover:border-gray-200"
                >
                  <div className="h-12 w-12 rounded-full bg-[#F4511E]/10 flex items-center justify-center mb-6">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.3, type: "spring" }}
                    >
                      {feature.icon}
                    </motion.div>
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
