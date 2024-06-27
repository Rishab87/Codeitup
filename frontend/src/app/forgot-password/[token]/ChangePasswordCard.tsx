'use client'

import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { Button } from '@/components/ui/button'
import { forgotPassword } from '@/apis/apiFunctions/auth'
import { useAppDispatch } from '@/redux-toolkit/Typed-hooks'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { passwordSchema } from './passwordSchema'

const ChangePasswordCard = ({token}:{token:string}) => {

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm(
        {
          resolver: zodResolver(passwordSchema)
        }
      );

    const [loading , setLoading] = React.useState(false);
    const dispatch = useAppDispatch();
    const router = useRouter();

    const forgotPasswordAPI = async(data:any)=>{
        const {newPassword , confirmNewPassword} = data;
        if(newPassword !== confirmNewPassword){
            alert("Passwords do not match");
            return;
        }
        setLoading(true);
        await forgotPassword({newPassword , confirmNewPassword , token} , dispatch , router);
        setLoading(false);
    }

  return (
    <div>
         <div className='h-[80vh] w-[100%] flex justify-center items-center'>
    <div className="flex flex-col gap-5">
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Forgot Password</CardTitle>
        <CardDescription>Change Your Password</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(forgotPasswordAPI)}>
      <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="newPass">New Password</Label>
              <Input id="newPass" type="password" placeholder="Enter your new password" aria-required required {...register("newPassword" , {required:true})}/>
              {
                errors.newPassword && <span className="text-red-500">{(errors as any).confirmPassword?.message}</span>
              }
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="confirmNewPassword">Confirm Password</Label>
              <Input id="confirmNewPassword" type="password" placeholder="Confirm password" aria-required required {...register("confirmNewPassword" , {required:true})}/>
              {
                errors.confirmNewPassword && <span className="text-red-500">{(errors as any).confirmNewPassword.messaage}</span>
              }
            </div>
            </div>
       
        </CardContent>
        <CardFooter className="flex justify-between">
            <Button type="submit" disabled={loading} className={`${loading? "opacity-50": "opacity-100"}`}>Change Password</Button>
        </CardFooter>
      </form>

    </Card>
    </div>
    </div>
    </div>
  )
}

export default ChangePasswordCard