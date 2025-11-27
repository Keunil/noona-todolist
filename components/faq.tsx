"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Shield, FileText, Users, MessageCircle, CreditCard, HelpCircle, ArrowRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import InquiryForm from "@/components/inquiry-form"

export default function FAQ() {
  const [searchQuery, setSearchQuery] = useState("")

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const faqCategories = {
    general: {
      icon: <HelpCircle className="h-5 w-5" />,
      title: "일반 문의",
      faqs: [
        {
          question: "비밀유지 절차는 어떻게 되나요?",
          answer:
            "모든 정보는 철저한 비밀유지 계약(NDA) 하에 공유됩니다. 매물 정보는 검증된 투자자에게만 제한적으로 공개되며, 모든 접근 기록이 관리됩니다. 삼일회계법인의 보안 시스템을 통해 정보 유출 위험을 최소화합니다.",
        },
        {
          question: "검증 기준은 어떤 방식인가요?",
          answer:
            "매도자와 투자자 모두 삼일회계법인의 엄격한 검증 절차를 거칩니다. 기업의 재무 상태, 법적 리스크, 시장 경쟁력 등을 종합적으로 평가하며, 투자자의 경우 자금력과 투자 이력, 신용도 등을 검증합니다.",
        },
      ],
    },
    platform: {
      icon: <Shield className="h-5 w-5" />,
      title: "플랫폼 이용",
      faqs: [
        {
          question: "AI 매칭 기능은 어떻게 작동하나요?",
          answer:
            "AI 매칭 시스템은 산업 분야, 기업 규모, 재무 상태, 투자 조건 등 다양한 요소를 분석하여 최적의 매물과 투자자를 연결합니다. 딜 성공 확률이 높은 매칭을 우선적으로 추천하며, 지속적인 학습을 통해 매칭 정확도를 높여갑니다.",
        },
        {
          question: "플랫폼 이용 비용은 어떻게 되나요?",
          answer:
            "기본 회원 가입 및 정보 등록은 무료입니다. 실제 딜이 성사될 경우에만 성공 수수수료가 발생하며, 거래 규모와 복잡성에 따라 차등 적용됩니다. 자세한 수수료 구조는 상담 시 안내해 드립니다.",
        },
      ],
    },
    seller: {
      icon: <FileText className="h-5 w-5" />,
      title: "매도자 정보",
      faqs: [
        {
          question: "매물 등록 후 얼마나 빨리 투자자를 만날 수 있나요?",
          answer:
            "매물 정보 검증 후 평균 2주 이내에 첫 투자자 매칭이 이루어집니다. 산업 특성과 매물 상태에 따라 차이가 있을 수 있으며, 프리미엄 서비스 이용 시 더 빠른 매칭이 가능합니다.",
        },
        {
          question: "매물 정보는 어디까지 공개되나요?",
          answer:
            "초기에는 기업명, 위치 등 식별 정보 없이 산업군, 매출 규모, 수익성 등 기본 정보만 공개됩니다. 관심 투자자가 NDA 체결 후에만 상세 정보가 단계적으로 공개되며, 모든 과정은 매도자의 승인 하에 진행됩니다.",
        },
      ],
    },
    investor: {
      icon: <Users className="h-5 w-5" />,
      title: "투자자 정보",
      faqs: [
        {
          question: "투자자 검증 절차는 어떻게 되나요?",
          answer:
            "투자자는 신원 확인, 자금력 증명, 투자 이력 검토의 3단계 검증을 거칩니다. 기관 투자자의 경우 추가적인 법적 검토가 진행될 수 있으며, 모든 검증은 일반적으로 5영업일 이내에 완료됩니다.",
        },
        {
          question: "해외 매물도 확인할 수 있나요?",
          answer:
            "네, PwC의 글로벌 네트워크를 통해 해외 매물도 확인 가능합니다. 157개국 PwC 네트워크를 활용하여 관심 지역의 검증된 매물 정보를 제공받을 수 있으며, 국가별 전문가의 자문도 함께 받으실 수 있습니다.",
        },
      ],
    },
    support: {
      icon: <MessageCircle className="h-5 w-5" />,
      title: "고객 지원",
      faqs: [
        {
          question: "전문가 상담은 어떻게 받을 수 있나요?",
          answer:
            "플랫폼 내 '전문가 상담 신청' 메뉴를 통해 언제든지 상담 예약이 가능합니다. 업종별 전문 파트너가 배정되며, 24시간 이내에 상담 일정이 확정됩니다. 긴급한 경우 핫라인을 통한 즉시 상담도 가능합니다.",
        },
        {
          question: "딜 진행 중 문제가 발생하면 어떻게 해결하나요?",
          answer:
            "각 딜에는 전담 매니저가 배정되어 전 과정을 모니터링합니다. 문제 발생 시 즉시 개입하여 해결책을 제시하며, 필요한 경우 법률, 세무, 회계 등 전문가 팀이 즉시 투입됩니다. 24/7 긴급 지원 시스템을 운영하고 있습니다.",
        },
      ],
    },
    payment: {
      icon: <CreditCard className="h-5 w-5" />,
      title: "수수료 및 결제",
      faqs: [
        {
          question: "수수료 체계는 어떻게 되나요?",
          answer:
            "기본 플랫폼 이용은 무료이며, 딜 성사 시에만 성공 수수료가 발생합니다. 수수료율은 거래 규모에 따라 0.5~3% 범위에서 차등 적용되며, 특수한 딜 구조나 추가 서비스 이용 시 별도 협의가 필요할 수 있습니다.",
        },
        {
          question: "부가 서비스 비용은 어떻게 되나요?",
          answer:
            "기업 가치 평가, 실사, 세무 자문 등 부가 서비스는 별도 비용이 발생합니다. 서비스 범위와 복잡성에 따라 비용이 결정되며, 사전에 명확한 견적을 제공해 드립니다. 패키지 이용 시 할인 혜택이 적용됩니다.",
        },
      ],
    },
  }

  // Filter FAQs based on search query
  const filterFAQs = (faqs) => {
    if (!searchQuery) return faqs
    return faqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }

  // Count total FAQs
  const totalFAQs = Object.values(faqCategories).reduce((total, category) => total + category.faqs.length, 0)

  return (
    <section id="faq" className="py-24">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mb-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            variants={fadeIn}
            className="text-center mb-16 lg:col-span-5"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">자주 묻는 질문</h2>
            <p className="text-xl text-gray-600 mb-8">
              M&A 플랫폼 이용에 관한 궁금증을 해결해 드립니다. 원하는 답변을 찾지 못하셨다면 언제든지 문의해 주세요.
            </p>

            <div className="relative mb-8">
              <Input
                type="text"
                placeholder="질문 검색하기..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 py-6 rounded-md border-gray-300"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            variants={fadeIn}
            className="lg:col-span-7"
          >
            <Tabs defaultValue="general" className="w-full">
              <div className="bg-white rounded-t-lg border border-gray-200 p-1">
                <TabsList className="w-full grid grid-cols-3 md:grid-cols-6 bg-white p-1 rounded-md">
                  {Object.entries(faqCategories).map(([key, category]) => (
                    <TabsTrigger
                      key={key}
                      value={key}
                      className="flex flex-col items-center justify-center gap-1 py-3 rounded-md data-[state=active]:bg-white data-[state=active]:text-[#F4511E] h-full"
                    >
                      <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center data-[state=active]:text-[#F4511E]">
                        {category.icon}
                      </div>
                      <span className="text-xs font-medium">{category.title}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              <div className="bg-white rounded-b-lg border-x border-b border-gray-200 p-6">
                {Object.entries(faqCategories).map(([key, category]) => {
                  const filteredFAQs = filterFAQs(category.faqs)
                  return (
                    <TabsContent key={key} value={key} className="mt-0 pt-4">
                      {filteredFAQs.length > 0 ? (
                        <Accordion type="single" collapsible className="w-full">
                          {filteredFAQs.map((faq, index) => (
                            <AccordionItem
                              key={index}
                              value={`item-${index}`}
                              className="border-b border-gray-200 py-2"
                            >
                              <AccordionTrigger className="text-left font-medium text-lg text-gray-900 hover:no-underline py-4 flex gap-4">
                                <span className="h-6 w-6 rounded-full bg-[#F4511E]/10 flex items-center justify-center flex-shrink-0">
                                  <span className="text-xs font-bold text-[#F4511E]">{index + 1}</span>
                                </span>
                                {faq.question}
                              </AccordionTrigger>
                              <AccordionContent className="text-gray-600 text-base pl-10">
                                {faq.answer}
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      ) : (
                        <div className="text-center py-8">
                          <HelpCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                          <p className="text-gray-500">검색 결과가 없습니다.</p>
                          <p className="text-gray-400 text-sm">다른 키워드로 검색해 보세요.</p>
                        </div>
                      )}
                    </TabsContent>
                  )
                })}

                <div className="mt-8 pt-6 border-t border-gray-200 flex justify-between items-center">
                  <p className="text-sm text-gray-500">
                    총 <span className="font-bold text-[#F4511E]">{totalFAQs}</span>개의 FAQ가 있습니다
                  </p>
                  <div className="flex items-center text-[#F4511E] font-medium text-sm cursor-pointer">
                    <span>모든 FAQ 보기</span>
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </div>
                </div>
              </div>
            </Tabs>
          </motion.div>
        </div>

        {/* Add a full-width inquiry form section at the bottom */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          variants={fadeIn}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4 text-gray-900">PwC Korea 팀에게 물어보세요</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              FAQ에서 원하는 답변을 찾지 못하셨나요? 언제든지 문의해 주시면 빠르게 답변해 드리겠습니다.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <InquiryForm />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
