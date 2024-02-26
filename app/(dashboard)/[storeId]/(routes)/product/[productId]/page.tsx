import prismadb from "@/lib/prismadb";
import { ProductForm } from "./components/product-form";
import { CategoryType, ProductType, UserRole } from "@prisma/client";
import { currentRole } from "@/lib/auth";
import { RoleGate } from "@/components/auth/role-gate";
import FormSuccess from "@/components/form-success";

const ProductPage = async ({
  params,
}: {
  params: { storeId: string; productId: string };
}) => {
  const role = await currentRole();
  const isRole = role === UserRole.ADMIN || role === UserRole.STAFF;
  const showProductRole = isRole;
  const categoryType = CategoryType.CATEGORY;
  const productType = ProductType.PRODUCT;
  const product = await prismadb.product.findUnique({
    where: {
      name: params.productId,
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
      <RoleGate allowedRole={UserRole.ADMIN || UserRole.STAFF}>
        <FormSuccess message="Bạn có thể xem được nội dung này!" />
      </RoleGate>
    </div>
  );
};

export default ProductPage;
