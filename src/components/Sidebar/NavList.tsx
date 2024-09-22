import Link from "next/link"
import "@/components/Sidebar/NavList.scss"

export default function NavList(){
  const routes = [
    { name: "Home", path: "/home" },
    { name: "Play", path: "/play" },
    { name: "Create", path: "/create" },
    { name: "Edit", path: "/edit" },
  ]

  return (
    <ul id="navList">
      <li className="navbarListItem">
      <Link href="/home" className="block box-border text-sm py-5 px-6">
        ホーム
      </Link>
      </li>
      <li className="navbarListItem">
        <Link href="/play" className="block box-border text-sm py-5 px-6">
          遊ぶ
        </Link>
      </li>
      <li className="navbarListItem">
        <Link href="/records" className="block box-border text-sm py-5 px-6">
          記録
        </Link>
      </li>
      <li className="navbarListItem">
        <Link href="/create" className="block box-border text-sm py-5 px-6">
          作成
        </Link>
      </li>
      <li className="navbarListItem">
        <Link href="/edit" className="block box-border text-sm py-5 px-6">
          編集
        </Link>
      </li>
    </ul>
  )
}