import prismadb from "@/lib/prismadb";
import { ProductForm } from "./components/product-form";
import { CategoryType, ProductType, UserRole } from "@prisma/client";
import { currentRole, currentUser } from "@/lib/auth";
import { RoleGate } from "@/components/auth/role-gate";

const ProductPage = async ({
  params,
}: {
  params: { storeId: string; product7Id: string };
}) => {
  const user = await currentUser()
  const role = await currentRole();
  const isRole = role === UserRole.ADMIN || role === UserRole.STAFF;
  const showProductRole = isRole;
  const productType = ProductType.PRODUCT7;
  const categoryType = CategoryType.CATEGORY7;
  const product = await prismadb.product.findUnique({
    where: {
      id: params.product7Id,
      productType: productType,
    },
    include: {
      images: true,
      imagesalientfeatures: true,
    },
  });
  const productDetails = await prismadb.productDetail.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
      categoryType: categoryType,
    },
  });

  // Lấy danh sách categoryId từ categories
  const categoryIds = categories.map((category) => category.id);

  // Lọc productDetails dựa trên categoryIds
  const filteredProductDetails = productDetails.filter((productDetail) =>
    categoryIds.includes(productDetail.categoryId)
  );

  return (
    <RoleGate allowedRole={[UserRole.ADMIN, UserRole.STAFF]}>
      <div className="flex-col">
        <div className={`flex-1 space-y-4 p-8 pt-6 ${showProductRole}`}>
          {showProductRole && (
            <ProductForm
              initialData={product}
              productDetail={filteredProductDetails}
              language={user?.language || "vi"}
            />
          )}
        </div>
      </div>
    </RoleGate>
  );
};

export default ProductPage;
