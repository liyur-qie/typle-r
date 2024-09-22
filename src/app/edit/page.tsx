"use client"

import PageTitle from "@/components/PageTitle/PageTitle"
import PageDescription from "@/components/PageDescription/PageDescription"
import WordListsResponse from "@/json/WordListsResponse.json"


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from "@mui/material/Button"
import { useEffect, useState } from "react";
import { WordList } from "@/types/WordList";

export default function Edit(){
  const [wordLists, setWordLists] = useState<WordList[]>()

  useEffect(() => {
    setWordLists(WordListsResponse)
  }, [])
  
  return (
      <main className="bg-white p-16 pb-12">
      <PageTitle>編集</PageTitle>
      <PageDescription>説明</PageDescription>
      { wordLists?.map(wordList => (
        <section className="mt-12" key={ wordList.name }>
          <TableContainer className="mt-4">
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>単語リスト名</TableCell>
                      <TableCell>単語数</TableCell>
                      <TableCell>記録数</TableCell>
                      <TableCell>操作</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    { wordList.records.map((record, index) => (
                      <TableRow key={ index }>
                        <TableCell component="th" scope="row">{ wordList.name }</TableCell>
                        <TableCell>{ wordList.words.length } 単語</TableCell>
                        <TableCell>{ wordList.records.length } レコード</TableCell>
                        <TableCell>
                          <Button variant="outlined">編集</Button>
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