"use client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Header from "../(components)/Header";
import { DataTable } from "../(components)/DataTable";
import { columns } from "./columns";
import { ProductProp } from "@/types";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

const Products = () => {
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [products, setProducts] = useState<ProductProp[]>([]);

  const router = useRouter();

  const handleAddNew = () => {
    router.push("/dashboard/products/new");
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/dashboard/product"
      );
      setProducts(response.data);
    } catch (error) {
      console.log("Error fetching Products: ", error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <div className="flex justify-between py-3 items-center">
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
      <DataTable
        columns={columns}
        data={products}
        isFetching={isFetching}
        loadingText="Loading Products..."
      />
    </div>
  );
};

export default Products;
