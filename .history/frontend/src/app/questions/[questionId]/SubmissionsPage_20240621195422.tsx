import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

const SubmissionsPage = ({submissions}:{submissions:any}) => {
  return (
    <div className="w-[100%]">
    <Table>
        <TableHeader>
        <TableRow>
            <TableHead className="w-[200px]">Status</TableHead>
            <TableHead>Difficulty</TableHead>
        </TableRow>
        </TableHeader>
        <TableBody>
        { questions && (
        questions.map((question) => (
            <TableRow key={question.id}>
            <TableCell className="font-semibold cursor-pointer text-lg" onClick={()=>router.push(`/questions/${question.id}`)}>{question.title}</TableCell>
            <TableCell className={`${question.difficulty === "easy"? "text-green-500":question.difficulty === "medium"? "text-yellow-500": "text-red-500"} font-semibold text-md`}>{question.difficulty}</TableCell>
            <TableCell><Button variant={"outline"} onClick={()=>router.push(`/questions/${question.id}`)}>Solve</Button></TableCell>
            </TableRow>
        )))}

        </TableBody>
    </Table>
  </div>
  )
}

export default SubmissionsPage