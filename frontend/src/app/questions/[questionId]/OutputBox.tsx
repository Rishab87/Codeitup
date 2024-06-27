import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs"

const motivation = [
    "You are doing great",
    "You got this!",
    "Less goo!",
]

const randomMotivation = () => {
    return motivation[Math.floor(Math.random() * motivation.length)];
}

const OutputBox = ({examples , message , loading}:{examples:any , message:any , loading:boolean}) => {


   if(!examples || loading){
    return (
        <Skeleton className='h-[80%] w-full p-2'/>
    )
   }  
   

  return (
    <div className='p-2 h-full w-full'>
        {
            !message && !loading && (
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
                                        <p className='bg-blue-900 w-fit  p-2 rounded-md'>{example.input}</p>
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <p className='font-semibold'>Output:</p>
                                        <p className='bg-blue-900 w-fit  p-2 rounded-md'>{example.output}</p>
                                    </div>
                                </div>
                            </TabsContent>
                        ))
                    }
                </Tabs>   
            )
        }
        {
            message && !loading && (
                <div className={`w-full h-[70%] p-2 flex gap-2 flex-wrap justify-center items-center flex-col`}>
                    <p className={`w-fit font-bold ${message.status == "ACCEPTED" ? " text-green-500": " text-red-500"} rounded-md`}>{message.status}</p>
                    {
                        message.status == "ACCEPTED" && (
                            <p className='font-semibold text-center text-green-500'>{randomMotivation()}</p>
                        )
                    }                    {
                        message.status == "ACCEPTED" && (
                           <div className='flex gap-5 font-bold mt-2'>
                              <p className='p-4 h-fit w-fit bg-green-300 text-green-500 rounded-md text-center'>Time Taken <br/>{message.time} s</p>
                              <p className='bg-green-300 text-green-500 p-4 rounded-md text-center'>Memory Used <br/>{message.memory} MB</p>
                              {/* //add better than % */}
                           </div>
                        )
                    }
                                        {
                        message.status == "WRONG ANSWER" && (
                           <div className='flex gap-40'>
                            <div className='flex flex-col gap-1'>
                                <p className='font-bold text-red-500 text-center'>Input</p>
                                <p className='p-3 h-fit w-fit bg-red-300 text-red-500 rounded-md'>{message.result.input}</p>
                            </div>
                            <div className='flex flex-col gap-1'>
                                <p className='font-bold text-red-500 text-center'>Output</p>
                                <p className='p-3 h-fit w-fit bg-red-300 text-red-500 rounded-md'>{message.result.output}</p>
                            </div>
                           </div>
                        )
                    }

                    {
                        message.status.includes("ERROR") && (
                            <div className='flex gap-40'>
                                <p className='p-3 h-fit w-fit bg-red-300 text-red-500 rounded-md'>{message.result.output}</p>
                           </div>
                        )   
                    }
                </div>
            )
        }
      
    </div>
  )
}

export default OutputBox