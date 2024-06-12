'use client'

import React from 'react'
 import Link from 'next/link'
import { ModeToggle } from './ModeSelection'    
import { useAppSelector } from '@/redux-toolkit/Typed-hooks'
import { Button } from './ui/button'

const Navbar = ({active}:{active: number}) => {

    const {token , user} = useAppSelector(state=> state.auth);
    

  return (
    <div className='flex justify-between w-[100vw] p-4'>
        <div className=''>
           Codeitup
        </div>

        <div>
            <ul className='flex gap-7 ml-20 font-semibold text-gray-500'>

                <Link href={'/'}>
                    <li className={`${active == 1? "text-white":"text-gray-500"} transition-all duration-200`}>Home</li>
                </Link>

                <Link href={'/problems/1'}>
                    <li className={`${active == 2? "text-white":"text-gray-500"} transition-all duration-200`}>Problems</li>
                </Link>

                <Link href={'/contests'}>
                    <li className={`${active == 3? "text-white":"text-gray-500"} transition-all duration-200`}>Contests</li>
                </Link>

                <Link href={'/redeem'}>
                    <li className={`${active == 4? "text-white":"text-gray-500"} transition-all duration-200`}>Redeem</li>
                </Link>
                <Link href={'/Roadmaps'}>
                    <li className={`${active == 5? "text-white":"text-gray-500"} transition-all duration-200`}>Roadmaps</li>
                </Link>
            </ul>
        </div>

        <div className='flex gap-3'>
            <ModeToggle/>
            {
                !token && (
                    <div className='flex gap-3'>
                        <Link href={'/login'}>
                            <Button variant="secondary">Login</Button>
                        </Link>
                        <Link href={'/signup'}>
                            <Button variant="secondary">Signup</Button>
                        </Link>
                    </div>
                )
            }
        </div>
    </div>
  )
}

export default Navbar