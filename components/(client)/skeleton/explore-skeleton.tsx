"use client"
import { Skeleton } from "@/components/ui/skeleton";
import { useSidebar } from "@/hooks/stream/use-sidebar";
import { cn } from "@/lib/utils";
import CardPostSkeleton from "./card-post-skeleton";
import { Separator } from "@/components/ui/separator";

const ExploreSkeleton = () => {
  const { hideAll } = useSidebar((state) => state);
  return (
    <div
      className={cn(
        "md:max-w-7xl mx-2",
        hideAll ? "max-w-sm" : "max-w-xs"
      )}
    >
      <div className="max-w-3xl mx-auto mt-5 pb-5 space-y-5">

      <div className="space-y-10">
      <div className="bg-slate-900 p-2 rounded-md">
              <div className="flex items-center gap-x-2">
                <Skeleton className="w-[55px] h-[50px] rounded-full" />
                <Skeleton className="w-full h-[50px] rounded-3xl" />
              </div>
              <Separator className="my-4 bg-black dark:bg-gray-300 bg-opacity-30" />
              <Skeleton className="w-full h-[40px] rounded-3xl" />
            </div>

      <CardPostSkeleton userSkeleton={true}/>
      <CardPostSkeleton userSkeleton={true}/>
      </div>
      </div>
      <div className="fixed right-6 xl:top-24 hidden xl:block">
        <Skeleton className="w-[40px] h-[40px]" />
      </div>
    </div>
  );
};

export default ExploreSkeleton;
