// M&A 자문사 서비스 정의
export type ServiceType = {
  id: string
  name: string
  category: "buyer" | "seller" | "common"
  description: string
  industries: string[]
  typical_duration: string
  typical_cost_range: string
}

export const MA_SERVICES: ServiceType[] = [
  // 매수자 전용 서비스
  {
    id: "deal-sourcing",
    name: "Deal Sourcing & Target Screening",
    category: "buyer",
    description: "매수자의 전략 목표에 맞는 인수 타깃 기업 발굴 및 스크리닝",
    industries: ["전체"],
    typical_duration: "2-3개월",
    typical_cost_range: "3,000만원 - 5,000만원",
  },
  {
    id: "fdd",
    name: "Financial Due Diligence (재무실사)",
    category: "buyer",
    description: "재무제표 검증, EBITDA 조정, 부채 및 운전자본 검토",
    industries: ["전체"],
    typical_duration: "1-2개월",
    typical_cost_range: "3,000만원 - 8,000만원",
  },
  {
    id: "cdd",
    name: "Commercial Due Diligence (사업실사)",
    category: "buyer",
    description: "산업 분석, 경쟁구도, 시장 규모 및 성장 전망 검증",
    industries: ["전체"],
    typical_duration: "1-2개월",
    typical_cost_range: "4,000만원 - 1억원",
  },
  {
    id: "ldd",
    name: "Legal Due Diligence (법률실사)",
    category: "buyer",
    description: "계약 리스크, 규제 이슈, 소송 및 법적 분쟁 리스크 검토",
    industries: ["전체"],
    typical_duration: "1-2개월",
    typical_cost_range: "2,000만원 - 6,000만원",
  },
  {
    id: "synergy-analysis",
    name: "Synergy Analysis (시너지 분석)",
    category: "buyer",
    description: "비용 절감 효과, 매출 확장 가능성, PMI 전략 수립",
    industries: ["전체"],
    typical_duration: "1개월",
    typical_cost_range: "2,000만원 - 4,000만원",
  },
  {
    id: "financing-advisory",
    name: "Financing Advisory (인수자금 조달)",
    category: "buyer",
    description: "LBO 구조화, 은행/PE/메자닌 투자자 연결",
    industries: ["전체"],
    typical_duration: "1-2개월",
    typical_cost_range: "거래금액의 1-2%",
  },
  {
    id: "pmi",
    name: "PMI (합병 후 통합)",
    category: "buyer",
    description: "조직, 시스템, 프로세스, 문화 통합 관리",
    industries: ["전체"],
    typical_duration: "3-12개월",
    typical_cost_range: "5,000만원 - 2억원",
  },

  // 매도자 전용 서비스
  {
    id: "vdd",
    name: "Vendor Due Diligence (매도자 실사)",
    category: "seller",
    description: "매도자가 먼저 실사를 수행하여 DD 보고서를 매수자에게 제공",
    industries: ["전체"],
    typical_duration: "1-2개월",
    typical_cost_range: "3,000만원 - 8,000만원",
  },
  {
    id: "im-creation",
    name: "Information Memorandum 작성",
    category: "seller",
    description: "회사 소개서, 재무현황, 시너지 포인트를 담은 공식 문서 작성",
    industries: ["전체"],
    typical_duration: "2-4주",
    typical_cost_range: "1,000만원 - 3,000만원",
  },
  {
    id: "buyer-outreach",
    name: "Buyer Outreach (잠재 매수자 발굴)",
    category: "seller",
    description: "잠재 매수자 리스트업, Teaser 배포, NDA 체결 조율",
    industries: ["전체"],
    typical_duration: "1-2개월",
    typical_cost_range: "2,000만원 - 5,000만원",
  },
  {
    id: "management-presentation",
    name: "Management Presentation",
    category: "seller",
    description: "매수자 대상 경영진 설명회 준비 및 지원",
    industries: ["전체"],
    typical_duration: "2-4주",
    typical_cost_range: "1,000만원 - 2,000만원",
  },

  // 공통 서비스
  {
    id: "valuation",
    name: "Valuation (기업가치 평가)",
    category: "common",
    description: "DCF, 시장 비교법, 거래사례 비교를 통한 적정 가격 산출",
    industries: ["전체"],
    typical_duration: "3-6주",
    typical_cost_range: "2,000만원 - 5,000만원",
  },
  {
    id: "deal-structuring",
    name: "Deal Structuring (거래 구조 설계)",
    category: "common",
    description: "SPV 설계, Earn-out 구조, 안정장치 설계",
    industries: ["전체"],
    typical_duration: "2-4주",
    typical_cost_range: "2,000만원 - 4,000만원",
  },
  {
    id: "negotiation-support",
    name: "Negotiation Support (협상 지원)",
    category: "common",
    description: "가격 협상 전략, Term Sheet/LOI 작성 및 조율",
    industries: ["전체"],
    typical_duration: "1-2개월",
    typical_cost_range: "3,000만원 - 6,000만원",
  },
  {
    id: "contract-advisory",
    name: "SPA/계약서 작성 및 자문",
    category: "common",
    description: "IOI/LOI/SPA 계약서 초안 작성 및 검토",
    industries: ["전체"],
    typical_duration: "1-2개월",
    typical_cost_range: "2,000만원 - 5,000만원",
  },
  {
    id: "process-management",
    name: "Process Management (딜 전체 관리)",
    category: "common",
    description: "타임라인 관리, 데이터룸 구축, 실사 Q&A 조율",
    industries: ["전체"],
    typical_duration: "3-6개월",
    typical_cost_range: "5,000만원 - 1억원",
  },
]

export const INDUSTRIES = [
  "IT/소프트웨어",
  "제조업",
  "바이오/헬스케어",
  "금융/핀테크",
  "유통/이커머스",
  "물류",
  "교육/에듀테크",
  "식품/외식",
  "부동산",
  "건설",
  "화학",
  "자동차",
  "에너지",
  "미디어/엔터테인먼트",
  "기타",
]

export const COMPANY_SIZES = [
  { value: "micro", label: "10억원 미만", range: [0, 10] },
  { value: "small", label: "10억원 - 50억원", range: [10, 50] },
  { value: "medium", label: "50억원 - 200억원", range: [50, 200] },
  { value: "large", label: "200억원 - 1,000억원", range: [200, 1000] },
  { value: "xlarge", label: "1,000억원 이상", range: [1000, Number.POSITIVE_INFINITY] },
]

export type AdvisorType = {
  id: string
  name: string
  specialties: string[]
  industries: string[]
  rating: number
  reviewCount: number
  completedProjects: number
  description: string
  verified: boolean
}

export const MOCK_ADVISORS: AdvisorType[] = [
  {
    id: "advisor-1",
    name: "한국 M&A 자문",
    specialties: ["valuation", "fdd", "cdd", "deal-structuring"],
    industries: ["IT/소프트웨어", "제조업", "바이오/헬스케어"],
    rating: 4.8,
    reviewCount: 45,
    completedProjects: 89,
    description: "20년 경력의 M&A 전문 자문사",
    verified: true,
  },
  {
    id: "advisor-2",
    name: "딜메이커 컨설팅",
    specialties: ["deal-sourcing", "negotiation-support", "process-management"],
    industries: ["금융/핀테크", "유통/이커머스", "IT/소프트웨어"],
    rating: 4.9,
    reviewCount: 62,
    completedProjects: 134,
    description: "핀테크 및 IT 전문 M&A 자문",
    verified: true,
  },
  {
    id: "advisor-3",
    name: "법무법인 딜파트너스",
    specialties: ["ldd", "contract-advisory", "negotiation-support"],
    industries: ["전체"],
    rating: 4.7,
    reviewCount: 38,
    completedProjects: 67,
    description: "M&A 법률 전문 로펌",
    verified: true,
  },
  {
    id: "advisor-4",
    name: "밸류업 어드바이저리",
    specialties: ["valuation", "vdd", "im-creation"],
    industries: ["제조업", "화학", "자동차", "에너지"],
    rating: 4.6,
    reviewCount: 29,
    completedProjects: 52,
    description: "제조업 특화 M&A 자문",
    verified: true,
  },
  {
    id: "advisor-5",
    name: "스타트업 M&A 파트너스",
    specialties: ["deal-sourcing", "buyer-outreach", "financing-advisory"],
    industries: ["IT/소프트웨어", "교육/에듀테크", "미디어/엔터테인먼트"],
    rating: 4.8,
    reviewCount: 51,
    completedProjects: 78,
    description: "스타트업 특화 M&A 중개",
    verified: true,
  },
  {
    id: "advisor-6",
    name: "글로벌 딜 어드바이저스",
    specialties: ["synergy-analysis", "pmi", "cdd"],
    industries: ["전체"],
    rating: 4.9,
    reviewCount: 73,
    completedProjects: 156,
    description: "PMI 및 통합 컨설팅 전문",
    verified: true,
  },
]

function calculateDuration(services: ServiceType[]) {
  const maxMonths = Math.max(
    ...services.map((s) => {
      const match = s.typical_duration.match(/(\d+)-?(\d+)?/)
      return match ? Number.parseInt(match[2] || match[1]) : 1
    }),
  )
  return `약 ${maxMonths}개월`
}

function matchAdvisors(selectedServices: ServiceType[], industry: string, companySize: string) {
  const matchedAdvisors = MOCK_ADVISORS.filter((advisor) => {
    // Match by service specialty
    const hasMatchingService = selectedServices.some((s) => advisor.specialties.includes(s.id))

    // Match by industry
    const hasMatchingIndustry = advisor.industries.includes("전체") || advisor.industries.includes(industry)

    return hasMatchingService && hasMatchingIndustry
  })
    .sort((a, b) => {
      // Sort by verification first, then by rating
      if (a.verified !== b.verified) return a.verified ? -1 : 1
      return b.rating - a.rating
    })
    .slice(0, 6)

  return matchedAdvisors
}

// 자문사 추천 알고리즘
export function recommendAdvisors(services: string[], industry: string, companySize: string) {
  const selectedServices = MA_SERVICES.filter((s) => services.includes(s.id))

  return {
    services: selectedServices,
    estimatedDuration: calculateDuration(selectedServices),
    recommendedAdvisors: matchAdvisors(selectedServices, industry, companySize),
  }
}
