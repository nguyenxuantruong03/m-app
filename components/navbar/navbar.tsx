import prismadb from "@/lib/prismadb";

import { redirect } from "next/navigation";
import StoreSwitcher from "./store-switcher";
import MainNav from "./main-nav";
import { ThemeToggleDrakorLight } from "../ui/theme-toggle";
import { currentUser } from "@/lib/auth";
import { UserRole } from "@prisma/client";
import { Settings, LogOut } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User } from "lucide-react";
import LogoutButton from "../auth/logout-button";
import { getAccountByUserId } from "@/data/account";
import { FormUploadImage } from "../ui/form-upload-image-avatar";

const Navbar = async () => {
  const userId = await currentUser();

  if (!userId || !userId.id) {
    redirect("/auth/login");
  }

  const account = await getAccountByUserId(userId.id);
  const imageCredentials = userId?.imageCredential[0];
  const isGitHubOrGoogleUser =
    account?.provider === "github" || account?.provider === "google";
    const avatarImage =imageCredentials ||(imageCredentials ? imageCredentials[0] : null) ||userId?.image;
  const store = await prismadb.store.findMany({
    where: {
      userId: {
        equals: UserRole.USER,
      },
    },
  });

  const getRoleColorClass = (role: UserRole) => {
    switch (role) {
      case UserRole.ADMIN:
        return "text-red-500 cursor-pointer font-bold";
      case UserRole.STAFF:
        return "text-blue-500 cursor-pointer font-bold";
      case UserRole.USER:
      default:
        return "text-black cursor-pointer font-bold";
    }
  };

  return (
    <div className="border-b relative">
      <div className="items-center px-4 my-4">
        <StoreSwitcher items={store} />
        <MainNav className="mx-6" />

        <div className="flex items-center space-x-4 mt-2 justify-center">
          <div className="group relative">
      {/* Ảnh đại diện */}
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
            <FormUploadImage classNamesForm="absolute left-[-15px] top-[-3px]" classNamesUpload="opacity-0"/>
            <span className="absolute top-11 left-0 bg-white rounded-lg p-1 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
              Ảnh
            </span>
          </div>
      {/* Chế độ */}
          <div className="group relative">
            <ThemeToggleDrakorLight />
            <span className="absolute top-11 left-[-4px] bg-white rounded-lg p-1 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
              Mode
            </span>
          </div>
      {/* Cài đặt */}
          <Link href={`/infouser`}>
            <div className="group relative bg-white hover:bg-gray-100 cursor-pointer p-2.5 rounded-lg">
              <Settings className="w-5 h-5" />
              <span className="absolute top-11 left-[-8px] right-[-8px] bg-white rounded-lg p-1 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                Cài đặt
              </span>
            </div>
          </Link>
      {/* Log out */}
          <LogoutButton>
            <div className="group relative bg-white cursor-pointer p-2.5 rounded-lg">
              <LogOut className="w-5 h-5" />
              <span className="absolute top-11 left-0 bg-white rounded-lg p-1 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                Thoát
              </span>
            </div>
          </LogoutButton>
        </div>
      </div>
      {/* Vai trò */}
      <div className="flex justify-center mt-10 pb-2">
        <span className="font-medium mr-1">Vai trò:</span>
        <span className={`relative group ${getRoleColorClass(userId?.role)}`}>
          {userId?.role}
          <span className="absolute invisible group-hover:visible bg-white text-gray-800 p-2 rounded-md shadow-md text-sm w-64 bottom-full left-1/2 transform -translate-x-1/2">
            {userId?.role === UserRole.ADMIN && (
              <p>
                Vai trò <span className="text-red-500 cursor-pointer font-bold"> ADMIN </span> quản lý tất cả các vai trò
                <span className="text-blue-500 cursor-pointer font-bold"> STAFF </span> và <span className="text-black cursor-pointer font-bold"> USER </span> đây được coi là vai
                trò cao nhất. Sử dụng tất cả các chức năng.
              </p>
            )}
            {userId?.role === UserRole.STAFF && (
              <p>
                Vai trò <span className="text-blue-500 cursor-pointer font-bold"> STAFF </span> quản lý đơn hàng, thêm,chỉnh sửa
                sản phẩm và quản lý đơn hàng và giao hàng của khách hàng.
              </p>
            )}
            {userId?.role === UserRole.USER && (
              <p>
                Vai trò của <span className="text-black cursor-pointer font-bold"> USER </span> không thể xem được nội dung
                trong <span className="text-red-500 cursor-pointer font-bold"> ADMIN </span> chỉ có thể tương tác được trên trang sản phẩm.
              </p>
            )}
          </span>
        </span>
      </div>
    </div>
  );
};

export default Navbar;
