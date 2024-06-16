import Navbar from '@/components/Navbar'
import React from 'react'
import { InputOTPControlled } from './OtpInput'

const page = () => {
  return (
    <div>
        <Navbar/>
        <InputOTPControlled/>
    </div>
  )
}

export default page