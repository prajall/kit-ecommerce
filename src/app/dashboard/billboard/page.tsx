"use client";
import { Button } from "@/components/ui/button";
import { isAdmin } from "@/lib/authMiddleware";
import axios from "axios";
import { Router } from "express";
import { Plus, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { DataTable } from "../(components)/DataTable";
import { columns } from "./columns";
import { format, formatDate } from "date-fns";

export interface BillboardProp {
  label: string;
  imageUrl: string;
  publicId: string;
  id: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

const BillboardPage = () => {
  const [billboards, setBillboards] = useState<BillboardProp[]>([]);
  const [fetching, setFetching] = useState(false);

  const router = useRouter();

  const fetchBillboards = async () => {
    setFetching(true);
    try {
      const response = await axios.get("/api/dashboard/billboard");
      const billboards: BillboardProp[] = response.data.body;
      const updatedBillboards = billboards.map((billboard) => {
        return {
          ...billboard,
          createdAt: format(billboard.createdAt, "P"),
          updatedAt: format(billboard.updatedAt, "P"),
        };
      });
      setBillboards(updatedBillboards);
    } catch (error) {
      console.error("Error fetching billboards:", error);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchBillboards();
  }, []);

  const handleDelete = async (billboardId: string) => {
    console.log(billboardId);
    try {
      const response = await axios.delete(
        `/api/dashboard/billboard/${billboardId}`
      );
      console.log(response);
      if (response.status == 200) {
        const filteredBillboards = billboards.filter(
          (billboard) => billboard.id !== billboardId
        );
        console.log(filteredBillboards);
        setBillboards(filteredBillboards);
      }
    } catch (error) {
      console.log("delete error: ", error);
    }
  };

  const handleAddNew = () => {
    router.push("/dashboard/billboard/new");
  };

  useEffect(() => {
    isAdmin();
  }, []);

  return (
    <div className="space-y-4 mt-4">
      <div className="flex justify-between py-3 ">
        <h2 className="text-2xl font-semibold">
          Billboards ({billboards.length}){" "}
        </h2>
        <Button
          variant={"secondary"}
          className="flex gap-1 bg-blue-600 text-white hover:bg-blue-500 hover:text-white rounded-full"
          onClick={handleAddNew}
        >
          <Plus size={16} />
          Add New Billboard
        </Button>
      </div>
      <DataTable columns={columns} data={billboards} isFetching={fetching} />
    </div>
  );
};

export default BillboardPage;
