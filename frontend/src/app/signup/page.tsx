import Navbar from '@/components/Navbar'
import React from 'react'
import { CardWithForm } from './SignUpCard'

const page = () => {
  return (
    <div className='flex justify-center items-center h-[100vh]'>
        <Navbar/>
        <CardWithForm/>
    </div>
  )
}

export default page