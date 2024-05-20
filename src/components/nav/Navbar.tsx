import React from "react";
import MaxWidthWrapper from "../MaxWidthWrapper";

import Image from "next/image";
import Logo from "./Logo";
import NavMenu from "./NavMenu";
import Link from "next/link";
import Navlinks from "./Navlinks";
import Search from "./Search";

const Navbar: React.FC = () => {
  return (
    <div className="h-16 py-10 flex justify-between items-center max-w-screen-2xl fixed top-0 left-1/2 -translate-x-1/2 bg-white w-full px-2.5 sm:px-4 lg:px-8 z-50">
      <div className="flex items-center gap-10">
        <Link href="/">
          <Logo />
        </Link>
        <Navlinks />
      </div>
      {/* <Navlinks /> */}
      <NavMenu />
    </div>
  );
};

export default Navbar;
