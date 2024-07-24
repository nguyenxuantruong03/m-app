import getProduct1 from "@/actions/client/product/get-product1";
import getProduct10 from "@/actions/client/product/get-product10";
import getProduct2 from "@/actions/client/product/get-product2";
import getProduct3 from "@/actions/client/product/get-product3";
import getProduct7 from "@/actions/client/product/get-product7";
import getProduct8 from "@/actions/client/product/get-product8";
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
  const quat = await getProduct1({ isFeatured: true });
  const daydien = await getProduct3({ isFeatured: true });
  const ongnhua = await getProduct2({ isFeatured: true });
  const bongden = await getProduct10({ isFeatured: true });
  const ocam = await getProduct7({ isFeatured: true });
  const son = await getProduct8({ isFeatured: true });
  // const [
  //   quat,
  //   daydien,
  //   ongnhua,
  //   bongden,
  //   ocam,
  //   son
  // ] = await Promise.all([
  //   getProduct1({ isFeatured: true }),
  //   getProduct3({ isFeatured: true }),
  //   getProduct2({ isFeatured: true }),
  //   getProduct10({ isFeatured: true }),
  //   getProduct7({ isFeatured: true }),
  //   getProduct8({ isFeatured: true })
  // ]);
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
