"use client";
import { root } from "@/components/(client)/color/color";
import { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import "./index.scss";
import { useTranslations } from "next-intl";

const IntroductProduct = () => {
  const t = useTranslations()
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <div className={`pb-20 px-5 pt-2 ${root.bgwhite}`}>
      <div className="xl:flex">
        <div className="mb-2 relative md:pl-12 md:pb-[310px] xl:w-[48%] xl:pl-8">
          <div className="background-infoproduct" />
          <div
            className={`w-full h-[320px] shadow-xl top-[120px] z-8 rounded-md md:w-[600px] md:absolute xl:w-[700px] 2xl:w-[900px] xl:h-[440px] bg-white dark:bg-slate-700`}
          >
            <div className="text-lg px-3 py-6 xl:py-10 font-bold text-gray-500 dark:text-white text-opacity-80 xl:mt-16 md:text-2xl md:px-10 xl:px-40">
              {t("home.coreValues")}
            </div>
            <div className="flex px-3 items-center md:px-10 xl:px-40">
              <span className="border-t-2 border-solid border-gray-800 w-12 " />
              <p className="pl-4 text-[#e53350] text-lg uppercase font-bold">
                {t("home.uniquePerspective")}
              </p>
            </div>
          </div>
          <div className="background-infoproduct2" />
        </div>
        <div className="video-introproduct">
          <ReactPlayer
            url="https://www.youtube.com/watch?v=OmmgsN7GLXI&t=9s"
            width="100%"
            height="100%"
            controls
            loop
          />
        </div>
      </div>
    </div>
  );
};

export default IntroductProduct;
