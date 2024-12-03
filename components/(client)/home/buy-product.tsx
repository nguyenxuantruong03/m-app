"use client";
import { ArrowDown, ChevronsRight } from "lucide-react";
import "./index.scss";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  translateBeautifyHomeYou,
  translateBuyHere,
  translateQualityAndTrust,
  translateStartShopping,
} from "@/translate/translate-client";
import { useCurrentUser } from "@/hooks/use-current-user";

const BuyProduct = () => {
  const user = useCurrentUser();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [storedLanguage, setStoredLanguage] = useState<string | null>(null);

  useEffect(() => {
    // Check if we're running on the client side
    if (typeof window !== "undefined") {
      const language = localStorage.getItem("language");
      setStoredLanguage(language);
    }
  }, []);

  //language
  const languageToUse =
    user?.id && user?.role !== "GUEST"
      ? user?.language
      : storedLanguage || "vi";
  const beautifyHomeYouMessage = translateBeautifyHomeYou(languageToUse);
  const qualityAndTrustMessage = translateQualityAndTrust(languageToUse);
  const startShoppingMessage = translateStartShopping(languageToUse);
  const buyHereMessage = translateBuyHere(languageToUse);

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
          {beautifyHomeYouMessage}
        </p>
        <p className="text-2xl text-center font-semibold my-5 text-white break-words px-8">
          {qualityAndTrustMessage}
        </p>

        <p className="flex items-center justify-center text-center text-lg font-semibold">
          {startShoppingMessage}
          <div className="arrow bounce">
            <ArrowDown className="w-8" />
          </div>
        </p>
        <Button
          onClick={handleClickProduct}
          className="flex items-center justify-center mt-5 mx-auto"
        >
          {buyHereMessage} <ChevronsRight className="w-10" />
        </Button>
      </div>
    </div>
  );
};

export default BuyProduct;
