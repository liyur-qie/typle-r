require('./register.cjs')
const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const { PGlite } = require('@electric-sql/pglite')
const { workspaceRepository } = require('../src/lib/workspaceRepository.ts')
const { validateWorkspaceRequest } = require('../src/lib/workspaceRequest.ts')
const { prepareLegacy, mergeLegacy } = require('../src/lib/importLegacy.ts')
const list = { id: 'one', name: 'One', createdAt: '2026-09-06', words: [{ display: 'a', input: 'a', annotation: '' }], records: [] }

test('PostgreSQL repository isolates owners and atomically rejects stale revisions', async () => {
  const db = new PGlite()
  try {
    await db.exec(fs.readFileSync('migrations/001_workspaces.sql', 'utf8'))
    const repo = workspaceRepository(async (sql, values) => (await db.query(sql, values)).rows)
    assert.deepEqual(await repo.read('github:1'), { lists: [], revision: 0 })
    assert.equal((await repo.write('github:1', [list], 0)).revision, 1)
    assert.equal(await repo.write('github:1', [], 0), null)
    assert.deepEqual(await repo.read('github:2'), { lists: [], revision: 0 })
    assert.equal(await repo.write('github:2', [], 1), null)
    const results = await Promise.all([repo.write('github:1', [list], 1), repo.write('github:1', [], 1)])
    assert.equal(results.filter(Boolean).length, 1)
    assert.equal((await repo.read('github:1')).revision, 2)
  } finally { await db.close() }
})

test('migration is explicit, repeatable and preserves colliding names and records', async () => {
  const source = [{ ...list, records: [{ id: 'r', date: '2026-09-06', time: 1 }] }]
  const incoming = await prepareLegacy(source)
  const merged = mergeLegacy([list], incoming)
  assert.equal(merged.length, 2)
  assert.equal(merged[1].name, 'One（移行 2）')
  assert.equal(merged[1].records.length, 1)
  assert.deepEqual(mergeLegacy(merged, await prepareLegacy(source)), merged)
  assert.equal(source[0].id, 'one')
})

test('request validation rejects invalid revisions and oversized fields', () => {
  for (const revision of [-1, 1.5, '0', NaN]) assert.throws(() => validateWorkspaceRequest({ revision, lists: [] }))
  assert.throws(() => validateWorkspaceRequest({ revision: 0, lists: [{ ...list, name: 'a'.repeat(201) }] }))
  assert.deepEqual(validateWorkspaceRequest({ revision: 0, lists: [list] }), { revision: 0, lists: [list] })
})
