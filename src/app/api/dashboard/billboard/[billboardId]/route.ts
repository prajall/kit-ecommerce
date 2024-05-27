import { deleteFromCloudinary } from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE({ params }: { params: { billboardId: string } }) {
  if (!params.billboardId) {
    return new NextResponse("Please provide Billboard Id", { status: 400 });
  }

  try {
    const billboard = await prisma.billboard.findFirst({
      where: { id: params.billboardId },
    });
    if (!billboard) {
      return NextResponse.json("Billboard Not Found", { status: 404 });
    }

    const deleteResponse = await deleteFromCloudinary(billboard.publicId);

    if (deleteResponse.status > 400) {
      return new NextResponse("Couldnot Delete Billboard Image.", {
        status: 500,
      });
    }

    const deletedBillboard = await prisma.billboard.delete({
      where: { id: String(billboard.id) },
    });
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
