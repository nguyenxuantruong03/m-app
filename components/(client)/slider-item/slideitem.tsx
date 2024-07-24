"use client"
import React, { useEffect, useState } from 'react';
import getBillboard from "@/actions/client/billboard/get-billboard";
import {Billboard} from '@/types/type';
import BillboardImage from './billboard/billboard';
import Menu from './menu';
import BillboardMini from './billboard/billboard-mini';

const SlideItem = () => {
  const [billboard, setBillboard] = useState<Billboard | null>(null);
  const [billboardmini, setBillboardMini] = useState<Billboard | null>(null);
  const [billboardsale, setBillboardSale] = useState<Billboard | null>(null);
  const [billboardsaleipad, setBillboardSaleIpad] = useState<Billboard | null>(null);
  const [billboardsalemobile, setBillboardSaleMobile] = useState<Billboard | null>(null);

  useEffect(() => {
    const fetchBillboards = async () => {
      const billboardData = await getBillboard("clwhlmp7n00018fr35xftz3jk");
      setBillboard(billboardData);
      setBillboardMini({ ...billboardData, id: `${process.env.NEXT_PUBLIC_BILLBOARD_API_KEY}` });
      setBillboardSale({ ...billboardData, id: `${ process.env.NEXT_PUBLIC_BILLBOARD_MINI_API_KEY}` });
      setBillboardSaleIpad({ ...billboardData, id: `${process.env.NEXT_PUBLIC_BILLBOARD_MOBILE_API_KEY}` });
      setBillboardSaleMobile({ ...billboardData, id: `${process.env.NEXT_PUBLIC_BILLBOARD_IPAD_API_KEY}` });
    };
    fetchBillboards();
  }, []);

  return (
    <>
      <div className="mx-auto max-w-7xl h-[430px] md:h-[432px] lg:h-[408px] my-2 mt-[120px]">
        <div className="flex space-x-5 md:m-5 xl:m-0">
          <Menu />
          <BillboardImage billboard={billboard} billboardmini={billboardmini}/>
        </div>
      </div>

      <BillboardMini billboardsale={billboardsale} billboardsaleipad={billboardsaleipad} billboardsalemobile={billboardsalemobile}/>
    </>
  );
};

export default SlideItem;




// import ImageMini from "./imagemini";
// import ImageSale from "./imagesale";
// import MenuTree from "./menutree";
// import SliderSwipper from "./sliderswiper";
// import BillboardCategory from "./billboard-category";
// import { getAllCategories } from "@/actions/client/categories/get-categories";
// import getBillboard from "@/actions/client/billboard/get-billboard";

// export const revalidate = 86400;
// const SlideItem = async () => {
//   const billboardIds = [
//     ${process.env.BILLBOARD_API_KEY},
//     ${process.env.BILLBOARD_MINI_API_KEY},
//     ${process.env.BILLBOARD_SALE_API_KEY},
//     ${process.env.BILLBOARD_MOBILE_API_KEY},
//     ${process.env.BILLBOARD_IPAD_API_KEY},
//   ];
  
//   // Gọi getBillboard một lần cho tất cả các giá trị
//   const billboards = await Promise.all(billboardIds.map(id => getBillboard(id)));
  
//   // Gán các kết quả vào các biến tương ứng
//   const billboard = billboards[0];
//   const billboardmini = billboards[1];
//   const billboardsale = billboards[2];
//   const billboardsaleipad = billboards[3];
//   const billboardsalemobile = billboards[4];

//   const {
//     categories,
//     categories1,
//     categories2,
//     categories3,
//     categories4,
//     categories5,
//     categories6,
//     categories7,
//     categories8,
//     categories9,
//     categories10,
//     categories11
//   } = await getAllCategories();

//   return (
//     <>
//       <div className=" mx-auto max-w-7xl h-[377px] my-2 mt-[120px] ">
//         <div className="flex space-x-5 md:m-5 xl:m-0">
//           <MenuTree
//             data={categories}
//             categories1={categories1}
//             categories2={categories2}
//             categories3={categories3}
//             categories4={categories4}
//             categories5={categories5}
//             categories6={categories6}
//             categories7={categories7}
//             categories8={categories8}
//             categories9={categories9}
//             categories10={categories10}
//             categories11={categories11}
//           />
//           <div className="hidden">
//           <BillboardCategory data={billboard} />
//           </div>
//           <SliderSwipper data={billboard} />

//           <div className="w-full space-y-4 hidden xl:block">
//             <ImageMini data={billboardmini} />
//           </div>
//         </div>
//       </div>

//       <div className=" mx-auto md:max-w-3xl xl:max-w-7xl my-2 hidden xl:block">
//         <ImageSale data={billboardsale} />
//       </div>
//       <div className=" mx-auto md:max-w-3xl xl:max-w-7xl my-2 hidden md:block xl:hidden">
//         <ImageSale data={billboardsaleipad} />
//       </div>
//       <div className=" mx-auto mb-2 mt-10 md:hidden">
//         <ImageSale data={billboardsalemobile} />
//       </div>
//     </>
//   );
// };

// export default SlideItem;