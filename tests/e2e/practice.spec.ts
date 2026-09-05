import { test, expect } from '@playwright/test'

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
  await page.reload()
  await expect(page.getByText('まだ記録がありません。', { exact: false })).toBeVisible()
  await page.goto('/edit')
  await page.getByRole('button', { name: 'Saved Practice を削除', exact: true }).click()
  await page.reload()
  await expect(page.getByRole('button', { name: 'Saved Practice を編集', exact: true })).toHaveCount(0)
  expect(errors).toEqual([])
})

test('damaged storage is not overwritten', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('typle-r:word-lists:v1', '{broken'))
  await page.goto('/play')
  await expect(page.getByRole('alert').filter({ hasText: '保存データを読み込めません' })).toBeVisible()
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
  await page.addInitScript(() => localStorage.setItem('typle-r:word-lists:v1', JSON.stringify({ version: 1, lists: [{
    id: 'ime', name: 'IME', createdAt: '2026-09-06', records: [],
    words: [{ display: 'あ', input: 'あ', annotation: '' }, { display: 'あ', input: 'あ', annotation: '' }],
  }] })))
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
  await page.addInitScript(() => {
    localStorage.setItem('typle-r:word-lists:v1', JSON.stringify({ version: 1, lists: [{
      id: 'retry', name: 'Retry', createdAt: '2026-09-06', records: [],
      words: [{ display: 'a', input: 'a', annotation: '' }],
    }] }))
    const original = Storage.prototype.setItem
    let writes = 0
    Storage.prototype.setItem = function(key, value) {
      if (key === 'typle-r:word-lists:v1' && writes++ === 0) throw new DOMException('Full', 'QuotaExceededError')
      original.call(this, key, value)
    }
  })
  await page.goto('/play')
  await page.getByRole('textbox', { name: '表示された文字を入力', exact: true }).pressSequentially('a')
  await expect(page.getByLabel('練習結果')).toContainText('記録はまだ保存されていません。')
  await page.getByRole('button', { name: '記録の保存を再試行' }).click()
  await expect(page.getByLabel('練習結果')).toContainText('練習記録を保存しました。')
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('typle-r:word-lists:v1')!).lists[0].records.length)).toBe(1)
})

