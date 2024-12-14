import UserProfileSkeleton from "@/components/(client)/skeleton/user-profile-skeleton";

const Loading = () => {
  return (
    <>
      <UserProfileSkeleton userSkeleton={false} />
    </>
  );
};

export default Loading;
