'use client'

import * as React from "react"
import {toast} from 'sonner'
import _ from 'lodash';
import './loading.css'
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
import { googleLogin, sendotp } from "@/apis/apiFunctions/auth"
import { setUser , setToken } from "@/redux-toolkit/slices/auth"
import { usernameAvailable } from "@/apis/apiFunctions/profile"
import {useCallback} from 'react'
import { signIn, signOut, useSession } from "next-auth/react";


export function CardWithForm() {

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        resolver: zodResolver(signupSchema),
      });

      const debouncedFunction = useCallback(
        _.debounce(async(value:string) => {
          setLoading(true);
          const res = await usernameAvailable(value);
          
          setUsernameStatus(res);
          setLoading(false);
        }, 500), // 500 ms delay
        [] // Empty dependency array ensures that this is created only once
      );

      const dispatch = useAppDispatch();
      const router = useRouter();

      const {token}  = useAppSelector(state=> state.auth);

      const [usernameStatus , setUsernameStatus] = React.useState<number | null>(null);
      const [loading , setLoading] = React.useState<boolean>(false);
      
    const checkUsername = async(username:string)=>{
        if(username === ""){
            toast("Please enter username")
        }
        await debouncedFunction(username);
    }

    const sendotpAPI = async(data:any)=>{
        if(data.password !== data.confirmPassword){
            toast("Passwords do not match");
            return;
        }
        setLoading(true);
        
        dispatch(setUser(data));
        await sendotp(data.email , router);
        setLoading(false);
    }

    const { data: session, status } = useSession();

    const googleSigninApiCall = async()=>{
      setLoading(true);
      const res = await googleLogin(dispatch);
      signOut({callbackUrl: '/problems/1'});
      setLoading(false);
    }

    React.useEffect(()=>{
      if (status === 'authenticated'){
        toast("Logging in");
       googleSigninApiCall();
      }
    } , [status]);

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
    <Card className="w-[450px] mt-10">
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
                <div className="flex flex-col space-y-1.5 w-full">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" type="text" placeholder="Enter username" aria-required {...register("username" , {required:true})} onChange={(e)=>checkUsername(e.target.value)}/>
                    {
                        errors.username && <span className="text-red-500">Username is required</span>
                    }
                </div>
                <div className="flex items-center justify-center w-full">
                {
                    !loading && usernameStatus === null && (
                        <div className="text-gray-500 w-full mt-3">
                            no username entered
                        </div>
                    )
                }
                {
                    !loading && usernameStatus == 1 && (
                        <div className="text-green-500 w-full mt-3">
                            username available
                        </div>
                    )
                }
                {
                    !loading && usernameStatus == 0 && (
                        <div className="text-red-500 w-full mt-3">
                            username not available
                        </div>
                    )
                }
                {
                    !loading && usernameStatus == -1 && (
                        <div className="text-red-500 w-full mt-3">
                            can&apos;t fetch usernames
                        </div>
                    )
                }
                {
                    loading && (
                        <div className="lds-ring mt-3"><div></div><div></div><div></div></div>
                    ) 
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
              <div className="flex gap-3">
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" placeholder="Enter your password" aria-required {...register("password" , {required:true})}/>
                    {
                        errors.password && <span className="text-red-500">{(errors as any)?.password?.message}</span>
                    }
                </div>
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input id="confirmPassword" type="password" placeholder="Confirm password" aria-required {...register("confirmPassword" , {required:true})}/>
                    {
                        errors.confirmPassword && <span className="text-red-500">{(errors as any)?.confirmPassword?.message}</span>
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
       
        </CardContent>
        <CardFooter className="flex justify-center">
            <Button type="submit" disabled={loading}>Signup</Button>
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
