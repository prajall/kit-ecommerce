import { auth } from "@/auth";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import { redirect } from "next/navigation";
import React from "react";

const font = Poppins({ weight: "400", subsets: ["latin"] });

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await auth();

  if (!user || user.user?.email != "prajalmhrzn@gmail.com") {
    redirect("/");
  }

  return (
    <div className={cn(font.className, "mt-20")}>
      <div className="py-2 my-1">
        <h2 className="text-2xl font font-semibold mb-1">Dashboard</h2>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default AdminLayout;
