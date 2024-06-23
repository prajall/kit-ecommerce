import React from "react";
import { Button } from "./ui/button";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Logo from "./nav/Logo";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { FiMail } from "react-icons/fi";
import { GrLocation } from "react-icons/gr";

const Footer = () => {
  const thirdColumn = [
    "About Us",
    "Careers",
    "Delivery Policy",
    "Delivery Information",
    "Privacy Policy",
    "Terms and Conditions",
  ];
  const secondColumn = [
    "My Account",
    "Login",
    "My Cart",
    "My Wishlist",
    "Checkout",
  ];
  return (
    <MaxWidthWrapper className="flex text-white mx-auto pt-4 text-xs border-zinc-600 border-t z-50">
      <div className="w-1/4 pr-4">
        <ul>
          <li className="py-1">
            <Logo />
          </li>
          <li className="flex items-center gap-1 py-1">
            <MdOutlinePhoneInTalk size={15} /> 977 9849491221
          </li>
          <li className="flex items-center gap-1 py-1">
            <FiMail size={15} /> krist.support@gmail.com
          </li>
          <li className="flex items-center gap-1 py-1">
            <GrLocation size={20} /> 3891 Ranchvior Dr. Richardson, Californio
            62639
          </li>
        </ul>
      </div>
      <div className="w-1/4 pr-4">
        <p className="font-semibold mb-2">Information</p>
        <ul>
          {secondColumn.map((item) => (
            <li className="py-1">{item}</li>
          ))}
        </ul>
      </div>
      <div className="w-1/4">
        <p className="font-semibold mb-2">Service</p>
        <ul>
          {thirdColumn.map((item) => (
            <li className="py-1 ">{item}</li>
          ))}
        </ul>
      </div>
      <div className="w-1/4">
        <p className="font-semibold mb-2">Subscribe</p>
        <p className="py-2 mb-2">
          Enter your email below to be the first to know about new collections
          and product launches.
        </p>
        <Button
          variant={"outline"}
          className="bg-zinc-950 text-white flex gap-1 "
        >
          <FiMail /> Your Email
        </Button>
      </div>
    </MaxWidthWrapper>
  );
};

export default Footer;
