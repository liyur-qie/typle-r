export default function PageContainer({ children } : { children: React.ReactNode}){
  return (
    <div className="max-w-7xl">
      { children }
    </div>
  )
}