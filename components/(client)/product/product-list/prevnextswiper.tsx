import { useSwiper } from "swiper/react";
import { ChevronRight, ChevronLeft } from "lucide-react";
const PrevNextSwiper = () => {
  const swiper = useSwiper();
  return (
    <>
      <button
        className="absolute top-1/2 z-[9998] right-0 cursor-pointer rounded-l-full rounded-r-none shadow-lg bg-white bg-opacity-70 text-gray-500 animate-fade-left animate-once animate-duration-500 animate-ease-in-out animate-normal animate-fill-forwards"
        aria-label="Next Product"
        title="next"
        onClick={() => swiper.slideNext()}
      >
        <ChevronRight className="w-8 h-14" />
      </button>
      <button
        className="absolute top-1/2 z-[9998] cursor-pointer shadow-lg rounded-r-full rounded-l-none rounded-2xl bg-white bg-opacity-70 text-gray-500 animate-fade-right animate-once animate-duration-500 animate-ease-in-out animate-normal animate-fill-forwards"
        aria-label="Prev Product"
        title="prev"
        onClick={() => swiper.slidePrev()}
      >
        <ChevronLeft className=" w-8 h-14 " />
      </button>
    </>
  );
};

export default PrevNextSwiper;
