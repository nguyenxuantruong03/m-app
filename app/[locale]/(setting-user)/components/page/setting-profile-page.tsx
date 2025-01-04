import prismadb from "@/lib/prismadb";
import { currentUser } from "@/lib/auth";
import { notFound } from "next/navigation";
import InfoSocial from "../info-social";
import InfoUser from "../info-user";
import { getTranslations } from "next-intl/server";
import { createTranslator } from "next-intl";

interface SettingProfileProps {
  isCustomWarehouse?: boolean;
}

const SettingProfilePage = async ({
  isCustomWarehouse = false,
}: SettingProfileProps) => {
  const userId = await currentUser()

  if(userId?.role === "GUEST"){
    notFound()
  }

  const user = await prismadb.user.findUnique({
    where: {
      id: userId?.id,
    },
    include: {
      socialLink: true,
      imageCredential: {
        orderBy: {
            createdAt: 'desc'
        }
    }
    },
  });

    //language
    const languageToUse = user?.language || "vi";
    let messages;
  messages = (await import(`@/messages/${languageToUse}.json`)).default;
  const t = createTranslator({ locale: languageToUse, messages });
    const favorite = await prismadb.favorite.findMany()

  return (
    <>
      <div
        className={`${
          isCustomWarehouse
            ? "w-full h-full md:pl-5 lg:pl-12 my-8"
            : "w-full h-full ml-5 lg:pl-12 my-8"
        }`}
      >
        <div className="font-semibold text-lg md:text-2xl text-salte-900 dark:text-slate-200">
          {t("info.personalInfo")}
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400 py-2">
          {t("info.managePersonalInfo")}
        </div>
        <div className="font-semibold text-lg md:text-xl mt-5 text-salte-900 dark:text-slate-200">
          {t("info.basicInfo")}
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400 py-2 ">
          {t("info.manageProfile")}
        </div>
        <InfoUser
          isCustomWarehouse={isCustomWarehouse}
          user={user! ?? undefined}
          imageCredential={user?.imageCredential[0]?.url || ""}
          favorite={favorite}
          languageToUse={languageToUse}
        />

        <div className="font-semibold text-lg md:text-xl mt-5 text-salte-900 dark:text-slate-200">
          {t("info.socialInfo")}
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400 py-2">
          {t("info.manageSocialLink")}
        </div>
        <InfoSocial
          existingUser={user! ?? undefined}
          userSocial={user?.socialLink! ?? undefined}
          languageToUse={languageToUse}
        />
      </div>
    </>
  );
};
export default SettingProfilePage;


export async function generateMetadata() {
  const user =  await currentUser()
  const languageToUse = user?.language || "vi";
  const t = await getTranslations({languageToUse, namespace: "info"})
  return {
    title: t("accountInfo"),
  };
}