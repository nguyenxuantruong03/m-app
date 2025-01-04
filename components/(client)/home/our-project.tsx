"use client";
import { root } from "@/components/(client)/color/color";
import Container from "@/components/ui/container";
import HeadingEffect from "../uis-home/HeadingEffect";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

const OurProject = () => {
  const t = useTranslations()
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
            {t("home.largeProjectOffer")} <br />
            {t("home.beautifyHome")}
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
                  {t("home.diningRoome")}
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
                  {t("home.livingRoom")}
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
                  {t("home.waterPipeLine")}
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
                  {t("home.electricWiring")}
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
                  {t("home.ceilingLight")}
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
                  {t("home.constructionMaterial")}
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
