"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Star,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  ShieldCheck,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile"

export function ExpertSidebar() {
  const pathname = usePathname()
  const isMobile = useMobile()
  const [collapsed, setCollapsed] = useState(false)

  const mainNavItems = [
    {
      title: "대시보드",
      href: "/expert",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: "인증",
      href: "/expert/verification",
      icon: <ShieldCheck className="h-5 w-5" />,
    },
    {
      title: "RFP 관리",
      href: "/expert/rfp",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      title: "프로젝트 관리",
      href: "/expert/projects",
      icon: <Briefcase className="h-5 w-5" />,
    },
    {
      title: "평가 및 등급",
      href: "/expert/ratings",
      icon: <Star className="h-5 w-5" />,
    },
  ]

  // Mobile navigation
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
          <button className="flex flex-col items-center p-2 text-gray-500">
            <Menu className="h-5 w-5" />
            <span className="text-xs mt-1">더보기</span>
          </button>
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        "bg-white border-r border-gray-200 flex flex-col h-screen transition-all duration-300",
        collapsed ? "w-[80px]" : "w-[220px]",
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between h-[68px]">
        <Link href="/" className={cn("flex items-center", collapsed && "justify-center")}>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-lg font-bold text-gray-900">DealMate</span>
              <span className="text-xs text-gray-500">자문사</span>
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

      {/* Main Navigation */}
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

      {/* Footer */}
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
