"use client";
import "./index.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, FreeMode } from "swiper/modules";
import HeadingEffect from "../uis-home/HeadingEffect";
import { ChevronsRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

const SellingProduct = () => {
  const t = useTranslations()
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSlideChange = (swiper: any) => {
    setActiveIndex(swiper.activeIndex);
  };

  const handleClickProduct = () => {
    router.push("/home-product");
  };

  useEffect(() => {
    // Initialize the active index when the component mounts
    setActiveIndex(0);
  }, []);
  return (
    <div>
      <div className="cover-image">
        <div className=" space-x-1 px-2 py-10 md:space-x-10 md:px-5 xl:px-80">
          <Swiper
            freeMode={true}
            autoplay={{
              delay: 10000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              320: { slidesPerView: 2, spaceBetween: 20 },
              768: { slidesPerView: 3, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 20 },
              1920: { slidesPerView: 3, spaceBetween: 20 },
            }}
            slidesPerView={3}
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            modules={[FreeMode, Autoplay]}
            className="mySwiper"
            onSlideChange={handleSlideChange}
          >
            <SwiperSlide
              className={`p-1 md:p-4 ${
                activeIndex >= 0
                  ? "active-slide"
                  : "bg-slate-200 dark:bg-slate-900"
              }`}
            >
              <HeadingEffect heading={t("home.lightBlulb")} />
              <p className="text-base px-2 xl:px-5 2xl:px-12 text-slate-900 dark:text-slate-200 font-semibold">
                {t("home.productOffer")}
              </p>
              <p
                onClick={handleClickProduct}
                className="hover:text-gray-600 cursor-pointer text-lg text-[#e53350] font-bold mt-4 flex items-center justify-center"
              >
                {t("action.seeMore")} <ChevronsRight className="pl-1 w-8" />
              </p>
              <div className="float-right font-bold text-4xl md:text-7xl text-[#eaeaea] dark:text-slate-200">
                01
              </div>
            </SwiperSlide>

            <SwiperSlide
              className={`p-1 md:p-4 ${
                activeIndex >= 1
                  ? "active-slide"
                  : "bg-slate-200 dark:bg-slate-900"
              }`}
            >
              <HeadingEffect heading={t("home.pipe")} />
              <p className="text-base px-2 xl:px-5 2xl:px-12 text-slate-900 dark:text-slate-200 font-semibold">
                {t("home.pipeOffer")}
              </p>

              <p
                onClick={handleClickProduct}
                className="hover:text-gray-600 cursor-pointer text-lg text-[#e53350] font-bold mt-4 flex items-center justify-center"
              >
                {t("action.seeMore")} <ChevronsRight className="pl-1 w-8" />
              </p>
              <div className="float-right font-bold text-4xl md:text-7xl text-[#eaeaea] dark:text-slate-200">
                02
              </div>
            </SwiperSlide>

            <SwiperSlide
              className={`p-1 md:p-4 ${
                activeIndex >= 2
                  ? "active-slide"
                  : "bg-slate-200 dark:bg-slate-900"
              }`}
            >
              <HeadingEffect heading={t("home.electricWire")} />
              <p className="text-base px-2 xl:px-5 2xl:px-12 text-slate-900 dark:text-slate-200 font-semibold">
                {t("home.cableOffer")}
              </p>

              <p
                onClick={handleClickProduct}
                className="hover:text-gray-600 cursor-pointer text-lg text-[#e53350] font-bold mt-4 flex items-center justify-center"
              >
                {t("action.seeMore")} <ChevronsRight className="pl-1 w-8" />
              </p>
              <div className="float-right font-bold text-4xl md:text-7xl text-[#eaeaea] dark:text-slate-200">
                03
              </div>
            </SwiperSlide>

            <SwiperSlide
              className={`p-1 md:p-4 ${
                activeIndex >= 3
                  ? "active-slide"
                  : "bg-slate-200 dark:bg-slate-900"
              }`}
            >
              <HeadingEffect heading={t("home.fan")} />
              <p className="text-base px-2 xl:px-5 2xl:px-12 text-slate-900 dark:text-slate-200 font-semibold">
                {t("home.fanOffer")}
              </p>

              <p
                onClick={handleClickProduct}
                className="hover:text-gray-600 cursor-pointer text-lg text-[#e53350] font-bold mt-4 flex items-center justify-center"
              >
                {t("action.seeMore")} <ChevronsRight className="pl-1 w-8" />
              </p>
              <div className="float-right font-bold text-4xl md:text-7xl text-[#eaeaea] dark:text-slate-200">
                04
              </div>
            </SwiperSlide>

            <SwiperSlide
              className={`p-1 md:p-4 ${
                activeIndex >= 4
                  ? "active-slide"
                  : "bg-slate-200 dark:bg-slate-900"
              }`}
            >
              <HeadingEffect heading={t("home.socket")} />
              <p className="text-base px-2 xl:px-5 2xl:px-12 text-slate-900 dark:text-slate-200 font-semibold">
                {t("home.socketOffer")}
              </p>

              <p
                onClick={handleClickProduct}
                className="hover:text-gray-600 cursor-pointer text-lg text-[#e53350] font-bold mt-4 flex items-center justify-center"
              >
                {t("action.seeMore")} <ChevronsRight className="pl-1 w-8" />
              </p>
              <div className="float-right font-bold text-4xl md:text-7xl text-[#eaeaea] dark:text-slate-200">
                05
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default SellingProduct;
