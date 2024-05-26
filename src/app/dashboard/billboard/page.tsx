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
import toast from "react-hot-toast";
import Header from "../(components)/Header";
import { BillboardProp } from "./types";

const BillboardPage = () => {
  const [billboards, setBillboards] = useState<BillboardProp[]>([]);
  const [fetching, setFetching] = useState(false);

  const router = useRouter();

  const fetchBillboards = async () => {
    setFetching(true);
    try {
      const response = await axios.get("/api/dashboard/billboard");
      const billboards: BillboardProp[] = response.data.data;
      const updatedBillboards = billboards.map((billboard) => {
        return {
          ...billboard,
          createdAt: format(billboard.createdAt, "P"),
          showDate: format(billboard.createdAt, "P"),
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
    <>
      <div className="space-y-4">
        <div className="flex justify-between py-3 items-center ">
          <Header
            title={`Billboard (${billboards.length})`}
            description="Manage Billboards for you store"
          />
          <Button
            variant={"default"}
            className="flex gap-1 rounded-full"
            onClick={handleAddNew}
          >
            <Plus size={16} />
            Add New Billboard
          </Button>
        </div>
        <DataTable columns={columns} data={billboards} isFetching={fetching} />
      </div>
    </>
  );
};

export default BillboardPage;
