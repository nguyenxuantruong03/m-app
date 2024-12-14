import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import CardPostSkeleton from "./card-post-skeleton";

interface SkeletonProps {
  userSkeleton: boolean;
}

const UserProfileSkeleton = ({userSkeleton}:SkeletonProps) => {
  return (
    <div className="md:max-w-7xl mx-auto px-2 space-y-5 mb-4">
    <div className="fixed right-6 xl:top-24 hidden xl:block">
      <Skeleton className="w-10 h-10" />
    </div>
    <div className="flex flex-col items-center space-y-4 xl:flex-row xl:items-center xl:space-x-4 xl:space-y-0">
      <Skeleton className="w-[120px] h-[120px] rounded-full" />
      <div className="space-y-2 text-center xl:text-left">
        <Skeleton className="w-[200px] h-[40px] mx-auto xl:mx-0" />
        <Skeleton className="w-[100px] h-[30px] mx-auto xl:mx-0" />
      </div>
    </div>

    <div className="flex flex-wrap xl:flex-nowrap space-y-4 xl:space-y-0 xl:space-x-2">
      {/* Giới thiệu */}
      <div className="bg-slate-900 p-4 w-full xl:w-2/4 space-y-4 rounded-md h-[310px]">
        {!userSkeleton ? (
          <>
            <Skeleton className="h-[50px] w-[100px]" />
            <Skeleton className="h-[30px] w-full" />
            <Skeleton className="h-[40px] w-full" />
            <Skeleton className="h-[20px] w-full" />
            <Skeleton className="h-[20px] w-full" />
            <Skeleton className="h-[40px] w-full" />
          </>
        ) : (
          <>
            <Skeleton className="h-[50px] w-[100px]" />
            <Skeleton className="h-[30px] w-full" />
            <Skeleton className="h-[30px] w-full" />
            <Skeleton className="h-[30px] w-full" />
            <Skeleton className="h-[30px] w-full" />
            <Skeleton className="h-[30px] w-full" />
          </>
        )}
      </div>

      {/* Phần nội dung */}
      <div className="w-full xl:w-3/4 space-y-2">
        {!userSkeleton && (
          <div className="bg-slate-900 p-2 rounded-md">
            <div className="flex items-center gap-x-2">
              <Skeleton className="w-[55px] h-[50px] rounded-full" />
              <Skeleton className="w-full h-[50px] rounded-3xl" />
            </div>
            <Separator className="my-4 bg-gray-300 bg-opacity-30" />
            <Skeleton className="w-full h-[40px] rounded-3xl" />
          </div>
        )}

        <CardPostSkeleton userSkeleton={userSkeleton}/>
        <CardPostSkeleton userSkeleton={userSkeleton}/>
      </div>
    </div>
  </div>
  );
};

export default UserProfileSkeleton;
