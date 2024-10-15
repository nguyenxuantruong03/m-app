import getAllProduct from "@/actions/client/product/get-all-product";
import { Product } from "@/types/type";
import dynamic from "next/dynamic";
const MainProduct = dynamic(() => import("@/components/(client)/product/mainproduct"), {
  ssr: false,
});
const SlideItem = dynamic(() => import("@/components/(client)/slider-item/slideitem"), {
  ssr: false,
});
const Suggest = dynamic(() => import("@/components/(client)/suggest/Suggest"), {
  ssr: false,
});
const NewsPage = dynamic(() => import("@/components/(client)/news/news"), {
  ssr: false,
});
const MapAPI = dynamic(() => import("@/components/(client)/leaflet-map/leaflet-map"), {
  ssr: false,

});

export const revalidate = 86400;
const HomePage = async () => {
  const products = await getAllProduct({ isFeatured: true })
  const quat = products.filter((product: any) => product.productType === "PRODUCT1");
  const ongnhua = products.filter((product: any) => product.productType === "PRODUCT2");
  const daydien = products.filter((product: any) => product.productType === "PRODUCT3");
  const ocam = products.filter((product: any) => product.productType === "PRODUCT7");
  const son = products.filter((product: any) => product.productType === "PRODUCT8");
  const bongden = products.filter((product: any) => product.productType === "PRODUCT10");

  return (
    <>
        <SlideItem />
        <MainProduct
          quat={quat}
          daydien={daydien}
          ongnhua={ongnhua}
          ocam={ocam}
          bongden={bongden}
          son={son}
        />
        <Suggest />
        <NewsPage />
        <MapAPI />
    </>
  );
};
export default HomePage;
