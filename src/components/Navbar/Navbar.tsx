import NavbarList from "./NavbarList";

export default function Navbar(){
  return (
    <div className="w-full bg-background border-b">
      <div className="flex justify-end w-4/5 mx-auto">
        <NavbarList />
      </div>
    </div>
  )
}