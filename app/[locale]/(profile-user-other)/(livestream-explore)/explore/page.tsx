import { currentUser } from "@/lib/auth";
import ExploreItem from "./_components/explore-item";
import { getAllreview } from "@/lib/review";
import { getAllStream } from "@/lib/stream/stream-service";
import { getTranslations } from "next-intl/server";

const Explore = async () => {
  const review = await getAllreview();
  const stream = await getAllStream();
  return <ExploreItem streams={stream} review={review} />;
};

export default Explore;

export async function generateMetadata() {
  const user = await currentUser();
  const languageToUse = user?.language || "vi";
  const t = await getTranslations({languageToUse, namespace: "profile"})
  return {
    title: t("explore"),
  };
}
