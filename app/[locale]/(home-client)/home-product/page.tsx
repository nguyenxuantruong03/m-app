import FlowerFalling from "@/components/(client)/flower-falling/flower-falling";
import NewsPage from "@/components/(client)/news/news";
import LogicProduct from "@/components/(client)/product/logic-product";
import { currentUser } from "@/lib/auth";
import { getTranslations } from "next-intl/server";
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
const MapAPI = dynamic(
  () => import("@/components/(client)/leaflet-map/leaflet-map"),
  {
    ssr: false,
  }
);
export const revalidate = 86400;

// Chuyển sang CSR hiện tại Metadata đang của SSR
const HomePage = () => {
  return (
    <>
      <FlowerFalling />
      <SlideItem />
      <LogicProduct />
      <Suggest />
      <NewsPage />
      <MapAPI />
    </>
  );
};
export default HomePage;

export async function generateMetadata() {
  const user = await currentUser();
  const languageToUse = user?.language || "vi";
  const t = await getTranslations({languageToUse, namespace: "product"})
  return {
    title: t("homeProduct"),
  };
}
