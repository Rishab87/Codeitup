"use client"

import * as React from "react"

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { useAppDispatch, useAppSelector } from "@/redux-toolkit/Typed-hooks"
import { sendotp, signup } from "@/apis/apiFunctions/auth"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { setUser } from "@/redux-toolkit/slices/auth"

export function InputOTPControlled() {
  const [value, setValue] = React.useState("")
  const {user , token} = useAppSelector(state=>state.auth);
  const router = useRouter();
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (!user) {
      router.push("/signup");
    }
    if(token){
      router.push("/problems/1");
    }

  }, [user, token, router]);

  const signupAPI = async(e:any)=>{
    e.preventDefault();
    const {email , password , confirmPassword , username , firstName , lastName} = user;
    await signup({email , password , confirmPassword , username , firstName , lastName , otp: value} , router , dispatch);
  }

  const sendotpAPI = async(e:any)=>{
    e.preventDefault();
    await sendotp(user.email , router);
  }

  return (
    <div className="space-y-2">
    <form onSubmit={signupAPI}>
      <InputOTP
        maxLength={6}
        value={value}
        onChange={(value) => setValue(value)}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>

        <Button className="mt-4 ml-32" type="submit">Confirm</Button>

    </form>
    <Button onClick={sendotpAPI} className=" bottom-[40px] relative" variant={"link"}>resend it</Button>
      <div className="text-center text-sm">
        {value === "" ? (
          <>Enter your one-time password.</>
        ) : (
          <>You entered: {value}</>
        )}
      </div>
    </div>
  )
}
