"use client";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Admin = () => {
  const [isMounted, setIsMounted] = useState(false);

  const router = useRouter();
  const redirectBillboard = () => {
    router.push("/dashboard/billboard");
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  if (isMounted)
    return (
      <>
        <div>This is admin page</div>
        <div>
          <Button
            variant={"default"}
            className="mt-4"
            onClick={redirectBillboard}
          >
            Billboards {">"}
          </Button>
        </div>
      </>
    );
};

export default Admin;
