"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, ArrowUpDown, Trash2, Heart } from "lucide-react"
import DealCard from "@/components/buyer/deal-card"

export default function FavoritesPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [sortOption, setSortOption] = useState("match")
  const [searchQuery, setSearchQuery] = useState("")

  // Mock data for favorite deals
  const favoriteDeals = [
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
      id: "7",
      title: "소프트웨어 개발 전문 기업",
      company: "소프트웨어랩스 주식회사",
      industry: "IT 서비스",
      location: "판교",
      price: "40억 원",
      revenue: "15억 원",
      employees: "22명",
      description:
        "기업용 소프트웨어 개발 전문 기업입니다. 주요 금융권 및 공공기관을 고객으로 확보하고 있으며, 안정적인 프로젝트 파이프라인을 보유하고 있습니다.",
      postedDate: "2023-04-10",
      isFavorite: true,
      status: "closing" as const,
      matchScore: 88,
    },
  ]

  const handleFavoriteToggle = (id: string) => {
    console.log(`Remove favorite for deal ${id}`)
  }

  const handleViewDetails = (id: string) => {
    console.log(`View details for deal ${id}`)
  }

  const handleRemoveAllFavorites = () => {
    console.log("Remove all favorites")
  }

  // Filter deals based on active tab and search query
  const filteredDeals = favoriteDeals.filter((deal) => {
    // Filter by tab
    if (activeTab === "it" && deal.industry !== "IT 서비스") return false
    if (activeTab === "manufacturing" && deal.industry !== "제조") return false
    if (activeTab === "biohealth" && deal.industry !== "바이오/헬스케어") return false

    // Filter by search query
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

  // Sort deals based on sort option
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
        <Button variant="outline" className="text-gray-500 border-gray-200" onClick={handleRemoveAllFavorites}>
          <Trash2 className="h-4 w-4 mr-2" />
          전체 삭제
        </Button>
      </div>

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
            deal={deal}
            onFavoriteToggle={handleFavoriteToggle}
            onViewDetails={handleViewDetails}
          />
        ))}
      </div>

      {sortedDeals.length === 0 && (
        <div className="text-center py-12">
          <Heart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">저장된 관심 매물이 없습니다</h3>
          <p className="text-gray-500">매물 목록에서 하트 아이콘을 클릭하여 관심 매물을 저장하세요.</p>
          <Button className="mt-4">매물 둘러보기</Button>
        </div>
      )}
    </div>
  )
}
