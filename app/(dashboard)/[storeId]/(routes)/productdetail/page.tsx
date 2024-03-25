import prismadb from "@/lib/prismadb";
import ProductDetailClient from "./components/client";
import { ProductDetailColumn } from "./components/columns";
import { format } from "date-fns";
import { formatter } from "@/lib/utils";
import {  UserRole } from "@prisma/client";
import { currentRole } from "@/lib/auth";
import { RoleGate } from "@/components/auth/role-gate";
import FormSuccess from "@/components/form-success";
import { utcToZonedTime } from "date-fns-tz";
import viLocale from "date-fns/locale/vi";
const vietnamTimeZone = "Asia/Ho_Chi_Minh"; // Múi giờ Việt Nam

const ProductDetailPage = async ({ params }: { params: { storeId: string } }) => {
  const role = await currentRole();
  const isRole = role === UserRole.ADMIN || role === UserRole.STAFF;
  const showProductDetailRole = isRole;
  const productDetail = await prismadb.productDetail.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      category: true,
      size: true,
      color: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedProductDetail: ProductDetailColumn[] = productDetail.map((item) => ({
    id: item.id,
    name: item.name,
    // Khuyến mãi
    promotionheading: item.promotionheading,
    promotiondescription: item.promotiondescription,
    //Bảo hành
    guaranteeheading: formatter.format(item.guaranteeheading.toNumber()),
    guaranteedescription: formatter.format(
      item.guaranteedescription.toNumber()
    ),
    guaranteeinfomation: formatter.format(item.guaranteeinfomation.toNumber()),
    guaranteeprice: formatter.format(item.guaranteeprice.toNumber()),
    // Specification
    descriptionspecifications: item.descriptionspecifications,
    valuespecifications: item.valuespecifications,
    description2specifications: item.description2specifications,
    value2specifications: item.value2specifications,
    description3specifications: item.description3specifications,
    value3specifications: item.value3specifications,
    description4specifications: item.description4specifications,
    value4specifications: item.value4specifications,
    description5specifications: item.description5specifications,
    value5specifications: item.value5specifications,
    description6specifications: item.description6specifications,
    value6specifications: item.value6specifications,
    description7specifications: item.description7specifications,
    value7specifications: item.value7specifications,
    description8specifications: item.description8specifications,
    value8specifications: item.value8specifications,
    description9specifications: item.description9specifications,
    value9specifications: item.value9specifications,
    description10specifications: item.description10specifications,
    value10specifications: item.value10specifications,
    description11specifications: item.description11specifications,
    value11specifications: item.value11specifications,
    description12specifications: item.description12specifications,
    value12specifications: item.value12specifications,
    description13specifications: item.description13specifications,
    value13specifications: item.value13specifications,
    description14specifications: item.description14specifications,
    value14specifications: item.value14specifications,
    // salientfeatures:
    descriptionsalientfeatures: item.descriptionsalientfeatures,
    description2salientfeatures: item.description2salientfeatures,
    description3salientfeatures: item.description3salientfeatures,
    description4salientfeatures: item.description4salientfeatures,
    contentsalientfeatures: item.contentsalientfeatures,
    size: item.size.name,
    color: item.color.value,
    category: item.category.name,
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
    updatedAt: item.updatedAt
        ? format(
            utcToZonedTime(
              new Date(new Date(item.updatedAt)),
              vietnamTimeZone
            ),
            "E '-' dd/MM/yyyy '-' HH:mm:ss a",
            { locale: viLocale }
          )
        : null,
  }));
  return (
    <div className="w-full">
      <div className={`space-y-4 p-8 pt-6 ${showProductDetailRole}`}>
      {showProductDetailRole && <ProductDetailClient data={formattedProductDetail} />}
      </div>
      <RoleGate allowedRole={UserRole.ADMIN || UserRole.STAFF}>
        <FormSuccess message="Bạn có thể xem được nội dung này!" />
      </RoleGate>
    </div>
  );
};

export default ProductDetailPage;
