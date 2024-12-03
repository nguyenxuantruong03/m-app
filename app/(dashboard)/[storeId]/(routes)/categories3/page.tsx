import prismadb from "@/lib/prismadb";
import CategoriesClient from "./components/client";
import { CategoriesColumn } from "./components/columns";
import { CategoryType, UserRole } from "@prisma/client";
import { currentRole, currentUser } from "@/lib/auth";
import { RoleGate } from "@/components/auth/role-gate";

const CategoriesPage = async ({ params }: { params: { storeId: string } }) => {
  const user = await currentUser()
  const role = await currentRole();
  const isRole = role === UserRole.ADMIN || role === UserRole.STAFF;
  const showCategoryRole = isRole;
  const categoryType = CategoryType.CATEGORY3;
  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
      categoryType: categoryType,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedCategories: CategoriesColumn[] = categories.map((item) => ({
    id: item.id,
    name: item.name,
    updatedAt: item.updatedAt,
    createdAt: item.createdAt,
    language: user?.language || "vi"
  }));
  return (
    <RoleGate allowedRole={[UserRole.ADMIN, UserRole.STAFF]}>
      <div className="w-full">
        <div className={`flex-1 space-y-4 p-8 pt-6 ${showCategoryRole}`}>
          {showCategoryRole && <CategoriesClient data={formattedCategories} />}
        </div>
      </div>
    </RoleGate>
  );
};

export default CategoriesPage;
