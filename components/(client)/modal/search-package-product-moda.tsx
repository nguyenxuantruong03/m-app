"use client";

import Modal from "@/components/ui/modal";
import { Order, OrderItem, ProductType } from "@/types/type";
import { useEffect, useState } from "react";
import {
  getColorPrice,
  getSizePrice,
} from "../export-product-compare/size-color/match-color-size";
import Image from "next/image";
import { formatter } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import Currency from "@/components/ui/currency";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";
import StatusProduct from "@/app/[locale]/(home-client)/warehouse/components/ui/statusProduct";

interface SeatchPackageProductProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order[];
  inputValue: string;
}

export const SeatchPackageProduct: React.FC<SeatchPackageProductProps> = ({
  isOpen,
  onClose,
  order,
  inputValue,
}) => {
  const t = useTranslations();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const getRouteBasedOnProductType = (productType: any) => {
    switch (productType.toLowerCase()) {
      case "product":
        return "product0";
      case "product1":
        return "product1";
      case "product2":
        return "product2";
      case "product3":
        return "product3";
      case "product4":
        return "product4";
      case "product5":
        return "product5";
      case "product6":
        return "product6";
      case "product7":
        return "product7";
      case "product8":
        return "product8";
      case "product9":
        return "product9";
      case "product10":
        return "product10";
      case "product11":
        return "product11";
      default:
        return ""; // Handle the default case as needed
    }
  };

  const handleClick = (productType: ProductType, productName: string) => {
    const route = getRouteBasedOnProductType(productType);
    // // -----------Log the values for debugging----------------
    // console.log('Product Type:', data.productType);
    // console.log('Route:', route);
    if (route) {
      // Construct the complete URL
      const href = `/${route}/${productName}`;
      // Use the Link component for navigation
      router.push(href);
    } else {
      toast.error(t("toastError.somethingWentWrong"));
    }
  };

  // Function to calculate the total price for an order
  const calculateTotalPrice = (order: Order) => {
    return order.orderItem.reduce((total, orderItem) => {
      // Calculate price based on size and color
      const getPriceMatchColorandSize = () => {
        if (orderItem.product && orderItem.size && orderItem.color) {
          const { price: priceSize, percentpromotion: percentpromotionSize } =
            getSizePrice(orderItem.product, orderItem.size);
          const { price: priceColor, percentpromotion: percentpromotionColor } =
            getColorPrice(orderItem.product, orderItem.color);

          return Math.ceil(Math.max(priceSize, priceColor));
        }
        return 0; // Fallback price if product or product is undefined
      };

      return total + getPriceMatchColorandSize() * Number(orderItem.quantity);
    }, 0);
  };

  const matchId = order.filter((item) => item.id === inputValue);

  return (
    <Modal
      title={t("warehouse.productDetail")}
      description={""}
      isOpen={isOpen}
      onClose={onClose}
    >
      {matchId.length === 0 && <>{t("warehouse.cannotFindProductId")}</>}
      {matchId.map((order: Order) => (
        <div key={order.id} className="bg-zinc-400 bg-opacity-10 p-5 mt-5">
          {order.orderItem.map((orderItem: OrderItem, index: number) => {
            const imageUrl: string | undefined =
              orderItem?.product?.images[0].url; // Adjust this line according to your actual data structure
            const productHeading = orderItem?.product?.heading || "404";

            const sizes = orderItem.size
              ? orderItem.size.split(" ").map((size) => size.trim())
              : "None";
            const colors = orderItem.color
              ? orderItem.color.split(" ").map((color) => color.trim())
              : "None";

            // --------------Giải thích về %-------------
            // const sizes = ["S", "M", "L"];
            // const colors = ["Đỏ", "Xanh"];

            // Nếu index là 4, các phép toán sẽ là:

            // index % sizes.length = 4 % 3 = 1, vì vậy selectedSize sẽ là sizes[1], tức là "M".
            // index % colors.length = 4 % 2 = 0, vì vậy selectedColor sẽ là colors[0], tức là "Đỏ".

            // Assign dynamic size and color based on index
            const selectedSize = sizes[index % sizes.length];
            const selectedColor = colors[index % colors.length];

            //GetPrice dựa vào size và color
            const getPriceMatchColorandSize = () => {
              if (orderItem.product) {
                const {
                  price: priceSize,
                  percentpromotion: percentpromotionSize,
                } = getSizePrice(orderItem.product, selectedSize);
                const {
                  price: priceColor,
                  percentpromotion: percentpromotionColor,
                } = getColorPrice(orderItem.product, selectedColor);

                return Math.ceil(Math.max(priceSize, priceColor));
              }
              return 0; // Fallback price if product or productct is undefined
            };

            return (
              <>
                <div
                  key={orderItem.id}
                  className="flex items-center cursor-pointer"
                  onClick={() => {
                    if (
                      orderItem.product?.productType &&
                      orderItem.product?.name
                    ) {
                      handleClick(
                        orderItem.product.productType,
                        orderItem.product.name
                      );
                    } else {
                      toast.error(t("toastError.somethingWentWrong"));
                    }
                  }}
                >
                  <div className="w-1/12">
                    {typeof imageUrl === "string" ? (
                      <Image
                        src={imageUrl}
                        alt={productHeading}
                        className="border border-gray-300"
                        width={100}
                        height={100}
                      />
                    ) : (
                      <Image
                        src="/images/fallback.jpg"
                        alt="Fallback Image"
                        width={100}
                        height={100}
                      />
                    )}
                  </div>
                  <div className="w-3/4 pl-3">
                    <p className="truncate max-w-xl">
                      {orderItem.product?.heading}
                    </p>
                    <p className="flex text-xs text-gray-500">
                      {t("product.colorCategory")}
                      <div
                        className="h-4 w-4 rounded-full ml-2"
                        style={{ backgroundColor: selectedColor }}
                      />
                    </p>
                    <p className="text-xs text-gray-500">
                      {t("product.sizeCategory")} {selectedSize}
                    </p>
                    <p>x{orderItem.quantity}</p>
                  </div>
                  <div className="w-1/5 text-end">
                    {formatter.format(getPriceMatchColorandSize())}
                  </div>
                </div>

                <Separator className="my-2 bg-gray-300" />
              </>
            );
          })}

          {/* Đây là return ngoài order còn bên trong kia orderItem nó sẽ lặp lại trên mỗi Item còn đây chỉ lặp trên 1 order 1 cái*/}
          <div className="flex items-center justify-between mt-8">
            <div>
              {order.status === "Cho_xac_nhan" && (
                <StatusProduct
                  updatedAt={order.updatedAt}
                  titleStatus={t("warehouse.waitingforConfirmation")}
                  classTitleStatus="text-yellow-600"
                  noneTitleStatus={true}
                  status={t("warehouse.processing")}
                  classStatus="text-red-500"
                />
              )}
              {order.status === "Soan_hang" && (
                <StatusProduct
                  updatedAt={order.updatedAt}
                  titleStatus={t("warehouse.preparingGoods")}
                  classTitleStatus="text-yellow-600"
                  noneTitleStatus={true}
                  status={t("warehouse.packingGoods")}
                  classStatus="text-red-500"
                />
              )}
              {order.status === "Cho_lay_hang" && (
                <StatusProduct
                  updatedAt={order.updatedAt}
                  titleStatus={t("warehouse.shippedToShipper")}
                  classTitleStatus="text-yellow-600"
                  noneTitleStatus={true}
                  status={t("warehouse.handedOverToShipper")}
                  classStatus="text-red-500"
                />
              )}
              {order.status === "Dang_giao" && (
                <StatusProduct
                  updatedAt={order.updatedAt}
                  titleStatus={t("warehouse.orderShipping")}
                  classTitleStatus="text-yellow-600"
                  noneTitleStatus={true}
                  status={t("warehouse.delivering")}
                  classStatus="text-red-500"
                />
              )}
              {order.status === "Giao_lai_hang" && (
                <StatusProduct
                  updatedAt={order.updatedAt}
                  titleStatus={t("warehouse.reDelivering")}
                  classTitleStatus="text-yellow-600"
                  noneTitleStatus={true}
                  status={t("warehouse.reDeliveringNow")}
                  classStatus="text-red-500"
                />
              )}
              {order.status === "Da_giao" && (
                <StatusProduct
                  updatedAt={order.updatedAt}
                  classTitleStatus="text-green-600"
                  noneTitleStatus={true}
                  status={t("warehouse.completed")}
                  classStatus="text-red-500"
                />
              )}
              {order.status === "Da_huy" && (
                <StatusProduct
                  updatedAt={order.updatedAt}
                  titleStatus={t("warehouse.orderCancelled")}
                  classTitleStatus="text-red-600"
                  noneTitleStatus={true}
                  status={t("warehouse.cancelOrder")}
                  classStatus="text-red-500"
                />
              )}
              {order.status === "Tra_hang" && (
                <StatusProduct
                  updatedAt={order.updatedAt}
                  titleStatus={t("warehouse.returnToShop")}
                  classTitleStatus="text-red-600"
                  noneTitleStatus={true}
                  status={t("warehouse.returnItem")}
                  classStatus="text-red-500"
                />
              )}
              {order.status === "Shipper_chuan_bi" && (
                <StatusProduct
                  updatedAt={order.updatedAt}
                  titleStatus={t("warehouse.shipperConfirmingOrder")}
                  classTitleStatus="text-red-600"
                  noneTitleStatus={true}
                  status={t("warehouse.shipperPreparingToArrive")}
                  classStatus="text-red-500"
                />
              )}
              {order.status === "Shipper_dang_den" && (
                <StatusProduct
                  updatedAt={order.updatedAt}
                  titleStatus={t("warehouse.shipperPickingUpOrder")}
                  classTitleStatus="text-red-600"
                  noneTitleStatus={true}
                  status={t("warehouse.receiveItem")}
                  classStatus="text-red-500"
                />
              )}
              {order.status === "Da_nhan_tra_hang" && (
                <StatusProduct
                  updatedAt={order.updatedAt}
                  titleStatus={t("warehouse.itemReceivedWithIssue")}
                  classTitleStatus="text-red-600"
                  noneTitleStatus={true}
                  status={t("warehouse.returnItemSuccess")}
                  classStatus="text-red-500"
                />
              )}
              {order.status === "Nhan_tai_cua_hang" && (
                <StatusProduct
                  updatedAt={order.updatedAt}
                  titleStatus={t("warehouse.pickUpAtStore")}
                  classTitleStatus="text-yellow-600"
                  noneTitleStatus={true}
                  status={t("warehouse.pickUpAtStoreUpperCase")}
                  classStatus="text-red-500"
                />
              )}
              {order.status === "Soan_hang_nhan_tai_cua_hang" && (
                <StatusProduct
                  updatedAt={order.updatedAt}
                  titleStatus={t("warehouse.preparingOrder")}
                  classTitleStatus="text-yellow-600"
                  noneTitleStatus={true}
                  status={t("warehouse.prepareOrder")}
                  classStatus="text-red-500"
                />
              )}
              {order.status === "Da_soan_hang_xong" && (
                <StatusProduct
                  updatedAt={order.updatedAt}
                  titleStatus={t("warehouse.oderPrepared")}
                  classTitleStatus="text-yellow-600"
                  noneTitleStatus={true}
                  status={t("warehouse.customerPickUp")}
                  classStatus="text-red-500"
                />
              )}
              {order.status === "Da_nhan_tai_cua_hang" && (
                <StatusProduct
                  updatedAt={order.updatedAt}
                  classTitleStatus="text-green-600"
                  noneTitleStatus={true}
                  status={t("warehouse.completed")}
                  classStatus="text-red-500"
                />
              )}
            </div>
            <div className="flex items-center space-x-2">
              <span>{t("warehouse.totalAmount")}:</span>{" "}
              <Currency value={calculateTotalPrice(order)} />
            </div>
          </div>
        </div>
      ))}
    </Modal>
  );
};
