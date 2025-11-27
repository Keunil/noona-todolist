"use client"

import type React from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarItem,
  SidebarToggleButton,
  SidebarGroup,
  SidebarGroupLabel,
  useSidebarState,
} from "flowbite-react"
import { HiChartPie, HiInbox, HiOutlineCloud, HiShoppingBag, HiTable, HiUser, HiViewBoards } from "react-icons/hi"

const AppSidebar: React.FC = () => {
  const [expanded, setExpanded] = useSidebarState()

  return (
    <Sidebar aria-label="Sidebar" className="h-screen">
      <SidebarContent>
        <SidebarHeader>
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Flowbite React</span>
        </SidebarHeader>
        <SidebarMenu className="text-center">
          <SidebarItem href="#" icon={HiChartPie}>
            Dashboard
          </SidebarItem>
          <SidebarItem href="#" icon={HiViewBoards}>
            Kanban
          </SidebarItem>
          <SidebarItem href="#" icon={HiInbox}>
            Inbox
          </SidebarItem>
          <SidebarItem href="#" icon={HiUser}>
            Users
          </SidebarItem>
          <SidebarItem href="#" icon={HiShoppingBag}>
            Products
          </SidebarItem>
          <SidebarItem href="#" icon={HiTable}>
            Sign Up
          </SidebarItem>
          <SidebarItem href="#" icon={HiOutlineCloud}>
            Sign In
          </SidebarItem>
          <SidebarGroup>
            <SidebarGroupLabel className="text-center">Dropdown</SidebarGroupLabel>
            <SidebarItem href="#">Products</SidebarItem>
            <SidebarItem href="#">Billing</SidebarItem>
            <SidebarItem href="#">Invoice</SidebarItem>
          </SidebarGroup>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarToggleButton onClick={() => setExpanded(!expanded)} />
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar
