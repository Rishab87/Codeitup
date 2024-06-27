import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { useAppSelector } from '@/redux-toolkit/Typed-hooks'
import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";
import {updateSocials } from '@/apis/apiFunctions/profile'

const AddSocials = ({setNewUser}:{setNewUser:Function}) => {

    const {user} = useAppSelector(state=>state.auth);

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

      const [loading , setLoading] = useState(false);

    const editSocialsAPI = async(data:any)=>{
        setLoading(true);
        await updateSocials(data, setNewUser);
        setLoading(false);
    }

  return (
    <Dialog>
    <DialogTrigger asChild>
      <Button className="mt-5" variant={'outline'}>Add Socials</Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Add Socials</DialogTitle>
        <DialogDescription>
          Make changes to your profile here. Click save when you&apos;re done.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit(editSocialsAPI)}>
        <div className="grid w-full items-center gap-4">

              <div className="flex space-x-1.5 items-center">
              <Label htmlFor="github"><FaGithub/></Label>
              <Input id="github" type="text" defaultValue={user?.socials?.githubUrl} placeholder="GitHub URL" aria-required {...register("githubUrl")}/>
              </div>

              <div className="flex space-x-1.5 items-center">
                <Label htmlFor="twitter"><FaXTwitter/></Label>
                <Input id="twitter" type="text" defaultValue={user?.socials?.twitterUrl} placeholder="X URL" aria-required {...register("twitterUrl")}/>
              </div>

              <div className="flex space-x-1.5 items-center">
                <Label htmlFor="linkedin"><FaLinkedin/></Label>
                <Input id="linkedin" type="text" defaultValue={user?.socials?.linkedinUrl} placeholder="LinkedIn URL" aria-required {...register("linkedinUrl")}/>
              </div>

              <div className="flex space-x-1.5 items-center">
                <Label htmlFor="instagram"><FaInstagram/></Label>
                <Input id="instagram" type="text" defaultValue={user?.socials?.instagramUrl} placeholder="Instagram URL" aria-required {...register("instagramUrl")}/>
              </div>

              <div className="flex space-x-1.5 items-center">
                <Label htmlFor="youtube"><FaYoutube/></Label>
                <Input id="youtube" type="text" defaultValue={user?.socials?.youtubeUrl} placeholder="YouTube URL" aria-required {...register("youtubeUrl")}/>
              </div>

              <div className="flex space-x-1.5 items-center">
                <Label htmlFor="website"><CgWebsite/></Label>
                <Input id="website" type="text" defaultValue={user?.socials?.websiteUrl} placeholder="Website URL" aria-required {...register("websiteUrl")}/>
              </div>

        </div>
        <DialogFooter className="mt-2">
            <Button type="submit" className={`${loading? "opacity-50": "opacity-100"}`} disabled={loading} >Save changes</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
  )
}

export default AddSocials