import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { useForm } from "react-hook-form"   
import { passwordSchema } from './PasswordSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { changePassword } from '@/apis/apiFunctions/auth'



const ChangePassword = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        resolver: zodResolver(passwordSchema),
      });

      const changePasswordAPI = async(data:any)=>{
        console.log(data);
        await changePassword(data);
    }

  return (
    <div>
        <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"}>Change Password</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your password here. Click update when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(changePasswordAPI)}>
          <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
                <Label htmlFor="Oldpassword">Old Password:</Label>
                <Input id="Oldpassword" type="password" placeholder="Enter Password" aria-required {...register("password" , {required:true})}/>
                {
                    errors.newPassword && <span className="text-red-500">Old Password is required</span>
                }
            </div>

            <div className="flex gap-3">
                <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">New Password:</Label>
                <Input id="password" type="password" placeholder="Enter Password" aria-required {...register("newPassword" , {required:true})}/>
                {
                    errors.newPassword && <span className="text-red-500">Password is required</span>
                }
                </div>

                <div className="flex flex-col space-y-1.5">
                <Label htmlFor="confirmPassword">Confirm New Password:</Label>
                <Input id="confirmPassword" type="password" placeholder="Confirm Password" aria-required {...register("confirmNewPassword" , {required:true})}/>
                {
                    errors.confirmNewPassword && <span className="text-red-500">Confirm Password is required</span>
                }
                </div>
            </div>

            <div className="text-gray-500 text-sm font-mono">
                    <p>Password must have</p>
                    <p>- At least 6 letters</p>
                    <p>- At least one number</p>
                    <p>- At least one symbol</p>
                    <p>- At least one uppercase letter</p>
            </div>

            </div>


       
            <DialogFooter className="mt-2">
                <Button type="submit">Update Password</Button>
            </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
    </div>
  )
}

export default ChangePassword