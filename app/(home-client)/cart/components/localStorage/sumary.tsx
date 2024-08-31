"use client";
import useCart from "@/hooks/client/use-cart";
import { Dispatch, SetStateAction, useState } from "react";
import toast from "react-hot-toast";
import Currency from "@/components/ui/currency";
import ButtonCheckin from "@/components/ui/buttoncheckin";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import "../checkout.css";
import SeePaymentWarningModal from "@/components/(client)/modal/see-warning-model5";
import CheckoutLocalModal from "@/components/(client)/modal/checkout-local-modal";
import {
  getColorOldPrice,
  getColorPrice,
  getSizeOldPrice,
  getSizePrice,
} from "@/components/(client)/export-product-compare/size-color/match-color-size";

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
  const cart = useCart();
  const items = useCart((state) => state.items);
  const [openPaymentDanger, setOpenPaymentDanger] = useState(false);
  const [openPaymentWarning, setOpenPaymentWarning] = useState(false);

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
      const { price: priceSize, percentpromotion: percentpromotionSize } = getSizePrice(item, item.size);
      const { price: priceColor, percentpromotion: percentpromotionColor } = getColorPrice(item, item.color);
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
      const itemInCart = items.find((cartItem) => cartItem.cartId === item.cartId);
      const quantity = itemInCart?.quantity || 1;

      if (!itemInCart || !itemInCart) {
        // Nếu itemInCart hoặc itemInCart.product là undefined, bỏ qua item này
        toast.error("Không tìm thấy sản phẩm!");
        return total;
      }
      //GetPrice dựa vào size
      const getPriceMatchColorandSize = () => {
        const { price: priceSize, percentpromotion: percentpromotionSize } = getSizePrice(itemInCart || "", itemInCart?.size);
        const { price: priceColor, percentpromotion: percentpromotionColor } = getColorPrice(itemInCart, itemInCart?.color);
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
    const itemInCart = items.find((cartItem) => cartItem.cartId === item.cartId);
    const quantity = itemInCart?.quantity || 1;

    const selectedWarranty = String(itemInCart?.warranty || "0");
    const warrantyAmount = selectedWarranty ? parseFloat(selectedWarranty) : 0;

    return total + warrantyAmount * quantity;
  }, 0);
  //Tổng giá tiền
  const totalAmount = totalAmounts.totalPrice;
  //Giá client cần thanh toán
  const TotalAmountCoins = totalAmount + totalWarrantyAmount;

  const onCheckout = () => {
    try {
      if (TotalAmountCoins > 30000) {
        setOpenPaymentDanger(true);
      } else {
        setOpenPaymentWarning(true);
      }
    } catch (error) {
      toast.error("An error occurred during checkout.");
    }
  };

  return (
    <>
      <SeePaymentWarningModal
        isOpen={openPaymentWarning}
        onClose={() => setOpenPaymentWarning(false)}
      />
      <CheckoutLocalModal
        isOpen={openPaymentDanger}
        onClose={() => setOpenPaymentDanger(false)}
      />
      <div className="sticky bottom-0 z-[9998] mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
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
            <h2 className="text-lg font-medium text-gray-900">
              Chọn tất cả{" "}
              {cart.selectedItems.length <= 0 ? (
                ""
              ) : (
                <span className="text-gray-400 text-md">
                  (Đã chọn {cart.selectedItems.length} sản phẩm)
                </span>
              )}
            </h2>
          </div>
          <ButtonCheckin
            onClick={onRemoveAll}
            disabled={selectedItems.length === 0}
            className="justify-around flex items-center rounded-full w-10 h-10 bg-red-500 hover:bg-red-500 hover:bg-opacity-30 hover:text-slate-900 text-white"
          >
            <Trash2 />
          </ButtonCheckin>
        </div>
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between border-t border-gray-200 pt-4">
            <div className="text-base font-medium text-gray-900">Tổng tiền</div>
            <Currency
              value={totalAmount}
              valueold={totalAmounts.totalPriceOld}
            />
          </div>

          <div className="flex items-center justify-between border-t border-gray-200 pt-4">
            <div className="text-base font-medium text-gray-900">Xu</div>
            <Currency value={-0} />
          </div>

          <div className="flex items-center justify-between border-t border-gray-200 pt-4">
            <div className="text-base font-medium text-gray-900">
              Tiền bảo hiểm
            </div>
            <Currency value={totalWarrantyAmount} />
          </div>

          <div className="flex items-center justify-between border-t border-gray-200 pt-4">
            <div className="text-base font-medium text-gray-900">
              Số tiền cần thanh toán
            </div>
            <Currency value={TotalAmountCoins} />
          </div>
        </div>

        <Button disabled={selectedItems.length === 0} onClick={onCheckout}>
          <div className="container w-[350px] hover:w-[360px] md:w-[650px] lg:w-[1050px]  mt-6 md:max-w-3xl lg:max-w-7xl group md:hover:w-[700px] lg:hover:w-[1150px] ">
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
        </Button>
        {/* <ModalProvider /> */}
      </div>
    </>
  );
};

export default Sumary;
