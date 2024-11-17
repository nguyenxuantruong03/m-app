"use client"
import Menu from "./menu-list";
import { useEffect, useState } from "react";

export const revalidate = 86400;

const ListProduct = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth > 640);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize); // Add event listener for resize

    return () => {
      window.removeEventListener("resize", handleResize); // Clean up event listener
    };
  }, []);

  if (isMobile)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center text-xl font-bold text-slate-900 dark:text-slate-200">
          Sorry, this List Product only works on mobile!
        </div>
      </div>
    );
  return <>{!isMobile && <Menu />}</>;
};

export default ListProduct;
