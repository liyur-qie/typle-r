"use client"

import { useEffect, useReducer, useState } from "react"
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
import Paper from '@mui/material/Paper';

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

  function createData(
    name: string,
    length: number,
    action: React.ReactNode,
  ) {
    return { name, length, action };
  }
  
  const rows = wordLists.map((wordList, index) => (
    createData(wordList.name, wordList.words.length, <Button variant="outlined">選択</Button>)
  ))

  return (
    <main className="bg-white pb-12">
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
          <p>チップ表示エリア</p>
        </section>
        <section className="mt-8 flex flex-wrap justify-between">
          <section id="rankings" className="lg:w-6/12 md:w-full">
            <h2 className="text-2xl">
              記録
            </h2>
            <table>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>所要時間</th>
                  <th>プレイ日時</th>
                </tr>
              </thead>
              <tbody>
                { 
                  wordList?.records.map((record, index) => (
                    <tr key={ index }>
                      <td className="text-center">
                        { index + 1 }
                      </td>
                      <td>
                        { record.time } 秒
                      </td>
                      <td>{ record.date}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </section>
          <section
            id="selectWordList"
            className="lg:w-5/12 md:w-full md:mt-6 lg:mt-0"
          >
            <h2 className="text-2xl">
              単語リスト
            </h2>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>単語リスト名</TableCell>
                    <TableCell>単語数</TableCell>
                    <TableCell>操作</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.name}
                    >
                      <TableCell component="th" scope="row">{ row.name }</TableCell>
                      <TableCell align="right"> { row.length } 単語</TableCell>
                      <TableCell align="right"> {row.action } </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </section>
        </section>
      </div>
    </main>
  )
}