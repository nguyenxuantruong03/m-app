import { Skeleton } from "@/components/ui/skeleton";

const BoxchatSkeleton = () => {
  return (
    <div className="w-full md:w-96">
      {/* Head */}
      <div className="flex justify-between sm:px-4 py-3  px-4 lg:px-6 bg-slate-200 dark:bg-slate-700 rounded-t-md shadow-sm h-[76px]">
        <div className="w-full flex justify-between  items-center">
          <div className="flex gap-3 items-center">
            <Skeleton className="w-12 h-12 rounded-full" />
            <div className="flex flex-col space-y-2">
              <div className="text-slate-700 dark:text-slate-200">
                <Skeleton className="w-48 h-5" />
              </div>
              <div>
                <Skeleton className="w-24 h-5" />
              </div>
            </div>
          </div>
        </div>
        <Skeleton className="w-[25px] h-[25px]" />
      </div>
      {/* Body */}
      <div className="h-[380px] md:h-[425px] xl:h-[400px] overflow-y-auto bg-white dark:bg-black shadow-lg">
        <div className="gap-3 p-4 space-y-4">
          <div className="flex items-center space-x-2">
            <Skeleton className="w-12 h-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="w-24 h-4" />
              <Skeleton className="w-48 h-5" />
            </div>
          </div>

          <div className="flex items-center justify-end space-x-2">
            <div className="space-y-2">
              <Skeleton className="w-24 h-4" />
              <Skeleton className="w-48 h-5" />
            </div>
            <Skeleton className="w-12 h-12 rounded-full" />
          </div>

          <div className="flex items-center space-x-2">
            <Skeleton className="w-12 h-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="w-24 h-4" />
              <Skeleton className="w-48 h-5" />
            </div>
          </div>

          <div className="flex items-center justify-end space-x-2">
            <div className="space-y-2">
              <Skeleton className="w-24 h-4" />
              <Skeleton className="w-48 h-5" />
            </div>
            <Skeleton className="w-12 h-12 rounded-full" />
          </div>
        </div>
        </div>

      {/* Form */}
      <div className="
        py-4 
        px-4 
        bg-slate-200 dark:bg-slate-700
        rounded-b-md 
        flex 
        items-center 
        gap-2 
        lg:gap-4 
        w-full
      ">
          <div className="flex items-center gap-2 lg:gap-4 w-full relative">
            <Skeleton className="w-full h-8"/>

            <div className="flex items-center gap-2 lg:gap-4">
            <Skeleton className="w-10 h-10 rounded-full"/>
            <Skeleton className="w-10 h-10 rounded-full"/>
            </div>
          </div>
      </div>
    </div>
  );
};

export default BoxchatSkeleton;
