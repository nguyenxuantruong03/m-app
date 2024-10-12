"use client";

import { cn } from "@/lib/utils";
import { useSidebar } from "@/hooks/stream/use-sidebar";
import { useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";

interface ContainerProps {
  children: React.ReactNode;
}
export const Container = ({ children }: ContainerProps) => {
  const matches = useMediaQuery("(max-width: 1024px)");
  const { hideAll, collapsed, onCollapsed, onExpand } = useSidebar(
    (state) => state
  );
  useEffect(() => {
    if (matches) {
      onCollapsed();
    } else {
      onExpand();
    }
  }, [matches, onCollapsed, onExpand]);

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
