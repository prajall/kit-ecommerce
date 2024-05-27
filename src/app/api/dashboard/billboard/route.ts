import { isAdmin } from "@/lib/authMiddleware";
import { uploadOnCloudinary } from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const label = formData.get("label")?.toString();
  const showDate = formData.get("showDate")?.toString();
  const endDate = formData.get("endDate")?.toString();
  const image = formData.get("image") as unknown as File;

  console.log(label, showDate, endDate, typeof image);

  if (!label || !image || !showDate || !endDate) {
    return new NextResponse("All fields are required", { status: 404 });
  }
  if (!isAdmin) {
    return new NextResponse(
      "You donot have the permission to perform this action"
    );
  }
  try {
    const response: any = await uploadOnCloudinary(image, "billboard");
    console.log(response);

    const mongodbResponse = await prisma.billboard.create({
      data: {
        imageUrl: response.url,
        label: label,
        publicId: response.public_id,
        showDate: showDate,
        endDate: endDate,
      },
    });
    if (!mongodbResponse) {
      return new NextResponse("Failed to upload billboard", { status: 500 });
    }
    return NextResponse.json(mongodbResponse);
  } catch (error) {
    console.log("billboard route error: ", error);
    return new NextResponse("Something went wrong: Internal Server Error");
  }
}

export async function GET() {
  try {
    const billboards = await prisma.billboard.findMany();
    return NextResponse.json(billboards);
  } catch (error) {
    console.error("Error fetching billboards:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
