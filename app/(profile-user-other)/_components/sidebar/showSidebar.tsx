"use client";
import { useSidebar } from "@/hooks/stream/use-sidebar";
import { Hint } from "@/components/ui/hint";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

const ShowSideBar = () => {
  const { hideAll, onShow } = useSidebar((state) => state);
  return (
    <>
      {hideAll && (
        <div className="fixed top-20 left-0 z-[9999]">
          <Hint label="Show Sidebar" side="right" asChild>
            <Button onClick={onShow} className="h-auto p-2 ml-auto">
              <Eye className="h-5 w-5 text-white" />
            </Button>
          </Hint>
        </div>
      )}
    </>
  );
};

export default ShowSideBar;
