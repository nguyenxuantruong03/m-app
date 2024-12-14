"use client";
import ImageMini from "../imagemini";
import SliderSwipper from "../sliderswiper";
import { Billboard } from "@/types/type";

interface BillboardProps{
  loading: boolean;
  billboard:Billboard | null
  billboardmini: Billboard | null
}

const BillboardImage:React.FC<BillboardProps> = ({billboard,billboardmini,loading}) => {
  return (
    <>
          <SliderSwipper data={billboard} loading={loading}/>

          <div className="w-full space-y-2 hidden xl:block">
            <ImageMini data={billboardmini} loading={loading}/>
          </div>
    </>
  );
};

export default BillboardImage;
