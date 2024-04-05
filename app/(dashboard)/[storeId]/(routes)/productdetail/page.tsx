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
        color1: true,
        size1: true,
        color2: true,
        size2: true,
        color3: true,
        size3: true,
        color4: true,
        size4: true,
        color5: true,
        size5: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedProductDetail: ProductDetailColumn[] = productDetail.map((item) => ({
    id: item.id,
    title: item.title,
    name1: item.name1,
    name2: item.name2,
    name3: item.name3,
    name4: item.name4,
    name5: item.name5,
    price1: formatter.format(item.price1.toNumber()),
    price2: item.price2 ? formatter.format(item.price2.toNumber()) : '',
    price3: item.price3 ? formatter.format(item.price3.toNumber()) : '',
    price4: item.price4 ? formatter.format(item.price4.toNumber()) : '',
    price5: item.price5 ? formatter.format(item.price5.toNumber()) : '',
    percentpromotion1:  `${item.percentpromotion1}%`,
    percentpromotion2:  `${item.percentpromotion2}%`,
    percentpromotion3:  `${item.percentpromotion3}%`,
    percentpromotion4:  `${item.percentpromotion4}%`,
    percentpromotion5:  `${item.percentpromotion5}%`,
    quantity1: item.quantity1,
    quantity2: item.quantity2,
    quantity3: item.quantity3,
    quantity4: item.quantity4,
    quantity5: item.quantity5,
    // Khuyến mãi
    promotionheading: item.promotionheading,
    promotiondescription: item.promotiondescription,
    //Bảo hành
    warranty1: item.warranty1 ? formatter.format(item.warranty1.toNumber()) : '',
    warranty2: item.warranty2 ? formatter.format(item.warranty2.toNumber()) : '',
    warranty3: item.warranty3 ? formatter.format(item.warranty3.toNumber()) : '',
    warranty4: item.warranty4 ? formatter.format(item.warranty4.toNumber()) : '',
    size1: item.size1.name,
    color1: item.color1.value,
    size2: item && item.size2 ? item.size2.name : null,
    color2: item && item.color2 ? item.color2.value : null,
    size3: item && item.size3 ? item.size3.name : null,
    color3: item && item.color3 ? item.color3.value : null,
    size4: item && item.size4 ? item.size4.name : null,
    color4: item && item.color4 ? item.color4.value : null,
    size5: item && item.size5 ? item.size5.name : null,
    color5: item && item.color5 ? item.color5.value : null,
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
