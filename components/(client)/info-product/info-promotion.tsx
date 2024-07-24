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

interface InfoPromotionprops {
  data: Product;
}
const InfoPromotion: React.FC<InfoPromotionprops> = ({ data }) => {
  const [openDetailSpecifications, setOpenDetailSpecifications] = useState(false);

  const onSeeDetailSpecification: MouseEventHandler<HTMLDivElement> = (event) => {
    event.stopPropagation();
    setOpenDetailSpecifications(true);
  };
  
  return (
    <>
      <SeeDetailSpecifications
        isOpen={openDetailSpecifications}
        onClose={() => setOpenDetailSpecifications(false)}
        data={data}
      />
      <div className="mx-auto xl:max-w-2xl">
        <div className="md:grid  md:grid-cols-2 md:ml-8 md:mb-5 xl:grid  xl:grid-cols-2 xl:item-start xl:gap-x-8  mb-5">
          <div className="w-[300px] h-[200px] shadow-lg rounded-md p-4 m-auto md:m-0">
            <h1 className="font-bold text-base text-[#666666]">
              Thông tin sản phẩm
            </h1>
            <div className="flex my-1 text-[#666666]">
              <Wrench className="w-4 h-4" />
              <span className="ml-1 text-sm ">
                {" "}
                Mới, đầy đủ phụ kiện từ nhà sản xuất{" "}
              </span>
            </div>
            <div className="flex my-1 text-[#666666]">
              <Package2 className="w-4 h-4" />
              <span className=" ml-1 text-sm">
                {" "}
                {data.heading}, Hỗ trợ sửa chữa{" "}
              </span>
            </div>
            <div className="flex my-1 text-[#666666]">
              <Shield className="w-10 h-10 -mt-3 " />
              <span className="ml-1 text-sm">
                {" "}
                Bảo hành 24 tháng trung tâm bảo hành Chính hãng, 1 đổi 1 trong
                30 ngày nếu có lỗi từ phía nhà sản xuất{" "}
              </span>
            </div>
            <div className="flex my-1 text-[#666666]">
              <Receipt className="w-4 h-4" />
              <span className="ml-1 text-sm">
                {" "}
                Giá sản phẩm đã bao gồm VAT{" "}
              </span>
            </div>
          </div>

          <div className="w-[250px] h-[200px] m-auto md:m-0">
            <div className="h-[90px] shadow-md my-[10px] rounded-md  overflow-hidden">
              <h1 className="text-white font-bold bg-[#e5002d] text-center">
                Ưa đãi khách hàng thân thiết
              </h1>
              <div className="flex text-[#666666] my-2">
                <Gift className="ml-1 w-4 h-4 " />
                <div>
                  <p className="ml-1 text-sm">
                    {data.productdetail.promotionheading}
                  </p>
                </div>
              </div>
              <div className="flex text-[#666666] my-2">
                <Sparkle className=" ml-1 w-4 h-4 " />
                <p className="ml-1 text-sm"> Giảm giá mua sỉ </p>
              </div>
            </div>

            <div className="h-[90px] shadow-md my-[10px] rounded-md overflow-hidden">
              <h1 className="text-white font-bold bg-[#e5002d] text-center">
                Ưa đãi nhà thầu
              </h1>
              <div className="flex text-[#666666] my-2">
                <Gift className="ml-1 w-4 h-4 " />
                <p className="ml-2 text-sm">
                  {data.productdetail.promotiondescription}
                </p>
              </div>
              <div className="flex text-[#666666] my-2">
                <Home className=" ml-1 w-5 h-5 " />
                <p className="ml-1 text-sm">
                  {" "}
                  Giảm giá công trình lớn và nhỏ
                </p>
              </div>
            </div>
          </div>
        </div>
        <h1 className="font-bold"> Thông số kỹ thuật </h1>
        <div className="grid md:grid-cols-2 md:ml-8 md:mb-5 xl:mx-0">
          <div className="w-[340px] md:w-[345px] xl:w-[300px] p-2 rounded-md shadow-lg m-auto md:m-0">
            <div className="flex justify-between items-center bg-gray-500 bg-opacity-10 p-4 rounded-md">
              {data.productdetail.descriptionspecifications}
              <p>{data.productdetail.valuespecifications}</p>
            </div>
            <div className="flex justify-between items-center p-4 ">
              {data.productdetail.description2specifications}
              <p>{data.productdetail.value2specifications}</p>
            </div>
            <div className="flex justify-between items-center bg-gray-500 bg-opacity-10 p-4 rounded-md">
              {data.productdetail.description3specifications}
              <p>{data.productdetail.value3specifications}</p>
            </div>
            <div className="flex justify-between items-center p-4 ">
              {data.productdetail.description4specifications}
              <p>{data.productdetail.value4specifications}</p>
            </div>
            <div className="flex justify-between items-center bg-gray-500 bg-opacity-10 p-4 rounded-md">
              {data.productdetail.description5specifications}
              <p>{data.productdetail.value5specifications}</p>
            </div>
          </div>
          <div className=" w-[340px] md:w-[345px] xl:w-[300px] p-2 rounded-md shadow-lg m-auto md:m-0 mt-2 md:mt-0">
            <div className="flex justify-between items-center bg-gray-500 bg-opacity-10 p-4 rounded-md">
              {data.productdetail.description6specifications}
              <p>{data.productdetail.value6specifications}</p>
            </div>
            <div className="flex justify-between items-center p-4">
              {data.productdetail.description7specifications}
              <p>{data.productdetail.value7specifications}</p>
            </div>
            <div className="flex justify-between items-center bg-gray-500 bg-opacity-10 p-4 rounded-md">
              {data.productdetail.description8specifications}
              <p>{data.productdetail.value8specifications}</p>
            </div>
            <div className="flex justify-between items-center p-4">
              {data.productdetail.description9specifications}
              <p>{data.productdetail.value9specifications}</p>
            </div>
            <div className="flex justify-between items-center bg-gray-500 bg-opacity-10 p-4 rounded-md">
              {data.productdetail.description10specifications}
              <p>{data.productdetail.value10specifications}</p>
            </div>
          </div>
        </div>
        <div
          onClick={onSeeDetailSpecification}
          className=" w-[290px] md:w-[550px] h-[50px] shadow-lg rounded-md mt-2 flex items-center justify-center hover:bg-red-300 hover:bg-opacity-30 hover:border-[1px] hover:border-red-500 hover:text-red-600 cursor-pointer m-auto md:mb-5"
        >
          <div>Xem chi tiết </div>
          <ChevronDown className="ml-1 h-4 w-4" />
        </div>
      </div>
    </>
  );
};

export default InfoPromotion;
