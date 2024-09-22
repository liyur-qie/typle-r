import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/scss/globals.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "typle-r",
  description: "Typle enables you to improve your typing skills",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
