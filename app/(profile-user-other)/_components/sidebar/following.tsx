"use client";

import { useSidebar } from "@/hooks/stream/use-sidebar";
import { Follow, ImageCredential, User } from "@prisma/client";
import UserItem, { UserItemSkeleton } from "./user-item";

interface FollowingProps {
  data: (Follow & {
    following: User & {
      stream: { isLive: boolean } | null;
      imageCredential?: ImageCredential[];
    };
  })[];
}

export const Following = ({ data }: FollowingProps) => {
  const { collapsed } = useSidebar();

  if (!data.length) {
    return null;
  }
  return (
    <div>
      {!collapsed && (
        <div className="pl-6 mb-4">
          <p className="text-sm text-gray-300">Following</p>
        </div>
      )}
      <ul className="space-y-2 px-2">
        {data.map((follow) => (
          <UserItem
            key={follow.following.id}
            nameuser={follow.following.nameuser || ""}
            imageUrl={
              (follow.following.imageCredential &&
              follow.following.imageCredential.length > 0
                ? follow.following.imageCredential[0].url
                : "") ||
              follow.following.image ||
              "" // Check if imageCredential is defined and has items
            }
            isLive={follow.following.stream?.isLive}
            frameAvatar={follow.following?.frameAvatar}
            isCitizen={follow.following?.isCitizen}
            role={follow.following?.role}
          />
        ))}
      </ul>
    </div>
  );
};

export const FollowingSkeleton = () => {
  return (
    <ul className="px-2 pt-2 lg:pt-0">
      {[...Array(3)].map((_, i) => (
        <UserItemSkeleton key={i} />
      ))}
    </ul>
  );
};
