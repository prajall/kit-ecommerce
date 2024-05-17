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
    <div className="h-16 sticky py-10 flex justify-between items-center">
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
