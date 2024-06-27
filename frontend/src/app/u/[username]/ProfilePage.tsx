import React from 'react'
import ImageEdit from './ImageEdit'
import { useState , useEffect } from 'react'
import { getUserByUsername } from '@/apis/apiFunctions/profile';
import {Separator} from '@/components/ui/separator';
import UserProgress from './UserProgress';
import { useAppSelector } from '@/redux-toolkit/Typed-hooks';
import { Button } from '@/components/ui/button';
import Socials from './Socials';
import { EditProfileDialog } from './EditProfileDialog';
import { formatTimestamp } from '@/utils/dateFormatter';
import UpdateUsername from './UpdateUsername';
import ChangePassword from './ChangePassword';
import { Skeleton } from '@/components/ui/skeleton';
import { DeleteAccountAlert } from './DeleAccountDialog';

const ProfilePage = ({username}:{username:string}) => {
    
    const [newUser , setNewUser] = useState<any>({});

    const {user} = useAppSelector(state=>state.auth);   

    const fetchUser = async()=>{
        const res = await getUserByUsername(username);
        setNewUser(res);
    }
  
    useEffect(()=>{
        fetchUser();
    } , []);


  return (
    <div className='flex gap-10'>
        <div className='flex flex-col gap-5 w-[30%]'>
            <ImageEdit newUser={newUser} setNewUser={setNewUser}/>
            {
                newUser && (
                    <div className='font-mono ml-10 flex flex-col gap-2'>
                    <div>
                        <p className='text-xl'>{newUser?.firstName} {newUser?.lastName}</p>
                        <p className='text-sm'>Joined on: {formatTimestamp(newUser?.createdAt)}</p>
                    </div>
                    <div>
                        <p className='text-lg'>{newUser?.bio}</p>
                        <Separator/>
                    </div>
                </div>
                )
            }
            {
                !newUser && (
                    <Skeleton className='h-[30vh] w-[90%] ml-10 '/>
                )
            }
            
            <Socials newUser={newUser} setNewUser={setNewUser}/>
        </div>

        <div className='flex flex-col gap-10 w-[60%]'>
            <div className='font-mono flex flex-col gap-3'>
                {
                    !newUser && (
                        <Skeleton className='w-[50%] h-[10%]'/>
                    )
                }
                <div>
                    <div className='flex gap-1'>
                        <h1 className='text-6xl'>{newUser?.username}</h1>
                        {
                            newUser?.id === user?.id && (
                                <UpdateUsername setNewUser={setNewUser}/>
                            )
                        }
                    </div>
                    <h2>Points :{newUser?.points}</h2>
                </div>
                {
                    newUser?.id === user?.id && (
                        <div className='flex gap-3 font-sans'>
                            <EditProfileDialog setNewUser={setNewUser}/>
                            <ChangePassword/>
                            <DeleteAccountAlert/>
                        </div>
                    )
                }
            </div>
            <Separator/>
            {
                !newUser && (
                    <Skeleton className='w-full h-[40vh]'/>
                )
            }
            {
                
            }
            <UserProgress newUser={newUser}/>

            <Separator/>
            
            {
                !newUser && (
                    <Skeleton className='w-full  h-[20vh]'/>
                )
            }
            {
                newUser && (
                    <div className='font-mono flex flex-col gap-2 mb-2'>
                    <h2 className='text-2xl'>Skills:</h2>
                    <div className='flex gap-3  text-zinc-100 dark:text-zinc-950'>
                    {
                        newUser?.skills?.map((skill:string , index:number)=>(
                            <span key={index} className='text-lg bg-zinc-950 dark:bg-zinc-100 p-2 rounded-lg'>{skill}</span>
                        ))
                    }
                    </div>
                    {
                        newUser?.skills?.length === 0 && (
                            <span className='text-lg'>No skills added yet</span>
                        )
                    }
                    </div>
                )
            }
          
        </div>

        
    </div>
  )
}

export default ProfilePage