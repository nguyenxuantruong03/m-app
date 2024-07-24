"use client";
import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import Currencyonevalue from "@/components/ui/currencyonevalue";
import useCart from "@/hooks/client/use-cart";
import {Product} from "@/types/type";
import { ShieldCheck } from "lucide-react";
import SeeDetailModal from "@/components/(client)/modal/see-detail-model";
import SeeDetail1Modal from "@/components/(client)/modal/see-detail-model1";
import SeeDetail2Modal from "@/components/(client)/modal/see-detail-model2";
import SeeDetail3Modal from "@/components/(client)/modal/see-detail-model3";
import SeeDetail4Modal from "@/components/(client)/modal/see-detail-model4";

interface InfoWarrantyProps {
  data:| Product;
}

const InfoWarranty: React.FC<InfoWarrantyProps> = ({ data }) => {
  const cart = useCart();
  const [selectedWarranty, setSelectedWarranty] = useState<string | null>(null);
  const [openDetail, setOpenDetail] = useState(false);
  const [openDetail1, setOpenDetail1] = useState(false);
  const [openDetail2, setOpenDetail2] = useState(false);
  const [openDetail3, setOpenDetail3] = useState(false);
  const [openDetail4, setOpenDetail4] = useState(false);

  const handleWarrantyCheckboxChange = (warrantyOption: string) => {
    // If the clicked option is already selected, uncheck it
    if (selectedWarranty === warrantyOption) {
      setSelectedWarranty(null);
    } else {
      setSelectedWarranty(warrantyOption);
    }
    cart.updateWarrantyOption(data.id, warrantyOption);
  };

  const onSeeDetail = () => {
    setOpenDetail(true)
  };

  const onSeeDetail1 = () => {
    setOpenDetail1(true)
  };

  const onSeeDetail2 = () => {
    setOpenDetail2(true)
  };

  const onSeeDetail3 = () => {
    setOpenDetail3(true)
  };

  const onSeeDetail4 = () => {
    setOpenDetail4(true)
  };

  const warrantyOptions = [
    {
      heading: "S24 + 12 tháng",
      description:
        "Đổi sản phẩm tương đương hoặc miễn phí chi phí sữa chữa nếu có lỗi của NSX khi hết hạn bảo hành trong 12 tháng",
      value: String(data.productdetail.warranty1),
      onClick: onSeeDetail1,
    },
    {
      heading: "1 đổi 1 VIP 12 tháng",
      description: "Đổi máy mới tương đương khi có lỗi từ NSX trong 12 tháng",
      value: String(data.productdetail.warranty2),
      onClick: onSeeDetail2,
    },
    {
      heading: "Rơi vỡ - Rớt nước",
      description:
        "Hỗ trợ 90% chi phí sữa chữa, đổi mới sản phẩm nếu hư hỏng nặng trong 12 tháng",
      value: String(data.productdetail.warranty3),
      onClick: onSeeDetail3,
    },
    {
      heading: "1 đổi 1 VIP 6 tháng",
      description: "Đổi máy mới tương đương khi có lỗi từ NSX trong 6 tháng",
      value: String(data.productdetail.warranty4),
      onClick: onSeeDetail4,
    },
  ];

  return (
    <>
      <SeeDetailModal
        isOpen={openDetail}
        onClose={() => setOpenDetail(false)}
      />
      <SeeDetail1Modal
        isOpen={openDetail1}
        onClose={() => setOpenDetail1(false)}
      />
      <SeeDetail2Modal
        isOpen={openDetail2}
        onClose={() => setOpenDetail2(false)}
      />
      <SeeDetail3Modal
        isOpen={openDetail3}
        onClose={() => setOpenDetail3(false)}
      />
      <SeeDetail4Modal
        isOpen={openDetail4}
        onClose={() => setOpenDetail4(false)}
      />
      <div className="my-1 ">
        <div className="flex bg-gradient-to-r from-[#C00000] to-[#FF3334] rounded-md p-5">
          <ShieldCheck className="text-white" />
          <div className="flex ml-2 ">
            <h1 className="text-sm md:text-base ml-2 text-white font-bold ">
              Bảo vệ sản phẩm toàn diện với dịch vụ bảo hành mở rộng
            </h1>
            <span
              onClick={onSeeDetail}
              className=" ml-2  underline font-bold cursor-pointer"
            >
              {" "}
              Xem chi tiết
            </span>
          </div>
        </div>
        <p className="text-sm mx-4 my-2">
          (Khách hàng đăng ký thông tin để được hỗ trợ tư vấn và thanh toán tại
          cửa hàng nhanh nhất, số tiền phải thanh toán chưa bao gồm giá trị của
          gói bảo hành mở rộng)
        </p>
      </div>
      <RadioGroup
        value={selectedWarranty}
        onChange={handleWarrantyCheckboxChange}
      >
        <div className="space-y-1">
          {warrantyOptions.map((option, index) => (
            <RadioGroup.Option
              key={index}
              value={option.value}
              className={({ active, checked }) =>
                `${
                  checked ? "bg-[#FF3334] bg-opacity-40 text-white" : "bg-white"
                } relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
              }
            >
              {({ active, checked }) => (
                <>
                  <div className="flex w-full items-center justify-between h-[49px]">
                    <div className="flex items-center">
                      <div className="text-sm">
                        <RadioGroup.Label
                          as="p"
                          className={`font-medium  ${
                            checked ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {option.heading}
                        </RadioGroup.Label>
                        <RadioGroup.Description
                          as="span"
                          className={`inline ${
                            checked ? "text-gray-900" : "text-gray-500"
                          }`}
                        >
                          <span className="hidden md:block">{option.description}</span>
                        </RadioGroup.Description>
                      </div>
                    </div>
                  </div>
                  <div className="flex w-full justify-between mt-2 ">
                    <div className="flex items-center">
                      <button
                        className={`w-6 h-6 border rounded-full flex items-center justify-center border-gray-300 mx-3 ${
                          selectedWarranty === option.value
                            ? "bg-[#C00000] border-[#FF3334]"
                            : ""
                        }`}
                        onClick={() =>
                          handleWarrantyCheckboxChange(option.value)
                        }
                      >
                        {selectedWarranty === option.value && (
                          <CheckIcon className="text-white" />
                        )}
                      </button>
                      <p className="text-sm px-10">
                        <Currencyonevalue value={option.value} />
                      </p>
                    </div>
                    <span
                      onClick={option.onClick}
                      className="text-red-600 cursor-pointer text-sm font-bold my-auto"
                    >
                      Xem
                    </span>
                  </div>
                </>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
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
