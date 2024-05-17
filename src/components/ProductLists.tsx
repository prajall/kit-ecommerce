import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Button } from "./ui/button";
import { link } from "fs";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import Link from "next/link";

const ProductLists = ({
  title,
  link,
  children,
}: {
  children: React.ReactNode;
  title: string;
  link: string;
}) => {
  return (
    <div className="py-20">
      <div className="flex justify-between">
        <h2 className="text-lg font-semibold mb-6 ">{title}</h2>
        <Link href={`/category/${link}`}>
          <Button variant="link">
            See all collection <MdOutlineKeyboardArrowRight />
          </Button>
        </Link>
      </div>
      <div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3  gap-2">
        {children}
      </div>
    </div>
  );
};

export default ProductLists;
