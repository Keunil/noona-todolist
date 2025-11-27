"use client"

import { useState } from "react"
import { FileSearch, Heart, ListFilter, TrendingUp, Video, MapPin } from "lucide-react"
import StatsCard from "@/components/buyer/stats-card"
import DealCard from "@/components/buyer/deal-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("recommended")
  const [sortOption, setSortOption] = useState("match")

  // Mock data for stats
  const stats = [
    {
      title: "매수조건 등록",
      value: 3,
      description: "현재 활성화된 매수조건",
      icon: ListFilter,
      trend: "up" as const,
      trendValue: "1",
    },
    {
      title: "매물 조회",
      value: 28,
      description: "지난 30일간 조회한 매물",
      icon: FileSearch,
      trend: "up" as const,
      trendValue: "12%",
    },
    {
      title: "관심 매물",
      value: 7,
      description: "저장된 관심 매물",
      icon: Heart,
      trend: "up" as const,
      trendValue: "2",
    },
    {
      title: "매칭 점수",
      value: "87%",
      description: "평균 매칭 점수",
      icon: TrendingUp,
      trend: "up" as const,
      trendValue: "5%",
    },
  ]

  // Mock data for deals
  const deals = [
    {
      id: "1",
      title: "성장중인 IT 솔루션 기업",
      company: "테크솔루션 주식회사",
      industry: "IT 서비스",
      location: "서울",
      price: "50억 원",
      revenue: "20억 원",
      employees: "25명",
      description:
        "클라우드 기반 보안 솔루션을 제공하는 성장 중인 IT 기업입니다. 최근 3년간 연평균 성장률 35%를 기록하고 있으며, 안정적인 구독형 수익 모델을 갖추고 있습니다.",
      postedDate: "2023-05-15",
      isFavorite: true,
      status: "hot" as const,
      matchScore: 95,
    },
    {
      id: "2",
      title: "제조업 자동화 설비 전문기업",
      company: "스마트팩토리 주식회사",
      industry: "제조",
      location: "경기",
      price: "80억 원",
      revenue: "35억 원",
      employees: "42명",
      description:
        "스마트 팩토리 자동화 설비를 설계 및 제조하는 기업입니다. 국내 주요 대기업과의 안정적인 거래처를 확보하고 있으며, 특허 기술 다수 보유하고 있습니다.",
      postedDate: "2023-05-20",
      isFavorite: false,
      status: "new" as const,
      matchScore: 87,
    },
    {
      id: "3",
      title: "바이오헬스케어 스타트업",
      company: "바이오헬스 주식회사",
      industry: "바이오/헬스케어",
      location: "대전",
      price: "30억 원",
      revenue: "12억 원",
      employees: "18명",
      description:
        "혁신적인 의료기기를 개발하는 바이오헬스케어 스타트업입니다. FDA 및 식약처 인증을 완료했으며, 해외 시장 진출을 준비 중입니다.",
      postedDate: "2023-05-25",
      isFavorite: true,
      status: "exclusive" as const,
      matchScore: 82,
    },
    {
      id: "4",
      title: "온라인 교육 플랫폼",
      company: "에듀테크 주식회사",
      industry: "교육/이러닝",
      location: "서울",
      price: "25억 원",
      revenue: "8억 원",
      employees: "15명",
      description:
        "K-12 대상 온라인 교육 콘텐츠 및 플랫폼을 제공하는 에듀테크 기업입니다. 월간 활성 사용자 5만명을 보유하고 있으며, 구독형 비즈니스 모델로 안정적인 수익을 창출하고 있습니다.",
      postedDate: "2023-06-01",
      isFavorite: false,
      status: "closing" as const,
      matchScore: 78,
    },
  ]

  const recentActivities = [
    {
      id: 1,
      type: "view",
      dealName: "성장중인 IT 솔루션 기업",
      timestamp: "2시간 전",
    },
    {
      id: 2,
      type: "favorite",
      dealName: "바이오헬스케어 스타트업",
      timestamp: "어제",
    },
    {
      id: 3,
      type: "condition",
      conditionName: "IT 서비스 기업 (서울/경기)",
      timestamp: "3일 전",
    },
    {
      id: 4,
      type: "view",
      dealName: "제조업 자동화 설비 전문기업",
      timestamp: "5일 전",
    },
    {
      id: 5,
      type: "favorite",
      dealName: "성장중인 IT 솔루션 기업",
      timestamp: "1주일 전",
    },
  ]

  const handleFavoriteToggle = (id: string) => {
    console.log(`Toggle favorite for deal ${id}`)
  }

  const handleViewDetails = (id: string) => {
    console.log(`View details for deal ${id}`)
  }

  return (
    <div className="space-y-8 text-center">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">투자자 구매자 페이지</h1>
        <p className="text-gray-500 mt-1">안녕하세요, 홍길동님. 오늘의 추천 매물과 활동 현황을 확인하세요.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            description={stat.description}
            icon={stat.icon}
            trend={stat.trend}
            trendValue={stat.trendValue}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
            <h2 className="text-xl font-bold text-gray-900">매물 정보</h2>
            <div className="flex items-center">
              <span className="text-sm text-gray-500 mr-2">정렬 기준:</span>
              <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="정렬 기준" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="match">매칭 점수순</SelectItem>
                  <SelectItem value="recent">최신순</SelectItem>
                  <SelectItem value="price-high">가격 높은순</SelectItem>
                  <SelectItem value="price-low">가격 낮은순</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Tabs defaultValue="recommended" onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="recommended">추천 매물</TabsTrigger>
              <TabsTrigger value="new">신규 매물</TabsTrigger>
              <TabsTrigger value="recent">최근 본 매물</TabsTrigger>
            </TabsList>
            <TabsContent value="recommended" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-auto">
                {deals
                  .sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0))
                  .map((deal) => (
                    <DealCard
                      key={deal.id}
                      deal={deal}
                      onFavoriteToggle={handleFavoriteToggle}
                      onViewDetails={handleViewDetails}
                    />
                  ))}
              </div>
            </TabsContent>
            <TabsContent value="new" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-auto">
                {deals
                  .filter((deal) => deal.status === "new")
                  .map((deal) => (
                    <DealCard
                      key={deal.id}
                      deal={deal}
                      onFavoriteToggle={handleFavoriteToggle}
                      onViewDetails={handleViewDetails}
                    />
                  ))}
              </div>
            </TabsContent>
            <TabsContent value="recent" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-auto">
                {deals.slice(0, 2).map((deal) => (
                  <DealCard
                    key={deal.id}
                    deal={deal}
                    onFavoriteToggle={handleFavoriteToggle}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-center">
            <Button variant="outline">더 많은 매물 보기</Button>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>최근 활동</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="py-3 px-6">
                    <div className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-1">
                        {activity.type === "view" && <FileSearch className="h-4 w-4 text-gray-600" />}
                        {activity.type === "favorite" && <Heart className="h-4 w-4 text-red-500" />}
                        {activity.type === "condition" && <ListFilter className="h-4 w-4 text-blue-500" />}
                      </div>
                      <div>
                        <p className="text-sm text-gray-900">
                          {activity.type === "view" && `매물 조회: ${activity.dealName}`}
                          {activity.type === "favorite" && `관심 매물 등록: ${activity.dealName}`}
                          {activity.type === "condition" && `매수조건 등록: ${activity.conditionName}`}
                        </p>
                        <p className="text-xs text-gray-500">{activity.timestamp}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>담당 매니저</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center text-center">
                <div className="h-20 w-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <img
                    src="/professional-headshot.png"
                    alt="김전문 매니저"
                    className="h-full w-full rounded-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-bold">김전문 매니저</h3>
                <Badge className="mt-1 mb-3">IT / 소프트웨어 전문</Badge>
                <div className="space-y-2 w-full">
                  <p className="text-sm flex items-center justify-center">
                    <Mail className="h-4 w-4 mr-2 text-gray-500" />
                    manager@pwc.com
                  </p>
                  <p className="text-sm flex items-center justify-center">
                    <Phone className="h-4 w-4 mr-2 text-gray-500" />
                    010-1234-5678
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-[#F4511E] hover:bg-[#D73C11]">메시지 보내기</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>다가오는 일정</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                <div className="py-4 px-6">
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center justify-center bg-[#F4511E]/10 text-[#F4511E] font-bold rounded-md p-2 w-14">
                      <span className="text-xs">6월</span>
                      <span className="text-lg">15</span>
                    </div>
                    <div>
                      <h4 className="font-medium">매물 소개 미팅</h4>
                      <p className="text-sm text-gray-500">오후 2:00 - 3:00</p>
                      <Badge variant="outline" className="mt-2 text-xs">
                        <Video className="h-3 w-3 mr-1" /> 화상 회의
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="py-4 px-6">
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center justify-center bg-[#F4511E]/10 text-[#F4511E] font-bold rounded-md p-2 w-14">
                      <span className="text-xs">6월</span>
                      <span className="text-lg">22</span>
                    </div>
                    <div>
                      <h4 className="font-medium">실사 일정 협의</h4>
                      <p className="text-sm text-gray-500">오전 11:00 - 12:00</p>
                      <Badge variant="outline" className="mt-2 text-xs">
                        <MapPin className="h-3 w-3 mr-1" /> 대면 미팅
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                일정 관리
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

// 누락된 아이콘 컴포넌트 추가
function Mail(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

function Phone(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}
