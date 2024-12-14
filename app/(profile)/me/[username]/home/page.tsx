import { currentUser } from "@/lib/auth";
import { translateExplore } from "@/translate/translate-client";
import ExploreItem from "@/app/(profile-user-other)/(livestream-explore)/explore/_components/explore-item";
import { getAllreview } from "@/lib/review";
import { getAllStream } from "@/lib/stream/stream-service";

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
  const exploreMessage = translateExplore(curentUsers?.language || "en");
  return {
    title: exploreMessage,
  };
}
