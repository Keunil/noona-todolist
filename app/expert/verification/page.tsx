"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload, FileText, X, CheckCircle2, Clock, AlertCircle, Award, Briefcase } from "lucide-react"
import { cn } from "@/lib/utils"

type VerificationStatus = "none" | "pending" | "approved" | "rejected"
type DocumentType = "license" | "career" | "employment"

type UploadedDocument = {
  type: DocumentType
  name: string
  size: string
}

export default function ExpertVerificationPage() {
  const [status, setStatus] = useState<VerificationStatus>("none")
  const [uploadedFiles, setUploadedFiles] = useState<UploadedDocument[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [activeDocType, setActiveDocType] = useState<DocumentType>("license")
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    position: "",
    experience: "",
    specialties: "",
    certifications: "",
  })

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const files = Array.from(e.dataTransfer.files)
    files.forEach((file) => {
      setUploadedFiles((prev) => [
        ...prev,
        { type: activeDocType, name: file.name, size: `${(file.size / 1024 / 1024).toFixed(2)} MB` },
      ])
    })
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    files.forEach((file) => {
      setUploadedFiles((prev) => [
        ...prev,
        { type: activeDocType, name: file.name, size: `${(file.size / 1024 / 1024).toFixed(2)} MB` },
      ])
    })
  }

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = () => {
    if (uploadedFiles.length > 0) {
      setStatus("pending")
    }
  }

  const getStatusConfig = () => {
    switch (status) {
      case "none":
        return {
          icon: <AlertCircle className="h-12 w-12 text-gray-400" />,
          title: "미인증",
          description: "자문사로 등록하려면 전문 자격 인증이 필요합니다.",
          bgColor: "bg-gray-50",
          textColor: "text-gray-700",
        }
      case "pending":
        return {
          icon: <Clock className="h-12 w-12 text-blue-500 animate-pulse" />,
          title: "심사 중",
          description: "보통 3-5일 이내 심사가 완료됩니다.",
          bgColor: "bg-blue-50",
          textColor: "text-blue-700",
        }
      case "approved":
        return {
          icon: <CheckCircle2 className="h-12 w-12 text-green-500" />,
          title: "인증 완료",
          description: "이제 RFP를 수신하고 제안서를 제출할 수 있습니다.",
          bgColor: "bg-green-50",
          textColor: "text-green-700",
        }
      case "rejected":
        return {
          icon: <AlertCircle className="h-12 w-12 text-red-500" />,
          title: "자료 보완 필요",
          description: "제출하신 자료가 불충분합니다. 아래 요청사항을 확인해주세요.",
          bgColor: "bg-red-50",
          textColor: "text-red-700",
        }
    }
  }

  const statusConfig = getStatusConfig()

  const documentTypes = [
    { type: "license" as DocumentType, label: "전문자격증", icon: <Award className="h-5 w-5" /> },
    { type: "career" as DocumentType, label: "경력증명서", icon: <Briefcase className="h-5 w-5" /> },
    { type: "employment" as DocumentType, label: "재직증명서", icon: <FileText className="h-5 w-5" /> },
  ]

  const getFilesByType = (type: DocumentType) => uploadedFiles.filter((f) => f.type === type)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">자문사 인증</h1>
        <p className="text-gray-500 mt-1">전문 자격과 경력을 인증하여 신뢰도를 높이세요</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">수신한 RFP</CardTitle>
            <FileText className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{status === "approved" ? "12건" : "0건"}</div>
            <p className="text-xs text-gray-500 mt-1">
              {status === "approved" ? "이번 달 신규 5건" : "인증 후 수신 가능"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">완료한 프로젝트</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{status === "approved" ? "34건" : "0건"}</div>
            <p className="text-xs text-gray-500 mt-1">
              {status === "approved" ? "평균 평점 4.8" : "인증을 완료하세요"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Verification Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">자문사 전문 인증</CardTitle>
          <CardDescription className="text-base mt-2 space-y-1">
            <p className="font-medium text-gray-700">M&A 자문 전문가로 활동하기 위한 자격을 인증하세요.</p>
            <p className="text-gray-600">인증된 자문사는 RFP를 수신하고 프로젝트를 수주할 수 있습니다.</p>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Status Card */}
          <div className={cn("p-6 rounded-lg border-2", statusConfig.bgColor)}>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">{statusConfig.icon}</div>
              <div className="flex-1">
                <h3 className={cn("text-xl font-bold mb-2", statusConfig.textColor)}>{statusConfig.title}</h3>
                <p className="text-gray-700">{statusConfig.description}</p>
                {status === "rejected" && (
                  <div className="mt-4 p-4 bg-white rounded-md border border-red-200">
                    <p className="font-medium text-red-900 mb-2">보완 요청 사유:</p>
                    <ul className="list-disc list-inside text-sm text-red-800 space-y-1">
                      <li>자격증 사본이 선명하지 않습니다</li>
                      <li>경력증명서에 회사 인감이 누락되었습니다</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Form Section - Only show if not approved */}
          {status !== "approved" && (
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">기본 정보</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">성명 *</Label>
                    <Input
                      id="fullName"
                      placeholder="홍길동"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="companyName">소속 회사/법인 *</Label>
                    <Input
                      id="companyName"
                      placeholder="한국 M&A 자문"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="position">직책 *</Label>
                    <Input
                      id="position"
                      placeholder="대표이사, 상무이사 등"
                      value={formData.position}
                      onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="experience">경력 년수 *</Label>
                    <Input
                      id="experience"
                      placeholder="10년"
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="specialties">전문 분야</Label>
                  <Textarea
                    id="specialties"
                    placeholder="예: IT/소프트웨어 M&A, 재무실사, 기업가치평가 등"
                    rows={3}
                    value={formData.specialties}
                    onChange={(e) => setFormData({ ...formData, specialties: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="certifications">보유 자격증</Label>
                  <Textarea
                    id="certifications"
                    placeholder="예: 공인회계사, 변호사, 감정평가사, CFA 등"
                    rows={3}
                    value={formData.certifications}
                    onChange={(e) => setFormData({ ...formData, certifications: e.target.value })}
                  />
                </div>
              </div>

              {/* Document Upload Section */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">증빙 서류 업로드</h3>
                  <p className="text-sm text-gray-600 mb-4">다음 서류를 업로드해주세요 (각 항목별로 파일 선택):</p>
                </div>

                {/* Document Type Tabs */}
                <div className="flex gap-2 border-b">
                  {documentTypes.map((docType) => (
                    <button
                      key={docType.type}
                      onClick={() => setActiveDocType(docType.type)}
                      className={cn(
                        "flex items-center gap-2 px-4 py-2 border-b-2 transition-colors",
                        activeDocType === docType.type
                          ? "border-[#F4511E] text-[#F4511E]"
                          : "border-transparent text-gray-500 hover:text-gray-700",
                      )}
                    >
                      {docType.icon}
                      <span className="text-sm font-medium">{docType.label}</span>
                      {getFilesByType(docType.type).length > 0 && (
                        <Badge variant="secondary" className="ml-1">
                          {getFilesByType(docType.type).length}
                        </Badge>
                      )}
                    </button>
                  ))}
                </div>

                {/* Active Document Type Description */}
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-700">
                    {activeDocType === "license" &&
                      "공인회계사, 변호사, 세무사, 감정평가사, CFA 등 전문 자격증을 업로드하세요."}
                    {activeDocType === "career" &&
                      "M&A 관련 경력을 증명할 수 있는 경력증명서 또는 프로젝트 수행 이력서를 업로드하세요."}
                    {activeDocType === "employment" && "현재 소속 회사의 재직증명서를 업로드하세요."}
                  </p>
                </div>

                {/* Drag & Drop Zone */}
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={cn(
                    "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
                    isDragging ? "border-[#F4511E] bg-[#F4511E]/5" : "border-gray-300 bg-gray-50",
                  )}
                >
                  <Upload className="h-10 w-10 text-gray-400 mx-auto mb-3" />
                  <p className="text-base font-medium text-gray-700 mb-2">파일을 드래그하여 업로드</p>
                  <p className="text-sm text-gray-500 mb-3">또는</p>
                  <label htmlFor="file-upload">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById("file-upload")?.click()}
                    >
                      파일 선택
                    </Button>
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleFileSelect}
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                  <p className="text-xs text-gray-500 mt-3">PDF, JPG, PNG 파일 지원 (최대 10MB)</p>
                </div>

                {/* Uploaded Files by Type */}
                {getFilesByType(activeDocType).length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900">
                      {documentTypes.find((d) => d.type === activeDocType)?.label} 파일
                    </h4>
                    {uploadedFiles.map(
                      (file, index) =>
                        file.type === activeDocType && (
                          <div key={index} className="flex items-center justify-between p-3 bg-white border rounded-lg">
                            <div className="flex items-center gap-3">
                              <FileText className="h-5 w-5 text-[#F4511E]" />
                              <div>
                                <p className="text-sm font-medium text-gray-900">{file.name}</p>
                                <p className="text-xs text-gray-500">{file.size}</p>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeFile(index)}
                              className="text-gray-400 hover:text-red-500"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ),
                    )}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <Button
                onClick={handleSubmit}
                disabled={uploadedFiles.length === 0 || status === "pending"}
                className="w-full bg-[#F4511E] hover:bg-[#D84315] text-white"
                size="lg"
              >
                {status === "pending" ? "심사 중..." : "인증 요청 제출"}
              </Button>
            </div>
          )}

          {/* Approved State */}
          {status === "approved" && (
            <div className="text-center py-8">
              <Badge className="bg-green-100 text-green-800 text-base px-6 py-2">
                <CheckCircle2 className="h-5 w-5 mr-2" />
                인증 완료 자문사
              </Badge>
              <p className="text-sm text-gray-600 mt-4">
                인증이 완료되었습니다. 이제 RFP를 수신하고 활동할 수 있습니다.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Test Buttons */}
      <Card className="bg-gray-50">
        <CardHeader>
          <CardTitle className="text-sm">테스트 컨트롤 (데모용)</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => setStatus("none")}>
            미제출
          </Button>
          <Button size="sm" variant="outline" onClick={() => setStatus("pending")}>
            심사중
          </Button>
          <Button size="sm" variant="outline" onClick={() => setStatus("approved")}>
            승인됨
          </Button>
          <Button size="sm" variant="outline" onClick={() => setStatus("rejected")}>
            반려됨
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
