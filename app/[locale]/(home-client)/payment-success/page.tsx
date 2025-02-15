"use client";
import { useEffect, useState, useRef } from "react";
import Container from "@/components/ui/container";
import Image from "next/image";
import axios from "axios";
import { Order } from "@/types/type";
import useCartdb from "@/hooks/client/db/use-cart-db";
import useCart from "@/hooks/client/use-cart";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import LoadingPageComponent from "@/components/ui/loading";
import {
  Truck,
  Banknote,
  AlarmClockCheck,
  WalletCards,
  Gift,
} from "lucide-react";
import FormatDate from "@/components/format-Date";
import { formatter } from "@/lib/utils";
import {
  getColorPrice,
  getSizePrice,
} from "@/components/(client)/export-product-compare/size-color/match-color-size";
import Link from "next/link";
import { useTranslations } from "next-intl";

const PaymentSuccess = () => {
  const t = useTranslations()
  const searchParams = useSearchParams();
  const user = useCurrentUser();
  const cartdb = useCartdb();
  const cart = useCart();
  const param = useParams();
  const items = useCartdb((state) => state.items);
  const router = useRouter();
  const [dataOrderItem, setDataOrderItem] = useState<Order[]>([]);
  const [totalCoins, setTotalCoins] = useState<number>(0);
  const [countdown, setCountdown] = useState(120);
  const [loading, setLoading] = useState(true);
  const [rotation, setRotation] = useState(0);
  const hasRunToastRef = useRef(false);
  const hasRunReset = useRef(false);
  
  const selectedItems = items.filter((item) =>
    cartdb.selectedItems.includes(item.id)
  );

  // Hàm để lấy tham số truy vấn từ URL
  const getQueryParam = (param: string) => {
    const params = new URLSearchParams(window.location.search);
    return params.get(param);
  };

  useEffect(() => {
    if (loading ) {
      document.title = t("loading.loading");
    } else {
      document.title = t("payment.payementSuccess");
    }
  }, [loading]);

  //Total Coins
  useEffect(() => {
    if (user?.role !== "GUEST" && user?.id) {
      try {
        setLoading(true);
        // Load totalCoins from the server using GET request
        axios.get(`/api/${param.storeId}/wheelSpin`).then((response) => {
          setTotalCoins(response.data.totalCoins);
        });
        //TODO: Phương thức get nhưng bởi vì api trong Nextjs hạn chế query nene để post
        axios
          .post(`/api/${param.storeId}/get-order`, { userId: user?.id })
          .then((response) => {
            setDataOrderItem(response.data);
          });
      } catch (error) {
        toast.error(t("toastError.somethingWentWrong"));
      } finally {
        setLoading(false);
      }
    }
  }, [param.storeId, user?.role, user?.id]);

  //Tổng tiền cần thanh toán
  const totalAmounts = selectedItems.reduce(
    (total, item) => {
      const itemInCart = items.find((cartItem) => cartItem.id === item.id);
      const quantity = itemInCart?.quantity || 1;

      if (!itemInCart || !itemInCart.product) {
        // Nếu itemInCart hoặc itemInCart.product là undefined, bỏ qua item này
        toast.error(t("product.productNotFound"));
        return total;
      }
      //GetPrice dựa vào size
      const getPriceMatchColorandSize = () => {
        const { price: priceSize, percentpromotion: percentpromotionSize } =
          getSizePrice(itemInCart?.product || "", itemInCart?.size);
        const { price: priceColor, percentpromotion: percentpromotionColor } =
          getColorPrice(itemInCart.product, itemInCart?.color);
        return Math.ceil(Math.max(priceSize, priceColor));
      };

      const itemTotalPrice = getPriceMatchColorandSize() * quantity;

      return {
        totalPrice: total.totalPrice + itemTotalPrice,
      };
    },
    { totalPrice: 0 }
  );

  // Tiền bảo hiểm
  const totalWarrantyAmount = selectedItems.reduce((total, item) => {
    const itemInCart = items.find((cartItem) => cartItem.id === item.id);
    const quantity = itemInCart?.quantity || 1;
    const selectedWarranty = String(itemInCart?.warranty || "0");

    const warrantyAmount = selectedWarranty ? parseFloat(selectedWarranty) : 0;

    return total + warrantyAmount * quantity;
  }, 0);

  const totalAmount = totalAmounts.totalPrice + totalWarrantyAmount;

  //Tìm id của OrderItem để truyền qua server update laiaj ifGiff thành true để người dùng nhận
  //thưởng trên sản phẩm đó rồi thì không nhạn được nữa
  const firstOrderItem =
    dataOrderItem.length > 0 ? dataOrderItem[0].orderItem[0] : null;
  const firstOrderItemId = firstOrderItem ? firstOrderItem.id : null;
  //Quà tặng
  const isGiftOfFirstOrderItem = firstOrderItem ? firstOrderItem.isGift : null;
  //Thời gian
  const TimeOfFirstOrderItem = firstOrderItem ? firstOrderItem.createdAt : null;
  // Tiền
  const PriceOfFirstOrderItem = firstOrderItem
    ? firstOrderItem.pricesales
    : null;

  //Tìm id của order
  const firstOrder = dataOrderItem.length > 0 ? dataOrderItem[0] : null;
  //Tìm isPaid của order
  const isPaidOfFirstOrder = firstOrder ? firstOrder.isPaid : null;

  const resetTotalCoins = async (amountdb: number, coins: number) => {
    setLoading(true);
    try {
      //Check lỗi
      if (isGiftOfFirstOrderItem !== false) {
        toast.error(t("product.productRewardError"));
        router.push("/cart");
        return;
      }

      if (!firstOrderItemId) {
        toast.error(t("product.productNotFound"));
        router.push("/cart");
        return;
      }

      // Lấy URL và tham số truy vấn
      const currentUrl = window.location.pathname;
      const successParam = getQueryParam("success");
      //Check nếu người dùng tự động chuyển đến /payment-success hoặc khác payment-success?success=1 khác 1 thì chuyển người dùng về /cart
      if (currentUrl === "/payment-success" && successParam !== "1") {
        router.push("/cart");
        return;
      }

      if (
        user?.role !== "GUEST" &&
        user?.id &&
        !isGiftOfFirstOrderItem &&
        isPaidOfFirstOrder
      ) {
        // Xử lý lỗi và điều hướng
        if (totalAmount && selectedItems && !hasRunReset.current) {
          setLoading(true);
          hasRunToastRef.current = true;
          const paymentAmount = amountdb - coins;

          let newRotation = 0;

          if (paymentAmount >= 1000000) {
            newRotation += 2;
          } else if (paymentAmount >= 500000 && paymentAmount < 1000000) {
            newRotation += 1;
          } else {
            // Less than 500,000, no change in rotation
            newRotation += 0;
          }
          setRotation(newRotation);
          await axios.post(`/api/${param.storeId}/wheelSpin`, {
            userId: user?.id,
            coin: 0,
            rotation: newRotation,
            isCheckPayment: true,
            idOrderItem: firstOrderItemId,
          });
        }
      }
    } catch (error) {
      setLoading(false);
      toast.error(t("product.rewardErrorContacAdmin"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handlePaymentStatus = async () => {
      const success = searchParams.get("success");
      const canceled = searchParams.get("canceled");

      if (success) {
        if (user?.role !== "GUEST" && user?.id && !hasRunToastRef.current) {
          //hasRunToastRef: Ngăn chặn chỉ cho API chạy 1 lần nếu ko có nó call liên tục bên ngoài
          hasRunToastRef.current = true;
          try {
            await cartdb.removeSelectedItems(user?.id || "");
            toast.success(t("payment.payementSuccess"));
          } catch (error) {
            toast.error(t("toastError.somethingWentWrong"));
          }
        } else if (!hasRunToastRef.current) {
          //hasRunToastRef: Ngăn chặn chỉ cho API chạy 1 lần nếu ko có nó call liên tục bên ngoài
          hasRunToastRef.current = true;
          setLoading(false);
          try {
            await cart.removeSelectedItems();
            toast.success(t("payment.payementSuccess"));
          } catch (error) {
            toast.error(t("toastError.somethingWentWrong"));
          }
        }
        if (dataOrderItem.length > 0) {
          resetTotalCoins(totalAmount, totalCoins);
        }
      }

      if (canceled && !hasRunToastRef.current) {
        //hasRunToastRef: Ngăn chặn chỉ cho API chạy 1 lần nếu ko có nó call liên tục bên ngoài
        hasRunToastRef.current = true;
        toast.error(t("payment.paymentFailure"));
      }
    };

    handlePaymentStatus();
  }, [searchParams, totalAmount, totalCoins]);

  useEffect(() => {
    if (!loading) {
      const interval = setInterval(() => {
        // Check if countdown is greater than 0 before decrementing
        setCountdown((prevCountdown) =>
          prevCountdown > 0 ? prevCountdown - 1 : 0
        );
      }, 1000);

      // Redirect to /home when countdown reaches 0
      if (countdown === 0) {
        router.push("/home-product");
      }

      // Clear interval when the component is unmounted
      return () => clearInterval(interval);
    }
  }, [loading, countdown, router]);

  return (
    <Container>
      {loading ? (
        <>
          <div className="mt-32 py-4">
            <div className="flex items-center justify-center">
              {loading && <LoadingPageComponent />}
            </div>
            <div className="text-center text-lg mt-3 text-slate-900 dark:text-slate-200">
              {t("payment.please")}
              <span className="text-red-600 font-semibold">
                {t("payment.no")}
              </span>{" "}
              {t("payment.browerClose")}
            </div>
          </div>
        </>
      ) : (
        <div className="relative">
          <div className="mt-32 mb-3 py-4 max-w-[600px] max-h-[700px] mx-auto shadow-lg rounded-lg dark:bg-slate-700">
            <div className="flex items-center justify-center">
              <Image
                src="/images/check-payment-success.png"
                alt="Error"
                width="100"
                height="100"
              />
            </div>

            <div className="text-lg space-y-5 text-center">
              <p className="font-bold mt-3 text-slate-900 dark:text-slate-200">
                {t("payment.orderSuccess")}
              </p>
              {/* Check nếu role là GUEST thì ko hiển thị */}
              {user?.role !== "GUEST" && user?.id && (
                <>
                  <div className="ml-5 grid grid-cols-2 gap-x-2 space-y-1">
                    <p className="flex items-center text-slate-900 dark:text-slate-200">
                      <Truck className="h-5 w-5 mr-1" /> {t("order.orderCode")}:
                    </p>
                    <p className="font-semibold text-base text-slate-900 dark:text-slate-200">
                      {firstOrderItemId}
                    </p>
                    <p className="flex items-center text-slate-900 dark:text-slate-200">
                      <Banknote className="h-5 w-5 mr-1 " />{" "}
                      {isPaidOfFirstOrder ? (
                        <span>{t("payment.paidAmount")}:</span>
                      ) : (
                        <span>{t("payment.amountToPay")}:</span>
                      )}
                    </p>
                    <p
                      className={`font-semibold text-base ${
                        isPaidOfFirstOrder ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {PriceOfFirstOrderItem
                        ? formatter.format(PriceOfFirstOrderItem)
                        : ""}
                    </p>
                    <p className="flex items-center text-slate-900 dark:text-slate-200">
                    </p>
                    <p className="font-semibold text-base">
                      {isPaidOfFirstOrder ? (
                        <div>
                          {rotation === 0 ? (
                            <div className="text-red-600">
                              {t("payment.insufficientAmount")}
                            </div>
                          ) : (
                            <div className="text-green-500">+{rotation}</div>
                          )}
                        </div>
                      ) : (
                        <div className="text-red-600">
                              {t("payment.payToReceiveReward")}
                            </div>
                      )}
                    </p>
                    <p className="flex items-center text-slate-900 dark:text-slate-200">
                      <AlarmClockCheck className="h-5 w-5 mr-1" />{" "}
                      {t("payment.orderItem")}:
                    </p>
                    <p className="font-semibold text-base text-slate-900 dark:text-slate-200">
                      {
                        <FormatDate
                          subtractiontime={true}
                          data={TimeOfFirstOrderItem}
                        />
                      }
                    </p>
                    <p className="flex items-center text-slate-900 dark:text-slate-200">
                      <WalletCards className="h-5 w-5 mr-1" />{" "}
                      {t("payment.orderStatus")}:
                    </p>
                    <p className="font-semibold text-base">
                      {isPaidOfFirstOrder ? (
                        <span className="text-green-500">
                          {t("payment.paidStatus")}
                        </span>
                      ) : (
                        <span className="text-red-600">
                          {t("payment.unpaidStatus")}
                        </span>
                      )}
                    </p>
                  </div>

                  <p className="text-slate-900 dark:text-slate-200">
                    {t("payment.please")}
                    <span className="text-red-600 font-semibold">
                      {t("payment.check")}
                    </span>
                    {t("payment.beforeClosingBrower")}
                  </p>
                </>
              )}
            </div>
            <div className="text-red-800 dark:text-red-700 mt-10">
              <p className="text-center text-lg font-semibold">
                {t("payment.backToPayment",{countdown: countdown})}
              </p>
            </div>
            <Link
              href="/home-product"
              className="mt-4 flex items-center justify-center hover:underline cursor-pointer text-slate-900 dark:text-slate-200"
            >
              {t("payment.backToHome")}
            </Link>
          </div>
        </div>
      )}
    </Container>
  );
};

export default PaymentSuccess;
