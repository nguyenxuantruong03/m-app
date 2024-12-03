"use client";
import { StreamPlayer, StreamPlayerSkeleton } from "@/components/stream-player";
import {
  getToastError,
  translateNoStreamKey,
} from "@/translate/translate-client";
import { getUserByUsername } from "@/lib/user-service";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface CreatorProps {
  params: {
    username: string;
  };
}

const CreatorPage = ({ params }: CreatorProps) => {
  const [user, setUser] = useState<any>();

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getUserByUsername(params.username);
        if (!user) {
          notFound();
        }
        if (
          user.role !== "ADMIN" &&
          user.role !== "STAFF" &&
          user.role !== "MARKETING"
        ) {
          notFound();
        }
        setUser(user);
      } catch (error) {
        toast.error(toastErrorMessage);
      }
    };
    fetchData();
  }, []);

  if (!user.stream) {
    return (
      <>
        <div className="fixed inset-0 flex items-center justify-center h-screen w-full z-10">
          <div className="h-10 w-full flex items-center justify-center font-bold text-red-600">
            {noStreamKeyMessage}
          </div>
        </div>
        <StreamPlayerSkeleton />
      </>
    );
  }

  return (
    <div className="h-full">
      {/* isFollowing true bởi vì đây là trang cá nhân của mình và ko ai có thể vào đc nên đối với bản thân mình ko thể follow chính mình */}
      <StreamPlayer
        user={user as any}
        stream={user.stream}
        isFollowing={false}
        languageToUse={languageToUse}
      />
    </div>
  );
};

export default CreatorPage;
