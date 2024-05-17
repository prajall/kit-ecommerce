import Link from "next/link";
import React from "react";
import Search from "./Search";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navlinks = () => {
  const categories = [
    "Electronics",
    "Health & Beauty",
    "Men's Beauty",
    "Women's Beauty",
    "Sports",
    "Groceries",
  ];

  return (
    <>
      <div className=" hidden lg:flex gap-4 mx-auto ">
        <Link href="/">Home</Link>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-1">
            Categories {<MdOutlineKeyboardArrowDown />}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mt-1 p-2">
            {categories.map((category) => {
              return (
                <DropdownMenuItem className="cursor-pointer my-2 pr-3">
                  <Link href={`/category/${category}`}>{category}</Link>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>

        <Link href="/">Blog</Link>
        <Link href="/">Contact us</Link>
      </div>
    </>
  );
};

export default Navlinks;
