"use client";

import { usePathname } from "next/navigation";
import { Fullscreen, KeyRound, MessageSquare, CircleMinus, CircleUserRound, LayoutGrid, Radio,Package  } from "lucide-react";
import { NavItem, NavItemSkeleton } from "./nav-item";
import { useCurrentUser } from "@/hooks/use-current-user";

const Navigation = () => {
  const pathname = usePathname();
  const user = useCurrentUser();

  const routes = [
    { key: "home",
      label: "Home",
      href: `/me/${user?.nameuser}/home`,
      icon: LayoutGrid,
    },
    {
      key: "user",
      label: "Trang cá nhân",
      href: `/me/${user?.nameuser}`,
      icon: CircleUserRound,
    },
    {
    key: "listlive",
      label: "List Live",
      href: `/me/${user?.nameuser}/listlive`,
      icon: Radio,
    },
    {
    key: "stream",
      label: "Stream",
      href: `/me/${user?.nameuser}/stream`,
      icon: Fullscreen,
    },
    {
    key: "key",
      label: "Keys",
      href: `/me/${user?.nameuser}/keys`,
      icon: KeyRound,
    },
    {
      key: "chat",
      label: "Chat",
      href: `/me/${user?.nameuser}/chat`,
      icon: MessageSquare,
    },
    {
      key: "listblock",
      label: "List Block",
      href: `/me/${user?.nameuser}/listblock`,
      icon: CircleMinus,
    },
    {
      key: "listproduct",
      label: "List Product",
      href: `/me/${user?.nameuser}/listproduct`,
      icon: Package ,
    },
  ];

  if (!user?.nameuser) {
    return (
      <ul className="space-y-2">
        {[...Array(4)].map((_, i) => (
          <NavItemSkeleton key={i} />
        ))}
      </ul>
    );
  }

  const isUserRoleLimited = !(user.role === "ADMIN" || user.role === "MARKETING" || user.role === "GUEST");

  return (
    <ul className="space-y-2 px-2 pt-4 lg:pt-0">
      {(isUserRoleLimited ? 
        routes.filter(route => route.key === "user" || route.key === "home" || route.key === "listlive" || route.key === "listblock") : 
        routes).map((route) => (
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
