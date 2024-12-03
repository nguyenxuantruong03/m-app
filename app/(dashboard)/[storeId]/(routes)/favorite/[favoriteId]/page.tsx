import prismadb from "@/lib/prismadb";
import { FavoriteForm } from "./components/favorite-form";
import { UserRole } from "@prisma/client";
import { RoleGate } from "@/components/auth/role-gate";
import { currentRole, currentUser } from "@/lib/auth";

const FavoritePage = async ({
  params,
}: {
  params: { storeId: string; favoriteId: string };
}) => {
  const user = await currentUser()
  const role = await currentRole();
  const isRole = role === UserRole.ADMIN || role === UserRole.STAFF;
  const showFavoriteRole = isRole;
  const favorite = await prismadb.favorite.findUnique({
    where: {
      id: params.favoriteId,
    },
  });
  return (
    <RoleGate allowedRole={[UserRole.ADMIN, UserRole.STAFF]}>
      <div className="flex-col">
        <div className={`flex-1 space-y-4 p-8 pt-6 ${showFavoriteRole}`}>
          {showFavoriteRole && <FavoriteForm initialData={favorite} language={user?.language || "vi"}/>}
        </div>
      </div>
    </RoleGate>
  );
};

export default FavoritePage;
