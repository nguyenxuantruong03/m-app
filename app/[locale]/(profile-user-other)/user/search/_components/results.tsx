import { getSearch } from "@/lib/stream/search-service";
import { ResultCard, ResultCardSkeleton } from "./result-card";
import { Skeleton } from "@/components/ui/skeleton";
import { getSelf } from "@/lib/stream/auth-service";
import { getTranslations } from "next-intl/server";
interface ResultsProps {
  term?: string;
}
export const Results = async ({ term }: ResultsProps) => {
  const data = await getSearch(term);
  const self = await getSelf();
  //language
  const languageToUse = self?.language || "vi";
  const t = await getTranslations({languageToUse, namespace: "search"})

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">
        {t("resultForTerm")} &quot;{term}&quot;
      </h2>
      {data.length === 0 && (
        <div className="text-muted-foreground text-sm">{t("noResultFound")}</div>
      )}
      <div className="flex flex-col gap-y-4">
        {data.map((result) => (
          <ResultCard
            key={result.id}
            data={result}
            languageToUse={languageToUse}
          />
        ))}
      </div>
    </div>
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
