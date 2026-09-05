export type WordList = {
  id?: string,
  name: string,
  words: {
    display: string,
    input: string,
    annotation: string
  }[],
  records: {
    time: number,
    date: string
  }[],
  createdAt: string
}
