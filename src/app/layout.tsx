import type { Metadata } from "next";
import "@/scss/globals.scss";
import Sidebar from "@/components/Sidebar/Sidebar";
import Navbar from "@/components/Navbar/Navbar";
import PageContainer from "@/components/PageContainer/PageContainer";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


export const metadata: Metadata = {
  title: "typle-r",
  description: "Typle enables you to improve your typing skills",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body>
      <div className="flex flex-wrap">
      <Sidebar />
      <div className="flex-auto">
        <Navbar />
        { children }
      </div>
    </div>
      </body>
    </html>
  );
}
