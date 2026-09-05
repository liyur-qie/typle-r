import Link from "next/link"
import { Button } from "@/components/ui/button"

type PropType = {
  title?: string,
  path: string,
  children: React.ReactNode
}

export default function NavbarListItem({ title, path, children }: PropType){
  return (
    <li className="navbarListItem">
      <Button asChild variant="ghost"><Link href={path}>{title || children}</Link></Button>
    </li>
  )
}
