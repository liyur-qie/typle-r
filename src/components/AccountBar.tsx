"use client"
import { signIn, signOut, useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Avatar } from 'radix-ui'

export default function AccountBar() {
  const { data: session, status } = useSession()
  return <div className="ml-auto flex min-w-0 max-w-full items-center justify-end gap-3 text-sm" aria-label="アカウント">
    {status === 'loading' ? <span>ログイン状態を確認中…</span> : session?.user ? <>
      <Avatar.Root className="relative flex size-9 shrink-0 overflow-hidden rounded-full bg-muted" title={session.user.name ?? 'GitHubユーザー'}>
        <Avatar.Image src={session.user.image ?? undefined} alt={session.user.name ?? 'GitHubユーザー'} className="size-full object-cover" />
        <Avatar.Fallback role="img" aria-label={session.user.name ?? 'GitHubユーザー'} className="flex size-full items-center justify-center bg-secondary text-sm font-semibold text-secondary-foreground">
          {Array.from(session.user.name?.trim() || 'G')[0].toUpperCase()}
        </Avatar.Fallback>
      </Avatar.Root>
      <Button size="sm" onClick={() => signOut({ callbackUrl: '/home' })}>ログアウト</Button>
    </> : <Button variant="outline" onClick={() => signIn('github')}>GitHubでログイン</Button>}
  </div>
}
