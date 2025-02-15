"use client";
import { useEffect, useState } from "react";
import ImageDelivery from "./Delivery";
import Mainnav from "./mainnav";
import { navbarcolor } from "@/components/(client)/color/color";
import "./delivery.css";
import {
  Home,
  AlignLeft,
  Heart,
  ShoppingCart,
  TicketPercent,
  PackageSearch,
  Blocks,
} from "lucide-react";
import Link from "next/link";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useTranslations } from "next-intl";

const Navbar = () => {
  const t = useTranslations()
  const user = useCurrentUser();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const savedActiveIndex = localStorage.getItem("activeIndex");
    if (savedActiveIndex) {
      setActiveIndex(Number(savedActiveIndex));
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsHidden(window.scrollY >= 30);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array to ensure this only registers once

  useEffect(() => {
    const path = window.location.pathname;
    //Check xem thử hiện tại nó đang ở path nào thì sẽ active cái đó
    if (path === "/") {
      handleItemClick(0);
    } else if (path === "/home-product") {
      handleItemClick(1);
    } else if (path === "/listproduct") {
      handleItemClick(2);
    } else if (path === "/favorite-product" || path === "/warehouse") {
      handleItemClick(3);
    } else if (
      path === "/utility" ||
      path.startsWith("/warehouse") ||
      path === "/spinlucky"
    ) {
      handleItemClick(4);
    } else {
      handleItemClick(0); // Default to 0 if no paths match
    }
  }, []);

  const handleItemClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <>
      <div className=" fixed z-[99999] w-full top-0">
        <div className={`${isHidden ? "hidden" : "max-w-full p-1 lg:p-0 h-[50px] lg:h-[40px] bg-[#e9efff] animate-fade-down animate-once animate-duration-[400ms] animate-delay-100 animate-ease-linear"}`}>
            <ImageDelivery />
        </div>
        <div className={navbarcolor.bg}>
          <div className="xl:mx-auto xl:max-w-[85rem]">
            <div className="relative flex h-16 items-center justify-between px-1">
              <Mainnav
                role={user?.role || ""}
                userId={user?.id || ""}
                isLive={user?.isLive}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className=" fixed z-[99999] w-full bottom-0  md:hidden box-border bg-[#222327] h-[75px] rounded-[5px]">
        <div className="navigation">
          <ul>
            <li
              className={`list ${activeIndex === 0 ? "active" : ""}`}
              onClick={() => handleItemClick(0)}
            >
              <Link href="/">
                <span className="icon">
                  <Home />
                </span>
                <span className="text">{t("navbar.homepage")}</span>
              </Link>
            </li>
            <li
              className={`list ${activeIndex === 1 ? "active" : ""}`}
              onClick={() => handleItemClick(1)}
            >
              <Link href="/home-product">
                <span className="icon">
                  <ShoppingCart />
                </span>
                <span className="text">{t("product.product")}</span>
              </Link>
            </li>
            <li
              className={`list ${activeIndex === 2 ? "active" : ""}`}
              onClick={() => handleItemClick(2)}
            >
              <Link href="/listproduct">
                <span className="icon">
                  <AlignLeft />
                </span>
                <span className="text">{t("navbar.list")}</span>
              </Link>
            </li>
            {user?.role !== "GUEST" && user?.id ? (
              <li
                className={`list ${activeIndex === 3 ? "active" : ""}`}
                onClick={() => handleItemClick(3)}
              >
                <Link href="/favorite-product">
                  <span className="icon">
                    <Heart />
                  </span>
                  <span className="text">{t("navbar.heart")}</span>
                </Link>
              </li>
            ) : (
              <li
                className={`list ${activeIndex === 3 ? "active" : ""}`}
                onClick={() => handleItemClick(3)}
              >
                <Link href="/warehouse">
                  <span className="icon">
                    <TicketPercent />
                  </span>
                  <span className="text">{t("navbar.voucher")}</span>
                </Link>
              </li>
            )}

            {user?.role !== "GUEST" && user?.id ? (
              <li
                className={`list ${activeIndex === 4 ? "active" : ""}`}
                onClick={() => handleItemClick(4)}
              >
                <Link href="/utility">
                  <span className="icon">
                    <Blocks />
                  </span>
                  <span className="text">{t("utility.utility")}</span>
                </Link>
              </li>
            ) : (
              <li
                className={`list ${activeIndex === 4 ? "active" : ""}`}
                onClick={() => handleItemClick(4)}
              >
                <Link href="/warehouse/package-product">
                  <span className="icon">
                    <PackageSearch />
                  </span>
                  <span className="text">{t("order.order")}</span>
                </Link>
              </li>
            )}

            <div className="indicator"></div>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
