import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

interface CardPostSkeletonProps {
  userSkeleton: boolean;
}

const CardPostSkeleton = ({ userSkeleton }: CardPostSkeletonProps) => {
  return (
    <>
      {/* Post bài */}
      <div className="bg-slate-900 p-1.5 rounded-md space-y-2">
        <div className="flex flex-row justify-between px-1 w-full">
          <div className="flex items-center space-x-3 w-full xl:w-auto">
            <div className="flex items-center space-x-3">
              <Skeleton className="h-[50px] w-[70px] xl:w-[50px] rounded-full" />
              <div className="w-full xl:w-[300px] space-y-2">
                <Skeleton className="h-[20px] w-[100px]" />
                <Skeleton className="h-[20px] w-[120px]" />
                <Skeleton className="h-[20px] w-full max-w-[120px]" />{" "}
              </div>
            </div>
          </div>

          {/* Đảm bảo phần tử này luôn ở trên cùng 1 hàng */}
          <div className="flex items-center justify-end space-x-5 w-full xl:w-auto">
            {!userSkeleton ? (
              <>
                <Skeleton className="h-[30px] w-[30px]" />
                <Skeleton className="h-[30px] w-[30px]" />
              </>
            ) : (
              <Skeleton className="h-[30px] w-[30px] mr-[28px]" />
            )}
          </div>
        </div>

        {/* Anh */}
        <div className="w-full">
          <Skeleton className="h-[50px] w-full" />
        </div>

        {/* Hình ảnh */}
        <div className="flex flex-wrap gap-3 justify-center w-full">
          <Skeleton className="h-[125px] sm:h-[250px] w-[45%] sm:w-[45%] md:w-[360px]" />
          <Skeleton className="h-[125px] sm:h-[250px] w-[45%] sm:w-[45%] md:w-[360px]" />
          <Skeleton className="h-[125px] sm:h-[250px] w-[45%] sm:w-[45%] md:w-[360px]" />
          <Skeleton className="h-[125px] sm:h-[250px] w-[45%] sm:w-[45%] md:w-[360px]" />
        </div>

        {/* Emoji */}
        <div className="flex items-center space-x-2">
          <Skeleton className="h-[30px] w-[30px]" />
          <Skeleton className="h-[20px] w-[20px]" />
          <Skeleton className="h-[20px] w-[20px]" />
          <Skeleton className="h-[20px] w-[20px]" />
        </div>
        <Separator className="my-4 bg-gray-300 bg-opacity-30" />

        <div className="flex items-center w-full">
          <Skeleton className="h-[40px] w-1/2" />
          <Separator
            orientation="vertical"
            className="h-8 bg-gray-300  mx-3"
          />
          <Skeleton className="h-[40px] w-1/2" />
        </div>
      </div>
    </>
  );
};

export default CardPostSkeleton;
