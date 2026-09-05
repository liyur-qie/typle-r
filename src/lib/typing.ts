export type TypingSession = {
  index: number
  input: string
  startedAt: number | null
  finishedAt: number | null
  attempts: number
  mistakes: number
}

export function newSession(): TypingSession {
  return { index: 0, input: "", startedAt: null, finishedAt: null, attempts: 0, mistakes: 0 }
}

export function typeInput(session: TypingSession, words: { input: string }[], value: string, now: number): TypingSession {
  if (session.finishedAt !== null || !words[session.index]) return session
  const target = Array.from(words[session.index].input)
  const previous = Array.from(session.input)
  const next = Array.from(value)
  let common = 0
  while (common < previous.length && common < next.length && previous[common] === next[common]) common++
  const inserted = next.slice(common)
  const updated = {
    ...session, input: value,
    startedAt: session.startedAt ?? (value ? now : null),
    attempts: session.attempts + inserted.length,
    mistakes: session.mistakes + inserted.filter((char, index) => char !== target[common + index]).length,
  }
  if (value !== words[session.index].input) return updated
  if (session.index === words.length - 1) return { ...updated, finishedAt: now }
  return { ...updated, index: session.index + 1, input: "" }
}

export function sessionResult(session: TypingSession) {
  return {
    time: Math.max(0, ((session.finishedAt ?? 0) - (session.startedAt ?? 0)) / 1000),
    mistakes: session.mistakes,
    accuracy: session.attempts ? Math.round((session.attempts - session.mistakes) / session.attempts * 10000) / 100 : 100,
  }
}
