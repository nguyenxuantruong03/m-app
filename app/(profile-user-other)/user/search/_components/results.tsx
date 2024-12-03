import { getSearch } from "@/lib/stream/search-service";
import { ResultCard, ResultCardSkeleton } from "./result-card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  translateResultForTerm,
  translateNoResultFound,
} from "@/translate/translate-client";
import { getSelf } from "@/lib/stream/auth-service";
interface ResultsProps {
  term?: string;
}
export const Results = async ({ term }: ResultsProps) => {
  const data = await getSearch(term);
  const self = await getSelf();
  //language
  const languageToUse = self.language || "vi"
  const resultForTermMessage = translateResultForTerm(languageToUse);
  const noResultFound = translateNoResultFound(languageToUse);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">
      {resultForTermMessage} &quot;{term}&quot;
      </h2>
      {data.length === 0 && (
        <div className="text-muted-foreground text-sm">
          {noResultFound}
        </div>
      )}
      <div className="flex flex-col gap-y-4">
        {data.map((result) => (
          <ResultCard key={result.id} data={result} />
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
        {[...Array(4)].map((_, i) => (
          <ResultCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};