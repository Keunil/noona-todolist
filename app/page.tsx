import type { Metadata } from "next"
import ClientPage from "./ClientPage"
import QuickAccessButtons from "@/components/quick-access-buttons"

export const metadata: Metadata = {
  title: "DealMate M&A Platform | 국내 최고의 전문가 네트워크와 함께하는 M&A 플랫폼",
  description: "DealMate의 제휴 전문가가 검증한 매물과 투자자 네트워크를 통한 신뢰할 수 있는 M&A 플랫폼",
}

export default function Home() {
  return (
    <>
      <ClientPage />
      <QuickAccessButtons />
    </>
  )
}
