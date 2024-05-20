import { uploadOnCloudinary } from "@/lib/cloudinary";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const formData = await request.formData();

  const image = formData.get("image") as unknown as File;
  try {
    const response = await uploadOnCloudinary(image, "billboard");
    console.log(response);
    return new NextResponse("ok");
  } catch (error) {
    console.log("billboard route error: ", error);
    return new NextResponse("not ok");
  }
}
