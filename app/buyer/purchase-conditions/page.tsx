"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Plus, ListFilter, DollarSign, Users, BarChart, Calendar, ChevronUp, CheckCircle, Eye } from "lucide-react"

export default function PurchaseConditionsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("active")

  // Mock data for purchase conditions
  const purchaseConditions = [
    {
      id: "1",
      name: "IT 서비스 기업 (서울/경기)",
      status: "active",
      industry: "IT 서비스",
      location: "서울, 경기",
      priceRange: "30억 원 - 100억 원",
      revenueRange: "10억 원 이상",
      employeeRange: "10명 - 50명",
      createdAt: "2023-05-01",
      updatedAt: "2023-06-01",
      verified: true,
      description: "클라우드 서비스, SaaS 기업 우대. 최근 3년간 성장률 20% 이상인 기업 선호.",
    },
    {
      id: "2",
      name: "제조업 (전국)",
      status: "active",
      industry: "제조",
      location: "전국",
      priceRange: "50억 원 - 200억 원",
      revenueRange: "30억 원 이상",
      employeeRange: "30명 - 100명",
      createdAt: "2023-04-15",
      updatedAt: "2023-05-20",
      verified: false,
      description: "자동차 부품, 전자 부품 제조 기업 우대. 수출 비중 30% 이상인 기업 선호.",
    },
    {
      id: "3",
      name: "바이오/헬스케어 (대전/판교)",
      status: "active",
      industry: "바이오/헬스케어",
      location: "대전, 판교",
      priceRange: "20억 원 - 80억 원",
      revenueRange: "5억 원 이상",
      employeeRange: "5명 - 30명",
      createdAt: "2023-05-10",
      updatedAt: "2023-06-05",
      verified: true,
      description: "의료기기, 디지털 헬스케어 기업 우대. 특허 보유 기업 선호.",
    },
    {
      id: "4",
      name: "유통/물류 (수도권)",
      status: "inactive",
      industry: "유통/물류",
      location: "수도권",
      priceRange: "40억 원 - 150억 원",
      revenueRange: "20억 원 이상",
      employeeRange: "20명 - 80명",
      createdAt: "2023-03-20",
      updatedAt: "2023-04-25",
      verified: false,
      description: "온라인 유통, 라스트마일 물류 기업 우대. 자체 물류 시스템 보유 기업 선호.",
    },
  ]

  const handleCreateClick = () => {
    router.push("/buyer/purchase-conditions/create")
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">매수조건 등록/관리</h1>
          <p className="text-gray-500 mt-1">
            관심 있는 매수 조건을 등록하고 관리하세요. 조건에 맞는 기업이 등록되면 알림을 받을 수 있습니다.
          </p>
        </div>
        <Button className="bg-[#F4511E] hover:bg-[#D73C11]" onClick={handleCreateClick}>
          <Plus className="h-4 w-4 mr-2" />새 매수조건 등록
        </Button>
      </div>

      <Tabs defaultValue="active" onValueChange={setActiveTab}>
        <div className="flex justify-between items-center mb-6">
          <TabsList>
            <TabsTrigger value="active">활성 조건</TabsTrigger>
            <TabsTrigger value="inactive">비활성 조건</TabsTrigger>
            <TabsTrigger value="all">전체 조건</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <ListFilter className="h-4 w-4" />
            <span>총 {purchaseConditions.filter((c) => c.status === activeTab || activeTab === "all").length}개</span>
          </div>
        </div>

        <TabsContent value="active" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {purchaseConditions
              .filter((condition) => condition.status === "active")
              .map((condition) => (
                <ConditionCard key={condition.id} condition={condition} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="inactive" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {purchaseConditions
              .filter((condition) => condition.status === "inactive")
              .map((condition) => (
                <ConditionCard key={condition.id} condition={condition} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="all" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {purchaseConditions.map((condition) => (
              <ConditionCard key={condition.id} condition={condition} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ConditionCard({ condition }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Card className="h-full overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <div className="relative">
          <div className="h-3 bg-gray-200"></div>
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-xl font-bold text-gray-900">{condition.name}</h3>
                  {condition.verified && (
                    <Badge className="bg-blue-100 text-blue-800 border-blue-200 flex items-center gap-1">
                      <CheckCircle className="h-3 w-3" />
                      실사
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="outline" className="bg-gray-100 text-gray-800">
                {condition.industry}
              </Badge>
              <Badge variant="outline" className="bg-gray-100 text-gray-800">
                {condition.location}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                  <DollarSign className="h-4 w-4 text-gray-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">매각 가격</p>
                  <p className="font-bold text-gray-900 text-sm">{condition.priceRange}</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                  <BarChart className="h-4 w-4 text-gray-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">매출액</p>
                  <p className="font-bold text-gray-900 text-sm">{condition.revenueRange}</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                  <Users className="h-4 w-4 text-gray-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">직원 수</p>
                  <p className="font-bold text-gray-900 text-sm">{condition.employeeRange}</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                  <Calendar className="h-4 w-4 text-gray-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">등록일</p>
                  <p className="font-bold text-gray-900 text-sm">{condition.createdAt}</p>
                </div>
              </div>
            </div>

            {isExpanded && condition.description && (
              <p className="text-sm text-gray-600 mb-4 text-left">{condition.description}</p>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 bg-gray-50 border-t border-gray-100 flex justify-center">
        <Button className="w-full" onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? <ChevronUp className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
          {isExpanded ? "간단히 보기" : "상세 정보 보기"}
        </Button>
      </CardFooter>
    </Card>
  )
}
