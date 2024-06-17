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
        {
            !message && (
                <Tabs defaultValue='test-case-1'>
                    <TabsList className='font-semibold grid grid-cols-2 w-[350px] text-center'> 
        
                    {
                    examples.map((example:any , index:number) => (
                        <TabsTrigger value={`test-case-${index+1}`} key={index} className='text-center font-semibold'>Test Case {index+1}</TabsTrigger>
                    ))
                    }
                    </TabsList>
        
                    {
                        examples.map((example:any , index:number) => (
                            <TabsContent value={`test-case-${index+1}`} key={index} className='font-mono pt-3'> 
                                <div className='flex gap-5 flex-wrap'>
                                    <div className='flex flex-col gap-2'>
                                        <p className='font-semibold'>Input:</p>
                                        <p className='bg-gray-900 w-fit  p-2 rounded-md'>{example.input}</p>
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <p className='font-semibold'>Output:</p>
                                        <p className='bg-gray-900 w-fit  p-2 rounded-md'>{example.output}</p>
                                    </div>
                                </div>
                            </TabsContent>
                        ))
                    }
                </Tabs>   
            )
        }
        {
            message && (
                <div className='bg-gray-900 w-[350px] p-2 rounded-md'>
                    <p className='font-semibold'>Output:</p>
                    <p className='tex-t-green-500'>{message.status}</p>
                </div>
            )
        }
      
    </div>
  )
}

export default OutputBox