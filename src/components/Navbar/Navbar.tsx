import NavbarList from "./NavbarList";
import AccountBar from "@/components/AccountBar";

export default function Navbar(){
  return (
    <header className="w-full bg-background border-b" aria-label="トップバー">
      <div className="flex min-h-18 flex-wrap items-center justify-end gap-x-4 gap-y-2 px-3 py-3 sm:px-6">
        <NavbarList />
        <AccountBar />
      </div>
    </header>
  )
}
