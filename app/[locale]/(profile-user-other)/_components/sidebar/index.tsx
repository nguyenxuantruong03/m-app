import { getRecommended } from "@/lib/stream/recommended-service";
import { Recommended, RecommendedSkeleton } from "./recommended";
import { Toggle, ToggleSkeleton } from "./toggle";
import Wrapper from "./wrapper";
import { getFollowedUsers } from "@/lib/stream/follow-service";
import { Following, FollowingSkeleton } from "./following";
import ShowSideBar from "./showSidebar";

export const Sidebar = async () => {
  const recommended = await getRecommended();
  const following = await getFollowedUsers();

  return (
    <>
      <ShowSideBar />
      <Wrapper>
        <Toggle />
        <div className="space-y-4 pt-4 lg:py-0">
          <Following data={following} />
          <Recommended data={recommended} />
        </div>
      </Wrapper>
    </>
  );
};

export const SidebarSkeleton = () => {
  return (
    <aside className="fixed left-0 flex flex-col w-[80px] lg:w-60 h-full bg-background border-r border-[#2D2E35] z-50">
      <ToggleSkeleton />
      <FollowingSkeleton />
      <RecommendedSkeleton />
    </aside>
  );
};
