import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs"

const OutputBox = ({examples , message}:{examples:any , message:string}) => {


   if(!examples){
    return (
        <Skeleton className='h-full w-full'/>
    )
   }  

  return (
    <div>
        {
            <Tab>
            examples.map((example:any , index:number) => (
                <div key={index} className='flex flex-col gap-3'>
                
                    <p className='font-semibold'>Test Case {index+1}</p>
                    <div className='flex flex-col gap-1'>
                        <div>
                            <p className='font-semibold'>Input</p>
                            <p>{example.input}</p>
                        </div>
                        <div className='mb-3'>
                            <p className='font-semibold'>Output</p>
                            <p>{example.output}</p>
                        </div>
                    </div>
                </div>
            ))
            </Tab>
    </div>
  )
}

export default OutputBox