import NavbarList from "./NavbarList";
import "./Navbar.scss"

export default function Navbar(){
  return (
    <div className="navbar w-full">
      <div className="flex justify-end w-4/5 mx-auto">
        <NavbarList />
      </div>
    </div>
  )
}