"use client"
import { signIn, signOut, useSession } from 'next-auth/react'
import Button from '@mui/material/Button'

export default function AccountBar() {
  const { data: session, status } = useSession()
  return <div className="px-6 py-3 flex flex-wrap items-center gap-3 border-b" aria-label="アカウント">
    {status === 'loading' ? <span>ログイン状態を確認中…</span> : session?.user ? <>
      <span>{session.user.name ?? 'GitHubユーザー'} としてログイン中</span>
      <Button onClick={() => signOut({ callbackUrl: '/home' })}>ログアウト</Button>
    </> : <Button variant="outlined" onClick={() => signIn('github')}>GitHubでログイン</Button>}
  </div>
}
