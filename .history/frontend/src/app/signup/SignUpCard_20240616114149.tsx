'use client'

import * as React from "react"

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

    const loginAPI = async(data:any)=>{
        console.log(data);
        dispatch(setUser(data));
        await sendotp(data.email , router);
    }

    if(token){
        router.back();
    }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Singup</CardTitle>
        <CardDescription>The Only Platform You Need To Master DSA!</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(loginAPI)}>
      <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex gap-3">
                <div className="flex flex-col space-y-1.5">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" type="text" placeholder="Enter your first name" aria-required {...register("firstName" , {required:true})}/>
                {
                    errors.firstName && <span className="text-red-500">First Name is required</span>
                }
                </div>

                <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Last Name</Label>
                <Input id="email" type="text" placeholder="Enter your last name" aria-required {...register("email" , {required:true})}/>
                {
                    errors.email && <span className="text-red-500">Last Name is required</span>
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
        <CardFooter className="flex justify-between">
            <Button variant="link">Forgot Password</Button>
            <Button>Login</Button>
        </CardFooter>
      </form>

    </Card>
  )
}
