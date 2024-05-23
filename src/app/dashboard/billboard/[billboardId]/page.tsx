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
        <h2 className="text-lg mt-2 mb-6 ">Upload a new Billboard:</h2>
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
