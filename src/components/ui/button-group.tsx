import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

export function ButtonGroup({ className, ...props }: ComponentProps<'div'>) {
  return <div role="group" className={cn(
    'inline-flex [&>button]:relative [&>button]:rounded-none [&>button:first-child]:rounded-l-lg [&>button:last-child]:rounded-r-lg [&>button+button]:-ml-px [&>button:focus-visible]:z-10',
    className,
  )} {...props} />
}
