import { Results } from "./_components/results";
import { currentUser } from "@/lib/auth";
import { getTranslations } from "next-intl/server";

export default function Page() {
  return (
    <div className="h-full p-8 max-w-screen-2xl mx-auto px-2">
        <Results />
    </div>
  );
}

export async function generateMetadata() {
  const user =  await currentUser()
  const languageToUse = user?.language || "vi";
  const t = await getTranslations({languageToUse, namespace: "profile"})
  return {
    title: t("listLive"),
  };
}