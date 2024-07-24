import BuyProduct from "@/components/(client)/home/buy-product";
import IntroductProduct from "@/components/(client)/home/introduct-product";
import News from "@/components/(client)/home/news";
import OurProject from "@/components/(client)/home/our-project";
import SellingProduct from "@/components/(client)/home/selling-product";
import Service from "@/components/(client)/home/service";
import Slider from "@/components/(client)/home/slider";
import Sponsor from "@/components/(client)/home/sponsor";
import Story from "@/components/(client)/home/story";
import dynamic from "next/dynamic";

const MapAPI = dynamic(() => import("@/components/(client)/leaflet-map/leaflet-map"), {
  ssr: false,
});
const HomePage = async () => {
  return (
    <>
      <Slider />
      <Story />
      <Service />
      <IntroductProduct />
      <SellingProduct />
      <OurProject />
      <BuyProduct />
      <News />
      <MapAPI />
      <Sponsor />
    </>
  );
};
export default HomePage;
