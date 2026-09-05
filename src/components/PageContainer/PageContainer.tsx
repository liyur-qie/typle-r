export default function PageContainer({ children } : { children: React.ReactNode}){
  return (
    <div className="p-5 sm:p-8 lg:p-16 pb-12">
      { children }
    </div>
  )
}
