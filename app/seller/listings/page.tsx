import { Eye, MessageSquare, Clock, MoreHorizontal, Plus } from "lucide-react"
import Link from "next/link"

// 샘플 기업 데이터
const companies = [
  {
    id: "1",
    name: "테크솔루션 주식회사",
    industry: "IT/소프트웨어",
    price: "50억 원",
    revenue: "20억 원",
    employees: "45명",
    location: "서울 강남",
    status: "active",
    views: 245,
    inquiries: 12,
    createdAt: "2023-05-15",
    thumbnail: "/tech-company-office.png",
  },
  {
    id: "2",
    name: "스마트팩토리 시스템즈",
    industry: "제조업",
    price: "80억 원",
    revenue: "35억 원",
    employees: "78명",
    location: "경기도 성남시",
    status: "active",
    views: 187,
    inquiries: 8,
    createdAt: "2023-06-02",
    thumbnail: "/manufacturing-facility.png",
  },
  {
    id: "3",
    name: "바이오헬스 이노베이션",
    industry: "바이오/헬스케어",
    price: "120억 원",
    revenue: "40억 원",
    employees: "32명",
    location: "대전 유성구",
    status: "pending",
    views: 92,
    inquiries: 3,
    createdAt: "2023-06-10",
    thumbnail: "/biotech-lab.png",
  },
]

export default function ListingsPage() {
  return (
    <div className="p-6 text-center">
      <div className="flex justify-between items-center mb-6 flex-col sm:flex-row">
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl font-bold">기업 관리</h1>
          <p className="text-gray-500">등록한 매각 기업을 관리하고 상태를 확인하세요.</p>
        </div>
        <Link
          href="/seller/register"
          className="flex items-center px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          <Plus className="mr-2 h-4 w-4" />새 기업 등록
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies.map((company) => (
          <div key={company.id} className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <div className="relative h-48 bg-gray-100">
              <img
                src={company.thumbnail || "/placeholder.svg"}
                alt={company.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    company.status === "active"
                      ? "bg-green-100 text-green-800"
                      : company.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {company.status === "active" ? "공개중" : company.status === "pending" ? "검토중" : "비공개"}
                </span>
              </div>
            </div>

            <div className="p-4">
              <h3 className="text-lg font-semibold mb-1 truncate">{company.name}</h3>
              <p className="text-sm text-gray-500 mb-2">
                {company.location} · {company.industry}
              </p>

              <div className="flex justify-between mb-3">
                <span className="text-sm font-medium">{company.price}</span>
                <span className="text-sm text-gray-500">매출 {company.revenue}</span>
              </div>

              <div className="flex justify-between text-sm text-gray-500 mb-4">
                <div className="flex items-center">
                  <Eye className="mr-1 h-4 w-4" />
                  <span>{company.views}</span>
                </div>
                <div className="flex items-center">
                  <MessageSquare className="mr-1 h-4 w-4" />
                  <span>{company.inquiries}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="mr-1 h-4 w-4" />
                  <span>{company.createdAt}</span>
                </div>
              </div>

              <div className="flex justify-between">
                <Link
                  href={`/seller/listings/${company.id}`}
                  className="text-sm font-medium text-gray-900 hover:text-gray-700"
                >
                  상세 보기
                </Link>
                <button className="text-gray-500 hover:text-gray-700">
                  <MoreHorizontal className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
