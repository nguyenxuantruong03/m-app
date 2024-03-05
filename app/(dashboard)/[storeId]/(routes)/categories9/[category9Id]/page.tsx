import prismadb from "@/lib/prismadb";
import { CategoryForm } from "./components/category-form";
import { CategoryType, UserRole } from "@prisma/client";
import { RoleGate } from "@/components/auth/role-gate";
import FormSuccess from "@/components/form-success";
import { currentRole } from "@/lib/auth";

const CategoryPage = async ({
  params,
}: {
  params: { storeId: string; category9Id: string };
}) => {
  const role = await currentRole();
  const isRole = role === UserRole.ADMIN || role === UserRole.STAFF;
  const showCategoryRole = isRole;
  const categoryType = CategoryType.CATEGORY9;
  const categorys = await prismadb.category.findUnique({
    where: {
      id: params.category9Id,
      categoryType: categoryType,
    },
  });
  return (
    <div className="flex-col">
      <div className={`flex-1 space-y-4 p-8 pt-6 ${showCategoryRole}`}>
        {showCategoryRole && <CategoryForm initialData={categorys} />}
      </div>
      <RoleGate allowedRole={UserRole.ADMIN || UserRole.STAFF}>
        <FormSuccess message="Bạn có thể xem được nội dung này!" />
      </RoleGate>
    </div>
  );
};

export default CategoryPage;
