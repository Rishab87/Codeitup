'use client'

import React, { useEffect } from 'react'
 import Link from 'next/link'
import { ModeToggle } from './ModeSelection'    
import { useAppDispatch, useAppSelector } from '@/redux-toolkit/Typed-hooks'
import { Button } from './ui/button'
import { usePathname } from 'next/navigation'
import { ProfileMenu } from './DropDownMenu'
import { cookieLogin } from '@/apis/apiFunctions/auth'

const Navbar = () => {

    const {token , user} = useAppSelector(state=> state.auth);
    const dispatch = useAppDispatch();

    const pathname = usePathname();
    
    useEffect(()=>{
        if(!token){
            cookieLogin(dispatch);  
        }
    } , [])

  return (
    <div className='h-[65px] mb-12'>
    <div className='flex justify-between items-center h-[65px] w-[100vw] p-4 fixed top-0 bg-transparent inset-0  bg-opacity-50 backdrop-filter backdrop-blur-lg border-b-2'>
        <Link href={'/'}>
            <div className='font-bold text-2xl font-mono cursor-pointer'>
            Codeitup
            </div>
        </Link>

        <div>
            <ul className='flex gap-7 ml-20 font-semibold text-gray-500'>

                <Link href={'/'}>
                    <li className={`${pathname == '/'? "text-white":"text-gray-500"} transition-all duration-200`}>Home</li>
                </Link>

                <Link href={'/problems/1'}>
                    <li className={`${pathname.includes('problems')? "text-white":"text-gray-500"} transition-all duration-200`}>Problems</li>
                </Link>

                <Link href={'/contests'}>
                    <li className={`${pathname == '/contests'? "text-white":"text-gray-500"} transition-all duration-200`}>Contests</li>
                </Link>

                <Link href={'/redeem'}>
                    <li className={`${pathname == '/redeem'? "text-white":"text-gray-500"} transition-all duration-200`}>Redeem</li>
                </Link>
                <Link href={'/roadmaps'}>
                    <li className={`${pathname == '/roadmaps'? "text-white":"text-gray-500"} transition-all duration-200`}>Roadmaps</li>
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
            {
                token && (
                    <div>
                        <ProfileMenu/>
                    </div>
                )
            }
        </div>
    </div>
    </div>
  )
}

export default Navbar