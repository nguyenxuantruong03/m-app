"use client";
import { Hint } from "@/components/ui/hint";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { useCreatorSidebar } from "@/hooks/stream/use-creator-sidebar";

const ShowSideBar = () => {
  const { hideAll, onShow } = useCreatorSidebar((state) => state);
  return (
    <>
      {hideAll && (
        <div className="fixed top-20 left-0 z-[9999]">
          <Hint label="Show Sidebar" side="right" asChild>
            <Button onClick={onShow} className="h-auto p-2 ml-auto">
              <Eye className="h-5 w-5 dark:text-slate-900" />
            </Button>
          </Hint>
        </div>
      )}
    </>
  );
};

export default ShowSideBar;
