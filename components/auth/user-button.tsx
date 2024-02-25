"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from 'lucide-react';
import { LogOut } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useCurrentUser } from "@/hooks/use-current-user";
import LogoutButton from "@/components/auth/logout-button";
import { ForDeleteImage } from "../ui/form-delete-image";

export const UserButton = () => {
  const user = useCurrentUser();
  const imageCredentials = user?.imageCredential || [];
// Lấy một số ngẫu nhiên từ 0 đến chiều dài của mảng
const randomIndex = Math.floor(Math.random() * imageCredentials.length);
// Lấy phần tử ngẫu nhiên từ mảng
const randomImage = imageCredentials[randomIndex];

// Sử dụng randomImage trong AvatarImage
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          {user?.image || randomImage ? (
            <AvatarImage src={user?.image || randomImage} />
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
