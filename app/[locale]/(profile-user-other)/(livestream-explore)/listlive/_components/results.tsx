import { getAllStream } from "@/lib/stream/stream-service";
import { ResultCard, ResultCardSkeleton } from "./result-card";
import { getSelf } from "@/lib/stream/auth-service";
import { Skeleton } from "@/components/ui/skeleton";
import { createTranslator } from "next-intl";

export const Results = async () => {
  const data = await getAllStream();
  const self = await getSelf();
  //language
  const languageToUse = self.language || "vi";
  let messages;
  messages = (await import(`@/messages/${languageToUse}.json`)).default;
  const t = createTranslator({ locale: languageToUse, messages });

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4 text-slate-900 dark:text-slate-200">
        {t("profile.streamRecommedation")}
      </h2>
      {data.length === 0 && (
        <div className="text-muted-foreground text-sm">
          {t("profile.noStreamFound")}.
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
    <div className="space-y-4 h-full p-8 max-w-screen-2xl mx-auto">
      <Skeleton className="w-[250px] h-[30px]"/>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
      {Array.from({ length: 6 }, (_, i) => (
        <ResultCardSkeleton key={i} />
      ))}
    </div>
    </div>
  );
};
