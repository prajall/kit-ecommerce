"use client";
import React from "react";
import products from "@/products";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import MaxWidthWrapper from "./MaxWidthWrapper";
import ProductLists from "./ProductLists";

const NewProduct = () => {
  return (
    <ProductLists title="New Collections" link="mens">
      {products.map((product, index) => {
        return <ProductCard Product={product} key={index} />;
      })}
    </ProductLists>
  );
};

export default NewProduct;
