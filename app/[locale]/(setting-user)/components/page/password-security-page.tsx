import prismadb from "@/lib/prismadb";
import { utcToZonedTime } from "date-fns-tz";
import { format } from "date-fns";
import viLocale from "date-fns/locale/vi";
import { getAccountByUserId } from "@/data/account";
import { currentUser } from "@/lib/auth";
import { notFound } from "next/navigation";
import InfoPassword from "../info-password";
import InfoDecive from "../info-device";
import { getTranslations } from "next-intl/server";
import { createTranslator } from "next-intl";
const vietnamTimeZone = "Asia/Ho_Chi_Minh"; // Múi giờ Việt Nam

interface PasswordSecurityProps {
  isCustomWarehouse?: boolean;
}

const PasswordSecurityPage = async ({ isCustomWarehouse }: PasswordSecurityProps) => {
  const userId = await currentUser()

  if(userId?.role === "GUEST"){
    notFound()
  }

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
      userId: userId?.id
    }
  })

  //language
  const languageToUse = user?.language || "vi";
  let messages;
  messages = (await import(`@/messages/${languageToUse}.json`)).default;
  const t = createTranslator({ locale: languageToUse, messages });

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
    : t("info.passWordChangeStatus");

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
        {t("info.passwordAndSecurity")}
      </div>
      <div className="text-sm py-2 text-gray-500 dark:text-gray-400">
        {t("info.passwordManagementAndSecuritySetting")}
      </div>
      <div className="font-semibold text-lg md:text-xl mt-5 text-salte-900 dark:text-slate-200">
        {t("info.loginAndRecovery")}
      </div>
      <div className="text-sm text-gray-500 dark:text-gray-400 py-2">
        {t("info.passwordManagementAndTwoFactorVerification")}
      </div>
      <InfoPassword
        user={user! ?? undefined}
        password={formatPassword}
        languageToUse={languageToUse}
      />

      {shouldRenderDeviceInfo && (
        <>
          <div className="font-semibold text-lg md:text-xl mt-5 text-salte-900 dark:text-slate-200">
            {t("info.deviceCheck")}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400 py-2">
            {t("info.deviceManagementAndLimittation")}
          </div>
          <InfoDecive
            user={user! ?? undefined}
            findDevice={findDevice}
          />
        </>
      )}
    </div>
  );
};

export default PasswordSecurityPage;

export async function generateMetadata() {
  const user =  await currentUser()
  const languageToUse = user?.language || "vi";
  const t = await getTranslations({languageToUse, namespace: "info"})
  return {
    title: t("passwordAndSecurity"),
  };
}