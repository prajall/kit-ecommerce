"use client";
import React from "react";
import UploadImage from "./UploadImage";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import axios from "axios";

const BillboardId = async ({ params }: { params: { billboardId: string } }) => {
  if (params.billboardId == "new")
    return (
      <div>
        <h2 className="text-xl font-semibold mt-1 mb-4">Billboards (2)</h2>
        <p className=" mb- text-lg ">Upload a new Billboard:</p>
        <UploadImage />
      </div>
    );

  const billboard = await axios.get(
    `/api/dashboard/billboard/${params.billboardId}`
  );
  console.log(billboard);
  if (!billboard) {
    redirect("/dashboard/billboard/new");
  }
  return <div>Billboard Detail</div>;
};

export default BillboardId;
