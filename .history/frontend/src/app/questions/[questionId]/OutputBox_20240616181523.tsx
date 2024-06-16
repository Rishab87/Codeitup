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
            examples.map((example:any , index:number) => (
                <TabsTrigger value={`test-case-${index+1}`} key={index}>Test Case {index+1}</TabsTrigger>
            ))
            }
             </TabsList>

            {
                examples.map((example:any , index:number) => (
                    <TabsContent value={`test-case-${index+1}`} key={index}>
                        <div>
                            <div className='flex flex-col gap-2'>
                                <p className='font-semibold'>Input</p>
                                <p>{example.input}</p>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <p className='font-semibold'>Output</p>
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