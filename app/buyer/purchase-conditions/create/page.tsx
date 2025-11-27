"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, DollarSign, FileText, Info } from "lucide-react"

export default function CreatePurchaseConditionPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    industries: [],
    locations: [],
    minPrice: "",
    maxPrice: "",
    minRevenue: "",
    maxRevenue: "",
    minEmployees: "",
    maxEmployees: "",
    description: "",
    establishedYears: "",
    profitMargin: "",
    growthRate: "",
    debtRatio: "",
    receiveNotifications: true,
    priority: "medium",
    searchFrequency: "daily",
  })

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
    { value: "gangwon", label: "강원" },
    { value: "chungbuk", label: "충북" },
    { value: "chungnam", label: "충남" },
    { value: "jeonbuk", label: "전북" },
    { value: "jeonnam", label: "전남" },
    { value: "gyeongbuk", label: "경북" },
    { value: "gyeongnam", label: "경남" },
    { value: "jeju", label: "제주" },
  ]

  const handleIndustryChange = (value, checked) => {
    if (checked) {
      setFormData({
        ...formData,
        industries: [...formData.industries, value],
      })
    } else {
      setFormData({
        ...formData,
        industries: formData.industries.filter((item) => item !== value),
      })
    }
  }

  const handleLocationChange = (value, checked) => {
    if (checked) {
      setFormData({
        ...formData,
        locations: [...formData.locations, value],
      })
    } else {
      setFormData({
        ...formData,
        locations: formData.locations.filter((item) => item !== value),
      })
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSwitchChange = (checked) => {
    setFormData({
      ...formData,
      receiveNotifications: checked,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // 여기에 데이터 저장 로직 추가
    router.push("/buyer/purchase-conditions")
  }

  const handleCancel = () => {
    router.back()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={handleCancel}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold text-gray-900">새 매수조건 등록</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic">기본 정보</TabsTrigger>
            <TabsTrigger value="financial">재무 조건</TabsTrigger>
            <TabsTrigger value="preferences">선호 조건 및 설정</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-6 pt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-[#F4511E]" />
                  기본 정보
                </CardTitle>
                <CardDescription>매수하고자 하는 기업의 기본 정보를 입력하세요.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="name">매수조건명 *</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="예: IT 서비스 기업 (서울/경기)"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">매수조건을 쉽게 식별할 수 있는 이름을 입력하세요.</p>
                </div>

                <div>
                  <Label>산업 분야 *</Label>
                  <div className="border rounded-md p-4 h-[200px] overflow-y-auto mt-1.5">
                    <div className="grid grid-cols-2 gap-3">
                      {industryOptions.map((option) => (
                        <div key={option.value} className="flex items-center space-x-2">
                          <Checkbox
                            id={`industry-${option.value}`}
                            checked={formData.industries.includes(option.value)}
                            onCheckedChange={(checked) => handleIndustryChange(option.value, checked)}
                          />
                          <Label htmlFor={`industry-${option.value}`} className="text-sm">
                            {option.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <Label>지역 *</Label>
                  <div className="border rounded-md p-4 h-[200px] overflow-y-auto mt-1.5">
                    <div className="grid grid-cols-3 gap-3">
                      {locationOptions.map((option) => (
                        <div key={option.value} className="flex items-center space-x-2">
                          <Checkbox
                            id={`location-${option.value}`}
                            checked={formData.locations.includes(option.value)}
                            onCheckedChange={(checked) => handleLocationChange(option.value, checked)}
                          />
                          <Label htmlFor={`location-${option.value}`} className="text-sm">
                            {option.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label>매수 금액 범위 *</Label>
                    <div className="flex items-center gap-4 mt-1.5">
                      <div className="relative flex-1">
                        <Input
                          type="number"
                          name="minPrice"
                          placeholder="최소 금액"
                          value={formData.minPrice}
                          onChange={handleInputChange}
                          required
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">억 원</span>
                      </div>
                      <span>~</span>
                      <div className="relative flex-1">
                        <Input
                          type="number"
                          name="maxPrice"
                          placeholder="최대 금액"
                          value={formData.maxPrice}
                          onChange={handleInputChange}
                          required
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">억 원</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label>매출액 범위</Label>
                    <div className="flex items-center gap-4 mt-1.5">
                      <div className="relative flex-1">
                        <Input
                          type="number"
                          name="minRevenue"
                          placeholder="최소 매출액"
                          value={formData.minRevenue}
                          onChange={handleInputChange}
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">억 원</span>
                      </div>
                      <span>~</span>
                      <div className="relative flex-1">
                        <Input
                          type="number"
                          name="maxRevenue"
                          placeholder="최대 매출액"
                          value={formData.maxRevenue}
                          onChange={handleInputChange}
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">억 원</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label>직원 수 범위</Label>
                    <div className="flex items-center gap-4 mt-1.5">
                      <div className="flex-1">
                        <Input
                          type="number"
                          name="minEmployees"
                          placeholder="최소 직원 수"
                          value={formData.minEmployees}
                          onChange={handleInputChange}
                        />
                      </div>
                      <span>~</span>
                      <div className="flex-1">
                        <Input
                          type="number"
                          name="maxEmployees"
                          placeholder="최대 직원 수"
                          value={formData.maxEmployees}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="establishedYears">설립 연수</Label>
                  <Select
                    value={formData.establishedYears}
                    onValueChange={(value) => setFormData({ ...formData, establishedYears: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="설립 연수 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">제한 없음</SelectItem>
                      <SelectItem value="1-3">1-3년</SelectItem>
                      <SelectItem value="3-5">3-5년</SelectItem>
                      <SelectItem value="5-10">5-10년</SelectItem>
                      <SelectItem value="10+">10년 이상</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="financial" className="space-y-6 pt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-[#F4511E]" />
                  재무 조건
                </CardTitle>
                <CardDescription>매수하고자 하는 기업의 재무 관련 조건을 입력하세요.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="profitMargin">영업이익률</Label>
                  <Select
                    value={formData.profitMargin}
                    onValueChange={(value) => setFormData({ ...formData, profitMargin: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="영업이익률 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">제한 없음</SelectItem>
                      <SelectItem value="5+">5% 이상</SelectItem>
                      <SelectItem value="10+">10% 이상</SelectItem>
                      <SelectItem value="15+">15% 이상</SelectItem>
                      <SelectItem value="20+">20% 이상</SelectItem>
                      <SelectItem value="30+">30% 이상</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="growthRate">연간 성장률</Label>
                  <Select
                    value={formData.growthRate}
                    onValueChange={(value) => setFormData({ ...formData, growthRate: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="연간 성장률 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">제한 없음</SelectItem>
                      <SelectItem value="5+">5% 이상</SelectItem>
                      <SelectItem value="10+">10% 이상</SelectItem>
                      <SelectItem value="15+">15% 이상</SelectItem>
                      <SelectItem value="20+">20% 이상</SelectItem>
                      <SelectItem value="30+">30% 이상</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="debtRatio">부채비율</Label>
                  <Select
                    value={formData.debtRatio}
                    onValueChange={(value) => setFormData({ ...formData, debtRatio: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="부채비율 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">제한 없음</SelectItem>
                      <SelectItem value="30-">30% 미만</SelectItem>
                      <SelectItem value="50-">50% 미만</SelectItem>
                      <SelectItem value="70-">70% 미만</SelectItem>
                      <SelectItem value="100-">100% 미만</SelectItem>
                      <SelectItem value="150-">150% 미만</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>기업 강점 (해당되는 항목 선택)</Label>
                  <div className="grid grid-cols-2 gap-3 mt-1.5">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="strength-1" />
                      <Label htmlFor="strength-1" className="text-sm">
                        안정적인 수익구조
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="strength-2" />
                      <Label htmlFor="strength-2" className="text-sm">
                        높은 성장성
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="strength-3" />
                      <Label htmlFor="strength-3" className="text-sm">
                        핵심 기술 보유
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="strength-4" />
                      <Label htmlFor="strength-4" className="text-sm">
                        특허 보유
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="strength-5" />
                      <Label htmlFor="strength-5" className="text-sm">
                        우수한 고객층
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="strength-6" />
                      <Label htmlFor="strength-6" className="text-sm">
                        낮은 운영 비용
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="strength-7" />
                      <Label htmlFor="strength-7" className="text-sm">
                        높은 시장 점유율
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="strength-8" />
                      <Label htmlFor="strength-8" className="text-sm">
                        글로벌 진출 가능성
                      </Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-6 pt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-[#F4511E]" />
                  선호 조건 및 설정
                </CardTitle>
                <CardDescription>추가 선호 조건과 알림 설정을 입력하세요.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="description">추가 요구사항</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="예: 클라우드 서비스, SaaS 기업 우대. 최근 3년간 성장률 20% 이상인 기업 선호."
                    rows={4}
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-4">
                  <Label>우선순위</Label>
                  <RadioGroup
                    value={formData.priority}
                    onValueChange={(value) => setFormData({ ...formData, priority: value })}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="low" id="priority-low" />
                      <Label htmlFor="priority-low">낮음</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="medium" id="priority-medium" />
                      <Label htmlFor="priority-medium">중간</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="high" id="priority-high" />
                      <Label htmlFor="priority-high">높음</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label htmlFor="searchFrequency">검색 빈도</Label>
                  <Select
                    value={formData.searchFrequency}
                    onValueChange={(value) => setFormData({ ...formData, searchFrequency: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="검색 빈도 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">매일</SelectItem>
                      <SelectItem value="weekly">매주</SelectItem>
                      <SelectItem value="biweekly">격주</SelectItem>
                      <SelectItem value="monthly">매월</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500 mt-1">
                    선택한 빈도에 따라 매수조건에 맞는 기업을 검색하고 결과를 알려드립니다.
                  </p>
                </div>

                <Separator />

                <div className="flex items-center space-x-2">
                  <Switch
                    id="notification"
                    checked={formData.receiveNotifications}
                    onCheckedChange={handleSwitchChange}
                  />
                  <Label htmlFor="notification">조건에 맞는 기업이 등록되면 알림 받기</Label>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={handleCancel}>
            취소
          </Button>
          <Button type="submit" className="bg-[#F4511E] hover:bg-[#D73C11]">
            등록하기
          </Button>
        </div>
      </form>
    </div>
  )
}
