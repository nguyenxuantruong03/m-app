"use client";

import { Button } from "@/components/ui/button";
import { Hint } from "@/components/ui/hint";
import { useCreatorSidebar } from "@/hooks/stream/use-creator-sidebar";
import { ArrowLeftFromLine, ArrowRightFromLine, EyeOff } from "lucide-react";
import { useTranslations } from "next-intl";

const Toggle = () => {
  const t = useTranslations()
  const { hideAll, onHide, collapsed, onCollapsed, onExpand } =
    useCreatorSidebar((state) => state);

  const label = collapsed ? t("action.expand") : t("action.collapse");
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
          <Hint label={t("action.hideSidebar")} side="right" asChild>
            <Button onClick={onHide} variant="ghost" className="h-auto p-2">
              <EyeOff className="h-4 w-4 text-gray-300" />
            </Button>
          </Hint>
        </div>
      )}

      {!collapsed && !hideAll && (
        <div className="p-3 pl-6 mb-2 hidden lg:flex items-center w-full justify-between">
          {/* "For you" section */}
          <p className="font-semibold text-gray-300 block">{t("profile.dashboard")}</p>

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
            <Hint label={t("action.hideSidebar")} side="right" asChild>
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
