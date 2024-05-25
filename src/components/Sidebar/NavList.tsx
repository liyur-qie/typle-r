import NavListItem from "./NavListItem"

export default function NavList(){
  const routes = [
    { name: "Home", path: "/home" },
    { name: "Play", path: "/play" },
    { name: "Create", path: "/create" },
    { name: "Edit", path: "/edit" },
    { name: "About", path: "/about" },
  ]

  const navListItems = routes.map((route: any, index: number) => {
    return (
      <NavListItem key={ index } path={ route.path }>{ route.name }</NavListItem>
    )
  })
  
  return (
    <ul>
      { navListItems }
    </ul>
  )
}