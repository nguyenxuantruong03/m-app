import { getBlockedUsers } from "@/lib/stream/block-service";
import { columns } from "./_components/column";
import { DataTable } from "@/components/ui/data-table";

import {
  getListBlockMessage,
  translateListBlockSettings,
} from "@/translate/translate-client";
import { getSelf } from "@/lib/stream/auth-service";
import { currentUser } from "@/lib/auth";

const CommunityPage = async () => {
  const self = await getSelf();
  //language
  const languageToUse = self.language || "vi";
  const listBlockSettingMessage = translateListBlockSettings(languageToUse);

  const blockedUsers = await getBlockedUsers();

  const formattedData = blockedUsers.map((block) => ({
    ...block,
    userId: block.blocked.id,
    imageUrl: block.blocked.imageCredential[0].url || block.blocked.image || "",
    nameuser: block.blocked.nameuser,
    createdAt: block.blocker.blocking.find((item: any) => item)?.createdAt!,
    frameAvatar: block.blocked.frameAvatar,
    role: block.blocked.role,
    isCitizen: block.blocked.isCitizen,
    isLive: block?.blocked?.stream?.isLive,
    languageToUse: languageToUse,
  }));

  return (
    <div className="p-6">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-200">
          {listBlockSettingMessage}
        </h1>
      </div>
      <DataTable
        columns={columns}
        data={formattedData}
        searchKey="nameuser"
        showSelected={false}
        languageToUse={languageToUse}
      />
    </div>
  );
};

export default CommunityPage;

export async function generateMetadata() {
  const curentUsers = await currentUser()
  const listBlockMessage = getListBlockMessage(curentUsers?.language || "en")
  return {
    title: listBlockMessage.listBlock
  };
}