import React from 'react'
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
import { forgotPasswordToken } from '@/apis/apiFunctions/auth'

const ForgotPasswordCard = () => {

    const [loading , setLoading] = React.useState(false);
    const [email , setEmail] = React.useState('');

    const forgotPasswordTokenAPI = async(event:any)=>{
        event.preventDefault();
        setLoading(true);
        await forgotPasswordToken(email);
        setLoading(false);
    }

  return (
    <div className='h-[80vh] w-[100%] flex justify-center items-center'>
    <div className="flex flex-col gap-5">
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Forgot Password</CardTitle>
        <CardDescription>Send Link to Change Password</CardDescription>
      </CardHeader>
      <form onSubmit={forgotPasswordTokenAPI}>
      <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter your email" aria-required required onChange={(e)=> setEmail(e.target.value)}/>
            </div>
            </div>
       
        </CardContent>
        <CardFooter className="flex justify-between">
            <Button type="submit" disabled={loading} className={`${loading? "opacity-50": "opacity-100"}`}>Send Link</Button>
        </CardFooter>
      </form>

    </Card>
    </div>
    </div>
  )
}

export default ForgotPasswordCard