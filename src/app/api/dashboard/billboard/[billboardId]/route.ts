//@ts-nocheck
import { isAdmin } from "@/lib/authMiddleware";
import { deleteFromCloudinary, uploadOnCloudinary } from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: { billboardId: string } }
) {
  const url = new URL(request.url);
  const billboardId = url.pathname.split("/").pop();
  if (!billboardId) {
    return new NextResponse("Please provide Billboard Id", { status: 400 });
  }

  try {
    const billboard = await prisma.billboard.findFirst({
      where: { id: billboardId },
    });
    if (!billboard) {
      return NextResponse.json("Billboard Not Found", { status: 404 });
    }

    const deletedBillboard = await prisma.billboard.delete({
      where: { id: String(billboard.id) },
    });
    const deleteResponse = await deleteFromCloudinary(billboard.publicId);

    return NextResponse.json("Billboard deleted successfully.", {
      status: 200,
    });
  } catch (error) {
    console.log("DELETE error: ", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(
  request: Request,
  { params }: { params: { billboardId: string } }
) {
  //alternate to getting params because params is not working
  const url = new URL(request.url);
  const billboardId = url.pathname.split("/").pop();
  console.log(billboardId);

  try {
    const billboard = await prisma.billboard.findFirst({
      where: { id: billboardId },
    });
    console.log(billboard);

    if (!billboard) {
      return new NextResponse("Billboard Not Found", { status: 404 });
    }

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("GET error: ", error);
    return NextResponse.json(
      "An error occurred while fetching the billboard.",
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { billboardId: string } }
) {
  console.log("patchRequest made");
  const { searchParams } = new URL(request.url);
  // const billboardId = searchParams.get("billboardId");
  const billboardId = params.billboardId;
  console.log(billboardId);

  if (!billboardId) {
    return new NextResponse("Billboard ID is required", { status: 400 });
  }

  const formData = await request.formData();
  const label = formData.get("label")?.toString();
  const showDate = formData.get("showDate")?.toString();
  const endDate = formData.get("endDate")?.toString();
  const image: File | null = formData.get("image") as unknown as File;

  console.log("PATCH REQUEST DATAS:", label, showDate, endDate, typeof image);
  console.log(image);
  if (!label && !image && !showDate && !endDate) {
    return new NextResponse("At least one field is required for update", {
      status: 400,
    });
  }

  if (!isAdmin) {
    return new NextResponse(
      "You do not have the permission to perform this action",
      { status: 403 }
    );
  }

  try {
    let imageUrl, publicId;

    const existingBillboard = await prisma.billboard.findFirst({
      where: { id: billboardId },
    });

    if (!existingBillboard) {
      return new NextResponse("Billboard Not Found", { status: 404 });
    }
    console.log("IMAGE ON PATCH ROUTE: ", image);
    if (typeof image != "File") {
      console.log("Delete on cloudinary executed");
      const deleteResponse = await deleteFromCloudinary(
        existingBillboard.publicId
      );
      console.log(deleteResponse);

      console.log("UPload on cloudinary executed");
      const response: any = await uploadOnCloudinary(image, "billboard");
      console.log(response);
      imageUrl = response.url;
      publicId = response.public_id;
    }

    const updateData: any = {};
    if (label) updateData.label = label;
    if (showDate) updateData.showDate = showDate;
    if (endDate) updateData.endDate = endDate;
    if (imageUrl && publicId) {
      updateData.imageUrl = imageUrl;
      updateData.publicId = publicId;
    }

    const updatedBillboard = await prisma.billboard.update({
      where: { id: billboardId },
      data: updateData,
    });

    if (!updatedBillboard) {
      return new NextResponse("Failed to update billboard", { status: 500 });
    }

    return NextResponse.json(updatedBillboard);
  } catch (error) {
    console.log("billboard route error: ", error);
    return new NextResponse("Something went wrong: Internal Server Error", {
      status: 500,
    });
  }
}
