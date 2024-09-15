"use client";
import Link from "next/link";
import {
  AlignJustify,
  ShoppingBag,
  Gift,
  Coins,
  Gamepad2,
  Heart,
  Bell,
  CircleUser,
  UserRoundPlus,
  Blocks,
  TicketPercent,
  PackageSearch,
  ShoppingCart,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useParams, useRouter } from "next/navigation";
// import useCart from "@/hooks/use-cart";
import Menu from "@/components/(client)/slider-item/menu";
import axios from "axios";
import { mainnavcolor } from "@/components/(client)/color/color";
import Image from "next/image";
import "./mainnav.css";
import SearchPage from "@/components/(client)/search/search";
import { UserButton } from "@/components/auth/user-button";
import useFavorite from "@/hooks/client/db/use-favorite";
import useCart from "@/hooks/client/use-cart";
import { cn } from "@/lib/utils";
import { AlertGuestModal } from "@/components/modals/alert-guest-login-modal";
import useCartdb from "@/hooks/client/db/use-cart-db";

interface mainNavProps {
  role: string;
  userId: string;
}

const MainNav: React.FC<mainNavProps> = ({ role, userId }) => {
  const pathname = usePathname();
  const param = useParams();
  const router = useRouter();
  const cart = useCart();
  const cartdb = useCartdb();
  const favorite = useFavorite();
  const [isMounted, setIsMounted] = useState(false);
  const [alertGuestModal, setAlertGuestModal] = useState(false);
  //List-onClick-onBlur click mở blur ra ngoài thì tắt đi
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const handleOutsideClick = useCallback((event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  }, []);

  const handleOpenAlertGuest = () => {
    setAlertGuestModal(true);
  };

  useEffect(() => {
    if (role !== "GUEST" && userId) {
      const fetchData = async () => {
        try {
          await cartdb.fetchCartItems(userId);
          await favorite.fetchFavoriteItems(userId);
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      // Add the event listener when the menu is open
      document.addEventListener("click", handleOutsideClick);
    } else {
      // Remove the event listener when the menu is closed
      document.removeEventListener("click", handleOutsideClick);
    }
    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpen, handleOutsideClick]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  //Coin
  const [totalCoins, setTotalCoins] = useState<number>(0);
  const [rotation, setRotation] = useState<number>(0);

  useEffect(() => {
    if (role !== "GUEST" && userId) {
      // Load totalCoins from the server using GET request
      axios.get(`/api/${param.storeId}/wheelSpin`).then((response) => {
        setTotalCoins(response.data.totalCoins);
        setRotation(response.data.latestRotation);
      });
    }
  }, [param.storeId, role]);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <AlertGuestModal
        isOpen={alertGuestModal}
        onClose={() => setAlertGuestModal(false)}
      />

      <Link href="/home-product">
        <div className="hidden xl:block">
          <div className="bg-[#333]  p-1  rounded-lg">
            <svg
              width="120"
              height="35"
              viewBox="0 0 512 52"
              xmlns="http://www.w3.org/2000/svg"
            >
              <text x="20" y="10" className="text1">
                Xuân
              </text>
              <text x="160" y="10" className="text2">
                Trường
              </text>
              <text x="32" y="72" className="text1">
                vật liệu
              </text>
              <text x="245" y="72" className="text3">
                xây dựng
              </text>
            </svg>
          </div>
        </div>
        <div className="block xl:hidden">
          <Image
            alt=""
            src="/images/logo.ico"
            width="45"
            height="45"
            className="rounded-md m-[6.5px] border border-white"
          />
        </div>
      </Link>

      <div onClick={toggleOpen} className="hidden lg:block">
        <div className={mainnavcolor.bg_list}>
          <div className="flex items-center justify-center text-white ">
            <div className="px-1 py-1">
              <AlignJustify className="w-5 h-5" />
            </div>
            Danh sách
          </div>
        </div>
      </div>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-10"
          onClick={toggleOpen}
        ></div>
      )}
      {/* Menu */}
      {isOpen && (
        <div className="absolute top-[-40px] z-40 " ref={menuRef}>
          <Menu showCategories={true} />
        </div>
      )}

      <div className={mainnavcolor.bgroundedmd}>
        <div className=" flex-col md:flex-row justify-center  items-center  py-[2px] hidden md:flex">
          <div className="basis-1/2 md:flex gap-2">
            <div className="basis-1/3 flex md:flex-col flex-row items-center justify-center ">
              <Coins className=" text-white w-5 h-5" />
            </div>
            <div className="basis-2/3 ">
              <div className="text-sm flex gap-3 text-white">Tổng xu</div>
              <div className="text-sm w-24 text-white"> {totalCoins} xu</div>
            </div>
          </div>
        </div>
      </div>

      <div className="ml-1.5 md:ml-0">
        <SearchPage />
      </div>

      <NavigationMenu className="hidden md:block">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              <div>
                <div className="flex flex-col md:flex-row justify-center  items-center relative">
                  <div className="basis-1/2 md:flex gap-2">
                    <div className="basis-1/3 flex md:flex-col flex-row items-center justify-center ">
                      <Blocks className="w-6 h-6 text-white" />
                    </div>
                    <div className="basis-2/3 hidden md:block">
                      <div className="text-xs flex gap-4 text-white">Tiện</div>
                      <div className="text-xs text-white">ích</div>
                    </div>
                  </div>
                </div>
              </div>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      href="/"
                    >
                      <ShoppingCart className="h-6 w-6" />
                      <div className="mb-2 mt-4 text-lg font-medium">
                        Mua sắm thỏa ga
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        Việc mua sắm sẽ tiết kiệm nhiều chi phí được giảm giá
                        qua từng khung giờ.
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>

                <>
                  <div
                    onClick={() => {
                      if (role !== "GUEST" && userId) {
                        router.push("/spinlucky");
                      } else {
                        handleOpenAlertGuest();
                      }
                    }}
                    className=" hidden md:block cursor-pointer"
                  >
                    <div className={mainnavcolor.bghover}>
                      <div className="flex flex-col md:flex-row items-center">
                        <div className="basis-1/2 md:flex gap-2">
                          <div className="basis-1/3 flex md:flex-col flex-row items-center justify-center relative">
                            <Gift className="w-6 h-6 text-white" />
                            <span className="w-5 h-5 absolute bg-[#e53350] rounded-full  left-[10px] top-0 -mt[1px] shadow-lg">
                              <p className="text-[0.75rem] text-center font-semibold text-white">
                                {rotation}{" "}
                              </p>
                            </span>
                          </div>
                          <div className="basis-2/3">
                            <div
                              className={cn(
                                "text-xs w-20",
                                pathname === `/spinlucky`
                                  ? "text-sky-500"
                                  : "text-white"
                              )}
                            >
                              Vòng quay
                            </div>
                            <div
                              className={cn(
                                "text-xs w-20",
                                pathname === `/spinlucky`
                                  ? "text-sky-500"
                                  : "text-white"
                              )}
                            >
                              May Mắn
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Link href="/ticket" className=" hidden md:block">
                    <div className={mainnavcolor.bghover}>
                      <div className="flex flex-col md:flex-row items-center">
                        <div className="basis-1/2 md:flex gap-2">
                          <div className="basis-1/3 flex md:flex-col flex-row items-center justify-center relative">
                            <TicketPercent className="w-6 h-6 text-white" />
                            {/* <span className="w-5 h-5 absolute bg-[#e53350] rounded-full  left-[10px] top-0 -mt[1px] shadow-lg">
                            <p className="text-[0.75rem] text-center font-semibold text-white">
                              {rotation}{" "}
                            </p>
                          </span> */}
                          </div>
                          <div className="basis-2/3 text-red-500">
                            <div
                              className={cn(
                                "text-xs w-20",
                                pathname === `/ticket`
                                  ? "text-sky-500"
                                  : "text-white"
                              )}
                            >
                              Mã giảm giá
                            </div>
                            <div
                              className={cn(
                                "text-xs w-20",
                                pathname === `/ticket`
                                  ? "text-sky-500"
                                  : "text-white"
                              )}
                            >
                              siêu sốc
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>

                  <Link href="/warehouse/package-product" className=" hidden md:block">
                    <div className={mainnavcolor.bghover}>
                      <div className="flex flex-col md:flex-row items-center">
                        <div className="basis-1/2 md:flex gap-2">
                          <div className="basis-1/3 flex md:flex-col flex-row items-center justify-center relative">
                            <PackageSearch className="w-6 h-6 text-white" />
                          </div>
                          <div className="basis-2/3 text-red-500">
                            <div
                              className={cn(
                                "text-xs flex gap-4 text-white",
                                pathname === `/warehouse/package-product`
                                  ? "text-sky-500"
                                  : "text-white"
                              )}
                            >
                              Vận chuyển
                            </div>
                            <div
                              className={cn(
                                "text-xs w-20",
                                pathname === `/warehouse/package-product`
                                  ? "text-sky-500"
                                  : "text-white"
                              )}
                            >
                              đơn hàng
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div
        onClick={() => {
          if (role !== "GUEST" && userId) {
            router.push("/game");
          } else {
            handleOpenAlertGuest();
          }
        }}
        className="hidden xl:block"
      >
        <div className={mainnavcolor.bghover}>
          <div className="flex flex-col md:flex-row justify-center  items-center">
            <div className="basis-1/2 md:flex gap-2">
              <div className="basis-1/3 flex md:flex-col flex-row items-center justify-center ">
                <Gamepad2 className=" text-white w-6 h-6" />
              </div>
              <div className="basis-2/3">
                <div className="text-xs flex gap-4 text-white">Trò chơi</div>
                <div className="text-xs w-14 text-white">giải trí</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        onClick={() => {
          if (role !== "GUEST" && userId) {
            router.push("/favorite-product");
          } else {
            handleOpenAlertGuest();
          }
        }}
        className={`${role === "GUEST" || !userId ? "hidden" : "hidden md:flex"}`}
      >
        <button>
          <div className={mainnavcolor.bghover_gio_hang}>
            <div className="flex flex-col md:flex-row justify-center  items-center relative">
              <div className="basis-1/2 md:flex gap-2">
                <div className="basis-1/3 flex md:flex-col flex-row items-center justify-center ">
                  <Heart className="w-6 h-6 text-white" />
                  <span className="w-5 h-5 absolute bg-[#e53350] rounded-full left-[10px] -top-[5px] md:top-0 bg-opacity-90 -mt[1px] shadow-lg">
                    <p className="text-[0.75rem] m-auto text-white font-semibold">
                      {favorite.items.length}
                    </p>
                  </span>
                </div>
                <div className="basis-2/3 hidden md:block">
                  <div className="text-xs flex gap-4 text-white">Thả</div>
                  <div className="text-xs text-white">Tim</div>
                </div>
              </div>
            </div>
          </div>
        </button>
      </div>

      <Link href="/cart">
        <button>
          <div className={mainnavcolor.bghover_gio_hang}>
            <div className="flex flex-col md:flex-row justify-center  items-center relative">
              <div className="basis-1/2 md:flex gap-2">
                <div className="basis-1/3 flex md:flex-col flex-row items-center justify-center ">
                  <ShoppingBag className="w-6 h-6 text-white" />
                  <span className="w-5 h-5 absolute bg-[#e53350] rounded-full left-[10px] -top-[5px] md:top-0 bg-opacity-90 -mt[1px] shadow-lg">
                    <p className="text-[0.75rem] m-auto text-white font-semibold">
                      {role !== "GUEST" && userId ? (
                        <>{cartdb.items.length || "0"}</>
                      ) : (
                        <>{cart.items.length}</>
                      )}
                    </p>
                  </span>
                </div>
                <div className="basis-2/3 hidden md:block">
                  <div className="text-xs flex gap-4 text-white">Giỏ</div>
                  <div className="text-xs text-white">hàng</div>
                </div>
              </div>
            </div>
          </div>
        </button>
      </Link>

      <div className="flex items-center justify-between">
        {userId ? (
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-full hover:bg-gray-300 hover:bg-opacity-50 cursor-pointer">
              <Bell className="size-5 text-amber-400" />
            </div>
            <div>
              <UserButton />
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-end md:flex-1">
            <Link href="/auth/login">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="whitespace-nowrap p-1 lg:p-2 border-slate-300 shadow-sm rounded-md border-2 2xl:text-base lg:text-sm font-medium text-white hover:border-slate-900 dark:hover:text-slate-900">
                      <span className="flex items-center 2xl:text-base lg:text-sm">
                        <CircleUser className="size-3 lg:h-5 lg:w-5 2xl:size-4 md:mr-1" />
                        <span className="hidden md:block"> Login</span>
                      </span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>Đăng nhập</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Link>
            <Link href="/auth/register" className="ml-3">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="whitespace-nowrap inline-flex items-center justify-center p-1 lg:p-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                      <span className="flex items-center 2xl:text-base lg:text-sm">
                        <UserRoundPlus className="size-3 lg:h-5 lg:w-5 2xl:size-4 md:mr-1" />
                        <span className="hidden md:block"> Register</span>
                      </span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>Đăng ký</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default MainNav;
