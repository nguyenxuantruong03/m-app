"use client";
import StoreSwitcher from "./store-switcher";
import MainNav from "./main-nav";
import { ThemeToggleDrakorLight } from "../ui/theme-toggle";
import { UserRole } from "@prisma/client";
import { Settings, LogOut, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User } from "lucide-react";
import LogoutButton from "../auth/logout-button";
import { FormUploadImage } from "../ui/form-upload-image-avatar";
import { Button } from "../ui/button";
import { useState } from "react";
import NavbarIcon from "./navbar-icon";

interface CustomNavProps {
  store: any;
  isGitHubOrGoogleUser: any;
  avatarImage: any;
  userId: any;
}

enum List {
  NONE = "NONE",
  LIST = "LIST",
  LISTICON = "LISTICON",
}

const CustomNav: React.FC<CustomNavProps> = ({
  store,
  isGitHubOrGoogleUser,
  avatarImage,
  userId,
}) => {
  const [currentView, setCurrentView] = useState<List>(List.LIST);

  const toggleView = () => {
    setCurrentView((prevView) => {
      switch (prevView) {
        case List.LIST:
          return List.LISTICON;
        case List.LISTICON:
          return List.NONE;
        case List.NONE:
        default:
          return List.LIST;
      }
    });
  };

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
    <>
      <div className="w-12">
        <Button className="m-2" onClick={toggleView}>
          <LayoutDashboard  className="size-5" />
        </Button>
      </div>
      {currentView === List.LIST && (
        <div className="bg-red-300 rounded-md bg-opacity-50 pt-1 w-[280px] ml-2">
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
                  <FormUploadImage
                    classNamesForm="absolute left-[-15px] top-[-3px]"
                    classNamesUpload="opacity-0"
                  />
                  <span className="dark:text-black absolute top-11 left-0 bg-white rounded-lg p-1 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    Ảnh
                  </span>
                </div>
                {/* Chế độ */}
                <div className="group relative">
                  <ThemeToggleDrakorLight />
                  <span className="dark:text-black absolute top-11 left-[-4px] bg-white rounded-lg p-1 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    Mode
                  </span>
                </div>
                {/* Cài đặt */}
                <Button
                  variant="outline"
                  size="icon"
                  className="group relative"
                >
                  <Link href={`/infouser`}>
                    <Settings className="dark:text-white w-5 h-5" />
                    <span className="dark:text-black flex absolute top-11 left-[-10px] right-[-8px] bg-white rounded-lg p-1 text-sm z-[999] opacity-0 group-hover:opacity-100 transition-opacity">
                      Cài đặt
                    </span>
                  </Link>
                </Button>
                {/* Log out */}
                <LogoutButton>
                  <Button
                    variant="outline"
                    size="icon"
                    className="group relative "
                  >
                    <LogOut className="w-5 h-5 dark:text-white" />
                    <span className="dark:text-black absolute top-11 left-[-5px] bg-white rounded-lg p-1 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                      Thoát
                    </span>
                  </Button>
                </LogoutButton>
              </div>
            </div>
            {/* Vai trò */}
            <div className="flex justify-center mt-10 pb-2">
              <span className="font-medium mr-1">Vai trò:</span>
              <span
                className={`relative group ${getRoleColorClass(userId?.role)}`}
              >
                {userId?.role}
                <span className="absolute invisible group-hover:visible bg-white text-gray-800 p-2 rounded-md shadow-md text-sm w-64 bottom-full left-1/2 transform -translate-x-1/2">
                  {userId?.role === UserRole.ADMIN && (
                    <p>
                      Vai trò{" "}
                      <span className="text-red-500 cursor-pointer font-bold">
                        {" "}
                        ADMIN{" "}
                      </span>{" "}
                      quản lý tất cả các vai trò
                      <span className="text-blue-500 cursor-pointer font-bold">
                        {" "}
                        STAFF{" "}
                      </span>{" "}
                      và{" "}
                      <span className="text-black cursor-pointer font-bold">
                        {" "}
                        USER{" "}
                      </span>{" "}
                      đây được coi là vai trò cao nhất. Sử dụng tất cả các chức
                      năng.
                    </p>
                  )}
                  {userId?.role === UserRole.STAFF && (
                    <p>
                      Vai trò{" "}
                      <span className="text-blue-500 cursor-pointer font-bold">
                        {" "}
                        STAFF{" "}
                      </span>{" "}
                      quản lý đơn hàng, thêm,chỉnh sửa sản phẩm và quản lý đơn
                      hàng và giao hàng của khách hàng.
                    </p>
                  )}
                  {userId?.role === UserRole.USER && (
                    <p>
                      Vai trò của{" "}
                      <span className="text-black cursor-pointer font-bold">
                        {" "}
                        USER{" "}
                      </span>{" "}
                      không thể xem được nội dung trong{" "}
                      <span className="text-red-500 cursor-pointer font-bold">
                        {" "}
                        ADMIN{" "}
                      </span>{" "}
                      chỉ có thể tương tác được trên trang sản phẩm.
                    </p>
                  )}
                </span>
              </span>
            </div>
          </div>
        </div>
      )}
      {currentView === List.LISTICON && (
        <div className="bg-red-300 rounded-md bg-opacity-50 pt-1 w-[70px] ml-2">
          <div className="border-b relative">
            <div className="items-center px-4 my-4">
              <NavbarIcon />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CustomNav;
