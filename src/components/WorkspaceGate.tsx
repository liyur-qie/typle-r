"use client"
import { signIn, useSession } from 'next-auth/react'
import { Fragment } from 'react'
import Button from '@mui/material/Button'
import Page from './Page/Page'
import PageContainer from './PageContainer/PageContainer'

export default function WorkspaceGate({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  if (status === 'authenticated') return <Fragment key={session?.user?.id}>{children}</Fragment>
  return <Page><PageContainer>{status === 'loading' ? <p>ログイン状態を確認中…</p> : <>
    <h1 className="text-2xl mb-4">ログインして練習を始める</h1>
    <p className="mb-6">単語リストと練習記録をアカウントに保存し、同じGitHubアカウントで別の端末からも利用できます。</p>
    <Button variant="contained" onClick={() => signIn('github')}>GitHubでログインして続ける</Button>
  </>}</PageContainer></Page>
}
