import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "비밀번호 찾기 | PwC Korea M&A Platform",
  description: "PwC Korea M&A Platform 비밀번호 재설정",
}

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative h-16 bg-[#F4511E] flex items-center justify-center">
          <Link
            href="/signin"
            className="absolute left-4 text-white hover:text-white/80 transition-colors"
            aria-label="로그인 페이지로 돌아가기"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-xl font-bold text-white">비밀번호 찾기</h1>
        </div>

        <div className="p-8 text-center">
          <p className="text-gray-600 mb-6">
            비밀번호 찾기 페이지 준비 중입니다. 정식 버전에서는 비밀번호 재설정 양식이 제공될 예정입니다.
          </p>
          <Link href="/signin" className="text-[#F4511E] hover:underline font-medium">
            로그인 페이지로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  )
}
