require('./register.cjs')
const { test } = require('node:test')
const assert = require('node:assert/strict')
const { newSession, typeInput, sessionResult } = require('../src/lib/typing.ts')

test('mistakes require correction; advance and finish exactly once', () => {
  const words = [{ input: 'ab' }, { input: 'c' }]
  let s = typeInput(newSession(), words, 'x', 1000)
  assert.equal(s.index, 0)
  assert.equal(s.mistakes, 1)
  s = typeInput(s, words, '', 1100)
  s = typeInput(s, words, 'ab', 2000)
  assert.equal(s.index, 1)
  assert.equal(s.input, '')
  s = typeInput(s, words, 'c', 3000)
  assert.deepEqual(sessionResult(s), { time: 2, mistakes: 1, accuracy: 75 })
  assert.equal(typeInput(s, words, 'c', 4000), s)
  assert.equal(newSession().finishedAt, null)
})
test('empty lists and unicode input are handled', () => {
  const s = newSession()
  assert.equal(typeInput(s, [], 'a', 0), s)
  assert.equal(typeInput(s, [{ input: 'あ😀' }], 'あ😀', 0).attempts, 2)
})
