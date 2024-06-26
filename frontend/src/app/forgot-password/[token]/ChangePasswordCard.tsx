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

const ChangePasswordCard = ({token}:{token:string}) => {

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

    const [loading , setLoading] = React.useState(false);

    const forgotPasswordAPI = async(data:any)=>{

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
      <form onSubmit={forgotPasswordAPI}>
      <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter your email" aria-required required />
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