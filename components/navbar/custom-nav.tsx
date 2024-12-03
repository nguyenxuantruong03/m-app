"use client";
import React, { useEffect, useState } from "react";
import StoreSwitcher from "./store-switcher";
import MainNav from "./main-nav";
import { ThemeToggleDrakorLight } from "../ui/theme-toggle";
import { Store, UserRole } from "@prisma/client";
import { Settings, LogOut, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User as UserIcon } from "lucide-react";
import LogoutButton from "../auth/logout-button";
import { FormUploadAvatarNavbar } from "./upload-image-navbar/form-upload-avatar-navbar";
import { Button } from "../ui/button";
import NavbarIcon from "./navbar-icon";
import { useCurrentUser } from "@/hooks/use-current-user";
import NavbarMultiple from "./navbar-multiple/navbar-multiple";
import { useCurrentView } from "@/localStorage/useLocalStorage-currentView";
import {
  translateRole,
  translateRolesCustomNav,
  translateSettings,
} from "@/translate/translate-client";

interface CustomNavProps {
  store: Store[];
  avatarImage: string | null | undefined;
  userId: any;
}

export enum List {
  NONE = "NONE",
  LIST = "LIST",
  LISTICON = "LISTICON",
  NAVBAR = "NAVBAR",
}

const CustomNav: React.FC<CustomNavProps> = ({
  store,
  avatarImage,
  userId,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const { currentView, setCurrentView } = useCurrentView() || {
    currentView: "",
    setCurrentView: () => {},
  };

  //language
  const languageToUse = userId?.language || "vi";
  const settingsMessage = translateSettings(languageToUse);
  const roleMessage = translateRole(languageToUse);
  const rolesCustomNavMessage = translateRolesCustomNav(languageToUse);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  //Dùng để responsive điện thoại khi về kích thước điện thoại hoặc ipad nó sẽ thay đổi về dạng NAVBAR bắt buốc điện thoại chỉ sử dụng được Navbar
  useEffect(() => {
    const handleResize = () => {
      const isPhoneOrTablet = window.innerWidth <= 1024; // Thay đổi ngưỡng theo thiết kế của bạn
      if (isPhoneOrTablet) {
        setCurrentView(List.NAVBAR);
      }
    };

    handleResize(); // Khởi tạo ban đầu
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [window.innerWidth]);

  if (!isMounted) {
    return null;
  }

  const toggleView = () => {
    setCurrentView((prevView: List) => {
      switch (prevView) {
        case List.LIST:
          return List.LISTICON;
        case List.LISTICON:
          return List.NAVBAR;
        case List.NAVBAR:
          return List.NONE;
        case List.NONE:
        default:
          return List.LIST;
      }
    });
  };

  const getRoleColorClass = (role: UserRole | undefined) => {
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
      {currentView !== List.NAVBAR ? (
        <div className="hidden xl:block xl:w-12">
          <Button className="m-2" onClick={toggleView}>
            <LayoutDashboard className="size-5" />
          </Button>
        </div>
      ) : (
        <div className="hidden xl:block fixed top-[4.5rem] z-[9999] group">
          <button
            className="my-2 inline-flex items-center justify-center 
        text-sm font-medium ring-offset-background transition-colors 
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring 
        focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-5 
        bg-slate-200 dark:bg-slate-900 text-primary-foreground group-hover:bg-slate-300 dark:group-hover:bg-slate-700 h-10 px-4 py-2"
            style={{ borderRadius: "0 0 8px 0" }}
            onClick={toggleView}
          >
            <LayoutDashboard className="size-5 text-slate-700 dark:text-slate-300 dark:group-hover:text-white group-hover:text-slate-900" />
          </button>
        </div>
      )}

      {currentView === List.LIST && (
        <div className="bg-red-300 rounded-md bg-opacity-50 pt-1 w-[280px] ml-2">
          <div className="border-b relative">
            <div className="items-center px-4 my-4">
              <StoreSwitcher items={store} languageToUse={languageToUse} />
              <MainNav className="mx-6" languageToUse={languageToUse} />

              <div className="flex items-center space-x-4 mt-2 justify-center">
                <div className="group relative">
                  <Avatar>
                    {avatarImage ? (
                      <AvatarImage src={avatarImage} />
                    ) : (
                      <AvatarFallback className="bg-sky-500">
                        <UserIcon className="text-white" />
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <FormUploadAvatarNavbar
                    languageToUse={languageToUse}
                    classNamesForm="absolute left-[-15px] top-[-3px]"
                    classNamesUpload="opacity-0"
                  />
                  <span className="dark:text-black absolute top-11 left-0 bg-white rounded-lg p-1 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    {settingsMessage.name1}
                  </span>
                </div>
                <div className="group relative">
                  <ThemeToggleDrakorLight dropdown={true} />
                  <span className="dark:text-black absolute top-11 left-[-4px] bg-white rounded-lg p-1 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    {settingsMessage.name2}
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="group relative"
                >
                  <Link href="/setting-profile">
                    <Settings className="dark:text-white w-5 h-5" />
                    <span className="dark:text-black flex absolute top-11 left-[-10px] right-[-8px] bg-white rounded-lg p-1 text-sm z-[999] opacity-0 group-hover:opacity-100 transition-opacity">
                      {settingsMessage.name3}
                    </span>
                  </Link>
                </Button>
                <LogoutButton>
                  <Button
                    variant="outline"
                    size="icon"
                    className="group relative "
                  >
                    <LogOut className="w-5 h-5 dark:text-white" />
                    <span className="dark:text-black absolute top-11 left-[-5px] bg-white rounded-lg p-1 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                      {settingsMessage.name4}
                    </span>
                  </Button>
                </LogoutButton>
              </div>
            </div>
            <div className="flex justify-center mt-10 pb-2">
              <span className="font-medium mr-1">{roleMessage}:</span>
              <span
                className={`relative group ${getRoleColorClass(userId?.role)}`}
              >
                {userId?.role}
                <span className="absolute invisible group-hover:visible bg-white text-gray-800 p-2 rounded-md shadow-md text-sm w-64 bottom-full left-1/2 transform -translate-x-1/2">
                  {userId?.role === UserRole.ADMIN && (
                    <p>
                      {roleMessage}
                      <span className="text-red-500 cursor-pointer font-bold">
                        {rolesCustomNavMessage.name1}
                      </span>
                      {rolesCustomNavMessage.name2}
                      <span className="text-blue-500 cursor-pointer font-bold">
                        {rolesCustomNavMessage.name3}
                      </span>
                      {rolesCustomNavMessage.name4}
                      <span className="text-black cursor-pointer font-bold">
                        {rolesCustomNavMessage.name5}
                      </span>
                      {rolesCustomNavMessage.name6}
                    </p>
                  )}
                  {userId?.role === UserRole.STAFF && (
                    <p>
                      {roleMessage}
                      <span className="text-blue-500 cursor-pointer font-bold">
                        {rolesCustomNavMessage.name3}
                      </span>
                      {rolesCustomNavMessage.name7}
                    </p>
                  )}
                  {userId?.role === UserRole.USER && (
                    <p>
                      {roleMessage}
                      <span className="text-black cursor-pointer font-bold">
                        {rolesCustomNavMessage.name5}
                      </span>
                      {rolesCustomNavMessage.name8}
                      <span className="text-red-500 cursor-pointer font-bold">
                        {rolesCustomNavMessage.name1}
                      </span>
                      {rolesCustomNavMessage.name9}
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
              <NavbarIcon languageToUse={languageToUse} />
            </div>
          </div>
        </div>
      )}
      {currentView === List.NAVBAR && (
        <NavbarMultiple languageToUse={languageToUse} userId={userId} />
      )}
    </>
  );
};

export default CustomNav;
