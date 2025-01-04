"use client";

import { useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";

import { cn } from "@/lib/utils";
import { useCreatorSidebar } from "@/hooks/stream/use-creator-sidebar";

interface ContainerProps {
  children: React.ReactNode;
}

export const Container = ({ children }: ContainerProps) => {
  const { collapsed, hideAll, onCollapsed, onExpand } = useCreatorSidebar(
    (state) => state
  );

  const mataches = useMediaQuery(`(max-width: 1024px)`);

  useEffect(() => {
    if (mataches) {
      onCollapsed();
    } else {
      onExpand();
    }
  }, [mataches, onCollapsed, onExpand]);
  return (
    <div
      className={cn(
        "flex-1",
        hideAll ? "ml-0" : collapsed ? "ml-[70px]" : "ml-[70px] lg:ml-60"
      )}
    >
      {children}
    </div>
  );
};
