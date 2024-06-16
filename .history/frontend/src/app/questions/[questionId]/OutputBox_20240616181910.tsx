import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs"

const OutputBox = ({examples , message}:{examples:any , message:any}) => {


   if(!examples){
    return (
        <Skeleton className='h-full w-full'/>
    )
   }  

  return (
    <div className='p-2'>
        <Tabs defaultValue='test-case-1'>
            <TabsList className='font-semibold flex w-[400px] text-center'> 

            {
            examples.map((example:any , index:number) => (
                <TabsTrigger value={`test-case-${index+1}`} key={index}>Test Case {index+1}</TabsTrigger>
            ))
            }
             </TabsList>

            {
                examples.map((example:any , index:number) => (
                    <TabsContent value={`test-case-${index+1}`} key={index}>
                        <div className='flex gap-5'>
                            <div className='flex flex-col gap-2'>
                                <p className='font-semibold'>Input:</p>
                                <p className='bg-gray-700 w-fit  p-2 rounded-md'>{example.input}</p>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <p className='font-semibold'>Output:</p>
                                <p className='bg-gray-700 w-fit  p-2 rounded-md'>{example.output}</p>
                            </div>
                        </div>
                    </TabsContent>
                ))
            }
        </Tabs>
    </div>
  )
}

export default OutputBox