import { Skeleton } from "@/components/ui/skeleton";

const ListProductSkeleton = () => {
  return (
    <div className="px-2">
      <div className="space-y-6">
        <Skeleton className="w-[100px] h-[40px]" />

        <div className="flex flex-wrap gap-3">
          {Array(4)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="dark:bg-slate-900 bg-slate-200 p-2 max-w-xl rounded-md shadow-xl"
              >
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Skeleton className="w-[200px] h-[220px]" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="w-[200px] h-[30px]" />
                    <div className="flex items-center gap-x-3">
                      <Skeleton className="w-[100px] h-[30px]" />
                      <Skeleton className="w-[100px] h-[30px]" />
                    </div>
                    <Skeleton className="w-[100px] h-[30px]" />
                    <Skeleton className="w-[120px] h-[30px]" />
                    <Skeleton className="w-[200px] h-[30px]" />
                    <Skeleton className="w-[200px] h-[30px]" />
                  </div>
                </div>
              </div>
            ))}
        </div>

        <Skeleton className="w-[100px] h-[40px]" />

        <div className="flex flex-wrap gap-3">
          {Array(3)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="dark:bg-slate-900 bg-slate-200 p-2 max-w-xl rounded-md shadow-xl"
              >
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Skeleton className="w-[200px] h-[220px]" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="w-[200px] h-[30px]" />
                    <div className="flex items-center gap-x-3">
                      <Skeleton className="w-[100px] h-[30px]" />
                      <Skeleton className="w-[100px] h-[30px]" />
                    </div>
                    <Skeleton className="w-[100px] h-[30px]" />
                    <Skeleton className="w-[120px] h-[30px]" />
                    <Skeleton className="w-[200px] h-[30px]" />
                    <Skeleton className="w-[200px] h-[30px]" />
                  </div>
                </div>
              </div>
            ))}
        </div>

        <Skeleton className="w-[100px] h-[40px]" />

        <div className="flex flex-wrap gap-3">
          {Array(2)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="dark:bg-slate-900 bg-slate-200 p-2 max-w-xl rounded-md shadow-xl"
              >
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Skeleton className="w-[200px] h-[220px]" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="w-[200px] h-[30px]" />
                    <div className="flex items-center gap-x-3">
                      <Skeleton className="w-[100px] h-[30px]" />
                      <Skeleton className="w-[100px] h-[30px]" />
                    </div>
                    <Skeleton className="w-[100px] h-[30px]" />
                    <Skeleton className="w-[120px] h-[30px]" />
                    <Skeleton className="w-[200px] h-[30px]" />
                    <Skeleton className="w-[200px] h-[30px]" />
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ListProductSkeleton;
