"use client";
import prismadb from "@/lib/prismadb";
import { utcToZonedTime } from "date-fns-tz";
import { format } from "date-fns";
import viLocale from "date-fns/locale/vi";
import { getAccountByUserId } from "@/data/account";
import InfoDecive from "@/app/(setting-user)/components/info-device";
import InfoPassword from "@/app/(setting-user)/components/info-password";
import { useEffect, useState } from "react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { notFound } from "next/navigation";
import {
  translateDeviceCheck,
  translateDeviceManagementAndLimitations,
  translateLoginAndRecovery,
  translatePasswordAndSecurity,
  translatePasswordManagementAndSecuritySettings,
  translatePasswordManagementAndTwoFactorVerification,
} from "@/translate/translate-client";
const vietnamTimeZone = "Asia/Ho_Chi_Minh"; // Múi giờ Việt Nam

interface PasswordSecurityProps {
  isCustomWarehouse?: boolean;
}

const PasswordSecurityPage = ({ isCustomWarehouse }: PasswordSecurityProps) => {
  const userId = useCurrentUser();
  const [user, setUser] = useState<any>();
  const [account, setAccount] = useState<any>();
  const [device, setDevice] = useState<any>();
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
  const passwordAndSecurityMessage =
    translatePasswordAndSecurity(languageToUse);
  const passwordManagementAndSecuritySettingMessage =
    translatePasswordManagementAndSecuritySettings(languageToUse);
  const loginAndRecoveryMessage = translateLoginAndRecovery(languageToUse);
  const passwordManagementAndTwoFactorVerificationMessage =
    translatePasswordManagementAndTwoFactorVerification(languageToUse);
  const deviceCheckMessage = translateDeviceCheck(languageToUse);
  const deviceManagementAndLimittationMessage =
    translateDeviceManagementAndLimitations(languageToUse);

  useEffect(() => {
    const fetchData = async () => {
      const account = await getAccountByUserId(userId?.id || "");
      const user = await prismadb.user.findUnique({
        where: {
          id: userId?.id,
        },
        include: {
          password: true,
        },
      });

      const findDevice = await prismadb.deviceInfo.findMany({
        where: {
          userId: userId?.id,
        },
      });
      if (!user || !account) {
        notFound();
      }
      setUser(user);
      setAccount(account);
      setDevice(findDevice);
    };
    fetchData;
  }, []);

  const formatPassword = user?.password?.length
    ? user?.password[0].createdAt
      ? format(
          utcToZonedTime(
            new Date(new Date(user?.password[0].createdAt)),
            vietnamTimeZone
          ),
          "E '-' dd/MM/yyyy '-' HH:mm:ss a",
          { locale: viLocale }
        )
      : null
    : "Chưa đổi mật khẩu";

  // Kiểm tra điều kiện để quyết định có render InfoDevice hay không
  const shouldRenderDeviceInfo = !(
    account?.provider === "github" ||
    account?.provider === "google" ||
    account?.provider === "facebook" ||
    account?.provider === "gitlab" ||
    account?.provider === "reddit" ||
    account?.provider === "spotify" ||
    account?.provider === "twitter"
  );
  return (
    <div
      className={`${
        isCustomWarehouse
          ? "w-full h-full md:pl-5 lg:pl-12 my-8"
          : "w-full h-full ml-5 lg:pl-12 my-8"
      }`}
    >
      <div className="font-semibold text-lg md:text-2xl text-salte-900 dark:text-slate-200">
        {passwordAndSecurityMessage}
      </div>
      <div className="text-sm py-2 text-gray-500 dark:text-gray-400">
        {passwordManagementAndSecuritySettingMessage}
      </div>
      <div className="font-semibold text-lg md:text-xl mt-5 text-salte-900 dark:text-slate-200">
        {loginAndRecoveryMessage}
      </div>
      <div className="text-sm text-gray-500 dark:text-gray-400 py-2">
        {passwordManagementAndTwoFactorVerificationMessage}
      </div>
      <InfoPassword
        user={user! ?? undefined}
        password={formatPassword}
        languageToUse={languageToUse}
      />

      {shouldRenderDeviceInfo && (
        <>
          <div className="font-semibold text-lg md:text-xl mt-5 text-salte-900 dark:text-slate-200">
            {deviceCheckMessage}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400 py-2">
            {deviceManagementAndLimittationMessage}
          </div>
          <InfoDecive
            user={user! ?? undefined}
            findDevice={device}
            languageToUse={languageToUse}
          />
        </>
      )}
    </div>
  );
};

export default PasswordSecurityPage;
