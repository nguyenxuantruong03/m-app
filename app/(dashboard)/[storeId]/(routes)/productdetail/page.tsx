import prismadb from "@/lib/prismadb";
import ProductDetailClient from "./components/client";
import { ProductDetailColumn } from "./components/columns";
import { formatter } from "@/lib/utils";
import { UserRole } from "@prisma/client";
import { currentRole, currentUser } from "@/lib/auth";
import { RoleGate } from "@/components/auth/role-gate";

const ProductDetailPage = async ({
  params,
}: {
  params: { storeId: string };
}) => {
  const user = await currentUser()
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

  const formattedProductDetail: ProductDetailColumn[] = productDetail.map(
    (item) => ({
      id: item.id,
      title: item.title,
      name1: item.name1,
      name2: item.name2,
      name3: item.name3,
      name4: item.name4,
      name5: item.name5,
      price1: formatter.format(item.price1.toNumber()),
      price2: item.price2 ? formatter.format(item.price2.toNumber()) : "",
      price3: item.price3 ? formatter.format(item.price3.toNumber()) : "",
      price4: item.price4 ? formatter.format(item.price4.toNumber()) : "",
      price5: item.price5 ? formatter.format(item.price5.toNumber()) : "",
      pricenotformat1: item.price1,
      pricenotformat2: item.price2,
      pricenotformat3: item.price2,
      pricenotformat4: item.price2,
      pricenotformat5: item.price2,
      percentpromotion1: `${item.percentpromotion1}%`,
      percentpromotion2: `${item.percentpromotion2}%`,
      percentpromotion3: `${item.percentpromotion3}%`,
      percentpromotion4: `${item.percentpromotion4}%`,
      percentpromotion5: `${item.percentpromotion5}%`,
      percentpromotionnotformat1: item.percentpromotion1,
      percentpromotionnotformat2: item.percentpromotion2,
      percentpromotionnotformat3: item.percentpromotion3,
      percentpromotionnotformat4: item.percentpromotion4,
      percentpromotionnotformat5: item.percentpromotion5,
      quantity1: item.quantity1,
      quantity2: item.quantity2,
      quantity3: item.quantity3,
      quantity4: item.quantity4,
      quantity5: item.quantity5,
      // Khuyến mãi
      promotionheading: item.promotionheading,
      promotiondescription: item.promotiondescription,
      //Bảo hành
      warranty1: item.warranty1
        ? formatter.format(item.warranty1.toNumber())
        : "",
      warranty2: item.warranty2
        ? formatter.format(item.warranty2.toNumber())
        : "",
      warranty3: item.warranty3
        ? formatter.format(item.warranty3.toNumber())
        : "",
      warranty4: item.warranty4
        ? formatter.format(item.warranty4.toNumber())
        : "",
      warrantynotformat1: item.warranty1,
      warrantynotformat2: item.warranty2,
      warrantynotformat3: item.warranty3,
      warrantynotformat4: item.warranty4,
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
      size1Id: item.size1Id,
      color1Id: item.color1Id,
      size2Id: item.size2Id,
      color2Id: item.color2Id,
      size3Id: item.size3Id,
      color3Id: item.color3Id,
      size4Id: item.size4Id,
      color4Id: item.color4Id,
      size5Id: item.size5Id,
      color5Id: item.color5Id,
      categoryId: item.categoryId,
      category: item.category.name,
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
      descriptionsalientfeatures: item.descriptionsalientfeatures,
      description2salientfeatures: item.description2salientfeatures,
      description3salientfeatures: item.description3salientfeatures,
      description4salientfeatures: item.description4salientfeatures,
      contentsalientfeatures: item.contentsalientfeatures,
      updatedAt: item.updatedAt,
      createdAt: item.createdAt,
      language: user?.language || "vi"
    })
  );
  return (
    <RoleGate allowedRole={[UserRole.ADMIN, UserRole.STAFF]}>
      <div className={`space-y-4 p-8 pt-6 ${showProductDetailRole}`}>
        {showProductDetailRole && (
          <ProductDetailClient data={formattedProductDetail} />
        )}
      </div>
    </RoleGate>
  );
};

export default ProductDetailPage;
