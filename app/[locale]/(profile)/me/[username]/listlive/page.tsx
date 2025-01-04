import { Results } from "@/app/[locale]/(profile-user-other)/(livestream-explore)/listlive/_components/results";
import { currentUser } from "@/lib/auth";
import { getTranslations } from "next-intl/server";

export default function Page() {
  return (
    <div className="h-full p-8 max-w-screen-2xl mx-auto">
        <Results />
    </div>
  );
}

export async function generateMetadata() {
  const curentUsers = await currentUser()
  const languageToUse = curentUsers?.language || "vi";
  const t = await getTranslations({languageToUse, namespace: "profile"})
  return {
    title: t("listLive")
  };
}