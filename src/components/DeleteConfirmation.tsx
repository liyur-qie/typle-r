"use client"
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader,
  AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel,
  AlertDialogAction } from '@/components/ui/alert-dialog'

export default function DeleteConfirmation({ label, description, onConfirm }: {
  label: string
  description: string
  onConfirm: () => Promise<boolean>
}) {
  const [open, setOpen] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  return <AlertDialog open={open} onOpenChange={value => {
    if (!busy) { setOpen(value); setError('') }
  }}>
    <AlertDialogTrigger asChild><Button variant="destructive" aria-label={label}>削除</Button></AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>削除してもよろしいですか？</AlertDialogTitle>
        <AlertDialogDescription>{description} この操作は取り消せません。</AlertDialogDescription>
      </AlertDialogHeader>
      {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
      <AlertDialogFooter>
        <AlertDialogCancel disabled={busy}>キャンセル</AlertDialogCancel>
        <AlertDialogAction variant="destructive" disabled={busy} onClick={async event => {
          event.preventDefault()
          if (busy) return
          setBusy(true)
          setError('')
          try {
            if (await onConfirm()) setOpen(false)
            else setError('削除できませんでした。もう一度お試しください。')
          } catch { setError('削除できませんでした。もう一度お試しください。') }
          finally { setBusy(false) }
        }}>{busy ? '削除中…' : '削除する'}</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
}
