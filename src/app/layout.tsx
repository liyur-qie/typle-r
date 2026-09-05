import "./globals.css";
import type { Metadata } from "next";
import Sidebar from "@/components/Sidebar/Sidebar";
import Navbar from "@/components/Navbar/Navbar";
import AuthProvider from "@/components/AuthProvider";



export const metadata: Metadata = {
  title: "typle-r",
  description: "Typle enables you to improve your typing skills",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" className="font-sans">
      <body className="bg-muted/40 font-sans text-foreground antialiased">
      <AuthProvider>
      <Navbar />
      <div className="min-h-screen lg:flex">
      <Sidebar />
      <div className="min-w-0 flex-1">
        { children }
      </div>
    </div>
      </AuthProvider>
      </body>
    </html>
  );
}
