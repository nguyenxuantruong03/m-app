"use client";
import ImageSale from "../imagesale";
import { Billboard } from "@/types/type";
interface BillboardMiniProps{
    billboardsale: Billboard | null;
    billboardsaleipad: Billboard | null;
    billboardsalemobile: Billboard | null;
}

const BillboardMini:React.FC<BillboardMiniProps> = ({billboardsale,billboardsaleipad,billboardsalemobile}) => {
  return (
    <>
      <div className="mx-auto md:max-w-3xl xl:max-w-7xl my-2 hidden xl:block">
        <ImageSale data={billboardsale} />
      </div>
      <div className="mx-auto md:max-w-3xl xl:max-w-7xl my-2 hidden md:block xl:hidden">
        <ImageSale data={billboardsaleipad} />
      </div>
      <div className="mx-auto mb-2 mt-10 md:hidden">
        <ImageSale data={billboardsalemobile} />
      </div>
    </>
  );
};

export default BillboardMini;
