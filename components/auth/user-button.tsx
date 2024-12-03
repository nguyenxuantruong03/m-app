"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Package, Settings, User } from "lucide-react";
import { LogOut } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useCurrentUser } from "@/hooks/use-current-user";
import LogoutButton from "@/components/auth/logout-button";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { Separator } from "../ui/separator";
import Link from "next/link";
import { ThemeToggleDrakorLight } from "../ui/theme-toggle";
import ImageCellOne from "../image-cell-one";
import { utcToZonedTime } from "date-fns-tz";
import { format } from "date-fns";
import CircleAvatar from "../ui/circle-avatar";
import viLocale from "date-fns/locale/vi";
import {
  translateMenuItems,
  translateName,
  translateNameuser,
} from "@/translate/translate-client";
const vietnamTimeZone = "Asia/Ho_Chi_Minh";

export interface AccountItem {
  id: string;
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token: string | null;
  access_token: string | null;
  expires_at: number | null;
  token_type: string | null;
  scope: string | null;
  id_token: string | null;
  session_state: string | null;
}

export const UserButton = () => {
  const userId = useCurrentUser();

  //Logic dưới đây dùng để kéo phải kéo trái userId.name nếu tên quá dài
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isGrabbing, setIsGrabbing] = useState(false);
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
    userId?.id && userId?.role !== "GUEST"
      ? userId?.language
      : storedLanguage || "vi";
  const menuItemMessage = translateMenuItems(languageToUse);
  const nameMessage = translateName(languageToUse);
  const nameUserMessage = translateNameuser(languageToUse);

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
      if (!userId || !userId.id) {
        redirect("/auth/login");
      }
    };

    fetchData();
  }, [userId]);

  const imageCredentials = userId?.imageCredential || undefined;
  // Use the first image from imageCredential hoăc ảnh iamge nêu ko có thì dùng deafault
  const avatarImage =
    imageCredentials ||
    (imageCredentials ? imageCredentials : null) ||
    userId?.image;

  //Fomat thời gian thành String
  const zonedSubtractedDate = utcToZonedTime(
    new Date(new Date(userId?.createdAt).getTime() - 7 * 60 * 60 * 1000),
    vietnamTimeZone
  );
  const formatcreatedAt = format(
    zonedSubtractedDate,
    "E '-' dd/MM/yyyy '-' HH:mm:ss a",
    { locale: viLocale }
  );
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <CircleAvatar
          srcFrame={userId?.frameAvatar}
          classAvatar="z-10"
          isCitizen={userId?.isCitizen}
          role={userId?.role}
          isLive={userId?.isLive}
          nameuser={userId?.nameuser}
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="z-[9999] p-5">
        <div className="flex items-center space-x-3">
          <Avatar>
            {avatarImage ? (
              <ImageCellOne
                imageUrl={avatarImage}
                createdAt={formatcreatedAt || ""}
                email={userId?.email || ""}
                isClient={true}
                languageToUse={languageToUse}
              />
            ) : avatarImage ? (
              <ImageCellOne
                imageUrl={avatarImage}
                createdAt={formatcreatedAt || ""}
                email={userId?.email || ""}
                isClient={true}
                languageToUse={languageToUse}
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
              {userId?.name || nameMessage}
            </p>

            <p className="text-xs text-gray-300 ">
              {userId?.nameuser || `@${nameUserMessage}`}
            </p>
          </div>
        </div>

        <Link href={`/me/${userId?.nameuser}`}>
          <DropdownMenuItem className="mt-4 mb-2 flex items-center">
            <User className="h-5 w-5 mr-2" /> {menuItemMessage.name1}
          </DropdownMenuItem>
        </Link>
        <Separator />

        <DropdownMenuItem className="flex items-center cursor-pointer">
          <ThemeToggleDrakorLight dropdown={false} />
        </DropdownMenuItem>

        <Separator />

        <Link href="/warehouse/package-product/delivered-product">
          <DropdownMenuItem className="my-2 flex items-center">
            <Package className="h-5 w-5 mr-2" /> {menuItemMessage.name2}
          </DropdownMenuItem>
        </Link>

        <Link href="/warehouse/package-product">
          <DropdownMenuItem className="my-2 flex items-center">
            <Package className="h-5 w-5 mr-2" /> {menuItemMessage.name3}
          </DropdownMenuItem>
        </Link>

        <Link href="/warehouse">
          <DropdownMenuItem className="my-2 flex items-center">
            <Package className="h-5 w-5 mr-2" /> {menuItemMessage.name4}
          </DropdownMenuItem>
          <Separator />
        </Link>

        <Separator />
        <Link href="/setting-profile">
          <DropdownMenuItem className="flex items-center cursor-pointer">
            <Settings className="h-5 w-5 mr-2" /> {menuItemMessage.name5}
          </DropdownMenuItem>
        </Link>

        <Separator />
        <LogoutButton>
          <DropdownMenuItem className="cursor-pointer mt-2">
            <LogOut className="h-5 w-5 mr-2" />
            {menuItemMessage.name6}
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
