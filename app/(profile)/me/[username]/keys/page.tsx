"use client";
import { UrlCard } from "./_components/url-card";
import { getStreamByUserId } from "@/lib/stream/stream-service";
import { KeyCard } from "./_components/key-card";
import { ConnectModal } from "./_components/connect-modal";
import { notFound } from "next/navigation";
import { getToastError } from "@/translate/translate-client";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import LoadingPageComponent from "@/components/ui/loading";

const KeysPages = () => {
  const user = useCurrentUser();
  const [stream, setStream] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

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
  const toastErrorMessage = getToastError(languageToUse);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (
          user?.role !== "ADMIN" &&
          user?.role !== "STAFF" &&
          user?.role !== "MARKETING"
        ) {
          notFound();
        }
        const stream = await getStreamByUserId(user?.id || "");
        setStream(stream);
      } catch (error) {
        toast.error(toastErrorMessage);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-200">
          Keys & URLs
        </h1>
        <ConnectModal languageToUse={languageToUse} />
      </div>
      {loading ? (
        <LoadingPageComponent />
      ) : (
        <div className="space-y-4">
          <UrlCard value={stream?.serverUrl || ""} />
          <KeyCard value={stream?.streamKey || ""} />
        </div>
      )}
    </div>
  );
};

export default KeysPages;
