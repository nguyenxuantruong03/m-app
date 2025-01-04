"use client";
import { ArrowDown, ChevronsRight } from "lucide-react";
import "./index.scss";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

const BuyProduct = () => {
  const t = useTranslations()
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
 
  const handleClickProduct = () => {
    router.push("/home-product");
  };
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <div className="buyproduct-image">
      <div className="absolute w-full py-10 md:py-24">
        <p className="text-center uppercase  font-bold text-xl md:text-4xl text-[#ec2f4b]">
          {t("home.beautifyHomeYou")}
        </p>
        <p className="text-2xl text-center font-semibold my-5 text-white break-words px-8">
          {t("home.qualityAndTrust")}
        </p>

        <p className="flex items-center justify-center text-center text-lg font-semibold">
          {t("home.startShopping")}
          <div className="arrow bounce">
            <ArrowDown className="w-8" />
          </div>
        </p>
        <Button
          onClick={handleClickProduct}
          className="flex items-center justify-center mt-5 mx-auto"
        >
          {t("home.buyHere")} <ChevronsRight className="w-10" />
        </Button>
      </div>
    </div>
  );
};

export default BuyProduct;
