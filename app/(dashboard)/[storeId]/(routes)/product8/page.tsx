import prismadb from "@/lib/prismadb";
import ProductClient from "./components/client";
import { ProductColumn } from "./components/columns";
import { format } from "date-fns";
import { formatter } from "@/lib/utils";
import { ProductType, UserRole } from "@prisma/client";
import { currentRole } from "@/lib/auth";
import { RoleGate } from "@/components/auth/role-gate";
import FormSuccess from "@/components/form-success";

const ProductPage = async ({ params }: { params: { storeId: string } }) => {
  const role = await currentRole();
  const isRole = role === UserRole.ADMIN || role === UserRole.STAFF;
  const showProductRole = isRole;
  const productType = ProductType.PRODUCT8;
  const product = await prismadb.product.findMany({
    where: {
      storeId: params.storeId,
      productType: productType,
    },
    include: {
    productdetail: true
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedProduct: ProductColumn[] = product.map((item) => ({
    id: item.id,
    name: item.name,
    heading: item.heading,
    description: item.description,
    price: formatter.format(item.price.toNumber()),
    percentpromotion: formatter.format(item.percentpromotion.toNumber()),
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    productdetail: item.productdetail.name,
    createdAt: format(item.createdAt, "dd/MM/yyyy"),
  }));
  return (
    <div className=" max-w-[1617px] ">
      <div className={`space-y-4 p-8 pt-6 ${showProductRole}`}>
        {showProductRole && <ProductClient data={formattedProduct} />}
      </div>
      <RoleGate allowedRole={UserRole.ADMIN || UserRole.STAFF}>
        <FormSuccess message="Bạn có thể xem được nội dung này!" />
      </RoleGate>
    </div>
  );
};

export default ProductPage;
