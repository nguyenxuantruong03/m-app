"use client";
import { useEffect, useState } from "react";
import ImageDelivery from "./Delivery";
import Mainnav from "./mainnav";
import { navbarcolor } from "@/components/(client)/color/color";
import "./delivery.css";
import { Home, AlignLeft, Heart, Gift, ShoppingCart } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { useParams } from "next/navigation";
import { useCurrentUser } from "@/hooks/use-current-user";

const Navbar = () => {
  const param = useParams();
  const user = useCurrentUser();
  const [activeIndex, setActiveIndex] = useState(0);
  const [totalCoins, setTotalCoins] = useState<number>(0);
  const [rotation, setRotation] = useState<number>(0);
  const [isHidden, setIsHidden] = useState(false);
  useEffect(() => {
    const savedActiveIndex = localStorage.getItem("activeIndex");
    if (savedActiveIndex) {
      setActiveIndex(Number(savedActiveIndex));
    }

    if (user?.role !== "GUEST" && user?.id) {
      axios.get(`/api/${param.storeId}/wheelSpin`).then((response) => {
        setTotalCoins(response.data.totalCoins);
        setRotation(response.data.latestRotation);
      });
    }
    
    // Add scroll event listener
    const handleScroll = () => {
      // Check if the scroll position is greater than or equal to 30
      setIsHidden(window.scrollY >= 30);
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const path = window.location.pathname;
    //Check xem thử hiện tại nó đang ở path nào thì sẽ active cái đó
    if (path === "/") {
      handleItemClick(0);
    } else if (path === "/home-product") {
      handleItemClick(1);
    } else if (path === "/listproduct") {
      handleItemClick(2);
    } else if (path === "/spinlucky") {
      // You might want to adjust this based on your actual routes
      handleItemClick(3);
    }
  }, []);

  const handleItemClick = (index: number) => {
    if (index === 4) {
      setActiveIndex(index);
      localStorage.setItem("activeIndex", index.toString());
    }
  };
  return (
    <>
      <div className=" fixed z-[9998] w-full top-0">
        {!isHidden && (
          <div className={navbarcolor.bg_height}>
            <div className="max-w-[640px] md:max-w-3xl lg:mx-auto lg:max-w-7xl md:p-1 lg:p-0">
              <div className="md:grid md:grid-cols-3 overflow-hidden overflow-x-auto">
                <ImageDelivery />
              </div>
            </div>
          </div>
        )}
        <div className={navbarcolor.bg}>
          <div className="xl:mx-auto xl:max-w-[85rem]">
            <div className="relative flex h-16 items-center justify-between px-1">
              <Mainnav role={user?.role || ""} userId={user?.id || ""} isLive={user?.isLive}/>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile */}
      <div className=" fixed z-[100] w-full bottom-0  md:hidden box-border bg-[#222327] h-[75px] rounded-[5px]">
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
                <span className="text">Trang chủ</span>
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
                <span className="text">Sản phẩm</span>
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
                <span className="text">Danh sách</span>
              </Link>
            </li>
            <li
              className={`list ${activeIndex === 3 ? "active" : ""}`}
              onClick={() => handleItemClick(3)}
            >
              <Link href="/favorite-product">
                <span className="icon">
                  <Heart />
                </span>
                <span className="text">Thả tim</span>
              </Link>
            </li>
            {(user?.role !== "GUEST" && user?.id) ? (
              <>
                <li
                  className={`list ${activeIndex === 4 ? "active" : ""}`}
                  onClick={() => handleItemClick(4)}
                >
                  <Link href="/spinlucky">
                    <span className="icon">
                      <Gift />
                    </span>
                    <span className="text">{rotation} vòng</span>
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li
                  className={`list ${activeIndex === 4 ? "active" : ""}`}
                  onClick={() => handleItemClick(4)}
                >
                  <div>
                    <span className="icon">
                      <Gift />
                    </span>
                    <span className="text">{rotation} vòng</span>
                  </div>
                </li>
              </>
            )}

            <div className="indicator"></div>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
