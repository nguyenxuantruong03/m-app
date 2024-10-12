"use client";
import { Button } from "@/components/ui/button";
import { Hint } from "@/components/ui/hint";
import { Skeleton } from "@/components/ui/skeleton";
import { useSidebar } from "@/hooks/stream/use-sidebar";
import { ArrowLeftFromLine, ArrowRightFromLine, EyeOff } from "lucide-react";

export const Toggle = () => {
  const { hideAll, onHide, collapsed, onCollapsed, onExpand } = useSidebar(
    (state) => state
  );

  const label = collapsed ? "Expand" : "Collapse";

  return (
    <>
      {collapsed && (
        <div className="hidden lg:flex w-full items-center justify-center pt-4 mb-4">
          <Hint label={label} side="right" asChild>
            <Button onClick={onExpand} variant="ghost" className="h-auto p-2">
              <ArrowRightFromLine className="h-4 w-4" />
            </Button>
          </Hint>
        </div>
      )}

      {!hideAll && (
        <div className="flex lg:hidden items-center w-full justify-center">
          {/* Hide/Show button */}
          <Hint label="Hide Sidebar" side="right" asChild>
            <Button onClick={onHide} variant="ghost" className="h-auto p-2">
              <EyeOff className="h-4 w-4 text-gray-300" />
            </Button>
          </Hint>
        </div>
      )}

      {!collapsed && !hideAll && (
        <div className="p-3 pl-6 mb-2 flex items-center w-full justify-between">
          {/* "For you" section */}
          <p className="font-semibold text-gray-300">For you</p>

          <div className="flex items-center space-x-2">
            {/* Collapse button */}
            <Hint label={label} side="right" asChild>
              <Button
                onClick={onCollapsed}
                className="h-auto p-2"
                variant="ghost"
              >
                <ArrowLeftFromLine className="h-4 w-4 text-gray-300" />
              </Button>
            </Hint>

            {/* Hide/Show button */}
            <Hint label="Hide Sidebar" side="right" asChild>
              <Button onClick={onHide} variant="ghost" className="h-auto p-2">
                <EyeOff className="h-4 w-4 text-gray-300" />
              </Button>
            </Hint>
          </div>
        </div>
      )}
    </>
  );
};

export const ToggleSkeleton = () => {
  return (
    <div className="p-3 pl-6 mb-2 hidden lg:flex items-center justify-between w-full">
      <Skeleton className="h-6 w-[100px]" />
      <div className="flex space-x-2">
        <Skeleton className="h-6 w-6" />
        <Skeleton className="h-6 w-6" />
      </div>
    </div>
  );
};
