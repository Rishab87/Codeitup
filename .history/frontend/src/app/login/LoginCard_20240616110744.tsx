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


export function CardWithForm() {

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>The Only Platform You Need To Master DSA!</CardDescription>
      </CardHeader>
      <form>
      <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Email</Label>
              <Input id="email" placeholder="Enter your email" aria-required {...register("email" , {required:true})}/>
              {
                errors.email && <span className="text-red-500">Email is required</span>
              }
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Password</Label>
              <Input id="password" placeholder="Enter your password" aria-required {...register("password" , {required:true})}/>
              {
                errors.pa
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
