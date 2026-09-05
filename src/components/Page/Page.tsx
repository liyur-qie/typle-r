import type { ReactNode } from 'react'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export default function Page({ children, className }: { children: ReactNode; className?: string }) {
  return <main className={cn('w-11/12 mx-auto my-8 max-w-7xl', className)}>
    <Card className="py-0 text-base">{children}</Card>
  </main>
}
