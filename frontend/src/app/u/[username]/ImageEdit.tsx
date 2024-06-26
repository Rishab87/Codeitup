import { Skeleton } from '@/components/ui/skeleton';
import { useAppDispatch, useAppSelector } from '@/redux-toolkit/Typed-hooks';
import Image from 'next/image';
import React, { useState } from 'react'
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { updateProfilePicture } from '@/apis/apiFunctions/profile';
import { setUser } from '@/redux-toolkit/slices/auth';
import { toast } from 'sonner';

const ImageEdit = ({newUser , setNewUser}:{newUser:any , setNewUser:Function}) => {

    const [image , setImage] = useState<null | any>(null);
    const {user} = useAppSelector(state=>state.auth);
    const [loading , setLoading] = useState(false);
    const dispatch = useAppDispatch();

    if(!newUser){
        return (
            <Skeleton className='w-full h-full'/>
        )
    }

    const uploadHandler = async()=>{
        setLoading(true);
        const res = await updateProfilePicture(image?.file , setNewUser);
        setImage(null);
        setLoading(false);
    }

    const previewFile = (files:any) => {
        let newImage = {};
        const file = files[0];
        
        newImage = {
        file,
        preview: URL.createObjectURL(file),
        };  

        setImage(newImage);
    };

  return (
    <div className='w-[30vw] flex flex-col gap-3 justify-center items-center p-2'>
        {
            !user && (
                <Skeleton className='w-full'/>
            )
        }
        <Image src={image ? image.preview : newUser?.image} width={200} height={200} alt='profile-picture' className='rounded-full'/>
        {
            user?.id === newUser?.id && image === null && user && (
                <Button className='relative'>
                    <Input type="file" onChange={(e)=>previewFile(e.target.files)}  className='w-full p-2 opacity-10 absolute' placeholder='Edit Image'/>
                    Edit Image
                </Button>
            )
        }
        {
            image && (
                <div className='flex gap-5'>
                    <Button variant={"secondary"} onClick={()=> setImage(null)} disabled={loading}> Cancel</Button>
                    <Button onClick={uploadHandler} className={`${loading? "opacity-50": "opacity-100"}`} disabled={loading}>Upload</Button>
                </div>
            )
        }
    </div>
  )
}

export default ImageEdit