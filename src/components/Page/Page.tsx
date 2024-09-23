import React from "react";

export default function Page({ children, className } : { children: React.ReactNode, className?: any }){
  return (
    <main className={ "w-10/12 mx-auto mt-12 max-w-7xl bg-white" + " " + className }>
      { children }
    </main>
  )
}