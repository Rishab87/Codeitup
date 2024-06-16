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
        <Tabs>
            <TabsList className='font-semibold'> 

            {
            examples.map((example:any , index:number) => (
                <TabsTrigger value={""}>Test Case {index+1}</TabsTrigger>
            ))
            }
             </TabsList>

            {
                examples.map((example:any , index:number) => (
                    <TabsContent value={""}>
                        <div>
                            <div className='flex flex-col gap-2'>
                                <p className='font-semibold'>Input</p>
                                <p>{example.input}</p>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <p className='font-semibold'>Expected Output</p>
                                <p>{example.output}</p>
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