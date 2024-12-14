import Container from "@/components/ui/container";
import { Skeleton } from "@/components/ui/skeleton";

const ProductSkeleton = () => {
    const skeletonSizes = [
        {
          className: "w-[155px] h-[200px] block sm:block md:hidden lg:hidden",
          count: 2,
        }, // sm
        { className: "w-[200px] h-[200px] hidden md:block lg:hidden", count: 3 }, // md
        { className: "w-[200px] h-[200px] hidden lg:block", count: 5 }, // lg
      ];
    return ( 
        <Container>
             <div className=" mt-40 p-2 xl:p-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-4">
            <Skeleton className="h-[590px] w-full" />

            <div className="hidden xl:flex flex-wrap gap-4">
              {Array.from({ length: 10 }).map((_, index) => (
                <Skeleton key={index} className="w-[113px] h-[100px]" />
              ))}
            </div>

            <div className="flex flex-wrap xl:hidden gap-4">
              {Array.from({ length: 6 }).map((_, index) => (
                <Skeleton key={index} className="w-[100px] h-[100px]" />
              ))}
            </div>

            <div className="hidden xl:grid grid-cols-2 gap-5">
              <Skeleton className="h-[200px] w-full" />
              <Skeleton className="h-[200px] w-full" />
            </div>

            <div className="hidden xl:grid grid-cols-2 gap-5">
              <Skeleton className="h-[200px] w-full" />
              <Skeleton className="h-[200px] w-full" />
            </div>
            <div className="hidden xl:block">
              <Skeleton className="h-[50px] w-full" />
            </div>
          </div>

          <div className="space-y-3">
            <Skeleton className="w-[300px] h-[35px]" />
            <Skeleton className="w-full h-[60px]" />

            <div className="flex item-center space-x-2">
              <Skeleton className="w-[120px] h-[35px]" />
              <Skeleton className="w-[100px] h-[35px]" />
              <Skeleton className="w-[100px] h-[35px]" />
            </div>

            <div className="flex item-center space-x-2">
              <Skeleton className="w-[80px] h-[35px]" />
              <Skeleton className="w-[100px] h-[35px]" />
              <Skeleton className="w-[100px] h-[35px]" />
            </div>

            <div className="flex item-center space-x-2">
              <Skeleton className="w-[80px] h-[35px]" />
              <Skeleton className="w-[50px] h-[35px]" />
              <Skeleton className="w-[100px] h-[35px]" />
              <Skeleton className="w-[50px] h-[35px]" />
            </div>

            <div className="flex item-center space-x-2">
              <Skeleton className="w-[200px] h-[35px]" />
              <Skeleton className="w-[50px] h-[35px]" />
            </div>

            <div className="flex item-center space-x-2">
              <Skeleton className="w-[250px] h-[35px]" />
              <Skeleton className="w-[50px] h-[35px]" />
            </div>

            <div className="flex item-center space-x-2">
              <Skeleton className="w-[50px] h-[35px]" />
              <Skeleton className="w-[150px] h-[35px]" />
            </div>

            <div className="flex item-center space-x-2">
              <Skeleton className="w-[100px] h-[35px]" />
              <Skeleton className="w-[50px] h-[35px]" />
              <Skeleton className="w-[100px] h-[35px]" />
            </div>

            <div className="flex item-center space-x-2">
              <Skeleton className="w-[70px] h-[35px]" />
              <Skeleton className="w-[70px] h-[35px]" />
              <Skeleton className="w-full h-[35px]" />
            </div>

            <Skeleton className="w-full h-[160px] hidden md:block" />
            <Skeleton className="w-full h-[155px]" />

            {/* Ch tiết sản phẩm mobile */}
            <div className="xl:hidden grid grid-cols-1  md:grid-cols-2 gap-5">
              <Skeleton className="h-[200px] w-full" />
              <Skeleton className="h-[200px] w-full" />
            </div>

            <div className="xl:hidden grid grid-cols-1 md:grid-cols-2 gap-5">
              <Skeleton className="h-[200px] w-full" />
              <Skeleton className="h-[200px] w-full" />
            </div>
            <div className="xl:hidden flex items-center justify-center">
              <Skeleton className="h-[50px] w-[300px]" />
            </div>

            {/* Bảo hàng */}
            <div className="space-y-1">
              <Skeleton className="w-full h-[100px]" />
              <Skeleton className="w-full h-[75px]" />
              <Skeleton className="w-full h-[75px]" />
              <Skeleton className="w-full h-[75px]" />
              <Skeleton className="w-full h-[75px]" />
            </div>
          </div>

          {/* Product suggest */}
          <div className="mx-auto space-y-3">
            <Skeleton className="w-[100px] h-[50px]" />
            <div className="flex items-center justify-center space-x-10">
              {skeletonSizes.map(({ className, count }, idx) =>
                Array.from({ length: count }).map((_, subIdx) => (
                  <Skeleton key={`${idx}-${subIdx}`} className={className} />
                ))
              )}
            </div>

            <Skeleton className="w-[100px] h-[50px]" />
            <div className="flex items-center justify-center space-x-10">
              {skeletonSizes.map(({ className, count }, idx) =>
                Array.from({ length: count }).map((_, subIdx) => (
                  <Skeleton key={`${idx}-${subIdx}`} className={className} />
                ))
              )}
            </div>
          </div>
        </div>

        {/* Đặc điểm nổi bật */}
        <div className="space-y-2 mt-10 p-2">
          <Skeleton className="w-full h-[150px]" />
          <Skeleton className="w-full h-[200px]" />
          <div className="space-y-2 flex flex-col items-center">
            <Skeleton className="w-full md:w-[600px]  h-[300px]" />
            <Skeleton className="w-full md:w-[600px]  h-[300px]" />
          </div>
          <Skeleton className="w-full h-[100px]" />
        </div>
        {/* Bình luận */}
        <div className="mt-10 p-2">
          <Skeleton className="w-full h-[30px]" />
          <div className="grid grid-cols-2 items-center mt-7 md:mt-10">
            <div className="space-y-1">
              <Skeleton className="w-[80px]  h-[30px]" />
              <Skeleton className="w-[100px]  h-[30px]" />
              <Skeleton className="w-[120px]  h-[30px]" />
            </div>

            <div className="space-y-1">
              <Skeleton className="w-full h-[30px]" />
              <Skeleton className="w-full h-[30px]" />
              <Skeleton className="w-full h-[30px]" />
              <Skeleton className="w-full h-[30px]" />
              <Skeleton className="w-full h-[30px]" />
            </div>
          </div>
          <div>
            <div className="space-y-1 mt-7">
              <Skeleton className="w-[200px]  h-[30px]" />
              <Skeleton className="w-[200px]  h-[50px]" />
              <Skeleton className="w-full h-[75px]" />
              <div className="grid grid-cols-2 items-center">
                <Skeleton className="w-[100px] h-[30px]" />
                <Skeleton className="w-[150px] h-[35px]" />
              </div>
            </div>
          </div>
        </div>
      </div>
        </Container>
     );
}
 
export default ProductSkeleton;