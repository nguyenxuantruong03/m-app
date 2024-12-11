"use client";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import "./index.scss";
import Link from "next/link";
import { useCurrentUser } from "@/hooks/use-current-user";
import { root } from "../color/color";
import {
  getInfoHotProductDescriptions,
  getInfoProductHotTitle,
} from "@/translate/translate-client";
import HeadingEffect from "../uis-home/HeadingEffect";

const InfoHotProduct = () => {
  const user = useCurrentUser();
  const [isMounted, setIsMounted] = useState(false);
  const [storedLanguage, setStoredLanguage] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null); 

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;
  
    const onWheel = (e: WheelEvent) => {
      const containerRect = scrollContainer.getBoundingClientRect();
      const isMouseInside =
        e.clientX >= containerRect.left &&
        e.clientX <= containerRect.right &&
        e.clientY >= containerRect.top &&
        e.clientY <= containerRect.bottom;
  
      if (isMouseInside) {
        e.preventDefault(); // Ngăn cuộn mặc định
        scrollContainer.scrollBy({
          left: e.deltaY,
          behavior: "smooth", // Cuộn mượt
        });
      }
    };
  
    window.addEventListener("wheel", onWheel, { passive: false });
  
    return () => window.removeEventListener("wheel", onWheel);
  }, []);

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
  const infoProductHotMessage = getInfoHotProductDescriptions(languageToUse);
  const infoProductHotTitleMessage = getInfoProductHotTitle(languageToUse);

  // Mảng dữ liệu cho Title và Description
  const cardsData = [
    {
      title: infoProductHotMessage.titleCadivi,
      description: infoProductHotMessage.descriptionCadivi,
      imageSrc: "/images/daydien-cadivi.webp",
      link: "/page1",
    },
    {
      title: infoProductHotMessage.titleMPE,
      description: infoProductHotMessage.descriptionMPE,
      imageSrc: "/images/led-bulb.webp",
      link: "/page2",
    },
    {
      title: infoProductHotMessage.titleDienQuang,
      description: infoProductHotMessage.descriptionDienQuang,
      imageSrc: "/images/o-cam-dien-quang.webp",
      link: "/page3",
    },
    {
      title: infoProductHotMessage.titleBinhMinh,
      description: infoProductHotMessage.descriptionBinhMinh,
      imageSrc: "/images/ong-nhua-binh-minh.webp",
      link: "/page3",
    },
    {
      title: infoProductHotMessage.titleSenko,
      description: infoProductHotMessage.descriptionSenko,
      imageSrc: "/images/quat-lung-senko.webp",
      link: "/page3",
    },
    {
      title: infoProductHotMessage.titleApolo,
      description: infoProductHotMessage.descriptionApolo,
      imageSrc: "/images/Keo-Apolo.webp",
      link: "/page3",
    },
    {
      title: infoProductHotMessage.titleATM,
      description: infoProductHotMessage.descriptionATM,
      imageSrc: "/images/son-xit-ATM.webp",
      link: "/page3",
    },
    {
      title: infoProductHotMessage.titlePinConO,
      description: infoProductHotMessage.descriptionPinConO,
      imageSrc: "/images/pin-con-o.webp",
      link: "/page3",
    },
    {
      title: infoProductHotMessage.titleDaCat,
      description: infoProductHotMessage.titleDaCat,
      imageSrc: "/images/da-cat.webp",
      link: "/page3",
    },
    {
      title: infoProductHotMessage.titleVietTiep,
      description: infoProductHotMessage.descriptionVietTiep,
      imageSrc: "/images/khoa-viet-tiep.webp",
      link: "/page3",
    },
    {
      title: infoProductHotMessage.titleKimTin,
      description: infoProductHotMessage.descriptionKimTin,
      imageSrc: "/images/que-han.webp",
      link: "/page3",
    },
    {
      title: infoProductHotMessage.titleInax,
      description: infoProductHotMessage.descriptionInax,
      imageSrc: "/images/voi-sen-tam.webp",
      link: "/page3",
    },
  ];

  return (
    <div className={`pb-20 ${root.bgwhite}`}>
      <div className="mx-2">
        <div className="w-full">
              <HeadingEffect heading={infoProductHotTitleMessage} />
            </div>
            <div className="flex items-center overflow-auto space-x-8 max-w-7xl mx-auto p-9" ref={scrollContainerRef}>
              {cardsData.map((card, index) => (
                <Link href={card.link} key={index}>
                  <div className="card w-[300px]">
                    <Image
                      fill
                      src={card.imageSrc}
                      alt={card.title}
                      className="object-cover rounded-md"
                    />
                    <div className="card__content bg-white dark:bg-slate-900 overflow-y-auto rounded-md">
                      <div className="card__content-inner">
                        <p className="text-xl font-semibold text-slate-900 dark:text-slate-200">
                          {card.title}
                        </p>
                        <p className="text-sm font-semibold text-slate-900 dark:text-slate-200">
                          {card.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
        </div>
    </div>
  );
};

export default InfoHotProduct;
