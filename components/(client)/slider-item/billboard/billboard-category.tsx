"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperButtons from "../swiperButton";
import { Autoplay, Pagination, Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Image from "next/image";
import { Billboard } from "@/types/type";

interface BillboardCategoryProps {
  data: Billboard | null;
}

const BillboardCategory: React.FC<BillboardCategoryProps> = ({ data }) => {
  if (!data) {
    return null;
  }
  return (
    <div className="w-full md:w-[750px] h-[377px] rounded-md shadow-md relative">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        scrollbar={{
          hide: true,
        }}
        modules={[Autoplay, Pagination, Scrollbar]}
        className="h-[380px] relative group"
      >
        {data?.imagebillboard?.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="overflow-hidden rounded-xl md:aspect-[2/1] bg-cover">
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
        ))}

        <div className="absolute top-10 z-10 hidden group-hover:block">
          <SwiperButtons />
        </div>
      </Swiper>
    </div>
  );
};

export default BillboardCategory;
