"use client";
import ImageSale from "../imagesale";
import { Billboard } from "@/types/type";
interface BillboardMiniProps{
    loading: boolean;
    billboardsale: Billboard | null;
    billboardsaleipad: Billboard | null;
    billboardsalemobile: Billboard | null;

}

const BillboardMini:React.FC<BillboardMiniProps> = ({loading,billboardsale,billboardsaleipad,billboardsalemobile}) => {
  return (
    <>
      <div className="mx-auto md:max-w-3xl xl:max-w-7xl my-2 hidden xl:block">
        <ImageSale data={billboardsale} loading={loading}/>
      </div>
      <div className="mx-auto md:max-w-3xl xl:max-w-7xl my-2 hidden md:block xl:hidden">
        <ImageSale data={billboardsaleipad} loading={loading}/>
      </div>
      <div className="mx-auto mb-2 mt-10 md:hidden">
        <ImageSale data={billboardsalemobile} loading={loading}/>
      </div>
    </>
  );
};

export default BillboardMini;
