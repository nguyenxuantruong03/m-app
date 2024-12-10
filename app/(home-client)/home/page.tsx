import BuyProduct from "@/components/(client)/home/buy-product";
import IntroductProduct from "@/components/(client)/home/introduct-product";
import News from "@/components/(client)/home/news";
import OurProject from "@/components/(client)/home/our-project";
import OverViewStore from "@/components/(client)/home/overview-store";
import SellingProduct from "@/components/(client)/home/selling-product";
import Service from "@/components/(client)/home/service";
import Slider from "@/components/(client)/home/slider";
import Marquees from "@/components/(client)/home/marquee";
import Story from "@/components/(client)/home/story";
import dynamic from "next/dynamic";
import { getHomeMessage } from "@/translate/translate-client";
import { currentUser } from "@/lib/auth";
import InfoHotProduct from "@/components/(client)/home/Info-hot-product";

const MapAPI = dynamic(() => import("@/components/(client)/leaflet-map/leaflet-map"), {
  ssr: false,
});
const HomePage = async () => {
  return (
    <>
      <Slider/>
      <Story/>
      <Service/>
      <IntroductProduct/>
      <SellingProduct/>
      <OurProject/>
      <InfoHotProduct />
      <OverViewStore/>
      <BuyProduct />
      <News />
      <MapAPI />
      <Marquees/>
    </>
  );
};
export default HomePage;

export async function generateMetadata() {
  const user =  await currentUser()
  const homeMessage = getHomeMessage(user?.language || "en")
  return {
    title: homeMessage.home,
  };
}