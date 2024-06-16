"use client"

import * as React from "react"

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { useAppSelector } from "@/redux-toolkit/Typed-hooks"
import { signup } from "@/apis/apiFunctions/auth"

export function InputOTPControlled() {
  const [value, setValue] = React.useState("")
  const {user} = useAppSelector(state=>state.auth);

  const signupAPI = async(e:any)=>{
    e.preventDefault();
    const {email , password , confirmPassword , username , firstName , lastName} = user;
    await signup({email , password , confirmPassword , username , firstName , lastName , )};
  }

  return (
    <div className="space-y-2">
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
