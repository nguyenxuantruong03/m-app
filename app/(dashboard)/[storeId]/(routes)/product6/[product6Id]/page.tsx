import prismadb from "@/lib/prismadb";
import { ProductForm } from "./components/product-form";
import { CategoryType, ProductType, UserRole } from "@prisma/client";
import { currentRole } from "@/lib/auth";
import { RoleGate } from "@/components/auth/role-gate";
import FormSuccess from "@/components/form-success";

const ProductPage = async ({
  params,
}: {
  params: { storeId: string; product6Id: string };
}) => {
  const role = await currentRole();
  const isRole = role === UserRole.ADMIN || role === UserRole.STAFF;
  const showProductRole = isRole;
  const productType = ProductType.PRODUCT6;
  const categoryType = CategoryType.CATEGORY6;
  const product = await prismadb.product.findUnique({
    where: {
      id: params.product6Id,
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
  const categoryIds = categories.map(category => category.id);

  // Lọc productDetails dựa trên categoryIds
  const filteredProductDetails = productDetails.filter(productDetail => 
    categoryIds.includes(productDetail.categoryId)
  );
  
  return (
    <div className="flex-col">
      <div className={`flex-1 space-y-4 p-8 pt-6 ${showProductRole}`}>
        {showProductRole && (
          <ProductForm
            initialData={product}
            productDetail={filteredProductDetails}
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
