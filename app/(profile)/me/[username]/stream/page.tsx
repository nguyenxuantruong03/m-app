import { StreamPlayer, StreamPlayerSkeleton } from "@/components/stream-player";
import { getSelf } from "@/lib/stream/auth-service";
import { getUserByUsername } from "@/lib/user-service";
import { notFound } from "next/navigation";

interface CreatorProps {
  params: {
    username: string;
  };
}

const CreatorPage = async ({ params }: CreatorProps) => {
  const user = await getUserByUsername(params.username);
  const self = await getSelf();

  if (
    self.role !== "ADMIN" &&
    self.role !== "STAFF" &&
    self.role !== "MARKETING"
  ) {
    notFound();
  }

  if (!user) {
    throw new Error("Unauthorized");
  }

  if (!user.stream) {
    return (
      <>
        <div className="fixed inset-0 flex items-center justify-center h-screen w-full z-10">
          <div className="h-10 w-full flex items-center justify-center font-bold text-red-600">
            Chưa có StreamKey. Hãy tạo StreamKey!
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
      />
    </div>
  );
};

export default CreatorPage;
