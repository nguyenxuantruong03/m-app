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
      const billboardData = await getBillboard(`${process.env.NEXT_PUBLIC_BILLBOARD_API_KEY}`);
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