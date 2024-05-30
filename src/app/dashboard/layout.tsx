import { auth } from "@/auth";
import { CommandSeparator } from "@/components/ui/command";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Poppins } from "next/font/google";
import { redirect } from "next/navigation";
import React from "react";
import { IconType } from "react-icons/lib";

import Link from "next/link";
import DashboardSidebar from "./(components)/DashboardSidebar";

const font = Poppins({ weight: "400", subsets: ["latin"] });

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await auth();

  if (!user || user.user?.email != "prajalmhrzn@gmail.com") {
    redirect("/");
  }

  return (
    <>
      <DashboardSidebar />
      <div className={cn(font.className, "mt-20 md:ml-40 xl:ml-48 px-6")}>
        <div>{children}</div>
      </div>
    </>
  );
};

export default AdminLayout;
