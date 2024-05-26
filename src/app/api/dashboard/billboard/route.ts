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
  if (!label || !image || !showDate || !endDate) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 }
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
    console.log(mongodbResponse);
    return new NextResponse("Billboard uploaded successfully", { status: 200 });
  } catch (error) {
    console.log("billboard route error: ", error);
    return new NextResponse("Something went wrong");
  }
}

export async function GET() {
  try {
    const billboards = await prisma.billboard.findMany();
    return NextResponse.json({ data: billboards }, { status: 200 });
  } catch (error) {
    console.error("Error fetching billboards:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
