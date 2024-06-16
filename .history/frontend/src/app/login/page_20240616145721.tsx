<<<<<<< HEAD
import Navbar from '@/components/Navbar'
import React from 'react'
import { CardWithForm } from './LoginCard'

const page = () => {
  return (
    <div className='flex justify-center items-center h-[100vh]'>
        <Navbar/>
=======
import React from 'react'
import { CardWithForm } from './loginCard'
import Navbar from '@/components/Navbar'

const page = () => {
  return (
    <div className='flex justify-between items-center flex-col h-[75vh]'>
        <Navbar active={0}/>
>>>>>>> 08d2792acebb2929a1d39e405bed66bb0f12d4ac
        <CardWithForm/>
    </div>
  )
}

export default page