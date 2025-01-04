import { getUserByUsername } from "@/lib/user-service";
import { currentUser } from "@/lib/auth";
import UserItem from "./_components/user-item";
import { isFollowingUser } from "@/lib/stream/follow-service";
import { notFound } from "next/navigation";
import { getAllStream } from "@/lib/stream/stream-service";
import { getTranslations } from "next-intl/server";
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
  const languageToUse = curentUsers?.language || "vi";
  const t = await getTranslations({languageToUse, namespace: "profile"})

  return {
    title: `${t("user")} ${self?.nameuser}`,
  };
}
