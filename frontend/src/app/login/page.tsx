import React from 'react'
import { CardWithForm } from './loginCard'
import Navbar from '@/components/Navbar'

const page = () => {
  return (
    <div className='flex justify-between items-center flex-col h-[75vh]'>
        <Navbar active={0}/>
        <CardWithForm/>
    </div>
  )
}

export default page