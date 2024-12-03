import { StreamPlayer, StreamPlayerSkeleton } from "@/components/stream-player";
import { getSelf } from "@/lib/stream/auth-service";
import { getUserByUsername } from "@/lib/user-service";
import { translateNoStreamKey } from "@/translate/translate-client";
import { notFound } from "next/navigation";
interface CreatorProps {
  params: {
    username: string;
  };
}
const CreatorPage = async ({ params }: CreatorProps) => {
  const user = await getUserByUsername(params.username);
  const self = await getSelf();
  //language
  const languageToUse = self.language || "vi";
  const noStreamKeyMessage = translateNoStreamKey(languageToUse);

  if (
    self.role !== "ADMIN" &&
    self.role !== "STAFF" &&
    self.role !== "MARKETING"
  ) {
    notFound();
  }
  
  if (!user) {
    notFound();
  }
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
