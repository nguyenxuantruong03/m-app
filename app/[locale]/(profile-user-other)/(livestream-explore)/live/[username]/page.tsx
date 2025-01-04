import { StreamPlayer, StreamPlayerSkeleton } from "@/components/stream-player";
import { currentUser } from "@/lib/auth";
import { isBlockedbyUsesr } from "@/lib/stream/block-service";
import { isFollowingUser } from "@/lib/stream/follow-service";
import { getUserByUsername } from "@/lib/user-service";
import { createTranslator } from "next-intl";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
interface LivePageProps {
  params: {
    username: string;
  };
}
const LivePage = async ({ params }: LivePageProps) => {
  const user = await getUserByUsername(params.username);
  if (!user) {
    notFound();
  }
  const isFollowing = await isFollowingUser(user.id);
  const isBlocked = await isBlockedbyUsesr(user.id);
    //language
  const languageToUse = user.language || "vi"
  let messages;
  messages = (await import(`@/messages/${languageToUse}.json`)).default;
  const t = createTranslator({ locale: languageToUse, messages });

  if (isBlocked) {
    notFound();
  }
  if (!user.stream) {
    return (
      <>
        <div className="fixed inset-0 flex items-center justify-center h-screen w-full z-10">
          <div className="h-10 w-full flex items-center justify-center font-bold text-red-600">
            {t("profile.userInactive")}
          </div>
        </div>
        <StreamPlayerSkeleton />
      </>
    );
  }
  return (
    <div>
      <StreamPlayer
        user={user as any}
        stream={user.stream}
        isFollowing={isFollowing}
        languageToUse={languageToUse}
      />
    </div>
  );
};
export default LivePage;

export async function generateMetadata({ params }: LivePageProps) {
  const user = await getUserByUsername(params.username);
  const currentuser = await currentUser()
  const languageToUse = currentuser?.language || "vi";
  const t = await getTranslations({languageToUse, namespace: "profile"})

  return {
    title: user && user.stream && user.stream.isLive ? `${t("liveStream")} ${user?.nameuser}` : `${t("offline")} ${user?.nameuser}`,
  };
}