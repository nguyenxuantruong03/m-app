"use client";

import { usePathname } from "next/navigation";
import {
  Fullscreen,
  KeyRound,
  MessageSquare,
  CircleMinus,
  CircleUserRound,
  LayoutGrid,
  Radio,
  Package,
} from "lucide-react";
import { NavItem, NavItemSkeleton } from "./nav-item";
import { useCurrentUser } from "@/hooks/use-current-user";
import {
  translateChat,
  translateHome,
  translateKey,
  translateListBlock,
  translateListLive,
  translateListProduct,
  translateProfile,
  translateStream,
} from "@/translate/translate-client";

interface NavigationProps {
  languageToUse: string;
}
const Navigation = ({ languageToUse }: NavigationProps) => {
  const pathname = usePathname();
  const user = useCurrentUser();

  //Languages
  const homeMessage = translateHome(languageToUse);
  const profileMessage = translateProfile(languageToUse);
  const listLiveMessage = translateListLive(languageToUse);
  const streamMessage = translateStream(languageToUse);
  const keyMessage = translateKey(languageToUse);
  const chatMessage = translateChat(languageToUse);
  const listblockMessage = translateListBlock(languageToUse);
  const listProductMessage = translateListProduct(languageToUse);

  const routes = [
    {
      key: "home",
      label: homeMessage,
      href: `/me/${user?.nameuser}/home`,
      icon: LayoutGrid,
    },
    {
      key: "user",
      label: profileMessage,
      href: `/me/${user?.nameuser}`,
      icon: CircleUserRound,
    },
    {
      key: "listlive",
      label: listLiveMessage,
      href: `/me/${user?.nameuser}/listlive`,
      icon: Radio,
    },
    {
      key: "stream",
      label: streamMessage,
      href: `/me/${user?.nameuser}/stream`,
      icon: Fullscreen,
    },
    {
      key: "key",
      label: keyMessage,
      href: `/me/${user?.nameuser}/keys`,
      icon: KeyRound,
    },
    {
      key: "chat",
      label: chatMessage,
      href: `/me/${user?.nameuser}/chat`,
      icon: MessageSquare,
    },
    {
      key: "listblock",
      label: listblockMessage,
      href: `/me/${user?.nameuser}/listblock`,
      icon: CircleMinus,
    },
    {
      key: "listproduct",
      label: listProductMessage,
      href: `/me/${user?.nameuser}/listproduct`,
      icon: Package,
    },
  ];

  if (!user?.nameuser) {
    return (
      <ul className="space-y-2">
        {Array.from({ length: 4 }, (_, i) => (
          <NavItemSkeleton key={i} />
        ))}
      </ul>
    );
  }

  const isUserRoleLimited = !(
    user.role === "ADMIN" ||
    user.role === "MARKETING" ||
    user.role === "GUEST"
  );

  return (
    <ul className="space-y-2 px-2 pt-4 lg:pt-0">
      {(isUserRoleLimited
        ? routes.filter(
            (route) =>
              route.key === "user" ||
              route.key === "home" ||
              route.key === "listlive" ||
              route.key === "listblock"
          )
        : routes
      ).map((route) => (
        <NavItem
          key={route.href}
          label={route.label}
          href={route.href}
          icon={route.icon}
          isActive={pathname === route.href}
        />
      ))}
    </ul>
  );
};

export default Navigation;
