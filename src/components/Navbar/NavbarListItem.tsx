import Link from "next/link"

type PropType = {
  title?: string,
  path: string,
  children: React.ReactNode
}

export default function NavbarListItem({ title, path, children }: PropType){
  return (
    <li className="navbarListItem">
      <Link href={ path } className="block rounded-sm text-sm py-5 px-6 hover:bg-pink-50 hover:text-pink-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-pink-700">{ title || children }</Link>
    </li>
  )
}