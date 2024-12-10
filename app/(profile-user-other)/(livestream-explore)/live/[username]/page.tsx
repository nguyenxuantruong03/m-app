import { StreamPlayer, StreamPlayerSkeleton } from "@/components/stream-player";
import { currentUser } from "@/lib/auth";
import { isBlockedbyUsesr } from "@/lib/stream/block-service";
import { isFollowingUser } from "@/lib/stream/follow-service";
import { getUserByUsername } from "@/lib/user-service";
import { getLiveStreamMessage, getOfflineMessage, translateUserInactive } from "@/translate/translate-client";
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
  const userInactiveMessage = translateUserInactive(languageToUse);

  if (isBlocked) {
    notFound();
  }
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
  const curentUsers = await currentUser()
  const liveMessage = getLiveStreamMessage(curentUsers?.language || "en")
  const offliveMessage = getOfflineMessage(curentUsers?.language || "en")
  return {
    title: user && user.stream && user.stream.isLive ? `${liveMessage.liveStream} ${user?.nameuser}` : `${offliveMessage.offline} ${user?.nameuser}`,
  };
}