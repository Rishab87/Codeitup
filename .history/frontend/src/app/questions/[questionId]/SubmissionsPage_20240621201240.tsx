import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

const SubmissionsPage = ({submissions}:{submissions:any}) => {

    if(submissions.length === 0){
        return <h1>No Submissions</h1>
    }
    if(!submissions){
        <Skeleton  className='h-[80vh] w-full'/>
    }

  return (
    <div className="w-[100%]">
    <Table>
        <TableHeader>
        <TableRow>
            <TableHead>Status</TableHead>
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
            <TableCell className='font-semibold text-lg'>{submision.executedTime}</TableCell>
            <TableCell className='font-semibold text-lg'>{submision.executedSpace}</TableCell>
            <TableCell className='font-semibold text-lg'>{formatTimestamp(submision.createdAt)}</TableCell>
            <Button>Show Code</Button>
            </TableRow>
        )))}

        </TableBody>
    </Table>
  </div>
  )
}

export default SubmissionsPage