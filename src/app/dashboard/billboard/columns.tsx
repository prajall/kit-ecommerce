"use client";

import { ColumnDef } from "@tanstack/react-table";
import BillboardAction from "../(components)/BillboardAction";
import { BillboardProp } from "./types";

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
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => {
      const link: string = row.original.id;
      return <BillboardAction billboardId={link} />;
    },
  },
];
