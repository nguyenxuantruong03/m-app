import { Skeleton } from "@/components/ui/skeleton";

const BillboardCategorySkeleton = () => {
  return (
      <>
          <Skeleton className="w-full aspect-square rounded-xl md:aspect-[2.4/1]" />
        </>
  );
};

export default BillboardCategorySkeleton;
