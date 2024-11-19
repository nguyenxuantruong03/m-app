"use client";
import { useCurrentUser } from "@/hooks/use-current-user";
import { AboutUser } from "./about-user";
import ArticleUser from "./article-user";
import IntroductionUser from "./introduction-user";
import { Follow, User as UserData, Review } from "@prisma/client";
import { useCreatorSidebar } from "@/hooks/stream/use-creator-sidebar";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface UserItemProps {
  self: any;
  showFunction?: boolean;
  isFollowing: boolean;
  streams?: any;
}

const UserItem = ({
  self,
  showFunction,
  isFollowing,
  streams,
}: UserItemProps) => {
  const user = useCurrentUser();
  const { hideAll } = useCreatorSidebar((state) => state);
  const [isMounted, setIsMounted] = useState(false);

  if (!user) {
    throw new Error("User is not found");
  }

  // If imageCredentials is an array, take the first image's url
  const imageCredentials = Array.isArray(self?.imageCredential)
    ? self.imageCredential[0]?.url
    : self?.imageCredential || undefined;

  // Use the first image from imageCredential, fallback to self?.image, or use null as a last option
  const avatarImage = imageCredentials || self?.image || null;

  //1.Logic follow hiện tại nếu như người dùng follow mình thì không thể xem được bài viết người theo dõi.
  // Phải đảm bảo rành mình phải theo dõi người đó lun thì mới thấy được
  //2.Giúp tránh người đó theo dõi xem ảnh xong rồi hủy. Dấu && là để đảm bao cả 2 phải theo dõi nhau

  // Lọc các bài viết theo điều kiện
  const filteredReviews = self.review.filter(
    (
      item: Review & {
        user: UserData & { following: Follow[]; followedBy: Follow[] };
      }
    ) =>
      item.isPublic === "public" ||
      (item.isPublic === "individual" && self.id === user.id) ||
      (item.isPublic === "follow" &&
        ((item.user.following.some(
          (follow) => follow.followerId === item.userId
        ) &&
          item.user.followedBy.some(
            (follow) => follow.followerId === user.id
          )) ||
          self.id === user.id))
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div
      className={cn(
        "md:max-w-7xl mx-auto py-5 px-2",
        hideAll ? "max-w-sm" : "max-w-[19rem]"
      )}
    >
      <AboutUser
        self={self}
        isFollowing={isFollowing}
        user={user}
        avatarImage={avatarImage}
      />
      <div className="flex flex-col lg:flex-row lg:mt-5 lg:space-x-2">
        <div className="w-full xl:w-[490px] lg:max-w-sm xl:max-w-xl my-3 lg:my-0">
          <IntroductionUser
            self={self}
            showFunction={showFunction}
            user={user}
          />
        </div>
        <div className="lg:flex-1 w-full">
          <ArticleUser
            streams={streams}
            self={self}
            showFunction={showFunction}
            user={user}
            avatarImage={avatarImage}
          />
          {filteredReviews.length === 0 && (
            <p className="text-center text-gray-400 font-semibold text-xl">
              Không có bài viết
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserItem;
