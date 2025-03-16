"use client"

import { useState } from "react"
import { BarChart3, Bell, Home, Menu, MessageSquare, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface SidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const [open, setOpen] = useState(false)

  const menuItems = [
    { icon: Home, label: "Overview", value: "overview" },
    { icon: BarChart3, label: "Insights", value: "insights" },
    { icon: Bell, label: "Alerts", value: "alerts", badge: 1 },
    { icon: Settings, label: "Settings", value: "settings" },
  ]

  const NavItems = () => (
    <>
      <div className="px-3 py-2">
        <div className="flex items-center px-2 mb-6">
          <h1 className="text-xl font-bold text-slate-900 ml-2">Lowng 老 安</h1>
        </div>
        <div className="space-y-1">
          {menuItems.map((item) => (
            <Button
              key={item.value}
              variant={activeTab === item.value ? "default" : "ghost"}
              className={`w-full justify-start ${activeTab === item.value ? "bg-slate-200 text-slate-900 hover:bg-slate-300" : "hover:bg-slate-100"}`}
              onClick={() => {
                setActiveTab(item.value)
                setOpen(false)
              }}
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.label}
              {item.badge && <Badge className="ml-auto bg-slate-600">{item.badge}</Badge>}
            </Button>
          ))}
        </div>
      </div>

      <div className="mt-auto px-3 py-2">
        <div className="pt-4 border-t border-slate-200">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" alt="Profile" />
                <AvatarFallback className="bg-slate-200 text-slate-900">JD</AvatarFallback>
              </Avatar>
              <div className="ml-2">
                <p className="text-sm font-medium text-slate-900">Jane Doe</p>
                <p className="text-xs text-slate-600">Caregiver</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="text-slate-900 hover:bg-slate-100">
              <MessageSquare className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </>
  )

  return (
    <>
      {/* Mobile Sidebar */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 bg-white p-0">
          <div className="flex flex-col h-full">
            <NavItems />
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-white border-r border-slate-100">
        <div className="flex flex-col flex-1 overflow-y-auto">
          <NavItems />
        </div>
      </div>

      {/* Content offset for desktop */}
      <div className="hidden md:block md:pl-64"></div>
    </>
  )
}

