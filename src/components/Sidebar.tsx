"use client";
import Link from "next/link";
import React from "react";
import { MdOutlineSportsBasketball } from "react-icons/md";
import { IoMale } from "react-icons/io5";
import { IoFemale } from "react-icons/io5";
import { GiConverseShoe } from "react-icons/gi";
import { PiShirtFolded } from "react-icons/pi";
import { GiAmpleDress } from "react-icons/gi";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const categories = [
    { title: "Mens", icon: IoMale },
    { title: "Womens", icon: IoFemale },
    { title: "Shoes", icon: GiConverseShoe },
    { title: "Shirts", icon: PiShirtFolded },
    { title: "Sports", icon: MdOutlineSportsBasketball },
  ];

  const options = [
    {
      value: "price",
      label: "Price",
    },
    {
      value: "price",
      label: "Price",
    },
    {
      value: "price",
      label: "Price",
    },
  ];

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  return (
    <div className="hidden md:flex flex-col w-40 h-full border-r border-gray-200 px-2 fixed pt-4 ">
      <p className="text-muted-foreground mb-2">Categories</p>
      <div className="cursor-pointer w-full ml-3">
        <Link href={"/category/mens"} className="flex gap-1 items-center">
          <IoMale size={16} />
          <p className="py-2 my-1">Mens</p>
        </Link>
        <Link href={"/category/womens"} className="flex gap-1 items-center">
          <GiAmpleDress size={16} />
          <p className="py-2 my-1">Womens</p>
        </Link>
        <Link href={"/category/shoes"} className="flex gap-1 items-center">
          <GiConverseShoe size={16} />
          <p className="py-2 my-1">Shoes</p>
        </Link>
        <Link href={"/category/shirts"} className="flex gap-1 items-center">
          <PiShirtFolded size={16} />
          <p className="py-2 my-1">Shirts</p>
        </Link>
        <Link href={"/category/sports"} className="flex gap-1 items-center">
          <MdOutlineSportsBasketball size={16} />
          <p className="py-2 my-1">Sports</p>
        </Link>
      </div>
      <p className="text-muted-foreground mt-4 mb-2">Filters</p>
      <div className="ml-3">Sort By</div>
      <div></div>
    </div>
  );
};

export default Sidebar;
