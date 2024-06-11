import React from 'react'
 import Link from 'next/link'

const Navbar = () => {
  return (
    <div className='flex justify-between w-[100vw] text-white p-4'>
        <div>
           Logo
        </div>

        <div>
            <ul className='flex gap-5'>

                <Link href={'/'}>
                    <li>Home</li>
                </Link>

                <Link href={'/problems/1'}>
                    <li>Problems</li>
                </Link>

                <Link href={'/contests'}>
                    <li>Contests</li>
                </Link>

                <Link href={'/redeem'}>
                    <li>Redeem</li>
                </Link>

            </ul>
        </div>

        <div>
            Profile Picture or Login Signup
        </div>
    </div>
  )
}

export default Navbar