import Navbar from "@/components/Navbar/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";

export default function Home() {
  return (
    <div className="flex flex-wrap">
      <Sidebar />
      <div className="flex-auto">
        <Navbar />
        <main>
          <p>Content</p>
        </main>
      </div>
    </div>
  );
}
