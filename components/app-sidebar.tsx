"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useSidebar } from "@/components/ui/sidebar"
import {
  LineChartIcon as ChartLineUp,
  LayoutDashboard,
  BarChart3,
  TrendingUp,
  LineChart,
  PieChart,
  Settings,
  Menu,
  LogOut,
  SlidersHorizontal, // Added for Indicator Management
} from "lucide-react"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function AppSidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const { isOpen, setIsOpen } = useSidebar()
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  const routes = [
    {
      label: "仪表板",
      icon: LayoutDashboard,
      href: "/dashboard",
      active: pathname === "/dashboard",
    },
    {
      label: "指标管理",
      icon: LineChart,
      href: "/indicators",
      active: pathname === "/indicators",
    },
    {
      label: "策略管理",
      icon: TrendingUp,
      href: "/strategies",
      active: pathname === "/strategies",
    },
    {
      label: "回测管理",
      icon: BarChart3,
      href: "/backtests",
      active: pathname.includes("/backtests"),
    },
    {
      label: "数据可视化",
      icon: LineChart,
      href: "/visualization",
      active: pathname === "/visualization",
    },
    {
      label: "统计分析",
      icon: PieChart,
      href: "/statistics",
      active: pathname === "/statistics",
    },
    {
      label: "系统设置",
      icon: Settings,
      href: "/settings",
      active: pathname === "/settings",
    },
    // Removed duplicate "指标管理" entry, keeping the one specified by user with LineChart icon
  ]

  return (
    <>
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden fixed left-4 top-4 z-40">
            <Menu className="h-5 w-5" />
            <span className="sr-only">打开菜单</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          <MobileSidebar routes={routes} setIsOpen={setIsSheetOpen} />
        </SheetContent>
      </Sheet>
      <aside
        className={cn(
          "fixed hidden h-screen border-r md:flex md:flex-col md:w-64 transition-transform duration-300 ease-in-out z-30",
          isOpen ? "translate-x-0" : "-translate-x-full",
          className,
        )}
      >
        <DesktopSidebar routes={routes} isOpen={isOpen} />
      </aside>
    </>
  )
}

interface SidebarRouteProps {
  icon: React.ElementType
  label: string
  href: string
  active: boolean
}

interface MobileSidebarProps {
  routes: SidebarRouteProps[]
  setIsOpen: (open: boolean) => void
}

function MobileSidebar({ routes, setIsOpen }: MobileSidebarProps) {
  return (
    <div className="flex h-full flex-col bg-background">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold" onClick={() => setIsOpen(false)}>
          <ChartLineUp className="h-6 w-6" />
          <span>旗舰策略</span>
        </Link>
      </div>
      <ScrollArea className="flex-1">
        <div className="flex flex-col gap-1 p-2">
          {routes.map((route) => (
            <Link key={route.href} href={route.href} onClick={() => setIsOpen(false)}>
              <Button variant={route.active ? "secondary" : "ghost"} className="w-full justify-start">
                <route.icon className="mr-2 h-5 w-5" />
                {route.label}
              </Button>
            </Link>
          ))}
        </div>
      </ScrollArea>
      <div className="flex flex-col gap-1 border-t p-2">
        <Button variant="ghost" className="w-full justify-start text-red-500">
          <LogOut className="mr-2 h-5 w-5" />
          退出登录
        </Button>
      </div>
    </div>
  )
}

interface DesktopSidebarProps {
  routes: SidebarRouteProps[]
  isOpen: boolean
}

function DesktopSidebar({ routes, isOpen }: DesktopSidebarProps) {
  return (
    <div className="flex h-full flex-col bg-background">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          <ChartLineUp className="h-6 w-6" />
          {isOpen && <span>旗舰策略</span>}
        </Link>
      </div>
      <ScrollArea className="flex-1">
        <div className="flex flex-col gap-1 p-2">
          {routes.map((route) => (
            <Link key={route.href} href={route.href}>
              <Button
                variant={route.active ? "secondary" : "ghost"}
                className={cn("w-full justify-start", !isOpen && "justify-center px-0")}
              >
                <route.icon className={cn("h-5 w-5", isOpen && "mr-2")} />
                {isOpen && route.label}
              </Button>
            </Link>
          ))}
        </div>
      </ScrollArea>
      <div className="flex flex-col gap-1 border-t p-2">
        <Button variant="ghost" className={cn("w-full justify-start text-red-500", !isOpen && "justify-center px-0")}>
          <LogOut className={cn("h-5 w-5", isOpen && "mr-2")} />
          {isOpen && "退出登录"}
        </Button>
      </div>
    </div>
  )
}
