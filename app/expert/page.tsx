"use client"

import { useState } from "react"
import { Award, Briefcase, FileText, Star, TrendingUp, CheckCircle2, Clock, DollarSign } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ExpertDashboardPage() {
  const [activeTab, setActiveTab] = useState("profile")

  // 전문가 통계 데이터
  const stats = [
    {
      title: "인증 등급",
      value: "Gold",
      description: "최상위 등급 유지 중",
      icon: Award,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      title: "수행 프로젝트",
      value: 24,
      description: "총 완료 프로젝트",
      icon: Briefcase,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "평균 평점",
      value: "4.8",
      description: "5.0 만점 기준",
      icon: Star,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "추천 횟수",
      value: 156,
      description: "플랫폼 추천 연계",
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
  ]

  // RFP 요청 데이터
  const rfpRequests = [
    {
      id: "1",
      title: "IT 서비스 기업 실사 (Due Diligence)",
      client: "김민준 (매수자)",
      industry: "IT/소프트웨어",
      budget: "5,000만 원",
      deadline: "2024-01-15",
      status: "new",
      matchScore: 95,
      description: "클라우드 기반 SaaS 기업에 대한 재무·사업·기술 실사 요청",
    },
    {
      id: "2",
      title: "제조업 기업가치평가 (Valuation)",
      client: "이서연 (매도자)",
      industry: "제조업",
      budget: "3,000만 원",
      deadline: "2024-01-20",
      status: "pending",
      matchScore: 88,
      description: "자동차 부품 제조 기업의 기업가치평가 및 매각 자문",
    },
    {
      id: "3",
      title: "M&A 계약서 작성 및 검토",
      client: "박준호 (매수자)",
      industry: "바이오/헬스케어",
      budget: "2,000만 원",
      deadline: "2024-01-10",
      status: "in-progress",
      matchScore: 92,
      description: "바이오 헬스케어 스타트업 인수 관련 계약서 작성",
    },
  ]

  // 수행 중인 프로젝트
  const ongoingProjects = [
    {
      id: "1",
      title: "에듀테크 기업 실사",
      client: "최수진",
      progress: 75,
      deadline: "2024-01-05",
      amount: "4,500만 원",
    },
    {
      id: "2",
      title: "물류 스타트업 가치평가",
      client: "정우성",
      progress: 40,
      deadline: "2024-01-12",
      amount: "3,500만 원",
    },
  ]

  // 인증 프로필 정보
  const certifications = [
    { name: "공인회계사 (CPA)", issuer: "한국공인회계사회", year: "2015" },
    { name: "재무위험관리사 (FRM)", issuer: "GARP", year: "2017" },
    { name: "M&A 전문가", issuer: "한국M&A협회", year: "2018" },
  ]

  const experience = [
    { company: "DealMate", position: "M&A 자문 파트너", period: "2020 - 현재" },
    { company: "삼성증권", position: "기업금융부 상무", period: "2015 - 2020" },
    { company: "딜로이트", position: "재무자문 시니어", period: "2010 - 2015" },
  ]

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">전문가 대시보드</h1>
        <p className="text-gray-500 mt-1">인증 프로필 및 RFP 요청을 관리하세요</p>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 메인 컨텐츠 */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">인증 프로필</TabsTrigger>
          <TabsTrigger value="rfp">RFP 요청</TabsTrigger>
          <TabsTrigger value="projects">수행 프로젝트</TabsTrigger>
        </TabsList>

        {/* 인증 프로필 탭 */}
        <TabsContent value="profile" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="h-5 w-5 mr-2 text-yellow-600" />
                  보유 자격증
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {certifications.map((cert, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">{cert.name}</p>
                      <p className="text-sm text-gray-500">
                        {cert.issuer} · {cert.year}
                      </p>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full bg-transparent">
                  + 자격증 추가
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Briefcase className="h-5 w-5 mr-2 text-blue-600" />
                  산업 경력
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {experience.map((exp, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Briefcase className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{exp.position}</p>
                      <p className="text-sm text-gray-600">{exp.company}</p>
                      <p className="text-xs text-gray-500">{exp.period}</p>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full bg-transparent">
                  + 경력 추가
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2 text-purple-600" />
                수행 이력 (최근 5건)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  "IT 서비스 기업 실사 및 가치평가 (2023.11)",
                  "제조업 M&A 재무자문 (2023.09)",
                  "스타트업 투자 실사 (2023.08)",
                  "바이오 기업 기업가치평가 (2023.06)",
                  "물류 기업 인수 자문 (2023.04)",
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <p className="text-sm text-gray-700">{item}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* RFP 요청 탭 */}
        <TabsContent value="rfp" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rfpRequests.map((rfp) => (
              <Card key={rfp.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{rfp.title}</CardTitle>
                      <p className="text-sm text-gray-500 mt-1">{rfp.client}</p>
                    </div>
                    <Badge
                      variant={rfp.status === "new" ? "default" : rfp.status === "pending" ? "secondary" : "outline"}
                    >
                      {rfp.status === "new" && "신규"}
                      {rfp.status === "pending" && "대기중"}
                      {rfp.status === "in-progress" && "진행중"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-gray-600">{rfp.description}</p>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-gray-500">산업</p>
                      <p className="font-medium">{rfp.industry}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">예산</p>
                      <p className="font-medium">{rfp.budget}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">마감일</p>
                      <p className="font-medium">{rfp.deadline}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">매칭 점수</p>
                      <p className="font-medium text-green-600">{rfp.matchScore}%</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="gap-2">
                  <Button className="flex-1 bg-[#F4511E] hover:bg-[#D73C11]">Proposal 제출</Button>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    상세보기
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* 수행 프로젝트 탭 */}
        <TabsContent value="projects" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>진행 중인 프로젝트</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {ongoingProjects.map((project) => (
                <div key={project.id} className="p-4 border rounded-lg space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">{project.title}</h3>
                      <p className="text-sm text-gray-500">클라이언트: {project.client}</p>
                    </div>
                    <Badge variant="outline">{project.progress}% 완료</Badge>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-[#F4511E] h-2 rounded-full transition-all"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-sm">
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-4 w-4 mr-1" />
                      마감: {project.deadline}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <DollarSign className="h-4 w-4 mr-1" />
                      {project.amount}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>업무 품질 평가</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">4.8</p>
                  <p className="text-sm text-gray-600">평균 평점</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">24</p>
                  <p className="text-sm text-gray-600">완료 프로젝트</p>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <p className="text-2xl font-bold text-yellow-600">Gold</p>
                  <p className="text-sm text-gray-600">전문가 등급</p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">업무 정확도</span>
                    <span className="font-medium">4.9/5.0</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: "98%" }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">일정 준수율</span>
                    <span className="font-medium">4.7/5.0</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: "94%" }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">의사소통</span>
                    <span className="font-medium">4.8/5.0</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: "96%" }} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
