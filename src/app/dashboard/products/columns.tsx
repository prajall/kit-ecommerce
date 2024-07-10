"use client";

import { ProductProp } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<ProductProp>[] = [
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const image: string = row.original.image || "";
      console.log(row);
      return <img src={image} className="max-h-10" alt="Product" />;
    },
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => {
      const link: string = row.original.id;
      return <p>...</p>;
    },
  },
];
