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
import { useAppSelector } from "@/redux-toolkit/Typed-hooks"
import { useForm } from "react-hook-form"
import {useState } from "react"
import { updateProfile} from "@/apis/apiFunctions/profile"
import SkillsInput from "./SkillsInput"
import { toast } from "sonner"
import { TbEdit } from "react-icons/tb";

export function EditProfileDialog({setNewUser}:{setNewUser:Function}) {

    const {user}=  useAppSelector(state=>state.auth);
    const [loading , setLoading] = useState(false);

    const [skills , setSkills] = useState<string[]>(user?.skills || []);    

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();



    const updateProfileAPI = async(data:any)=>{

        if(skills == user?.skills && data.firstName == user?.firstName && data.lastName == user?.lastName){
            toast("No changes made");
            return;
        }

        const {firstName , lastName} = data;
        console.log(data);
        await updateProfile({firstName , lastName , skills} , setNewUser);
    }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex gap-2">Edit Profile <TbEdit/></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[98vh]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(updateProfileAPI)}>
          <div className="grid w-full items-center gap-4">
            <div className="flex gap-3">
                <div className="flex flex-col space-y-1.5">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" type="text" defaultValue={user?.firstName} placeholder="First Name" aria-required {...register("firstName" , {required:true})}/>
                {
                    errors.firstName && <span className="text-red-500">First Name is required</span>
                }
                </div>

                <div className="flex flex-col space-y-1.5">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" type="text" defaultValue={user?.lastName} placeholder="Last Name" aria-required {...register("lastName" , {required:true})}/>
                {
                    errors.lastName && <span className="text-red-500">Last Name is required</span>
                }
                </div>
            </div>


                <div className="flex gap-3">
                <div className="flex flex-col space-y-1.5">
                    <SkillsInput skills={skills} setSkills={setSkills}/>
                </div>
            </div>

            </div>


       
            <DialogFooter className="mt-2">
                <Button type="submit">Save changes</Button>
            </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
