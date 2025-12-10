import { ArrowUpRight, FileCheck, Heart, Shield, CheckCircle } from "lucide-react"
import Link from "next/link"

const statusOverview = {
  totalListings: 5,
  public: 3,
  private: 2,
  approvalStatus: {
    pending: 1,
    approved: 3,
    needsRevision: 1,
  },
  buyerInterest: {
    interests: 24,
    views: 456,
  },
  vddStatus: {
    notVerified: 2,
    reviewing: 1,
    verified: 2,
  },
}

// 샘플 최근 기업 데이터
const recentCompanies = [
  {
    id: "1",
    name: "테크솔루션 주식회사",
    price: "50억 원",
    industry: "IT/소프트웨어",
    views: 245,
    inquiries: 12,
    image: "/tech-company-logo.jpg",
  },
  {
    id: "2",
    name: "스마트팩토리 시스템즈",
    price: "80억 원",
    industry: "제조업",
    views: 187,
    inquiries: 8,
    image: "/factory-building.jpg",
  },
  {
    id: "3",
    name: "바이오헬스 이노베이션",
    price: "120억 원",
    industry: "바이오/헬스케어",
    views: 92,
    inquiries: 3,
    image: "/biotech-lab.jpg",
  },
]

export default function SellerDashboardPage() {
  return (
    <div className="p-6">
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold mb-2">판매자 대시보드</h1>
        <p className="text-gray-500 mb-8">등록 기업 현황을 한눈에 확인하세요.</p>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">매물 상태 요약</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* 현재 등록된 매물 수 */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">등록된 매물 수</h3>
              <FileCheck className="h-5 w-5 text-blue-500" />
            </div>
            <div className="mb-2">
              <p className="text-3xl font-bold text-gray-900">{statusOverview.totalListings}</p>
            </div>
            <div className="space-y-1 text-xs text-gray-500">
              <p>공개: {statusOverview.public}개</p>
              <p>비공개: {statusOverview.private}개</p>
            </div>
          </div>

          {/* 등록 검토 상태 */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">등록 검토 상태</h3>
              <Shield className="h-5 w-5 text-purple-500" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">승인됨</span>
                <span className="font-semibold text-gray-900">{statusOverview.approvalStatus.approved}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">승인 대기</span>
                <span className="font-semibold text-yellow-600">{statusOverview.approvalStatus.pending}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">보완 요청</span>
                <span className="font-semibold text-red-600">{statusOverview.approvalStatus.needsRevision}</span>
              </div>
            </div>
          </div>

          {/* 매수자 관심도 지표 */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">매수자 관심도</h3>
              <Heart className="h-5 w-5 text-red-500" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">관심 등록</span>
                <p className="text-2xl font-bold text-gray-900">{statusOverview.buyerInterest.interests}</p>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">조회 수</span>
                <p className="text-2xl font-bold text-gray-900">{statusOverview.buyerInterest.views}</p>
              </div>
            </div>
          </div>

          {/* VDD 인증 상태 */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm md:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">VDD 인증 상태</h3>
              <CheckCircle className="h-5 w-5 text-green-500" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">미인증</span>
                <span className="font-semibold text-gray-900">{statusOverview.vddStatus.notVerified}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">검토 중</span>
                <span className="font-semibold text-blue-600">{statusOverview.vddStatus.reviewing}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">인증됨</span>
                <span className="font-semibold text-green-600">{statusOverview.vddStatus.verified}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold">최근 등록 기업</h2>
            <Link href="/seller/listings" className="text-sm text-gray-500 hover:text-gray-700 flex items-center">
              모두 보기
              <ArrowUpRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="divide-y divide-gray-200">
            {recentCompanies.map((company) => (
              <div key={company.id} className="p-4 flex items-center">
                <div className="h-16 w-16 bg-gray-200 rounded-md flex items-center justify-center flex-shrink-0 overflow-hidden">
                  <img
                    src={company.image || "/placeholder.svg"}
                    alt={company.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="ml-4 flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{company.name}</p>
                  <p className="text-sm text-gray-500">
                    {company.price} · {company.industry}
                  </p>
                  <div className="flex mt-1 text-xs text-gray-500">
                    <span>조회 {company.views}</span>
                    <span className="mx-2">·</span>
                    <span>문의 {company.inquiries}</span>
                  </div>
                </div>
                <Link
                  href={`/seller/listings/${company.id}`}
                  className="ml-4 px-3 py-1 text-xs bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200"
                >
                  상세
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
