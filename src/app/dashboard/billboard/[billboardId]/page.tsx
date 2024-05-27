"use client";
import axios from "axios";
import { redirect } from "next/navigation";
import Header from "../../(components)/Header";
import BillboardForm from "./BillboardForm";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { BillboardProp } from "../types";
import { useRouter } from "next/navigation";
import Loading from "@/app/loading";

const BillboardId = ({ params }: { params: { billboardId: string } }) => {
  const billboardId = params.billboardId;
  const [fetchingBillboard, setFetchingBillboard] = useState(true);

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

  async function urlToFile(imageUrl: string): Promise<File> {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const fileName = imageUrl.split("/").pop() || "image.jpg"; // Extract file name from URL or use default name
    const file = new File([blob], fileName, { type: blob.type });
    return file;
  }

  const fetchBillboard = async () => {
    console.log("Fetching Billboard Details");
    const response = await axios.get(`/api/dashboard/billboard/${billboardId}`);
    if (!response.data) {
      router.push("/dashboard/billboard/new");
    }
    const imageFile = urlToFile(response.data.imageUrl);
    const billboardWithImage = { ...response.data, image: imageFile };
    setBillboardDetail(billboardWithImage);
    setFetchingBillboard(false);
  };
  useEffect(() => {
    fetchBillboard();
  }, []);
  return (
    <div>
      <div>
        <Header title="Edit Billboard" description="Edit your billboard" />
      </div>
      {fetchingBillboard && <Loading />}

      {!fetchingBillboard && (
        <BillboardForm
          onSubmitBillboardForm={patchBillboard}
          initialData={billboardDetail}
        />
      )}
    </div>
  );
};

export default BillboardId;
