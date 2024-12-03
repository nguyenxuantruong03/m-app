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
import axios from "axios";
import { useParams } from "next/navigation";
import { useCurrentUser } from "@/hooks/use-current-user";
import {
  translateHeart,
  translateHomepage,
  translateList,
  translateOrder,
  translatePackageProduct,
  translateProduct,
  translateUtility,
  translateVoucher,
} from "@/translate/translate-client";

const Navbar = () => {
  const param = useParams();
  const user = useCurrentUser();
  const [activeIndex, setActiveIndex] = useState(0);
  const [totalCoins, setTotalCoins] = useState<number>(0);
  const [rotation, setRotation] = useState<number>(0);
  const [isHidden, setIsHidden] = useState(false);
  const [storedLanguage, setStoredLanguage] = useState<string | null>(null);

  useEffect(() => {
    // Check if we're running on the client side
    if (typeof window !== "undefined") {
      const language = localStorage.getItem("language");
      setStoredLanguage(language);
    }
  }, []);

  //languages
  const languageToUse =
    user?.id && user?.role !== "GUEST"
      ? user?.language
      : storedLanguage || "vi";
  const homepageMessage = translateHomepage(languageToUse);
  const productMessage = translateProduct(languageToUse);
  const listMessage = translateList(languageToUse);
  const heartMessage = translateHeart(languageToUse);
  const voucherMessage = translateVoucher(languageToUse);
  const ubilityMessage = translateUtility(languageToUse);
  const orderMessage = translateOrder(languageToUse);

  useEffect(() => {
    const savedActiveIndex = localStorage.getItem("activeIndex");
    if (savedActiveIndex) {
      setActiveIndex(Number(savedActiveIndex));
    }
  }, []);

  useEffect(() => {
    //TODO: Gắn tổng số lượng coin hoặc rotation lên icon
    if (user?.role !== "GUEST" && user?.id) {
      axios.get(`/api/${param.storeId}/wheelSpin`).then((response) => {
        setTotalCoins(response.data.totalCoins);
        setRotation(response.data.latestRotation);
      });
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
        <div className={`${isHidden ? "hidden" : ""} ${navbarcolor.bg_height}`}>
          <div className="max-w-[640px] md:max-w-3xl lg:mx-auto lg:max-w-7xl md:p-1 lg:p-0">
            <div className="md:grid md:grid-cols-3 overflow-hidden overflow-x-auto">
              <ImageDelivery languageToUse={languageToUse} />
            </div>
          </div>
        </div>
        <div className={navbarcolor.bg}>
          <div className="xl:mx-auto xl:max-w-[85rem]">
            <div className="relative flex h-16 items-center justify-between px-1">
              <Mainnav
                role={user?.role || ""}
                userId={user?.id || ""}
                isLive={user?.isLive}
                languageToUse={languageToUse}
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
                <span className="text">{homepageMessage}</span>
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
                <span className="text">{productMessage}</span>
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
                <span className="text">{listMessage}</span>
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
                  <span className="text">{heartMessage}</span>
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
                  <span className="text">{voucherMessage}</span>
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
                  <span className="text">{ubilityMessage}</span>
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
                  <span className="text">{orderMessage}</span>
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
