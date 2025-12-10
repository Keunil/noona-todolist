"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, TrendingUp, Award, Calendar, User, MessageSquare, ThumbsUp } from "lucide-react"

type Review = {
  id: string
  projectTitle: string
  client: string
  clientType: "buyer" | "seller"
  date: string
  overallRating: number
  ratings: {
    accuracy: number
    timeline: number
    communication: number
    professionalism: number
  }
  comment: string
  helpful: number
}

const MOCK_REVIEWS: Review[] = [
  {
    id: "rev-1",
    projectTitle: "IT 서비스 기업 실사",
    client: "김민준",
    clientType: "buyer",
    date: "2024-01-15",
    overallRating: 4.9,
    ratings: {
      accuracy: 5.0,
      timeline: 4.8,
      communication: 5.0,
      professionalism: 4.8,
    },
    comment:
      "매우 전문적이고 체계적인 실사를 진행해주셨습니다. 특히 재무 분석의 깊이가 인상적이었고, 일정도 정확하게 지켜주셨습니다. 의사소통도 원활했습니다.",
    helpful: 12,
  },
  {
    id: "rev-2",
    projectTitle: "제조업 기업가치평가",
    client: "이서연",
    clientType: "seller",
    date: "2024-01-10",
    overallRating: 4.7,
    ratings: {
      accuracy: 4.8,
      timeline: 4.5,
      communication: 4.7,
      professionalism: 4.8,
    },
    comment:
      "꼼꼼한 평가와 상세한 보고서를 제공해주셨습니다. 다만 일정이 약간 지연된 부분이 아쉬웠지만, 전반적으로 만족스러운 서비스였습니다.",
    helpful: 8,
  },
  {
    id: "rev-3",
    projectTitle: "에듀테크 M&A 자문",
    client: "박준호",
    clientType: "buyer",
    date: "2023-12-20",
    overallRating: 5.0,
    ratings: {
      accuracy: 5.0,
      timeline: 5.0,
      communication: 5.0,
      professionalism: 5.0,
    },
    comment:
      "완벽한 서비스였습니다. 복잡한 거래 구조를 명확하게 설계해주셨고, 협상 과정에서도 큰 도움이 되었습니다. 강력 추천합니다!",
    helpful: 20,
  },
  {
    id: "rev-4",
    projectTitle: "바이오 기업 DD",
    client: "최수진",
    clientType: "buyer",
    date: "2023-11-25",
    overallRating: 4.6,
    ratings: {
      accuracy: 4.7,
      timeline: 4.4,
      communication: 4.6,
      professionalism: 4.7,
    },
    comment: "전문성은 확실했으나, 소통이 조금 더 자주 있었으면 좋았을 것 같습니다. 결과물 자체는 훌륭했습니다.",
    helpful: 5,
  },
]

export default function ExpertRatingsPage() {
  const [selectedTab, setSelectedTab] = useState<"overview" | "reviews">("overview")

  // Calculate statistics
  const totalReviews = MOCK_REVIEWS.length
  const averageRating = (MOCK_REVIEWS.reduce((sum, rev) => sum + rev.overallRating, 0) / totalReviews).toFixed(1)
  const avgAccuracy = MOCK_REVIEWS.reduce((sum, rev) => sum + rev.ratings.accuracy, 0) / totalReviews
  const avgTimeline = MOCK_REVIEWS.reduce((sum, rev) => sum + rev.ratings.timeline, 0) / totalReviews
  const avgCommunication = MOCK_REVIEWS.reduce((sum, rev) => sum + rev.ratings.communication, 0) / totalReviews
  const avgProfessionalism = MOCK_REVIEWS.reduce((sum, rev) => sum + rev.ratings.professionalism, 0) / totalReviews

  // Rating distribution
  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => {
    const count = MOCK_REVIEWS.filter((rev) => Math.floor(rev.overallRating) === rating).length
    return {
      stars: rating,
      count,
      percentage: (count / totalReviews) * 100,
    }
  })

  // Determine tier based on average rating
  const getTier = (rating: number) => {
    if (rating >= 4.8) return { name: "Platinum", color: "text-purple-600", bg: "bg-purple-50" }
    if (rating >= 4.5) return { name: "Gold", color: "text-yellow-600", bg: "bg-yellow-50" }
    if (rating >= 4.0) return { name: "Silver", color: "text-gray-600", bg: "bg-gray-50" }
    return { name: "Bronze", color: "text-orange-600", bg: "bg-orange-50" }
  }

  const tier = getTier(Number.parseFloat(averageRating))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">평가 및 등급</h1>
        <p className="text-gray-500 mt-1">클라이언트 평가와 자문사 등급을 확인하세요</p>
      </div>

      {/* Rating Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">자문사 등급</p>
                <p className={`text-2xl font-bold ${tier.color} mt-1`}>{tier.name}</p>
              </div>
              <div className={`p-3 rounded-full ${tier.bg}`}>
                <Award className={`h-6 w-6 ${tier.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">평균 평점</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                  <p className="text-2xl font-bold">{averageRating}</p>
                </div>
              </div>
              <div className="p-3 rounded-full bg-yellow-50">
                <Star className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">총 리뷰 수</p>
                <p className="text-2xl font-bold mt-1">{totalReviews}</p>
              </div>
              <div className="p-3 rounded-full bg-blue-50">
                <MessageSquare className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">추천률</p>
                <p className="text-2xl font-bold text-green-600 mt-1">98%</p>
              </div>
              <div className="p-3 rounded-full bg-green-50">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={(v) => setSelectedTab(v as typeof selectedTab)}>
        <TabsList>
          <TabsTrigger value="overview">평가 요약</TabsTrigger>
          <TabsTrigger value="reviews">전체 리뷰 ({totalReviews})</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Rating Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>평점 분포</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {ratingDistribution.map((dist) => (
                  <div key={dist.stars} className="flex items-center gap-3">
                    <div className="flex items-center gap-1 w-16">
                      <span className="text-sm font-medium">{dist.stars}</span>
                      <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                    </div>
                    <div className="flex-1">
                      <Progress value={dist.percentage} className="h-2" />
                    </div>
                    <span className="text-sm text-gray-600 w-12 text-right">{dist.count}개</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Detailed Ratings */}
            <Card>
              <CardHeader>
                <CardTitle>세부 평가 항목</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">업무 정확도</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                      <span className="font-semibold">{avgAccuracy.toFixed(1)}</span>
                    </div>
                  </div>
                  <Progress value={(avgAccuracy / 5) * 100} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">일정 준수율</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                      <span className="font-semibold">{avgTimeline.toFixed(1)}</span>
                    </div>
                  </div>
                  <Progress value={(avgTimeline / 5) * 100} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">의사소통</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                      <span className="font-semibold">{avgCommunication.toFixed(1)}</span>
                    </div>
                  </div>
                  <Progress value={(avgCommunication / 5) * 100} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">전문성</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                      <span className="font-semibold">{avgProfessionalism.toFixed(1)}</span>
                    </div>
                  </div>
                  <Progress value={(avgProfessionalism / 5) * 100} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tier Benefits */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className={`h-5 w-5 ${tier.color}`} />
                {tier.name} 등급 혜택
              </CardTitle>
              <CardDescription>현재 등급에 따른 플랫폼 혜택</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                    <p className="font-semibold">우선 노출</p>
                  </div>
                  <p className="text-sm text-gray-600">검색 결과 상단 노출 및 추천 우선순위</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="h-5 w-5 text-green-600" />
                    <p className="font-semibold">배지 표시</p>
                  </div>
                  <p className="text-sm text-gray-600">프로필에 {tier.name} 인증 배지 표시</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="h-5 w-5 text-purple-600" />
                    <p className="font-semibold">프리미엄 지원</p>
                  </div>
                  <p className="text-sm text-gray-600">전담 계정 매니저 및 우선 고객 지원</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reviews Tab */}
        <TabsContent value="reviews" className="space-y-4">
          {MOCK_REVIEWS.map((review) => (
            <Card key={review.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <User className="h-5 w-5 text-gray-600" />
                      {review.client}
                      <Badge variant="outline" className="text-xs">
                        {review.clientType === "buyer" ? "매수자" : "매도자"}
                      </Badge>
                    </CardTitle>
                    <CardDescription className="mt-2">{review.projectTitle}</CardDescription>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <div className="flex items-center gap-1">
                      <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                      <span className="text-xl font-bold">{review.overallRating}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      {review.date}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">{review.comment}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-3 border-t">
                  <div className="text-center">
                    <p className="text-sm text-gray-500">정확도</p>
                    <div className="flex items-center justify-center gap-1 mt-1">
                      <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                      <span className="font-semibold">{review.ratings.accuracy}</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">일정</p>
                    <div className="flex items-center justify-center gap-1 mt-1">
                      <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                      <span className="font-semibold">{review.ratings.timeline}</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">의사소통</p>
                    <div className="flex items-center justify-center gap-1 mt-1">
                      <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                      <span className="font-semibold">{review.ratings.communication}</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">전문성</p>
                    <div className="flex items-center justify-center gap-1 mt-1">
                      <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                      <span className="font-semibold">{review.ratings.professionalism}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center text-sm text-gray-500 pt-2">
                  <ThumbsUp className="h-4 w-4 mr-1" />
                  <span>{review.helpful}명이 이 리뷰가 도움이 되었다고 평가했습니다</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
