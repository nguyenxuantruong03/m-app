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
import { useTranslations } from "next-intl";

const Navigation = () => {
  const t = useTranslations()
  const pathname = usePathname();
  const user = useCurrentUser();


  const routes = [
    {
      key: "home",
      label: t("home.home"),
      href: `/me/${user?.nameuser}/home`,
      icon: LayoutGrid,
    },
    {
      key: "user",
      label: t("profile.profile"),
      href: `/me/${user?.nameuser}`,
      icon: CircleUserRound,
    },
    {
      key: "listlive",
      label: t("profile.liveStream"),
      href: `/me/${user?.nameuser}/listlive`,
      icon: Radio,
    },
    {
      key: "stream",
      label: t("profile.stream"),
      href: `/me/${user?.nameuser}/stream`,
      icon: Fullscreen,
    },
    {
      key: "key",
      label: t("profile.key"),
      href: `/me/${user?.nameuser}/keys`,
      icon: KeyRound,
    },
    {
      key: "chat",
      label: t("profile.chat"),
      href: `/me/${user?.nameuser}/chat`,
      icon: MessageSquare,
    },
    {
      key: "listblock",
      label: t("profile.listBlock"),
      href: `/me/${user?.nameuser}/listblock`,
      icon: CircleMinus,
    },
    {
      key: "listproduct",
      label: t("profile.listProduct"),
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
