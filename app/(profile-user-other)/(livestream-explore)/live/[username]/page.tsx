import { StreamPlayer, StreamPlayerSkeleton } from "@/components/stream-player";
import { isBlockedbyUsesr } from "@/lib/stream/block-service";
import { isFollowingUser } from "@/lib/stream/follow-service";
import { getUserByUsername } from "@/lib/user-service";
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

  if (!user) {
    throw new Error("Unauthorized");
  }

  if (isBlocked) {
    notFound();
  }

  if (!user.stream) {
    return (
      <>
        <div className="fixed inset-0 flex items-center justify-center h-screen w-full z-10">
          <div className="h-10 w-full flex items-center justify-center font-bold text-red-600">
            Người dùng đã ngưng hoạt động!
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
      />
    </div>
  );
};

export default LivePage;
