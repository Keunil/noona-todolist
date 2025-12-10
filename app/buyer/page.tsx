"use client"

import { useState } from "react"
import DealCard from "@/components/buyer/deal-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useFavorites } from "@/lib/favorites-store"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("recommended")
  const [sortOption, setSortOption] = useState("recent")

  const { isFavorite, toggleFavorite } = useFavorites()

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
      status: "hot" as const,
      hasVDD: true,
      hasExternalAudit: true,
      verified: true,
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
      status: "new" as const,
      hasVDD: false,
      hasExternalAudit: true,
      verified: false,
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
      status: "exclusive" as const,
      hasVDD: true,
      hasExternalAudit: false,
      verified: true,
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
      status: "closing" as const,
      hasVDD: false,
      hasExternalAudit: false,
      verified: false,
    },
  ]

  const handleFavoriteToggle = (id: string) => {
    toggleFavorite(id)
  }

  const handleViewDetails = (id: string) => {
    console.log(`View details for deal ${id}`)
  }

  const sortedDeals = [...deals].sort((a, b) => {
    if (sortOption === "recent") return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()
    if (sortOption === "price-high") return Number.parseInt(b.price) - Number.parseInt(a.price)
    if (sortOption === "price-low") return Number.parseInt(a.price) - Number.parseInt(b.price)
    return 0
  })

  return (
    <div className="space-y-8 text-center">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">매수자 대시보드</h1>
        <p className="text-gray-500 mt-1">안녕하세요, 홍길동님. 오늘의 추천 매물을 확인하세요.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-3 space-y-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
            <h2 className="text-xl font-bold text-gray-900">매물 정보</h2>
            <div className="flex items-center">
              <span className="text-sm text-gray-500 mr-2">정렬 기준:</span>
              <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="정렬 기준" />
                </SelectTrigger>
                <SelectContent>
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
              <TabsTrigger value="recent">최근 본 매물</TabsTrigger>
            </TabsList>
            <TabsContent value="recommended" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-auto">
                {sortedDeals.map((deal) => (
                  <DealCard
                    key={deal.id}
                    deal={{ ...deal, isFavorite: isFavorite(deal.id) }}
                    onFavoriteToggle={handleFavoriteToggle}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="recent" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-auto">
                {sortedDeals.slice(0, 2).map((deal) => (
                  <DealCard
                    key={deal.id}
                    deal={{ ...deal, isFavorite: isFavorite(deal.id) }}
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
      </div>
    </div>
  )
}
