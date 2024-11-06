import prismadb from "@/lib/prismadb";
import { SentEmailUserForm } from "./components/sentmailuser-form";
import { UserRole } from "@prisma/client";
import { currentRole } from "@/lib/auth";
import { RoleGate } from "@/components/auth/role-gate";

const SentmailUserPage = async ({
  params,
}: {
  params: { storeId: string; sentmailuserId: string };
}) => {
  const role = await currentRole();
  const isRole = role === UserRole.ADMIN || role === UserRole.STAFF;
  const showSentmailUserRole = isRole;
  const users = await prismadb.user.findMany();
  const favorites = await prismadb.favorite.findMany();

  const sentmailuser = await prismadb.sentEmailUser.findUnique({
    where: {
      id: params.sentmailuserId,
    },
  });

  // Bỏ qua "phobien" và "all" từ sentemailuser
  const filteredSentEmailUser = sentmailuser?.sentemailuser.filter(
    (id) => id !== "phobien" && id !== "all"
  );

  // Lấy danh sách các users và favorites không bao gồm "phobien" và "all"
  const associatedUsers = users.filter((user) =>
    filteredSentEmailUser?.includes(user.id)
  );

  const associatedFavorites = favorites.filter((favorite) =>
    filteredSentEmailUser?.includes(favorite.id)
  );

  // Chuyển đổi thành định dạng cần thiết
  const MappedUsers = associatedUsers.map((item) => item.email);
  const MappedFavorites = associatedFavorites.map((item) => item.value);

  return (
    <RoleGate allowedRole={[UserRole.ADMIN, UserRole.STAFF]}>
      <div className="flex-col">
        <div className={`flex-1 space-y-4 p-8 pt-6 ${showSentmailUserRole}`}>
          {showSentmailUserRole && (
            <SentEmailUserForm
              initialData={sentmailuser}
              associatedUser={MappedUsers}
              associatedFavorite={MappedFavorites}
            />
          )}
        </div>
      </div>
    </RoleGate>
  );
};

export default SentmailUserPage;
