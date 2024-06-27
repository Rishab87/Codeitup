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
import { googleLogin, login } from "@/apis/apiFunctions/auth"
import { useAppDispatch, useAppSelector } from "@/redux-toolkit/Typed-hooks"
import { useRouter } from "next/navigation"
import { signIn, signOut } from "next-auth/react"
import { setToken ,setUser } from "@/redux-toolkit/slices/auth"
import { toast } from "sonner"
import { useSession } from 'next-auth/react';


export function CardWithForm() {

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
      const dispatch = useAppDispatch();
      const router = useRouter();
      const [loading , setLoading] = React.useState(false);

      const {token}  = useAppSelector(state=> state.auth);
      const { data: session, status } = useSession();

      const googleSigninApiCall = async()=>{
        setLoading(true);
        const res = await googleLogin(dispatch);
        setLoading(false);  
      }

      React.useEffect(()=>{
        if (status === 'authenticated'){
        toast("Logging in");
        signOut({callbackUrl: '/problems/1'});
         googleSigninApiCall();
        }
      } , [status]);

    const loginAPI = async(data:any)=>{
        setLoading(true);
        await login(data , dispatch , router);
        setLoading(false);
    }

    const googleSiginHandler = async()=>{
      setLoading(true);
      toast("Signing in");
      await signIn('google');
      setLoading(false);
    }

    if(status === 'authenticated'){
      router.push('/problems/1');
    }

    if(token){
        router.back();
    }

  return (
    <div className="flex flex-col gap-5">
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>The Only Platform You Need To Master DSA!</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(loginAPI)}>
      <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
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
            <Button variant="link" disabled = {loading}>Forgot Password</Button>
            <Button type="submit" disabled={loading} className={`${loading? "opacity-50": "opacity-100"}`}>Login</Button>
        </CardFooter>
      </form>

    </Card>

    {/* <Button onClick={googleSiginHandler} className="flex justify-center gap-3" disabled={loading}>
              
    <img src="https://www.vectorlogo.zone/logos/google/google-icon.svg" alt="google" width={20} height={20} />

      Continue With Google
      </Button> */}
    </div>
  )
}
