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
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";

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
      showFrom: new Date(),
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("values", values);
    const formData = new FormData();
    formData.append("image", values.image);
    formData.append("label", values.label);

    try {
      const response = await axios.post("/api/dashboard/billboard", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Image uploaded successfully:", response);
      if (response.status == 200) {
        router.push("/dashboard/billboard");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  }

  const handleFileInput = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      form.setValue("image", file);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      setSelectedFile(file);
      form.setValue("image", file);
    }
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

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
          <div className="md:flex space-y-8 md:gap-4 md:ml-4 xl:ml-6 ml-0">
            <div className="space-y-8 w-1/2">
              <FormField
                control={form.control}
                name="label"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Billboard Label</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Label"
                        {...field}
                        className="w-full sm:w-[400px]"
                      />
                    </FormControl>
                    <FormDescription>
                      This wont be displayed in the main page
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="showFrom"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Start Showing Billboard</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date("1900-01-01")}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    {/* <FormDescription>
                  Your date of birth is used to calculate your age.
                </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endAt"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Remove Billboard</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date("1900-01-01")}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    {/* <FormDescription>
                  Your date of birth is used to calculate your age.
                </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Upload an Image</FormLabel>
                  <FormControl>
                    <>
                      <div
                        ref={dropzoneRef}
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        className="border-2 border-dashed p-6 w-full sm:w-[400px] h-[200px] rounded-lg  border-gray-300 flex flex-col justify-center items-center"
                      >
                        {!selectedFile && (
                          <div>
                            <LuUpload size={70} className="mx-auto" />
                            <>
                              <input
                                placeholder="shadcn"
                                {...field}
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                              />

                              <p className="mt-4">
                                Drag 'n' drop to upload Image
                              </p>
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
                              form.setValue("image", null);
                              setSelectedFile(null);
                            }}
                          >
                            <IoClose />
                          </button>
                        </div>
                      )}
                    </>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  );
};

export default UploadImage;