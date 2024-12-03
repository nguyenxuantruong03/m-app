"use client";
import { getAllStream } from "@/lib/stream/stream-service";
import { ResultCard, ResultCardSkeleton } from "./result-card";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import LoadingPageComponent from "@/components/ui/loading";
import {
  getToastError,
  translateNoStreamsFound,
  translateStreamsRecommendation,
} from "@/translate/translate-client";

export const Results = () => {
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [storedLanguage, setStoredLanguage] = useState<string | null>(null);

  useEffect(() => {
    // Check if we're running on the client side
    if (typeof window !== "undefined") {
      const language = localStorage.getItem("language");
      setStoredLanguage(language);
    }
  }, []);

  //language
  const languageToUse =
    data?.user?.id && data.user?.role !== "GUEST"
      ? data.user?.language
      : storedLanguage || "vi";

  const toastErrorMessage = getToastError(languageToUse);
  const streamRecommedationMessage =
    translateStreamsRecommendation(languageToUse);
  const noStreamFoundMessage = translateNoStreamsFound(languageToUse);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getAllStream();
        setData(data);
      } catch (error) {
        toast.error(toastErrorMessage);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <LoadingPageComponent />
      ) : (
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
            {data.map((result: any) => (
              <ResultCard key={result.id} data={result} />
            ))}
          </div>
        </div>
      )}
    </>
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
