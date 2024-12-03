"use client";
import { getStreamByUserId } from "@/lib/stream/stream-service";
import { ToggleCard } from "./_components/toggle-card";
import { Skeleton } from "@/components/ui/skeleton";
import { ToggleCardSkeleton } from "./_components/toggle-card";
import { notFound } from "next/navigation";
import FormDelay from "./_components/form-delay";
import { useEffect, useState } from "react";
import { useCurrentUser } from "@/hooks/use-current-user";
import {
  getToastError,
  translateChatSettings,
  translateNoStreamKey,
} from "@/translate/translate-client";
import toast from "react-hot-toast";
import LoadingPageComponent from "@/components/ui/loading";

const ChatPage = () => {
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
  const noStreamKeyMessage = translateNoStreamKey(languageToUse);
  const translateChatSettingsMessage = translateChatSettings(languageToUse);

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

  if (!stream) {
    return (
      <>
        <div className="fixed inset-0 flex items-center justify-center h-screen w-full z-10">
          <div className="h-10 w-full flex items-center justify-center font-bold text-red-600">
            {noStreamKeyMessage}
          </div>
        </div>
        <div className="p-6 space-y-4">
          <Skeleton className="h-10 w-[200px]" />
          <div className="space-y-4">
            <ToggleCardSkeleton />
            <ToggleCardSkeleton />
            <ToggleCardSkeleton />
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">{translateChatSettingsMessage}</h1>
      </div>
      <div className="space-y-4">
        {loading ? (
          <LoadingPageComponent />
        ) : (
          <>
            <ToggleCard
              field="isChatEnabled"
              label="Enable chat"
              value={stream.isChatEnabled}
              languageToUse={languageToUse}
            />
            <ToggleCard
              field="isChatDelayed"
              label="Delay chat"
              value={stream.isChatDelayed}
              languageToUse={languageToUse}
            />
            <FormDelay data={stream.timeDelay} languageToUse={languageToUse} />
            <ToggleCard
              field="isChatFollowersOnly"
              label="Must be following to chat"
              value={stream.isChatFollowersOnly}
              languageToUse={languageToUse}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
