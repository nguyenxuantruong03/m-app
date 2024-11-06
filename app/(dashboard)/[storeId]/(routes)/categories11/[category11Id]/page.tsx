import prismadb from "@/lib/prismadb";
import { CategoryForm } from "./components/category-form";
import { CategoryType, UserRole } from "@prisma/client";
import { currentRole } from "@/lib/auth";
import { RoleGate } from "@/components/auth/role-gate";

const CategoryPage = async ({
  params,
}: {
  params: { storeId: string; category11Id: string };
}) => {
  const role = await currentRole();
  const isRole = role === UserRole.ADMIN || role === UserRole.STAFF;
  const showCategoryRole = isRole;
  const categoryType = CategoryType.CATEGORY11;
  const categorys = await prismadb.category.findUnique({
    where: {
      id: params.category11Id,
      categoryType: categoryType,
    },
  });
  return (
    <RoleGate allowedRole={[UserRole.ADMIN, UserRole.STAFF]}>
      <div className="flex-col">
        <div className={`flex-1 space-y-4 p-8 pt-6 ${showCategoryRole}`}>
          {showCategoryRole && <CategoryForm initialData={categorys} />}
        </div>
      </div>
    </RoleGate>
  );
};

export default CategoryPage;
