"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Building,
  LogOut,
  ChevronLeft,
  ChevronRight,
  PlusCircle,
  ShieldCheck,
  FileText,
  Inbox,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile"

export function SellerSidebar() {
  const pathname = usePathname()
  const isMobile = useMobile()
  const [collapsed, setCollapsed] = useState(false)

  const mainNavItems = [
    {
      title: "대시보드",
      href: "/seller",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: "인증",
      href: "/seller/verification",
      icon: <ShieldCheck className="h-5 w-5" />,
    },
    {
      title: "매물 등록",
      href: "/seller/register",
      icon: <PlusCircle className="h-5 w-5" />,
    },
    {
      title: "매물 관리",
      href: "/seller/listings",
      icon: <Building className="h-5 w-5" />,
    },
    {
      title: "자문사 RFP 요청",
      href: "/seller/rfp",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      title: "RFP 관리",
      href: "/seller/rfp/manage",
      icon: <Inbox className="h-5 w-5" />,
    },
  ]

  // For mobile, we'll use a different approach with a slide-in menu
  if (isMobile) {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200">
        <div className="flex justify-around py-2">
          {mainNavItems.slice(0, 4).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center p-2 rounded-md",
                pathname === item.href ? "text-[#F4511E]" : "text-gray-500",
              )}
            >
              {item.icon}
              <span className="text-xs mt-1">{item.title}</span>
            </Link>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        "bg-white border-r border-gray-200 flex flex-col transition-all duration-300 h-screen",
        collapsed ? "w-[80px]" : "w-[220px]",
      )}
    >
      <div className="p-4 border-b border-gray-200 flex items-center justify-between h-[68px]">
        <Link href="/" className={cn("flex items-center", collapsed && "justify-center")}>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-lg font-bold text-gray-900">DealMate</span>
              <span className="text-xs text-gray-500">매도자</span>
            </div>
          )}
          {collapsed && <span className="text-lg font-bold text-gray-900">DM</span>}
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-500"
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto py-4 h-[calc(100vh-136px)]">
        <nav className="space-y-1 px-2">
          {mainNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                pathname === item.href
                  ? "bg-[#F4511E]/10 text-[#F4511E]"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                collapsed && "justify-center",
              )}
            >
              {item.icon}
              {!collapsed && <span className="ml-3">{item.title}</span>}
            </Link>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-gray-200 h-[68px]">
        <Link
          href="/signin"
          className={cn(
            "flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors",
            collapsed && "justify-center",
          )}
        >
          <LogOut className="h-5 w-5" />
          {!collapsed && <span className="ml-3">로그아웃</span>}
        </Link>
      </div>
    </div>
  )
}
