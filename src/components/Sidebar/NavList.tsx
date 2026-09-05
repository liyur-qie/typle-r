"use client"
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
  return <nav aria-label="メインナビゲーション"><ul className="grid grid-cols-3 lg:block">
    {routes.map(route => <li key={route.path}>
      <Link href={route.path} aria-current={pathname === route.path ? 'page' : undefined}
        className={`block border-b-2 px-4 py-4 text-sm transition-colors hover:bg-pink-50 hover:text-pink-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-pink-700 lg:px-6 lg:py-5 ${pathname === route.path ? 'border-pink-600 bg-pink-50 text-pink-700' : 'border-transparent'}`}>
        {route.name}
      </Link>
    </li>)}
  </ul></nav>
}
