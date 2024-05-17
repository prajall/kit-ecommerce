import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import { PiSignOutBold } from "react-icons/pi";

type userProps = {
  name: string;
  image: string;
  email: string;
};

const Profile = ({ user }: { user: userProps }) => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger title="Profile">
          <Avatar className="w-8 h-8">
            <AvatarImage src={user.image} />
            <AvatarFallback className="border border-gray-400">
              {(user.name
                ? user.name.charAt(0)
                : user.email.charAt(0)
              ).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="  mt-1">
          <DropdownMenuLabel>{user.name || user.email}</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem className="cursor-pointer hover:bg-slate-100">
            <button
              onClick={() => {
                signOut();
              }}
              className="flex justify-between items-center"
            >
              <PiSignOutBold className="mr-1" />
              SignOut
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default Profile;
