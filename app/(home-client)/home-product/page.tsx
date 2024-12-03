import LogicProduct from "@/components/(client)/product/logic-product";
import dynamic from "next/dynamic";

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
  

  return (
    <>
      <SlideItem />
      <LogicProduct />
      <Suggest />
      <NewsPage />
      <MapAPI />
    </>
  );
};
export default HomePage;
