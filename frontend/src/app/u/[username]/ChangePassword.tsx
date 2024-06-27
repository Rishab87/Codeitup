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
import { useRouter } from 'next/navigation'
import { useAppSelector } from '@/redux-toolkit/Typed-hooks'



const ChangePassword = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        resolver: zodResolver(passwordSchema),
      });

      const [loading , setLoading] = React.useState(false);

      const {user} = useAppSelector(state=>state.auth);

      const router = useRouter();

      const changePasswordAPI = async(data:any)=>{
        setLoading(true);
        await changePassword(data);
        setLoading(false);
    }

  return (
    <div>
        <Dialog>
      <DialogTrigger asChild>
        {
          user && (
            <Button variant={"outline"}>Change Password</Button>
          )
        }
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
          <DialogDescription>
            Make changes to your password here. Click update when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(changePasswordAPI)}>
          <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
                <Label htmlFor="Oldpassword">Old Password:</Label>
                <Input id="Oldpassword" type="password" placeholder="Enter Old Password" aria-required {...register("password" , {required:true})}/>
                {
                    errors.password && <span className="text-red-500">Old Password is required</span>
                }
            </div>

            <div className="flex gap-3">
                <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">New Password:</Label>
                <Input id="password" type="password" placeholder="Enter Password" aria-required {...register("newPassword" , {required:true})}/>
                {
                    errors.newPassword && <span className="text-red-500">{(errors as any).newPassword.message}</span>
                }
                </div>

                <div className="flex flex-col space-y-1.5">
                <Label htmlFor="confirmPassword">Confirm New Password:</Label>
                <Input id="confirmPassword" type="password" placeholder="Confirm Password" aria-required {...register("confirmNewPassword" , {required:true})}/>
                {
                    errors.confirmNewPassword && <span className="text-red-500">{(errors as any).confirmNewPassword.message}</span>
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
                <Button variant={'link'} onClick={(e)=>{
                  router.push('/forgot-password'); 
                  e.preventDefault();
                  }} disabled={loading} className={`${loading? "opacity-50": "opacity-100"}`}>Forgot Password?</Button>
                <Button type="submit" disabled={loading} className={`${loading? "opacity-50": "opacity-100"}`}>Update Password</Button>
            </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
    </div>
  )
}

export default ChangePassword