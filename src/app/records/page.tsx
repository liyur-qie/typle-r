"use client"

import PageTitle from "@/components/PageTitle/PageTitle"
import PageDescription from "@/components/PageDescription/PageDescription"
import WordListsResponse from "@/json/WordListsResponse.json"
import { useEffect, useState } from "react"
import { WordList } from "@/types/WordList"

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from "@mui/material/Button"

export default function Records() {
  const [wordLists, setWordLists] = useState<WordList[]>()

  useEffect(() => {
    setWordLists(WordListsResponse)
  }, [])

  return (
    <main className="bg-white p-16 pb-12">
      <PageTitle>記録</PageTitle>
      <PageDescription>各単語リストの記録を確認することができます。</PageDescription>
      { wordLists?.map(wordList => (
        <section className="mt-12" key={ wordList.name }>
          <h2 className="text-2xl">{ wordList.name }</h2>
          <TableContainer className="mt-4">
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>No.</TableCell>
                      <TableCell>所要時間</TableCell>
                      <TableCell>単語数</TableCell>
                      <TableCell>練習日時</TableCell>
                      <TableCell>操作</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    { wordList.records.map((record, index) => (
                      <TableRow key={ index }>
                        <TableCell component="th" scope="row">{ index + 1 }</TableCell>
                        <TableCell> { record.time } 秒</TableCell>
                        <TableCell>{ wordList.words.length }</TableCell>
                        <TableCell> { record.time } </TableCell>
                        <TableCell>
                          <Button variant="outlined">削除</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
        </section>
        ))
      }
    </main>
  )
}