"use client";
import ImageMini from "../imagemini";
import SliderSwipper from "../sliderswiper";
import { Billboard } from "@/types/type";

interface BillboardProps{
  billboard:Billboard | null
  billboardmini: Billboard | null
}

const BillboardImage:React.FC<BillboardProps> = ({billboard,billboardmini}) => {
  return (
    <>
          <SliderSwipper data={billboard} />

          <div className="w-full space-y-2 hidden xl:block">
            <ImageMini data={billboardmini} />
          </div>
    </>
  );
};

export default BillboardImage;
