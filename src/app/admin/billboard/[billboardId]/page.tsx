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
        <UploadImage />
      </div>
    );

  const billboard = await axios.get(
    `/api/admin/billboard/${params.billboardId}`
  );
  console.log(billboard);
  if (!billboard) {
    redirect("/admin/billboard/new");
  }
  return <div>Billboard Detail</div>;
};

export default BillboardId;
