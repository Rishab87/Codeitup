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
            {
            examples.map((example:any , index:number) => (
                <TabsList className='font-semibold'> 
                    Test Case {index+1}
                </TabsList>
                  
                </div>
            ))
        }
        </Tabs>
    </div>
  )
}

export default OutputBox