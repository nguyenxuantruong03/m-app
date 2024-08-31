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
import { getColorPrice, getSizePrice } from "@/components/(client)/export-product-compare/size-color/match-color-size";

const PaymentSuccess = () => {
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
        console.error(error);
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
        toast.error("Không tìm thấy sản phẩm!");
        return total;
      }
      //GetPrice dựa vào size
      const getPriceMatchColorandSize = () => {
        const { price: priceSize, percentpromotion: percentpromotionSize } = getSizePrice(
          itemInCart?.product || "",
          itemInCart?.size
        );
        const { price: priceColor, percentpromotion: percentpromotionColor } = getColorPrice(itemInCart.product, itemInCart?.color);
        return Math.ceil(Math.max(priceSize, priceColor));
      };

      const itemTotalPrice = getPriceMatchColorandSize() * quantity;

      return {
        totalPrice: total.totalPrice + itemTotalPrice,
      };
    },
    { totalPrice: 0}
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
          toast.error("Lỗi sản phẩm đã được nhận thưởng.");
          router.push("/cart");
          return;
        }

        if (!firstOrderItemId) {
          toast.error("Lỗi không tìm thấy sản phẩm của bạn.");
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
      toast.error("Lỗi tặng thưởng liên hệ ADMIN ngay 0352261103.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const success = searchParams.get("success");
    const canceled = searchParams.get("canceled");
    if (success) {
      if (
        user?.role !== "GUEST" &&
        user?.id &&
        success &&
        !hasRunToastRef.current
      ) {
        //hasRunToastRef: Ngăn chặn chỉ cho API chạy 1 lần nếu ko có nó call liên tục bên ngoài
        hasRunToastRef.current = true;  
        cartdb.removeSelectedItems(user?.id || "");
        toast.success("Thanh toán thành công!");
      } else if (success && !hasRunToastRef.current) {
        //hasRunToastRef: Ngăn chặn chỉ cho API chạy 1 lần nếu ko có nó call liên tục bên ngoài
        hasRunToastRef.current = true;
        setLoading(false);
        cart.removeSelectedItems();
        toast.success("Thanh toán thành công!");
      }
      if (dataOrderItem.length > 0) {
        resetTotalCoins(totalAmount, totalCoins);
      }
    }

    if (canceled) {
      if (canceled && !hasRunToastRef.current) {
        //hasRunToastRef: Ngăn chặn chỉ cho API chạy 1 lần nếu ko có nó call liên tục bên ngoài
        hasRunToastRef.current = true;
        toast.error("Thanh toán thất bại!");
      }
    }
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
            <div className="text-center text-lg mt-3">
              Quý khách vui lòng{" "}
              <span className="text-red-600 font-semibold">KHÔNG</span> tắt
              trình duyệt vì đang xử lý tặng quà cho quý khách mua hàng.
            </div>
          </div>
        </>
      ) : (
        <div className="relative">
          <div className="mt-32 mb-3 py-4 max-w-[600px] max-h-[700px] mx-auto shadow-lg rounded-lg">
            <div className="flex items-center justify-center">
              <Image
                src="/images/check-payment-success.png"
                alt="Error"
                width="100"
                height="100"
              />
            </div>

            <div className="text-lg space-y-5 text-center">
              <p className="font-bold mt-3">Đặt hàng thành công!</p>
              {/* Check nếu role là GUEST thì ko hiển thị */}
              {user?.role !== "GUEST" && user?.id && (
                <>
                  <div className="ml-5 grid grid-cols-2 gap-x-2 space-y-1">
                    <p className="flex items-center">
                      <Truck className="h-5 w-5 mr-1" /> Mã đơn hàng:
                    </p>
                    <p className="font-semibold text-base">
                      {firstOrderItemId}
                    </p>
                    <p className="flex items-center">
                      <Banknote className="h-5 w-5 mr-1" /> {isPaidOfFirstOrder ? "Số tiền đã thanh toán:" : "Số tiền cần thanh toán:"}
                    </p>
                    <p className={`font-semibold text-base ${isPaidOfFirstOrder ? "text-green-600" : "text-red-600"}`}>
                      {PriceOfFirstOrderItem
                        ? formatter.format(PriceOfFirstOrderItem)
                        : ""}
                    </p>
                    <p className="flex items-center">
                      <Gift className="h-5 w-5 mr-1" /> Vòng quay được tặng:
                    </p>
                    <p className="font-semibold text-base">
                      {isPaidOfFirstOrder ? (
                        <div>
                          {rotation === 0 ? (
                            <div className="text-red-600">
                              Số tiền không đáp ứng
                            </div>
                          ) : (
                            <div className="text-green-500">+{rotation}</div>
                          )}
                        </div>
                      ) : (
                        <div className="text-red-600">Thanh toán để nhận thưởng!</div>
                      )}
                    </p>
                    <p className="flex items-center">
                      <AlarmClockCheck className="h-5 w-5 mr-1" /> Thời gian đặt
                      hàng:
                    </p>
                    <p className="font-semibold text-base">
                      {
                        <FormatDate
                          subtractiontime={true}
                          data={TimeOfFirstOrderItem}
                        />
                      }
                    </p>
                    <p className="flex items-center">
                      <WalletCards className="h-5 w-5 mr-1" /> Trạng thái đơn
                      hàng:
                    </p>
                    <p className="font-semibold text-base">
                      {isPaidOfFirstOrder ? (
                        <span className="text-green-500">Đã thanh toán</span>
                      ) : (
                        <span className="text-red-600">Chưa thanh toán</span>
                      )}
                    </p>
                  </div>

                  <p>
                    Quý khách vui lòng{" "}
                    <span className="text-red-600 font-semibold">KIỂM TRA</span>{" "}
                    đơn hơn trước khi tắt trình duyệt.
                  </p>
                </>
              )}
            </div>
            <div className="text-red-800 mt-10">
              <p className="text-center text-lg font-semibold">
                Trở lại trang mua hàng trong {countdown} giây <br />
                Xin vui lòng chờ trong giây lát...
              </p>
            </div>
            <div
              className="mt-4 flex items-center justify-center hover:underline cursor-pointer"
              onClick={() => router.push("/home-product")}
            >
              {" "}
              Trở về trang chủ 🏠
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default PaymentSuccess;
