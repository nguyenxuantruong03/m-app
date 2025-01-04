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
import { useTranslations } from "next-intl";

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
  const t = useTranslations()
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
    data.address &&
    (data.address.includes("Không có") || data.address.includes("Trống"))
      ? "457 Lê Văn Quới, Phường Bình Trị Đông A, Quận Bình Tân, Thành phố Hồ Chí Minh (Cửa hàng Trường Đạt)"
      : data.address;

  const displayedNameAdress =
    data.address &&
    (data.address.includes("Không có") || data.address.includes("Trống"))
      ? `${t("order.receive")}:`
      : `${t("info.address")}:`;

  return (
    <Modal
      title={title || t("order.invoice")}
      description={message || t("order.checkBeforeTurningOff")}
      isOpen={isOpen}
      showCloseButton={false}
    >
      <>
        <div className="space-y-4">
          <p className="text-green-600 font-bold text-lg text-center">
            {t("order.paymentSuccess")}
          </p>
          <div className="flex justify-between">
            <div className="text-sm text-gray-500 font-semibold">
              {t("order.orderCode")}:
            </div>
            <div className="text-sm">{data.id}</div>
          </div>
          <div className="flex justify-between">
            <div className="text-sm text-gray-500 font-semibold">
              {t("order.customerName")}:
            </div>
            <div className="text-sm">{data.name}</div>
          </div>
          <div className="flex justify-between">
            <div className="text-sm text-gray-500 font-semibold">Email:</div>
            <div className="text-sm">{data.email}</div>
          </div>
          <div className="flex justify-between">
            <div className="text-sm text-gray-500 font-semibold">
              {displayedNameAdress}
            </div>
            <div className="text-sm">{displayedAddress}</div>
          </div>
          <div className="flex justify-between">
            <div className="text-sm text-gray-500 font-semibold">
              {t("order.amountToPay")}:
            </div>
            <div className="text-sm text-red-600 font-semibold">
              {data?.orderItem[0]?.pricesales ? (
                <div className="font-bold">
                  {formatter.format(data?.orderItem[0]?.pricesales)}
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="flex justify-between">
            <div className="text-sm text-gray-500 font-semibold">
              {t("order.orderCreateDate")}:
            </div>
            <div className="text-sm">
              <FormatDate subtractiontime={true} data={data.createdAt}/>
            </div>
          </div>
        </div>
        <p className="mt-5">
          <span className="font-bold text-yellow-500">{t("order.note")}:</span>
          {t("order.whenYouClick")}
          <span className="text-green-600 font-bold">
            {t("order.trackProduct")}
          </span>
          {t("order.autoCopyOrderCode")}{" "}
          <span className="font-bold">{t("order.pastUpperCase")}</span>
          {t("order.searchExit")}
        </p>
        <div className="pt-6 space-x-2 flex items-center justify-end w-full">
          <Button
            disabled={loading}
            variant="outline"
            onClick={() => router.push("/cart")}
          >
            {t("order.exit")}
          </Button>

          <Button
            disabled={loading}
            onClick={handleTrackProduct}
            className="text-center bg-green-500 hover:bg-green-600 text-white rounded-md my-2 cursor-pointer"
          >
            <p className="h-12 flex justify-center items-center font-bold">
              <Truck className="size-12 mr-2" />
              <span>{t("order.trackProduct")}</span>
            </p>
          </Button>
        </div>
      </>
    </Modal>
  );
};
