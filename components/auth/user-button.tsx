"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "lucide-react";
import { LogOut } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useCurrentUser } from "@/hooks/use-current-user";
import LogoutButton from "@/components/auth/logout-button";
import { ForDeleteImage } from "../ui/form-delete-image";
import { getAccountByUserId } from "@/data/account";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import {toast} from "react-hot-toast";

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

  useEffect(() => {
    const fetchData = async () => {
      if (!userId || !userId.id) {
        redirect("/auth/login");
      }

      try {
        const accountData = await getAccountByUserId(userId.id);
        setAccount(accountData || null);
      } catch (error) {
        toast.error("Invalid Error")
      }
    };

    fetchData();
  }, [userId]);

  const imageCredentials = userId?.imageCredential[0] || undefined;
  const isGitHubOrGoogleUser =
    account?.provider === "github" || account?.provider === "google";
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
      <DropdownMenuContent className="">
        <DropdownMenuItem>
          <ForDeleteImage />
        </DropdownMenuItem>
        <LogoutButton>
          <DropdownMenuItem className="cursor-pointer">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
