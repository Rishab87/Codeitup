'use client'

import * as React from "react"
import {toast} from 'sonner'
import { Button } from "@/components/ui/button"
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
import { useAppDispatch, useAppSelector } from "@/redux-toolkit/Typed-hooks"
import { useRouter } from "next/navigation"
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema } from './formSchema';
import { sendotp } from "@/apis/apiFunctions/auth"
import { setUser } from "@/redux-toolkit/slices/auth"
import { usernameAvailable } from "@/apis/apiFunctions/profile"


export function CardWithForm() {

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        resolver: zodResolver(signupSchema),
      });
      const dispatch = useAppDispatch();
      const router = useRouter();

      const {token}  = useAppSelector(state=> state.auth);

      const [usernameStatus , setUsernameStatus] = React.useState<number | null>(null);
      const [loading , setLoading] = React.useState<boolean>(false);

    const checkUsername = async(username:string)=>{
        if(username === ""){
            toast("Please enter username")
        }
        setLoading(true);
        const res = await usernameAvailable(username);
        setUsernameStatus(res);
        setLoading(false);
    }

    const sendotpAPI = async(data:any)=>{
        console.log(data);
        dispatch(setUser(data));
        await sendotp(data.email , router);
    }

    if(token){
        router.back();
    }

  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Singup</CardTitle>
        <CardDescription>The Only Platform You Need To Master DSA!</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(sendotpAPI)}>
      <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex gap-3">
                <div className="flex flex-col space-y-1.5">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" type="text" placeholder="First Name" aria-required {...register("firstName" , {required:true})}/>
                {
                    errors.firstName && <span className="text-red-500">First Name is required</span>
                }
                </div>

                <div className="flex flex-col space-y-1.5">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" type="text" placeholder="Last Name" aria-required {...register("lastName" , {required:true})}/>
                {
                    errors.lastName && <span className="text-red-500">Last Name is required</span>
                }
                </div>
            </div>
            <div className="flex gap-3 items-center justify-center">
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" type="text" placeholder="Enter username" aria-required {...register("username" , {required:true})} onChange={(e)=>checkUsername(e.target.value)}/>
                    {
                        errors.username && <span className="text-red-500">Username is required</span>
                    }
                </div>
                <div className="flex items-center justify-center">
                {
                    usernameStatus === null && (
                        <div className="text-gray-500 text-sm">
                            no username entered
                        </div>
                    )
                }
                {
                    usernameStatus === 1 && (
                        <div className="text-green-500">
                            username available
                        </div>
                    )
                }
                {
                    usernameStatus === 0 && (
                        <div className="text-red-500">
                            username not available
                        </div>
                    )
                }
                {
                    usernameStatus === -1 && (
                        <div className="text-red-500">
                            can't fetch usernames
                        </div>
                    )
                }
                {
                    username
                }
                </div>
                
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Email</Label>
              <Input id="email" type="email" placeholder="Enter your email" aria-required {...register("email" , {required:true})}/>
              {
                errors.email && <span className="text-red-500">Email is required</span>
              }
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="Enter your password" aria-required {...register("password" , {required:true})}/>
              {
                errors.password && <span className="text-red-500">Password is required</span>
              }
            </div>
            </div>
       
        </CardContent>
        <CardFooter className="flex justify-center">
            <Button type="submit">Singup</Button>
        </CardFooter>
      </form>

    </Card>
  )
}
