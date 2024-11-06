import prismadb from "@/lib/prismadb";
import SentEmailUserClient from "./components/client";
import { UserRole } from "@prisma/client";
import { currentRole } from "@/lib/auth";
import { RoleGate } from "@/components/auth/role-gate";

const SentEmailUserPage = async ({
  params,
}: {
  params: { storeId: string };
}) => {
  const role = await currentRole();
  const isRole = role === UserRole.ADMIN || role === UserRole.STAFF;
  const showSentEmailUserRole = isRole;
  const sentEmailUser = await prismadb.sentEmailUser.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedSentEmailUser = await Promise.all(
    sentEmailUser.map(async (item) => {
      const sentEmailUsers = await Promise.all(
        item.sentemailuser.map(async (sentUser) => {
          const userFavorite = await prismadb.favorite.findUnique({
            where: {
              id: sentUser,
            },
          });
          const user = await prismadb.user.findUnique({
            where: {
              id: sentUser,
            },
          });
          const email = user ? user.email : null;
          const name = userFavorite ? userFavorite.name : null;
          return email || name || sentUser; // Ưu tiên email, sau đó là name, nếu không có thì trả về sentUser
        })
      );

      return {
        id: item.id,
        subject: item.subject,
        description: item.description,
        sentemailuser: sentEmailUsers,
        user: item.user.email,
        isSent: item.isSent,
        createdAt: item.createdAt,
      };
    })
  );

  return (
    <RoleGate allowedRole={[UserRole.ADMIN, UserRole.STAFF]}>
      <div className="w-full">
        <div className={`space-y-4 p-8 pt-6 ${showSentEmailUserRole}`}>
          {showSentEmailUserRole && (
            <SentEmailUserClient data={formattedSentEmailUser} />
          )}
        </div>
      </div>
    </RoleGate>
  );
};

export default SentEmailUserPage;
