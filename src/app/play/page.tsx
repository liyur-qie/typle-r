"use client"

import { useEffect, useState } from "react"
import WordListsResponse from "@/json/WordListsResponse.json"
import type { WordList } from "@/types/WordList"
import Button from "@mui/material/Button"
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import PageContainer from "@/components/PageContainer/PageContainer"
import Page from "@/components/Page/Page"
import Stack from "@mui/material/Stack"
import Chip from "@mui/material/Chip"

export default function Play(){
  const [wordLists, setWordLists] = useState<WordList[]>([])
  const [wordList, setWordList] = useState<WordList>()
  const [wordListName, setWordListName] = useState<string>("")
  const [displayWord, setDisplayWord] = useState<string>("")
  const [inputValue, setInputValue] = useState<string>("")

  useEffect(() => {
    setWordLists(WordListsResponse)
    setWordList(wordLists[0])

    if(wordList) {
      setWordListName(wordList.name)
      setDisplayWord(wordList.words[0].display)
    }
  }, [wordLists, wordList, wordListName])

  function createWordListRecordsRowsData(
    index: number,
    time: number,
    date: string,
  ) {
    return { index, time, date };
  }

  function createWordListsRowsData(
    name: string,
    length: number,
    action: React.ReactNode,
  ) {
    return { name, length, action };
  }
  
  const wordListRecordsRows = wordList ? wordList.records.map((record, index) => (
    createWordListRecordsRowsData(index, record.time, record.date)
  )) : []
  const wordListsRows = wordLists.map((wordList, index) => (
    createWordListsRowsData(wordList.name, wordList.words.length, <Button variant="outlined">選択</Button>)
  ))

  return (
    <Page className="pb-12">
      <section id="playArea">
        <div
          id="wordDisplay"
          className="bg-gray-900 text-white flex justify-center items-center text-4xl h-28"
        >
          { displayWord }
        </div>
        <input
          id="wordInputField"
          value={inputValue}
          onChange={ e => setInputValue(e.target.value) }
          type="text"
          className="bg-gray-800 text-white text-center w-full text-2xl font-light h-28 outline-none"
          placeholder="Type the word above here"
        />
        { inputValue }
      </section>
      <div className="mx-auto mt-8 px-6">
        <section id="wordList">
          <h1 className="text-xl my-3">選択中: { wordListName }</h1>
          <Stack direction="row" spacing={1}>
            {
              wordList?.words.map((word, index) => (
                <Chip key={ index } label={ word.input } color="primary" variant="outlined" />
              ))
            }
          </Stack>
        </section>
        <section className="mt-8 flex flex-wrap justify-between">
          <section id="rankings" className="lg:w-6/12 md:w-full">
            <h2 className="text-2xl">
              練習記録
            </h2>
            <TableContainer>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>No.</TableCell>
                    <TableCell>所要時間</TableCell>
                    <TableCell>プレイ日時</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  { wordListRecordsRows.map((row, index) => (
                    <TableRow
                      key={index}
                    >
                      <TableCell component="th" scope="row">{ index + 1 }</TableCell>
                      <TableCell> { row.time } 秒</TableCell>
                      <TableCell> {row.date } </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </section>
          <section
            id="selectWordList"
            className="lg:w-5/12 md:w-full md:mt-6 lg:mt-0"
          >
            <h2 className="text-2xl">
              単語リスト
            </h2>
            <TableContainer>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>単語リスト名</TableCell>
                    <TableCell>単語数</TableCell>
                    <TableCell>操作</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {wordListsRows.map((row) => (
                    <TableRow
                      key={row.name}
                    >
                      <TableCell component="th" scope="row">{ row.name }</TableCell>
                      <TableCell> { row.length } 単語</TableCell>
                      <TableCell> {row.action } </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </section>
        </section>
      </div>
    </Page>
  )
}