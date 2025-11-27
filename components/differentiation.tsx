"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Trophy, Workflow, Target, ArrowRight, Globe, Users, ThumbsUp } from "lucide-react"

export default function Differentiation() {
  const [animateStats, setAnimateStats] = useState(false)

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const points = [
    {
      title: "국내 최대 규모의 M&A 자문 실적",
      description:
        "삼일회계법인은 국내 최대 규모의 M&A 자문 실적을 보유하고 있으며, 이러한 경험과 노하우를 바탕으로 최적의 딜 매칭을 제공합니다.",
      icon: <Trophy className="h-6 w-6 text-[#F4511E]" />,
      stats: "500+ 성공적인 M&A 거래",
    },
    {
      title: "세무·회계·법무·PMI까지 원스톱으로 제공",
      description:
        "딜 성사 이후에도 세무, 회계, 법무, PMI(통합관리)까지 원스톱으로 제공하여 M&A 전 과정에서 발생할 수 있는 모든 이슈를 해결합니다.",
      icon: <Workflow className="h-6 w-6 text-[#F4511E]" />,
      stats: "100% 통합 서비스 제공",
    },
    {
      title: "맞춤형 경험",
      description: "대기업, 금융기관, 스타트업까지 각 기업의 특성과 요구사항에 맞는 맞춤형 M&A 서비스를 제공합니다.",
      icon: <Target className="h-6 w-6 text-[#F4511E]" />,
      stats: "20+ 산업 분야 전문성",
    },
  ]

  const stats = [
    {
      value: 157,
      suffix: "+",
      label: "글로벌 네트워크 국가",
      icon: <Globe className="h-8 w-8" />,
      startValue: 0,
    },
    {
      value: 30,
      suffix: "+",
      label: "M&A 전문 파트너",
      icon: <Users className="h-8 w-8" />,
      startValue: 0,
    },
    {
      value: 95,
      suffix: "%",
      label: "고객 만족도",
      icon: <ThumbsUp className="h-8 w-8" />,
      startValue: 0,
    },
  ]

  // Trigger animation when component is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setAnimateStats(true)
        }
      },
      { threshold: 0.3 },
    )

    const statsSection = document.getElementById("stats-section")
    if (statsSection) {
      observer.observe(statsSection)
    }

    return () => {
      if (statsSection) {
        observer.unobserve(statsSection)
      }
    }
  }, [])

  return (
    <section id="differentiation" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          variants={fadeIn}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">삼일회계법인의 딜 서비스 차별화 포인트</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            빅4 중 M&A 자문 연계 서비스에서 가장 빠르고 정확하게 움직입니다.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            variants={fadeIn}
            className="lg:col-span-5 relative h-[500px] rounded-lg overflow-hidden"
          >
            <img
              src="/placeholder.svg?key=u8m71"
              alt="Modern office building representing PwC's global presence"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8 text-white">
              <p className="text-2xl font-bold mb-2">글로벌 네트워크</p>
              <p className="text-base mb-4">
                전 세계 157개국 284,000명의 PwC 전문가 네트워크를 통한 글로벌 수준의 M&A 서비스
              </p>
              <div className="flex items-center text-[#F4511E] font-medium">
                <span>글로벌 성공 사례 보기</span>
                <ArrowRight className="h-4 w-4 ml-2" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            variants={fadeIn}
            className="lg:col-span-7"
          >
            <div className="space-y-8">
              {points.map((point, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  variants={fadeIn}
                  className="bg-gray-50 p-6 rounded-lg border border-gray-100 transition-all duration-300 hover:shadow-md text-center"
                >
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-full bg-[#F4511E]/10 flex items-center justify-center flex-shrink-0 mt-1">
                      {point.icon}
                    </div>
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="text-xl font-bold mb-3 text-gray-900">{point.title}</h3>
                        <span className="text-sm font-bold text-[#F4511E] bg-[#F4511E]/10 px-3 py-1 rounded-full">
                          {point.stats}
                        </span>
                      </div>
                      <p className="text-gray-600">{point.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              variants={fadeIn}
              className="mt-8 p-4 border-l-4 border-[#F4511E] bg-[#F4511E]/5"
            >
              <p className="text-gray-700 italic">
                "삼일회계법인의 M&A 플랫폼은 단순한 매칭을 넘어 거래의 전 과정을 함께하는 파트너입니다. 우리의 전문성과
                글로벌 네트워크가 여러분의 성공적인 딜을 보장합니다."
              </p>
              <p className="text-sm font-bold text-gray-900 mt-2">- 삼일회계법인 M&A 플랫폼팀</p>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          id="stats-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          variants={fadeIn}
          className="py-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center group"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="bg-gray-50 p-8 rounded-lg shadow-sm relative overflow-hidden h-full">
                  {/* Animated background element */}
                  <motion.div
                    className="absolute inset-0 bg-[#F4511E]/5 rounded-lg"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                  />

                  {/* Icon with animated circle */}
                  <div className="relative mb-4 inline-block">
                    <motion.div
                      className="absolute inset-0 rounded-full bg-[#F4511E]/10"
                      initial={{ scale: 0 }}
                      animate={{ scale: [0, 1.2, 1] }}
                      transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                    />
                    <div className="relative h-16 w-16 mx-auto rounded-full bg-white flex items-center justify-center shadow-sm">
                      <motion.div
                        initial={{ opacity: 0, rotateY: 90 }}
                        animate={{ opacity: 1, rotateY: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.2 + 0.5 }}
                        className="text-[#F4511E]"
                      >
                        {stat.icon}
                      </motion.div>
                    </div>
                  </div>

                  {/* Animated counter */}
                  <div className="flex items-center justify-center">
                    <motion.p
                      className="text-5xl font-bold text-[#F4511E]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.2 + 0.7 }}
                    >
                      {animateStats ? (
                        <Counter from={stat.startValue} to={stat.value} duration={2} delay={index * 0.3} />
                      ) : (
                        stat.value
                      )}
                    </motion.p>
                    <motion.span
                      className="text-5xl font-bold text-[#F4511E]"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.2 + 0.9 }}
                    >
                      {stat.suffix}
                    </motion.span>
                  </div>

                  <motion.p
                    className="text-gray-700 mt-2 font-medium"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 + 1 }}
                  >
                    {stat.label}
                  </motion.p>

                  {/* Decorative elements */}
                  <motion.div
                    className="absolute -bottom-4 -right-4 h-20 w-20 rounded-full bg-[#F4511E]/5 opacity-0 group-hover:opacity-100"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.2 + 0.5 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Counter component for animated counting
function Counter({ from, to, duration = 2, delay = 0 }) {
  const [count, setCount] = useState(from)

  useEffect(() => {
    let startTime
    let animationFrame

    // Wait for the specified delay before starting the animation
    const delayTimeout = setTimeout(() => {
      const step = (timestamp) => {
        if (!startTime) startTime = timestamp
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)

        setCount(Math.floor(from + progress * (to - from)))

        if (progress < 1) {
          animationFrame = requestAnimationFrame(step)
        }
      }

      animationFrame = requestAnimationFrame(step)
    }, delay * 1000)

    return () => {
      clearTimeout(delayTimeout)
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [from, to, duration, delay])

  return count
}
