import { currentUser } from "@/lib/auth";
import { getSelf } from "@/lib/stream/auth-service";
import { getStreamByUserId } from "@/lib/stream/stream-service";
import { ToggleCard } from "./_components/toggle-card";
import { notFound } from "next/navigation";
import ChatSkeleton from "@/components/(client)/skeleton/chat-skeleton";
import { getTranslations } from "next-intl/server";
import { createTranslator } from "next-intl";

const Chat = async () => {
  const self = await getSelf();
  //language
  const languageToUse = self.language || "vi";
 let messages;
   messages = (await import(`@/messages/${languageToUse}.json`)).default;
   const t = createTranslator({ locale: languageToUse, messages });
  const stream = await getStreamByUserId(self.id);
  if (
    self.role !== "ADMIN" &&
    self.role !== "STAFF" &&
    self.role !== "MARKETING"
  ) {
    notFound();
  }
  if (!stream) {
    return (
      <>
        <div className="fixed inset-0 flex items-center justify-center h-screen w-full z-10">
          <div className="h-10 w-full flex items-center justify-center font-bold text-red-600">
            {t("profile.noStreamKey")}
          </div>
        </div>
       <ChatSkeleton />
      </>
    );
  }
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-200">
          {t("profile.chatSettings")}
        </h1>
      </div>
      <div className="space-y-4">
        <ToggleCard
          field="isChatEnabled"
          label={t("profile.enableChat")}
          value={stream.isChatEnabled}
          languageToUse={languageToUse}
        />
        <ToggleCard
          field="isChatDelayed"
          label={t("profile.delayChat")}
          value={stream.isChatDelayed}
          languageToUse={languageToUse}
          timeDelay={stream.timeDelay}
        />
        <ToggleCard
          field="isChatFollowersOnly"
          label={t("profile.mustFollowToChat")}
          value={stream.isChatFollowersOnly}
          languageToUse={languageToUse}
        />
      </div>
    </div>
  );
};
export default Chat;

export async function generateMetadata() {
  const curentUsers = await currentUser();
  const languageToUse = curentUsers?.language || "vi";
  const t = await getTranslations({languageToUse, namespace: "profile"})
  return {
    title: t("chatConfig"),
  };
}
