"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Calendar, FileText, Building2, Clock, DollarSign, Send, Eye, CheckCircle2, AlertCircle } from "lucide-react"

type RFPStatus = "new" | "submitted" | "won" | "lost"

type RFP = {
  id: string
  title: string
  clientType: "buyer" | "seller"
  services: string[]
  industry: string
  companySize: string
  receivedDate: string
  deadline: string
  status: RFPStatus
  description: string
  timeline?: string
  dealSize?: string
}

const MOCK_RFPS: RFP[] = [
  {
    id: "rfp-1",
    title: "IT 기업 인수를 위한 실사 용역",
    clientType: "buyer",
    services: ["Financial Due Diligence", "Commercial Due Diligence", "Valuation"],
    industry: "IT/소프트웨어",
    companySize: "200억원 - 1,000억원",
    receivedDate: "2024-01-15",
    deadline: "2024-02-01",
    status: "new",
    description:
      "IT 서비스 기업 인수를 위한 재무 및 사업 실사가 필요합니다. 특히 SaaS 비즈니스 모델에 대한 깊은 이해가 필요하며, 고객 이탈률과 LTV 분석이 중요합니다.",
    timeline: "2개월",
    dealSize: "100억원",
  },
  {
    id: "rfp-2",
    title: "제조업 기업 매수 협상 지원",
    clientType: "buyer",
    services: ["Negotiation Support", "Deal Structuring"],
    industry: "제조업",
    companySize: "50억원 - 200억원",
    receivedDate: "2024-01-10",
    deadline: "2024-01-28",
    status: "submitted",
    description: "자동차 부품 제조업체 인수 관련 협상 지원 및 거래 구조 설계가 필요합니다.",
    timeline: "1-2개월",
    dealSize: "80억원",
  },
  {
    id: "rfp-3",
    title: "매도 프로세스 전반 관리 용역",
    clientType: "seller",
    services: ["VDD", "Information Memorandum", "Buyer Outreach"],
    industry: "바이오/헬스케어",
    companySize: "10억원 - 50억원",
    receivedDate: "2024-01-05",
    deadline: "2024-01-20",
    status: "won",
    description: "바이오텍 스타트업 매각을 위한 전체 프로세스 관리가 필요합니다.",
    timeline: "3개월",
  },
  {
    id: "rfp-4",
    title: "기업가치 평가 및 매도 전략 수립",
    clientType: "seller",
    services: ["Valuation", "Deal Structuring"],
    industry: "교육/에듀테크",
    companySize: "10억원 미만",
    receivedDate: "2023-12-20",
    deadline: "2024-01-10",
    status: "lost",
    description: "에듀테크 플랫폼 기업의 적정 가치 평가와 매도 전략이 필요합니다.",
  },
]

export default function ExpertRFPPage() {
  const [selectedTab, setSelectedTab] = useState<"all" | RFPStatus>("all")
  const [selectedRFP, setSelectedRFP] = useState<RFP | null>(null)
  const [showProposalForm, setShowProposalForm] = useState(false)
  const [proposalData, setProposalData] = useState({
    proposedCost: "",
    proposedTimeline: "",
    approach: "",
    teamIntro: "",
    pastProjects: "",
  })

  const filteredRFPs = selectedTab === "all" ? MOCK_RFPS : MOCK_RFPS.filter((rfp) => rfp.status === selectedTab)

  const getStatusBadge = (status: RFPStatus) => {
    switch (status) {
      case "new":
        return <Badge className="bg-orange-600">신규</Badge>
      case "submitted":
        return <Badge className="bg-blue-600">제출 완료</Badge>
      case "won":
        return <Badge className="bg-green-600">수주 성공</Badge>
      case "lost":
        return <Badge variant="secondary">미선정</Badge>
    }
  }

  const handleSubmitProposal = () => {
    alert("제안서가 성공적으로 제출되었습니다!")
    setShowProposalForm(false)
    setSelectedRFP(null)
    setProposalData({
      proposedCost: "",
      proposedTimeline: "",
      approach: "",
      teamIntro: "",
      pastProjects: "",
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">RFP 관리</h1>
        <p className="text-gray-500 mt-1">수신한 RFP를 확인하고 제안서를 제출하세요</p>
      </div>

      <Tabs value={selectedTab} onValueChange={(v) => setSelectedTab(v as typeof selectedTab)}>
        <TabsList>
          <TabsTrigger value="all">전체 ({MOCK_RFPS.length})</TabsTrigger>
          <TabsTrigger value="new">신규 ({MOCK_RFPS.filter((r) => r.status === "new").length})</TabsTrigger>
          <TabsTrigger value="submitted">
            제출 완료 ({MOCK_RFPS.filter((r) => r.status === "submitted").length})
          </TabsTrigger>
          <TabsTrigger value="won">수주 성공 ({MOCK_RFPS.filter((r) => r.status === "won").length})</TabsTrigger>
          <TabsTrigger value="lost">미선정 ({MOCK_RFPS.filter((r) => r.status === "lost").length})</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedTab} className="space-y-4">
          {filteredRFPs.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <FileText className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">해당하는 RFP가 없습니다</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredRFPs.map((rfp) => (
                <Card key={rfp.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <CardTitle className="text-lg">{rfp.title}</CardTitle>
                          <Badge variant="outline">{rfp.clientType === "buyer" ? "매수자" : "매도자"}</Badge>
                        </div>
                        <CardDescription className="mt-2 flex flex-wrap gap-2">
                          {rfp.services.map((service) => (
                            <Badge key={service} variant="secondary" className="text-xs">
                              {service}
                            </Badge>
                          ))}
                        </CardDescription>
                      </div>
                      <div className="text-right">{getStatusBadge(rfp.status)}</div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-3 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Building2 className="h-4 w-4 mr-2" />
                        <span>{rfp.industry}</span>
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-2" />
                        <span>{rfp.companySize}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>수신: {rfp.receivedDate}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        <span className={new Date(rfp.deadline) < new Date() ? "text-red-600 font-medium" : ""}>
                          마감: {rfp.deadline}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 line-clamp-2">{rfp.description}</p>
                    <div className="flex gap-2 pt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedRFP(rfp)
                          setShowProposalForm(false)
                        }}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        상세 보기
                      </Button>
                      {rfp.status === "new" && (
                        <Button
                          size="sm"
                          className="bg-[#F4511E] hover:bg-[#D73C11]"
                          onClick={() => {
                            setSelectedRFP(rfp)
                            setShowProposalForm(true)
                          }}
                        >
                          <Send className="h-4 w-4 mr-1" />
                          제안서 작성
                        </Button>
                      )}
                      {rfp.status === "won" && (
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          <CheckCircle2 className="h-4 w-4 mr-1" />
                          프로젝트 시작
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* RFP Detail / Proposal Form Modal */}
      {selectedRFP && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-4xl w-full max-h-[90vh] overflow-auto">
            <CardHeader>
              <CardTitle>{showProposalForm ? "제안서 작성" : "RFP 상세"}</CardTitle>
              <CardDescription>{selectedRFP.title}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {!showProposalForm ? (
                <>
                  {/* RFP Detail View */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">프로젝트 설명</h3>
                      <p className="text-gray-700 whitespace-pre-wrap">{selectedRFP.description}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                      <div>
                        <p className="text-sm text-gray-500">업종</p>
                        <p className="font-medium">{selectedRFP.industry}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">기업 규모</p>
                        <p className="font-medium">{selectedRFP.companySize}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">희망 일정</p>
                        <p className="font-medium">{selectedRFP.timeline || "-"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">거래 규모</p>
                        <p className="font-medium">{selectedRFP.dealSize || "-"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">제출 기한</p>
                        <p className="font-medium text-red-600">{selectedRFP.deadline}</p>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <h3 className="font-semibold text-gray-900 mb-3">요청 서비스</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedRFP.services.map((service) => (
                          <Badge key={service} variant="outline">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4">
                    {selectedRFP.status === "new" && (
                      <Button
                        className="flex-1 bg-[#F4511E] hover:bg-[#D73C11]"
                        onClick={() => setShowProposalForm(true)}
                      >
                        제안서 작성하기
                      </Button>
                    )}
                    <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setSelectedRFP(null)}>
                      닫기
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  {/* Proposal Form */}
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                        <p className="text-sm text-gray-700">
                          제출 기한: <span className="font-semibold text-red-600">{selectedRFP.deadline}</span>까지
                          제출해주세요.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="proposedCost">제안 비용 *</Label>
                        <Input
                          id="proposedCost"
                          placeholder="예: 6,000만원 - 8,000만원"
                          value={proposalData.proposedCost}
                          onChange={(e) => setProposalData({ ...proposalData, proposedCost: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="proposedTimeline">제안 일정 *</Label>
                        <Input
                          id="proposedTimeline"
                          placeholder="예: 2개월"
                          value={proposalData.proposedTimeline}
                          onChange={(e) => setProposalData({ ...proposalData, proposedTimeline: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="approach">수행 방법론 및 접근법 *</Label>
                      <Textarea
                        id="approach"
                        placeholder="본 프로젝트를 어떻게 수행할 것인지 구체적으로 설명해주세요..."
                        rows={6}
                        value={proposalData.approach}
                        onChange={(e) => setProposalData({ ...proposalData, approach: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="teamIntro">팀 구성 및 전문성</Label>
                      <Textarea
                        id="teamIntro"
                        placeholder="프로젝트에 투입될 팀원 구성과 각자의 전문성을 설명해주세요..."
                        rows={4}
                        value={proposalData.teamIntro}
                        onChange={(e) => setProposalData({ ...proposalData, teamIntro: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="pastProjects">유사 프로젝트 수행 경험</Label>
                      <Textarea
                        id="pastProjects"
                        placeholder="유사한 프로젝트 수행 경험과 성과를 설명해주세요..."
                        rows={4}
                        value={proposalData.pastProjects}
                        onChange={(e) => setProposalData({ ...proposalData, pastProjects: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button
                      className="flex-1 bg-[#F4511E] hover:bg-[#D73C11]"
                      onClick={handleSubmitProposal}
                      disabled={!proposalData.proposedCost || !proposalData.proposedTimeline || !proposalData.approach}
                    >
                      <Send className="h-4 w-4 mr-2" />
                      제안서 제출
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 bg-transparent"
                      onClick={() => setShowProposalForm(false)}
                    >
                      취소
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
