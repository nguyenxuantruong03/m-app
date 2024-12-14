import { getUserByUsername } from "@/lib/user-service";
import { currentUser } from "@/lib/auth";
import { getUserMessage } from "@/translate/translate-client";
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
      <UserItem self={self} isFollowing={isFollowing} streams={stream} />
    </>
  );
};

export default UserPage;

export async function generateMetadata({ params }: UserPageProps) {
  const self = await getUserByUsername(params.username);
  const curentUsers = await currentUser();
  const userMessage = getUserMessage(curentUsers?.language || "en");
  return {
    title: `${userMessage.user} ${self?.nameuser}`,
  };
}
