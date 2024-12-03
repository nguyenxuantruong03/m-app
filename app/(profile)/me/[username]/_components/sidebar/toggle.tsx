"use client";

import { Button } from "@/components/ui/button";
import { Hint } from "@/components/ui/hint";
import { useCreatorSidebar } from "@/hooks/stream/use-creator-sidebar";
import {
  translateCollapse,
  translateDashboard,
  translateExpand,
  translateHideSidebar,
} from "@/translate/translate-client";
import { ArrowLeftFromLine, ArrowRightFromLine, EyeOff } from "lucide-react";

interface ToggleProps {
  languageToUse: string;
}

const Toggle = ({ languageToUse }: ToggleProps) => {
  const { hideAll, onHide, collapsed, onCollapsed, onExpand } =
    useCreatorSidebar((state) => state);

  const dashboardMessage = translateDashboard(languageToUse);
  const expandMessage = translateExpand(languageToUse);
  const collapseMessage = translateCollapse(languageToUse);
  const hideSidebarMessage = translateHideSidebar(languageToUse);

  const label = collapsed ? expandMessage : collapseMessage;
  return (
    <>
      {collapsed && (
        <div className="w-full hidden lg:flex items-center justify-center pt-4 mb-4">
          <Hint label={label} side="right" asChild>
            <Button onClick={onExpand} variant="ghost" className="h-auto p-2">
              <ArrowRightFromLine className="h-4 w-4 text-gray-300" />
            </Button>
          </Hint>
        </div>
      )}

      {!hideAll && (
        <div className="flex lg:hidden items-center w-full justify-center">
          {/* Hide/Show button */}
          <Hint label={hideSidebarMessage} side="right" asChild>
            <Button onClick={onHide} variant="ghost" className="h-auto p-2">
              <EyeOff className="h-4 w-4 text-gray-300" />
            </Button>
          </Hint>
        </div>
      )}

      {!collapsed && !hideAll && (
        <div className="p-3 pl-6 mb-2 flex items-center w-full justify-between">
          {/* "For you" section */}
          <p className="font-semibold text-gray-300">{dashboardMessage}</p>

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
            <Hint label={hideSidebarMessage} side="right" asChild>
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

export default Toggle;
