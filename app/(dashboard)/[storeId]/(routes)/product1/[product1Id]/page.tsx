import prismadb from "@/lib/prismadb";
import { ProductForm } from "./components/product-form";
import { ProductType, UserRole } from "@prisma/client";
import { currentRole } from "@/lib/auth";
import { RoleGate } from "@/components/auth/role-gate";
import FormSuccess from "@/components/form-success";

const ProductPage = async ({
  params,
}: {
  params: { storeId: string; product1Id: string };
}) => {
  const role = await currentRole();
  const isRole = role === UserRole.ADMIN || role === UserRole.STAFF;
  const showProductRole = isRole;
  const productType = ProductType.PRODUCT1;
  const product = await prismadb.product.findUnique({
    where: {
      name: params.product1Id,
      productType: productType,
    },
    include: {
      images: true,
      imagesalientfeatures: true,
    },
  });
  const productDetail = await prismadb.productDetail.findMany({
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
            productDetail={productDetail}
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
