import Link from "next/link"
import "./NavListItem.scss"

type PropType = {
  name?: string,
  path: string
  children: React.ReactNode
}

export default function navListItems({ name, path, children }: PropType){
  return (
    <li>
      <Link href={ path } className="block text-sm py-4 pl-12">{ name || children }</Link>
    </li>
  )
}