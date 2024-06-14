"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Bookmark,
  NotepadText,
  PencilLine,
  Settings,
  User,
} from "lucide-react";
import { LogOut } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useCurrentUser } from "@/hooks/use-current-user";
import LogoutButton from "@/components/auth/logout-button";
import { ForDeleteImage } from "../ui/form-delete-image";
import { getAccountByUserId } from "@/data/account";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Separator } from "../ui/separator";
import Link from "next/link";
import { ThemeToggleDrakorLight } from "../ui/theme-toggle";

interface AccountItem {
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
  const [account, setAccount] = useState<AccountItem | null>(null);

  //Logic dưới đây dùng để kéo phải kéo trái userId.name nếu tên quá dài
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isGrabbing, setIsGrabbing] = useState(false);

  const handleMouseDown = (e:React.MouseEvent<HTMLParagraphElement>) => {
    setIsDragging(true);
    setIsGrabbing(true); // Bắt đầu grab
    setStartX(e.pageX - e.currentTarget.offsetLeft);
    setScrollLeft(e.currentTarget.scrollLeft);
  };

  const handleMouseMove = (e:React.MouseEvent<HTMLParagraphElement>) => {
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

      try {
        const accountData = await getAccountByUserId(userId.id);
        setAccount(accountData || null);
      } catch (error) {
        toast.error("Invalid Error");
      }
    };

    fetchData();
  }, [userId]);

  const imageCredentials = userId?.imageCredential[0] || undefined;
  const isGitHubOrGoogleUser =
    account?.provider === "github" ||
    account?.provider === "google" ||
    account?.provider === "facebook" ||
    account?.provider === "gitlab" ||
    account?.provider === "reddit" ||
    account?.provider === "spotify" ||
    account?.provider === "twitter";
  // Use the first image from imageCredential if available, or randomImage if available
  const avatarImage =
    imageCredentials ||
    (imageCredentials ? imageCredentials[0] : null) ||
    userId?.image;
  // Sử dụng randomImage trong AvatarImage
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          {isGitHubOrGoogleUser && avatarImage ? (
            <AvatarImage src={avatarImage} />
          ) : avatarImage ? (
            <AvatarImage src={avatarImage} />
          ) : (
            <AvatarFallback className="bg-sky-500">
              <User className="text-white" />
            </AvatarFallback>
          )}
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="z-[9999] p-5">
        <div className="flex items-center space-x-3">
          <Avatar>
            {isGitHubOrGoogleUser && avatarImage ? (
              <AvatarImage src={avatarImage} />
            ) : avatarImage ? (
              <AvatarImage src={avatarImage} />
            ) : (
              <AvatarFallback className="bg-sky-500">
                <User className="text-white" />
              </AvatarFallback>
            )}
          </Avatar>
          <div className="">
          <p  className={`font-bold text-lg w-32 overflow-x-auto whitespace-nowrap ${grabCursorClass} hide-scrollbar select-none`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          
          >{userId?.name || "Người dùng"}</p>

            <p className="text-xs text-gray-300 ">{userId?.nameuser || "@Người dùng"}</p>
          </div>
        </div>

        <DropdownMenuItem className="mt-4 mb-2 flex items-center">
          <User className="h-5 w-5 mr-2" /> Trang cá nhân
        </DropdownMenuItem>

        <DropdownMenuItem>
          <ForDeleteImage />
        </DropdownMenuItem>

        <Separator />
        <DropdownMenuItem className="my-2 flex items-center">
          <PencilLine className="h-5 w-5 mr-2" /> Viết đánh giá
        </DropdownMenuItem>

        <DropdownMenuItem className="flex items-center">
          <NotepadText className="h-5 w-5 mr-2" /> Bài đánh giá của tôi
        </DropdownMenuItem>
        <Separator />

        <DropdownMenuItem className="my-2 flex items-center">
          <Bookmark className="h-5 w-5 mr-2" /> Bài viết đã lưu
        </DropdownMenuItem>
        <Separator />

        <DropdownMenuItem className="flex items-center cursor-pointer">
          <ThemeToggleDrakorLight dropdown={false}/>
        </DropdownMenuItem>
        
        <Separator />
        <Link href="/setting-profile">
          <DropdownMenuItem className="flex items-center cursor-pointer">
            <Settings className="h-5 w-5 mr-2" /> Cài đặt
          </DropdownMenuItem>
        </Link>
        
        <Separator />
        <LogoutButton>
          <DropdownMenuItem className="cursor-pointer mt-2">
            <LogOut className="h-5 w-5 mr-2" />
            Logout
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
