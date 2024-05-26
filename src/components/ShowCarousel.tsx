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
    setBillboards(response.data.data);
  };

  useEffect(() => {
    fetchBillboards();
  }, []);

  return (
    <Carousel className="">
      <CarouselPrevious />
      <CarouselContent className="shadow-lg ">
        <CarouselItem>
          <img
            src="https://marketplace.canva.com/EAFm8iOoAwE/2/0/1600w/canva-beige-aesthetic-fashion-billboard-6ClZyJWO5cA.jpg"
            width={"900"}
            height={"300"}
            alt="ImageBanner"
            className="w-full"
          />
        </CarouselItem>
        {billboards.map((billboard) => (
          <CarouselItem>
            <img
              src={billboard.imageUrl}
              width={"900"}
              height={"300"}
              alt="ImageBanner"
              className="w-full"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselNext />
    </Carousel>
  );
};

export default ShowCarousel;
