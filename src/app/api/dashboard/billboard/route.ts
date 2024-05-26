import { uploadOnCloudinary } from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const label = formData.get("label")?.toString();
  console.log(label);
  const image = formData.get("image") as unknown as File;
  if (!label || !image) {
    return NextResponse.json(
      { message: "Image and Label are required" },
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
    return NextResponse.json({ body: billboards }, { status: 200 });
  } catch (error) {
    console.error("Error fetching billboards:", error);
    return { status: 500, body: { error: "Internal Server Error" } };
  }
}
