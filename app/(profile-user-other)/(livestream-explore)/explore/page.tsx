import { currentUser } from "@/lib/auth";
import { getExploreMessage } from "@/translate/translate-client";
import ExploreItem from "./_components/explore-item";
import { getAllreview } from "@/lib/review";
import { getAllStream } from "@/lib/stream/stream-service";

const Explore = async () => {
  const review = await getAllreview();
  const stream = await getAllStream();
  return <ExploreItem streams={stream} review={review} />;
};

export default Explore;

export async function generateMetadata() {
  const user = await currentUser();
  const exproreMessage = getExploreMessage(user?.language || "en");
  return {
    title: exproreMessage.explore,
  };
}
