"use client";
import { AlertTriangle } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import useCartdb from "@/hooks/client/db/use-cart-db";
import { useCurrentUser } from "@/hooks/use-current-user";
import {
  getColorOldPrice,
  getColorPrice,
  getSizeOldPrice,
  getSizePrice,
} from "@/components/(client)/export-product-compare/size-color/match-color-size";

interface SeePaymentDangerProps {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
  title?: string;
}

const CheckoutDbModal: React.FC<SeePaymentDangerProps> = ({
  isOpen,
  onClose,
  message,
  title,
}) => {
  const user = useCurrentUser();
  const cartdb = useCartdb();
  const param = useParams();
  const router = useRouter();
  const items = useCartdb((state) => state.items);
  const [totalCoins, setTotalCoins] = useState<number>(0);

  const handleCheckoutcash = () => {
    router.push("/checkoutcash");
  };

  const selectedItems = items.filter((item) =>
    cartdb.selectedItems.includes(item.id)
  );

  //Total Coins
  useEffect(() => {
    // Load totalCoins from the server using GET request
    axios.get(`/api/${param.storeId}/wheelSpin`).then((response) => {
      setTotalCoins(response.data.totalCoins);
    });
  }, [param.storeId, user?.role]);

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

      //GetPrice dựa vào color
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

  const totalAmount = totalAmounts.totalPrice + totalWarrantyAmount;
  const TotalAmountCoins = Math.ceil(totalAmount - totalCoins);

  const totalAmountOld = totalAmounts.totalPriceOld + totalWarrantyAmount;
  const totalAmountOldCoin = Math.ceil(totalAmountOld - totalCoins);

  // Tạo mảng riêng cho size và color và quantity
  //size
  const selectedSizes = selectedItems
    .map((item) => {
      const itemInCart = items.find((cartItem) => cartItem.id === item.id);
      return itemInCart?.size;
    })

  //color
  const selectedColors = selectedItems
    .map((item) => {
      const itemInCart = items.find((cartItem) => cartItem.id === item.id);
      return itemInCart?.color;
    })

  //quantity
  const selectedQuantities = selectedItems.map((item) => {
    const itemInCart = items.find((cartItem) => cartItem.id === item.id);
    return itemInCart?.quantity || 1;
  });

  //Dựa vào cartItemId lấy ra id của sản phẩm
  const selectedProductIds = selectedItems.map((item) => {
    const itemInCart = items.find((cartItem) => cartItem.id === item.id);
    return itemInCart?.product.id || 1;
  });

  const onCheckout = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
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
          userId: user?.id,
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
    }
  };

  return (
    <Modal
      title={title || "Thông báo thanh toán online!"}
      description={
        message ||
        "Số tiền cần thanh toán là " +
          TotalAmountCoins +
          " VNĐ. Bạn có muốn thanh toán ngay không?"
      }
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="w-full">
        <div className=" bg-yellow-400 rounded-md font-bold p-2  ">
          <h1 className="ml-[120px] md:ml-[320px] flex items-center font-bold">
            Lưu ý <AlertTriangle className="w-5 h-5 ml-1" />{" "}
          </h1>
        </div>

        <p className="mt-4">
          Khi thanh toán quý khách tránh làm mới trang và thoát trang bằng nút
          quay lại trên chuột , nếu muốn quay lại thì đợi load xong, sau đó rồi
          ấn mũi tên để quay trở lại trang đảm bảo sản phẩm sẽ không bị mất khi
          chưa ghi thông tin thanh toán. Nếu khách hàng không muốn trả tiền
          online có thể liên lạc{" "}
          <span className="text-red-400 font-semibold">0352261103</span> trả lời
          nhanh chóng cho quý khách trả tiền mặt.
        </p>
        <div className="mt-4 text-end">
          <span
            onClick={onClose}
            className="underline text-lg mr-3 cursor-pointer"
          >
            Back
          </span>
          <Button onClick={onCheckout}>Thanh toán visa</Button>
          <Button className="ml-3" onClick={handleCheckoutcash}>
            Thanh toán tiền mặt
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default CheckoutDbModal;
