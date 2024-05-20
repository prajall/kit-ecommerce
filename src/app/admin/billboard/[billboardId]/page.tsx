"use client";
import { prisma } from "@/lib/prisma";
import axios from "axios";
import React, { HtmlHTMLAttributes, useState } from "react";

const BillboardId = ({ params }: { params: { billboardId: string } }) => {
  // console.log(params);

  const [image, setImage] = useState<File | null>(null);

  const uploadBillboard = async () => {
    if (!image) {
      console.log("No image selected");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      console.log("posting");
      const response = await axios.post("/api/admin/billboard", formData);
      console.log(response.data);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleFileInput = (e: any) => {
    setImage(e.target.files[0]);
  };

  return (
    <div>
      <input type="file" onChange={handleFileInput} />
      <button onClick={uploadBillboard}>Submit</button>
    </div>
  );
};

export default BillboardId;
