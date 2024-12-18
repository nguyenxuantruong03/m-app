"use client";

import useConversation from "@/hooks/useConversation";
import MobileItem from "./MobileItem";
import useRoutes from "@/hooks/useRoutes";

interface MobileFooterProps{
  language: string
}

const MobileFooter = ({language}:MobileFooterProps) => {
  const routes = useRoutes();
  const { isOpen } = useConversation();

  if (isOpen) {
    return null;
  }
  return (
    <div
      className="
        fixed
        justify-between
        w-full
        bottom-0
        z-40
        flex 
        items-center
        bg-slate-200
        dark:bg-slate-900
        border-t-[1px]
        lg:hidden
        "
    >
      {routes.map((route) => (
        <MobileItem
          key={route.href}
          href={route.href}
          active={route.active}
          icon={route.icon}
          language={language}
        />
      ))}
    </div>
  );
};

export default MobileFooter;
