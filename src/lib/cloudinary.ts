import { v2 as cloudinary } from "cloudinary";
import { fstatSync } from "fs";
import fs from "fs";

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
      console.log("inside promise");
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
