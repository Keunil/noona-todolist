"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, FileText, Building2, Star, CheckCircle2, Clock, DollarSign, Eye } from "lucide-react"
import Link from "next/link"

type RFPStatus = "pending" | "received" | "selected"

type Proposal = {
  id: string
  advisorName: string
  advisorRating: number
  submittedDate: string
  proposedCost: string
  proposedTimeline: string
  summary: string
}

type RFP = {
  id: string
  title: string
  services: string[]
  createdDate: string
  deadline: string
  status: RFPStatus
  proposalsCount: number
  proposals?: Proposal[]
  selectedAdvisor?: string
}

const MOCK_RFPS: RFP[] = [
  {
    id: "rfp-1",
    title: "매도 프로세스 전반 관리 용역",
    services: ["VDD", "Information Memorandum", "Buyer Outreach", "Process Management"],
    createdDate: "2024-01-12",
    deadline: "2024-01-30",
    status: "received",
    proposalsCount: 2,
    proposals: [
      {
        id: "prop-1",
        advisorName: "딜메이커 컨설팅",
        advisorRating: 4.9,
        submittedDate: "2024-01-16",
        proposedCost: "1억원 - 1.2억원",
        proposedTimeline: "3개월",
        summary: "End-to-end 매도 프로세스 전문. IM 작성부터 잠재 매수자 발굴까지 원스톱 서비스 제공",
      },
      {
        id: "prop-2",
        advisorName: "밸류업 어드바이저리",
        advisorRating: 4.6,
        submittedDate: "2024-01-17",
        proposedCost: "8,000만원 - 1억원",
        proposedTimeline: "3.5개월",
        summary: "체계적인 VDD 수행 경험. 정확한 기업가치 산정과 매수자 발굴 네트워크 보유",
      },
    ],
  },
  {
    id: "rfp-2",
    title: "기업가치 평가 및 매도 전략 수립",
    services: ["Valuation", "Deal Structuring"],
    createdDate: "2024-01-08",
    deadline: "2024-01-25",
    status: "pending",
    proposalsCount: 0,
  },
]

export default function SellerRFPManagePage() {
  const [selectedTab, setSelectedTab] = useState<"all" | RFPStatus>("all")
  const [selectedRFP, setSelectedRFP] = useState<RFP | null>(null)
  const [showProposals, setShowProposals] = useState(false)

  const filteredRFPs = selectedTab === "all" ? MOCK_RFPS : MOCK_RFPS.filter((rfp) => rfp.status === selectedTab)

  const getStatusBadge = (status: RFPStatus) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary">제안서 대기중</Badge>
      case "received":
        return <Badge className="bg-blue-600">제안서 수신</Badge>
      case "selected":
        return <Badge className="bg-green-600">자문사 선정 완료</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">RFP 관리</h1>
        <p className="text-gray-500 mt-1">발송한 RFP와 받은 제안서를 관리하세요</p>
      </div>

      <Tabs value={selectedTab} onValueChange={(v) => setSelectedTab(v as typeof selectedTab)}>
        <TabsList>
          <TabsTrigger value="all">전체 ({MOCK_RFPS.length})</TabsTrigger>
          <TabsTrigger value="pending">대기중 ({MOCK_RFPS.filter((r) => r.status === "pending").length})</TabsTrigger>
          <TabsTrigger value="received">
            제안서 수신 ({MOCK_RFPS.filter((r) => r.status === "received").length})
          </TabsTrigger>
          <TabsTrigger value="selected">
            선정 완료 ({MOCK_RFPS.filter((r) => r.status === "selected").length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={selectedTab} className="space-y-4">
          {filteredRFPs.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <FileText className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">해당하는 RFP가 없습니다</p>
                <Link href="/seller/rfp">
                  <Button className="mt-4 bg-[#F4511E] hover:bg-[#D73C11]">새 RFP 요청하기</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredRFPs.map((rfp) => (
                <Card key={rfp.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{rfp.title}</CardTitle>
                        <CardDescription className="mt-2 flex flex-wrap gap-2">
                          {rfp.services.map((service) => (
                            <Badge key={service} variant="outline" className="text-xs">
                              {service}
                            </Badge>
                          ))}
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        {getStatusBadge(rfp.status)}
                        {rfp.status === "received" && (
                          <div className="mt-2">
                            <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                              {rfp.proposalsCount}개 제안서
                            </Badge>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>발송: {rfp.createdDate}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>마감: {rfp.deadline}</span>
                        </div>
                      </div>
                      {rfp.status === "received" && (
                        <Button
                          size="sm"
                          className="bg-[#F4511E] hover:bg-[#D73C11]"
                          onClick={() => {
                            setSelectedRFP(rfp)
                            setShowProposals(true)
                          }}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          제안서 평가
                        </Button>
                      )}
                      {rfp.status === "selected" && (
                        <div className="flex items-center text-green-700">
                          <CheckCircle2 className="h-4 w-4 mr-1" />
                          <span className="font-medium">{rfp.selectedAdvisor}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Proposals Modal */}
      {showProposals && selectedRFP && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-4xl w-full max-h-[90vh] overflow-auto">
            <CardHeader>
              <CardTitle>제안서 평가 - {selectedRFP.title}</CardTitle>
              <CardDescription>{selectedRFP.proposalsCount}개의 제안서가 도착했습니다</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedRFP.proposals?.map((proposal) => (
                <Card key={proposal.id} className="border-2">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Building2 className="h-5 w-5 text-gray-600" />
                          <CardTitle className="text-lg">{proposal.advisorName}</CardTitle>
                        </div>
                        <div className="flex items-center text-yellow-600 mt-1">
                          <Star className="h-4 w-4 fill-yellow-600 mr-1" />
                          <span className="font-semibold">{proposal.advisorRating}</span>
                        </div>
                      </div>
                      <div className="text-right text-sm text-gray-500">제출일: {proposal.submittedDate}</div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-700">{proposal.summary}</p>
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                      <div className="flex items-start">
                        <DollarSign className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500">제안 비용</p>
                          <p className="font-semibold text-green-900">{proposal.proposedCost}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Clock className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500">제안 일정</p>
                          <p className="font-semibold text-blue-900">{proposal.proposedTimeline}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button className="flex-1 bg-[#F4511E] hover:bg-[#D73C11]">이 자문사 선택</Button>
                      <Button variant="outline" className="flex-1 bg-transparent">
                        상세 보기
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <div className="flex justify-end pt-4">
                <Button variant="outline" onClick={() => setShowProposals(false)}>
                  닫기
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
