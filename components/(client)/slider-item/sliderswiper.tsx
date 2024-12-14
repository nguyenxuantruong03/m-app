"use client";
import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Autoplay, Pagination, Scrollbar } from "swiper/modules";
import { Billboard } from "@/types/type";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import PrevNextSwiper from "../product/product-list/prevnextswiper";

interface SliderSwiperProps {
  data: Billboard | null;
  loading: boolean
}

const SliderSwiper: React.FC<SliderSwiperProps> = ({ data, loading }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<any>(null);

  const renderSlides = () => {
    return data?.imagebillboard?.map((image, index) => (
      <SwiperSlide key={index}>
        <Link href={`${image.link ? `${image.link}` : `/home-product`} `}>
          <div className="md:aspect-[1/1] bg-cover">
            <Image
              src={image.url}
              fill
              alt="Image"
              className="aspect-square object-cover rounded-t-md"
              placeholder="blur"
              blurDataURL="/images/image-placeholder.webp"
              loading="lazy"
            />
          </div>
        </Link>
      </SwiperSlide>
    ));
  };

  const handleLabelClick = (index: number) => {
    swiperRef.current?.swiper.slideTo(index);
    setActiveIndex(index);
  };

  const renderLabels = () => {
    if (!data?.imagebillboard || data.imagebillboard.length === 0 || loading) {
      return (
        <div className="flex space-x-2 p-4">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-6 w-32 hidden md:block" />
        </div>
      );
    }

    return data.imagebillboard.map((image, index) => (
      <button
        key={index}
        onClick={() => handleLabelClick(index)}
        className={`flex-grow p-4 cursor-pointer hover:bg-gray-300 hover:bg-opacity-30 ${
          activeIndex === index
            ? "text-red-500 font-semibold border-b-2 border-red-500"
            : "text-gray-500 dark:text-slate-200"
        }`}
      >
        <div className="flex flex-col items-center">
          <p className="text-center">{image.label}</p>
          <p className="text-center">{image.description}</p>
        </div>
      </button>
    ));
  };

  return (
    <div className="w-[90vw] md:w-[71vw] lg:w-[750px] rounded-md shadow-md dark:bg-slate-700">
      {data?.imagebillboard && data.imagebillboard.length > 0 && !loading ? (
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
          className="w-[90vw] md:w-[71vw] lg:w-[750px] h-[430px] md:h-[350px] relative group rounded-t-md"
        >
          {renderSlides()}
          <div className="hidden group-hover:block">
            <PrevNextSwiper />
          </div>
        </Swiper>
      ) : (
        <div className="relative w-[90vw] md:w-[70vw] lg:w-[750px] h-[430px] md:h-[350px] overflow-hidden rounded-md bg-gray-200 dark:bg-slate-800">
          <Skeleton className="h-full w-full" />
        </div>
      )}
      <div className="text-center text-gray-700 flex overflow-x-auto">
        <div className="flex w-full">{renderLabels()}</div>
      </div>
    </div>
  );
};

export default SliderSwiper;
