"use client";
import { getSearchProduct } from "@/lib/searchProducts";
import { ResultCard, ResultCardSkeleton } from "./result-card";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductTrending } from "./product-trending";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import LoadingPageComponent from "@/components/ui/loading";
import { useTranslations } from "next-intl";

interface ResultsProps {
  term?: string;
}

export const Results = ({ term }: ResultsProps) => {
  const t = useTranslations()
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getSearchProduct(term);
        setData(data);
      } catch (error) {
        toast.error(t("toastError.somethingWentWrong"));
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Sort by sold in descending order and take the top 5
  const topSoldProducts = data.sort((a, b) => b.sold! - a.sold!).slice(0, 5);
  return (
    <>
      {loading ? (
        <>
          <LoadingPageComponent />
        </>
      ) : (
        <div>
          <h2 className="text-lg font-semibold mb-4">
            {t("search.resultForTerm")} &quot;{term}&quot;
          </h2>
          {data.length === 0 && (
            <div className="text-muted-foreground text-sm">{t("search.noResultFound")}</div>
          )}
          <div className="flex flex-wrap justify-center xl:justify-start gap-4">
            {data.map((result) => (
              <ResultCard key={result.id} data={result} />
            ))}
          </div>
          <div className="mt-10">
            <div className="text-lg font-semibold mb-4 text-yellow-400 flex items-center space-x-2">
              <Star className="w-5 h-5" fill="#facc15" />
              <Star className="w-5 h-5" fill="#facc15" />{" "}
              <span>{t("search.productTrending")}</span>
              <Star className="w-5 h-5" fill="#facc15" />
              <Star className="w-5 h-5" fill="#facc15" />{" "}
            </div>
            <div className="flex flex-wrap justify-center xl:justify-start gap-4">
              {topSoldProducts.map((result) => (
                <ProductTrending key={result.id} data={result} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export const ResultsSkeleton = () => {
  return (
    <div>
      <Skeleton className="h-8 w-[290px] mb-4" />
      <div className="flex flex-col gap-y-4">
        {Array.from({ length: 4 }, (_, i) => (
          <ResultCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};
