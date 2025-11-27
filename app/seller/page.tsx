import { Building, Users, CreditCard, TrendingUp, ArrowUpRight } from "lucide-react"
import Link from "next/link"

// 샘플 통계 데이터
const stats = [
  {
    title: "등록 기업",
    value: "12",
    change: "+2",
    changeType: "increase",
    icon: Building,
    color: "bg-blue-500",
  },
  {
    title: "잠재 투자자",
    value: "48",
    change: "+5",
    changeType: "increase",
    icon: Users,
    color: "bg-green-500",
  },
  {
    title: "기업 조회수",
    value: "1,024",
    change: "+12%",
    changeType: "increase",
    icon: TrendingUp,
    color: "bg-purple-500",
  },
  {
    title: "진행 중인 거래",
    value: "3",
    change: "0",
    changeType: "neutral",
    icon: CreditCard,
    color: "bg-orange-500",
  },
]

// 샘플 최근 기업 데이터
const recentCompanies = [
  {
    id: "1",
    name: "테크솔루션 주식회사",
    price: "50억 원",
    industry: "IT/소프트웨어",
    views: 245,
    inquiries: 12,
    thumbnail: "/tech-company-office.png",
  },
  {
    id: "2",
    name: "스마트팩토리 시스템즈",
    price: "80억 원",
    industry: "제조업",
    views: 187,
    inquiries: 8,
    thumbnail: "/manufacturing-facility.png",
  },
  {
    id: "3",
    name: "바이오헬스 이노베이션",
    price: "120억 원",
    industry: "바이오/헬스케어",
    views: 92,
    inquiries: 3,
    thumbnail: "/biotech-lab.png",
  },
]

// 샘플 최근 문의 데이터
const recentInquiries = [
  {
    id: "1",
    investor: "김민준",
    company: "테크솔루션 주식회사",
    message: "해당 기업의 주요 고객사 정보와 계약 현황에 대해 알 수 있을까요?",
    date: "2023-06-18",
    status: "new",
    avatar: "/thoughtful-asian-man.png",
  },
  {
    id: "2",
    investor: "이서연",
    company: "스마트팩토리 시스템즈",
    message: "기술 특허 현황과 R&D 인력 구성에 대한 자세한 정보를 요청드립니다.",
    date: "2023-06-17",
    status: "replied",
    avatar: "/diverse-woman-portrait.png",
  },
  {
    id: "3",
    investor: "박준호",
    company: "바이오헬스 이노베이션",
    message: "최근 3년간의 상세 재무제표와 주요 연구 성과 자료를 공유해주실 수 있나요?",
    date: "2023-06-15",
    status: "replied",
    avatar: "/thoughtful-man.png",
  },
]

export default function SellerDashboardPage() {
  return (
    <div className="p-6">
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold mb-2">판매자 대시보드</h1>
        <p className="text-gray-500 mb-8">등록 기업 및 투자자 현황을 한눈에 확인하세요.</p>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-full ${stat.color}`}>
                <stat.icon className="h-5 w-5 text-white" />
              </div>
            </div>
            <div className="mt-2">
              <span
                className={`text-xs font-medium ${
                  stat.changeType === "increase"
                    ? "text-green-600"
                    : stat.changeType === "decrease"
                      ? "text-red-600"
                      : "text-gray-500"
                }`}
              >
                {stat.change}
              </span>
              <span className="text-xs text-gray-500 ml-1">지난 달 대비</span>
            </div>
          </div>
        ))}
      </div>

      {/* 최근 기업 및 문의 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 최근 등록 기업 */}
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
                <div className="h-16 w-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                  <img
                    src={company.thumbnail || "/placeholder.svg"}
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

        {/* 최근 문의 */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold">최근 문의</h2>
            <Link href="/seller/investors" className="text-sm text-gray-500 hover:text-gray-700 flex items-center">
              모두 보기
              <ArrowUpRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="divide-y divide-gray-200">
            {recentInquiries.map((inquiry) => (
              <div key={inquiry.id} className="p-4">
                <div className="flex items-center mb-2">
                  <div className="h-8 w-8 rounded-full overflow-hidden">
                    <img
                      src={inquiry.avatar || "/placeholder.svg"}
                      alt={inquiry.investor}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="ml-2 flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{inquiry.investor}</p>
                    <p className="text-xs text-gray-500 truncate">{inquiry.company}</p>
                  </div>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      inquiry.status === "new" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {inquiry.status === "new" ? "새 문의" : "답변 완료"}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-1 line-clamp-2">{inquiry.message}</p>
                <p className="text-xs text-gray-500">{inquiry.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
