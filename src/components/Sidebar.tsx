"use client";
import Link from "next/link";
import React from "react";
import { MdOutlineSportsBasketball } from "react-icons/md";
import { IoMale } from "react-icons/io5";
import { IoFemale } from "react-icons/io5";
import { GiConverseShoe } from "react-icons/gi";
import { PiShirtFolded } from "react-icons/pi";

const Sidebar = () => {
  const categories = [
    { title: "Mens", icon: <IoMale size={20} /> },
    { title: "Womens", icon: <IoFemale size={16} /> },
    { title: "Shoes", icon: <GiConverseShoe size={16} /> },
    { title: "Shirts", icon: <PiShirtFolded size={16} /> },
    { title: "Sports", icon: <MdOutlineSportsBasketball size={16} /> },
  ];
  return (
    <div className="hidden md:flex flex-col w-40 h-full border-r border-gray-200 px-2 fixed pt-4 ">
      <p className="text-muted-foreground mb-2">Categories</p>
      <div className="cursor-pointer w-full ml-3">
        {categories.map((category) => (
          <Link
            href={"/category/mens"}
            className="flex gap-1 items-center"
            key={category.title}
          >
            {category.icon}
            <p className="py-2 my-1">{category.title}</p>
          </Link>
        ))}
      </div>
      <p className="text-muted-foreground mt-4 mb-2">Filters</p>
      <div className="ml-3">Sort By</div>
      <div></div>
    </div>
  );
};

export default Sidebar;
