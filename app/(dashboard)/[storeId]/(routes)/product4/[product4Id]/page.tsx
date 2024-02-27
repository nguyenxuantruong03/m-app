import prismadb from "@/lib/prismadb";
import { ProductForm } from "./components/product-form";
import { CategoryType, ProductType, UserRole } from "@prisma/client";
import { currentRole } from "@/lib/auth";
import FormSuccess from "@/components/form-success";
import { RoleGate } from "@/components/auth/role-gate";

const ProductPage = async ({
  params,
}: {
  params: { storeId: string; product4Id: string };
}) => {
  const role = await currentRole();
  const isRole = role === UserRole.ADMIN || role === UserRole.STAFF;
  const showProductRole = isRole;
  const productType = ProductType.PRODUCT4;
  const categoryType = CategoryType.CATEGORY4;
  const product = await prismadb.product.findUnique({
    where: {
      name: params.product4Id,
      productType: productType,
    },
    include: {
      images: true,
      imagesalientfeatures: true,
    },
  });
  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
      categoryType: categoryType,
    },
  });

  const sizes = await prismadb.size.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const colors = await prismadb.color.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return (
    <div className="flex-col">
      <div className={`flex-1 space-y-4 p-8 pt-6 ${showProductRole}`}>
        {showProductRole && (
          <ProductForm
            initialData={product}
            categories={categories}
            sizes={sizes}
            colors={colors}
          />
        )}
      </div>
      <RoleGate allowedRole={UserRole.ADMIN && UserRole.STAFF}>
        <FormSuccess message="Bạn có thể xem được nội dung này!" />
      </RoleGate>
    </div>
  );
};

export default ProductPage;
