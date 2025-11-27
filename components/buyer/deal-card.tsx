"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Heart, Building, Users, DollarSign, Calendar, Eye } from "lucide-react"

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
    isFavorite?: boolean
    status?: "new" | "hot" | "closing" | "exclusive"
    matchScore?: number
  }
  onFavoriteToggle?: (id: string) => void
  onViewDetails?: (id: string) => void
}

export default function DealCard({ deal, onFavoriteToggle, onViewDetails }: DealCardProps) {
  return (
    <Card className="h-full overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <div className="relative">
          <div className="h-3 bg-gray-200"></div>
          <div className="p-6 text-center">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{deal.title}</h3>
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

            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="outline" className="bg-gray-100 text-gray-800">
                {deal.industry}
              </Badge>
              <Badge variant="outline" className="bg-gray-100 text-gray-800">
                {deal.location}
              </Badge>
              {deal.status && (
                <Badge
                  className={
                    deal.status === "new"
                      ? "bg-green-100 text-green-800 border-green-200"
                      : deal.status === "hot"
                        ? "bg-red-100 text-red-800 border-red-200"
                        : deal.status === "closing"
                          ? "bg-orange-100 text-orange-800 border-orange-200"
                          : "bg-blue-100 text-blue-800 border-blue-200"
                  }
                >
                  {deal.status === "new"
                    ? "신규 매물"
                    : deal.status === "hot"
                      ? "인기 매물"
                      : deal.status === "closing"
                        ? "마감 임박"
                        : "독점 매물"}
                </Badge>
              )}
              {deal.matchScore && <Badge className="bg-gray-700 text-white">매칭 점수 {deal.matchScore}%</Badge>}
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

            <p className="text-sm text-gray-600 line-clamp-2 mb-4">{deal.description}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 bg-gray-50 border-t border-gray-100 flex justify-center">
        <Button className="w-full" onClick={() => onViewDetails && onViewDetails(deal.id)}>
          <Eye className="h-4 w-4 mr-2" />
          상세 정보 보기
        </Button>
      </CardFooter>
    </Card>
  )
}
