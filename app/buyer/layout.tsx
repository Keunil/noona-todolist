import type React from "react"
import BuyerSidebar from "@/components/buyer/sidebar"
import BuyerHeader from "@/components/buyer/header"

export default function BuyerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen overflow-hidden">
        <BuyerSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <BuyerHeader />
          <main className="flex-1 overflow-y-auto h-[calc(100vh-68px)] p-6">{children}</main>
        </div>
      </div>
    </div>
  )
}
