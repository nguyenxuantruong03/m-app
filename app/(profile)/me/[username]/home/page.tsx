import ExploreItem from "@/app/(profile-user-other)/(livestream-explore)/explore/_components/explore-item";
import { currentUser } from "@/lib/auth";
import { getAllreview } from "@/lib/review";
import { getAllStream } from "@/lib/stream/stream-service";
import { translateExplore } from "@/translate/translate-client";

const ExplorePage = async () => {
    const review = await getAllreview();
    const stream = await getAllStream();
    return ( 
        <div className="px-2">
            <ExploreItem streams={stream} review={review}/>
        </div>
     );
}
 
export default ExplorePage;

export async function generateMetadata() {
    const curentUsers = await currentUser()
    const exploreMessage = translateExplore(curentUsers?.language || "en")
    return {
      title: exploreMessage
    };
  }