"use client";
import { Product } from "@/types/type";
import {
  Package2,
  Receipt,
  Shield,
  Wrench,
  Home,
  Gift,
  Sparkle,
  ChevronDown,
} from "lucide-react";
import { MouseEventHandler, useState } from "react";
import SeeDetailSpecifications from "../modal/see-detail-model-specification";
import {
  getProductInfoMessage,
  translateContractorDiscount,
  translateLoyalCustomerDiscount,
  translateNewWithAccessories,
  translatePriceIncludesVAT,
  translateProjectDiscount,
  translateRepairSupport,
  translateSpecifications,
  translateViewDetails,
  translateWarrantyDetails,
  translateWholesaleDiscount,
} from "@/translate/translate-client";

interface InfoPromotionprops {
  data: Product;
  languageToUse: string;
}
const InfoPromotion: React.FC<InfoPromotionprops> = ({
  data,
  languageToUse,
}) => {
  const [openDetailSpecifications, setOpenDetailSpecifications] =
    useState(false);

  const onSeeDetailSpecification: MouseEventHandler<HTMLDivElement> = (
    event
  ) => {
    event.stopPropagation();
    setOpenDetailSpecifications(true);
  };

  //language
  const productInfoMessage = getProductInfoMessage(languageToUse);
  const newWithAccessoriesMessage = translateNewWithAccessories(languageToUse);
  const repairSupportMessage = translateRepairSupport(languageToUse);
  const warrantyDetailsMessage = translateWarrantyDetails(languageToUse);
  const priceIncludesVATMessage = translatePriceIncludesVAT(languageToUse);
  const loyalCustomerDiscountMessage =
    translateLoyalCustomerDiscount(languageToUse);
  const wholesaleDiscountMessage = translateWholesaleDiscount(languageToUse);
  const ContractorDiscountMessage = translateContractorDiscount(languageToUse);
  const projectDiscountMessage = translateProjectDiscount(languageToUse);
  const specificationsMessage = translateSpecifications(languageToUse);
  const viewDetailMessage = translateViewDetails(languageToUse);

  return (
    <>
      <SeeDetailSpecifications
        isOpen={openDetailSpecifications}
        onClose={() => setOpenDetailSpecifications(false)}
        data={data}
        languageToUse={languageToUse}
      />
      <div className="mx-auto xl:max-w-2xl">
        <div className="md:grid md:grid-cols-2 md:mb-5 xl:grid xl:grid-cols-2 xl:item-start xl:gap-x-8  mb-5">
          <div className="w-[300px] h-[200px] shadow-lg rounded-md p-4 m-auto md:m-0">
            <h1 className="font-bold text-base text-[#666666] dark:text-slate-300">
              {productInfoMessage}
            </h1>
            <div className="flex my-1 text-[#666666] dark:text-slate-200">
              <Wrench className="w-4 h-4" />
              <span className="ml-1 text-sm ">{newWithAccessoriesMessage}</span>
            </div>
            <div className="flex my-1 text-[#666666] dark:text-slate-200">
              <Package2 className="w-4 h-4" />
              <span className=" ml-1 text-sm">
                {data.heading}, {repairSupportMessage}
              </span>
            </div>
            <div className="flex my-1 text-[#666666] dark:text-slate-200">
              <Shield className="w-10 h-10 -mt-3 " />
              <span className="ml-1 text-sm">{warrantyDetailsMessage}</span>
            </div>
            <div className="flex my-1 text-[#666666] dark:text-slate-200">
              <Receipt className="w-4 h-4" />
              <span className="ml-1 text-sm">{priceIncludesVATMessage}</span>
            </div>
          </div>

          <div className="w-[250px] h-[200px] m-auto md:m-0">
            <div className="h-[90px] shadow-md my-[10px] rounded-md  overflow-hidden">
              <h1 className="text-white font-bold bg-[#e5002d] text-center">
                {loyalCustomerDiscountMessage}
              </h1>
              <div className="flex text-[#666666] dark:text-slate-200 my-2">
                <Gift className="ml-1 w-4 h-4 " />
                <div>
                  <p className="ml-1 text-sm">
                    {data.productdetail.promotionheading}
                  </p>
                </div>
              </div>
              <div className="flex text-[#666666] dark:text-slate-200 my-2">
                <Sparkle className=" ml-1 w-4 h-4 " />
                <p className="ml-1 text-sm"> {wholesaleDiscountMessage} </p>
              </div>
            </div>

            <div className="h-[90px] shadow-md my-[10px] rounded-md overflow-hidden">
              <h1 className="text-white font-bold bg-[#e5002d] text-center">
                {ContractorDiscountMessage}
              </h1>
              <div className="flex text-[#666666] dark:text-slate-200 my-2">
                <Gift className="ml-1 w-4 h-4 " />
                <p className="ml-2 text-sm">
                  {data.productdetail.promotiondescription}
                </p>
              </div>
              <div className="flex text-[#666666] dark:text-slate-200 my-2">
                <Home className=" ml-1 w-5 h-5 " />
                <p className="ml-1 text-sm">{projectDiscountMessage}</p>
              </div>
            </div>
          </div>
        </div>
        <h1 className="font-bold text-slate-900 dark:text-slate-300">
          {specificationsMessage}
        </h1>
        <div className="grid md:grid-cols-2 md:ml-8 md:mb-5 xl:mx-0">
          <div className="w-[340px] md:w-[345px] xl:w-[300px] p-2 rounded-md shadow-lg m-auto md:m-0">
            <div className="flex justify-between items-center bg-gray-500 bg-opacity-10 p-4 rounded-md text-slate-900 dark:text-slate-200">
              {data.productdetail.descriptionspecifications}
              <p className="line-clamp-2 w-3/5 text-end">{data.productdetail.valuespecifications}</p>
            </div>
            <div className="flex justify-between items-center p-4 text-slate-900 dark:text-slate-200">
              {data.productdetail.description2specifications}
              <p className="line-clamp-2 w-3/5 text-end">{data.productdetail.value2specifications}</p>
            </div>
            <div className="flex justify-between items-center bg-gray-500 bg-opacity-10 p-4 rounded-md text-slate-900 dark:text-slate-200">
              {data.productdetail.description3specifications}
              <p className="line-clamp-2 w-3/5 text-end">{data.productdetail.value3specifications}</p>
            </div>
            <div className="flex justify-between items-center p-4 text-slate-900 dark:text-slate-200">
              {data.productdetail.description4specifications}
              <p className="line-clamp-2 w-3/5 text-end">{data.productdetail.value4specifications}</p>
            </div>
            <div className="flex justify-between items-center bg-gray-500 bg-opacity-10 p-4 rounded-md text-slate-900 dark:text-slate-200">
              {data.productdetail.description5specifications}
              <p className="line-clamp-2 w-3/5 text-end">{data.productdetail.value5specifications}</p>
            </div>
          </div>
          <div className=" w-[340px] md:w-[345px] xl:w-[300px] p-2 rounded-md shadow-lg m-auto md:m-0 mt-2 md:mt-0">
            <div className="flex justify-between items-center bg-gray-500 bg-opacity-10 p-4 rounded-md text-slate-900 dark:text-slate-200">
              {data.productdetail.description6specifications}
              <p className="line-clamp-2 w-3/5 text-end">{data.productdetail.value6specifications}</p>
            </div>
            <div className="flex justify-between items-center p-4 text-slate-900 dark:text-slate-200">
              {data.productdetail.description7specifications}
              <p className="line-clamp-2 w-3/5 text-end">{data.productdetail.value7specifications}</p>
            </div>
            <div className="flex justify-between items-center bg-gray-500 bg-opacity-10 p-4 rounded-md text-slate-900 dark:text-slate-200">
              {data.productdetail.description8specifications}
              <p className="line-clamp-2 w-3/5 text-end">{data.productdetail.value8specifications}</p>
            </div>
            <div className="flex justify-between items-center p-4 text-slate-900 dark:text-slate-200">
              {data.productdetail.description9specifications}
              <p className="line-clamp-2 w-3/5 text-end">{data.productdetail.value9specifications}</p>
            </div>
            <div className="flex justify-between items-center bg-gray-500 bg-opacity-10 p-4 rounded-md text-slate-900 dark:text-slate-200">
              {data.productdetail.description10specifications}
            <p className="line-clamp-2 w-3/5 text-end">{data.productdetail.value10specifications}</p>
            </div>
          </div>
        </div>
        <div
          onClick={onSeeDetailSpecification}
          className=" w-[290px] md:w-[550px] dark:bg-slate-200 dark:text-slate-900 dark:hover:text-slate-700 h-[50px] shadow-lg rounded-md mt-2 flex items-center justify-center hover:bg-red-300 dark:hover:bg-red-300 hover:bg-opacity-30 hover:border-[1px] hover:border-red-500 hover:text-red-600 dark:hover:border-red-500 cursor-pointer m-auto md:mb-5"
        >
          <div>{viewDetailMessage}</div>
          <ChevronDown className="ml-1 h-4 w-4" />
        </div>
      </div>
    </>
  );
};

export default InfoPromotion;
