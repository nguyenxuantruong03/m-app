import { getAllStream } from "@/lib/stream/stream-service";
import { ResultCard, ResultCardSkeleton } from "./result-card";
import {
  translateNoStreamsFound,
  translateStreamsRecommendation,
} from "@/translate/translate-client";
import { getSelf } from "@/lib/stream/auth-service";
export const Results = async () => {
  const data = await getAllStream();
  const self = await getSelf();
  //language
  const languageToUse = self.language || "vi";
  const streamRecommedationMessage =
    translateStreamsRecommendation(languageToUse);
  const noStreamFoundMessage = translateNoStreamsFound(languageToUse);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4 text-slate-900 dark:text-slate-200">
        {streamRecommedationMessage}
      </h2>
      {data.length === 0 && (
        <div className="text-muted-foreground text-sm">
          {noStreamFoundMessage}.
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {data.map((result) => (
          <ResultCard key={result.id} data={result} />
        ))}
      </div>
    </div>
  );
};
export const ResultSkeleton = () => {
  return (
    <div className="h-8 w-[290px] mb-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {[...Array(4).map((_, i) => <ResultCardSkeleton key={i} />)]}
      </div>
    </div>
  );
};
