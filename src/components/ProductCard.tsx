"use client";
import Link from "next/link";
import React, { useState } from "react";

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
      className="w-full group bg-gray-50 dark:bg-zinc-900 my-4 text-xs md:text-sm py-2 font-semibold"
    >
      <div className="overflow-hidden relative">
        <img
          src={image}
          className=" w-full aspect-[3/4] mx-auto group-hover:scale-105 duration-300 group-hover:blur-sm"
          alt="tshirt"
        />
        <div className="box min-w-[100px] text-center hidden group-hover:flex absolute z-50 top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 border border-white text-white px-3 py-2">
          <p>View Product</p>
        </div>
      </div>
      <div className="p-1">
        <h3 className="  mt-2 text-center" title={name}>
          {shortName}
        </h3>
        {/* <p className="text-muted-foreground text-xs mb-4 " title={underText}>
          {underText}
        </p> */}
        <p className=" mt-2 text-center ">Rs {price}</p>
      </div>

      {/* </div> */}
    </Link>
  );
};

export default ProductCard;
