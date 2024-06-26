'use client'

import Navbar from '@/components/Navbar'
import React from 'react'
import ProfilePage from './ProfilePage'

const page = ({params}:{params:{username:string}}) => {

  const {username} = params;
  return (
    <div className='flex flex-col gap-5'>
        <Navbar/>
        <ProfilePage username={username}/>
    </div>
  )
}

export default page