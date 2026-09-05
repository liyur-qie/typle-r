import { test, expect } from '@playwright/test'
import { encode } from 'next-auth/jwt'
const origin = 'http://127.0.0.1:3101'
const secret = 'typle-e2e-only-not-a-production-secret-32-bytes'
let accountId = ''
test.beforeEach(async ({ context }) => {
  accountId = 'github:' + Date.now() + Math.floor(Math.random() * 10000)
  const token = await encode({ token: { sub: accountId, name: 'E2E User' }, secret, salt: 'authjs.session-token' })
  await context.addCookies([{ name: 'authjs.session-token', value: token, url: origin, httpOnly: true, sameSite: 'Lax' }])
})
test.afterEach(async () => {
  // Test users are isolated; cleanup is handled through a direct DB connection below.
  const { Pool } = await import('pg')
  const pool = new Pool({ connectionString: process.env.DATABASE_URL })
  try { await pool.query('DELETE FROM typle_workspaces WHERE owner_id = $1', [accountId]) } finally { await pool.end() }
})
async function seed(page: import('@playwright/test').Page, lists: unknown[]) {
  const response = await page.request.put('/api/workspace', { headers: { Origin: origin }, data: { accountId, revision: 0, lists } })
  expect(response.status()).toBe(200)
}


test('create, reorder, edit, play, reload and delete records', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  await page.goto('/create')
  await page.getByRole('textbox', { name: '単語リスト名', exact: true }).fill('E2E Practice')
  await page.getByRole('textbox', { name: '表示する単語 1', exact: true }).fill('First')
  await page.getByRole('textbox', { name: '入力する文字 1', exact: true }).fill('a')
  await page.getByRole('button', { name: '単語を追加', exact: true }).click()
  await page.getByRole('textbox', { name: '表示する単語 2', exact: true }).fill('Second')
  await page.getByRole('textbox', { name: '入力する文字 2', exact: true }).fill('b')
  await page.getByRole('button', { name: '単語 2 を上へ', exact: true }).click()
  await expect(page.getByRole('textbox', { name: '入力する文字 1', exact: true })).toHaveValue('b')
  await page.getByRole('button', { name: '保存', exact: true }).click()
  await expect(page).toHaveURL(/\/edit$/)
  await page.reload()
  await page.getByRole('button', { name: 'E2E Practice を編集', exact: true }).click()
  await page.getByRole('textbox', { name: '単語リスト名', exact: true }).fill('Saved Practice')
  await page.getByRole('textbox', { name: '入力する文字 1', exact: true }).fill('c')
  await page.getByRole('button', { name: '保存', exact: true }).click()
  await page.getByRole('button', { name: 'Saved Practice を編集', exact: true }).click()
  await page.getByRole('textbox', { name: '単語リスト名', exact: true }).fill('Not saved')
  await page.getByRole('button', { name: 'キャンセル', exact: true }).click()
  await expect(page.getByRole('button', { name: 'Saved Practice を編集', exact: true })).toBeVisible()
  await page.goto('/play')
  await page.getByRole('button', { name: 'Saved Practice', exact: true }).click()
  const input = page.getByRole('textbox', { name: '表示された文字を入力', exact: true })
  await input.pressSequentially('x')
  await expect(input).toHaveAttribute('aria-invalid', 'true')
  await input.press('Backspace')
  await input.pressSequentially('c')
  await expect(input).toHaveValue('')
  await expect(page.getByRole('status')).toHaveText('2 / 2 単語')
  await input.pressSequentially('a')
  await expect(page.getByLabel('練習結果')).toContainText('練習記録を保存しました。')
  await expect(page.getByLabel('練習結果')).toContainText('ミス数: 1 文字 ／ 正確率: 66.67%')
  await page.getByRole('button', { name: '最初からやり直す' }).click()
  await expect(input).toHaveValue('')
  await expect(input).toBeFocused()
  await page.goto('/records')
  await page.reload()
  await expect(page.getByRole('row').filter({ hasText: 'Saved Practice' })).toHaveCount(1)
  page.on('dialog', dialog => dialog.accept())
  await page.getByRole('button', { name: /Saved Practice.*記録を削除/ }).click()
  await expect(page.getByText('まだ記録がありません。', { exact: false })).toBeVisible()
  await page.reload()
  await expect(page.getByText('まだ記録がありません。', { exact: false })).toBeVisible()
  await page.goto('/edit')
  await page.getByRole('button', { name: 'Saved Practice を削除', exact: true }).click()
  await expect(page.getByRole('button', { name: 'Saved Practice を編集', exact: true })).toHaveCount(0)
  await page.reload()
  await expect(page.getByRole('button', { name: 'Saved Practice を編集', exact: true })).toHaveCount(0)
  expect(errors).toEqual([])
})

test('damaged storage is not overwritten', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('typle-r:word-lists:v1', '{broken'))
  await page.goto('/home')
  await page.getByRole('button', { name: 'このアカウントへ移行する' }).click()
  await expect(page.getByRole('status').filter({ hasText: '保存データを読み込めません' })).toBeVisible()
  expect(await page.evaluate(() => localStorage.getItem('typle-r:word-lists:v1'))).toBe('{broken')
})

test('supporting pages, root redirect and GitHub link', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveURL(/\/home$/)
  await expect(page.getByRole('link', { name: 'GitHub', exact: true })).toHaveAttribute('href', 'https://github.com/liyur-qie/typle-r')
  for (const [path, title] of [['/guide', '使い方'], ['/about', 'Typleについて'], ['/rankings', '自分のベスト記録']]) {
    await page.goto(path)
    await expect(page.getByRole('heading', { name: title, exact: true })).toBeVisible()
  }
})

test('IME commits advance once even with a duplicate input event', async ({ page }) => {
  await seed(page, [{
    id: 'ime', name: 'IME', createdAt: '2026-09-06', records: [],
    words: [{ display: 'あ', input: 'あ', annotation: '' }, { display: 'あ', input: 'あ', annotation: '' }],
  }])
  await page.goto('/play')
  const input = page.getByRole('textbox', { name: '表示された文字を入力', exact: true })
  await input.dispatchEvent('compositionstart')
  await input.fill('あ')
  await expect(page.getByRole('status')).toHaveText('1 / 2 単語')
  await input.dispatchEvent('compositionend', { data: 'あ' })
  await expect(page.getByRole('status')).toHaveText('2 / 2 単語')
  await input.fill('あ')
  await expect(page.getByRole('status')).toHaveText('2 / 2 単語')
  await input.dispatchEvent('compositionstart')
  await input.fill('あ')
  await input.dispatchEvent('compositionend', { data: 'あ' })
  await expect(page.getByLabel('練習結果')).toContainText('練習記録を保存しました。')
})

test('failed record storage preserves result and can be retried', async ({ page }) => {
  await seed(page, [{ id: 'retry', name: 'Retry', createdAt: '2026-09-06', records: [], words: [{ display: 'a', input: 'a', annotation: '' }] }])
  let failed = false
  await page.route('**/api/workspace', async route => {
    if (route.request().method() === 'PUT' && !failed) {
      failed = true
      await route.fulfill({ status: 503, json: { error: '保存できませんでした。' } })
    } else await route.continue()
  })
  await page.goto('/play')
  await page.getByRole('textbox', { name: '表示された文字を入力', exact: true }).pressSequentially('a')
  await expect(page.getByLabel('練習結果')).toContainText('記録はまだ保存されていません。')
  await page.getByRole('button', { name: '記録の保存を再試行' }).click()
  await expect(page.getByLabel('練習結果')).toContainText('練習記録を保存しました。')
  expect((await (await page.request.get('/api/workspace')).json()).lists[0].records.length).toBe(1)
})


test('real API rejects anonymous, cross-origin, account spoofing and stale writes', async ({ page, context }) => {
  await seed(page, [{ id: 'private', name: 'Private', createdAt: '2026-09-06', records: [], words: [{ display: 'a', input: 'a', annotation: '' }] }])
  const base = { accountId, revision: 1, lists: [] }
  expect((await page.request.put('/api/workspace', { headers: { Origin: 'https://attacker.invalid' }, data: base })).status()).toBe(403)
  expect((await page.request.put('/api/workspace', { headers: { Origin: origin }, data: { ...base, accountId: 'github:2' } })).status()).toBe(401)
  expect((await page.request.put('/api/workspace', { headers: { Origin: origin }, data: { ...base, revision: 0 } })).status()).toBe(409)
  const originalCookies = await context.cookies()
  const token = await encode({ token: { sub: accountId + '1', name: 'Other' }, secret, salt: 'authjs.session-token' })
  await context.addCookies([{ name: 'authjs.session-token', value: token, url: origin }])
  expect((await (await page.request.get('/api/workspace')).json()).lists).toEqual([])
  await context.clearCookies()
  expect((await page.request.get('/api/workspace')).status()).toBe(401)
  expect((await page.request.put('/api/workspace', { headers: { Origin: origin }, data: base })).status()).toBe(401)
  await page.goto('/edit')
  await expect(page.getByRole('button', { name: 'GitHubでログインして続ける' })).toBeVisible()
  await context.addCookies(originalCookies)
  expect((await (await page.request.get('/api/workspace')).json()).lists[0].name).toBe('Private')
})

test('legacy data migrates once to the authenticated database account', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('typle-r:word-lists:v1', JSON.stringify({ version: 1, lists: [{ id: 'old', name: 'Legacy', createdAt: '2026-09-06', words: [{ display: 'a', input: 'a', annotation: '' }], records: [] }] })))
  await page.goto('/home')
  const button = page.getByRole('button', { name: 'このアカウントへ移行する' })
  await button.click()
  await expect(page.getByRole('status')).toContainText('移行しました。')
  await button.click()
  await expect(page.getByRole('status')).toContainText('移行しました。')
  await page.reload()
  expect((await (await page.request.get('/api/workspace')).json()).lists).toHaveLength(1)
  expect(await page.evaluate(() => localStorage.getItem('typle-r:word-lists:v1'))).toContain('Legacy')
})
