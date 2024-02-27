import prismadb from "@/lib/prismadb";
import CategoriesClient from "./components/client";
import { CategoriesColumn } from "./components/columns";
import { format } from "date-fns";
import { CategoryType, UserRole } from "@prisma/client";
import { currentRole } from "@/lib/auth";
import { RoleGate } from "@/components/auth/role-gate";
import FormSuccess from "@/components/form-success";

const CategoriesPage = async ({ params }: { params: { storeId: string } }) => {
  const role = await currentRole();
  const isRole = role === UserRole.ADMIN || role === UserRole.STAFF;
  const showCategoryRole = isRole;
  const categoryType = CategoryType.CATEGORY9;
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
    createdAt: format(item.createdAt, "MM/dd/yyyy"),
  }));
  return (
    <div className="w-full">
      <div className={`flex-1 space-y-4 p-8 pt-6 ${showCategoryRole}`}>
        {showCategoryRole && <CategoriesClient data={formattedCategories} />}
      </div>
      <RoleGate allowedRole={UserRole.ADMIN && UserRole.STAFF}>
        <FormSuccess message="Bạn có thể xem được nội dung này!" />
      </RoleGate>
    </div>
  );
};

export default CategoriesPage;
