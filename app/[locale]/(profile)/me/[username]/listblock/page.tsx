import { currentUser } from "@/lib/auth";
import { getBlockedUsers } from "@/lib/stream/block-service";
import { columns } from "./_components/column";
import { DataTable } from "@/components/ui/data-table";
import { getSelf } from "@/lib/stream/auth-service";
import { getTranslations } from "next-intl/server";
import { createTranslator } from "next-intl";

const ListBlockPage = async () => {
  const self = await getSelf();
  //language
  const languageToUse = self.language || "vi";
 let messages;
   messages = (await import(`@/messages/${languageToUse}.json`)).default;
   const t = createTranslator({ locale: languageToUse, messages });
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
    isLive: block?.blocked?.stream?.isLive
  }));

  return (
    <div className="p-6">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-200">
          {t("profile.listBlockSetting")}
        </h1>
      </div>
      <DataTable
        placeholder={t("profile.enterEmail")}
        columns={columns}
        data={formattedData}
        searchKey="email"
        showSelected={false}
      />
    </div>
  );
};

export default ListBlockPage;


export async function generateMetadata() {
  const curentUsers = await currentUser()
  const languageToUse = curentUsers?.language || "vi";
  const t = await getTranslations({languageToUse, namespace: "profile"})
  return {
    title: t("listBlock")
  };
}