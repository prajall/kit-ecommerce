import { uploadOnCloudinary } from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { productId: string } }
) {
  const { productId } = params;

  if (!productId) {
    return new NextResponse("No Product Id", { status: 400 });
  }
  try {
    const response = await prisma.product.findUnique({
      where: { id: productId },
    });
    if (!response) {
      return new NextResponse("Product not found", { status: 404 });
    }
    return NextResponse.json(response);
  } catch (error) {
    console.log("Error fetching Product.", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { productId: string } }
) {
  const { productId } = params;

  const formData = await request.formData();
  const title = formData.get("title")?.toString();
  const description = formData.get("description")?.toString();
  const price = formData.get("price")
    ? parseFloat(formData.get("price")!.toString())
    : undefined;
  const image = formData.get("image") as unknown as File;
  const category = formData.getAll("category").map((cat) => cat.toString());

  // Ensure admin check is done here
  const isAdmin = true;
  if (!isAdmin) {
    return new NextResponse(
      "You do not have the permission to perform this action",
      { status: 403 }
    );
  }

  if (!productId) {
    return new NextResponse("Product ID is required", { status: 400 });
  }

  const existingProduct = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!existingProduct) {
    return new NextResponse("Product not found", { status: 404 });
  }

  let newImage = null;
  if (image.size > 10485760) {
    return new NextResponse("Image size must be less than 10 mb");
  }
  if (image) {
    try {
      const imageResponse: any = await uploadOnCloudinary(image, "product");
      console.log(imageResponse);
      newImage = imageResponse.url;
    } catch (error) {
      console.log("Error uploading image: ", error);
      return new NextResponse("Image upload failed", { status: 500 });
    }
  }

  try {
    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: {
        title: title || undefined,
        description: description || undefined,
        price: price !== undefined ? price : undefined,
        category: category.length > 0 ? category : undefined,
        image: newImage || undefined,
      },
    });

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    console.log("Error updating product: ", error);
    return new NextResponse("Something went wrong: Internal Server Error", {
      status: 500,
    });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { productId: string } }
) {
  const { productId } = params;

  if (!productId) {
    return new NextResponse("Product ID is required", { status: 400 });
  }

  try {
    const deletedProduct = await prisma.product.delete({
      where: { id: productId },
    });

    return NextResponse.json(deletedProduct, { status: 200 });
  } catch (error) {
    console.log("Error deleting product: ", error);
    return new NextResponse("Something went wrong: Internal Server Error", {
      status: 500,
    });
  }
}
