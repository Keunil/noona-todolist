"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Filter, Search, X, SlidersHorizontal, ArrowUpDown, Building, MapPin, DollarSign } from "lucide-react"
import DealCard from "@/components/buyer/deal-card"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet"

export default function DealsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [sortOption, setSortOption] = useState("match")
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilters, setActiveFilters] = useState([])

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
      isFavorite: false,
      status: "new" as const,
      matchScore: 72,
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
      isFavorite: false,
      status: "new" as const,
      matchScore: 68,
    },
  ]

  // Industry options
  const industryOptions = [
    { value: "it", label: "IT 서비스" },
    { value: "manufacturing", label: "제조" },
    { value: "biohealth", label: "바이오/헬스케어" },
    { value: "distribution", label: "유통/물류" },
    { value: "education", label: "교육" },
    { value: "finance", label: "금융" },
    { value: "food", label: "식품" },
    { value: "construction", label: "건설" },
    { value: "energy", label: "에너지" },
    { value: "entertainment", label: "엔터테인먼트" },
  ]

  // Location options
  const locationOptions = [
    { value: "seoul", label: "서울" },
    { value: "gyeonggi", label: "경기" },
    { value: "incheon", label: "인천" },
    { value: "busan", label: "부산" },
    { value: "daegu", label: "대구" },
    { value: "daejeon", label: "대전" },
    { value: "gwangju", label: "광주" },
    { value: "ulsan", label: "울산" },
    { value: "sejong", label: "세종" },
  ]

  const handleFavoriteToggle = (id: string) => {
    console.log(`Toggle favorite for deal ${id}`)
  }

  const handleViewDetails = (id: string) => {
    console.log(`View details for deal ${id}`)
  }

  const handleAddFilter = (type, value) => {
    const newFilter = { type, value }
    if (!activeFilters.some((filter) => filter.type === type && filter.value === value)) {
      setActiveFilters([...activeFilters, newFilter])
    }
  }

  const handleRemoveFilter = (type, value) => {
    setActiveFilters(activeFilters.filter((filter) => !(filter.type === type && filter.value === value)))
  }

  const handleClearFilters = () => {
    setActiveFilters([])
  }

  // Filter deals based on active filters and search query
  const filteredDeals = deals.filter((deal) => {
    // Filter by tab
    if (activeTab === "favorites" && !deal.isFavorite) return false
    if (activeTab === "new" && deal.status !== "new") return false
    if (activeTab === "hot" && deal.status !== "hot") return false

    // Filter by search query
    if (
      searchQuery &&
      !deal.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !deal.company.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !deal.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    // Filter by active filters
    for (const filter of activeFilters) {
      if (filter.type === "industry" && deal.industry !== filter.value) return false
      if (filter.type === "location" && deal.location !== filter.value) return false
      // Add more filter types as needed
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
      <div className="space-y-8 text-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">매수 물건 조회</h1>
          <p className="text-gray-500 mt-1">
            현재 등록된 매물 정보를 확인하고 관심 있는 매물을 저장하세요. 매물에 대한 상세 정보는 담당 매니저를 통해
            제공됩니다.
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <Tabs defaultValue="all" onValueChange={setActiveTab} className="w-full md:w-auto mx-auto">
          <TabsList className="mx-auto">
            <TabsTrigger value="all">전체 매물</TabsTrigger>
            <TabsTrigger value="favorites">관심 매물</TabsTrigger>
            <TabsTrigger value="new">신규 매물</TabsTrigger>
            <TabsTrigger value="hot">인기 매물</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-[300px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input
              type="search"
              placeholder="매물 검색..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <Select value={sortOption} onValueChange={setSortOption}>
              <SelectTrigger className="w-[180px]">
                <div className="flex items-center">
                  <ArrowUpDown className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="정렬 기준" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>정렬 기준</SelectLabel>
                  <SelectItem value="match">매칭 점수순</SelectItem>
                  <SelectItem value="recent">최신순</SelectItem>
                  <SelectItem value="price-high">가격 높은순</SelectItem>
                  <SelectItem value="price-low">가격 낮은순</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  필터
                  {activeFilters.length > 0 && <Badge className="ml-1 bg-gray-500">{activeFilters.length}</Badge>}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[400px] sm:max-w-none">
                <SheetHeader>
                  <SheetTitle>매물 필터</SheetTitle>
                  <SheetDescription>원하는 조건에 맞는 매물을 필터링하세요.</SheetDescription>
                </SheetHeader>
                <div className="py-6 space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium">산업 분야</h3>
                      <Button variant="ghost" size="sm" className="h-8 text-[#F4511E]">
                        전체 선택
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {industryOptions.map((option) => (
                        <div key={option.value} className="flex items-center space-x-2">
                          <Checkbox
                            id={`industry-${option.value}`}
                            checked={activeFilters.some(
                              (filter) => filter.type === "industry" && filter.value === option.label,
                            )}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                handleAddFilter("industry", option.label)
                              } else {
                                handleRemoveFilter("industry", option.label)
                              }
                            }}
                          />
                          <Label htmlFor={`industry-${option.value}`} className="text-sm">
                            {option.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium">지역</h3>
                      <Button variant="ghost" size="sm" className="h-8 text-[#F4511E]">
                        전체 선택
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {locationOptions.map((option) => (
                        <div key={option.value} className="flex items-center space-x-2">
                          <Checkbox
                            id={`location-${option.value}`}
                            checked={activeFilters.some(
                              (filter) => filter.type === "location" && filter.value === option.label,
                            )}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                handleAddFilter("location", option.label)
                              } else {
                                handleRemoveFilter("location", option.label)
                              }
                            }}
                          />
                          <Label htmlFor={`location-${option.value}`} className="text-sm">
                            {option.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">매각 가격 범위</h3>
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <Input type="number" placeholder="최소 금액 (억 원)" />
                        <span>~</span>
                        <Input type="number" placeholder="최대 금액 (억 원)" />
                      </div>
                      <Slider defaultValue={[20, 80]} max={100} step={1} />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>0억 원</span>
                        <span>100억 원+</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">매출액 범위</h3>
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <Input type="number" placeholder="최소 매출액 (억 원)" />
                        <span>~</span>
                        <Input type="number" placeholder="최대 매출액 (억 원)" />
                      </div>
                      <Slider defaultValue={[10, 50]} max={100} step={1} />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>0억 원</span>
                        <span>100억 원+</span>
                      </div>
                    </div>
                  </div>
                </div>
                <SheetFooter className="flex-row justify-between sm:justify-between">
                  <SheetClose asChild>
                    <Button variant="outline" onClick={handleClearFilters}>
                      필터 초기화
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button variant="default">필터 적용</Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 items-center justify-center">
        <span className="text-sm text-gray-500">적용된 필터:</span>
        {activeFilters.map((filter, index) => (
          <Badge key={index} variant="outline" className="flex items-center gap-1 bg-gray-100">
            {filter.type === "industry" && <Building className="h-3 w-3" />}
            {filter.type === "location" && <MapPin className="h-3 w-3" />}
            {filter.type === "price" && <DollarSign className="h-3 w-3" />}
            {filter.value}
            <Button
              variant="ghost"
              size="icon"
              className="h-4 w-4 ml-1 p-0"
              onClick={() => handleRemoveFilter(filter.type, filter.value)}
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        ))}
        <Button variant="ghost" size="sm" className="h-7 text-gray-500" onClick={handleClearFilters}>
          모두 지우기
        </Button>
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
          <SlidersHorizontal className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">검색 결과가 없습니다</h3>
          <p className="text-gray-500">다른 검색어나 필터 조건을 사용해 보세요.</p>
          <Button variant="outline" className="mt-4" onClick={handleClearFilters}>
            필터 초기화
          </Button>
        </div>
      )}

      {sortedDeals.length > 0 && (
        <div className="flex justify-center mt-8">
          <Button variant="outline">더 많은 매물 보기</Button>
        </div>
      )}
    </div>
  )
}
