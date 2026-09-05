import AppLogo from "@/components/Sidebar/AppLogo"
import NavList from "@/components/Sidebar/NavList"

export default function Sidebar(){
  return (
    <div id="sidebar" className="w-full bg-white lg:min-h-screen lg:w-64 lg:shrink-0">
      <AppLogo />
      <h3 className="text-sm font-bold ml-6 mt-6 mb-4 lg:mt-12 lg:mb-8">ナビ</h3>
      <NavList />
    </div>
  )
}