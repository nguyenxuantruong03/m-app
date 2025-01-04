import BuyProduct from "@/components/(client)/home/buy-product";
import IntroductProduct from "@/components/(client)/home/introduct-product";
import OurProject from "@/components/(client)/home/our-project";
import OverViewStore from "@/components/(client)/home/overview-store";
import SellingProduct from "@/components/(client)/home/selling-product";
import Service from "@/components/(client)/home/service";
import Slider from "@/components/(client)/home/slider";
import Marquees from "@/components/(client)/home/marquee";
import Story from "@/components/(client)/home/story";
import dynamic from "next/dynamic";
import { currentUser } from "@/lib/auth";
import InfoHotProduct from "@/components/(client)/home/Info-hot-product";
import FlowerFalling from "@/components/(client)/flower-falling/flower-falling";
import { root } from "@/components/(client)/color/color";
import NewsPage from "@/components/(client)/news/news";
import { getTranslations } from "next-intl/server";

const MapAPI = dynamic(
  () => import("@/components/(client)/leaflet-map/leaflet-map"),
  {
    ssr: false,
  }
);
// Chuyển sang CSR hiện tại Metadata đang của SSR
const HomePage = () => {
  return (
    <>
      <FlowerFalling />
      <Slider />
      <Story />
      <Service />
      <IntroductProduct/>
      <SellingProduct />
      <OurProject />
      <InfoHotProduct />
      <OverViewStore />
      <BuyProduct />
      <div className={`pt-5 ${root.bgwhite}`}>
        <NewsPage />
      </div>
      <MapAPI />
      <Marquees />
    </>
  );
};
export default HomePage;

export async function generateMetadata() {
  const user = await currentUser();
  const languageToUse = user?.language || "vi";
  const t = await getTranslations({languageToUse, namespace: "home"})
  return {
    title: t("home")
  };
}
