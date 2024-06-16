import Navbar from '@/components/Navbar'
import React from 'react'
import { CardWithForm } from './LoginCard'

const page = () => {
  return (
    <div className='flex '>
        <Navbar/>
        <CardWithForm/>
    </div>
  )
}

export default page