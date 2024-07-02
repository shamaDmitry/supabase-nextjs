import React from "react";
import CuboidIcon from "@/components/icons/CuboidIcon";
import Link from "next/link";

const Logo = () => {
  return (
    <Link
      href="/"
      className="bg-primary rounded-lg w-10 h-10 flex items-center justify-center"
    >
      <CuboidIcon className="w-5 h-5 text-primary-foreground" />
    </Link>
  );
};

export default Logo;
