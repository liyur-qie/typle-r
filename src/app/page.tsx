import Sidebar from "@/components/Sidebar/Sidebar";

export default function Home() {
  return (
    <div className="flex">
      <Sidebar />
      <main>
        <p>Content</p>
      </main>
    </div>
  );
}
