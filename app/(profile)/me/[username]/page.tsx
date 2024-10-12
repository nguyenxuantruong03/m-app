import { getUserByUsername } from "@/lib/user-service";
import UserItem from "./_components/user-item";
import { isFollowingUser } from "@/lib/stream/follow-service";
import { notFound } from "next/navigation";
import { getAllStream } from "@/lib/stream/stream-service";

interface UserPageProps {
  params: {
    username: string;
  };
}

const UserPage = async ({ params }: UserPageProps) => {
  const self = await getUserByUsername(params.username);
  const stream = await getAllStream();

  if (!self) {
    notFound();
  }
  const isFollowing = await isFollowingUser(self.id);

  return (
    <>
      <UserItem self={self} isFollowing={isFollowing} streams={stream}/>
    </>
  );
};

export default UserPage;
