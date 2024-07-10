import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Make sure to adjust the import according to your project structure
import { uploadOnCloudinary } from "@/lib/cloudinary"; // Adjust according to your project structure

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const title = formData.get("title")?.toString();
  const description = formData.get("description")?.toString();
  const price = parseFloat(formData.get("price")?.toString() || "0");
  const image = formData.get("image") as unknown as File;
  const categoryString = formData.get("category")?.toString();
  const category = categoryString?.split(",") || [];

  console.log(title, description, price, typeof image, category);

  if (!title || !description || !image || !price || category.length === 0) {
    return new NextResponse("All fields are required", { status: 404 });
  }

  // Ensure admin check is done here
  const isAdmin = true;
  if (!isAdmin) {
    return new NextResponse(
      "You do not have the permission to perform this action",
      { status: 403 }
    );
  }

  if (image.size > 10485760) {
    return new NextResponse("Image size must be less than 10 mb");
  }
  try {
    const response: any = await uploadOnCloudinary(image, "product");
    console.log(response);

    const mongodbResponse = await prisma.product.create({
      data: {
        title: title,
        description: description,
        price: price,
        image: response.url,
        category: category,
      },
    });

    if (!mongodbResponse) {
      return new NextResponse("Failed to upload product", { status: 500 });
    }
    return NextResponse.json(mongodbResponse);
  } catch (error) {
    console.log("product route error: ", error);
    return new NextResponse("Something went wrong: Internal Server Error", {
      status: 500,
    });
  }
}

export async function GET(request: NextRequest) {
  try {
    const products = await prisma.product.findMany();
    return NextResponse.json(products);
  } catch (error) {
    console.log("Error fetching products: ", error);
    return new NextResponse("Something went wrong: Internal Server Error", {
      status: 500,
    });
  }
}
