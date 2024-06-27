import React , {useState , useCallback} from 'react'
import { Button } from "@/components/ui/button"
import { MdModeEdit } from "react-icons/md";
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
import { toast } from "sonner"
import { updateUsername, usernameAvailable } from "@/apis/apiFunctions/profile"
import _ from 'lodash';
import {useAppSelector } from '@/redux-toolkit/Typed-hooks';
import { useRouter } from 'next/navigation';

const UpdateUsername = ({setNewUser}:{setNewUser:Function}) => {

  const [loading , setLoading] = useState(false);
  const [usernameStatus , setUsernameStatus] = useState<number | null>(null);
  const [newUsername  ,setNewUsername] = useState<string>("");

  const router = useRouter();

  const debouncedFunction = useCallback(
    _.debounce(async(value:string) => {
      setLoading(true);
      const res = await usernameAvailable(value);
      
      setUsernameStatus(res);
      setLoading(false);
    }, 500), // 500 ms delay
    [] // Empty dependency array ensures that this is created only once
  );

  const {user} = useAppSelector(state=>state.auth);
  const checkUsername = async(username:string)=>{
    if(username === ""){
        toast("Please enter username")
    }
    await debouncedFunction(username);
  }

  const updateUsernameAPI = async()=>{
    if(newUsername === user?.username){
        toast("No changes made");
        return;
    }
    if(usernameStatus != 1){
        toast("Username not available");
        return;
    }

    await updateUsername(newUsername , setNewUser , router);
  }
  return (
    <div>
      <Dialog>
      <DialogTrigger asChild>
        {
          user && (
            <MdModeEdit className='cursor-pointer' fontSize={"1.2rem"}/>
          )
        }
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Username</DialogTitle>
          <DialogDescription>
            Make changes to your username here. Click update when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-3 items-center justify-center">
                <div className="flex flex-col space-y-1.5 w-full">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" type="text" placeholder="Enter username" aria-required onChange={(e)=>{
                      checkUsername(e.target.value);
                      setNewUsername(e.target.value);
                      }}/>

                </div>
                <div className="flex items-center justify-center w-full">
                {
                    !loading && (usernameStatus === null || newUsername === user?.username) && (
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
                    !loading && usernameStatus == 0 && newUsername !== user?.username && (
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
        <DialogFooter>
          <Button type="submit" onClick={updateUsernameAPI}>Update Username</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </div>
  )
}

export default UpdateUsername