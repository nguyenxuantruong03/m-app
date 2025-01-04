"use client"
import Link from "next/link";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { useState,useEffect } from "react";

const font = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const Logo = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  if (!isMounted) {
    return null;
  }
  
  return (
      <Link href="/home-product">
        <div className="hidden xl:block">
          <Image
            alt=""
            src="/images/logo-custom.png"
            width="140"
            height="30"
            className="rounded-sm hover:opacity-75 transition"
          />
        </div>
        <div className="block xl:hidden">
          <Image
            alt=""
            src="/images/logo-mini.png"
            width="45"
            height="30"
            className="rounded-sm bg-[#c3c3c3] py-1.5 px-2.5"
          />
        </div>
      </Link>
  );
};
