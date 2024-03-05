import prismadb from "@/lib/prismadb";
import { UserRole } from "@prisma/client";
import { currentRole } from "@/lib/auth";
import FormSuccess from "@/components/form-success";
import { RoleGate } from "@/components/auth/role-gate";
import { ProductDetailForm } from "./components/productdetailform";

const ProductDetailPage = async ({
  params,
}: {
  params: { storeId: string; productdetailId: string };
}) => {
  const role = await currentRole();
  const isRole = role === UserRole.ADMIN || role === UserRole.STAFF;
  const showProductDetailRole = isRole;
  const productDetail = await prismadb.productDetail.findUnique({
    where: {
        id: params.productdetailId,
    }
  });
  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
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
      <div className={`flex-1 space-y-4 p-8 pt-6 ${showProductDetailRole}`}>
      {showProductDetailRole && (
          <ProductDetailForm
            initialData={productDetail}
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

export default ProductDetailPage;
