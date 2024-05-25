import AppLogo from "@/components/Sidebar/AppLogo"
import NavList from "@/components/Sidebar/NavList"
import "./Sidebar.scss"

export default function Sidebar(){
  return (
    <div id="sidebar" className="w-64 h-screen">
      <AppLogo />
      <h3 className="text-sm font-bold ml-6 mt-12 mb-8">ナビ</h3>
      <NavList />
    </div>
  )
}