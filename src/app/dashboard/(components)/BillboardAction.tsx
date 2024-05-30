"use client";
import { cn } from "@/lib/utils";
import axios from "axios";
import e from "express";
import { Edit, Trash } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaTruckLoading } from "react-icons/fa";

const BillboardAction = ({ billboardId }: { billboardId: string }) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteBillboard = async () => {
    setIsDeleting(true);
    try {
      const deletedBillboard = await axios.delete(
        `/api/dashboard/billboard/${billboardId}`
      );
      console.log(deletedBillboard);
      toast.success("Billboard Deleted Successfully");
      router.refresh();
    } catch (error) {
      toast.error("Failed to delete Billboard");
      console.log("/deleteBillboard.tsx DELETE BILLBOARD: ", error);
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <div className="items-center flex ">
      <Link
        href={`/dashboard/billboard/${billboardId}`}
        className="bg-opacity-0 flex items-center hover: p-1 rounded"
        title="Edit Billboard"
      >
        <Edit size={17} />
      </Link>
      <button
        className="bg-opacity-0 flex items-center  p-1 rounded"
        title="Delete Billboard"
        onClick={deleteBillboard}
        disabled={isDeleting}
      >
        <Trash size={17} className={cn(isDeleting ? "opacity-50" : "")} />
      </button>
    </div>
  );
};

export default BillboardAction;
