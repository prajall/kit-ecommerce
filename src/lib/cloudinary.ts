import { v2 as cloudinary } from "cloudinary";
import { fstatSync } from "fs";
import fs from "fs";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadOnCloudinary = async (file: File, folder: string) => {
  try {
    const buffer = await file.arrayBuffer();
    const bytes = Buffer.from(buffer);

    return new Promise(async (resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { resource_type: "image", folder },
          async (err, result) => {
            if (err) {
              reject(err.message);
            } else resolve(result);
          }
        )
        .end(bytes);
    });
  } catch (error) {
    console.log("uploadOnCloudinary error: ", error);
  }
};
export const deleteFromCloudinary = async (publicId: string) => {
  try {
    if (!publicId) {
      throw new Error("Invalid publicId provided");
    }

    const response = await cloudinary.uploader.destroy(publicId);

    if (response.result !== "ok") {
      throw new Error(`Failed to delete the image: ${response.result}`);
    }

    console.log("Deleted response: ", response);
    return (
      NextResponse.json({ message: "Billboard Deleted Successfully" }),
      { status: 200 }
    );
  } catch (error: any) {
    console.error("cloudinary.ts error: ", error);

    return (
      NextResponse.json({
        message: error.message || "Couldnot Delete Billboard",
      }),
      {
        status: 500,
      }
    );
  }
};
