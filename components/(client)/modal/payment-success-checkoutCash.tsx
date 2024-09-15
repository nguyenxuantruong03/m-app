"use client";

import { useEffect, useState } from "react";
import { Order } from "@/types/type";
import { useRouter } from "next/navigation";
import { Truck } from "lucide-react";
import toast from "react-hot-toast";
import { formatter } from "@/lib/utils";
import Modal from "@/components/ui/modal";
import FormatDate from "@/components/format-Date";
import { Button } from "@/components/ui/button";

interface PaymentSuccessCheckoutCashModallProps {
  isOpen: boolean;
  data: Order | null;
  loading?: boolean;
  message?: string;
  title?: string;
}

export const PaymentSuccessCheckoutCashModal: React.FC<
  PaymentSuccessCheckoutCashModallProps
> = ({ isOpen, loading, message, title, data }) => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  if (!data) {
    return null;
  }

  const handleTrackProduct = () => {
    if (data?.id) {
      navigator.clipboard
        .writeText(data.id)
        .then(() => {})
        .catch((error) => {
          toast.error(error);
        });
      // Navigate to /warehouse/package-product
      router.push("/warehouse/package-product");
    }
  };

  const displayedAddress =
  data.address && (data.address.includes("Không có") || data.address.includes("Trống"))
    ? "457 Lê Văn Quới, Phường Bình Trị Đông A, Quận Bình Tân, Thành phố Hồ Chí Minh (Cửa hàng Trường Đạt)"
    : data.address;

const displayedNameAdress = 
  data.address && (data.address.includes("Không có") || data.address.includes("Trống"))
    ? "Nhận hàng tại:"
    : "Địa chỉ:";
    
  return (
    <Modal
      title={title || "Hóa đơn thanh toán"}
      description={message || "Kiểm tra trước khi tắt!"}
      isOpen={isOpen}
      showCloseButton={false}
    >
      <>
        <div className="space-y-4">
          <p className="text-green-600 font-bold text-lg text-center">
            Thanh toán thành công!
          </p>
          <div className="flex justify-between">
            <div className="text-sm text-gray-500 font-semibold">Mã đơn hàng:</div>
            <div className="text-sm">{data.id}</div>
          </div>
          <div className="flex justify-between">
            <div className="text-sm text-gray-500 font-semibold">Tên khách hàng:</div>
            <div className="text-sm">{data.name}</div>
          </div>
          <div className="flex justify-between">
            <div className="text-sm text-gray-500 font-semibold">Email:</div>
            <div className="text-sm">{data.email}</div>
          </div>
          <div className="flex justify-between">
            <div className="text-sm text-gray-500 font-semibold">{displayedNameAdress}</div>
            <div className="text-sm">{displayedAddress}</div>
          </div>
          <div className="flex justify-between">
            <div className="text-sm text-gray-500 font-semibold">Sô tiền cần thanh toán:</div>
            <div className="text-sm text-red-600 font-semibold">
              {data?.orderItem[0]?.pricesales
                ? (<div className="font-bold">{formatter.format(data?.orderItem[0]?.pricesales)}</div>)
                : ""}
            </div>
          </div>
          <div className="flex justify-between">
            <div className="text-sm text-gray-500 font-semibold">Đơn hàng tạo ngày:</div>
            <div className="text-sm">
              <FormatDate subtractiontime={true} data={data.createdAt} />
            </div>
          </div>
        </div>
        <p className="mt-5">
          <span className="font-bold text-yellow-500">Lưu ý:</span> Khi bạn
          click vào <span className="text-green-600 font-bold">TRACK PRODUCT</span> sẽ tự động copy mã đơn hàng. Khi chuyển tới
          trang xem quá trình vận chuyển hãy{" "}
          <span className="font-bold">PASTE</span> vào ô tìm kiếm. Nếu bạn không cần hãy click vào exit để thoát.
        </p>
        <div className="pt-6 space-x-2 flex items-center justify-end w-full">
          <Button disabled={loading} variant="outline" onClick={() => router.push("/cart")}>
            Exit
          </Button>

          <Button
            disabled={loading}
            onClick={handleTrackProduct}
            className="text-center bg-green-500 hover:bg-green-600 text-white rounded-md my-2 cursor-pointer"
          >
            <p className="h-12 flex justify-center items-center font-bold">
              <Truck className="size-12 mr-2" /> <span>TRACK PRODUCT</span>
            </p>
          </Button>
        </div>
      </>
    </Modal>
  );
};
