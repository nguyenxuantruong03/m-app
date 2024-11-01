"use client";
import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import SwiperButtons from "./swiperButton";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Autoplay, Pagination, Scrollbar } from "swiper/modules";
import { Billboard } from "@/types/type";

interface SliderSwiperProps {
  data: Billboard | null;
}

const SliderSwiper: React.FC<SliderSwiperProps> = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<any>(null);

  const renderSlides = () => {
    return data?.imagebillboard?.map((image, index) => (
      <SwiperSlide key={index}>
        <div className="overflow-hidden rounded-xl md:aspect-[1/1] bg-cover">
          <Image
            src={image.url}
            fill
            alt="Image"
            className="aspect-square object-cover rounded-md"
            placeholder="blur"
            blurDataURL="/images/signup-ipad.png"
            loading="lazy"
          />
        </div>
      </SwiperSlide>
    ));
  };

  const handleLabelClick = (index: number) => {
    swiperRef.current?.swiper.slideTo(index);
    setActiveIndex(index);
  };

  const renderLabels = () => {
    return data?.imagebillboard?.map((image, index) => (
      <button
        key={index}
        onClick={() => handleLabelClick(index)}
        className={`flex-grow p-4 cursor-pointer hover:bg-gray-300 hover:bg-opacity-30 ${activeIndex === index ? "text-gray-900 font-semibold border-b-2 border-red-500" : "text-gray-500"}`}
      >
        <div className="flex flex-col items-center">
          <p className="text-center">{image.label}</p>
          <p className="text-center">{image.description}</p>
        </div>
      </button>
    ));
  };
  

  return (
    <div className="w-[90vw] md:w-[70vw] lg:w-[750px] rounded-md shadow-md">
      <Swiper
        ref={swiperRef}
        spaceBetween={20}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        scrollbar={{
          hide: true,
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        modules={[Autoplay, Pagination, Scrollbar]}
        className="h-[330px] md:h-[350px] lg:h-[324px] relative group"
      >
        {renderSlides()}
        <div className="absolute top-10 z-10 hidden group-hover:block">
          <SwiperButtons />
        </div>
      </Swiper>
      <div className="text-center text-gray-700 flex overflow-x-auto">
  <div className="flex w-full">{renderLabels()}</div>
</div>

    </div>
  );
};

export default SliderSwiper;
