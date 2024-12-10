import { getSelf } from "@/lib/stream/auth-service";
import { getStreamByUserId } from "@/lib/stream/stream-service";
import { ToggleCard } from "./_components/toggle-card";
import { Skeleton } from "@/components/ui/skeleton";
import { ToggleCardSkeleton } from "./_components/toggle-card";
import { notFound } from "next/navigation";
import FormDelay from "./_components/form-delay";
import { getChatConfigMessage, getChatStatus, translateChatSettings, translateNoStreamKey } from "@/translate/translate-client";
import { currentUser } from "@/lib/auth";
const ChatPage = async () => {
  const self = await getSelf();
  //language
  const languageToUse = self.language || "vi"
  const noStreamKeyMessage = translateNoStreamKey(languageToUse);
  const translateChatSettingsMessage = translateChatSettings(languageToUse);
  const chatStatusMessage = getChatStatus(languageToUse) 

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
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-200">{translateChatSettingsMessage}</h1>
      </div>
      <div className="space-y-4">
        <ToggleCard
          field="isChatEnabled"
          label={chatStatusMessage.enableChat}
          value={stream.isChatEnabled}
          languageToUse={languageToUse}
        />
        <ToggleCard
          field="isChatDelayed"
          label={chatStatusMessage.delayChat}
          value={stream.isChatDelayed}
          languageToUse={languageToUse}
          timeDelay={stream.timeDelay}
        />
        <ToggleCard
          field="isChatFollowersOnly"
          label={chatStatusMessage.mustFollowToChat}
          value={stream.isChatFollowersOnly}
          languageToUse={languageToUse}
        />
      </div>
    </div>
  );
};
export default ChatPage;

export async function generateMetadata() {
  const curentUsers = await currentUser()
  const chatConfigMessage = getChatConfigMessage(curentUsers?.language || "en")
  return {
    title: chatConfigMessage.chatConfig
  };
}