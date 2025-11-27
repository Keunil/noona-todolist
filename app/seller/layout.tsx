import type React from "react"
import { SellerSidebar } from "@/components/seller/sidebar"
import { SellerHeader } from "@/components/seller/header"

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <SellerSidebar />
      <div className="flex-1 h-screen overflow-y-auto">
        <div className="h-[68px]">
          <SellerHeader />
        </div>
        <main className="flex-1 h-[calc(100vh-68px)] overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
