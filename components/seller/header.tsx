"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { Search, Bell, User, ChevronDown, Settings, HelpCircle, LogOut } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useMobile } from "@/hooks/use-mobile"

export function SellerHeader() {
  const pathname = usePathname()
  const isMobile = useMobile()
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  // 현재 경로에 따른 페이지 제목 설정
  const getPageTitle = () => {
    if (pathname === "/seller") return "대시보드"
    if (pathname === "/seller/register") return "매물 등록"
    if (pathname.startsWith("/seller/listings")) return "매물 관리"
    if (pathname === "/seller/investors") return "잠재투자자 관리"
    if (pathname === "/seller/settings") return "설정"
    if (pathname === "/seller/help") return "도움말"
    return "판매자 페이지"
  }

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen)
  }

  // 모바일에서는 헤더를 간소화
  if (isMobile) {
    return (
      <header className="sticky top-0 z-30 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-center">
        <h1 className="text-lg font-bold">{getPageTitle()}</h1>
      </header>
    )
  }

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200 px-6 py-3 h-[68px]">
      <div className="flex items-center justify-between">
        <div className="flex-1 flex items-center">
          <div className="relative w-[310px]">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <Input placeholder="매물 또는 투자자 검색" className="pl-10" />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="relative p-2 rounded-full hover:bg-gray-100">
            <Bell className="h-5 w-5 text-gray-500" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>

          <div className="relative">
            <button onClick={toggleProfile} className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100">
              <div className="h-8 w-8 rounded-full bg-gray-200 overflow-hidden">
                <img src="/professional-headshot.png" alt="Profile" className="h-full w-full object-cover" />
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium">김판매</p>
                <p className="text-xs text-gray-500">판매자</p>
              </div>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <User className="h-4 w-4 mr-2 text-gray-500" />
                  프로필
                </button>
                <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <Settings className="h-4 w-4 mr-2 text-gray-500" />
                  설정
                </button>
                <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <HelpCircle className="h-4 w-4 mr-2 text-gray-500" />
                  도움말
                </button>
                <div className="border-t border-gray-200 my-1"></div>
                <button className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                  <LogOut className="h-4 w-4 mr-2 text-red-500" />
                  로그아웃
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
