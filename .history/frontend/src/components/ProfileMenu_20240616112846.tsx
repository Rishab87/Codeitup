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
import { useAppSelector } from "@/redux-toolkit/Typed-hooks"
import Link from "next/link";

export function DropdownMenuDemo() {

    const {user} = useAppSelector(state=>state.auth);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Image src={user?.image} width={30} height={50} alt="profile"/>
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

        <Link href="/roadmaps/"> //</Link>
          <DropdownMenuItem>
            Your Roadmaps
          </DropdownMenuItem>
          <DropdownMenuItem>
            Logout
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
