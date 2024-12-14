import { currentUser } from "@/lib/auth";
import { getUserByUsername } from "@/lib/user-service";
import { getUserMessage } from "@/translate/translate-client";
import UserItem from "@/app/(profile)/me/[username]/_components/user-item";
import {
  isBlockedbyUsesr,
  isExistingBlockedbyUsesr,
} from "@/lib/stream/block-service";
import { isFollowingUser } from "@/lib/stream/follow-service";
import { notFound } from "next/navigation";

interface UserPageProps {
  params: {
    username: string;
  };
}

const UserPage = async ({ params }: UserPageProps) => {
  const self = await getUserByUsername(params.username);
  const user = await currentUser();
  if (!self) {
    notFound();
  }

  if (!user) {
    notFound();
  }

  //Còn logic này là người bị chặn
  const isBlocked = await isBlockedbyUsesr(self.id);
  //Cái này người chặn
  const isExitingBlocked = await isExistingBlockedbyUsesr(self.id);

  if (isExitingBlocked === user.id) {
    notFound();
  }
  if (isBlocked) {
    notFound();
  }

  const isFollowing = await isFollowingUser(self.id);

  return (
    <div className="max-w-7xl mx-auto py-5 px-2">
      <UserItem self={self} showFunction={false} isFollowing={isFollowing}/>
    </div>
  );
};

export default UserPage;

export async function generateMetadata({ params }: UserPageProps) {
  const self = await getUserByUsername(params.username);
  const curentUsers = await currentUser()
  const userMessage = getUserMessage(curentUsers?.language || "en")
  return {
    title: `${userMessage.user} ${self?.nameuser}`,
  };
}