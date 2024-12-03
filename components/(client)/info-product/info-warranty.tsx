"use client";
import { useState } from "react";
import useCart from "@/hooks/client/use-cart";
import { Product, ProductDetail } from "@/types/type";
import { ShieldCheck } from "lucide-react";
import SeeDetailModal from "@/components/(client)/modal/see-detail-model";
import SeeDetail1Modal from "@/components/(client)/modal/see-detail-model1";
import SeeDetail2Modal from "@/components/(client)/modal/see-detail-model2";
import SeeDetail3Modal from "@/components/(client)/modal/see-detail-model3";
import SeeDetail4Modal from "@/components/(client)/modal/see-detail-model4";
import { useCurrentUser } from "@/hooks/use-current-user";
import useCartdb from "@/hooks/client/db/use-cart-db";
import Currency from "@/components/ui/currency";
import {
  translateCustomerRegistration,
  translateDamagePolicy,
  translateExchangeNewProduct,
  translateExchangeNewProduct6Months,
  translateProductProtection,
  translateRepairSupportProduct,
  translateS24Plus12Months,
  translateView,
  translateViewDetails,
  translateVIPExchange,
  translateVIPExchange6Months,
  translateWarrantyExchange,
} from "@/translate/translate-client";

interface InfoWarrantyProps {
  data: Product;
  languageToUse: string;
}

const InfoWarranty: React.FC<InfoWarrantyProps> = ({ data, languageToUse }) => {
  const cart = useCart();
  const cartdb = useCartdb();
  const user = useCurrentUser();
  const [selectedWarranty, setSelectedWarranty] = useState<string | null>(null);
  const [openDetail, setOpenDetail] = useState(false);
  const [openDetail1, setOpenDetail1] = useState(false);
  const [openDetail2, setOpenDetail2] = useState(false);
  const [openDetail3, setOpenDetail3] = useState(false);
  const [openDetail4, setOpenDetail4] = useState(false);

  //languages
  const s24Plus12MonthMessage = translateS24Plus12Months(languageToUse);
  const warrantyExchnageMessage = translateWarrantyExchange(languageToUse);
  const VIPexchnageMessage = translateVIPExchange(languageToUse);
  const ExchangeNewProductMessage = translateExchangeNewProduct(languageToUse);
  const damagePolicyMessage = translateDamagePolicy(languageToUse);
  const repairSupportProductMessage =
    translateRepairSupportProduct(languageToUse);
  const VIPExchange6MonthMessage = translateVIPExchange6Months(languageToUse);
  const exchangeNewProduct6MonthMessage =
    translateExchangeNewProduct6Months(languageToUse);
  const productProtectionMessage = translateProductProtection(languageToUse);
  const viewDetailMessage = translateViewDetails(languageToUse);
  const customerRegistrationMessage =
    translateCustomerRegistration(languageToUse);
  const viewMessage = translateView(languageToUse);

  //Kiểm tra tất cả sản phẩm có === 0 không
  const productQuantityAll = [1, 2, 3, 4, 5].every(
    (i) => data.productdetail[`quantity${i}` as keyof ProductDetail] === 0
  );

  //Chuyển dổi từ heading sang value bởi vì select bằng heading sẽ trành được trùng lặp nhau nếu để value sẽ bị trùng lặp với nhau
  const getWarrantyValueByHeading = (heading: string) => {
    const warrantyOption = warrantyOptions.find(
      (option) => option.heading === heading
    );
    return warrantyOption ? warrantyOption.value : "";
  };

  const handleWarrantyCheckboxChange = (warrantyHeading: string) => {
    //Check nếu như tất cả sản phẩm đã hết hàng thì không trả về gì cho người dùng
    if (productQuantityAll) {
      return;
    }
    //Chuyển dổi từ heading sang value bởi vì select bằng heading sẽ trành được trùng lặp nhau nếu để value sẽ bị trùng lặp với nhau
    const warrantyValue = getWarrantyValueByHeading(warrantyHeading);
    if (user?.role !== "GUEST" && user?.id) {
      //Cách 1:
      // const isSelected = selectedWarranty === warrantyHeading;
      // const newWarranty = isSelected ? null : warrantyHeading;
      // // Update the local state
      // setSelectedWarranty(newWarranty);
      // Cách 2: Set này dùng để lấy dữ liệu warrantyHeading từ click vào dể selectedWarranty có thể đổi màu khi selectedWarranty === option.heading
      setSelectedWarranty((prev) =>
        prev === warrantyHeading ? null : warrantyHeading
      );
      cartdb.selectWarranty(data.id, warrantyValue);
    } else {
      // If the clicked option is already selected, uncheck it
      setSelectedWarranty((prev) =>
        prev === warrantyHeading ? null : warrantyHeading
      );
      cart.selectWarranty(data.id, warrantyValue);
    }
  };

  const onSeeDetail = () => {
    setOpenDetail(true);
  };

  const onSeeDetail1 = () => {
    setOpenDetail1(true);
  };

  const onSeeDetail2 = () => {
    setOpenDetail2(true);
  };

  const onSeeDetail3 = () => {
    setOpenDetail3(true);
  };

  const onSeeDetail4 = () => {
    setOpenDetail4(true);
  };

  const warrantyOptions = [
    {
      id: "1",
      heading: s24Plus12MonthMessage,
      description: warrantyExchnageMessage,
      value: String(data.productdetail.warranty1),
      onClick: onSeeDetail1,
    },
    {
      id: "2",
      heading: VIPexchnageMessage,
      description: ExchangeNewProductMessage,
      value: String(data.productdetail.warranty2),
      onClick: onSeeDetail2,
    },
    {
      id: "3",
      heading: damagePolicyMessage,
      description: repairSupportProductMessage,
      value: String(data.productdetail.warranty3),
      onClick: onSeeDetail3,
    },
    {
      id: "4",
      heading: VIPExchange6MonthMessage,
      description: exchangeNewProduct6MonthMessage,
      value: String(data.productdetail.warranty4),
      onClick: onSeeDetail4,
    },
  ];

  return (
    <>
      <SeeDetailModal
        isOpen={openDetail}
        onClose={() => setOpenDetail(false)}
        languageToUse={languageToUse}
      />
      <SeeDetail1Modal
        isOpen={openDetail1}
        onClose={() => setOpenDetail1(false)}
        languageToUse={languageToUse}
      />
      <SeeDetail2Modal
        isOpen={openDetail2}
        onClose={() => setOpenDetail2(false)}
        languageToUse={languageToUse}
      />
      <SeeDetail3Modal
        isOpen={openDetail3}
        onClose={() => setOpenDetail3(false)}
        languageToUse={languageToUse}
      />
      <SeeDetail4Modal
        isOpen={openDetail4}
        onClose={() => setOpenDetail4(false)}
        languageToUse={languageToUse}
      />
      <div className="my-1 ">
        <div className="flex bg-gradient-to-r from-[#C00000] to-[#FF3334] rounded-md p-5">
          <ShieldCheck className="text-white" />
          <div className="flex ml-2 ">
            <h1 className="text-sm md:text-base ml-2 text-white font-bold ">
              {productProtectionMessage}
            </h1>
            <span
              onClick={onSeeDetail}
              className=" ml-2 underline decoration-slate-900 font-bold cursor-pointer hover:underline hover:decoration-white hover:text-white"
            >
              {viewDetailMessage}
            </span>
          </div>
        </div>
        <p className="text-sm mx-4 my-2 text-slate-900 dark:text-slate-200">
          ({customerRegistrationMessage})
        </p>
      </div>
      <div>
        <div className="space-y-1">
          {warrantyOptions.map((option, index) => (
            <div
              key={option.id}
              onClick={() => handleWarrantyCheckboxChange(option.heading)}
              className={`${
                selectedWarranty === option.heading
                  ? "bg-[#FF3334] bg-opacity-40 text-white"
                  : "bg-white"
              } relative flex ${
                productQuantityAll ? "cursor-not-allowed" : "cursor-pointer"
              } rounded-lg px-5 py-4 shadow-md focus:outline-none`}
            >
              <>
                <div className="flex w-full items-center justify-between h-[49px]">
                  <div className="flex items-center">
                    <div className="text-sm">
                      <div
                        className={`font-medium  ${
                          selectedWarranty === option.heading
                            ? "text-red-500"
                            : "text-gray-900"
                        }`}
                      >
                        {option.heading}
                      </div>
                      <div
                        className={`inline ${
                          selectedWarranty === option.heading
                            ? "text-slate-900 dark:text-slate-200"
                            : "text-gray-500"
                        }`}
                      >
                        <span className="hidden md:block">
                          {option.description}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex w-full justify-between mt-2 ">
                  <div className="flex items-center">
                    <button
                      disabled={productQuantityAll}
                      className={`w-6 h-6 border rounded-full flex items-center justify-center border-gray-300 mx-3 ${
                        selectedWarranty === option.heading
                          ? "bg-[#C00000] border-[#FF3334]"
                          : ""
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleWarrantyCheckboxChange(option.heading);
                      }}
                    >
                      {selectedWarranty === option.heading && (
                        <CheckIcon className="text-white" />
                      )}
                    </button>
                    <p className="text-sm px-10">
                      <Currency value={option.value} />
                    </p>
                  </div>
                  <span
                    onClick={option.onClick}
                    className="text-red-600 cursor-pointer text-sm font-bold my-auto hover:underline hover:decoration-slate-900 underline decoration-red-600 hover:text-slate-900"
                  >
                    {viewMessage}
                  </span>
                </div>
              </>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default InfoWarranty;

function CheckIcon(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
