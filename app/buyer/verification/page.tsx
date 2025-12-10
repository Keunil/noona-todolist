"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Upload, FileText, X, CheckCircle2, Clock, AlertCircle, TrendingUp, FileCheck } from "lucide-react"
import { cn } from "@/lib/utils"

type VerificationStatus = "none" | "pending" | "approved" | "rejected"

export default function BuyerVerificationPage() {
  const [status, setStatus] = useState<VerificationStatus>("none")
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; size: string }[]>([])
  const [isDragging, setIsDragging] = useState(false)

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
      setUploadedFiles((prev) => [...prev, { name: file.name, size: `${(file.size / 1024 / 1024).toFixed(2)} MB` }])
    })
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    files.forEach((file) => {
      setUploadedFiles((prev) => [...prev, { name: file.name, size: `${(file.size / 1024 / 1024).toFixed(2)} MB` }])
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
          description: "인수 자금을 인증하면 더 많은 딜에 접근할 수 있습니다.",
          bgColor: "bg-gray-50",
          textColor: "text-gray-700",
        }
      case "pending":
        return {
          icon: <Clock className="h-12 w-12 text-blue-500 animate-pulse" />,
          title: "심사 중",
          description: "보통 1-3일 이내 심사 완료됩니다.",
          bgColor: "bg-blue-50",
          textColor: "text-blue-700",
        }
      case "approved":
        return {
          icon: <CheckCircle2 className="h-12 w-12 text-green-500" />,
          title: "인증 완료",
          description: "매도자에게 인증 정보가 제공됩니다.",
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

  return (
    <div className="flex-1 overflow-y-auto p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">인수자금 인증</h1>
          <p className="text-gray-600 mt-2">Proof of Funds Verification</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">인수 의향(LOI) 제출 개수</CardTitle>
              <FileCheck className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">3건</div>
              <p className="text-xs text-gray-500 mt-1">지난 달 대비 +2건</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">인증된 자금 규모</CardTitle>
              <TrendingUp className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{status === "approved" ? "50억 원" : "미인증"}</div>
              <p className="text-xs text-gray-500 mt-1">
                {status === "approved" ? "2024.12.10 인증" : "인증을 완료하세요"}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Verification Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">인수자금 인증 (Proof of Funds)</CardTitle>
            <CardDescription className="text-base mt-2 space-y-1">
              <p className="font-medium text-gray-700">
                신뢰도 높은 매수자로 등록되기 위해 인수 가능 자금을 인증하세요.
              </p>
              <p className="text-gray-600">매도자와 FA는 인증된 매수자에게 우선적으로 접근합니다.</p>
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
                        <li>잔고증명서의 발급일이 30일 이상 경과되었습니다</li>
                        <li>금융기관 인감이 선명하지 않습니다</li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Upload Section - Only show if not approved */}
            {status !== "approved" && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">자금 증빙 서류 업로드</h3>
                  <p className="text-sm text-gray-600 mb-4">다음 서류 중 하나를 업로드해주세요:</p>
                  <ul className="text-sm text-gray-700 space-y-1 mb-6">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F4511E]" />
                      잔고증명서 (Balance Certificate)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F4511E]" />
                      금융거래확인서 (Bank Statement)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F4511E]" />
                      펀드 잔액 증명
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F4511E]" />
                      LP Commitment Letter (PE 또는 VC)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F4511E]" />
                      기타 금융기관 발행 확인 서류
                    </li>
                  </ul>
                </div>

                {/* Drag & Drop Zone */}
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={cn(
                    "border-2 border-dashed rounded-lg p-12 text-center transition-colors",
                    isDragging ? "border-[#F4511E] bg-[#F4511E]/5" : "border-gray-300 bg-gray-50",
                  )}
                >
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-700 mb-2">파일을 드래그하여 업로드</p>
                  <p className="text-sm text-gray-500 mb-4">또는</p>
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
                  <p className="text-xs text-gray-500 mt-4">PDF, JPG, PNG 파일 지원 (최대 10MB)</p>
                </div>

                {/* Uploaded Files List */}
                {uploadedFiles.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900">업로드된 파일</h4>
                    {uploadedFiles.map((file, index) => (
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
                    ))}
                  </div>
                )}

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

            {/* Approved State - Show Verification Badge */}
            {status === "approved" && (
              <div className="text-center py-8">
                <Badge className="bg-green-100 text-green-800 text-base px-6 py-2">
                  <CheckCircle2 className="h-5 w-5 mr-2" />
                  인증 완료 매수자
                </Badge>
                <p className="text-sm text-gray-600 mt-4">
                  인증이 완료되었습니다. 이제 프리미엄 딜에 접근할 수 있습니다.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Test Buttons - for demonstration */}
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
    </div>
  )
}
