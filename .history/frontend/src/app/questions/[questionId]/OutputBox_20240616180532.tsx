import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

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
                
            ))
        }
    </div>
  )
}

export default OutputBox