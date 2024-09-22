import Navbar from "@/components/Navbar/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";

export default function Home({ children } : { children: React.ReactNode}) {
  return (
    <div>
      { children }
    </div>
  );
}
