import React from "react";
import products from "@/products";
import ProductCard from "./ProductCard";
import ProductLists from "./ProductLists";
import Link from "next/link";

const Mens = () => {
  const mensProducts = products.filter((product) =>
    product.category.includes("mens")
  );

  return (
    <ProductLists title="Men's Collection" link="mens">
      {mensProducts.map((men, index) => {
        return <ProductCard Product={men} key={index} />;
      })}
    </ProductLists>
  );
};

export default Mens;
