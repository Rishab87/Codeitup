import Navbar from '@/components/Navbar'
import React from 'react'

const page = () => {
  return (
    <div className='flex justify-center items-center h-[100vh]'>
        <Navbar/>
        <p className='font-bold text-3xl '>No Money For This</p>
        {/*Buy me a coffee link maybe */}
    </div>
  )
}

export default page