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
            <TableHead>Time</TableHead>
            <TableHead>Memory</TableHead>
            <TableHead>Date</TableHead>
        </TableRow>
        </TableHeader>
        <TableBody>
        { submissions && (
        submissions.map((submision:any) => (
            <TableRow key={submision.id}>
            <TableCell className="font-semibold text-lg">{submision.status}</TableCell>
            <TableCell className='font-semibold text-lg'>{submision.difficulty}</TableCell>
            <TableCell><Button variant={"outline"} onClick={()=>router.push(`/questions/${question.id}`)}>Solve</Button></TableCell>
            </TableRow>
        )))}

        </TableBody>
    </Table>
  </div>
  )
}

export default SubmissionsPage