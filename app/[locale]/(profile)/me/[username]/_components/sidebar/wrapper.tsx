"use client";

import { cn } from "@/lib/utils";
import { useCreatorSidebar } from "@/hooks/stream/use-creator-sidebar";

interface WrapperProps {
  children: React.ReactNode;
}

export const Wrapper = ({ children }: WrapperProps) => {
  const { collapsed, hideAll } = useCreatorSidebar((state) => state);
  return (
    <aside
      className={cn(
        "fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E35] z-50 bg-slate-900",
        collapsed && "lg:w-[70px]",
        hideAll && "hidden"
      )}
    >
      {children}
    </aside>
  );
};
