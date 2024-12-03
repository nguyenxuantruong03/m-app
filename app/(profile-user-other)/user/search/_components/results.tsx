"use client";
import { getSearch } from "@/lib/stream/search-service";
import { ResultCard, ResultCardSkeleton } from "./result-card";
import { Skeleton } from "@/components/ui/skeleton";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useState, useEffect } from "react";
import {
  translateResultForTerm,
  translateNoResultFound,
  getToastError,
} from "@/translate/translate-client";
import toast from "react-hot-toast";

interface ResultsProps {
  term?: string;
}

export const Results = ({ term }: ResultsProps) => {
  const user = useCurrentUser();
  const [data, setData] = useState<any[]>([]);
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
    user?.id && user?.role !== "GUEST"
      ? user?.language
      : storedLanguage || "vi";

  //language
  const resultForTermMessage = translateResultForTerm(languageToUse);
  const noResultFound = translateNoResultFound(languageToUse);
  const toastErrorMessage = getToastError(languageToUse);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getSearch(term);
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
    <div>
      <h2 className="text-lg font-semibold mb-4">
        {resultForTermMessage} &quot;{term}&quot;
      </h2>
      {data.length === 0 && (
        <div className="text-muted-foreground text-sm">{noResultFound}</div>
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
