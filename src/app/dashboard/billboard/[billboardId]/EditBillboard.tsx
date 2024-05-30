//@ts-nocheck
"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useRef, useState, useEffect } from "react";
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
import { toast } from "react-toastify";
import { BillboardProp } from "../page";

const formSchema = z.object({
  label: z.string().min(2).max(50),
  image: z.instanceof(File).optional(),
  showDate: z.date(),
  endDate: z.date(),
});

const EditBillboardForm: React.FC<BillboardFormProps> = ({
  onSubmitBillboardForm,
  initialData,
}) => {
  const [initialImage, setInitialImage] = useState<File | null>(
    initialData.image
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropzoneRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      endDate: initialData.endDate,
      label: initialData.label,
      showDate: initialData ? initialData.showDate : new Date(),
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("submitting");
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("image", values.image);
    formData.append("label", values.label);
    formData.append("showDate", values.showDate);
    formData.append("endDate", values.endDate);

    console.log(formData);

    try {
      const response = await axios.patch(
        `/api/dashboard/billboard/${initialData.id}`,
        formData
      );
      console.log("Billboard Updated successfully:", response);

      if (response.status == 200) {
        toast.success("Billboard Updated Successfully");
        router.push("/dashboard/billboard");
      }
    } catch (error) {
      toast.error("Failed to Update Billboard");
      console.error("EditBillboardForm ERROR: ", error);
    } finally {
      setIsSubmitting(false);
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

  useEffect(() => {
    console.log(initialData);
    setSelectedFile(initialData.image);
  }, []);

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="lg:flex gap-14 space-y-8 lg:space-y-0 mt-4 h-fit">
            <div className="space-y-8 lg:w-1/2">
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
                        className="w-full py-6"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="showDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Start Showing Billboard</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 py-6 text-left font-normal",
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
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Remove Billboard</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 py-6 text-left font-normal",
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
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="lg:w-1/2 min-h-[250px] lg:min-h-full lg:mt-0">
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem className="h-full">
                    <FormLabel>Upload Image for Billboard</FormLabel>
                    <FormControl>
                      <>
                        <div
                          ref={dropzoneRef}
                          onDrop={handleDrop}
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeave}
                          className="border-2 border-dashed p-4 w-full rounded-lg h-full flex flex-col justify-center text-center border-gray-300"
                        >
                          {/* {initialImage && (
                            <img
                              src={window.URL.createObjectURL(initialImage)}
                              alt="Initial Image"
                              className="max-h-[150px]"
                            />
                          )} */}
                          {!selectedFile && (
                            <div>
                              <LuUpload size={70} className="mx-auto" />
                              <input
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
                          <div className="flex gap-1 items-center mt-2">
                            <p>Selected file: </p>
                            <div className="max-w-fit text-sm text-gray-700 border flex gap-2 items-center border-gray-500 py-1 px-2 rounded-full">
                              <p className="max-w-[200px] overflow-hidden whitespace-nowrap">
                                {initialData.label || selectedFile.name}
                              </p>
                              <button
                                onClick={() => {
                                  form.setValue("image", null);
                                  setSelectedFile(null);
                                  setInitialImage(null);
                                  if (fileInputRef.current) {
                                    fileInputRef.current.value = "";
                                  }
                                }}
                              >
                                <IoClose />
                              </button>
                            </div>
                          </div>
                        )}
                      </>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button type="submit" disabled={isSubmitting}>
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
};

export default EditBillboardForm;
