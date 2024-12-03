"use client"
import BuyProduct from "@/components/(client)/home/buy-product";
import IntroductProduct from "@/components/(client)/home/introduct-product";
import News from "@/components/(client)/home/news";
import OurProject from "@/components/(client)/home/our-project";
import OverViewStore from "@/components/(client)/home/overview-store";
import SellingProduct from "@/components/(client)/home/selling-product";
import Service from "@/components/(client)/home/service";
import Slider from "@/components/(client)/home/slider";
import Marquees from "@/components/(client)/home/marquee";
import Story from "@/components/(client)/home/story";
import dynamic from "next/dynamic";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useEffect, useState } from "react";

const MapAPI = dynamic(() => import("@/components/(client)/leaflet-map/leaflet-map"), {
  ssr: false,
});
const HomePage = () => {
  const user = useCurrentUser();
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
          user?.id && user?.role !== "GUEST" ? user?.language : storedLanguage || "vi";

  return (
    <>
      <Slider/>
      <Story/>
      <Service/>
      <IntroductProduct/>
      <SellingProduct/>
      <OurProject/>
      <OverViewStore/>
      <BuyProduct />
      <News />
      <MapAPI />
      <Marquees/>
    </>
  );
};
export default HomePage;
