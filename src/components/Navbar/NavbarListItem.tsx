import Link from "next/link"
import "./NavbarListItem.module.scss"

type PropType = {
  title?: string,
  path: string,
  children: React.ReactNode
}

export default function NavbarListItem({ title, path, children }: PropType){
  return (
    <li className="navbarListItem">
      <Link href={ path } className="block text-sm py-5 px-6">{ title || children }</Link>
    </li>
  )
}