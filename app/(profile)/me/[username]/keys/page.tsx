import { UrlCard } from "./_components/url-card";
import { getSelf } from "@/lib/stream/auth-service";
import { getStreamByUserId } from "@/lib/stream/stream-service";
import { KeyCard } from "./_components/key-card";
import { ConnectModal } from "./_components/connect-modal";
import { notFound } from "next/navigation";

const KeysPages = async () => {
    const self = await getSelf()
    const stream = await getStreamByUserId(self.id)

    if (
      self.role !== "ADMIN" &&
      self.role !== "STAFF" &&
      self.role !== "MARKETING"
    ) {
      notFound();
    }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Keys & URLs</h1>
        <ConnectModal />
      </div>
      <div className="space-y-4">
        <UrlCard value={stream?.serverUrl || ""}/>
        <KeyCard value={stream?.streamKey || ""}/>
      </div>
    </div>
  );
};

export default KeysPages;
