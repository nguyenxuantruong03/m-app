"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import Currency from "@/components/ui/currency";
import ButtonCheckin from "@/components/ui/buttoncheckin";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import "../checkout.css";
import SeePaymentWarningModal from "@/components/(client)/modal/see-warning-model5";
import CheckoutDbModal from "@/components/(client)/modal/checkout-db-modal";
import { useParams } from "next/navigation";
import useCartdb from "@/hooks/client/db/use-cart-db";
import { AlertModal } from "@/components/modals/alert-modal";
import {
  getColorOldPrice,
  getColorPrice,
  getSizeOldPrice,
  getSizePrice,
} from "@/components/(client)/export-product-compare/size-color/match-color-size";

interface SumaryProps {
  userId: string;
  role: string;
  setLoadingChange: Dispatch<SetStateAction<boolean>>;
  loadingChange: boolean;
}

const SumaryDb: React.FC<SumaryProps> = ({
  userId,
  role,
  loadingChange,
  setLoadingChange,
}) => {
  const cartdb = useCartdb();
  const items = useCartdb((state) => state.items);
  const param = useParams();
  const [totalCoins, setTotalCoins] = useState<number>(0);
  const [openPaymentDanger, setOpenPaymentDanger] = useState(false);
  const [openPaymentWarning, setOpenPaymentWarning] = useState(false);
  const [openRemoveAll, setOpenRemoveAll] = useState(false);

  const onRemoveAll = async () => {
    try {
      setLoadingChange(true);
      await cartdb.removeSelectedItems(userId);
        // Sau khi xóa, đảm bảo rằng các trạng thái được cập nhật
      await cartdb.fetchCartItems(userId); // Làm mới dữ liệu giỏ hàng
      toast.success("Tất cả lựa chọn trong giỏ hàng đã được xóa.");
    } catch (error) {
      setLoadingChange(false);
      toast.error("Xảy ra vấn đề khi xóa!");
    } finally {
      setLoadingChange(false);
    }
    setOpenRemoveAll(false);
  };

  const selectedItems = items.filter((item) =>
    cartdb.selectedItems.includes(item.id)
  );

  //Trả về item.id và quantity của sản phẩm
  const getItemQuantities = cartdb.items.reduce((acc, item) => {
    const getQuantityMatchColorandSize = () => {
      const sizePrice = getSizePrice(item.product, item.size);
      const colorPrice = getColorPrice(item.product, item.color);
      const highestPrice = Math.max(sizePrice, colorPrice);
  
      if (highestPrice === item.product.productdetail.price5 * ((100 - item.product.productdetail.percentpromotion5) / 100)) {
        return item.product.productdetail.quantity5;
      }
      if (highestPrice === item.product.productdetail.price4 * ((100 - item.product.productdetail.percentpromotion4) / 100)) {
        return item.product.productdetail.quantity4;
      }
      if (highestPrice === item.product.productdetail.price3 * ((100 - item.product.productdetail.percentpromotion3) / 100)) {
        return item.product.productdetail.quantity3;
      }
      if (highestPrice === item.product.productdetail.price2 * ((100 - item.product.productdetail.percentpromotion2) / 100)) {
        return item.product.productdetail.quantity2;
      }
      return item.product.productdetail.quantity1;
    };
    
    const quantity = getQuantityMatchColorandSize();
    
    if (quantity > 0) {
      acc[item.id] = quantity;
    }
    return acc;
  }, {} as Record<string, number>);
  
  // Total Coins
  useEffect(() => {
    // Load totalCoins from the server using GET request
    axios.get(`/api/${param.storeId}/wheelSpin`).then((response) => {
      setTotalCoins(response.data.totalCoins);
    });
  }, [param.storeId]);

  //Get dữ liêu trong database của CartItem
  useEffect(() => {
    if (role !== "GUEST" && userId) {
      const fetchData = async () => {
        try {
          setLoadingChange(true);
          await cartdb.fetchCartItems(userId);
        } catch (error) {
          console.error(error);
          setLoadingChange(false);
        } finally {
          setLoadingChange(false);
        }
      };
      fetchData();
    }
  }, []);

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
        const sizePrice = getSizePrice(
          itemInCart?.product || "",
          itemInCart?.size
        );
        const colorPrice = getColorPrice(itemInCart.product, itemInCart?.color);
        return Math.ceil(Math.max(sizePrice, colorPrice));
      };

      //GetPriceOld dựa vào color
      const getPriceOldMatchColorandSize = () => {
        const sizeOldPrice = getSizeOldPrice(
          itemInCart?.product,
          itemInCart?.size
        );
        const colorOldPrice = getColorOldPrice(
          itemInCart.product,
          itemInCart?.color
        );
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
    const itemInCart = items.find((cartItem) => cartItem.id === item.id);
    const quantity = itemInCart?.quantity || 1;

    const selectedWarranty = String(itemInCart?.warranty || "0");

    const warrantyAmount = selectedWarranty ? parseFloat(selectedWarranty) : 0;

    return total + warrantyAmount * quantity;
  }, 0);

  //Tổng giá tiền
  const totalAmount = totalAmounts.totalPrice;
  //Giá client cần thanh toán
  const TotalAmountCoins = totalAmount - totalCoins + totalWarrantyAmount;

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
      <CheckoutDbModal
        isOpen={openPaymentDanger}
        onClose={() => setOpenPaymentDanger(false)}
      />
      <div className="sticky bottom-0 z-[9998] mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-3">
            {/* Input ngăn chặn sản phẩm "hết hàng" quantity ===0 và "Không đủ hàng" nếu quantity hiện tại lớn hơn quantity trong kho  */}
          <input
              className="w-4 h-4"
              type="checkbox"
              checked={
                cartdb.items.length > 0 &&
                cartdb.selectedItems.length === cartdb.items
                  .filter(item => getItemQuantities[item.id] !== undefined && getItemQuantities[item.id] >= (item.quantity || 0))
                  .length
              }
              onChange={() => {
                const selectableItems = cartdb.items
                  .filter(item => getItemQuantities[item.id] !== undefined && getItemQuantities[item.id] >= (item.quantity || 0))
                  .map(item => item.id);

                cartdb.toggleSelectAll(selectableItems);
              }}
              disabled={loadingChange}
            />


            <h2 className="text-lg font-medium text-gray-900">
              Chọn tất cả{" "}
              {cartdb.selectedItems.length <= 0 ? (
                ""
              ) : (
                <span className="text-gray-400 text-md">
                  (Đã chọn {cartdb.selectedItems.length} sản phẩm)
                </span>
              )}
            </h2>
          </div>
          <ButtonCheckin
            onClick={() => setOpenRemoveAll(true)}
            disabled={selectedItems.length === 0 || loadingChange}
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
            <Currency value={-totalCoins} />
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

        <Button
          disabled={selectedItems.length === 0 || loadingChange}
          onClick={onCheckout}
          className="mt-3"
        >
          <div className="container w-[350px] hover:w-[360px] md:w-[650px] lg:w-[1050px] mt-6 md:max-w-3xl lg:max-w-7xl group md:hover:w-[700px] lg:hover:w-[1100px]">
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
      </div>
    </>
  );
};

export default SumaryDb;
