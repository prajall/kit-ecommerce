import { auth } from "@/auth";
import { CommandSeparator } from "@/components/ui/command";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Poppins } from "next/font/google";
import { redirect } from "next/navigation";
import React from "react";
import { IconType } from "react-icons/lib";

const font = Poppins({ weight: "400", subsets: ["latin"] });

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await auth();

  if (!user || user.user?.email != "prajalmhrzn@gmail.com") {
    redirect("/");
  }

  interface LinkProp {
    icon: IconType;
    name: String;
    link: string;
  }

  return (
    <>
      <div className="hidden md:flex flex-col w-40 h-full border-r border-gray-200 px-2 fixed pt-4 ">
        <h2 className="text-2xl font font-semibold mb-1">Dashboard</h2>
      </div>
      <div className={cn(font.className, "mt-20 ml-40 px-4")}>
        <div className="py-2 my-1">
          <DropdownMenuSeparator />
        </div>
        <div>{children}</div>
      </div>
    </>
  );
};

export default AdminLayout;
