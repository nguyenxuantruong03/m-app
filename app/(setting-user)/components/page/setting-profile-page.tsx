"use client";
import InfoSocial from "@/app/(setting-user)/components/info-social";
import InfoUser from "@/app/(setting-user)/components/info-user";
import prismadb from "@/lib/prismadb";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useEffect, useState } from "react";
import {
  translateBasicInfo,
  translateManagePersonalInfo,
  translateManageProfile,
  translateManageSocialLinks,
  translatePersonalInfo,
  translateSocialInfo,
} from "@/translate/translate-client";
import { notFound } from "next/navigation";

interface SettingProfileProps {
  isCustomWarehouse?: boolean;
}

const SettingProfilePage = ({
  isCustomWarehouse = false,
}: SettingProfileProps) => {
  const userId = useCurrentUser();
  const [user, setUser] = useState<any>();
  const [storedLanguage, setStoredLanguage] = useState<string | null>(null);

  useEffect(() => {
    // Check if we're running on the client side
    if (typeof window !== "undefined") {
      const language = localStorage.getItem("language");
      setStoredLanguage(language);
    }
  }, []);

  //language
  const languageToUse =
    user?.id && user?.role !== "GUEST"
      ? user?.language
      : storedLanguage || "vi";
  const personalInfoMessage = translatePersonalInfo(languageToUse);
  const managePersonalInfoMessage = translateManagePersonalInfo(languageToUse);
  const basicInfoMessage = translateBasicInfo(languageToUse);
  const manageProfileMessage = translateManageProfile(languageToUse);
  const socialInfoMessage = translateSocialInfo(languageToUse);
  const manageSocialLinkMessage = translateManageSocialLinks(languageToUse);

  useEffect(() => {
    const fetchData = async () => {
      const user = await prismadb.user.findUnique({
        where: {
          id: userId?.id,
        },
        include: {
          socialLink: true,
          imageCredential: {
            orderBy: {
              createdAt: "desc",
            },
          },
        },
      });
      if (!user) {
        notFound();
      }
      setUser(user);
    };
    fetchData;
  }, []);

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
