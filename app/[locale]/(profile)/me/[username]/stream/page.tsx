import { StreamPlayer, StreamPlayerSkeleton } from "@/components/stream-player";
import { currentUser } from "@/lib/auth";
import { getUserByUsername } from "@/lib/user-service";
import { createTranslator } from "next-intl";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
interface LivePageProps {
  params: {
    username: string;
  };
}
const CreatorPage = async ({ params }: LivePageProps) => {
  const user = await getUserByUsername(params.username);
  const languageToUse = user?.language || "vi";
  let messages;
  messages = (await import(`@/messages/${languageToUse}.json`)).default;
  const t = createTranslator({ locale: languageToUse, messages });
 
  if(!user){
    notFound();
  }

  if (
    user.role !== "ADMIN" &&
    user.role !== "STAFF" &&
    user.role !== "MARKETING"
  ) {
    notFound();
  }
 
  if (!user.stream) {
    return (
      <>
        <div className="fixed inset-0 flex items-center justify-center h-screen w-full z-10">
          <div className="h-10 w-full flex items-center justify-center font-bold text-red-600">
            {t("profile.noStreamKey")}
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

export async function generateMetadata({ params }: LivePageProps) {
  const user = await getUserByUsername(params.username);
  const curentUsers = await currentUser()
  const languageToUse = curentUsers?.language || "vi";
  const t = await getTranslations({languageToUse, namespace: "profile"})

  return {
    title: user && user.stream && user.stream.isLive ? `${t("liveStream")} ${user?.nameuser}` : `${t("offline")} ${user?.nameuser}`,
  };
}