"use client";
import ImageCellOne from "@/components/image-cell-one";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useCurrentUser } from "@/hooks/use-current-user";

import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import { ScrollText, User, Ticket, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import viLocale from "date-fns/locale/vi";
import Image from "next/image";
import Link from "next/link";
import {
  translateMyAccount,
  translatePasswordSecurity,
  translatePurchaseOrder,
  translateUserInfo,
  translateVoucherWarehouse,
} from "@/translate/translate-client";
const vietnamTimeZone = "Asia/Ho_Chi_Minh";

const InfoDelivery = () => {
  const pathname = usePathname();
  const router = useRouter();
  const user = useCurrentUser();

  //Logic dưới đây dùng để kéo phải kéo trái userId.name nếu tên quá dài
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isGrabbing, setIsGrabbing] = useState(false);
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [storedLanguage, setStoredLanguage] = useState<string | null>(null);

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
  const voucherWarehouseMessage = translateVoucherWarehouse(languageToUse);
  const purchaseOrderMessage = translatePurchaseOrder(languageToUse);
  const userInfoMessage = translateUserInfo(languageToUse);
  const passwordSecurityMessage = translatePasswordSecurity(languageToUse);
  const myAccountMessage = translateMyAccount(languageToUse);

  const handleMouseDown = (e: React.MouseEvent<HTMLParagraphElement>) => {
    setIsDragging(true);
    setIsGrabbing(true); // Bắt đầu grab
    setStartX(e.pageX - e.currentTarget.offsetLeft);
    setScrollLeft(e.currentTarget.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLParagraphElement>) => {
    if (!isDragging) return;
    const x = e.pageX - e.currentTarget.offsetLeft;
    const walk = (x - startX) * 3; // Điều chỉnh tốc độ kéo ở đây
    e.currentTarget.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsGrabbing(false); // Kết thúc grab
  };

  // Thêm class cursor-grabbing khi đang grab, và class cursor-grab khi không grab
  const grabCursorClass = isGrabbing ? "cursor-grabbing" : "cursor-grab";

  // Detect click outside the menu to close it
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false); // Close the menu if the click is outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY >= 30);
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!user || !user.id) {
        router.push("/auth/login");
      }
    };

    fetchData();
  }, [user]);

  const imageCredentials = user?.imageCredential || undefined;
  // Use the first image from imageCredential hoăc ảnh iamge nêu ko có thì dùng deafault
  const avatarImage =
    imageCredentials ||
    (imageCredentials ? imageCredentials : null) ||
    user?.image;

  //Fomat thời gian thành String
  const zonedSubtractedDate = utcToZonedTime(
    new Date(new Date(user?.createdAt).getTime() - 7 * 60 * 60 * 1000),
    vietnamTimeZone
  );
  const formatcreatedAt = format(
    zonedSubtractedDate,
    "E '-' dd/MM/yyyy '-' HH:mm:ss a",
    { locale: viLocale }
  );

  const navbarInfo = [
    {
      href: `/warehouse`,
      label: voucherWarehouseMessage,
      icon: <Ticket className="h-5 w-5 text-yellow-500" />,
      active: pathname === `/warehouse`,
    },
    {
      href: `/warehouse/package-product`,
      label: purchaseOrderMessage,
      icon: <ScrollText className="w-5 h-5 text-blue-700" />,
      active:
        pathname === `/warehouse/package-product` ||
        pathname === `/warehouse/package-product/confirmation-product` ||
        pathname === `/warehouse/package-product/prepare-product` ||
        pathname === `/warehouse/package-product/transport-product` ||
        pathname === `/warehouse/package-product/delivered-product` ||
        pathname === `/warehouse/package-product/return-product` ||
        pathname === `/warehouse/package-product/cancel-product`,
    },
  ];

  const accountOptions = [
    {
      href: `/warehouse/user/setting-profile`,
      label: userInfoMessage,
      active: pathname === `/warehouse/user/setting-profile`,
    },
    {
      href: `/warehouse/user/password-security`,
      label: passwordSecurityMessage,
      active: pathname === `/warehouse/user/password-security`,
    },
  ];

  return (
    <>
      <div className="max-w-xs my-2 md:my-8 hidden md:block">
        <div className="flex items-center space-x-3">
          <Avatar>
            {avatarImage ? (
              <ImageCellOne
                imageUrl={avatarImage}
                createdAt={formatcreatedAt || ""}
                email={user?.email || ""}
                isClient={true}
                languageToUse={languageToUse}
              />
            ) : avatarImage ? (
              <ImageCellOne
                imageUrl={avatarImage}
                createdAt={formatcreatedAt || ""}
                email={user?.email || ""}
                isClient={true}
                languageToUse={languageToUse}
              />
            ) : (
              <AvatarFallback className="bg-sky-500">
                <User className="text-white" />
              </AvatarFallback>
            )}
          </Avatar>
          <Link
            href={`${
              user?.isLive
                ? `/live/${user?.nameuser}`
                : `/user/${user?.nameuser}`
            }`}
          >
            <p
              className={`font-bold text-slate-900 dark:text-slate-200 dark:hover:text-slate-300 hover:text-slate-700 text-lg w-32 overflow-x-auto whitespace-nowrap ${grabCursorClass} hide-scrollbar select-none`}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              {user?.name || "Người dùng"}
            </p>

            <p className="text-xs text-slate-900 dark:text-slate-400 ">
              {user?.nameuser || "@Người dùng"}
            </p>
          </Link>
        </div>
        {navbarInfo.map((item) => (
          <div key={item.href} onClick={() => router.push(item.href)}>
            <p className="font-semibold cursor-pointer py-1.5 flex items-center">
              {item.icon}{" "}
              <span
                className={cn(
                  "ml-1",
                  item.active
                    ? "text-red-600 hover:text-slate-900 dark:hover:text-red-400"
                    : "text-slate-900 dark:text-slate-200 dark:hover:text-red-500 hover:text-red-500"
                )}
              >
                {item.label}
              </span>
            </p>
          </div>
        ))}

        <Accordion type="single" collapsible>
          <AccordionItem value="account" hasBorder={false}>
            <AccordionTrigger
              hasSpace={false}
              className="font-semibold cursor-pointer text-slate-900 dark:text-slate-200 dark:hover:text-red-500 hover:text-red-500 py-1.5"
            >
              <User className="h-5 w-5 text-sky-500" />{" "}
              <span
                className={cn(
                  "ml-1",
                  pathname === `/warehouse/user/setting-profile` ||
                    pathname === `/warehouse/user/password-security`
                    ? "text-blue-600"
                    : "text-slate-900 dark:text-slate-200"
                )}
              >
                {myAccountMessage}
              </span>
            </AccordionTrigger>
            <AccordionContent>
              {accountOptions.map((option) => (
                <p
                  key={option.href}
                  onClick={() => router.push(option.href)}
                  className={cn(
                    "cursor-pointer py-1 ml-5 ",
                    option.active
                      ? "text-red-600 hover:text-red-500 dark:hover:text-red-500"
                      : "text-slate-900 dark:text-slate-200 hover:text-red-800 dark:hover:text-red-300"
                  )}
                >
                  {option.label}
                </p>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <>
        <div
          className={`fixed ${
            isScrolled ? "top-16" : "top-24"
          } left-0 md:hidden z-[9999]`}
        >
          <button
            type="button"
            className="dark:bg-slate-900 bg-slate-200 rounded-md p-2 inline-flex items-center justify-center text-gray-400  hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            onClick={() => setOpen(!open)}
          >
            <span className="sr-only">Open menu</span>
            {/* Heroicon name: outline/menu */}
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        <div
          ref={menuRef}
          className={
            open
              ? "opacity-100 z-[99999] scale-100 animate-fade-down animate-duration-[300ms] animate-ease-linear fixed top-0 inset-x-0 transform origin-top-right md:hidden "
              : "hidden scale-95 absolute top-0 inset-x-0 p-2 transition transform origin-top-right"
          }
        >
          <div className="rounded-b-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-slate-200 dark:bg-slate-900 divide-y-2 divide-gray-50 z-[999]">
            <div className="pt-5 pb-6 px-5">
              <div className="flex items-center justify-between">
                <Image
                  alt=""
                  src="/images/logo-mini.png"
                  width="45"
                  height="30"
                  className="rounded-sm bg-[#c3c3c3] dark:bg-slate-700 py-1.5 px-2.5"
                />
                <div className="-mr-2">
                  <button
                    type="button"
                    className="bg-[#c3c3c3] dark:bg-slate-700 rounded-full p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                    onClick={() => setOpen(!open)}
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>
              <>
                <div className="mt-6">
                  <div className="flex items-center space-x-3">
                    <div onClick={() => setOpen(false)}>
                      <Avatar>
                        {avatarImage ? (
                          <ImageCellOne
                            imageUrl={avatarImage}
                            createdAt={formatcreatedAt || ""}
                            email={user?.email || ""}
                            isClient={true}
                            languageToUse={languageToUse}
                          />
                        ) : avatarImage ? (
                          <ImageCellOne
                            imageUrl={avatarImage}
                            createdAt={formatcreatedAt || ""}
                            email={user?.email || ""}
                            isClient={true}
                            languageToUse={languageToUse}
                          />
                        ) : (
                          <AvatarFallback className="bg-sky-500">
                            <User className="text-white" />
                          </AvatarFallback>
                        )}
                      </Avatar>
                    </div>
                    <Link
                      href={`${
                        user?.isLive
                          ? `/live/${user?.nameuser}`
                          : `/user/${user?.nameuser}`
                      }`}
                    >
                      <p
                        className={`font-bold text-slate-900 dark:text-slate-200 dark:hover:text-slate-300 hover:text-slate-700 text-lg w-32 overflow-x-auto whitespace-nowrap ${grabCursorClass} hide-scrollbar select-none`}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                      >
                        {user?.name || "Người dùng"}
                      </p>

                      <p className="text-xs text-slate-900 dark:text-slate-400 ">
                        {user?.nameuser || "@Người dùng"}
                      </p>
                    </Link>
                  </div>
                  {navbarInfo.map((item) => (
                    <div key={item.href} onClick={() => router.push(item.href)}>
                      <p className="font-semibold cursor-pointer py-1.5 flex items-center">
                        {item.icon}{" "}
                        <span
                          className={cn(
                            "ml-1",
                            item.active
                              ? "text-red-600 hover:text-slate-900 dark:hover:text-red-400"
                              : "text-slate-900 dark:text-slate-200 dark:hover:text-red-500 hover:text-red-500"
                          )}
                        >
                          {item.label}
                        </span>
                      </p>
                    </div>
                  ))}

                  <Accordion type="single" collapsible>
                    <AccordionItem value="account" hasBorder={false}>
                      <AccordionTrigger
                        hasSpace={false}
                        className="font-semibold cursor-pointer text-slate-900 dark:text-slate-200 dark:hover:text-red-500 hover:text-red-500 py-1.5"
                      >
                        <User className="h-5 w-5 text-sky-500" />{" "}
                        <span
                          className={cn(
                            "ml-1",
                            pathname === `/warehouse/user/setting-profile` ||
                              pathname === `/warehouse/user/password-security`
                              ? "text-blue-600"
                              : "text-slate-900 dark:text-slate-200"
                          )}
                        >
                          {myAccountMessage}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent>
                        {accountOptions.map((option) => (
                          <p
                            key={option.href}
                            onClick={() => router.push(option.href)}
                            className={cn(
                              "cursor-pointer py-1 ml-5 ",
                              option.active
                                ? "text-red-600 hover:text-slate-900 dark:hover:text-red-400"
                                : "text-slate-900 dark:text-slate-200 hover:text-red-500"
                            )}
                          >
                            {option.label}
                          </p>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default InfoDelivery;
