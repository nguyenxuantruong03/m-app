"use client";
import { root } from "@/components/(client)/color/color";
import Container from "@/components/ui/container";
import HeadingEffect from "../uis-home/HeadingEffect";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  translateBeautifyHome,
  translateCeilingLight,
  translateConstructionMaterials,
  translateDiningRoom,
  translateElectricWiring,
  translateLargeProjectsOffer,
  translateLivingRoom,
  translateWaterPipeline,
} from "@/translate/translate-client";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useEffect, useState } from "react";

const OurProject = () => {
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
  const largeProjectOfferMessage = translateLargeProjectsOffer(languageToUse);
  const beautifyHomeMessage = translateBeautifyHome(languageToUse);
  const diningRoomeMessage = translateDiningRoom(languageToUse);
  const livingRoomMessage = translateLivingRoom(languageToUse);
  const waterPipeLineMessage = translateWaterPipeline(languageToUse);
  const electricWiringMessage = translateElectricWiring(languageToUse);
  const ceilingLightMessage = translateCeilingLight(languageToUse);
  const constructionMaterialMessage =
    translateConstructionMaterials(languageToUse);

  const router = useRouter();
  const handleClickProduct = () => {
    router.push("/enterprise");
  };
  return (
    <div className={` py-16 ${root.bgwhite}`}>
      <Container>
        <div className="text-center my-4">
          <HeadingEffect heading="Công trình" />
          <p className="font-semibold text-xl text-[#7d7777]">
            {largeProjectOfferMessage} <br />
            {beautifyHomeMessage}
          </p>
        </div>
        <div className=" grid grid-cols-3 ">
          <div className="space-y-4 mx-1 md:mx-3">
            <div
              className="relative inline-block group w-full h-[140px] md:h-[240px] cursor-pointer"
              onClick={handleClickProduct}
            >
              <Image
                fill
                alt="image"
                src="/images/our-project1.webp"
                className="block group-hover:opacity-75 transition-opacity duration-300"
              />
              <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white font-extrabold text-2xl">
                  {diningRoomeMessage}
                </p>
              </div>
            </div>
            <div
              className="relative inline-block group w-full h-[140px] md:h-[240px] cursor-pointer"
              onClick={handleClickProduct}
            >
              <Image
                fill
                alt="image"
                src="/images/our-project2.webp"
                className="block group-hover:opacity-75 transition-opacity duration-300"
              />
              <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white font-extrabold text-2xl">
                  {livingRoomMessage}
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-4 mx-1 md:mx-3">
            <div
              className="relative inline-block group  w-full h-[140px] md:h-[240px] cursor-pointer"
              onClick={handleClickProduct}
            >
              <Image
                fill
                alt="image"
                src="/images/our-project3.webp"
                className="block group-hover:opacity-75 transition-opacity duration-300"
              />
              <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white font-extrabold text-2xl">
                  {waterPipeLineMessage}
                </p>
              </div>
            </div>
            <div
              className="relative inline-block group w-full h-[140px] md:h-[240px] cursor-pointer"
              onClick={handleClickProduct}
            >
              <Image
                fill
                alt="image"
                src="/images/our-project4.webp"
                className="block group-hover:opacity-75 transition-opacity duration-300"
              />
              <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white font-extrabold text-2xl">
                  {electricWiringMessage}
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-4 mx-1 md:mx-3">
            <div
              className="relative inline-block group  w-full h-[140px] md:h-[240px] cursor-pointer"
              onClick={handleClickProduct}
            >
              <Image
                fill
                alt="image"
                src="/images/our-project5.webp"
                className="block group-hover:opacity-75 transition-opacity duration-300"
              />
              <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white font-extrabold text-2xl">
                  {ceilingLightMessage}
                </p>
              </div>
            </div>
            <div
              className="relative inline-block group w-full h-[140px] md:h-[240px] cursor-pointer"
              onClick={handleClickProduct}
            >
              <Image
                fill
                alt="image"
                src="/images/our-project6.webp"
                className="block group-hover:opacity-75 transition-opacity duration-300"
              />
              <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white font-extrabold text-2xl">
                  {constructionMaterialMessage}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default OurProject;
