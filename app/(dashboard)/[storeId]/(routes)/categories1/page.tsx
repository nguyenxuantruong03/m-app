import prismadb from "@/lib/prismadb";
import CategoriesClient from "./components/client";
import { CategoriesColumn } from "./components/columns";
import { format } from "date-fns";
import { CategoryType, UserRole } from "@prisma/client";
import { currentRole } from "@/lib/auth";
import { RoleGate } from "@/components/auth/role-gate";
import FormSuccess from "@/components/form-success";
import { utcToZonedTime } from "date-fns-tz";
import viLocale from "date-fns/locale/vi";
const vietnamTimeZone = "Asia/Ho_Chi_Minh"; // Múi giờ Việt Nam

const CategoriesPage = async ({ params }: { params: { storeId: string } }) => {
  const role = await currentRole();
  const isRole = role === UserRole.ADMIN || role === UserRole.STAFF;
  const showCategoryRole = isRole;
  const categoryType = CategoryType.CATEGORY1;
  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
      categoryType: categoryType,
    },
    include: {},
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedCategories: CategoriesColumn[] = categories.map((item) => ({
    id: item.id,
    name: item.name,
    createdAt: item.createdAt
        ? format(
            utcToZonedTime(
              new Date(new Date(item.createdAt)),
              vietnamTimeZone
            ),
            "E '-' dd/MM/yyyy '-' HH:mm:ss a",
            { locale: viLocale }
          )
        : null,
  }));
  return (
    <div className="w-full">
      <div className={`flex-1 space-y-4 p-8 pt-6 ${showCategoryRole}`}>
        <CategoriesClient data={formattedCategories} />
        {showCategoryRole && <CategoriesClient data={formattedCategories} />}
      </div>
      <RoleGate allowedRole={UserRole.ADMIN || UserRole.STAFF}>
        <FormSuccess message="Bạn có thể xem được nội dung này!" />
      </RoleGate>
    </div>
  );
};

export default CategoriesPage;
