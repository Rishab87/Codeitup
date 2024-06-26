import { deleteProfile } from "@/apis/apiFunctions/profile"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Button } from "@/components/ui/button"
import { useAppDispatch } from "@/redux-toolkit/Typed-hooks"
import { MdDelete } from "react-icons/md";
import { useRouter } from "next/navigation";
  
  export function DeleteAccountAlert() {

    const dispatch = useAppDispatch();
    const router =  useRouter();

    const deleteAccountAPI = async()=>{
        await deleteProfile(router , dispatch);
    }
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" className="flex gap-2">Delete Account <MdDelete/> </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={deleteAccountAPI}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  