"use client";
import { useSidebar } from "@/hooks/stream/use-sidebar";
import { ImageCredential, User } from "@prisma/client";
import UserItem, { UserItemSkeleton } from "./user-item";

interface RecommendedProps {
  data: (User & {
    stream: { isLive: boolean } | null;
    imageCredential: ImageCredential[];
  })[];
}

export const Recommended: React.FC<RecommendedProps> = ({ data }) => {
  const { collapsed } = useSidebar((state) => state);
  const showLabel = !collapsed && data.length > 0;
  return (
    <div>
      {showLabel && (
        <div className="pl-6 mb-4">
          <p className="text-sm text-gray-300">Recommended</p>
        </div>
      )}
      <ul className="space-y-2 px-2">
        {data.map((user) => (
          <UserItem
            key={user.id}
            nameuser={user.nameuser || ""}
            imageUrl={user?.imageCredential[0]?.url || user.image || ""}
            isLive={user?.stream?.isLive}
            frameAvatar={user?.frameAvatar}
            isCitizen={user?.isCitizen}
            role={user?.role}
          />
        ))}
      </ul>
    </div>
  );
};

export const RecommendedSkeleton = () => {
  return (
    <ul className="px-2">
      {[...Array(3)].map((_, i) => (
        <UserItemSkeleton key={i} />
      ))}
    </ul>
  );
};
