"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Upload,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  Shield,
  TrendingUp,
  Users,
  Star,
  Eye,
  X,
} from "lucide-react"

type VDDStatus = "not_submitted" | "under_review" | "approved" | "revision_requested"

interface UploadedFile {
  id: string
  name: string
  size: string
  status: "uploaded" | "reviewing" | "approved" | "revision"
  content?: ArrayBuffer
}

interface DocumentItem {
  id: string
  label: string
  required: boolean
  file: UploadedFile | null
}

interface AssessmentItem {
  id: string
  question: string
  answer: boolean | null
  detail: string
  isNarrative?: boolean
}

export default function SellerVerificationPage() {
  const [vddStatus, setVddStatus] = useState<VDDStatus>("not_submitted")
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({})
  const [documents, setDocuments] = useState<DocumentItem[]>([
    { id: "ownership_status", label: "소유주 현황(주주명부, 사원명부)", required: true, file: null },
    { id: "tax_standard_3y", label: "최근 3개년 부가가치과세표준", required: true, file: null },
    { id: "business_plan", label: "사업계획서", required: true, file: null },
    { id: "purchase_invoice_3y", label: "최근 3개년 매입처별 세금계산서 합계표", required: false, file: null },
    { id: "sales_invoice_3y", label: "최근 3개년 매출처별 세금계산서 합계표", required: false, file: null },
    { id: "corporate_registration", label: "법인등기사항전부증명서", required: false, file: null },
    { id: "business_registration", label: "사업자등록증", required: true, file: null },
  ])

  const [assessments, setAssessments] = useState<AssessmentItem[]>([
    {
      id: "audit",
      question: "최근 3개년 재무제표가 외부감사 또는 검토를 받았습니까?",
      answer: null as boolean | null,
      detail: "",
    },
    {
      id: "financial_changes",
      question: "주요 재무 변동(매출·EBITDA·현금흐름)의 원인을 명확히 설명할 수 있습니까?",
      answer: null as boolean | null,
      detail: "",
      isNarrative: true,
    },
    {
      id: "debt_risk",
      question: "부채 비율 또는 차입금 만기 구조에 리스크가 있습니까?",
      answer: null as boolean | null,
      detail: "",
    },
    {
      id: "non_recurring",
      question: "비경상적 항목(일회성 비용/수익)이 존재합니까?",
      answer: null as boolean | null,
      detail: "",
    },
    {
      id: "monthly_reports",
      question: "월별 관리회계/손익 자료가 정기적으로 작성되고 있습니까?",
      answer: null as boolean | null,
      detail: "",
    },
  ])

  const handleFileUpload = async (docId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      const fileContent = await file.arrayBuffer()
      const fileSize = (file.size / (1024 * 1024)).toFixed(2)

      const uploadedFile: UploadedFile = {
        id: docId,
        name: file.name,
        size: `${fileSize} MB`,
        status: "uploaded",
        content: fileContent,
      }

      setDocuments((docs) => docs.map((doc) => (doc.id === docId ? { ...doc, file: uploadedFile } : doc)))
    } catch (error) {
      console.error("File upload error:", error)
    }
  }

  const handleRemoveFile = (docId: string) => {
    setDocuments((docs) => docs.map((doc) => (doc.id === docId ? { ...doc, file: null } : doc)))
  }

  const handleAssessmentChange = (id: string, answer: boolean, detail?: string) => {
    setAssessments(assessments.map((a) => (a.id === id ? { ...a, answer, detail: detail || a.detail } : a)))
  }

  const handleSubmitReview = () => {
    setVddStatus("under_review")
  }

  const getStatusConfig = (status: VDDStatus) => {
    switch (status) {
      case "not_submitted":
        return {
          icon: <AlertCircle className="h-8 w-8" />,
          color: "bg-gray-100 border-gray-300 text-gray-700",
          iconColor: "text-gray-500",
          title: "VDD 미제출",
          description: "VDD 인증을 완료하면 매수자 신뢰도가 크게 상승하며, 더 많은 매수자에게 우선적으로 노출됩니다.",
        }
      case "under_review":
        return {
          icon: <Clock className="h-8 w-8" />,
          color: "bg-blue-50 border-blue-300 text-blue-700",
          iconColor: "text-blue-500",
          title: "VDD 심사 중",
          description: "검토는 평균 3~5일 소요됩니다. 보완 요청이 있을 수 있습니다.",
        }
      case "approved":
        return {
          icon: <CheckCircle2 className="h-8 w-8" />,
          color: "bg-green-50 border-green-300 text-green-700",
          iconColor: "text-green-500",
          title: "VDD 인증 완료",
          description:
            "귀사 기업은 VDD 인증된 Verified Seller입니다. 플랫폼 매물 페이지에 Verified Seller 배지가 부여됩니다.",
        }
      case "revision_requested":
        return {
          icon: <AlertCircle className="h-8 w-8" />,
          color: "bg-yellow-50 border-yellow-300 text-yellow-700",
          iconColor: "text-yellow-500",
          title: "VDD 보완 요청",
          description: "일부 항목에 대한 보완이 필요합니다. 아래 표시된 항목을 확인해주세요.",
        }
    }
  }

  const statusConfig = getStatusConfig(vddStatus)
  const requiredDocsUploaded = documents.filter((d) => d.required).every((d) => d.file !== null)
  const allAssessmentsCompleted = assessments.every((a) => a.answer !== null)

  return (
    <div className="flex-1 overflow-y-auto p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">매도자 실사(VDD) 인증</h1>
          <p className="text-gray-600 mt-2">Vendor Due Diligence Certification</p>
        </div>

        {/* Status Card */}
        <Card className={`border-2 ${statusConfig.color}`}>
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className={statusConfig.iconColor}>{statusConfig.icon}</div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">{statusConfig.title}</h3>
                <p className="text-sm leading-relaxed">{statusConfig.description}</p>
                {vddStatus === "under_review" && (
                  <div className="mt-4 flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4" />
                    <span>예상 소요시간: 3~5일</span>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Test Status Buttons */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">테스트용 상태 전환</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 flex-wrap">
              <Button size="sm" variant="outline" onClick={() => setVddStatus("not_submitted")}>
                미제출
              </Button>
              <Button size="sm" variant="outline" onClick={() => setVddStatus("under_review")}>
                심사 중
              </Button>
              <Button size="sm" variant="outline" onClick={() => setVddStatus("approved")}>
                승인됨
              </Button>
              <Button size="sm" variant="outline" onClick={() => setVddStatus("revision_requested")}>
                보완 요청
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Required Documents */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              필수 첨부 자료
            </CardTitle>
            <CardDescription>VDD 인증을 위해 제출해야 하는 필수 문서들입니다.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {documents.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Label className="font-medium">{doc.label}</Label>
                      {doc.required && (
                        <Badge variant="secondary" className="text-xs">
                          필수
                        </Badge>
                      )}
                      {!doc.required && (
                        <Badge variant="outline" className="text-xs">
                          선택
                        </Badge>
                      )}
                    </div>
                    {doc.file && (
                      <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                        <FileText className="h-4 w-4" />
                        <span>{doc.file.name}</span>
                        <span className="text-gray-400">({doc.file.size})</span>
                        {doc.file.status === "uploaded" && (
                          <Badge variant="outline" className="text-xs">
                            제출됨
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {doc.file && (
                      <Button variant="ghost" size="sm" onClick={() => handleRemoveFile(doc.id)}>
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                    <Button variant="outline" size="sm" onClick={() => fileInputRefs.current[doc.id]?.click()}>
                      {doc.file ? "재업로드" : "업로드"}
                    </Button>
                    <Input
                      ref={(el) => {
                        if (el) fileInputRefs.current[doc.id] = el
                      }}
                      type="file"
                      className="hidden"
                      accept=".pdf,.doc,.docx,.xlsx,.xls"
                      onChange={(e) => handleFileUpload(doc.id, e)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Self-Assessment */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              자체 평가 (Self-Assessment)
            </CardTitle>
            <CardDescription>
              귀사의 현황을 질문에 답변하여 평가해주세요. 투명성을 높이는 신뢰 장치입니다.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {assessments.map((assessment, index) => (
                <div key={assessment.id} className="space-y-3 pb-6 border-b last:border-b-0">
                  <Label className="text-base font-medium">
                    {index + 1}. {assessment.question}
                  </Label>
                  <RadioGroup
                    value={assessment.answer === null ? undefined : assessment.answer ? "yes" : "no"}
                    onValueChange={(value) => handleAssessmentChange(assessment.id, value === "yes")}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id={`${assessment.id}-yes`} />
                      <Label htmlFor={`${assessment.id}-yes`} className="font-normal cursor-pointer">
                        Yes
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id={`${assessment.id}-no`} />
                      <Label htmlFor={`${assessment.id}-no`} className="font-normal cursor-pointer">
                        No
                      </Label>
                    </div>
                  </RadioGroup>
                  {(assessment.isNarrative ||
                    assessment.id === "financial_changes" ||
                    assessment.id === "debt_risk" ||
                    assessment.id === "non_recurring") && (
                    <Textarea
                      placeholder={
                        assessment.id === "financial_changes"
                          ? "주요 재무 변동의 원인을 상세히 설명해주세요"
                          : assessment.id === "debt_risk"
                            ? "리스크가 있다면 그 내용을 설명해주세요"
                            : assessment.id === "non_recurring"
                              ? "비경상적 항목의 세부 내용을 설명해주세요"
                              : "상세 설명"
                      }
                      value={assessment.detail}
                      onChange={(e) =>
                        handleAssessmentChange(assessment.id, assessment.answer || false, e.target.value)
                      }
                      className="mt-2"
                      rows={3}
                    />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  플랫폼 또는 지정된 FA가 귀사의 VDD 제출 자료를 검토합니다. 검토는 평균 3~5일 소요됩니다. 보완 요청이
                  있을 수 있습니다.
                </AlertDescription>
              </Alert>
              <Button
                className="w-full"
                size="lg"
                disabled={!requiredDocsUploaded || !allAssessmentsCompleted || vddStatus === "under_review"}
                onClick={handleSubmitReview}
              >
                <CheckCircle2 className="h-5 w-5 mr-2" />
                VDD 검토 요청하기
              </Button>
              {(!requiredDocsUploaded || !allAssessmentsCompleted) && (
                <p className="text-sm text-gray-500 text-center">모든 필수 서류와 자체 평가를 완료해주세요.</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Benefits Section */}
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-900">
              <Star className="h-5 w-5" />
              VDD 인증 완료 시 혜택
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-4 bg-white rounded-lg">
                <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-gray-900">매수자 노출 우선순위 상향</h4>
                  <p className="text-sm text-gray-600 mt-1">검색 결과 상위에 노출됩니다</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-white rounded-lg">
                <Shield className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-gray-900">Verified Seller 배지 부여</h4>
                  <p className="text-sm text-gray-600 mt-1">신뢰도를 시각적으로 표시</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-white rounded-lg">
                <Users className="h-5 w-5 text-purple-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-gray-900">매수자의 실사 요청 증가</h4>
                  <p className="text-sm text-gray-600 mt-1">더 많은 관심을 받습니다</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-white rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-orange-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-gray-900">거래 성사 가능성 상승</h4>
                  <p className="text-sm text-gray-600 mt-1">신뢰도 향상으로 성사율 증가</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-white rounded-lg md:col-span-2">
                <Eye className="h-5 w-5 text-indigo-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-gray-900">매물 신뢰도 개선</h4>
                  <p className="text-sm text-gray-600 mt-1">VDD 요약본이 매수자에게 자동 공유되어 초기 관심 유도</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
