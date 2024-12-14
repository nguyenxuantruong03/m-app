import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const ListBlockSkeleton = () => {
  return (
    <div className="p-6">
    <div className="mb-4">
      <Skeleton className="w-[200px] h-[30px]" />
    </div>

    <div className="flex items-center gap-x-3">
      <Skeleton className="w-[384px] h-[35px]" />
      <Skeleton className="w-[300px] h-[35px]" />
    </div>
    <Separator className="my-2" />
    <div className="flex items-center justify-between gap-x-10">
      <Skeleton className="w-[100px] h-[30px]" />
      <Skeleton className="w-[100px] h-[30px]" />
      <Skeleton className="w-[100px] h-[30px]" />
    </div>
    <Separator className="my-2" />
    <div className="flex items-center justify-between my-6">
      <Skeleton className="w-[150px] h-[30px]" />
      <Skeleton className="w-[150px] h-[30px]" />
      <Skeleton className="w-[150px] h-[30px]" />
    </div>
    <div className="flex items-center justify-between my-6">
      <Skeleton className="w-[170px] h-[30px]" />
      <Skeleton className="w-[170px] h-[30px]" />
      <Skeleton className="w-[170px] h-[30px]" />
    </div>
    <div className="flex items-center justify-between my-6">
      <Skeleton className="w-[200px] h-[30px]" />
      <Skeleton className="w-[200px] h-[30px]" />
      <Skeleton className="w-[200px] h-[30px]" />
    </div>
    <Separator className="my-2" />
    <div className="flex justify-end mt-5">
      <div className="flex items-center gap-x-3">
        <Skeleton className="w-[55px] h-[30px]" />
        <Skeleton className="w-[55px] h-[30px]" />
      </div>
    </div>
  </div>
  );
};

export default ListBlockSkeleton;
