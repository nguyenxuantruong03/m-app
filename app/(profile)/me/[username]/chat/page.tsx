import { getSelf } from "@/lib/stream/auth-service";
import { getStreamByUserId } from "@/lib/stream/stream-service";
import { ToggleCard } from "./_components/toggle-card";
import { Skeleton } from "@/components/ui/skeleton";
import { ToggleCardSkeleton } from "./_components/toggle-card";
import { notFound } from "next/navigation";
import FormDelay from "./_components/form-delay";

const ChatPage = async () => {
  const self = await getSelf();
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
            Chưa có StreamKey. Hãy tạo StreamKey!
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
        <h1 className="text-2xl font-bold">Chat Settings</h1>
      </div>
      <div className="space-y-4">
        <ToggleCard
          field="isChatEnabled"
          label="Enable chat"
          value={stream.isChatEnabled}
        />
        <ToggleCard
          field="isChatDelayed"
          label="Delay chat"
          value={stream.isChatDelayed}
        />
        <FormDelay data={stream.timeDelay} />
        <ToggleCard
          field="isChatFollowersOnly"
          label="Must be following to chat"
          value={stream.isChatFollowersOnly}
        />
      </div>
    </div>
  );
};

export default ChatPage;
