"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MA_SERVICES, INDUSTRIES, COMPANY_SIZES, recommendAdvisors } from "@/lib/ma-services"
import { ArrowRight, CheckCircle2, Building2, Clock, Info, Star, Award, Calendar } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function BuyerRFPPage() {
  const [step, setStep] = useState<"select" | "details" | "advisors" | "review">("select")
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [selectedAdvisors, setSelectedAdvisors] = useState<string[]>([])
  const [formData, setFormData] = useState({
    companyName: "",
    industry: "",
    companySize: "",
    dealSize: "",
    timeline: "",
    deadline: "",
    description: "",
  })

  const buyerServices = MA_SERVICES.filter((s) => s.category === "buyer" || s.category === "common")

  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId) ? prev.filter((id) => id !== serviceId) : [...prev, serviceId],
    )
  }

  const handleAdvisorToggle = (advisorId: string) => {
    setSelectedAdvisors((prev) =>
      prev.includes(advisorId) ? prev.filter((id) => id !== advisorId) : [...prev, advisorId],
    )
  }

  const handleNextStep = () => {
    if (step === "select" && selectedServices.length > 0) {
      setStep("details")
    } else if (step === "details") {
      setStep("advisors")
    } else if (step === "advisors") {
      setStep("review")
    }
  }

  const handleSubmit = () => {
    alert("RFP가 성공적으로 제출되었습니다. 곧 자문사로부터 제안서를 받으실 수 있습니다.")
  }

  const recommendations =
    selectedServices.length > 0 && formData.industry
      ? recommendAdvisors(selectedServices, formData.industry, formData.companySize)
      : null

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">자문사 RFP 요청</h1>
        <p className="text-gray-500 mt-1">M&A 관련 필요한 용역을 선택하고 최적의 자문사를 추천받으세요</p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center space-x-2">
        <div className={`flex items-center ${step === "select" ? "text-[#F4511E]" : "text-gray-400"}`}>
          <div
            className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm ${step === "select" ? "border-[#F4511E]" : "border-gray-400"}`}
          >
            1
          </div>
          <span className="ml-2 text-sm font-medium hidden sm:inline">서비스 선택</span>
        </div>
        <div className="w-8 h-px bg-gray-300" />
        <div className={`flex items-center ${step === "details" ? "text-[#F4511E]" : "text-gray-400"}`}>
          <div
            className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm ${step === "details" ? "border-[#F4511E]" : "border-gray-400"}`}
          >
            2
          </div>
          <span className="ml-2 text-sm font-medium hidden sm:inline">상세 정보</span>
        </div>
        <div className="w-8 h-px bg-gray-300" />
        <div className={`flex items-center ${step === "advisors" ? "text-[#F4511E]" : "text-gray-400"}`}>
          <div
            className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm ${step === "advisors" ? "border-[#F4511E]" : "border-gray-400"}`}
          >
            3
          </div>
          <span className="ml-2 text-sm font-medium hidden sm:inline">자문사 선택</span>
        </div>
        <div className="w-8 h-px bg-gray-300" />
        <div className={`flex items-center ${step === "review" ? "text-[#F4511E]" : "text-gray-400"}`}>
          <div
            className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm ${step === "review" ? "border-[#F4511E]" : "border-gray-400"}`}
          >
            4
          </div>
          <span className="ml-2 text-sm font-medium hidden sm:inline">검토 및 제출</span>
        </div>
      </div>

      {/* Step 1: Service Selection */}
      {step === "select" && (
        <div className="space-y-6">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              필요한 M&A 자문 서비스를 선택하세요. 여러 개를 선택할 수 있으며, 선택한 서비스에 따라 최적의 자문사를
              추천해드립니다.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {buyerServices.map((service) => (
              <Card
                key={service.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedServices.includes(service.id) ? "border-[#F4511E] border-2" : ""
                }`}
                onClick={() => handleServiceToggle(service.id)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-base">{service.name}</CardTitle>
                      <CardDescription className="text-sm mt-1">{service.description}</CardDescription>
                    </div>
                    <Checkbox
                      checked={selectedServices.includes(service.id)}
                      onCheckedChange={() => handleServiceToggle(service.id)}
                      className="ml-2"
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="h-3 w-3 mr-1" />
                    {service.typical_duration}
                  </div>
                  {service.category !== "common" && (
                    <Badge variant="secondary" className="mt-2">
                      {service.category === "buyer" ? "매수자 전용" : "매도자 전용"}
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-between">
            <div className="text-sm text-gray-600">
              선택된 서비스: <span className="font-bold text-[#F4511E]">{selectedServices.length}개</span>
            </div>
            <Button
              onClick={handleNextStep}
              disabled={selectedServices.length === 0}
              className="bg-[#F4511E] hover:bg-[#D73C11]"
            >
              다음 단계
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Step 2: Details */}
      {step === "details" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>프로젝트 상세 정보</CardTitle>
              <CardDescription>자문사가 최적의 제안을 준비할 수 있도록 상세 정보를 입력해주세요</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">회사명</Label>
                  <Input
                    id="companyName"
                    placeholder="인수 대상 회사명 또는 귀사명"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="industry">업종 *</Label>
                  <Select
                    value={formData.industry}
                    onValueChange={(value) => setFormData({ ...formData, industry: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="업종 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      {INDUSTRIES.map((industry) => (
                        <SelectItem key={industry} value={industry}>
                          {industry}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="companySize">기업 규모 (매출액 기준)</Label>
                  <Select
                    value={formData.companySize}
                    onValueChange={(value) => setFormData({ ...formData, companySize: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="기업 규모 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      {COMPANY_SIZES.map((size) => (
                        <SelectItem key={size.value} value={size.value}>
                          {size.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dealSize">예상 거래 금액</Label>
                  <Input
                    id="dealSize"
                    placeholder="예: 100억원"
                    value={formData.dealSize}
                    onChange={(e) => setFormData({ ...formData, dealSize: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timeline">희망 일정</Label>
                  <Select
                    value={formData.timeline}
                    onValueChange={(value) => setFormData({ ...formData, timeline: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="일정 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="urgent">긴급 (1개월 이내)</SelectItem>
                      <SelectItem value="normal">보통 (1-3개월)</SelectItem>
                      <SelectItem value="flexible">여유 (3개월 이상)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deadline">제안서 제출 기한 *</Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">프로젝트 설명</Label>
                <Textarea
                  id="description"
                  placeholder="프로젝트의 배경, 목표, 특별히 고려해야 할 사항 등을 자유롭게 작성해주세요"
                  rows={6}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setStep("select")}>
              이전
            </Button>
            <Button
              onClick={handleNextStep}
              disabled={!formData.industry || !formData.deadline}
              className="bg-[#F4511E] hover:bg-[#D73C11]"
            >
              자문사 추천 받기
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Advisor Selection */}
      {step === "advisors" && recommendations && (
        <div className="space-y-6">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              선택한 서비스와 업종에 적합한 자문사를 추천해드립니다. 원하는 자문사를 선택하거나 모두에게 RFP를 발송할 수
              있습니다.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendations.recommendedAdvisors.map((advisor) => (
              <Card
                key={advisor.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedAdvisors.includes(advisor.id) ? "border-[#F4511E] border-2" : ""
                }`}
                onClick={() => handleAdvisorToggle(advisor.id)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-base">{advisor.name}</CardTitle>
                        {advisor.verified && <Award className="h-4 w-4 text-blue-600" />}
                      </div>
                      <CardDescription className="text-sm mt-1">{advisor.description}</CardDescription>
                    </div>
                    <Checkbox
                      checked={selectedAdvisors.includes(advisor.id)}
                      onCheckedChange={() => handleAdvisorToggle(advisor.id)}
                      className="ml-2"
                    />
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-yellow-600">
                      <Star className="h-4 w-4 fill-yellow-600 mr-1" />
                      <span className="font-semibold">{advisor.rating}</span>
                      <span className="text-gray-500 ml-1">({advisor.reviewCount})</span>
                    </div>
                    <div className="text-gray-600">프로젝트 {advisor.completedProjects}건</div>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {advisor.industries.slice(0, 3).map((industry) => (
                      <Badge key={industry} variant="secondary" className="text-xs">
                        {industry}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-between items-center">
            <Button variant="outline" onClick={() => setStep("details")}>
              이전
            </Button>
            <div className="flex items-center gap-3">
              <div className="text-sm text-gray-600">
                선택된 자문사: <span className="font-bold text-[#F4511E]">{selectedAdvisors.length}개</span>
              </div>
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedAdvisors(recommendations.recommendedAdvisors.map((a) => a.id))
                }}
              >
                전체 선택
              </Button>
              <Button onClick={handleNextStep} className="bg-[#F4511E] hover:bg-[#D73C11]">
                검토하기
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Step 4: Review */}
      {step === "review" && recommendations && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>RFP 요청 내용 검토</CardTitle>
              <CardDescription>제출하기 전에 입력하신 내용을 확인해주세요</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">선택된 서비스 ({selectedServices.length}개)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {selectedServices.map((serviceId) => {
                    const service = MA_SERVICES.find((s) => s.id === serviceId)
                    return (
                      <div key={serviceId} className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                        <span className="text-sm">{service?.name}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <p className="text-sm text-gray-500">회사명</p>
                  <p className="font-medium">{formData.companyName || "-"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">업종</p>
                  <p className="font-medium">{formData.industry || "-"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">기업 규모</p>
                  <p className="font-medium">
                    {COMPANY_SIZES.find((s) => s.value === formData.companySize)?.label || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">예상 거래 금액</p>
                  <p className="font-medium">{formData.dealSize || "-"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">희망 일정</p>
                  <p className="font-medium">
                    {formData.timeline === "urgent" && "긴급 (1개월 이내)"}
                    {formData.timeline === "normal" && "보통 (1-3개월)"}
                    {formData.timeline === "flexible" && "여유 (3개월 이상)"}
                    {!formData.timeline && "-"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">제안서 제출 기한</p>
                  <p className="font-medium">{formData.deadline || "-"}</p>
                </div>
              </div>

              {formData.description && (
                <div className="pt-4 border-t">
                  <p className="text-sm text-gray-500 mb-2">프로젝트 설명</p>
                  <p className="text-sm text-gray-700 whitespace-pre-wrap bg-gray-50 p-3 rounded-lg">
                    {formData.description}
                  </p>
                </div>
              )}

              <div className="pt-4 border-t">
                <h3 className="font-semibold text-gray-900 mb-3">RFP를 받을 자문사 ({selectedAdvisors.length}개)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedAdvisors.map((advisorId) => {
                    const advisor = recommendations.recommendedAdvisors.find((a) => a.id === advisorId)
                    if (!advisor) return null
                    return (
                      <div key={advisorId} className="flex items-center p-3 bg-blue-50 rounded-lg">
                        <Building2 className="h-4 w-4 text-blue-600 mr-2 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{advisor.name}</p>
                          <div className="flex items-center text-xs text-gray-600 mt-1">
                            <Star className="h-3 w-3 fill-yellow-500 text-yellow-500 mr-1" />
                            {advisor.rating} ({advisor.reviewCount})
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex items-start p-4 bg-blue-50 rounded-lg">
                  <Clock className="h-5 w-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-600">예상 소요 기간</p>
                    <p className="font-semibold text-blue-900">{recommendations.estimatedDuration}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Alert>
            <Calendar className="h-4 w-4" />
            <AlertDescription>
              RFP를 제출하시면 선택하신 자문사들에게 전달됩니다. 제출 기한인 {formData.deadline}까지 자문사로부터
              제안서를 받으실 수 있습니다.
            </AlertDescription>
          </Alert>

          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setStep("advisors")}>
              이전
            </Button>
            <Button onClick={handleSubmit} className="bg-[#F4511E] hover:bg-[#D73C11]">
              RFP 제출하기
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
