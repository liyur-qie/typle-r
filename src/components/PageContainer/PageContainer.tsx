export default function PageContainer({ children } : { children: React.ReactNode}){
  return (
    <div className="p-16 pb-12">
      { children }
    </div>
  )
}