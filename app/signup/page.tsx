import type { Metadata } from "next"
import SignUpForm from "@/components/sign-up-form"

export const metadata: Metadata = {
  title: "회원가입 | DealMate M&A Platform",
  description: "DealMate M&A Platform 계정 생성하기",
}

export default function SignUpPage() {
  return <SignUpForm />
}
