"use client";
import { cn } from "@/lib/utils";
import { Presentation, Settings, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { BsGraphUpArrow } from "react-icons/bs";
import { PiCubeFill } from "react-icons/pi";

interface LinkProp {
  icon: React.ReactNode;
  name: String;
  link: string;
}

const Links: LinkProp[] = [
  {
    icon: <BsGraphUpArrow size={20} />,
    link: "analytics",
    name: "Analytics",
  },
  {
    icon: <Presentation size={20} />,
    link: "billboard",
    name: "Billboards",
  },
  {
    icon: <PiCubeFill size={20} />,
    link: "products",
    name: "Products",
  },
  {
    icon: <ShoppingCart size={20} />,
    link: "orders",
    name: "Orders",
  },
  {
    icon: <Settings size={20} />,
    link: "settings",
    name: "Settings",
  },
];

const DashboardSidebar = () => {
  return (
    <div className="hidden md:flex flex-col w-44 h-full border-r border-gray-200 fixed ">
      <h2 className="text-xl font font-semibold ">Dashboard</h2>
      <div className="space-y-2 mt-6">
        {Links.map((link) => (
          <Link
            href={link.link}
            key={link.link}
            className={cn("flex gap-2 px-4 py-2 hover:bg-gray-100 rounded-md")}
          >
            {link.icon}
            {link.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DashboardSidebar;
