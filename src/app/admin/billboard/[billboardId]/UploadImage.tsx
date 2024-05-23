//@ts-nocheck
"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useRef, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { IoClose } from "react-icons/io5";
import { LuUpload } from "react-icons/lu";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  label: z.string().min(2).max(50),
  image: z.instanceof(File),
  showFrom: z.date(),
  endAt: z.date(),
});

const UploadImage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [billboardLabel, setBillboardLabel] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropzoneRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      showFrom: Date.now(),
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  const handleFileInput = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) setSelectedFile(file);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files?.[0];
    if (file) setSelectedFile(file);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    dropzoneRef.current?.classList.add("border-blue-500");
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    dropzoneRef.current?.classList.remove("border-blue-500");
  };

  const handleClickToAdd = () => {
    fileInputRef.current?.click();
  };

  const handleUpload = async () => {
    if (!billboardLabel || !selectedFile) {
      console.log("Billboard and Label are required");
      alert("Billboard and Label are required");
      return;
    }
    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("label", billboardLabel);

    try {
      const response = await axios.post("/api/admin/billboard", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Image uploaded successfully:", response);
      if (response.status == 200) {
        router.push("/admin/billboard");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <>
      <div className="flex flex-col ">
        <h3 className="font-semibold text-lg my-2 mb-6">Add New Billboard</h3>
        <label>Billboard Label:</label>
        <Input
          type="text"
          onChange={(e) => {
            setBillboardLabel(e.target.value);
          }}
          placeholder="label"
          className="max-w-48 my-2"
        />
        <div className="relative border-2 border-dashed p-6 w-full sm:w-[400px] h-[200px] rounded-lg  border-gray-300 flex flex-col justify-center items-center">
          {!selectedFile && (
            <div
              ref={dropzoneRef}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <div>
                <LuUpload size={70} className="mx-auto" />
                <>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileInput}
                  />
                  <p className="mt-4">Drag 'n' drop to upload Image</p>
                  <p className="text-center">
                    or{" "}
                    <span
                      onClick={handleClickToAdd}
                      className="hover:underline text-blue-800 cursor-pointer"
                    >
                      Browse
                    </span>
                  </p>
                </>
              </div>
            </div>
          )}
          {selectedFile && (
            <>
              <img
                src={window.URL.createObjectURL(selectedFile)}
                alt={selectedFile.name}
                className="max-h-[150px]"
              />
            </>
          )}
        </div>
        {selectedFile && (
          <div className="mt-2 max-w-fit text-sm text-gray-700 border flex gap-2 items-center border-gray-500 py-1 px-2 rounded-full">
            <p className="max-w-[200px] overflow-hidden whitespace-nowrap">
              {selectedFile.name}
            </p>
            <button
              onClick={() => {
                setSelectedFile(null);
              }}
            >
              <IoClose />
            </button>
          </div>
        )}
      </div>
      <Button onClick={handleUpload} className="mt-2">
        Upload Billboard
      </Button>
    </>
  );
};

export default UploadImage;
