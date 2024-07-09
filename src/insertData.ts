import { prisma } from "./lib/prisma";
import { faker } from "@faker-js/faker";

const generateRandomProducts = async (numProducts: number) => {
  const products = [];
  const categoryOptions = ["men", "women", "shoes", "shirt", "pant"];

  for (let i = 0; i < numProducts; i++) {
    const product = {
      price: parseFloat(faker.commerce.price(100, 1000)),
      category: "Fashion",
    };
    products.push(product);
  }

  console.log(`${numProducts} products inserted.`);
  return products;
};
