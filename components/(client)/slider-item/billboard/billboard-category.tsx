"use client";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Image from "next/image";
import { Billboard } from "@/types/type";
import Link from "next/link";
import PrevNextSwiper from "../../product/product-list/prevnextswiper";

interface BillboardCategoryProps {
  data: Billboard | null;
}

const BillboardCategory: React.FC<BillboardCategoryProps> = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<any>(null);

  const renderSlides = () => {
    return data?.imagebillboard?.map((image, index) => (
      <SwiperSlide key={index}>
        <Link href={`${image.link ? `${image.link}` : `/home-product`} `}>
          <div className="overflow-hidden rounded-xl md:aspect-[1/1] bg-cover">
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
    return data?.imagebillboard?.map((image, index) => (
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

  if (!data) {
    return null;
  }

  return (
    <div className="w-full h-[500px] rounded-md shadow-md relative">
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
          className="h-[430px] md:h-[465px] relative group"
        >
          {renderSlides()}
          <div className="hidden group-hover:block">
            <PrevNextSwiper />
          </div>
        </Swiper>
      
      <div className="text-center text-gray-700 flex overflow-x-auto">
        <div className="flex w-full">{renderLabels()}</div>
      </div>
    </div>
  );
};

export default BillboardCategory;
