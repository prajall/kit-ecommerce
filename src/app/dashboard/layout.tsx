import { auth } from "@/auth";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import { redirect } from "next/navigation";
import React from "react";

import DashboardSidebar from "./(components)/DashboardSidebar";

const font = Poppins({ weight: "400", subsets: ["latin"] });

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await auth();
  console.log(user);

  // if (!user || user.user?.email != "prajalmhrzn@gmail.com") {
  //   redirect("/");
  // }

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
