"use client";
import useCart from "@/hooks/client/use-cart";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import Currency from "@/components/ui/currency";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp, Trash2 } from "lucide-react";
import "../checkout.css";
import SeePaymentWarningModal from "@/components/(client)/modal/see-warning-model5";
import {
  getColorOldPrice,
  getColorPrice,
  getSizeOldPrice,
  getSizePrice,
} from "@/components/(client)/export-product-compare/size-color/match-color-size";
import { PaymentMethodType } from "../db/sumary-db";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertModal } from "@/components/modals/alert-modal";

interface SumaryProps {
  userId: string;
  setLoadingChange: Dispatch<SetStateAction<boolean>>;
  loadingChange: boolean;
}

const Sumary: React.FC<SumaryProps> = ({
  userId,
  loadingChange,
  setLoadingChange,
}) => {
  const router = useRouter();
  const cart = useCart();
  const items = useCart((state) => state.items);
  const [openPaymentWarning, setOpenPaymentWarning] = useState(false);
  const [openRemoveAll, setOpenRemoveAll] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>(
    PaymentMethodType.CashPayment
  );

  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrolledPast, setIsScrolledPast] = useState(false); // New state for scrolling past the element
  const scrollToDivRef = useRef<HTMLDivElement>(null);

  const handleArrowClick = () => {
    scrollToDivRef.current?.scrollIntoView();
  };

  // Monitor scroll position
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // When the element is partially out of view, show ArrowDown
        setIsScrolled(!entry.isIntersecting);

        // When the element is entirely out of view (scrolled past), show ArrowUp
        setIsScrolledPast(
          entry.boundingClientRect.top < 0 && !entry.isIntersecting
        );
      },
      { threshold: 0.1 } // Adjusts visibility threshold to trigger when 10% of the element is out of view
    );

    if (scrollToDivRef.current) {
      observer.observe(scrollToDivRef.current);
    }

    return () => {
      if (scrollToDivRef.current) {
        observer.unobserve(scrollToDivRef.current);
      }
    };
  }, []);

  const onRemoveAll = async () => {
    try {
      setLoadingChange(true);
      await cart.removeSelectedItems();
      toast.success("Tất cả lựa chọn trong giỏ hàng đã được xóa.");
    } catch (error) {
      setLoadingChange(false);
      toast.error("Xảy ra vấn đề khi xóa!");
    } finally {
      setLoadingChange(false);
    }
  };

  const selectedItems = items.filter((item) =>
    cart.selectedItems.includes(item.cartId)
  );

  //Trả về item.id và quantity của sản phẩm
  const getItemQuantities = cart.items.reduce((acc, item) => {
    const getQuantityMatchColorandSize = () => {
      const { price: priceSize, percentpromotion: percentpromotionSize } =
        getSizePrice(item, item.size);
      const { price: priceColor, percentpromotion: percentpromotionColor } =
        getColorPrice(item, item.color);
      const highestPrice = Math.max(priceSize, priceColor);

      if (
        highestPrice ===
        item.productdetail.price5 *
          ((100 - item.productdetail.percentpromotion5) / 100)
      ) {
        return item.productdetail.quantity5;
      }
      if (
        highestPrice ===
        item.productdetail.price4 *
          ((100 - item.productdetail.percentpromotion4) / 100)
      ) {
        return item.productdetail.quantity4;
      }
      if (
        highestPrice ===
        item.productdetail.price3 *
          ((100 - item.productdetail.percentpromotion3) / 100)
      ) {
        return item.productdetail.quantity3;
      }
      if (
        highestPrice ===
        item.productdetail.price2 *
          ((100 - item.productdetail.percentpromotion2) / 100)
      ) {
        return item.productdetail.quantity2;
      }
      return item.productdetail.quantity1;
    };

    const quantity = getQuantityMatchColorandSize();

    if (quantity > 0) {
      acc[item.id] = quantity;
    }
    return acc;
  }, {} as Record<string, number>);

  const totalAmounts = selectedItems.reduce(
    (total, item) => {
      const itemInCart = items.find(
        (cartItem) => cartItem.cartId === item.cartId
      );
      const quantity = itemInCart?.quantity || 1;

      if (!itemInCart || !itemInCart) {
        // Nếu itemInCart hoặc itemInCart.product là undefined, bỏ qua item này
        toast.error("Không tìm thấy sản phẩm!");
        return total;
      }
      //GetPrice dựa vào size
      const getPriceMatchColorandSize = () => {
        const { price: priceSize, percentpromotion: percentpromotionSize } =
          getSizePrice(itemInCart || "", itemInCart?.size);
        const { price: priceColor, percentpromotion: percentpromotionColor } =
          getColorPrice(itemInCart, itemInCart?.color);
        return Math.ceil(Math.max(priceSize, priceColor));
      };

      //GetPriceOld dựa vào color
      const getPriceOldMatchColorandSize = () => {
        const sizeOldPrice = getSizeOldPrice(itemInCart, itemInCart?.size);
        const colorOldPrice = getColorOldPrice(itemInCart, itemInCart?.color);
        return Math.ceil(Math.max(sizeOldPrice, colorOldPrice));
      };

      const itemTotalPrice = getPriceMatchColorandSize() * quantity;
      const itemTotalPriceOld = getPriceOldMatchColorandSize() * quantity;

      return {
        totalPrice: total.totalPrice + itemTotalPrice,
        totalPriceOld: total.totalPriceOld + itemTotalPriceOld,
      };
    },
    { totalPrice: 0, totalPriceOld: 0 }
  );
  // Tiền bảo hiểm
  const totalWarrantyAmount = selectedItems.reduce((total, item) => {
    const itemInCart = items.find(
      (cartItem) => cartItem.cartId === item.cartId
    );
    const quantity = itemInCart?.quantity || 1;

    const selectedWarranty = String(itemInCart?.warranty || "0");
    const warrantyAmount = selectedWarranty ? parseFloat(selectedWarranty) : 0;

    return total + warrantyAmount * quantity;
  }, 0);
  //Tổng giá tiền
  const totalAmount = totalAmounts.totalPrice;
  //Giá client cần thanh toán
  const TotalAmountCoins = totalAmount + totalWarrantyAmount;

  const totalAmountOld = totalAmounts.totalPriceOld + totalWarrantyAmount;
  const totalAmountOldCoin = Math.ceil(totalAmountOld);

  // Tạo mảng riêng cho size và color và quantity
  //size
  const selectedSizes = selectedItems.map((item) => {
    const itemInCart = items.find(
      (cartItem) => cartItem.cartId === item.cartId
    );
    return itemInCart?.size;
  });

  //color
  const selectedColors = selectedItems.map((item) => {
    const itemInCart = items.find(
      (cartItem) => cartItem.cartId === item.cartId
    );
    return itemInCart?.color;
  });

  //quantity
  const selectedQuantities = selectedItems.map((item) => {
    const itemInCart = items.find(
      (cartItem) => cartItem.cartId === item.cartId
    );
    return itemInCart?.quantity || 1;
  });

  //Dựa vào cartId lấy ra productId của sản phẩm
  const selectedProductIds = selectedItems.map((item) => {
    const itemInCart = items.find(
      (cartItem) => cartItem.cartId === item.cartId
    );
    return itemInCart?.id || 1;
  });

  const handleCheckoutcash = () => {
    try {
      setLoadingChange(true);
      router.push("/checkoutcash");
    } catch (error) {
      if (
        (error as { response?: { data?: { error?: string } } }).response &&
        (error as { response: { data?: { error?: string } } }).response.data &&
        (error as { response: { data: { error?: string } } }).response.data
          .error
      ) {
        // Hiển thị thông báo lỗi cho người dùng
        toast.error(
          (error as { response: { data: { error: string } } }).response.data
            .error
        );
      } else {
        // Hiển thị thông báo lỗi mặc định cho người dùng
        toast.error("An error occurred during check cash.");
      }
    } finally {
      setLoadingChange(false);
    }
  };

  const handleCheckoutVisa = async (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    event.preventDefault();
    try {
      setLoadingChange(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
        {
          productIds: selectedProductIds,
          pricesales: TotalAmountCoins,
          quantity: selectedQuantities,
          priceold: totalAmountOldCoin,
          warranty: totalWarrantyAmount,
          sizes: selectedSizes,
          colors: selectedColors,
          userId: userId || "",
        }
      );

      window.location = response.data.url;
    } catch (error) {
      if (
        (error as { response?: { data?: { error?: string } } }).response &&
        (error as { response: { data?: { error?: string } } }).response.data &&
        (error as { response: { data: { error?: string } } }).response.data
          .error
      ) {
        // Hiển thị thông báo lỗi cho người dùng
        toast.error(
          (error as { response: { data: { error: string } } }).response.data
            .error
        );
      } else {
        // Hiển thị thông báo lỗi mặc định cho người dùng
        toast.error("An error occurred during checkout.");
      }
    } finally {
      setLoadingChange(false);
    }
  };

  const onCheckout = (event: React.MouseEvent<HTMLDivElement>) => {
    try {
      if (TotalAmountCoins <= 50000) {
        setOpenPaymentWarning(true);
      } else if (paymentMethod === PaymentMethodType.CashPayment) {
        handleCheckoutcash();
      } else if (paymentMethod === PaymentMethodType.VisaPayment) {
        handleCheckoutVisa(event);
      }
    } catch (error) {
      toast.error("An error occurred during checkout.");
    }
  };

  return (
    <>
      <AlertModal
        title="Bạn có chắc chắn xóa tất cả sản phẩm đã chọn không?"
        message="Hành động này không thể hoàn tác."
        isOpen={openRemoveAll}
        onClose={() => setOpenRemoveAll(false)}
        onConfirm={onRemoveAll}
      />
      <SeePaymentWarningModal
        isOpen={openPaymentWarning}
        onClose={() => setOpenPaymentWarning(false)}
      />

      {/* Handle cho điện thoại hiển thị scroll nhanh chống xuống thanh toán */}
      {isScrolled && (
        <div
          className="fixed z-[9998] bottom-20 md:hidden p-2 bg-red-500 text-slate-200 shadow-lg rounded-sm"
          onClick={handleArrowClick}
        >
          {/* Show ArrowDown if not scrolled past, ArrowUp if scrolled past */}
          {isScrolledPast ? (
            <ArrowUp className="w-5 h-5" />
          ) : (
            <ArrowDown className="w-5 h-5" />
          )}
        </div>
      )}

      <div
        ref={scrollToDivRef}
        className="md:sticky bottom-20 md:bottom-0 z-[9998] rounded-lg dark:bg-slate-600 bg-gray-50 p-4 lg:col-span-5 lg:mt-0 "
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-3">
            <input
              className="w-4 h-4"
              type="checkbox"
              checked={
                cart.items.length > 0 &&
                cart.selectedItems.length ===
                  cart.items.filter(
                    (item) =>
                      getItemQuantities[item.id] !== undefined &&
                      getItemQuantities[item.id] >= (item.quantity || 0)
                  ).length
              }
              onChange={() => {
                const selectableItems = cart.items
                  .filter(
                    (item) =>
                      getItemQuantities[item.id] !== undefined &&
                      getItemQuantities[item.id] >= (item.quantity || 0)
                  )
                  .map((item) => item.cartId);

                cart.toggleSelectAll(selectableItems);
              }}
              disabled={loadingChange}
            />
            <h2 className="text-base md:text-lg font-medium text-gray-900">
              Chọn tất cả{" "}
              {cart.selectedItems.length <= 0 ? (
                ""
              ) : (
                <span className="text-gray-400 text-xs md:text-sm">
                  (Đã chọn {cart.selectedItems.length} sản phẩm)
                </span>
              )}
            </h2>
          </div>
          <Button
            size="icon"
            onClick={() => setOpenRemoveAll(true)}
            disabled={loadingChange || selectedItems.length === 0}
            className="justify-around flex items-center rounded-full w-10 h-10 bg-red-500 hover:bg-red-500 hover:bg-opacity-30 hover:text-slate-900 text-white"
          >
            <Trash2 />
          </Button>
        </div>
        <div className="mt-2 space-y-2">
          <div className="flex items-center justify-between border-t border-gray-200 py-2">
            <div className="text-base font-medium text-gray-900">Tổng tiền</div>
            <Currency
              value={totalAmount}
              valueold={totalAmounts.totalPriceOld}
            />
          </div>

          <div className="flex items-center justify-between border-t border-gray-200 py-2">
            <div className="text-base font-medium text-gray-900">
              Hình thức thanh toán
            </div>
            <Select
              disabled={selectedItems.length === 0}
              value={paymentMethod}
              onValueChange={(value: PaymentMethodType) =>
                setPaymentMethod(value)
              }
            >
              <SelectTrigger className="w-[180px] md:w-[200px] py-2 px-4 text-left bg-slate-200 dark:bg-slate-900 text-slate-900 dark:text-slate-200 rounded-md shadow-sm border border-gray-300 focus:outline-none">
                <SelectValue placeholder="Chọn phương thức thanh toán">
                  {paymentMethod === PaymentMethodType.CashPayment
                    ? "Thanh toán tiền mặt"
                    : "Thanh toán Visa"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="z-[99999]">
                <SelectItem value={PaymentMethodType.CashPayment}>
                  Thanh toán tiền mặt
                </SelectItem>
                <SelectItem value={PaymentMethodType.VisaPayment}>
                  Thanh toán Visa
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between border-t border-gray-200 py-2">
            <div className="text-base font-medium text-gray-900">Xu</div>
            <Currency value={-0} />
          </div>

          <div className="flex items-center justify-between border-t border-gray-200 py-2">
            <div className="text-base font-medium text-gray-900">
              Tiền bảo hiểm
            </div>
            <Currency value={totalWarrantyAmount} />
          </div>

          <div className="flex items-center justify-between border-t border-gray-200 py-2">
            <div className="text-base font-medium text-gray-900">
              Số tiền cần thanh toán
            </div>
            <Currency value={TotalAmountCoins} />
          </div>

          <div
            onClick={
              selectedItems.length === 0 || loadingChange
                ? (e: React.MouseEvent<HTMLDivElement>) => e.preventDefault()
                : (e: React.MouseEvent<HTMLDivElement>) => onCheckout(e)
            }
            className={`${
              selectedItems.length === 0 || loadingChange
                ? "pointer-events-none opacity-50"
                : ""
            }`}
          >
            <div className="container w-[350px] hover:w-[360px] md:w-[650px] lg:w-[1050px] md:max-w-3xl lg:max-w-7xl group md:hover:w-[700px] lg:hover:w-[1100px]">
              <div className="left-side">
                <div className="card">
                  <div className="card-line"></div>
                  <div className="buttons"></div>
                </div>
                <div className="post">
                  <div className="post-line"></div>
                  <div className="screen">
                    <div className="dollar">$</div>
                  </div>
                  <div className="numbers"></div>
                  <div className="numbers-line2"></div>
                </div>
              </div>
              <div className="right-side">
                <div className="new">Thanh toán</div>

                <svg
                  viewBox="0 0 451.846 451.847"
                  height="512"
                  width="512"
                  xmlns="http://www.w3.org/2000/svg"
                  className="arrow"
                >
                  <path
                    fill="#cfcfcf"
                    data-old_color="#000000"
                    className="active-path"
                    data-original="#000000"
                    d="M345.441 248.292L151.154 442.573c-12.359 12.365-32.397 12.365-44.75 0-12.354-12.354-12.354-32.391 0-44.744L278.318 225.92 106.409 54.017c-12.354-12.359-12.354-32.394 0-44.748 12.354-12.359 32.391-12.359 44.75 0l194.287 194.284c6.177 6.18 9.262 14.271 9.262 22.366 0 8.099-3.091 16.196-9.267 22.373z"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sumary;
