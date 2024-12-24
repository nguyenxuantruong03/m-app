"use client"
import React, { useEffect, useState } from 'react';
import getBillboard from "@/actions/client/billboard/get-billboard";
import {Billboard} from '@/types/type';
import BillboardImage from './billboard/billboard';
import Menu from './menu';
import BillboardMini from './billboard/billboard-mini';
import { useCurrentUser } from '@/hooks/use-current-user';
import { translateErrorBillboard } from '@/translate/translate-client';
import toast from 'react-hot-toast';

const SlideItem = () => {
  const user = useCurrentUser();
  const [billboard, setBillboard] = useState<Billboard | null>(null);
  const [billboardmini, setBillboardMini] = useState<Billboard | null>(null);
  const [billboardsale, setBillboardSale] = useState<Billboard | null>(null);
  const [billboardsaleipad, setBillboardSaleIpad] = useState<Billboard | null>(null);
  const [billboardsalemobile, setBillboardSaleMobile] = useState<Billboard | null>(null);
  const [loading, setLoading] = useState(true)
  const [storedLanguage, setStoredLanguage] = useState<string | null>(null);

  useEffect(() => {
    // Check if we're running on the client side
    if (typeof window !== "undefined") {
      const language = localStorage.getItem("language");
      setStoredLanguage(language);
    }
  }, []); 

  //language
  const languageToUse =
      user?.id && user?.role !== "GUEST" ? user?.language : storedLanguage || "vi";
  const errorBillboardMessage = translateErrorBillboard(languageToUse)
      useEffect(() => {
        const fetchBillboards = async () => {
          try {
            setLoading(true)
            const [billboardData, billboardMiniData, billboardSaleData, billboardIpadData, billboardMobileData] = await Promise.all([
              getBillboard(`${process.env.NEXT_PUBLIC_BILLBOARD_API_KEY}`),
              getBillboard(`${process.env.NEXT_PUBLIC_BILLBOARD_MINI_API_KEY}`),
              getBillboard(`${process.env.NEXT_PUBLIC_BILLBOARD_SALE_API_KEY}`),
              getBillboard(`${process.env.NEXT_PUBLIC_BILLBOARD_IPAD_API_KEY}`),
              getBillboard(`${process.env.NEXT_PUBLIC_BILLBOARD_MOBILE_API_KEY}`),
            ]);
      
            setBillboard(billboardData);
            setBillboardMini(billboardMiniData);
            setBillboardSale(billboardSaleData);
            setBillboardSaleIpad(billboardIpadData);
            setBillboardSaleMobile(billboardMobileData);
          } catch (error) {
            toast.error(errorBillboardMessage);
          }finally{
            setLoading(false)
          }
        };
      
        fetchBillboards();
      }, []);
      

  return (
    <>
      <div className="mx-auto max-w-7xl h-[430px] md:h-[432px] lg:h-[435px] xl:h-[405px] my-2 mt-[120px]">
        <div className="flex space-x-5 md:m-2 xl:m-0">
          <Menu languageToUse={languageToUse} loadingBillboard={loading}/>
          <BillboardImage billboard={billboard} billboardmini={billboardmini} loading={loading}/>
        </div>
      </div>

      <BillboardMini loading={loading} billboardsale={billboardsale} billboardsaleipad={billboardsaleipad} billboardsalemobile={billboardsalemobile}/>
    </>
  );
};

export default SlideItem;