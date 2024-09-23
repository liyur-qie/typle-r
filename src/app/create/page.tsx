"use client"

import PageTitle from "@/components/PageTitle/PageTitle"
import PageDescription from "@/components/PageDescription/PageDescription"

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from "@mui/material/Button"
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ClearIcon from '@mui/icons-material/Clear';


import type { WordList } from "@/types/WordList";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Page from "@/components/Page/Page";
import PageContainer from "@/components/PageContainer/PageContainer";

export default function Create(){
  const [wordList, setWordList] = useState<WordList>()
  const [wordListName, setWordListName] = useState("Example list")
  const [words, setWords] = useState<string[]>(["yi", "er", "san"])

  return (
    <Page>
      <PageContainer>
        <section>
          <PageTitle>Create</PageTitle>
          <PageDescription>説明</PageDescription>
        </section>
        <section className="mt-8">
        <TextField label="新規単語リスト名" variant="filled" fullWidth value={wordListName} />
          <TableContainer className="mt-4">
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>No.</TableCell>
                  <TableCell>単語</TableCell>
                  <TableCell>文字数</TableCell>
                  <TableCell>操作</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { words.map((word, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">{ index + 1 }</TableCell>
                    <TableCell>
                      <TextField variant="standard" value={ word } />
                    </TableCell>
                    <TableCell>{ word.length } 文字</TableCell>
                    <TableCell>
                      <Button variant="outlined" className="mr-2">
                        <ArrowUpwardIcon />
                      </Button>
                      <Button variant="outlined" className="mr-2">
                        <ArrowDownwardIcon />
                      </Button>
                      <Button variant="outlined">
                        <ClearIcon />
                      </Button>
                    </TableCell>
                </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </section>
        <section className="mt-8">
          <Button variant="outlined" className="mr-4">作成</Button>
          <Button variant="outlined">キャンセル</Button>
        </section>
      </PageContainer>
    </Page>
  )
}