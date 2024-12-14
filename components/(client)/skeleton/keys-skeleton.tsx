import { Skeleton } from "@/components/ui/skeleton";

const KeysSkeleton = () => {
  return (
    <div className="p-2 mt-6 lg:mt-0 lg:p-6">
      <div className="space-y-4">
        <div className="flex item-center justify-between">
          <Skeleton className="w-[150px] h-[30px]" />
          <Skeleton className="w-[100px] h-[30px]" />
        </div>
        <div className="rounded-xl bg-gray-300 bg-opacity-70 dark:bg-opacity-10 p-6">
          <div className="flex items-center gap-x-3 lg:gap-x-10 w-full">
            <Skeleton className="w-[100px] h-[30px]" />
            <Skeleton className="w-full h-[30px]" />
            <Skeleton className="w-[20px] h-[20px]" />
          </div>
        </div>

        <div className="rounded-xl bg-gray-300 bg-opacity-70 dark:bg-opacity-10 p-6 space-y-2">
          <div className="flex items-center gap-x-3 lg:gap-x-10 w-full">
            <Skeleton className="w-[100px] h-[30px]" />
            <div className="space-y-2 w-full">
              <div className="w-full flex items-center gap-x-2">
                <Skeleton className="w-full h-[30px]" />
              </div>
              <div className="mx-2">
            <Skeleton className="w-[50px] h-[20px]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeysSkeleton;
