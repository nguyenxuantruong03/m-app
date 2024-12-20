import Container from "@/components/ui/container";
import { Skeleton } from "@/components/ui/skeleton";

interface ColorSizeSkeletonProps{
nameSize: string
nameColor: string
}

const ColorSizeSkeleton = ({nameSize,nameColor}:ColorSizeSkeletonProps) => {
  return (
    <Container>
      <>
            <div className="hidden lg:block space-y-10">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-200">{nameSize}</h3>
              <div className="flex flex-wrap gap-2">
              <Skeleton className="w-[70px] h-[50px] rounded-xl" />
              <Skeleton className="w-[50px] h-[50px] rounded-xl" />
              <Skeleton className="w-[60px] h-[50px] rounded-xl" />

              <Skeleton className="w-[100px] h-[50px] rounded-xl" />
              <Skeleton className="w-[80px] h-[50px] rounded-xl" />

              <Skeleton className="w-[60px] h-[50px] rounded-xl" />
              <Skeleton className="w-[60px] h-[50px] rounded-xl" />
              <Skeleton className="w-[60px] h-[50px] rounded-xl" />
              </div>

            <div className="hidden lg:block space-y-10">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-200">{nameColor}</h3>
              <div className="flex flex-wrap gap-2">
              <Skeleton className="w-[70px] h-[50px] rounded-xl" />
              <Skeleton className="w-[50px] h-[50px] rounded-xl" />
              <Skeleton className="w-[60px] h-[50px] rounded-xl" />

              <Skeleton className="w-[50px] h-[50px] rounded-xl" />
              <Skeleton className="w-[70px] h-[50px] rounded-xl" />
              <Skeleton className="w-[60px] h-[50px] rounded-xl" />
                <div className="hidden xl:flex xl:flex-wrap gap-2">
                <Skeleton className="w-[60px] h-[50px] rounded-xl" />
                <Skeleton className="w-[60px] h-[50px] rounded-xl" />
                <Skeleton className="w-[60px] h-[50px] rounded-xl" />

                <Skeleton className="w-[50px] h-[50px] rounded-xl" />
                <Skeleton className="w-[70px] h-[50px] rounded-xl" />
                <Skeleton className="w-[60px] h-[50px] rounded-xl" />
                </div>
              </div>
            </div>
            </div>
        </>
    </Container>
  );
};

export default ColorSizeSkeleton;
