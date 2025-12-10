"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Briefcase,
  Calendar,
  Clock,
  FileText,
  User,
  CheckCircle2,
  AlertCircle,
  Upload,
  MessageSquare,
} from "lucide-react"

type ProjectStatus = "in-progress" | "completed" | "on-hold"

type Project = {
  id: string
  title: string
  client: string
  clientType: "buyer" | "seller"
  services: string[]
  startDate: string
  deadline: string
  status: ProjectStatus
  progress: number
  amount: string
  description: string
  milestones: {
    name: string
    completed: boolean
    dueDate: string
  }[]
}

const MOCK_PROJECTS: Project[] = [
  {
    id: "proj-1",
    title: "IT 서비스 기업 실사 프로젝트",
    client: "김민준",
    clientType: "buyer",
    services: ["Financial Due Diligence", "Commercial Due Diligence"],
    startDate: "2024-01-10",
    deadline: "2024-03-10",
    status: "in-progress",
    progress: 65,
    amount: "7,000만원",
    description: "클라우드 기반 SaaS 기업에 대한 종합 실사",
    milestones: [
      { name: "킥오프 미팅 및 자료 수집", completed: true, dueDate: "2024-01-15" },
      { name: "재무 분석 및 실사", completed: true, dueDate: "2024-02-05" },
      { name: "사업 실사 및 시장 분석", completed: false, dueDate: "2024-02-25" },
      { name: "최종 보고서 작성 및 제출", completed: false, dueDate: "2024-03-08" },
    ],
  },
  {
    id: "proj-2",
    title: "제조업 기업가치평가",
    client: "이서연",
    clientType: "seller",
    services: ["Valuation", "VDD"],
    startDate: "2024-01-20",
    deadline: "2024-03-20",
    status: "in-progress",
    progress: 35,
    amount: "5,500만원",
    description: "자동차 부품 제조 기업의 기업가치평가",
    milestones: [
      { name: "초기 자료 수집 및 분석", completed: true, dueDate: "2024-01-30" },
      { name: "재무 모델링", completed: false, dueDate: "2024-02-20" },
      { name: "평가 보고서 작성", completed: false, dueDate: "2024-03-10" },
      { name: "발표 및 Q&A", completed: false, dueDate: "2024-03-18" },
    ],
  },
  {
    id: "proj-3",
    title: "에듀테크 기업 M&A 자문",
    client: "박준호",
    clientType: "buyer",
    services: ["Financial Advisory", "Deal Structuring"],
    startDate: "2025-11-01",
    deadline: "2025-01-15",
    status: "completed",
    progress: 100,
    amount: "9,000만원",
    description: "에듀테크 플랫폼 인수 관련 종합 자문",
    milestones: [
      { name: "초기 전략 수립", completed: true, dueDate: "2025-11-15" },
      { name: "거래 구조 설계", completed: true, dueDate: "2025-12-01" },
      { name: "협상 및 계약 체결", completed: true, dueDate: "2025-12-20" },
      { name: "거래 종결 지원", completed: true, dueDate: "2025-01-10" },
    ],
  },
]

export default function ExpertProjectsPage() {
  const [selectedTab, setSelectedTab] = useState<"all" | ProjectStatus>("all")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [updateData, setUpdateData] = useState({
    progress: "",
    status: "",
    note: "",
  })

  const filteredProjects =
    selectedTab === "all" ? MOCK_PROJECTS : MOCK_PROJECTS.filter((proj) => proj.status === selectedTab)

  const getStatusBadge = (status: ProjectStatus) => {
    switch (status) {
      case "in-progress":
        return <Badge className="bg-blue-600">진행중</Badge>
      case "completed":
        return <Badge className="bg-green-600">완료</Badge>
      case "on-hold":
        return <Badge variant="secondary">보류</Badge>
    }
  }

  const handleUpdateProject = () => {
    alert("프로젝트 상태가 업데이트되었습니다!")
    setShowUpdateModal(false)
    setSelectedProject(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">프로젝트 관리</h1>
          <p className="text-gray-500 mt-1">수주한 프로젝트의 진행 상황을 관리하세요</p>
        </div>
        <div className="flex items-center gap-2">
          <Card className="p-4">
            <div className="text-center">
              <p className="text-sm text-gray-500">진행중</p>
              <p className="text-2xl font-bold text-blue-600">
                {MOCK_PROJECTS.filter((p) => p.status === "in-progress").length}
              </p>
            </div>
          </Card>
          <Card className="p-4">
            <div className="text-center">
              <p className="text-sm text-gray-500">완료</p>
              <p className="text-2xl font-bold text-green-600">
                {MOCK_PROJECTS.filter((p) => p.status === "completed").length}
              </p>
            </div>
          </Card>
        </div>
      </div>

      <Tabs value={selectedTab} onValueChange={(v) => setSelectedTab(v as typeof selectedTab)}>
        <TabsList>
          <TabsTrigger value="all">전체 ({MOCK_PROJECTS.length})</TabsTrigger>
          <TabsTrigger value="in-progress">
            진행중 ({MOCK_PROJECTS.filter((p) => p.status === "in-progress").length})
          </TabsTrigger>
          <TabsTrigger value="completed">
            완료 ({MOCK_PROJECTS.filter((p) => p.status === "completed").length})
          </TabsTrigger>
          <TabsTrigger value="on-hold">보류 ({MOCK_PROJECTS.filter((p) => p.status === "on-hold").length})</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedTab} className="space-y-4">
          {filteredProjects.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Briefcase className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">해당하는 프로젝트가 없습니다</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredProjects.map((project) => (
                <Card key={project.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <CardTitle className="text-lg">{project.title}</CardTitle>
                          <Badge variant="outline">{project.clientType === "buyer" ? "매수자" : "매도자"}</Badge>
                        </div>
                        <CardDescription className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          <span>{project.client}</span>
                        </CardDescription>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        {getStatusBadge(project.status)}
                        <Badge variant="secondary" className="bg-green-100 text-green-700">
                          {project.amount}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-700">{project.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {project.services.map((service) => (
                        <Badge key={service} variant="outline" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                    </div>

                    {project.status === "in-progress" && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">프로젝트 진행률</span>
                          <span className="font-semibold text-blue-600">{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-3 text-sm text-gray-600 pt-2 border-t">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>시작: {project.startDate}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>마감: {project.deadline}</span>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedProject(project)
                          setShowUpdateModal(false)
                        }}
                      >
                        <FileText className="h-4 w-4 mr-1" />
                        상세 보기
                      </Button>
                      {project.status === "in-progress" && (
                        <>
                          <Button
                            size="sm"
                            className="bg-[#F4511E] hover:bg-[#D73C11]"
                            onClick={() => {
                              setSelectedProject(project)
                              setShowUpdateModal(true)
                            }}
                          >
                            <Upload className="h-4 w-4 mr-1" />
                            진행 상황 업데이트
                          </Button>
                          <Button size="sm" variant="outline">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            클라이언트 연락
                          </Button>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Project Detail / Update Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-3xl w-full max-h-[90vh] overflow-auto">
            <CardHeader>
              <CardTitle>{showUpdateModal ? "프로젝트 업데이트" : "프로젝트 상세"}</CardTitle>
              <CardDescription>{selectedProject.title}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {!showUpdateModal ? (
                <>
                  {/* Project Detail View */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">프로젝트 개요</h3>
                      <p className="text-gray-700">{selectedProject.description}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                      <div>
                        <p className="text-sm text-gray-500">클라이언트</p>
                        <p className="font-medium">{selectedProject.client}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">계약 금액</p>
                        <p className="font-medium text-green-700">{selectedProject.amount}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">시작일</p>
                        <p className="font-medium">{selectedProject.startDate}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">마감일</p>
                        <p className="font-medium">{selectedProject.deadline}</p>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <h3 className="font-semibold text-gray-900 mb-3">마일스톤</h3>
                      <div className="space-y-3">
                        {selectedProject.milestones.map((milestone, idx) => (
                          <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                            {milestone.completed ? (
                              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                            ) : (
                              <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5" />
                            )}
                            <div className="flex-1">
                              <p
                                className={`font-medium ${milestone.completed ? "text-gray-500 line-through" : "text-gray-900"}`}
                              >
                                {milestone.name}
                              </p>
                              <p className="text-sm text-gray-500">기한: {milestone.dueDate}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {selectedProject.status === "in-progress" && (
                      <div className="pt-4 border-t">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-semibold text-gray-900">진행률</h3>
                          <span className="text-2xl font-bold text-blue-600">{selectedProject.progress}%</span>
                        </div>
                        <Progress value={selectedProject.progress} className="h-3" />
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 pt-4">
                    {selectedProject.status === "in-progress" && (
                      <Button
                        className="flex-1 bg-[#F4511E] hover:bg-[#D73C11]"
                        onClick={() => setShowUpdateModal(true)}
                      >
                        진행 상황 업데이트
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      className="flex-1 bg-transparent"
                      onClick={() => setSelectedProject(null)}
                    >
                      닫기
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  {/* Update Form */}
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-gray-700">
                        현재 진행률: <span className="font-semibold text-blue-600">{selectedProject.progress}%</span>
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="progress">진행률 업데이트 (%)</Label>
                      <Select
                        value={updateData.progress}
                        onValueChange={(v) => setUpdateData({ ...updateData, progress: v })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="진행률 선택" />
                        </SelectTrigger>
                        <SelectContent>
                          {[10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((val) => (
                            <SelectItem key={val} value={val.toString()}>
                              {val}%
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="status">프로젝트 상태</Label>
                      <Select
                        value={updateData.status}
                        onValueChange={(v) => setUpdateData({ ...updateData, status: v })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="상태 선택" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="in-progress">진행중</SelectItem>
                          <SelectItem value="on-hold">보류</SelectItem>
                          <SelectItem value="completed">완료</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="note">업데이트 내용</Label>
                      <Textarea
                        id="note"
                        placeholder="이번 업데이트 내용, 진행 사항, 이슈 등을 작성해주세요..."
                        rows={6}
                        value={updateData.note}
                        onChange={(e) => setUpdateData({ ...updateData, note: e.target.value })}
                      />
                    </div>

                    <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                        <div className="text-sm text-gray-700">
                          <p className="font-semibold mb-1">참고사항</p>
                          <p>업데이트 내용은 클라이언트에게 자동으로 알림이 전송됩니다.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button className="flex-1 bg-[#F4511E] hover:bg-[#D73C11]" onClick={handleUpdateProject}>
                      <Upload className="h-4 w-4 mr-2" />
                      업데이트 제출
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 bg-transparent"
                      onClick={() => setShowUpdateModal(false)}
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
