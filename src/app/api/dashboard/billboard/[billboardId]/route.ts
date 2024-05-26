import { deleteFromCloudinary } from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { billboardId: string } }
) {
  try {
    const billboard = await prisma.billboard.findFirst({
      where: { id: params.billboardId },
    });
    if (!billboard) {
      return NextResponse.json(
        { message: "Billboard Not Found" },
        { status: 404 }
      );
    }

    const deleteResponse = await deleteFromCloudinary(billboard.publicId);
    console.log("Delete Request: ", deleteResponse);

    const deletedBillboard = await prisma.billboard.delete({
      where: { id: String(billboard.id) },
    });
    console.log(deletedBillboard);
    return NextResponse.json(
      { message: "Billboard deleted successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.log("DELETE error: ", error);
  }
  return NextResponse.json({ message: "ok" });
}

export async function GET(
  request: NextRequest,
  { params }: { params: { billboardId: string } }
) {
  try {
    const billboard = await prisma.billboard.findFirst({
      where: { id: params.billboardId },
    });

    if (!billboard) {
      return NextResponse.json(
        { message: "Billboard Not Found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Billboard fetched successfully.", billboard },
      { status: 200 }
    );
  } catch (error) {
    console.log("GET error: ", error);
    return NextResponse.json(
      { message: "An error occurred while fetching the billboard." },
      { status: 500 }
    );
  }
}
