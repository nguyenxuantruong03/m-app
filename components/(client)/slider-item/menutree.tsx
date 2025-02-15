"use client";
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { menutreecolor } from "@/components/(client)/color/color";
import { Category } from "@/types/type";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslations } from "next-intl";

interface menuTreeProps {
  data: Category[];
  categories1: Category[];
  categories2: Category[];
  categories3: Category[];
  categories4: Category[];
  categories5: Category[];
  categories6: Category[];
  categories7: Category[];
  categories8: Category[];
  categories9: Category[];
  categories10: Category[];
  categories11: Category[];
  loadingBillboard: boolean | undefined;
  loadingCategory: boolean
}
const MenuTree: React.FC<menuTreeProps> = ({
  data,
  categories1,
  categories2,
  categories3,
  categories4,
  categories5,
  categories6,
  categories7,
  categories8,
  categories9,
  categories10,
  categories11,
  loadingBillboard,
  loadingCategory
}) => {
  const t = useTranslations()
  const pathname = usePathname();

  const routes = data.map((route) => ({
    href: `/category/${route.id}`,
    label: route.name,
    active: pathname === `/category/${route.id}`,
  }));
  const categories01 = categories1.map((categories) => ({
    href: `/category1/${categories.id}`,
    label: categories.name,
    active: pathname === `/category1/${categories.id}`,
  }));
  const categories02 = categories2.map((categories) => ({
    href: `/category2/${categories.id}`,
    label: categories.name,
    active: pathname === `/category2/${categories.id}`,
  }));
  const categories03 = categories3.map((categories) => ({
    href: `/category3/${categories.id}`,
    label: categories.name,
    active: pathname === `/category3/${categories.id}`,
  }));
  const categories04 = categories4.map((categories) => ({
    href: `/category4/${categories.id}`,
    label: categories.name,
    active: pathname === `/category4/${categories.id}`,
  }));
  const categories05 = categories5.map((categories) => ({
    href: `/category5/${categories.id}`,
    label: categories.name,
    active: pathname === `/category5/${categories.id}`,
  }));
  const categories06 = categories6.map((categories) => ({
    href: `/category6/${categories.id}`,
    label: categories.name,
    active: pathname === `/category6/${categories.id}`,
  }));
  const categories07 = categories7.map((categories) => ({
    href: `/category7/${categories.id}`,
    label: categories.name,
    active: pathname === `/category7/${categories.id}`,
  }));
  const categories08 = categories8.map((categories) => ({
    href: `/category8/${categories.id}`,
    label: categories.name,
    active: pathname === `/category8/${categories.id}`,
  }));
  const categories09 = categories9.map((categories) => ({
    href: `/category9/${categories.id}`,
    label: categories.name,
    active: pathname === `/category9/${categories.id}`,
  }));
  const categories010 = categories10.map((categories) => ({
    href: `/category10/${categories.id}`,
    label: categories.name,
    active: pathname === `/category10/${categories.id}`,
  }));
  const categories011 = categories11.map((categories) => ({
    href: `/category11/${categories.id}`,
    label: categories.name,
    active: pathname === `/category11/${categories.id}`,
  }));

  const [isShown, setIsShown] = useState(false);
  const [isShown1, setIsShown1] = useState(false);
  const [isShown2, setIsShown2] = useState(false);
  const [isShown3, setIsShown3] = useState(false);
  const [isShown4, setIsShown4] = useState(false);
  const [isShown5, setIsShown5] = useState(false);
  const [isShown6, setIsShown6] = useState(false);
  const [isShown7, setIsShown7] = useState(false);
  const [isShown8, setIsShown8] = useState(false);
  const [isShown9, setIsShown9] = useState(false);
  const [isShown10, setIsShown10] = useState(false);
  const [isShown11, setIsShown11] = useState(false);

  const handleMouseOver = () => {
    setIsShown(true);
  };

  const handleMouseOut = () => {
    setIsShown(false);
  };

  const handleMouseOver1 = () => {
    setIsShown1(true);
  };

  const handleMouseOut1 = () => {
    setIsShown1(false);
  };

  const handleMouseOver2 = () => {
    setIsShown2(true);
  };

  const handleMouseOut2 = () => {
    setIsShown2(false);
  };

  const handleMouseOver3 = () => {
    setIsShown3(true);
  };

  const handleMouseOut3 = () => {
    setIsShown3(false);
  };

  const handleMouseOver4 = () => {
    setIsShown4(true);
  };

  const handleMouseOut4 = () => {
    setIsShown4(false);
  };

  const handleMouseOver5 = () => {
    setIsShown5(true);
  };

  const handleMouseOut5 = () => {
    setIsShown5(false);
  };

  const handleMouseOver6 = () => {
    setIsShown6(true);
  };

  const handleMouseOut6 = () => {
    setIsShown6(false);
  };

  const handleMouseOver7 = () => {
    setIsShown7(true);
  };

  const handleMouseOut7 = () => {
    setIsShown7(false);
  };

  const handleMouseOver8 = () => {
    setIsShown8(true);
  };

  const handleMouseOut8 = () => {
    setIsShown8(false);
  };

  const handleMouseOver9 = () => {
    setIsShown9(true);
  };

  const handleMouseOut9 = () => {
    setIsShown9(false);
  };

  const handleMouseOver10 = () => {
    setIsShown10(true);
  };

  const handleMouseOut10 = () => {
    setIsShown10(false);
  };

  const handleMouseOver11 = () => {
    setIsShown11(true);
  };

  const handleMouseOut11 = () => {
    setIsShown11(false);
  };

  return (
    <div className="rounded-md shadow-md hidden md:block dark:bg-slate-700">
      <div className=" md:w-[185px] lg:w-[205px] ">
        <div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
          <div className={menutreecolor.flex_hover_bg}>
            <p className={`${menutreecolor.texthover}`}>{t("product.pin")}</p>
            <p>
              <ChevronRight className=" text-slate-900 dark:text-slate-200" />
            </p>
          </div>

          <div className="relative md:bottom-4 lg:bottom-10 md:left-[175px] lg:left-[195px] z-30 ">
            {isShown && (
              <div
                className="absolute 
      lg:w-[780px] 
      md:w-[535px]
      lg:h-[415px] 
      md:h-[388px] 
      shadow-xl 
      bg-white 
      dark:bg-slate-900
      rounded-md 
      animate-duration-500 
      animate-fade 
      animate-once 
      animate-ease-in-out 
      animate-normal 
      animate-fill-forwards"
              >
                {loadingBillboard || loadingCategory ? (
                  <div className="gap-2 flex flex-wrap items-center p-2">
                    {Array(10) // Create an array with 10 elements for the skeleton loader
                      .fill(0)
                      .map((_, index) => (
                        <Skeleton key={index} className="px-5 py-2" />
                      ))}
                  </div>
                ) : routes.length > 0 ? (
                  <div className="space-x-5 px-5 py-2">
                    {routes.map((route) => (
                      <Link
                        key={route.href}
                        href={route.href}
                        className={cn(
                          "text-sm font-medium transition-colors hover:text-black dark:hover:text-slate-200",
                          route.active
                            ? "text-black dark:text-slate-200"
                            : "text-neutral-500"
                        )}
                      >
                        {route.label}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full w-full text-neutral-500">
                    <p>{t("product.productNotFound")}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div onMouseOver={handleMouseOver1} onMouseOut={handleMouseOut1}>
          <div className={menutreecolor.flex_hover_bg}>
            <p className={`${menutreecolor.texthover}`}>{t("product.fan")} </p>
            <p>
              <ChevronRight className="text-slate-900 dark:text-slate-200" />
            </p>
          </div>

          <div className="relative md:bottom-12 lg:bottom-[4.7rem] md:left-[175px] lg:left-[195px] z-30 ">
            {isShown1 && (
              <div
                className="absolute 
      lg:w-[780px] 
      md:w-[535px]
      lg:h-[415px] 
      md:h-[388px] 
      shadow-xl 
      bg-white 
      dark:bg-slate-900
      rounded-md 
      animate-duration-500 
      animate-fade 
      animate-once 
      animate-ease-in-out 
      animate-normal 
      animate-fill-forwards"
              >
                {loadingBillboard || loadingCategory ? (
                  <div className="gap-2 flex flex-wrap items-center p-2">
                    {Array(10) // Create an array with 10 elements for the skeleton loader
                      .fill(0)
                      .map((_, index) => (
                        <Skeleton key={index} className="px-5 py-2" />
                      ))}
                  </div>
                ) : categories01.length > 0 ? (
                  <div className="space-x-5 px-5 py-2">
                    {categories01.map((categories) => (
                      <Link
                        key={categories.href}
                        href={categories.href}
                        className={cn(
                          "text-sm font-medium transition-colors hover:text-black dark:hover:text-slate-200",
                          categories.active
                            ? "text-black dark:text-slate-200"
                            : "text-neutral-500"
                        )}
                      >
                        {categories.label}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full w-full text-neutral-500">
                    <p>{t("product.productNotFound")}</p>{" "}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div onMouseOver={handleMouseOver2} onMouseOut={handleMouseOut2}>
          <div className={menutreecolor.flex_hover_bg}>
            <p className={`${menutreecolor.texthover}`}>{t("product.plasticPipe")}</p>
            <p>
              <ChevronRight className="text-slate-900 dark:text-slate-200" />
            </p>
          </div>

          <div className="relative bottom-[8rem] md:left-[175px] lg:left-[195px] z-30 ">
            {isShown2 && (
              <div
                className="absolute 
      lg:w-[780px] 
      md:w-[535px]
      lg:h-[415px] 
      md:h-[388px] 
      shadow-xl 
      bg-white 
      dark:bg-slate-900
      rounded-md 
      animate-duration-500 
      animate-fade 
      animate-once 
      animate-ease-in-out 
      animate-normal 
      animate-fill-forwards"
              >
                {loadingBillboard || loadingCategory ? (
                  <div className="gap-2 flex flex-wrap items-center p-2">
                    {Array(10) // Create an array with 10 elements for the skeleton loader
                      .fill(0)
                      .map((_, index) => (
                        <Skeleton key={index} className="px-5 py-2" />
                      ))}
                  </div>
                ) : categories02.length > 0 ? (
                  <div className="space-x-5 px-5 py-2">
                    {categories02.map((categories) => (
                      <Link
                        key={categories.href}
                        href={categories.href}
                        className={cn(
                          "text-sm font-medium transition-colors hover:text-black dark:hover:text-slate-200",
                          categories.active
                            ? "text-black dark:text-slate-200"
                            : "text-neutral-500"
                        )}
                      >
                        {categories.label}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full w-full text-neutral-500">
                    <p>{t("product.productNotFound")}</p>{" "}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div onMouseOver={handleMouseOver3} onMouseOut={handleMouseOut3}>
          <div className={menutreecolor.flex_hover_bg}>
            <p className={`${menutreecolor.texthover}`}>
              {t("product.electricWire")}
            </p>
            <p>
              <ChevronRight className="text-slate-900 dark:text-slate-200" />
            </p>
          </div>

          <div className="relative bottom-[10rem] md:left-[175px] lg:left-[195px] z-30 ">
            {isShown3 && (
              <div
                className="absolute 
      lg:w-[780px] 
      md:w-[535px]
      lg:h-[415px] 
      md:h-[388px] 
      shadow-xl 
      bg-white 
      dark:bg-slate-900
      rounded-md 
      animate-duration-500 
      animate-fade 
      animate-once 
      animate-ease-in-out 
      animate-normal 
      animate-fill-forwards"
              >
                {loadingBillboard || loadingCategory ? (
                  <div className="gap-2 flex flex-wrap items-center p-2">
                    {Array(10) // Create an array with 10 elements for the skeleton loader
                      .fill(0)
                      .map((_, index) => (
                        <Skeleton key={index} className="px-5 py-2" />
                      ))}
                  </div>
                ) : categories03.length > 0 ? (
                  <div className="space-x-5 px-5 py-2">
                    {categories03.map((categories) => (
                      <Link
                        key={categories.href}
                        href={categories.href}
                        className={cn(
                          "text-sm font-medium transition-colors hover:text-black dark:hover:text-slate-200",
                          categories.active
                            ? "text-black dark:text-slate-200"
                            : "text-neutral-500"
                        )}
                      >
                        {categories.label}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full w-full text-neutral-500">
                    <p>{t("product.productNotFound")}</p>{" "}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div onMouseOver={handleMouseOver4} onMouseOut={handleMouseOut4}>
          <div className={menutreecolor.flex_hover_bg}>
            <p className={`${menutreecolor.texthover}`}>
              {t("product.cuttingStone")}
            </p>
            <p>
              <ChevronRight className="text-slate-900 dark:text-slate-200" />
            </p>
          </div>

          <div className="relative bottom-[12rem] md:left-[175px] lg:left-[195px] z-30 ">
            {isShown4 && (
              <div
                className="absolute 
      lg:w-[780px] 
      md:w-[535px]
      lg:h-[415px] 
      md:h-[388px] 
      shadow-xl 
      bg-white 
      dark:bg-slate-900
      rounded-md 
      animate-duration-500 
      animate-fade 
      animate-once 
      animate-ease-in-out 
      animate-normal 
      animate-fill-forwards"
              >
                {loadingBillboard || loadingCategory ? (
                  <div className="gap-2 flex flex-wrap items-center p-2">
                    {Array(10) // Create an array with 10 elements for the skeleton loader
                      .fill(0)
                      .map((_, index) => (
                        <Skeleton key={index} className="px-5 py-2" />
                      ))}
                  </div>
                ) : categories04.length > 0 ? (
                  <div className="space-x-5 px-5 py-2">
                    {categories04.map((categories) => (
                      <Link
                        key={categories.href}
                        href={categories.href}
                        className={cn(
                          "text-sm font-medium transition-colors hover:text-black dark:hover:text-slate-200",
                          categories.active
                            ? "text-black dark:text-slate-200"
                            : "text-neutral-500"
                        )}
                      >
                        {categories.label}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full w-full text-neutral-500">
                    <p>{t("product.productNotFound")}</p>{" "}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div onMouseOver={handleMouseOver5} onMouseOut={handleMouseOut5}>
          <div className={menutreecolor.flex_hover_bg}>
            <p className={`${menutreecolor.texthover}`}>{t("product.lock")}</p>
            <p>
              <ChevronRight className="text-slate-900 dark:text-slate-200" />
            </p>
          </div>

          <div className="relative bottom-[14rem] md:left-[175px] lg:left-[195px] z-30 ">
            {isShown5 && (
              <div
                className="absolute 
      lg:w-[780px] 
      md:w-[535px]
      lg:h-[415px] 
      md:h-[388px] 
      shadow-xl 
      bg-white 
      dark:bg-slate-900
      rounded-md 
      animate-duration-500 
      animate-fade 
      animate-once 
      animate-ease-in-out 
      animate-normal 
      animate-fill-forwards"
              >
                {loadingBillboard || loadingCategory ? (
                  <div className="gap-2 flex flex-wrap items-center p-2">
                    {Array(10) // Create an array with 10 elements for the skeleton loader
                      .fill(0)
                      .map((_, index) => (
                        <Skeleton key={index} className="px-5 py-2" />
                      ))}
                  </div>
                ) : categories05.length > 0 ? (
                  <div className="space-x-5 px-5 py-2">
                    {categories05.map((categories) => (
                      <Link
                        key={categories.href}
                        href={categories.href}
                        className={cn(
                          "text-sm font-medium transition-colors hover:text-black dark:hover:text-slate-200",
                          categories.active
                            ? "text-black dark:text-slate-200"
                            : "text-neutral-500"
                        )}
                      >
                        {categories.label}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full w-full text-neutral-500">
                    <p>{t("product.productNotFound")}</p>{" "}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div onMouseOver={handleMouseOver6} onMouseOut={handleMouseOut6}>
          <div className={menutreecolor.flex_hover_bg}>
            <p className={`${menutreecolor.texthover}`}>{t("product.glue")}</p>
            <p>
              <ChevronRight className="text-slate-900 dark:text-slate-200" />
            </p>
          </div>

          <div className="relative bottom-[16rem] md:left-[175px] lg:left-[195px] z-30 ">
            {isShown6 && (
              <div
                className="absolute 
      lg:w-[780px] 
      md:w-[535px]
      lg:h-[415px] 
      md:h-[388px] 
      shadow-xl 
      bg-white 
      dark:bg-slate-900
      rounded-md 
      animate-duration-500 
      animate-fade 
      animate-once 
      animate-ease-in-out 
      animate-normal 
      animate-fill-forwards"
              >
                {loadingBillboard || loadingCategory ? (
                  <div className="gap-2 flex flex-wrap items-center p-2">
                    {Array(10) // Create an array with 10 elements for the skeleton loader
                      .fill(0)
                      .map((_, index) => (
                        <Skeleton key={index} className="px-5 py-2" />
                      ))}
                  </div>
                ) : categories06.length > 0 ? (
                  <div className="space-x-5 px-5 py-2">
                    {categories06.map((categories) => (
                      <Link
                        key={categories.href}
                        href={categories.href}
                        className={cn(
                          "text-sm font-medium transition-colors hover:text-black dark:hover:text-slate-200",
                          categories.active
                            ? "text-black dark:text-slate-200"
                            : "text-neutral-500"
                        )}
                      >
                        {categories.label}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full w-full text-neutral-500">
                    <p>{t("product.productNotFound")}</p>{" "}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div onMouseOver={handleMouseOver7} onMouseOut={handleMouseOut7}>
          <div className={menutreecolor.flex_hover_bg}>
            <p className={`${menutreecolor.texthover}`}>
              {t("product.socketAndFaceplate")}
            </p>
            <p>
              <ChevronRight className="text-slate-900 dark:text-slate-200" />
            </p>
          </div>

          <div className="relative bottom-[18rem] md:left-[175px] lg:left-[195px] z-30 ">
            {isShown7 && (
              <div
                className="absolute 
      lg:w-[780px] 
      md:w-[535px]
      lg:h-[415px] 
      md:h-[388px] 
      shadow-xl 
      bg-white 
      dark:bg-slate-900
      rounded-md 
      animate-duration-500 
      animate-fade 
      animate-once 
      animate-ease-in-out 
      animate-normal 
      animate-fill-forwards"
              >
                {loadingBillboard || loadingCategory ? (
                  <div className="gap-2 flex flex-wrap items-center p-2">
                    {Array(10) // Create an array with 10 elements for the skeleton loader
                      .fill(0)
                      .map((_, index) => (
                        <Skeleton key={index} className="px-5 py-2" />
                      ))}
                  </div>
                ) : categories07.length > 0 ? (
                  <div className="space-x-5 px-5 py-2">
                    {categories07.map((categories) => (
                      <Link
                        key={categories.href}
                        href={categories.href}
                        className={cn(
                          "text-sm font-medium transition-colors hover:text-black dark:hover:text-slate-200",
                          categories.active
                            ? "text-black dark:text-slate-200"
                            : "text-neutral-500"
                        )}
                      >
                        {categories.label}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full w-full text-neutral-500">
                    <p>{t("product.productNotFound")}</p>{" "}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div onMouseOver={handleMouseOver8} onMouseOut={handleMouseOut8}>
          <div className={menutreecolor.flex_hover_bg}>
            <p className={`${menutreecolor.texthover} `}>{t("product.paint")}</p>
            <p>
              <ChevronRight className="text-slate-900 dark:text-slate-200" />
            </p>
          </div>

          <div className="relative bottom-[20rem] md:left-[175px] lg:left-[195px] z-30 ">
            {isShown8 && (
              <div
                className="absolute 
      lg:w-[780px] 
      md:w-[535px]
      lg:h-[415px] 
      md:h-[388px] 
      shadow-xl 
      bg-white 
      dark:bg-slate-900
      rounded-md 
      animate-duration-500 
      animate-fade 
      animate-once 
      animate-ease-in-out 
      animate-normal 
      animate-fill-forwards"
              >
                {loadingBillboard || loadingCategory ? (
                  <div className="gap-2 flex flex-wrap items-center p-2">
                    {Array(10) // Create an array with 10 elements for the skeleton loader
                      .fill(0)
                      .map((_, index) => (
                        <Skeleton key={index} className="px-5 py-2" />
                      ))}
                  </div>
                ) : categories08.length > 0 ? (
                  <div className="space-x-5 px-5 py-2">
                    {categories08.map((categories) => (
                      <Link
                        key={categories.href}
                        href={categories.href}
                        className={cn(
                          "text-sm font-medium transition-colors hover:text-black dark:hover:text-slate-200",
                          categories.active
                            ? "text-black dark:text-slate-200"
                            : "text-neutral-500"
                        )}
                      >
                        {categories.label}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full w-full text-neutral-500">
                    <p>{t("product.productNotFound")}</p>{" "}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div onMouseOver={handleMouseOver9} onMouseOut={handleMouseOut9}>
          <div className={menutreecolor.flex_hover_bg}>
            <p className={`${menutreecolor.texthover}`}>
              {t("product.bathroomMaterials")}
            </p>
            <p>
              <ChevronRight className="text-slate-900 dark:text-slate-200" />
            </p>
          </div>

          <div className="relative bottom-[22rem] md:left-[175px] lg:left-[195px] z-30 ">
            {isShown9 && (
              <div
                className="absolute 
      lg:w-[780px] 
      md:w-[535px]
      lg:h-[415px] 
      md:h-[388px] 
      shadow-xl 
      bg-white 
      dark:bg-slate-900
      rounded-md 
      animate-duration-500 
      animate-fade 
      animate-once 
      animate-ease-in-out 
      animate-normal 
      animate-fill-forwards"
              >
                {loadingBillboard || loadingCategory ? (
                  <div className="gap-2 flex flex-wrap items-center p-2">
                    {Array(10) // Create an array with 10 elements for the skeleton loader
                      .fill(0)
                      .map((_, index) => (
                        <Skeleton key={index} className="px-5 py-2" />
                      ))}
                  </div>
                ) : categories09.length > 0 ? (
                  <div className="space-x-5 px-5 py-2">
                    {categories09.map((categories) => (
                      <Link
                        key={categories.href}
                        href={categories.href}
                        className={cn(
                          "text-sm font-medium transition-colors hover:text-black dark:hover:text-slate-200",
                          categories.active
                            ? "text-black dark:text-slate-200"
                            : "text-neutral-500"
                        )}
                      >
                        {categories.label}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full w-full text-neutral-500">
                    <p>{t("product.productNotFound")}</p>{" "}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div onMouseOver={handleMouseOver10} onMouseOut={handleMouseOut10}>
          <div className={menutreecolor.flex_hover_bg}>
            <p className={`${menutreecolor.texthover}`}>{t("product.lightBlub")}</p>
            <p>
              <ChevronRight className="text-slate-900 dark:text-slate-200" />
            </p>
          </div>

          <div className="relative bottom-[24rem] md:left-[175px] lg:left-[195px] z-30 ">
            {isShown10 && (
              <div
                className="absolute 
      lg:w-[780px] 
      md:w-[535px]
      lg:h-[415px] 
      md:h-[388px] 
      shadow-xl 
      bg-white 
      dark:bg-slate-900
      rounded-md 
      animate-duration-500 
      animate-fade 
      animate-once 
      animate-ease-in-out 
      animate-normal 
      animate-fill-forwards"
              >
                {loadingBillboard || loadingCategory ? (
                  <div className="gap-2 flex flex-wrap items-center p-2">
                    {Array(10) // Create an array with 10 elements for the skeleton loader
                      .fill(0)
                      .map((_, index) => (
                        <Skeleton key={index} className="px-5 py-2" />
                      ))}
                  </div>
                ) : categories010.length > 0 ? (
                  <div className="space-x-5 px-5 py-2">
                    {categories010.map((categories) => (
                      <Link
                        key={categories.href}
                        href={categories.href}
                        className={cn(
                          "text-sm font-medium transition-colors hover:text-black dark:hover:text-slate-200",
                          categories.active
                            ? "text-black dark:text-slate-200"
                            : "text-neutral-500"
                        )}
                      >
                        {categories.label}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full w-full text-neutral-500">
                    <p>{t("product.productNotFound")}</p>{" "}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div onMouseOver={handleMouseOver11} onMouseOut={handleMouseOut11}>
          <div className={menutreecolor.flex_hover_bg}>
            <p className={`${menutreecolor.texthover}`}>{t("product.commonItem")}</p>
            <p>
              <ChevronRight className="text-slate-900 dark:text-slate-200" />
            </p>
          </div>

          <div className="relative bottom-[25.9rem] md:left-[175px] lg:left-[195px] z-30 ">
            {isShown11 && (
              <div
                className="absolute 
      lg:w-[780px] 
      md:w-[535px]
      lg:h-[415px] 
      md:h-[388px] 
      shadow-xl 
      bg-white 
      dark:bg-slate-900
      rounded-md 
      animate-duration-500 
      animate-fade 
      animate-once 
      animate-ease-in-out 
      animate-normal 
      animate-fill-forwards"
              >
                {loadingBillboard || loadingCategory ? (
                  <div className="gap-2 flex flex-wrap items-center p-2">
                    {Array(10) // Create an array with 10 elements for the skeleton loader
                      .fill(0)
                      .map((_, index) => (
                        <Skeleton key={index} className="px-5 py-2" />
                      ))}
                  </div>
                ) : categories011.length > 0 ? (
                  <div className="space-x-5 px-5 py-2">
                    {categories011.map((categories) => (
                      <Link
                        key={categories.href}
                        href={categories.href}
                        className={cn(
                          "text-sm font-medium transition-colors hover:text-black dark:hover:text-slate-200",
                          categories.active
                            ? "text-black dark:text-slate-200"
                            : "text-neutral-500"
                        )}
                      >
                        {categories.label}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full w-full text-neutral-500">
                    <p>{t("product.productNotFound")}</p>{" "}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuTree;
