"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Building2,
  MapPin,
  DollarSign,
  BarChart3,
  Upload,
  Info,
  Users,
  Briefcase,
  TrendingUp,
  Calendar,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"

export default function RegisterCompanyPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    industry: "",
    foundedYear: "",
    employeeCount: "",
    annualRevenue: "",
    operatingProfit: "",
    location: "",
    description: "",
    sellingReason: "",
    askingPrice: "",
    isPublic: true,
    contactName: "",
    contactPhone: "",
    contactEmail: "",
    keyStrengths: [] as string[],
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleKeyStrengthChange = (strength: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      keyStrengths: checked ? [...prev.keyStrengths, strength] : prev.keyStrengths.filter((a) => a !== strength),
    }))
  }

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 5))
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 여기서 API 호출 또는 데이터 처리
    console.log("Form submitted:", formData)
    // 성공 시 기업 관리 페이지로 이동
    router.push("/seller/listings")
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">기업 등록</h1>
      <p className="text-gray-500 mb-8">새로운 매각 기업을 등록하고 잠재 투자자에게 노출하세요.</p>

      {/* 진행 상태 표시 */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {["기본 정보", "재무 정보", "기업 설명", "자료 업로드", "노출 설정"].map((step, index) => (
            <div
              key={index}
              className={`text-sm font-medium ${currentStep > index + 1 ? "text-green-600" : currentStep === index + 1 ? "text-gray-900" : "text-gray-400"}`}
            >
              {step}
            </div>
          ))}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-green-600 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / 5) * 100}%` }}
          ></div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* 1단계: 기본 정보 */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <Building2 className="mr-2 h-5 w-5 text-gray-500" />
                기업 기본 정보
              </h2>

              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    기업명 *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="예: 테크솔루션 주식회사"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">
                    업종 *
                  </label>
                  <Select value={formData.industry} onValueChange={(value) => handleSelectChange("industry", value)}>
                    <SelectTrigger id="industry">
                      <SelectValue placeholder="업종을 선택하세요" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="it">IT/소프트웨어</SelectItem>
                      <SelectItem value="manufacturing">제조업</SelectItem>
                      <SelectItem value="biotech">바이오/헬스케어</SelectItem>
                      <SelectItem value="retail">유통/소매</SelectItem>
                      <SelectItem value="finance">금융/핀테크</SelectItem>
                      <SelectItem value="education">교육</SelectItem>
                      <SelectItem value="food">식품/외식</SelectItem>
                      <SelectItem value="service">서비스업</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label htmlFor="foundedYear" className="block text-sm font-medium text-gray-700 mb-1">
                    설립연도 *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <Input
                      id="foundedYear"
                      name="foundedYear"
                      value={formData.foundedYear}
                      onChange={handleChange}
                      className="pl-10"
                      placeholder="예: 2010"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="employeeCount" className="block text-sm font-medium text-gray-700 mb-1">
                    직원 수 *
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <Input
                      id="employeeCount"
                      name="employeeCount"
                      value={formData.employeeCount}
                      onChange={handleChange}
                      className="pl-10"
                      placeholder="예: 45"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <MapPin className="mr-2 h-5 w-5 text-gray-500" />
                위치 정보
              </h2>

              <div className="space-y-4">
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                    본사 위치 *
                  </label>
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="예: 서울특별시 강남구"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={nextStep}
                className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                다음 단계
              </button>
            </div>
          </div>
        )}

        {/* 2단계: 재무 정보 */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <BarChart3 className="mr-2 h-5 w-5 text-gray-500" />
                재무 정보
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="annualRevenue" className="block text-sm font-medium text-gray-700 mb-1">
                    연간 매출액 (원) *
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <Input
                      id="annualRevenue"
                      name="annualRevenue"
                      value={formData.annualRevenue}
                      onChange={handleChange}
                      className="pl-10"
                      placeholder="예: 5,000,000,000"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="operatingProfit" className="block text-sm font-medium text-gray-700 mb-1">
                    영업이익 (원)
                  </label>
                  <div className="relative">
                    <TrendingUp className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <Input
                      id="operatingProfit"
                      name="operatingProfit"
                      value={formData.operatingProfit}
                      onChange={handleChange}
                      className="pl-10"
                      placeholder="예: 800,000,000"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="askingPrice" className="block text-sm font-medium text-gray-700 mb-1">
                    희망 매각가 (원) *
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <Input
                      id="askingPrice"
                      name="askingPrice"
                      value={formData.askingPrice}
                      onChange={handleChange}
                      className="pl-10"
                      placeholder="예: 10,000,000,000"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h2 className="text-lg font-semibold mb-4">기업 강점</h2>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  "안정적인 수익구조",
                  "높은 성장성",
                  "핵심 기술 보유",
                  "충성도 높은 고객층",
                  "숙련된 인력",
                  "시장 점유율 우수",
                  "낮은 부채비율",
                  "독점 계약 보유",
                  "특허/지식재산권",
                  "브랜드 가치",
                  "글로벌 진출 가능성",
                  "디지털 전환 완료",
                ].map((strength) => (
                  <div key={strength} className="flex items-center space-x-2">
                    <Checkbox
                      id={`strength-${strength}`}
                      checked={formData.keyStrengths.includes(strength)}
                      onCheckedChange={(checked) => handleKeyStrengthChange(strength, checked as boolean)}
                    />
                    <label
                      htmlFor={`strength-${strength}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {strength}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                이전 단계
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                다음 단계
              </button>
            </div>
          </div>
        )}

        {/* 3단계: 기업 설명 */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <Info className="mr-2 h-5 w-5 text-gray-500" />
                기업 설명
              </h2>

              <div className="space-y-4">
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    기업 소개 *
                  </label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="기업의 역사, 주요 제품/서비스, 시장 포지션 등 상세한 설명을 입력하세요."
                    className="min-h-[150px]"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <Briefcase className="mr-2 h-5 w-5 text-gray-500" />
                매각 정보
              </h2>

              <div className="space-y-4">
                <div>
                  <label htmlFor="sellingReason" className="block text-sm font-medium text-gray-700 mb-1">
                    매각 사유
                  </label>
                  <Textarea
                    id="sellingReason"
                    name="sellingReason"
                    value={formData.sellingReason}
                    onChange={handleChange}
                    placeholder="매각 사유와 투자자에게 어필할 수 있는 포인트를 설명하세요."
                    className="min-h-[100px]"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                이전 단계
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                다음 단계
              </button>
            </div>
          </div>
        )}

        {/* 4단계: 자료 업로드 */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <Upload className="mr-2 h-5 w-5 text-gray-500" />
                기업 자료 업로드
              </h2>

              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <div className="flex flex-col items-center">
                    <Upload className="h-10 w-10 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500 mb-2">회사 소개서, 재무제표 등의 자료를 업로드하세요</p>
                    <p className="text-xs text-gray-400 mb-4">PDF, PPT, XLSX 파일 지원 (최대 20MB)</p>
                    <button
                      type="button"
                      className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    >
                      파일 선택
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* 업로드된 파일 미리보기가 여기에 표시됩니다 */}
                  <div className="p-4 border border-gray-200 rounded-md flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-10 w-10 bg-gray-100 rounded-md flex items-center justify-center text-gray-500">
                        PDF
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium">회사소개서.pdf</p>
                        <p className="text-xs text-gray-500">2.4MB</p>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-md flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-10 w-10 bg-gray-100 rounded-md flex items-center justify-center text-gray-500">
                        XLS
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium">재무제표_2023.xlsx</p>
                        <p className="text-xs text-gray-500">1.8MB</p>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                이전 단계
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                다음 단계
              </button>
            </div>
          </div>
        )}

        {/* 5단계: 노출 설정 */}
        {currentStep === 5 && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <Info className="mr-2 h-5 w-5 text-gray-500" />
                노출 설정
              </h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">기업 정보 공개 여부</h3>
                    <p className="text-xs text-gray-500">기업 정보를 즉시 공개할지 여부를 설정합니다.</p>
                  </div>
                  <Switch
                    checked={formData.isPublic}
                    onCheckedChange={(checked) => handleSwitchChange("isPublic", checked)}
                  />
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">연락처 정보</h3>

                  <div className="space-y-3">
                    <div>
                      <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 mb-1">
                        담당자 이름 *
                      </label>
                      <Input
                        id="contactName"
                        name="contactName"
                        value={formData.contactName}
                        onChange={handleChange}
                        placeholder="예: 홍길동"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 mb-1">
                        연락처 *
                      </label>
                      <Input
                        id="contactPhone"
                        name="contactPhone"
                        value={formData.contactPhone}
                        onChange={handleChange}
                        placeholder="예: 010-1234-5678"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-1">
                        이메일 *
                      </label>
                      <Input
                        id="contactEmail"
                        name="contactEmail"
                        value={formData.contactEmail}
                        onChange={handleChange}
                        placeholder="예: example@email.com"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h2 className="text-lg font-semibold mb-4">최종 확인</h2>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    기업 등록 약관에 동의합니다.
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="privacy" />
                  <label
                    htmlFor="privacy"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    개인정보 처리방침에 동의합니다.
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="accuracy" />
                  <label
                    htmlFor="accuracy"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    제공한 모든 정보가 정확함을 확인합니다.
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                이전 단계
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                기업 등록 완료
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}
