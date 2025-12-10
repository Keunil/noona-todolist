"use client"

import useSWR from "swr"

export interface Listing {
  id: string
  name: string
  industry: string
  price: string
  revenue: string
  employees: string
  location: string
  status: "active" | "pending" | "inactive"
  views: number
  inquiries: number
  createdAt: string
}

let listingsData: Listing[] = [
  {
    id: "1",
    name: "테크솔루션 주식회사",
    industry: "IT/소프트웨어",
    price: "50억 원",
    revenue: "20억 원",
    employees: "45명",
    location: "서울 강남",
    status: "active",
    views: 245,
    inquiries: 12,
    createdAt: "2023-05-15",
  },
  {
    id: "2",
    name: "스마트팩토리 시스템즈",
    industry: "제조업",
    price: "80억 원",
    revenue: "35억 원",
    employees: "78명",
    location: "경기도 성남시",
    status: "active",
    views: 187,
    inquiries: 8,
    createdAt: "2023-06-02",
  },
  {
    id: "3",
    name: "바이오헬스 이노베이션",
    industry: "바이오/헬스케어",
    price: "120억 원",
    revenue: "40억 원",
    employees: "32명",
    location: "대전 유성구",
    status: "pending",
    views: 92,
    inquiries: 3,
    createdAt: "2023-06-10",
  },
]

const fetcher = () => listingsData

export function useListings() {
  const { data, mutate } = useSWR<Listing[]>("listings", fetcher, {
    fallbackData: listingsData,
  })

  const addListing = (listing: Omit<Listing, "id" | "views" | "inquiries" | "createdAt">) => {
    const newListing: Listing = {
      ...listing,
      id: Date.now().toString(),
      views: 0,
      inquiries: 0,
      createdAt: new Date().toISOString().split("T")[0],
    }
    listingsData = [newListing, ...listingsData]
    mutate(listingsData, false)
  }

  return {
    listings: data || [],
    addListing,
    mutate,
  }
}
