"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import "./index.scss";
import Link from "next/link";
import { root } from "../color/color";
import HeadingEffect from "../uis-home/HeadingEffect";
import { useTranslations } from "next-intl";

const InfoHotProduct = () => {
  const t = useTranslations()
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
  
  // Mảng dữ liệu cho Title và Description
  const cardsData = [
    {
      title: t("home.titleCadivi"),
      description: t("home.descriptionCadivi"),
      imageSrc: "/images/daydien-cadivi.webp",
      link: "/page1",
    },
    {
      title: t("home.titleMPE"),
      description: t("home.descriptionMPE"),
      imageSrc: "/images/led-bulb.webp",
      link: "/page2",
    },
    {
      title: t("home.titleDienQuang"),
      description: t("home.descriptionDienQuang"),
      imageSrc: "/images/o-cam-dien-quang.webp",
      link: "/page3",
    },
    {
      title: t("home.titleBinhMinh"),
      description: t("home.descriptionBinhMinh"),
      imageSrc: "/images/ong-nhua-binh-minh.webp",
      link: "/page3",
    },
    {
      title: t("home.titleSenko"),
      description: t("home.descriptionSenko"),
      imageSrc: "/images/quat-lung-senko.webp",
      link: "/page3",
    },
    {
      title: t("home.titleApolo"),
      description: t("home.descriptionApolo"),
      imageSrc: "/images/Keo-Apolo.webp",
      link: "/page3",
    },
    {
      title: t("home.titleATM"),
      description: t("home.descriptionATM"),
      imageSrc: "/images/son-xit-ATM.webp",
      link: "/page3",
    },
    {
      title: t("home.titlePinConO"),
      description: t("home.descriptionPinConO"),
      imageSrc: "/images/pin-con-o.webp",
      link: "/page3",
    },
    {
      title: t("home.titleDaCat"),
      description: t("home.titleDaCat"),
      imageSrc: "/images/da-cat.webp",
      link: "/page3",
    },
    {
      title: t("home.titleVietTiep"),
      description: t("home.descriptionVietTiep"),
      imageSrc: "/images/khoa-viet-tiep.webp",
      link: "/page3",
    },
    {
      title: t("home.titleKimTin"),
      description: t('home.descriptionKimTin'),
      imageSrc: "/images/que-han.webp",
      link: "/page3",
    },
    {
      title: t("home.titleInax"),
      description: t("home.descriptionInax"),
      imageSrc: "/images/voi-sen-tam.webp",
      link: "/page3",
    },
  ];

  return (
    <div className={`pb-20 ${root.bgwhite}`}>
      <div className="mx-2">
        <div className="w-full">
              <HeadingEffect heading={t("home.infoProductHotTitle")} />
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
