import prismadb from "@/lib/prismadb";
import ProductClient from "./components/client";
import { ProductColumn } from "./components/columns";
import { format } from "date-fns";
import { formatter } from "@/lib/utils";

const ProductPage = async ({ params }: { params: { storeId: string } }) => {
  const watchs = await prismadb.watch.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      category: true,
      size: true,
      color: true,
      specifications: true,
      salientfeatures: true
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedProduct: ProductColumn[] = watchs.map((item) => ({
    id: item.id,
    name: item.name,
    heading: item.heading,
    description: item.description,
    price: formatter.format(item.price.toNumber()),
    priceold: formatter.format(item.priceold.toNumber()),
    percentpromotion:  formatter.format(item.percentpromotion.toNumber()),
    // Thông tin sản phẩm bảo hanh vat ..
    headingrecommend: item.headingrecommend,
    infomationrecommend: item.infomationrecommend,
    warrantyrecommend: item.warrantyrecommend,
    vatrecommend: item.vatrecommend,
    // Khuyến mãi
    promotionheading: item.promotionheading,
    promotiondescription: item.promotiondescription,
    //Bảo hành
    guaranteeheading: item.guaranteeheading,
    guaranteedescription: item.guaranteedescription,
    guaranteeinfomation: item.guaranteeinfomation,
    guaranteeprice: item.guaranteeprice,
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    size: item.size.name,
    color: item.color.value,
    category: item.category.name,
    specifications: item.specifications.name,
    salientfeatures: item.salientfeatures.name,

    createdAt: format(item.createdAt, "MM/dd/yyyy"),
  }));
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductClient data={formattedProduct} />
      </div>
    </div>
  );
};

export default ProductPage;
