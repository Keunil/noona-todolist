export interface AISummary {
  companyOverview: string
  financialHighlights: string
  competitiveAdvantages: string
  growthPotential: string
  recommendationReason: string
  risks: string
}

function generateVariation(text: string): string {
  const variations = [
    { from: "강점을 보입니다", to: "우위를 확보하고 있습니다" },
    { from: "강점을 보이", to: "우위를 보이" },
    { from: "성장하고 있습니다", to: "확대되고 있습니다" },
    { from: "성장하고 있으며", to: "증가하고 있으며" },
    { from: "보유하고 있습니다", to: "갖추고 있습니다" },
    { from: "보유하고 있으며", to: "확보하고 있으며" },
    { from: "달성", to: "기록" },
    { from: "우수", to: "탁월" },
    { from: "안정적", to: "견고" },
    { from: "안정적인", to: "탄탄한" },
    { from: "높은", to: "뛰어난" },
    { from: "증가", to: "확대" },
    { from: "제공하", to: "공급하" },
    { from: "특히", to: "특별히" },
    { from: "약 ", to: "대략 " },
    { from: "현재", to: "지금" },
    { from: "지속적으로", to: "꾸준히" },
    { from: "빠른", to: "신속한" },
    { from: "확보", to: "구축" },
    { from: "주요", to: "핵심" },
    { from: "이상", to: "넘는" },
  ]

  let result = text

  // Apply 40-60% of variations randomly
  variations.forEach((variation) => {
    if (Math.random() > 0.5) {
      result = result.replace(new RegExp(variation.from, "g"), variation.to)
    }
  })

  // Vary numbers slightly (±2%)
  result = result.replace(/(\d+)%/g, (match, num) => {
    const number = Number.parseInt(num)
    const variance = Math.floor(Math.random() * 5) - 2 // -2 to +2
    const newNum = Math.max(0, number + variance)
    return `${newNum}%`
  })

  // Vary billion/million amounts slightly
  result = result.replace(/(\d+)억/g, (match, num) => {
    const number = Number.parseInt(num)
    const variance = Math.random() > 0.7 ? (Math.random() > 0.5 ? 1 : -1) : 0
    const newNum = Math.max(0, number + variance)
    return `${newNum}억`
  })

  return result
}

export const summaryTemplates: Record<string, AISummary> = {
  "1": {
    companyOverview:
      "테크솔루션 주식회사는 클라우드 기반 보안 솔루션을 제공하는 성장 중인 IT 기업입니다. 현재 국내 주요 기업들에게 보안 솔루션을 제공하고 있으며, SaaS 기반 구독 모델로 안정적인 수익을 창출하고 있습니다. 전체 매출의 약 80%가 구독형 수익으로 구성되어 높은 예측 가능성을 보입니다.",
    financialHighlights:
      "2025년 연매출 20억 원을 기록하고 있으며, 최근 3년간 연평균 성장률 35%를 달성했습니다. 구독형 수익 모델로 높은 고객 유지율(약 93%)을 보이고 있으며, 영업이익률은 약 18%로 안정적입니다. 순현금 흐름이 지속적으로 플러스를 유지하고 있어 재무 건전성이 우수합니다.",
    competitiveAdvantages:
      "자체 개발한 AI 기반 위협 탐지 시스템을 보유하고 있으며, ISO 27001 및 ISMS 인증을 완료하여 높은 신뢰성을 확보했습니다. 국내 주요 대기업 및 금융권 레퍼런스를 다수 보유하고 있으며, 실시간 위협 분석 및 대응 속도가 경쟁사 대비 약 30% 빠릅니다. 25명의 전문 인력이 기술 개발과 고객 지원을 담당하고 있습니다.",
    growthPotential:
      "글로벌 클라우드 보안 시장은 연평균 약 15% 성장이 예상되며, 국내 중소기업의 클라우드 전환 가속화로 잠재 시장이 빠르게 확대되고 있습니다. 현재 일본 및 동남아시아 진출을 준비 중이며, 재택근무 확대로 클라우드 보안 수요가 지속 증가하고 있습니다. 해외 진출 시 매출의 2~3배 성장 가능성이 있습니다.",
    recommendationReason:
      "귀사가 관심을 두고 있는 IT 보안 분야와 정확히 일치하며, 안정적인 구독형 수익 모델과 높은 성장성을 동시에 갖춘 기업입니다. VDD 실사 및 외부감사가 완료되어 실사 리스크가 최소화되어 있으며, 검증된 재무제표로 인수 후 통합 과정이 원활할 것으로 예상됩니다. 귀사가 업로드하신 사업계획서의 IT 서비스 확장 전략과 완벽히 부합합니다.",
    risks:
      "주요 리스크로는 대형 IT 기업의 시장 진입 가능성과 핵심 개발 인력 의존도가 있습니다. 다만 특화된 기술력과 높은 고객 만족도로 경쟁 우위를 유지하고 있으며, 인재 유지 프로그램이 잘 갖춰져 있습니다. 고객 다변화를 통해 집중 리스크를 관리하고 있습니다.",
  },
  "2": {
    companyOverview:
      "스마트팩토리 주식회사는 스마트 팩토리 자동화 설비를 전문으로 설계 및 제조하는 기업입니다. 국내 주요 대기업과의 안정적인 거래처를 확보하고 있으며, 42명의 숙련된 엔지니어를 보유하고 있습니다. 설계부터 제조, 설치, 유지보수까지 일괄 서비스를 제공하는 것이 강점입니다.",
    financialHighlights:
      "2025년 연매출 35억 원을 기록하고 있으며, 수주잔고가 약 50억 원 이상으로 향후 2년간 안정적인 매출이 확보되어 있습니다. 영업이익률은 약 16%이며, 매출채권 회전율이 우수합니다. 현금성 자산을 충분히 보유하고 있어 재무 안정성이 뛰어나며, 부채비율은 약 30%로 건전합니다.",
    competitiveAdvantages:
      "20년 이상의 제조 노하우를 바탕으로 특허 기술 12건을 보유하고 있으며, 대기업 협력사 인증을 다수 획득했습니다. 품질 불량률 0.5% 이하로 업계 최고 수준의 품질을 유지하고 있으며, 자체 개발한 자동화 제어 시스템이 경쟁사 대비 약 30% 높은 생산 효율을 제공합니다.",
    growthPotential:
      "스마트팩토리 보급 확대로 자동화 설비 시장이 연평균 약 18% 성장하고 있으며, 정부의 제조업 디지털 전환 지원 정책으로 중소 제조기업의 자동화 수요가 급증하고 있습니다. 베트남 생산 거점 설립을 통한 해외 시장 진출도 계획 중입니다. 2차전지 및 반도체 산업의 성장으로 관련 자동화 설비 수요가 지속 증가하고 있습니다.",
    recommendationReason:
      "귀사가 관심을 갖고 있는 제조업 분야의 핵심 기업으로, 안정적인 수주 기반과 우수한 기술력을 보유하고 있습니다. 외부감사가 완료되어 재무 투명성이 검증되었으며, 대기업 레퍼런스를 활용한 추가 성장 여력이 충분합니다. 귀사 사업계획서에 명시된 제조업 자동화 사업 확장과 시너지 효과가 클 것으로 예상됩니다.",
    risks:
      "원자재 가격 변동과 인력 수급 문제가 있으나, 장기 공급 계약과 가격 전가 구조로 리스크가 제한적입니다. 경기 변동에 따른 설비 투자 감소 가능성이 있으나, 유지보수 매출로 안정성을 확보하고 있습니다.",
  },
  "3": {
    companyOverview:
      "바이오헬스 주식회사는 혁신적인 의료기기를 개발하는 바이오헬스케어 스타트업입니다. FDA 및 식약처 인증을 완료했으며, 해외 시장 진출을 적극적으로 준비하고 있습니다. 18명의 전문 연구인력을 보유하고 있으며, 병원 및 의료기관을 대상으로 의료기기를 공급하고 있습니다.",
    financialHighlights:
      "2025년 연매출 12억 원을 기록하고 있으며, 전년 대비 약 38% 성장했습니다. 영업이익률은 약 20%로 높은 수익성을 보이며, 정부 지원 사업 수주로 안정적인 매출 기반을 확보했습니다. 의료기관과의 장기 계약으로 매출의 약 70%가 반복 수익으로 구성되어 있습니다. 현금 흐름이 안정적이며 부채비율은 약 20%로 건전합니다.",
    competitiveAdvantages:
      "FDA 및 식약처 인증 의료기기를 보유하고 있으며, 국내 주요 대형 병원과 파트너십을 구축했습니다. 의료 데이터 보안 및 개인정보 보호 시스템이 우수하여 의료법 규제를 완벽히 준수합니다. 혁신적인 기술력으로 의료진의 높은 신뢰를 받고 있습니다.",
    growthPotential:
      "디지털 헬스케어 시장이 연평균 약 25% 성장하고 있으며, 원격 진료 활성화 정책으로 관련 솔루션 수요가 급증하고 있습니다. 고령화 사회 진입으로 의료 서비스 수요가 지속 증가할 전망입니다. 해외 의료기관 진출을 통해 매출의 2배 이상 성장 가능성이 있습니다.",
    recommendationReason:
      "헬스케어 분야 진출을 고려 중인 귀사의 전략과 완벽히 부합하며, 규제 산업 특성상 진입 장벽이 높아 안정적인 사업 모델을 갖추고 있습니다. VDD 실사가 완료되어 실사 리스크가 최소화되었으며, 대형 병원 레퍼런스를 활용한 시장 확대가 가능합니다. 귀사 사업계획서의 헬스케어 포트폴리오 다각화 전략과 일치합니다.",
    risks:
      "의료 규제 변경에 따른 사업 영향이 있을 수 있으나, 다양한 제품 포트폴리오로 리스크를 분산하고 있습니다. 대형 의료기관 매출 집중도가 높으나, 중소 의료기관 시장 확대로 개선 중입니다.",
  },
  "4": {
    companyOverview:
      "에듀테크 주식회사는 K-12 대상 온라인 교육 콘텐츠 및 플랫폼을 제공하는 에듀테크 기업입니다. 월간 활성 사용자 약 5만명을 보유하고 있으며, 구독형 비즈니스 모델로 안정적인 수익을 창출하고 있습니다. 15명의 교육 콘텐츠 전문가와 개발자가 서비스를 운영하고 있습니다.",
    financialHighlights:
      "2025년 연매출 8억 원을 기록하고 있으며, 전년 대비 약 45% 성장했습니다. 구독형 수익 모델로 월간 반복 매출(MRR)이 안정적으로 증가하고 있습니다. 고객 유지율 약 92%로 매우 높으며, 평균 구독 기간이 18개월로 장기 고객 비중이 높습니다. 영업이익률은 약 15%를 기록하며 수익성도 개선되고 있습니다.",
    competitiveAdvantages:
      "학습 데이터 분석 기반의 개인화 추천 알고리즘이 차별화 포인트이며, 학생 성취도 향상률이 평균 약 30% 이상으로 검증되었습니다. 교육부 승인 교육 콘텐츠 1,000개 이상을 보유하고 있으며, 주요 교육청과 파트너십을 구축했습니다. 모바일 앱 사용자 만족도 4.7/5.0으로 높은 평가를 받고 있습니다.",
    growthPotential:
      "에듀테크 시장이 연평균 약 20% 성장하고 있으며, 비대면 교육 수요 증가로 온라인 학습 플랫폼 시장이 급성장하고 있습니다. 정부의 디지털 교육 인프라 투자 확대로 공교육 시장 진출 기회가 증가하고 있습니다. 해외 시장 진출을 통해 3년 내 매출 3배 성장 목표를 설정했습니다.",
    recommendationReason:
      "교육 콘텐츠 사업 진출을 계획 중인 귀사의 전략과 부합하며, 안정적인 구독 수익 모델과 높은 성장성을 동시에 갖춘 기업입니다. 귀사의 유통 채널을 활용한 시너지 효과가 클 것으로 예상되며, 월간 활성 사용자 5만명의 데이터를 활용한 추가 사업 기회가 있습니다. 귀사 사업계획서의 교육 사업 확장 계획과 일치합니다.",
    risks:
      "대형 에듀테크 기업과의 경쟁 심화가 우려되나, 특화된 학습 알고리즘과 높은 고객 만족도로 경쟁 우위를 유지하고 있습니다. 콘텐츠 제작 비용이 지속 발생하나, 구독 수익으로 충분히 커버 가능합니다.",
  },
}

export function getRandomSummary(dealId: string): AISummary {
  const template = summaryTemplates[dealId] || summaryTemplates["1"]

  return {
    companyOverview: generateVariation(template.companyOverview),
    financialHighlights: generateVariation(template.financialHighlights),
    competitiveAdvantages: generateVariation(template.competitiveAdvantages),
    growthPotential: generateVariation(template.growthPotential),
    recommendationReason: generateVariation(template.recommendationReason),
    risks: generateVariation(template.risks),
  }
}

export function getRandomLoadingTime(): number {
  // Return random time between 4000ms and 8000ms
  return Math.floor(Math.random() * 4000) + 4000
}
