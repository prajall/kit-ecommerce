"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import homepageImage from "../../public/homepageImage.png";
import { Button } from "@/components/ui/button";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { FaArrowRight } from "react-icons/fa";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import axios from "axios";
import { BillboardProp } from "@/app/dashboard/billboard/types";

const ShowCarousel = () => {
  const [billboards, setBillboards] = useState<BillboardProp[]>([]);

  const fetchBillboards = async () => {
    const response = await axios.get("/api/dashboard/billboard");
    console.log(response);
    setBillboards(response.data);
  };

  useEffect(() => {
    console.log("fetching billboards");
    fetchBillboards();
    console.log(billboards);
  }, []);

  return (
    <Carousel className="relative">
      <CarouselPrevious className="absolute top-1/2 left-2 z-10 -translate-y-1/2 bg-opacity-50 " />
      <CarouselContent className="shadow-lg">
        <CarouselItem>
          <img
            src="https://marketplace.canva.com/EAFm8iOoAwE/2/0/1600w/canva-beige-aesthetic-fashion-billboard-6ClZyJWO5cA.jpg"
            alt="ImageBanner"
            className="w-full  mx-auto"
          />
        </CarouselItem>
        {billboards.map((billboard) => (
          <CarouselItem key={billboard.id}>
            <img
              src={billboard.imageUrl}
              alt="ImageBanner"
              className="w-full mx-auto"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselNext className="absolute top-1/2 right-2 z-10 -translate-y-1/2 bg-opacity-10  " />
    </Carousel>
  );
};

export default ShowCarousel;
