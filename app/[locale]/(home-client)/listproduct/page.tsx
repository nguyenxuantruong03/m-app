"use client";
import Menu from "./menu-list";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

export const revalidate = 86400;

const ListProduct = () => {
  const t = useTranslations()
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    document.title = t("product.listProductTitle");
  }, []);

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
          {t("product.listProduct")}
        </div>
      </div>
    );
  return <>{!isMobile && <Menu />}</>;
};

export default ListProduct;
