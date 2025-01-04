import { currentUser } from "@/lib/auth";
import { UrlCard } from "./_components/url-card";
import { getSelf } from "@/lib/stream/auth-service";
import { getStreamByUserId } from "@/lib/stream/stream-service";
import { KeyCard } from "./_components/key-card";
import { ConnectModal } from "./_components/connect-modal";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

const Keys = async () => {
  const self = await getSelf();
  const stream = await getStreamByUserId(self.id);
  //language
  const languageToUse = self.language || "vi";
  if (
    self.role !== "ADMIN" &&
    self.role !== "STAFF" &&
    self.role !== "MARKETING"
  ) {
    notFound();
  }

  return (
    <div className="p-2 mt-6 lg:mt-0 lg:p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-200">
          Keys & URLs
        </h1>
        <ConnectModal />
      </div>
      <div className="space-y-4">
        <UrlCard value={stream?.serverUrl || ""} />
        <KeyCard value={stream?.streamKey || ""} />
      </div>
    </div>
  );
};
export default Keys;

export async function generateMetadata() {
  const curentUsers = await currentUser();
  const languageToUse = curentUsers?.language || "vi";
  const t = await getTranslations({ languageToUse, namespace: "profile" });
  return {
    title: t("streamKeys"),
  };
}
