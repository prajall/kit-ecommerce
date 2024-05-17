"use client";
import image1 from "../../public/products/women1.jpeg";
import React, { useState } from "react";
import Image from "next/image";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import Link from "next/link";
import { motion } from "framer-motion";
import dummyProducts from "@/products";
import {
  Antic_Didone,
  Belleza,
  Della_Respira,
  Eagle_Lake,
  Italiana,
  Josefin_Sans,
  Marcellus,
  Poppins,
} from "next/font/google";
import { cn } from "@/lib/utils";

interface ProductCard {
  id: string;
  image: string;
  name: string;
  underText: string;
  price: number;
}

interface ProductProp {
  Product: ProductCard;
}

const ProductCard: React.FC<ProductProp> = ({ Product }) => {
  const { image, name, price, underText, id } = Product;

  const [isFav, setIsFav] = useState(false);

  let shortName = name;
  if (name.length > 40) {
    shortName = name.substring(0, 40) + "...";
  }

  return (
    <Link
      href={`/product/${id}`}
      className="w-full group bg-gray-50 dark:bg-zinc-900 my-4 py-2 font-semibold"
    >
      <div className="overflow-hidden relative">
        <img
          src={image}
          className=" w-full aspect-[3/4] mx-auto group-hover:scale-105 duration-300 group-hover:blur-sm"
          alt="tshirt"
        />
        <div className="box hidden group-hover:flex absolute z-50 top-[45%] left-[50%] translate-x-[-50%] border border-white text-white px-3 py-2">
          View Product
        </div>
      </div>
      <div className="p-1">
        <h3 className="  mt-2 text-center" title={name}>
          {shortName}
        </h3>
        {/* <p className="text-muted-foreground text-xs mb-4 " title={underText}>
          {underText}
        </p> */}
        <p className=" mt-2 text-center text-sm">Rs {price}</p>
      </div>

      {/* </div> */}
    </Link>
  );
};

export default ProductCard;
