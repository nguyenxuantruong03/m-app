"use client";
import { StreamPlayer, StreamPlayerSkeleton } from "@/components/stream-player";
import LoadingPageComponent from "@/components/ui/loading";
import { translateUserInactive } from "@/translate/translate-client";
import { isBlockedbyUsesr } from "@/lib/stream/block-service";
import { isFollowingUser } from "@/lib/stream/follow-service";
import { getUserByUsername } from "@/lib/user-service";
import { notFound } from "next/navigation";
import { useState, useEffect } from "react";
import { getToastError } from "@/translate/translate-client";
import toast from "react-hot-toast";
interface LivePageProps {
  params: {
    username: string;
  };
}

const LivePage = ({ params }: LivePageProps) => {
  const [user, setUser] = useState<any>();
  const [isFollowing, setIsFollowing] = useState<any>();
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
  const toastErrorMessage = getToastError(languageToUse);
  const userInactiveMessage = translateUserInactive(languageToUse);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const user = await getUserByUsername(params.username);

        if (!user) {
          notFound();
        }

        const isFollowing = await isFollowingUser(user.id);
        const isBlocked = await isBlockedbyUsesr(user.id);

        if (isBlocked) {
          notFound();
        }

        setUser(user);
        setIsFollowing(isFollowing);
      } catch (error) {
        toast.error(toastErrorMessage);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (!user.stream) {
    return (
      <>
        <div className="fixed inset-0 flex items-center justify-center h-screen w-full z-10">
          <div className="h-10 w-full flex items-center justify-center font-bold text-red-600">
            {userInactiveMessage}
          </div>
        </div>
        <StreamPlayerSkeleton />
      </>
    );
  }

  return (
    <div>
      {loading ? (
        <LoadingPageComponent />
      ) : (
        <StreamPlayer
          user={user as any}
          stream={user.stream}
          isFollowing={isFollowing}
          languageToUse={languageToUse}
        />
      )}
    </div>
  );
};

export default LivePage;
