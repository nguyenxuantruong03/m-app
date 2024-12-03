"use client";

import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import { Order, ProductType } from "@/types/type";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getColorPrice,
  getSizePrice,
} from "../export-product-compare/size-color/match-color-size";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import useCartdb from "@/hooks/client/db/use-cart-db";
import {
  getOutOfStockMessage,
  getToastError,
  translateAddProduct,
  translateAddToCartError,
  translateAgree,
  translateCancel,
  translateOutOfStock,
  translateOutOfStockCartError,
  translateProductQuantityError,
} from "@/translate/translate-client";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | undefined;
  message?: string;
  title?: string;
  user: any;
  languageToUse: string;
}

export const PackageModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  message,
  title,
  order,
  user,
  languageToUse,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const cartdb = useCartdb();

  //languages
  const toastErrorMessage = getToastError(languageToUse);
  const productQuantityErrorMessage =
    translateProductQuantityError(languageToUse);
  const addToCartErrorMessage = translateAddToCartError(languageToUse);
  const outOfStockInventoryMessage = translateOutOfStock(languageToUse);
  const outOfStockCartErrorMessage =
    translateOutOfStockCartError(languageToUse);
  const outOfStockMessage = getOutOfStockMessage(languageToUse);
  const cancelMessage = translateCancel(languageToUse);
  const addProductMessage = translateAddProduct(languageToUse);
  const agreeMessage = translateAgree(languageToUse);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const handleBuyAgainClick = (order: Order) => {
    order.orderItem.forEach((orderItem) => {
      // Function to get the quantity and heading based on the highest price
      const getQuantityMatchColorandSize = () => {
        if (orderItem.product && orderItem.size && orderItem.color) {
          const { price: priceSize } = getSizePrice(
            orderItem.product,
            orderItem.size
          );
          const { price: priceColor } = getColorPrice(
            orderItem.product,
            orderItem.color
          );
          const highestPrice = Math.max(priceSize, priceColor);

          // Determine the quantity and heading based on the highest price
          if (
            highestPrice ===
            orderItem.product.productdetail.price5 *
              ((100 - orderItem.product.productdetail.percentpromotion5) / 100)
          ) {
            return { quantity: orderItem.product.productdetail.quantity5 };
          }
          if (
            highestPrice ===
            orderItem.product.productdetail.price4 *
              ((100 - orderItem.product.productdetail.percentpromotion4) / 100)
          ) {
            return { quantity: orderItem.product.productdetail.quantity4 };
          }
          if (
            highestPrice ===
            orderItem.product.productdetail.price3 *
              ((100 - orderItem.product.productdetail.percentpromotion3) / 100)
          ) {
            return { quantity: orderItem.product.productdetail.quantity3 };
          }
          if (
            highestPrice ===
            orderItem.product.productdetail.price2 *
              ((100 - orderItem.product.productdetail.percentpromotion2) / 100)
          ) {
            return { quantity: orderItem.product.productdetail.quantity2 };
          }
          return { quantity: orderItem.product.productdetail.quantity1 };
        }
        return { quantity: 0 };
      };

      const { quantity: maxQuantity } = getQuantityMatchColorandSize();

      // Only add or update the product if there is enough quantity
      if (maxQuantity > 0) {
        const onAddtoPushCart = async () => {
          setLoading(true);

          // Check for errors and product availability
          if (!orderItem.size && !orderItem.color) {
            toast.error(productQuantityErrorMessage);
            return;
          }
          if (!orderItem.product) {
            return;
          }

          try {
            setLoading(true);
            // Find existing cart item by matching product id, size, and color
            const existingCartItem = cartdb.items.find(
              (item) =>
                item.product.name === orderItem.product?.name &&
                item.product.id === orderItem.product?.id &&
                item.size === orderItem.size &&
                item.color === orderItem.color
            );

            if (
              orderItem.product &&
              orderItem.quantity &&
              orderItem.size &&
              orderItem.color &&
              user.id
            ) {
              if (existingCartItem) {
                // Update the existing product's quantity if it already exists in the cart
                cartdb.updateQuantity(
                  existingCartItem.id,
                  existingCartItem.quantity + Number(orderItem.quantity),
                  orderItem.warranty || null,
                  user?.id || "",
                  languageToUse
                );
              } else {
                // Add a new product to the cart
                cartdb.addItem(
                  orderItem.product,
                  Number(orderItem.quantity),
                  orderItem.warranty || null,
                  user.id,
                  orderItem.size,
                  orderItem.color
                );
              }
            }
          } catch (error) {
            toast.error(addToCartErrorMessage);
          } finally {
            router.push("/cart");
            setLoading(false);
          }
        };
        onAddtoPushCart();
      }
    });
  };

  if (!order) {
    return null;
  }

  return (
    <Modal
      title={title || outOfStockInventoryMessage}
      description={message || outOfStockCartErrorMessage}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div>
        {order.orderItem.map((item) => {
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

          const handleClick = (
            productType: ProductType,
            productName: string
          ) => {
            const route = getRouteBasedOnProductType(productType);
            if (route) {
              const href = `/${route}/${productName}`;
              router.push(href);
            } else {
              toast.error(toastErrorMessage);
            }
          };

          const getQuantityMatchColorandSize = () => {
            if (item.product && item.size && item.color) {
              const { price: priceSize } = getSizePrice(
                item.product,
                item.size
              );
              const { price: priceColor } = getColorPrice(
                item.product,
                item.color
              );
              const highestPrice = Math.max(priceSize, priceColor);

              switch (highestPrice) {
                case item.product.productdetail.price5 *
                  ((100 - item.product.productdetail.percentpromotion5) / 100):
                  return item.product.productdetail.quantity5;
                case item.product.productdetail.price4 *
                  ((100 - item.product.productdetail.percentpromotion4) / 100):
                  return item.product.productdetail.quantity4;
                case item.product.productdetail.price3 *
                  ((100 - item.product.productdetail.percentpromotion3) / 100):
                  return item.product.productdetail.quantity3;
                case item.product.productdetail.price2 *
                  ((100 - item.product.productdetail.percentpromotion2) / 100):
                  return item.product.productdetail.quantity2;
                default:
                  return item.product.productdetail.quantity1;
              }
            }
          };

          const quantity = getQuantityMatchColorandSize();
          return (
            <div
              key={item.product?.id}
              className="flex items-center justify-between my-4 cursor-pointer"
              onClick={() => {
                if (item.product?.productType && item.product?.name) {
                  handleClick(item.product.productType, item.product?.name);
                }
              }}
            >
              <Image
                width="50"
                height="50"
                src={item.product?.images[0].url || ""}
                className={quantity === 0 ? "blur-[1px]" : ""}
                alt="404"
              />
              <span className="text-sm">{item.product?.heading}</span>
              <span className="text-sm">
                {quantity === 0 ? (
                  <span className="text-gray-500">{outOfStockMessage}</span>
                ) : (
                  <span>x{item.quantity}</span>
                )}
              </span>
            </div>
          );
        })}

        <div className="flex justify-end items-center space-x-3">
          <Button disabled={loading} variant="outline" onClick={onClose}>
            {cancelMessage}
          </Button>
          <Button
            variant="destructive"
            disabled={loading}
            onClick={() => handleBuyAgainClick(order)}
          >
            {loading ? (
              <span className="flex items-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                {addProductMessage}
              </span>
            ) : (
              agreeMessage
            )}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
