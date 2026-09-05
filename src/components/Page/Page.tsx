import React from "react";

export default function Page({ children, className } : { children: React.ReactNode, className?: string }){
  return (
    <main className={ "w-11/12 mx-auto my-8 max-w-7xl bg-white " + (className ?? "") }>
      { children }
    </main>
  )
}
