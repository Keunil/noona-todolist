"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function QuickAccessButtons() {
  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-4">
      <Link
        href="/buyer"
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center"
      >
        <span>매수자 페이지</span>
        <ArrowRight className="ml-2 h-4 w-4" />
      </Link>
      <Link
        href="/seller"
        className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center"
      >
        <span>매도자 페이지</span>
        <ArrowRight className="ml-2 h-4 w-4" />
      </Link>
      <Link
        href="/expert"
        className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center"
      >
        <span>전문가 페이지</span>
        <ArrowRight className="ml-2 h-4 w-4" />
      </Link>
    </div>
  )
}
