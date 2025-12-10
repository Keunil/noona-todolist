"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Heart, Building, Users, DollarSign, Calendar, Sparkles, CheckCircle, FileCheck, Loader2 } from "lucide-react"
import { getRandomSummary, getRandomLoadingTime, type AISummary } from "@/lib/ai-summaries"

interface DealCardProps {
  deal: {
    id: string
    title: string
    company: string
    industry: string
    location: string
    price: string
    revenue: string
    employees: string
    description: string
    postedDate: string
    image?: string
    isFavorite?: boolean
    status?: "new" | "hot" | "closing" | "exclusive"
    verified?: boolean
    hasVDD?: boolean
    hasExternalAudit?: boolean
  }
  onFavoriteToggle?: (id: string) => void
  onViewDetails?: (id: string) => void
}

export default function DealCard({ deal, onFavoriteToggle, onViewDetails }: DealCardProps) {
  const [showAISummary, setShowAISummary] = useState(false)
  const [isLoadingSummary, setIsLoadingSummary] = useState(false)
  const [summary, setSummary] = useState<AISummary | null>(null)

  const handleAISummary = () => {
    setShowAISummary(true)
    setIsLoadingSummary(true)

    const loadingTime = getRandomLoadingTime()

    setTimeout(() => {
      const randomSummary = getRandomSummary(deal.id)
      setSummary(randomSummary)
      setIsLoadingSummary(false)
    }, loadingTime)
  }

  return (
    <>
      <Card className="h-full overflow-hidden hover:shadow-md transition-shadow">
        <CardContent className="p-0">
          <div className="relative">
            {deal.image && (
              <div className="relative h-48 w-full overflow-hidden">
                <img src={deal.image || "/placeholder.svg"} alt={deal.title} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-lg font-bold text-white mb-1">{deal.title}</h3>
                  <p className="text-xs text-white/90 flex items-center">
                    <Building className="h-3 w-3 mr-1" />
                    {deal.company}
                  </p>
                </div>
              </div>
            )}
            <div className="p-6 text-center">
              {!deal.image && (
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-xl font-bold text-gray-900">{deal.title}</h3>
                      {deal.hasVDD && (
                        <Badge className="bg-blue-100 text-blue-800 border-blue-200 flex items-center gap-1 py-0.5 px-2">
                          <CheckCircle className="h-3 w-3 flex-shrink-0" />
                          <span className="text-xs font-semibold">VDD</span>
                        </Badge>
                      )}
                      {deal.hasExternalAudit && (
                        <Badge className="bg-green-100 text-green-800 border-green-200 flex items-center gap-1 py-0.5 px-2">
                          <FileCheck className="h-3 w-3 flex-shrink-0" />
                          <span className="text-xs font-semibold">외부감사</span>
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 flex items-center">
                      <Building className="h-3 w-3 mr-1" />
                      {deal.company}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={deal.isFavorite ? "text-red-500" : "text-gray-400"}
                    onClick={() => onFavoriteToggle && onFavoriteToggle(deal.id)}
                  >
                    <Heart className="h-5 w-5" fill={deal.isFavorite ? "currentColor" : "none"} />
                  </Button>
                </div>
              )}

              {deal.image && (
                <div className="flex justify-between items-center mb-4">
                  <div className="flex gap-2">
                    {deal.hasVDD && (
                      <Badge className="bg-blue-100 text-blue-800 border-blue-200 flex items-center gap-1 py-0.5 px-2">
                        <CheckCircle className="h-3 w-3 flex-shrink-0" />
                        <span className="text-xs font-semibold">VDD</span>
                      </Badge>
                    )}
                    {deal.hasExternalAudit && (
                      <Badge className="bg-green-100 text-green-800 border-green-200 flex items-center gap-1 py-0.5 px-2">
                        <FileCheck className="h-3 w-3 flex-shrink-0" />
                        <span className="text-xs font-semibold">외부감사</span>
                      </Badge>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={deal.isFavorite ? "text-red-500" : "text-gray-400"}
                    onClick={() => onFavoriteToggle && onFavoriteToggle(deal.id)}
                  >
                    <Heart className="h-5 w-5" fill={deal.isFavorite ? "currentColor" : "none"} />
                  </Button>
                </div>
              )}

              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="outline" className="bg-gray-100 text-gray-800">
                  {deal.industry}
                </Badge>
                <Badge variant="outline" className="bg-gray-100 text-gray-800">
                  {deal.location}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                    <DollarSign className="h-4 w-4 text-gray-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">매각 가격</p>
                    <p className="font-bold text-gray-900">{deal.price}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                    <DollarSign className="h-4 w-4 text-gray-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">매출액</p>
                    <p className="font-bold text-gray-900">{deal.revenue}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                    <Users className="h-4 w-4 text-gray-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">직원 수</p>
                    <p className="font-bold text-gray-900">{deal.employees}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                    <Calendar className="h-4 w-4 text-gray-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">등록일</p>
                    <p className="font-bold text-gray-900">{deal.postedDate}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-4 bg-gray-50 border-t border-gray-100 flex justify-center">
          <Button
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            onClick={handleAISummary}
          >
            <Sparkles className="h-4 w-4 mr-2" />
            AI 기업 정보 요약
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={showAISummary} onOpenChange={setShowAISummary}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <Sparkles className="h-5 w-5 text-purple-600" />
              AI 기업 정보 요약
            </DialogTitle>
            <DialogDescription>
              {deal.title} - {deal.company}
            </DialogDescription>
          </DialogHeader>

          {isLoadingSummary ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <Loader2 className="h-12 w-12 text-purple-600 animate-spin" />
              <div className="text-center space-y-2">
                <p className="text-lg font-semibold text-gray-900">AI가 기업 정보를 분석하고 있습니다...</p>
                <p className="text-sm text-purple-600">매수자의 사업계획서를 고려하여 기업 정보를 분석합니다</p>
                <p className="text-xs text-gray-500">잠시만 기다려주세요</p>
              </div>
            </div>
          ) : summary ? (
            <div className="space-y-6 py-4">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Building className="h-5 w-5 text-blue-600" />
                  기업 개요
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">{summary.companyOverview}</p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  재무 하이라이트
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">{summary.financialHighlights}</p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-purple-600" />
                  경쟁 우위
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">{summary.competitiveAdvantages}</p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-yellow-600" />
                  성장 잠재력
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">{summary.growthPotential}</p>
              </div>

              <div className="space-y-3 bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 className="text-lg font-semibold text-blue-900 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-blue-600" />왜 이 기업이 추천되나요?
                </h3>
                <p className="text-sm text-blue-800 leading-relaxed">{summary.recommendationReason}</p>
              </div>

              <div className="space-y-3 bg-amber-50 p-4 rounded-lg border border-amber-200">
                <h3 className="text-lg font-semibold text-amber-900">주요 리스크</h3>
                <p className="text-sm text-amber-800 leading-relaxed">{summary.risks}</p>
              </div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  )
}
