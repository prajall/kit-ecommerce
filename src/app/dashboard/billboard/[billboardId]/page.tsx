"use client";
import axios from "axios";
import { redirect } from "next/navigation";
import Header from "../../(components)/Header";
import BillboardForm from "./BillboardForm";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { BillboardProp } from "../types";
import { useRouter } from "next/navigation";

const BillboardId = async ({ params }: { params: { billboardId: string } }) => {
  const router = useRouter();

  const postBillboard = async (data: any) => {
    console.log(data);
    const formData = new FormData();
    formData.append("image", data.image);
    formData.append("label", data.label);
    formData.append("showDate", data.showDate);
    formData.append("endDate", data.endDate);

    console.log(formData);

    try {
      const response = await axios.post("/api/dashboard/billboard", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Image uploaded successfully:", response);

      if (response.status == 200) {
        toast.success("Billboard Uploaded Successfully");
        redirect("/dashboard/billboard");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
    // router.push("/dashboard/billboard");
  };

  const patchBillboard = async () => {};

  if (params.billboardId == "new")
    return (
      <div>
        <Header
          title="New Billboard"
          description="Add a new billboard to the homescreen "
        />
        <BillboardForm onSubmitBillboardForm={postBillboard} />
      </div>
    );

  const [billboardDetail, setBillboardDetail] = useState<BillboardProp>();

  const fetchBillboard = async () => {
    const response = await axios.get(
      `/api/dashboard/billboard/${params.billboardId}`
    );
    if (!response.data.billboard) {
      redirect("/dashboard/billboard/new");
    } else {
      setBillboardDetail(response.data.billboard);
    }
  };
  useEffect(() => {
    fetchBillboard();
  }, []);
  return (
    <div>
      <div>
        <Header title="Edit Billboard" description="Edit your billboard" />
      </div>
      <BillboardForm
        onSubmitBillboardForm={patchBillboard}
        initialData={billboardDetail}
      />
    </div>
  );
};

export default BillboardId;
