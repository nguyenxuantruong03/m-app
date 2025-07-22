"use client";
import "./index.scss";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";

type Props = {
  url: string;
};

const Video: React.FC<Props> = ({ url }) => {
  const t = useTranslations();
  const router = useRouter();

  const texts = [t("home.beautifyingWorld"), t("home.buildingMaterialStore")];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleAnimationIteration = () => {
    setCurrentIndex((prev) => (prev + 1) % texts.length);
  };

  const handleClickProduct = () => {
    router.push("/home-product");
  };

  return (
    <div className="parallax">
      <video loop muted autoPlay>
        <source src={url} type="video/mp4" />
      </video>
      <div className="content-slider space-y-2 md:space-y-3">
        <div className="flex items-center justify-center">
          <div className="logo-container">
            <h1
              id="page-logo"
              className="text-sm md:text-xl xl:text-6xl font-semibold text-white py-3"
              onAnimationIteration={handleAnimationIteration}
            >
              {texts[currentIndex]}
            </h1>
          </div>
        </div>
        <div className="mx-auto w-fit">
          <button
            onClick={handleClickProduct}
            className="group flex items-center justify-start w-11 h-11 bg-red-600 rounded-full cursor-pointer relative overflow-hidden transition-all duration-200 shadow-lg hover:w-44 hover:rounded-lg active:translate-x-1 active:translate-y-1"
          >
            <div className="absolute left-5 transform translate-x-full opacity-0 text-white text-lg font-semibold transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-hover:py-2">
              {t("home.viewProduct")}
            </div>
            <div className="flex items-center justify-center w-full transition-all duration-300 group-hover:justify-end group-hover:px-1">
              <ArrowRight className="w-4 h-4 text-white" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Video;
