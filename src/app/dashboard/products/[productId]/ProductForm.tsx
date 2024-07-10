//@ts-nocheck

"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import React, { ChangeEvent, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import { LuUpload } from "react-icons/lu";
import { toast } from "react-toastify";
import { z } from "zod";
import Header from "../../(components)/Header";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().min(2).max(50),
  image: z.union([z.instanceof(File), z.null()]),
  category: z.array(z.string()),
  price: z.string(),
});

const ProductForm = ({}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropzoneRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  const categoryOptions = ["men", "women", "tshirt", "pant", "shoes", "shirt"];

  const handleCategorySelection = (category: string) => {
    event?.preventDefault(); // Uncomment if 'event' is being passed and used

    if (!selectedCategories.includes(category)) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      const filteredCategories = selectedCategories.filter(
        (c) => c !== category
      );
      setSelectedCategories(filteredCategories);
    }
    form.setValue("category", selectedCategories);
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.group(values);
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("image", values.image);
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("price", values.price);
    formData.append("category", values.category.join(","));
    console.log(formData);

    try {
      const response = await axios.post("/api/dashboard/product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Image uploaded successfully:", response);

      if (response.status == 200) {
        toast.success("Product Uploaded Successfully");
        redirect("/dashboard/products");
      }
    } catch (error) {
      console.error("Error adding Product:", error);
    } finally {
      setIsSubmitting(false);
      // router.push("/dashboard/products");
    }
  }

  const handleFileInput = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      form.setValue("image", file);
    }
  };
  // {(e) => {
  //   setSelectedFile(e.target.files?e.target.files[0]:null);
  //   form.setValue("image",e.target.files?e.target.files[0]:null );
  // }}

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
      <Header title="Add new Product" description="" />
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
          <div className="lg:flex gap-14 space-y-8 lg:space-y-0 mt-4 h-fit">
            <div className="space-y-8 lg:w-1/2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Eg: Maroon Designer Tshirt"
                        {...field}
                        className="w-full py-6 "
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Description</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Eg: A stylish and comfortable maroon designer t-shirt "
                        {...field}
                        className="w-full py-6 "
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-2 justify-between">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="price"
                          {...field}
                          className="w-48 py-6 "
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Categories{" "}
                        <span className="text-muted-foreground text-xs">
                          (Click to Select)
                        </span>
                      </FormLabel>
                      <FormControl>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-1">
                          {categoryOptions.map((category) => (
                            <button
                              onClick={() => {
                                handleCategorySelection(category);
                              }}
                              key={category}
                              className={cn(
                                selectedCategories.includes(category)
                                  ? "bg-gray-950 text-white"
                                  : "",
                                "w-24 border border-gray-600 rounded-full px-2"
                              )}
                            >
                              <span className="flex gap-1 items-center justify-center">
                                {category}
                                {selectedCategories.includes(category) && (
                                  <Check size={12} />
                                )}
                              </span>
                            </button>
                          ))}
                        </div>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="lg:w-1/2 min-h-[250px] lg:min-h-full lg:mt-0">
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem className="h-full">
                    <FormLabel>Upload Product Image</FormLabel>
                    <FormControl>
                      <>
                        <div
                          ref={dropzoneRef}
                          onDrop={handleDrop}
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeave}
                          className="border-2 border-dashed p-4 w-full rounded-lg h-[20rem] flex flex-col justify-center text-center border-gray-300 "
                        >
                          {!selectedFile && (
                            <div>
                              <LuUpload size={70} className="mx-auto" />
                              <>
                                <Input
                                  placeholder="shadcn"
                                  {...field}
                                  type="file"
                                  ref={fileInputRef}
                                  className="hidden"
                                  onChange={handleFileInput}
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
                                className="max-h-full max-w-full"
                              />
                            </>
                          )}
                        </div>
                        {selectedFile && (
                          <div className="flex gap-1 items-center mt-2">
                            <p>Selected file: </p>
                            <div className="max-w-fit text-sm text-gray-700 border flex gap-2 items-center border-gray-500 py-1 px-2 rounded-full">
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
                          </div>
                        )}
                      </>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button type="submit" disabled={isSubmitting}>
            Add Product
          </Button>
        </form>
      </Form>
    </>
  );
};

export default ProductForm;
