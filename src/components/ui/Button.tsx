import type { ButtonHTMLAttributes } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'text' | 'outlined' | 'contained'
  color?: 'primary' | 'error'
}

export default function Button({ variant = 'text', color = 'primary', type = 'button', className = '', ...props }: Props) {
  const colors = color === 'error'
    ? { text: 'text-red-700 hover:bg-red-50', outlined: 'border-red-700 text-red-700 hover:bg-red-50', contained: 'bg-red-700 text-white hover:bg-red-800' }
    : { text: 'text-blue-700 hover:bg-blue-50', outlined: 'border-blue-700 text-blue-700 hover:bg-blue-50', contained: 'bg-blue-700 text-white hover:bg-blue-800' }
  return <button type={type} className={[
    'inline-flex min-h-11 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 disabled:cursor-not-allowed disabled:opacity-40 disabled:pointer-events-none',
    variant === 'outlined' ? 'border' : 'border border-transparent', colors[variant], className,
  ].join(' ')} {...props} />
}
