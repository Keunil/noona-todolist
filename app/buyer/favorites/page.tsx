"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, ArrowUpDown, Trash2, Heart } from "lucide-react"
import DealCard from "@/components/buyer/deal-card"
import { useFavorites } from "@/lib/favorites-store"
import Link from "next/link"

export default function FavoritesPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [sortOption, setSortOption] = useState("match")
  const [searchQuery, setSearchQuery] = useState("")

  const { favorites, toggleFavorite, isFavorite, removeAllFavorites } = useFavorites()

  const allDeals = [
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
      matchScore: 95,
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
      matchScore: 87,
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
      matchScore: 82,
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
      matchScore: 78,
      verified: false,
    },
    {
      id: "5",
      title: "친환경 식품 제조업체",
      company: "그린푸드 주식회사",
      industry: "식품",
      location: "경기",
      price: "45억 원",
      revenue: "22억 원",
      employees: "28명",
      description:
        "친환경 식품 제조 및 유통 기업입니다. 유기농 인증을 받은 제품 라인업을 보유하고 있으며, 대형 마트 및 온라인 채널을 통해 안정적인 매출을 올리고 있습니다.",
      postedDate: "2023-06-05",
      status: "new" as const,
      matchScore: 72,
      verified: false,
    },
    {
      id: "6",
      title: "물류 솔루션 기업",
      company: "스마트로지스 주식회사",
      industry: "유통/물류",
      location: "인천",
      price: "60억 원",
      revenue: "28억 원",
      employees: "35명",
      description:
        "물류 자동화 및 최적화 솔루션을 제공하는 기업입니다. 자체 개발한 WMS(창고관리시스템)과 TMS(운송관리시스템)를 보유하고 있으며, 대기업 및 중견기업을 주요 고객으로 확보하고 있습니다.",
      postedDate: "2023-06-10",
      status: "new" as const,
      matchScore: 68,
      verified: false,
    },
  ]

  const favoriteDeals = allDeals.filter((deal) => isFavorite(deal.id))

  const handleFavoriteToggle = (id: string) => {
    toggleFavorite(id)
  }

  const handleViewDetails = (id: string) => {
    console.log(`View details for deal ${id}`)
  }

  const handleRemoveAllFavorites = () => {
    if (confirm("정말로 모든 관심 매물을 삭제하시겠습니까?")) {
      removeAllFavorites()
    }
  }

  const filteredDeals = favoriteDeals.filter((deal) => {
    if (activeTab === "it" && deal.industry !== "IT 서비스") return false
    if (activeTab === "manufacturing" && deal.industry !== "제조") return false
    if (activeTab === "biohealth" && deal.industry !== "바이오/헬스케어") return false

    if (
      searchQuery &&
      !deal.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !deal.company.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !deal.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    return true
  })

  const sortedDeals = [...filteredDeals].sort((a, b) => {
    if (sortOption === "match") return (b.matchScore || 0) - (a.matchScore || 0)
    if (sortOption === "recent") return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()
    if (sortOption === "price-high") return Number.parseInt(b.price) - Number.parseInt(a.price)
    if (sortOption === "price-low") return Number.parseInt(a.price) - Number.parseInt(b.price)
    return 0
  })

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center flex-col sm:flex-row mb-6 text-center">
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl font-bold text-gray-900">관심 Deals</h1>
          <p className="text-gray-500 mt-1">
            관심 있는 매물을 저장하고 관리하세요. 매물에 대한 상세 정보는 담당 매니저를 통해 제공됩니다.
          </p>
        </div>
        {favoriteDeals.length > 0 && (
          <Button
            variant="outline"
            className="text-gray-500 border-gray-200 bg-transparent"
            onClick={handleRemoveAllFavorites}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            전체 삭제
          </Button>
        )}
      </div>

      {favoriteDeals.length > 0 && (
        <>
          <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
            <Tabs defaultValue="all" onValueChange={setActiveTab} className="w-full md:w-auto mx-auto">
              <TabsList className="mx-auto">
                <TabsTrigger value="all">전체</TabsTrigger>
                <TabsTrigger value="it">IT 서비스</TabsTrigger>
                <TabsTrigger value="manufacturing">제조</TabsTrigger>
                <TabsTrigger value="biohealth">바이오/헬스케어</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
              <div className="relative w-full md:w-[300px]">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <Input
                  type="search"
                  placeholder="관심 매물 검색..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger className="w-[180px]">
                  <div className="flex items-center">
                    <ArrowUpDown className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="정렬 기준" />
                  </div>
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedDeals.map((deal) => (
              <DealCard
                key={deal.id}
                deal={{ ...deal, isFavorite: true }}
                onFavoriteToggle={handleFavoriteToggle}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        </>
      )}

      {favoriteDeals.length === 0 && (
        <div className="text-center py-12">
          <Heart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">저장된 관심 매물이 없습니다</h3>
          <p className="text-gray-500">매물 목록에서 하트 아이콘을 클릭하여 관심 매물을 저장하세요.</p>
          <Link href="/buyer/deals">
            <Button className="mt-4">매물 둘러보기</Button>
          </Link>
        </div>
      )}
    </div>
  )
}
