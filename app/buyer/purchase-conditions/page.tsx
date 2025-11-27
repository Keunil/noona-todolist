"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Plus,
  Edit,
  Trash2,
  Copy,
  ListFilter,
  Building,
  MapPin,
  DollarSign,
  Users,
  BarChart,
  Calendar,
  Clock,
  AlertCircle,
} from "lucide-react"

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
      matchCount: 12,
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
      matchCount: 8,
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
      matchCount: 5,
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
      matchCount: 0,
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
  return (
    <Card className="h-full overflow-hidden hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{condition.name}</CardTitle>
            <CardDescription>
              {condition.status === "active" ? (
                <Badge className="mt-1 bg-green-100 text-green-800">활성</Badge>
              ) : (
                <Badge className="mt-1 bg-gray-100 text-gray-800">비활성</Badge>
              )}
            </CardDescription>
          </div>
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Copy className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Building className="h-4 w-4 text-gray-400" />
            <span className="text-sm">{condition.industry}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-gray-400" />
            <span className="text-sm">{condition.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-gray-400" />
            <span className="text-sm">{condition.priceRange}</span>
          </div>
          <div className="flex items-center gap-2">
            <BarChart className="h-4 w-4 text-gray-400" />
            <span className="text-sm">{condition.revenueRange}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-gray-400" />
            <span className="text-sm">{condition.employeeRange}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-400" />
            <span className="text-sm">등록일: {condition.createdAt}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-gray-400" />
            <span className="text-sm">최종 수정일: {condition.updatedAt}</span>
          </div>
        </div>

        {condition.description && (
          <div className="mt-4 p-3 bg-gray-50 rounded-md">
            <p className="text-sm text-gray-600">{condition.description}</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="bg-gray-50 border-t border-gray-100 flex justify-between">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-[#F4511E]" />
          <span className="text-sm font-medium">
            {condition.matchCount > 0
              ? `${condition.matchCount}개의 매칭 기업`
              : condition.status === "active"
                ? "매칭 기업 없음"
                : "비활성 상태"}
          </span>
        </div>
        {condition.matchCount > 0 && (
          <Button variant="outline" size="sm" className="text-[#F4511E]">
            기업 보기
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
