import React from "react";

export default function Page({ children } : { children: React.ReactNode }){
  return (
    <main className="w-10/12 mx-auto mt-12 bg-white p-16 pb-12">
      { children }
    </main>
  )
}