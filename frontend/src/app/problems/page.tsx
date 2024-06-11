'use client'

import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const page = () => {

    const router = useRouter();
    useEffect(()=>{
        router.replace('/problems/1');
    } , []);
    
  return (
    <div></div>
  )
}

export default page