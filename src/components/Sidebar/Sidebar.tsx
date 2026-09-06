"use client"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import AppLogo from "@/components/Sidebar/AppLogo"
import NavList from "@/components/Sidebar/NavList"

export default function Sidebar(){
  const [open, setOpen] = useState(false)
  return (
    <div id="sidebar" className="relative w-14 shrink-0 lg:w-64">
      <div className={`min-h-full border-r bg-background ${open ? 'absolute inset-y-0 left-0 z-20 w-64 shadow-lg lg:static lg:shadow-none' : 'w-full'}`}>
      <div className="hidden lg:block"><AppLogo /></div>
      <div className="flex items-center px-3 py-3 lg:hidden">
        <Button variant="outline" size="icon" aria-label={open ? 'メニューを閉じる' : 'メニューを開く'}
          aria-expanded={open} aria-controls="sidebar-navigation" onClick={() => setOpen(value => !value)}>
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </Button>
      </div>
      <div id="sidebar-navigation">
        <h3 className="hidden text-sm font-bold ml-6 mt-12 mb-8 lg:block">ナビ</h3>
        <NavList collapsed={!open} onNavigate={() => setOpen(false)} />
      </div>
      </div>
    </div>
  )
}
