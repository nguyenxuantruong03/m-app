import getAllProduct from "@/actions/client/product/get-all-product";
import { Product } from "@/types/type";
import dynamic from "next/dynamic";

const MainProduct = dynamic(
  () => import("@/components/(client)/product/mainproduct"),
  {
    ssr: false,
  }
);
const SlideItem = dynamic(
  () => import("@/components/(client)/slider-item/slideitem"),
  {
    ssr: false,
  }
);
const Suggest = dynamic(() => import("@/components/(client)/suggest/Suggest"), {
  ssr: false,
});
const NewsPage = dynamic(() => import("@/components/(client)/news/news"), {
  ssr: false,
});
const MapAPI = dynamic(
  () => import("@/components/(client)/leaflet-map/leaflet-map"),
  {
    ssr: false,
  }
);

export const revalidate = 86400;
const HomePage = async () => {
  const products = await getAllProduct({ isFeatured: true });
  // Lọc sản phẩm có `isSale` là true và có `timeSale`
  const saleProduct = products
  .filter((product: any) => {
    return product.isSale === true && new Date(product.timeSale) > new Date();
  })
  // Sắp xếp theo số lượng `sold` từ cao đến thấp
  .sort((a: any, b: any) => b.sold - a.sold);


  // Lọc sản phẩm có `isSale` là true và có `timeSale`
  const saleProducts = products.filter(
    (product: any) => product.isSale === true && product.timeSale
  );
  // Tìm sản phẩm có `timeSale` lớn nhất
  const maxTimeSaleProduct = saleProducts.reduce((max, product) => {
    const maxTimeSale = max.timeSale ?? 0; // Nếu max.timeSale là undefined, sử dụng 0
    const currentTimeSale = product.timeSale ?? 0; // Nếu product.timeSale là undefined, sử dụng 0
    return maxTimeSale > currentTimeSale ? max : product;
  }, saleProducts[0]); // Khởi tạo với sản phẩm đầu tiên trong danh sách

  // Alternatively, if you want to default to the current date:
  const maxTimeSale =
    maxTimeSaleProduct && maxTimeSaleProduct.timeSale !== undefined
      ? new Date(maxTimeSaleProduct.timeSale)
      : null; // Handle undefined properly

  const ongnhua = products.filter(
    (product: any) => product.productType === "PRODUCT2"
  );
  const daydien = products.filter(
    (product: any) => product.productType === "PRODUCT3"
  );
  const ocam = products.filter(
    (product: any) => product.productType === "PRODUCT7"
  );
  const son = products.filter(
    (product: any) => product.productType === "PRODUCT8"
  );
  const bongden = products.filter(
    (product: any) => product.productType === "PRODUCT10"
  );

  // Sắp xếp sản phẩm theo số lượng đã bán
  const topSoldProducts = products
    .sort((a: any, b: any) => b.sold - a.sold)
    .slice(0, 5); // Lấy 5 sản phẩm bán chạy nhất

  // Cộng dồn số lượng sản phẩm theo productType
  const productTypeCount: { [key: string]: number } = {};

  topSoldProducts.forEach((product: any) => {
    const type = product.productType;
    // Nếu productType đã tồn tại trong đối tượng thì cộng dồn, nếu chưa thì khởi tạo
    if (productTypeCount[type]) {
      productTypeCount[type] += 1; // Tăng số lượng lên 1
    } else {
      productTypeCount[type] = 1; // Khởi tạo số lượng là 1
    }
  });

  // Chuyển đổi đối tượng thành mảng và sắp xếp theo count
  const aggregatedProductTypes = Object.entries(productTypeCount)
    .map(([productType, count]) => ({ productType, count }))
    .sort((a, b) => b.count - a.count); // Sắp xếp theo count từ cao đến thấp

  return (
    <>
      <SlideItem />
      <MainProduct
        saleProduct={saleProduct}
        daydien={daydien}
        ongnhua={ongnhua}
        ocam={ocam}
        bongden={bongden}
        son={son}
        maxTimeSale={maxTimeSale}
        aggregatedProductTypes={aggregatedProductTypes}
      />
      <Suggest />
      <NewsPage />
      <MapAPI />
    </>
  );
};
export default HomePage;
