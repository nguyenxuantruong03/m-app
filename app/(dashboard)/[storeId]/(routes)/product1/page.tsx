import prismadb from "@/lib/prismadb";
import ProductClient from "./components/client";
import { ProductColumn } from "./components/columns";
import { ProductType, UserRole } from "@prisma/client";
import { currentRole } from "@/lib/auth";
import { RoleGate } from "@/components/auth/role-gate";
import FormSuccess from "@/components/form-success";

const ProductPage = async ({ params }: { params: { storeId: string } }) => {
  const role = await currentRole();
  const isRole = role === UserRole.ADMIN || role === UserRole.STAFF;
  const showProductRole = isRole;
  const productType = ProductType.PRODUCT1;
  const product = await prismadb.product.findMany({
    where: {
      storeId: params.storeId,
      productType: productType,
    },
    include: {
    productdetail: true,
    imagesalientfeatures: true,
      images: true
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
    imagesalientfeatures: item.imagesalientfeatures.map((item)=> item.url),
    imagesalientfeaturesUrl: item.imagesalientfeatures,
    images: item.images.map((item)=> item.url),
    imagesUrl: item.images,
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    productdetail: item.productdetail.title,
    productdetailId: item.productdetail.id,
    createdAt: item.createdAt,
  }));
  return (
    <div className="w-full">
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
