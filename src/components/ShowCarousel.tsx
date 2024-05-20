import React from "react";
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

const ShowCarousel = () => {
  return (
    <Carousel className="">
      <CarouselPrevious />
      <CarouselContent className="shadow-lg ">
        <CarouselItem>
          <Image
            src={
              "https://dkemhji6i1k0x.cloudfront.net/000_clients/84990/page/84990F5y57DsP.jpg"
            }
            width={900}
            height={270}
            alt="ImageBanner"
            className="w-full "
          />
        </CarouselItem>

        <CarouselItem>
          <Image
            src={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj0ZaFLeA044RXhcBP2ry1-lGKYH9w8x-D7Y1GaAI0Cg&s"
            }
            width={900}
            height={270}
            alt="ImageBanner"
            className="w-full aspect-[10/3]"
          />
        </CarouselItem>
        <CarouselItem>
          <Image
            src={
              "https://dkemhji6i1k0x.cloudfront.net/000_clients/84990/page/84990yNL7ADjD.jpg"
            }
            width={900}
            height={270}
            alt="ImageBanner"
            // width={700}
            // height={350}
            className="w-full aspect-[10/3]"
          />
        </CarouselItem>
      </CarouselContent>
      <CarouselNext />
    </Carousel>
  );
};

export default ShowCarousel;
