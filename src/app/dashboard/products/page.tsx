"use client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Header from "../(components)/Header";
import { DataTable } from "../(components)/DataTable";
import { columns } from "./columns";
import { ProductProp } from "@/types";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/router";

const Products = () => {
  const router = useRouter();
  const products: ProductProp[] = [
    {
      id: "1",
      category: ["mens"],
      description: "This is a product",
      price: 1200,
      title: "Maroon Designer Shirt",
      imageUrl: "hsdhfsjdf",
    },
  ];
  const handleAddNew = () => {
    router.push("/dashboard/products/new");
  };

  return (
    <div>
      <div className="flex justify-between py-3 items-center ">
        <Header title="Products" description="Manage your store's products" />

        <Button
          variant={"default"}
          className="flex gap-1 p-0 md:px-4 md:py-2 aspect-square md:aspect-auto rounded-full"
          onClick={handleAddNew}
        >
          <Plus size={16} />
          <span className="hidden md:flex">Add New Product</span>
        </Button>
      </div>
      <DataTable columns={columns} data={products} isFetching={false} />
    </div>
  );
};

export default Products;
