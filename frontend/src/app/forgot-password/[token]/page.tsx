import Navbar from '@/components/Navbar';
import React from 'react'
import ChangePasswordCard from './ChangePasswordCard';

const page = ({params}:{params:{token:string}}) => {

    const {token} = params;

  return (
    <div>
        <Navbar/>
        <ChangePasswordCard token={token}/>
    </div>
  )
}

export default page