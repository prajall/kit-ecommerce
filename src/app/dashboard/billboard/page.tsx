"use client";
import { Button } from "@/components/ui/button";
import { isAdmin } from "@/lib/authMiddleware";
import axios from "axios";
import { format } from "date-fns";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DataTable } from "../(components)/DataTable";
import Header from "../(components)/Header";
import { BillboardProp } from "../../../types";
import { columns } from "./columns";

const BillboardPage = () => {
  const [billboards, setBillboards] = useState<BillboardProp[]>([]);
  const [fetching, setFetching] = useState(false);

  const router = useRouter();

  const fetchBillboards = async () => {
    setFetching(true);
    try {
      const response = await axios.get("/api/dashboard/billboard");
      const billboards: BillboardProp[] = response.data;
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

  const handleAddNew = () => {
    router.push("/dashboard/billboard/new");
  };

  useEffect(() => {
    isAdmin();
  }, []);

  return (
    <>
      <div className="">
        <div className="flex justify-between py-3 items-center ">
          <Header
            title={`Billboards (${billboards.length})`}
            description="Manage Billboards for you store"
          />

          <Button
            variant={"default"}
            className="flex gap-1 p-0 md:px-4 md:py-2 aspect-square md:aspect-auto rounded-full"
            onClick={handleAddNew}
          >
            <Plus size={16} />
            <span className="hidden md:flex">Add New Billboard</span>
          </Button>
        </div>
        <DataTable columns={columns} data={billboards} isFetching={fetching} />
      </div>
    </>
  );
};

export default BillboardPage;
