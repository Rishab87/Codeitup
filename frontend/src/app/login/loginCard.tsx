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
import Link from 'next/link'


const loginAPI = async()=>{

}


export function CardWithForm() {
  return (
    <Card className="w-[350px]">
    <form>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>The Only Platform You Need To Master DSA!</CardDescription>
      </CardHeader>
      <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email" placeholder="Enter your email address" required aria-required/>
            </div>
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="pass">Password</Label>
                <Input id="pass" placeholder="Enter password" type="password" required aria-required/>
            </div>
          </div>
      </CardContent>
      <CardFooter className="flex justify-between">

        <Button onSubmit={loginAPI}>Login</Button>
        <Link href={'/forgot-password'}>
            <Button variant="link">Forgot Password</Button>
        </Link>
      </CardFooter>
    </form>
    </Card>
  )
}
