import { useAppSelector } from '@/redux-toolkit/Typed-hooks'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import React from 'react'
import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";
import AddSocials from './AddSocials';
import { Skeleton } from '@/components/ui/skeleton';

const Socials = ({newUser , setNewUser}:{newUser:any , setNewUser:Function}) => {

    const {user} = useAppSelector(state=>state.auth);
    if(!newUser){
        <Skeleton className='w-[80%] h-[50px]'/>
    }

  return (
    <div className='ml-10'>
        {
            newUser.socials && (
                <div className='flex gap-2'>
                    {
                        newUser.socials?.githubUrl && (
                            <Link href={newUser.socials.githubUrl}>
                                <FaGithub fontSize={"1.5rem"} className='hover:opacity-50 transition-all duration-200'/>
                            </Link>
                        )
                    }
                    {
                        newUser.socials?.linkedinUrl && (
                            <Link href={newUser.socials.linkedinUrl}>
                                <FaLinkedin fontSize={"1.5rem"} className='hover:opacity-50 transition-all duration-200'/>
                            </Link>
                        )
                    }
                    {
                        newUser.socials?.twitterUrl && (
                            <Link href={newUser.socials.twitterUrl}>
                                <FaXTwitter fontSize={"1.5rem"} className='hover:opacity-50 transition-all duration-200'/>
                            </Link>
                        )
                    }
                    {
                        newUser.socials?.websiteUrl && (
                            <Link href={newUser.socials.websiteUrl}>
                                <CgWebsite fontSize={"1.5rem"} className='hover:opacity-50 transition-all duration-200'/>
                            </Link>
                        )
                    }
                    {
                        newUser.socials?.instagramUrl && (
                            <Link href={newUser.socials.instagramUrl}>
                                <FaInstagram fontSize={"1.5rem"}  className='hover:opacity-50 transition-all duration-200'/>
                            </Link>
                        )
                    }
                    {
                        newUser.socials?.youtubeUrl && (
                            <Link href={newUser.socials.youtubeUrl} className='hover:opacity-50 transition-all duration-200'>
                                <FaYoutube fontSize={"1.5rem"}/>
                            </Link>
                        )
                    }
                </div>
            
            )
        }
        {
            newUser?.id === user?.id && (
                <AddSocials setNewUser={setNewUser}/>
            )
        }
    </div>
  )
}

export default Socials