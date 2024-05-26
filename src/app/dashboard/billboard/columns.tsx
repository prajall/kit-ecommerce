"use client";

import { ColumnDef } from "@tanstack/react-table";
import { BillboardProp } from "./page";
import Link from "next/link";

export const columns: ColumnDef<BillboardProp>[] = [
  {
    accessorKey: "imageUrl",
    header: "Image",
    cell: ({ row }) => {
      const image: string = row.getValue("imageUrl");
      return <img src={image} className="max-h-10" alt="Billboard" />;
    },
  },
  {
    accessorKey: "label",
    header: "Label",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
];
