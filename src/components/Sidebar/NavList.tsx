"use client"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"

const routes = [
  { name: "ホーム", path: "/home" },
  { name: "遊ぶ", path: "/play" },
  { name: "記録", path: "/records" },
  { name: "作成", path: "/create" },
  { name: "ベスト記録", path: "/rankings" },
  { name: "編集", path: "/edit" },
]

export default function NavList() {
  const pathname = usePathname()
  return <nav aria-label="メインナビゲーション"><ul className="grid grid-cols-3 gap-1 p-3 lg:grid-cols-1">
    {routes.map(route => <li key={route.path}>
      <Button asChild variant={pathname === route.path ? 'secondary' : 'ghost'} className="w-full lg:justify-start">
        <Link href={route.path} aria-current={pathname === route.path ? 'page' : undefined}>{route.name}</Link>
      </Button>
    </li>)}
  </ul></nav>
}
