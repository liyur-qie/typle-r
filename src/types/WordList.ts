export type WordList = {
  id?: string,
  name: string,
  words: {
    display: string,
    input: string,
    annotation: string
  }[],
  records: {
    id?: string,
    time: number,
    date: string,
    mistakes?: number,
    accuracy?: number,
    wordCount?: number
  }[],
  createdAt: string
}
