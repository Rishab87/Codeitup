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
    <div className="w-[100%] h-[90vh] overflow-scroll">
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
            <TableRow key={submision.id} className='h-[50px]'>
            <TableCell className={`font-semibold ${submision.status !== "ACCEPTED" ? "text-red-500" : "text-green-500" }`}>{submision.status}</TableCell>
            <TableCell className='font-semibold text-center'>{submision.executedTime}</TableCell>
            <TableCell className='font-semibold text-center'>{submision.executedSpace}</TableCell>
            <TableCell className='font-semibold'>{formatTimestamp(submision.createdAt)}</TableCell>

            <Dialog>
                <DialogTrigger asChild>
                    <Button className='h-[35px] rounded-md mt-[7px]' variant={"outline"}>Show Code</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Code</DialogTitle>
                    </DialogHeader>
                    <div className='overflow-scroll'>
                    <DialogDescription className='max-h-[90vh] max-w-[500px]'>
                        <pre className='font-mono'>{submision.code}</pre>
                    </DialogDescription>
                    </div>
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