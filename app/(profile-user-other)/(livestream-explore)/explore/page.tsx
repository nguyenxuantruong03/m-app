import { currentUser } from "@/lib/auth";
import ExploreItem from "./_components/explore-item";
import { getAllreview } from "@/lib/review";
import { getAllStream } from "@/lib/stream/stream-service";
import { getExploreMessage } from "@/translate/translate-client";

const ExplorePage = async () => {
    const review = await getAllreview();
    const stream = await getAllStream();
    return ( 
        <>
            <ExploreItem streams={stream} review={review}/>
        </>
     );
}
 
export default ExplorePage;

export async function generateMetadata() {
    const user =  await currentUser()
    const exproreMessage = getExploreMessage(user?.language || "en")
    return {
      title: exproreMessage.explore,
    };
  }