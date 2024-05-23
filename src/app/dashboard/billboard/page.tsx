"use client";
import { Button } from "@/components/ui/button";
import { isAdmin } from "@/lib/authMiddleware";
import axios from "axios";
import { Router } from "express";
import { Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface BillboardProp {
  label: string;
  imageUrl: string;
  publicId: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

const BillboardPage = () => {
  const [billboards, setBillboards] = useState<BillboardProp[]>([]);
  const [fetching, setFetching] = useState(false);

  const router = useRouter();

  const fetchBillboards = async () => {
    setFetching(true);
    try {
      const response = await axios.get("/api/dashboard/billboard");
      const billboards = response.data.body;
      setBillboards(billboards);
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

  useEffect(() => {
    isAdmin();
  }, []);

  return (
    <div className="space-y-4">
      <div>Edit your Billboards</div>
      <Link href="/dashboard/billboard/new">Add new billboard</Link>
      {fetching && <p>fetching billboards...</p>}
      <div className="flex gap-2">
        {billboards.map((billboard) => {
          return (
            <div key={billboard.id}>
              <Image
                src={billboard.imageUrl}
                alt={billboard.label}
                width="400"
                height="12"
                className=""
              />
              <Button
                className="m-2"
                onClick={() => handleDelete(billboard.id)}
              >
                <Trash /> Delete
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BillboardPage;
