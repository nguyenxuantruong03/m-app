import {
  getListBlockMessage,
} from "@/translate/translate-client";
import { currentUser } from "@/lib/auth";
import { getBlockedUsers } from "@/lib/stream/block-service";
import { columns } from "./_components/column";
import { DataTable } from "@/components/ui/data-table";

import {
  translateListBlockSettings,
} from "@/translate/translate-client";
import { getSelf } from "@/lib/stream/auth-service";
import { getEnterEmailTranslation } from "@/translate/translate-dashboard";

const ListBlockPage = async () => {
  const self = await getSelf();
  //language
  const languageToUse = self.language || "vi";
  const listBlockSettingMessage = translateListBlockSettings(languageToUse);
  const enterEmailMessage = getEnterEmailTranslation(languageToUse);

  const blockedUsers = await getBlockedUsers();

  const formattedData = blockedUsers.map((block) => ({
    ...block,
    userId: block.blocked.id,
    email: block.blocked.email,
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
        placeholder={enterEmailMessage}
        columns={columns}
        data={formattedData}
        searchKey="email"
        showSelected={false}
        languageToUse={languageToUse}
      />
    </div>
  );
};

export default ListBlockPage;


export async function generateMetadata() {
  const curentUsers = await currentUser()
  const listBlockMessage = getListBlockMessage(curentUsers?.language || "en")
  return {
    title: listBlockMessage.listBlock
  };
}