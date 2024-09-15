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
import { ScrollText,User,Ticket } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import viLocale from "date-fns/locale/vi";
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
      label: "Kho voucher",
      icon: <Ticket className="h-5 w-5 text-yellow-500"/>,
      active: pathname === `/warehouse`,
    },
    {
      href: `/warehouse/package-product`,
      label: "Đơn mua",
      icon: <ScrollText className="w-5 h-5 text-blue-700"/>,
      active:
        pathname === `/warehouse/package-product` ||
        pathname === `/warehouse/package-product/confirmation-product` ||
        pathname === `/warehouse/package-product/prepare-product` ||
        pathname === `/warehouse/package-product/transport-product` ||
        pathname === `/warehouse/package-product/delivered-product` ||
        pathname === `/warehouse/package-product/return-product` || 
        pathname === `/warehouse/package-product/cancel-product`
    },
  ];

  const accountOptions = [
    {
      href: `/warehouse/user/setting-profile`,
      label: "Thông tin người dùng",
      active: pathname === `/warehouse/user/setting-profile`,
    },
    {
      href: `/warehouse/user/password-security`,
      label: "Mật khẩu & bảo mật",
      active: pathname === `/warehouse/user/password-security`,
    },
  ];

  return (
    <div className="w-1/6 max-w-xs my-8">
      <div className="flex items-center space-x-3">
          <Avatar>
            { avatarImage ? (
              <ImageCellOne
                imageUrl={avatarImage}
                createdAt={formatcreatedAt || ""}
                email={user?.email || ""}
              />
            ) : avatarImage ? (
              <ImageCellOne
                imageUrl={avatarImage}
                createdAt={formatcreatedAt || ""}
                email={user?.email || ""}
              />
            ) : (
              <AvatarFallback className="bg-sky-500">
                <User className="text-white" />
              </AvatarFallback>
            )}
          </Avatar>
          <div className="">
            <p
              className={`font-bold text-lg w-32 overflow-x-auto whitespace-nowrap ${grabCursorClass} hide-scrollbar select-none`}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              {user?.name || "Người dùng"}
            </p>

            <p className="text-xs text-gray-300 ">
              {user?.nameuser || "@Người dùng"}
            </p>
          </div>
        </div>
      {navbarInfo.map((item) => (
        <div key={item.href} onClick={() => router.push(item.href)}>
          <p
            className="font-semibold cursor-pointer py-1.5 flex items-center"
          >
            {item.icon} <span className={cn(
              "ml-1",
              item.active
                ? "text-red-600 hover:text-slate-900 dark:hover:text-red-400"
                : "text-slate-900 hover:text-red-500"
            )}>{item.label}</span>
          </p>
        </div>
      ))}

      <Accordion type="single" collapsible>
        <AccordionItem value="account" hasBorder={false}>
          <AccordionTrigger
            hasSpace={false}
            className="font-semibold cursor-pointer text-slate-900 hover:text-red-500 py-1.5"
          >
          <User className="h-5 w-5 text-sky-500"/> <span className={cn(
              "ml-1",
              pathname === `/warehouse/user/setting-profile` || pathname === `/warehouse/user/password-security`
                ? "text-blue-600"
                : "text-slate-900"
            )}>Tài khoản của tôi</span>
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
                    : "text-slate-900 hover:text-red-500"
                )}
              >
                {option.label}
              </p>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default InfoDelivery;
