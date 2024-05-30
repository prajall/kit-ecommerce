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
import EditBillboardForm from "./EditBillboard";

const BillboardId = ({ params }: { params: { billboardId: string } }) => {
  const billboardId = params.billboardId;
  const [fetchingBillboard, setFetchingBillboard] = useState(true);
  const [billboardDetail, setBillboardDetail] = useState<BillboardProp>();

  const router = useRouter();

  const patchBillboard = async () => {};

  if (params.billboardId == "new")
    return (
      <div>
        <Header
          title="New Billboard"
          description="Add a new billboard to the homescreen "
        />
        <BillboardForm />
      </div>
    );

  async function urlToFile(imageUrl: string): Promise<File> {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const fileName = imageUrl.split("/").pop() || "image.jpg"; // Extract file name from URL or use default name
    const file = new File([blob], fileName, { type: blob.type });
    return file;
  }

  const StringToDate = (string: string) => {
    return new Date(string);
  };

  const fetchBillboard = async () => {
    console.log("Fetching Billboard Details");
    const response = await axios.get(`/api/dashboard/billboard/${billboardId}`);
    if (!response.data) {
      router.push("/dashboard/billboard/new");
    }
    const imageFile = await urlToFile(response.data.imageUrl);
    const showDate = StringToDate(response.data.showDate);
    const endDate = StringToDate(response.data.endDate);
    const formattedBillboard = {
      ...response.data,
      image: imageFile,
      showDate: showDate,
      endDate: endDate,
    };
    setBillboardDetail(formattedBillboard);
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
        <EditBillboardForm
          onSubmitBillboardForm={patchBillboard}
          initialData={billboardDetail}
        />
      )}
    </div>
  );
};

export default BillboardId;
