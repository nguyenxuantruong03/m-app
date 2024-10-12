import ExploreItem from "@/app/(profile-user-other)/(livestream-explore)/explore/_components/explore-item";
import { getAllreview } from "@/lib/review";
import { getAllStream } from "@/lib/stream/stream-service";

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