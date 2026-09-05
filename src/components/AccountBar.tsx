"use client"
import { signIn, signOut, useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'

export default function AccountBar() {
  const { data: session, status } = useSession()
  return <div className="ml-auto flex min-w-0 max-w-full items-center justify-end gap-3 text-sm" aria-label="アカウント">
    {status === 'loading' ? <span>ログイン状態を確認中…</span> : session?.user ? <>
      <span className="min-w-0 break-all text-right">{session.user.name ?? 'GitHubユーザー'} としてログイン中</span>
      <Button onClick={() => signOut({ callbackUrl: '/home' })}>ログアウト</Button>
    </> : <Button variant="outline" onClick={() => signIn('github')}>GitHubでログイン</Button>}
  </div>
}
