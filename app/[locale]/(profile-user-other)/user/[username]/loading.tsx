import UserProfileSkeleton from "@/components/(client)/skeleton/user-profile-skeleton";

const UserLoading = () => {
  return (
    <>
    <UserProfileSkeleton userSkeleton={true}/>
    </>
  );
};

export default UserLoading;
