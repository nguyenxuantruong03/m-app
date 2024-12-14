import { Skeleton } from "@/components/ui/skeleton";

const MainProductSkeleton = () => {
    const skeletonSizes = [
        {
          className: "w-[150px] h-[300px] block sm:block md:hidden lg:hidden",
          count: 2,
        }, // sm
        { className: "w-[200px] h-[300px] hidden md:block lg:hidden", count: 3 }, // md
        { className: "w-[200px] h-[300px] hidden lg:block", count: 5 }, // lg
      ];
    
    return ( 
        <div className="flex items-center justify-center space-x-10">
          {skeletonSizes.map(({ className, count }, idx) =>
            Array.from({ length: count }).map((_, subIdx) => (
              <Skeleton key={`${idx}-${subIdx}`} className={className} />
            ))
          )}
      </div>
     );
}
 
export default MainProductSkeleton;