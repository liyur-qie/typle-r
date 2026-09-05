import { cn } from '@/lib/utils'

export default function PageContainer({ children, className } : { children: React.ReactNode; className?: string }){
  return (
    <div className={cn("p-5 sm:p-8 lg:p-16 pb-12", className)}>
      { children }
    </div>
  )
}
