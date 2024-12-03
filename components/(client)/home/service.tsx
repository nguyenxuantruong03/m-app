"use client";
import { root } from "@/components/(client)/color/color";
import "./index.scss";
import HeadingEffect from "../uis-home/HeadingEffect";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import {
  translateAlwaysProvideAccessories,
  translateBestPricesForContractors,
  translateCooperateWithBinhMinh,
  translateElectricWire,
  translateFurnitureServices,
  translateHousing,
  translatePlasticPipe,
  translateProject,
  translateSeeMore,
  translateSpecializeInWires,
} from "@/translate/translate-client";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useEffect, useState } from "react";

const Service = () => {
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
    user?.id && user?.role !== "GUEST"
      ? user?.language
      : storedLanguage || "vi";
  const furnitureServiceMessage = translateFurnitureServices(languageToUse);
  const projectMessage = translateProject(languageToUse);
  const bestPriceForContractorMessage =
    translateBestPricesForContractors(languageToUse);
  const housingMessage = translateHousing(languageToUse);
  const alwayProvideAccessoriesMessage =
    translateAlwaysProvideAccessories(languageToUse);
  const electricWideMessage = translateElectricWire(languageToUse);
  const specializeInWiresMessage = translateSpecializeInWires(languageToUse);
  const plasticPipeMessage = translatePlasticPipe(languageToUse);
  const cooperateWithBinhMinhMessage =
    translateCooperateWithBinhMinh(languageToUse);
  const seeMoreMessage = translateSeeMore(languageToUse);

  const router = useRouter();
  const handleClickProduct = () => {
    router.push("/home-product");
  };
  return (
    <div className={` pb-20 ${root.bgwhite}`}>
      <Container>
        <div className="bg-service">
          <div className="w-full">
            <HeadingEffect heading={furnitureServiceMessage} />
          </div>
          <div className=" md:flex md:space-x-5 mt-20 md:justify-between">
            <div className=" w-[300px] h-[285px] text-center rotate-on-hover relative mx-auto">
              <div className="w-[100px] h-[100px] mx-auto">
                <Image
                  src="/images/apartment-icon.png"
                  className="rotate-on-hover-image"
                  alt="iamge"
                  width="300"
                  height="100"
                />
              </div>
              <p className="font-bold text-x text-slate-900">
                {projectMessage}
              </p>
              <p className="text-slate-900">{bestPriceForContractorMessage}</p>
              <Button
                onClick={handleClickProduct}
                className="absolute bottom-7 md:bottom-0 left-[30%]"
              >
                {seeMoreMessage}
              </Button>
            </div>
            <div className=" w-[300px] h-[285px] text-center rotate-on-hover relative mx-auto">
              <div className="w-[100px] h-[100px] mx-auto">
                <Image
                  src="/images/home-icon.png"
                  className="rotate-on-hover-image"
                  alt="iamge"
                  width="300"
                  height="100"
                />
              </div>
              <p className="font-bold text-xl text-slate-900">
                {housingMessage}
              </p>
              <p className="text-slate-900">{alwayProvideAccessoriesMessage}</p>
              <Button
                onClick={handleClickProduct}
                className="absolute bottom-7 md:bottom-0 left-[30%]"
              >
                {seeMoreMessage}
              </Button>
            </div>
            <div className=" w-[300px] h-[285px] text-center rotate-on-hover relative mx-auto">
              <div className="w-[100px] h-[100px] mx-auto">
                <Image
                  src="/images/daydien-icon.png"
                  className="rotate-on-hover-image"
                  alt="iamge"
                  width="300"
                  height="100"
                />
              </div>
              <p className="font-bold text-xl text-slate-900">
                {electricWideMessage}
              </p>
              <p className="text-slate-900">{specializeInWiresMessage}</p>
              <Button
                onClick={handleClickProduct}
                className="absolute bottom-7 md:bottom-0 left-[30%]"
              >
                {seeMoreMessage}
              </Button>
            </div>
            <div className=" w-[300px] h-[285px] text-center rotate-on-hover relative mx-auto">
              <div className="w-[100px] h-[70px] mx-auto">
                <Image
                  src="/images/ongnhua-icon.png"
                  className=" mt-10 rotate-on-hover-image"
                  alt="iamge"
                  width="300"
                  height="100"
                />
              </div>
              <p className="font-bold text-xl text-slate-900">
                {plasticPipeMessage}
              </p>
              <p className="text-slate-900">{cooperateWithBinhMinhMessage}</p>
              <Button
                onClick={handleClickProduct}
                className="absolute bottom-7 md:bottom-0 left-[30%]"
              >
                {seeMoreMessage}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Service;
