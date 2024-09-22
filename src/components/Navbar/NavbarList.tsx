import NavbarListItem from "./NavbarListItem"

export default function NavbarList(){
  const routes = [
    { title: "ガイド", path: "/guide" },
    { title: "GitHub", path: "/github" },
  ]

  const navbarListItems = routes.map((route, index) => {
    return <NavbarListItem key={ index } path={ route.path }>{ route.title }</NavbarListItem>
  })

  return (
    <ul className="flex list-style-none">
      { navbarListItems }
    </ul>
  )
}
