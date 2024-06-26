import React from 'react'
import { Progress } from '@/components/ui/progress';    
import { Skeleton } from '@/components/ui/skeleton';

const UserProgress = ({newUser}:{newUser:any}) => {

  return (
        <div className='font-mono flex flex-col gap-5'>
        <p className='text-2xl'>Progess So Far:</p>
        <div className='flex gap-2'>
            <span className='text-lg mt-1 w-[70px]'>easy:</span>
            <div className='w-full relative'>
                <p className=' text-xs'>{newUser?.easy}/100</p>
                <Progress value={newUser?.easy} className='bg-green-500'/>
            </div>
            
        </div>

        <div className='flex gap-2'>
            <span className='text-lg mt-1 w-[70px]'>medium:</span>
            <div className='w-full relative'>
                <p className=' text-xs'>{newUser?.medium}/100</p>
                <Progress value={newUser?.medium} className='bg-yellow-500'/>
            </div>
            
        </div>

        <div className='flex gap-2'>
            <span className='text-lg mt-1 w-[70px]'>hard:</span>
            <div className='w-full relative'>
                <p className=' text-xs'>{newUser?.hard}/100</p>
                <Progress value={newUser?.hard} className='bg-red-500'/>
            </div>
            
        </div>

    </div>
  )
}

export default UserProgress