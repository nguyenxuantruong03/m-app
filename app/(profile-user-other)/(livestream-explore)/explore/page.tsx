import ExploreItem from "./_components/explore-item";
import { getAllreview } from "@/lib/review";
import { getAllStream } from "@/lib/stream/stream-service";

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