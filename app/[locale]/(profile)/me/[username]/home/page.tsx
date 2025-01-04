import { currentUser } from "@/lib/auth";
import ExploreItem from "@/app/[locale]/(profile-user-other)/(livestream-explore)/explore/_components/explore-item";
import { getAllreview } from "@/lib/review";
import { getAllStream } from "@/lib/stream/stream-service";
import { getTranslations } from "next-intl/server";

const Home = async () => {
  const review = await getAllreview();
  const stream = await getAllStream();
  return (
    <div className="px-2">
      <ExploreItem streams={stream} review={review} />
    </div>
  );
};

export default Home;

export async function generateMetadata() {
  const curentUsers = await currentUser();
  const languageToUse = curentUsers?.language || "vi";
  const t = await getTranslations({languageToUse, namespace: "home"})
  return {
    title: t("explore"),
  };
}
