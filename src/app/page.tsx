import Link from "next/link"

export default function App() {
  const routes = [
    { name: "Home", path: "/home" },
    { name: "Play", path: "/play" },
    { name: "Create", path: "/create" },
    { name: "Edit", path: "/edit" },
    { name: "About", path: "/about" },
  ]
  return (
    <main>
      <h1 className="text-2xl mb-4">Nav</h1>
      <ul>
        {
          routes.map((route, index) => {
            return (
              <li key={index}>
                <Link href={ route.path }>{ route.name }</Link>
              </li>
            )
          })
        }
      </ul>
    </main>
  );
}
