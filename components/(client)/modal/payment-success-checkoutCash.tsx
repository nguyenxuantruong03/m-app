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
import {
  translateAddress,
  translateAmountToPay,
  translateAutoCopyOrderCode,
  translateCheckBeforeTurningOff,
  translateCustomerName,
  translateExit,
  translateInvoice,
  translateNote,
  translateOrderCode,
  translateOrderCreatedDate,
  translatePasteUpperCase,
  translatePaymentSuccess,
  translateReceiveAt,
  translateSearchExit,
  translateTrackProduct,
  translateWhenYouClick,
} from "@/translate/translate-client";

interface PaymentSuccessCheckoutCashModallProps {
  isOpen: boolean;
  data: Order | null;
  loading?: boolean;
  message?: string;
  title?: string;
  languageToUse: string;
}

export const PaymentSuccessCheckoutCashModal: React.FC<
  PaymentSuccessCheckoutCashModallProps
> = ({ isOpen, loading, message, title, data, languageToUse }) => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  //languages
  const addressMessage = translateAddress(languageToUse);
  const receiveAtMessage = translateReceiveAt(languageToUse);
  const invoiceMessage = translateInvoice(languageToUse);
  const checkBeforeTurningOffMessage =
    translateCheckBeforeTurningOff(languageToUse);
  const orderCodeMessage = translateOrderCode(languageToUse);
  const paymentSuccessMessage = translatePaymentSuccess(languageToUse);
  const customerNameMessage = translateCustomerName(languageToUse);
  const amountToPayMessage = translateAmountToPay(languageToUse);
  const orderCreateDateMessage = translateOrderCreatedDate(languageToUse);
  const noteMessage = translateNote(languageToUse);
  const whenYouClickMessage = translateWhenYouClick(languageToUse);
  const trackProductMessage = translateTrackProduct(languageToUse);
  const autoCopyOrderCodeMessage = translateAutoCopyOrderCode(languageToUse);
  const searchExitMessage = translateSearchExit(languageToUse);
  const exitMessage = translateExit(languageToUse);
  const pastUpperCaseMessage = translatePasteUpperCase(languageToUse);

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
      ? `${receiveAtMessage}:`
      : `${addressMessage}:`;

  return (
    <Modal
      title={title || invoiceMessage}
      description={message || checkBeforeTurningOffMessage}
      isOpen={isOpen}
      showCloseButton={false}
    >
      <>
        <div className="space-y-4">
          <p className="text-green-600 font-bold text-lg text-center">
            {paymentSuccessMessage}
          </p>
          <div className="flex justify-between">
            <div className="text-sm text-gray-500 font-semibold">
              {orderCodeMessage}
            </div>
            <div className="text-sm">{data.id}</div>
          </div>
          <div className="flex justify-between">
            <div className="text-sm text-gray-500 font-semibold">
              {customerNameMessage}:
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
              {amountToPayMessage}
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
              {orderCreateDateMessage}:
            </div>
            <div className="text-sm">
              <FormatDate subtractiontime={true} data={data.createdAt} language={languageToUse}/>
            </div>
          </div>
        </div>
        <p className="mt-5">
          <span className="font-bold text-yellow-500">{noteMessage}:</span>
          {whenYouClickMessage}
          <span className="text-green-600 font-bold">
            {trackProductMessage}
          </span>
          {autoCopyOrderCodeMessage}{" "}
          <span className="font-bold">{pastUpperCaseMessage}</span>
          {searchExitMessage}
        </p>
        <div className="pt-6 space-x-2 flex items-center justify-end w-full">
          <Button
            disabled={loading}
            variant="outline"
            onClick={() => router.push("/cart")}
          >
            {exitMessage}
          </Button>

          <Button
            disabled={loading}
            onClick={handleTrackProduct}
            className="text-center bg-green-500 hover:bg-green-600 text-white rounded-md my-2 cursor-pointer"
          >
            <p className="h-12 flex justify-center items-center font-bold">
              <Truck className="size-12 mr-2" />
              <span>{trackProductMessage}</span>
            </p>
          </Button>
        </div>
      </>
    </Modal>
  );
};
