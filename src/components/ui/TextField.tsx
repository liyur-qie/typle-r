"use client"
import { useId, type InputHTMLAttributes } from 'react'

type Props = InputHTMLAttributes<HTMLInputElement> & { label: string }

export default function TextField({ label, id, className = '', required, ...props }: Props) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  return <div className="w-full space-y-2">
    <label htmlFor={inputId} className="block text-sm font-medium text-slate-700">{label}{required && <span aria-hidden="true" className="ml-1 text-red-700">*</span>}</label>
    <input id={inputId} required={required} className={`block min-h-12 w-full rounded-md border border-slate-400 bg-white px-3 py-2 text-base text-slate-900 focus:border-blue-700 focus:outline-hidden focus:ring-2 focus:ring-blue-700 disabled:cursor-not-allowed disabled:bg-slate-100 ${className}`} {...props} />
  </div>
}
