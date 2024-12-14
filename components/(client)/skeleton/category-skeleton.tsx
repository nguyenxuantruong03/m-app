import Container from "@/components/ui/container";
import { Skeleton } from "@/components/ui/skeleton";

const CategorySkeleton = () => {
  return (
    <Container>
      <div className="w-full h-full mt-28 px-2">
          <Skeleton className="w-full aspect-square rounded-xl md:aspect-[2.4/1]" />
          <div className="lg:grid lg:grid-cols-5 lg:gap-x-8 mt-8 h-full">
            <div className="hidden lg:block space-y-10">
            <Skeleton className="w-[150px] h-[50px] rounded-xl" />
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
            <Skeleton className="w-[150px] h-[50px] rounded-xl" />
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


            <div className="mt-6 lg:col-span-4 lg:mt-0 space-y-3">
              <Skeleton className="w-[100px] h-[50px] rounded-xl lg:hidden" />
              <Skeleton className="w-full md:w-[400px] h-[90px] rounded-xl" />
              <Skeleton className="w-full h-[40px] rounded-xl" />

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <Skeleton className="aspect-square rounded-xl" />
                <Skeleton className="aspect-square rounded-xl" />
                <Skeleton className="aspect-square rounded-xl" />
                <Skeleton className="aspect-square rounded-xl" />
                <Skeleton className="aspect-square rounded-xl" />
                <Skeleton className="aspect-square rounded-xl" />
              </div>
            </div>
          </div>
        </div>
    </Container>
  );
};

export default CategorySkeleton;
