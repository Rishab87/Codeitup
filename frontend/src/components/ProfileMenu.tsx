import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from 'next/image'
import { useAppDispatch, useAppSelector } from "@/redux-toolkit/Typed-hooks"
import Link from "next/link";
import { removeCookie } from "@/apis/apiFunctions/auth";
import { setToken, setUser } from "@/redux-toolkit/slices/auth";

export function ProfileMenu() {

    const {user} = useAppSelector(state=>state.auth);
    const dispatch = useAppDispatch();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Image src={user?.image} width={40} height={40} alt="profile" className="rounded-md"/>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
        <Link href={`/u/${user.username}`}>
          <DropdownMenuItem>
            Profile
          </DropdownMenuItem>
        </Link>

        <Link href="/roadmaps">
          <DropdownMenuItem>
            Your Roadmaps
          </DropdownMenuItem>
        </Link>

          <DropdownMenuItem onClick={async()=>{
            await removeCookie();
            dispatch(setToken(null));
            dispatch(setUser(null));
          }}>
            Logout
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
