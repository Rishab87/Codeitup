import Navbar from '@/components/Navbar'
import React from 'react'
import { InputOTPControlled } from './OtpInput'

const page = () => {
  return (
    <div className='flex justify-center items-center h-[100vh]'>
        <Navbar/>
        <InputOTPControlled/>
    </div>
  )
}

export default page