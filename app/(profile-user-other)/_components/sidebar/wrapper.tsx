"use client";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/hooks/stream/use-sidebar";
import { ToggleSkeleton } from "./toggle";
import { useIsClient } from "usehooks-ts";
import { FollowingSkeleton } from "./following";
import { RecommendedSkeleton } from "./recommended";

interface WrapperProops {
  children: React.ReactNode;
}
const Wrapper = ({ children }: WrapperProops) => {
  const isClient = useIsClient();
  const { collapsed, hideAll } = useSidebar((state) => state);

  if (!isClient) {
    return (
      <aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-slate-900 border-r border-[#2D2E35] z-50">
        <ToggleSkeleton />
        <FollowingSkeleton />
        <RecommendedSkeleton />
      </aside>
    );
  }

  return (
    <aside
      className={cn(
        "fixed left-0 flex flex-col w-60 h-full bg-slate-900 border-r border-[#2D2E35] z-50",
        collapsed && "w-[70px]",
        hideAll && "hidden"
      )}
    >
      {children}
    </aside>
  );
};

export default Wrapper;
