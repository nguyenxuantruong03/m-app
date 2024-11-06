import prismadb from "@/lib/prismadb";
import { ProductForm } from "./components/product-form";
import { CategoryType, ProductType, UserRole } from "@prisma/client";
import { currentRole } from "@/lib/auth";
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
      id: params.product4Id,
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
            />
          )}
        </div>
      </div>
    </RoleGate>
  );
};

export default ProductPage;
