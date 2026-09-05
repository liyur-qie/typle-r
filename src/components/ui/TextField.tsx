"use client"
import { useId, type InputHTMLAttributes } from 'react'
import { Input } from './input'
import { Label } from './label'

type Props = InputHTMLAttributes<HTMLInputElement> & { label: string; hideLabel?: boolean }

export default function TextField({ label, hideLabel = false, id, className = '', required, ...props }: Props) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  return <div className={hideLabel ? "w-full" : "w-full space-y-2"}>
    <Label htmlFor={inputId} className={hideLabel ? "sr-only" : "text-sm font-medium"}>{label}{required && <span aria-hidden="true" className="ml-1 text-destructive">*</span>}</Label>
    <Input id={inputId} required={required} className={`min-h-12 ${className}`} {...props} />
  </div>
}
