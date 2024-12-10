import InfoSocial from "@/app/(setting-user)/components/info-social";
import InfoUser from "@/app/(setting-user)/components/info-user";
import prismadb from "@/lib/prismadb";
import {
  translateAccountInfo,
  translateBasicInfo,
  translateManagePersonalInfo,
  translateManageProfile,
  translateManageSocialLinks,
  translatePersonalInfo,
  translateSocialInfo,
} from "@/translate/translate-client";
import { currentUser } from "@/lib/auth";
import { notFound } from "next/navigation";

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
    const personalInfoMessage = translatePersonalInfo(languageToUse);
    const managePersonalInfoMessage = translateManagePersonalInfo(languageToUse);
    const basicInfoMessage = translateBasicInfo(languageToUse);
    const manageProfileMessage = translateManageProfile(languageToUse);
    const socialInfoMessage = translateSocialInfo(languageToUse);
    const manageSocialLinkMessage = translateManageSocialLinks(languageToUse);

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
          {personalInfoMessage}
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400 py-2">
          {managePersonalInfoMessage}
        </div>
        <div className="font-semibold text-lg md:text-xl mt-5 text-salte-900 dark:text-slate-200">
          {basicInfoMessage}
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400 py-2 ">
          {manageProfileMessage}
        </div>
        <InfoUser
          isCustomWarehouse={isCustomWarehouse}
          user={user! ?? undefined}
          imageCredential={user?.imageCredential[0]?.url || ""}
          languageToUse={languageToUse}
          favorite={favorite}
        />

        <div className="font-semibold text-lg md:text-xl mt-5 text-salte-900 dark:text-slate-200">
          {socialInfoMessage}
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400 py-2">
          {manageSocialLinkMessage}
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
  const AccountInfoMessage = translateAccountInfo(user?.language || "en")
  return {
    title: AccountInfoMessage,
  };
}