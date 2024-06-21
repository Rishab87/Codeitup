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
import { formatTimestamp } from '@/utils/dateFormatter'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

const SubmissionsPage = ({submissions}:{submissions:any}) => {

    if(submissions === null){
        <Skeleton  className='h-[80vh] w-full'/>
    }

    if(submissions?.length === 0){
        return (
            <div className="h-[80vh] w-full flex items-center justify-center">
                <h1 className='text-3xl font-semibold'>No Submissions Yet</h1>
            </div>
        )
    }

  return (
    <div className="w-[100%] h-fit">
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
            <TableCell className={`font-semibold ${submissions.status  === "ACCEPTED" ? "text-green-500" : "text-red-500"}`}>{submision.status}</TableCell>
            <TableCell className='font-semibold text-center'>{submision.executedTime}</TableCell>
            <TableCell className='font-semibold text-center'>{submision.executedSpace}</TableCell>
            <TableCell className='font-semibold'>{formatTimestamp(submision.createdAt)}</TableCell>

            <Dialog>
                <DialogTrigger asChild>
                    <Button className='h-[30px] rounded-lg ' variant={"outline"}>Show Code</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Code</DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                        <pre className='font-mono'>{submision.code}</pre>
                    </DialogDescription>
                </DialogContent>
            </Dialog>
            </TableRow>
        )))}

        </TableBody>
    </Table>
  </div>
  )
}

export default SubmissionsPage