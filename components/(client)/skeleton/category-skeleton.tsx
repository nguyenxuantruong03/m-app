import { Skeleton } from "@/components/ui/skeleton";

const CategorySkeleton = () => {
  return (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <Skeleton className="aspect-square rounded-xl" />
                <Skeleton className="aspect-square rounded-xl" />
                <Skeleton className="aspect-square rounded-xl" />
                <Skeleton className="aspect-square rounded-xl" />
                <Skeleton className="aspect-square rounded-xl" />
                <Skeleton className="aspect-square rounded-xl" />
                <Skeleton className="aspect-square rounded-xl" />
                <Skeleton className="aspect-square rounded-xl" />
                <Skeleton className="aspect-square rounded-xl" />
              </div>
  );
};

export default CategorySkeleton;
