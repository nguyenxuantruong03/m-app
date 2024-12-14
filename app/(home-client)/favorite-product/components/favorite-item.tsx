"use client";

import Currency from "@/components/ui/currency";
import toast from "react-hot-toast";
import useFavorite, { FavoriteUnion } from "@/hooks/client/db/use-favorite";
import { Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import "./favorite-item.css";
import { debounce } from "lodash";
import IconButton from "@/components/ui/icon-button";
import { useRouter } from "next/navigation";
import CommentStar from "@/components/(client)/product/star-comment/star-comment";
import {
  getColorOldPrice,
  getColorPrice,
  getSizeOldPrice,
  getSizePrice,
} from "@/components/(client)/export-product-compare/size-color/match-color-size";
import useCartdb from "@/hooks/client/db/use-cart-db";
import { useCurrentUser } from "@/hooks/use-current-user";
import {
  Dispatch,
  MouseEvent,
  MouseEventHandler,
  SetStateAction,
  useState,
} from "react";
import { AlertGuestModal } from "@/components/modals/alert-guest-login-modal";
import { CartItemType, FavoriteProduct, ProductDetail } from "@/types/type";
import axios from "axios";
import cuid from "cuid";
import {
  getToastError,
  translateCannotRemoveSavedProduct,
  translateCannotSaveProduct,
  translateInsufficientStock,
  translateProductQuantityUpdated,
  translateProductAddedToCart,
  getOutOfStockMessage,
  translateSize,
  translateColor,
  translateAdded,
  translateAddNew,
  translateDecrease,
  getLoadingFavoriteItem,
} from "@/translate/translate-client";
import getCart from "@/actions/client/cart";

interface LikeItemProps {
  data: FavoriteUnion;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  languageToUse: string;
}

const LikeItem: React.FC<LikeItemProps> = ({
  data,
  loading,
  setLoading,
  languageToUse,
}) => {
  const favorite = useFavorite();
  const user = useCurrentUser();
  const router = useRouter();
  const cartdb = useCartdb();
  const [alertGuestModal, setAlertGuestModal] = useState(false);

  //language
  const toastErrorMessage = getToastError(languageToUse);
  const cannotRemoveSavedProductMessage =
    translateCannotRemoveSavedProduct(languageToUse);
  const cannotSaveProductMessage = translateCannotSaveProduct(languageToUse);
  const insufficientStockMessage = translateInsufficientStock(languageToUse);
  const productQuantityUpdatedMessage =
    translateProductQuantityUpdated(languageToUse);
  const productAddedToCart = translateProductAddedToCart(languageToUse);
  const outOfStockMessage = getOutOfStockMessage(languageToUse);
  const sizeMessage = translateSize(languageToUse);
  const colorMessage = translateColor(languageToUse);
  const addedMessage = translateAdded(languageToUse);
  const addNewMessage = translateAddNew(languageToUse);
  const decreaseMessage = translateDecrease(languageToUse);
  const loadingFavoriteItemMessage = getLoadingFavoriteItem(languageToUse);

  const debouncedHandleIconClick = debounce(
    async (
      id: string,
      productName: string,
      productId: string,
      selectedSize: string,
      selectedColor: string
    ) => {
      const favoriteData = favorite.items.find(
        (item) =>
          item.id === id &&
          item.productName === productName &&
          (selectedSize
            ? item.selectedSize === selectedSize
            : item.selectedSize === data.product.productdetail.size1.value) &&
          (selectedColor
            ? item.selectedColor === selectedColor
            : item.selectedColor === data.product.productdetail.color1.value)
      );

      //CUID: tạo ra một 1 id theo CUID tránh checked trùng với nhau
      const idFavorite = cuid();
      const favoriteProduct: FavoriteProduct = {
        id: idFavorite,
        productName: productName,
        productId: productId,
        product: data.product,
        userId: user?.id || "",
        selectedSize,
        selectedColor,
      };

      if (user?.role !== "GUEST" && user?.id) {
        try {
          setLoading(true);
          if (favoriteData && favoriteData.id) {
            await favorite.removeItem(
              favoriteData.id,
              user?.id || "",
              languageToUse
            );
          } else {
            await favorite.addItem(favoriteProduct, languageToUse);
          }
        } catch (error) {
          toast.error(
            favoriteData
              ? cannotRemoveSavedProductMessage
              : cannotSaveProductMessage
          );
        } finally {
          setLoading(false);
        }
      } else {
        setAlertGuestModal(true);
      }
    },
    1000
  ); // Adjust the debounce time (in milliseconds) based on your preference

  const handleIconClick = (
    id: string,
    productName: string,
    productId: string,
    selectedSize: string,
    selectedColor: string
  ) => {
    debouncedHandleIconClick(
      id,
      productName,
      productId,
      selectedSize,
      selectedColor
    );
  };

  const getPriceMatchColorandSize = () => {
    const { price: priceSize, percentpromotion: percentpromotionSize } =
      getSizePrice(data.product, data.selectedSize);
    const { price: priceColor, percentpromotion: percentpromotionColor } =
      getColorPrice(data.product, data.selectedColor);

    // Determine the highest price and the corresponding percentpromotion
    const finalPrice = Math.ceil(Math.max(priceSize, priceColor));
    const finalPercentpromotion =
      priceSize >= priceColor ? percentpromotionSize : percentpromotionColor;

    return {
      price: finalPrice,
      percentpromotion: finalPercentpromotion,
    };
  };

  const getPriceOldMatchColorandSize = () => {
    const sizeOldPrice = getSizeOldPrice(data.product, data.selectedSize);
    const colorOldPrice = getColorOldPrice(data.product, data.selectedColor);
    return Math.ceil(Math.max(sizeOldPrice, colorOldPrice));
  };

  const getQuantityMatchColorandSize = () => {
    const { price: priceSize } = getSizePrice(data.product, data.selectedSize);
    const { price: priceColor } = getColorPrice(
      data.product,
      data.selectedColor
    );
    const highestPrice = Math.max(priceSize, priceColor);

    switch (highestPrice) {
      case data.product.productdetail.price5 *
        ((100 - data.product.productdetail.percentpromotion5) / 100):
        return data.product.productdetail.quantity5;
      case data.product.productdetail.price4 *
        ((100 - data.product.productdetail.percentpromotion4) / 100):
        return data.product.productdetail.quantity4;
      case data.product.productdetail.price3 *
        ((100 - data.product.productdetail.percentpromotion3) / 100):
        return data.product.productdetail.quantity3;
      case data.product.productdetail.price2 *
        ((100 - data.product.productdetail.percentpromotion2) / 100):
        return data.product.productdetail.quantity2;
      default:
        return data.product.productdetail.quantity1;
    }
  };

  //Tìm kiếm quantity của sản phẩm
  const maxQuantity = getQuantityMatchColorandSize();

  const onAddtoCart: MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.stopPropagation();

    if (user?.role !== "GUEST" && user?.id) {
      const productWithQuantity = {
        ...data.product,
        quantity: 1,
      };

      // Sử dụng toast.promise để xử lý các thao tác bất đồng bộ
      await toast.promise(
        (async () => {
          // Sử dụng getCart thay cho axios.post
          const cartItemData = await getCart({
            userId: user?.id || "",
            language: languageToUse,
          });

          const matchingItem = cartItemData.find(
            (item: CartItemType) =>
              item.product.name === data.product.name &&
              item.product.id === data.product.id &&
              item.size === data.selectedSize &&
              item.color === data.selectedColor
          );

          const matchingQuantity = matchingItem ? matchingItem.quantity : 0;

          const compareQuantityExistingAndAvailable =
            matchingQuantity >= maxQuantity && maxQuantity > 0;

          if (compareQuantityExistingAndAvailable) {
            throw new Error(insufficientStockMessage);
          }

          const existingCartItem = cartdb.items.find(
            (item) =>
              item.product.name === data.product.name &&
              item.product.id === data.product.id &&
              item.size === data.selectedSize &&
              item.color === data.selectedColor
          );

          if (existingCartItem) {
            cartdb.updateQuantity(
              existingCartItem.id,
              existingCartItem.quantity + 1,
              null,
              user?.id || "",
              languageToUse
            );
          } else {
            cartdb.addItem(
              productWithQuantity,
              1,
              null,
              user?.id || "",
              data.selectedSize,
              data.selectedColor
            );
          }

          return existingCartItem
            ? productQuantityUpdatedMessage
            : productAddedToCart;
        })(),
        {
          loading: loadingFavoriteItemMessage,
          success: (message) => message,
          error: (error) => error.message || toastErrorMessage,
        }
      );
    }
  };

  const getRouteBasedOnProductType = (productType: any) => {
    switch (productType) {
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

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const route = getRouteBasedOnProductType(
      String(data.product.productType).toLowerCase()
    );
    // // -----------Log the values for debugging----------------
    // console.log('Product Type:', data.productType);
    // console.log('Route:', route);
    if (route) {
      // Construct the complete URL
      const href = `/${route}/${data.product.name}`;
      // Use the Link component for navigation
      router.push(href);
    } else {
      toast.error(toastErrorMessage);
    }
  };

  const productQuantityAll = [1, 2, 3, 4, 5].every(
    (i) =>
      data.product.productdetail[`quantity${i}` as keyof ProductDetail] === 0
  );

  return (
    <>
      <AlertGuestModal
        isOpen={alertGuestModal}
        onClose={() => setAlertGuestModal(false)}
        languageToUse={languageToUse}
      />
      <div className="relative" onClick={handleClick}>
        <div className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4">
          {productQuantityAll && (
            <>
              {/* Overlay mờ và text "Hết hàng" */}
              <div
                onClick={handleClick}
                className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-[9998]"
              >
                <div className="fixed z-[9999] top-[3px] right-[-95px] bg-red-500 text-white py-[15px] w-[350px] text-center transform rotate-[45deg] font-bold text-lg tracking-[2px] overflow-hidden">
                  <span className="inline-block duration-500 ease-in-out transform transition-transform w-full absolute left-[13%] top-1/2 translate-y-[-50%]">
                    {outOfStockMessage}
                  </span>
                </div>
              </div>
            </>
          )}
          {/* Images and actions */}
          <div className="aspect-square rounded-xl bg-gray-100">
            <Image
              src={data.product.images[0].url}
              blurDataURL="/images/image-placeholder.webp"
              width="400"
              height="400"
              alt="error"
              className="aspect-square object-cover rounded-md"
              loading="lazy"
            />
          </div>
          {/* Description */}
          <div>
            <div className="grid grid-cols-2">
              <p className="font-semibold text-base truncate">
                {data.product.heading}
              </p>
              <p>
                <span className="text-sm text-gray-600">{sizeMessage}</span>
                <span className="font-semibold ml-1">{data.selectedSize}</span>
              </p>
            </div>
            <div className="grid grid-cols-2">
              <p className="text-sm text-gray-600 truncate">
                {data.product.productdetail?.category.name}
              </p>

              <p className="flex items-center">
                <span className="text-sm text-gray-600">{colorMessage}</span>
                <div
                  className="h-6 w-6 rounded-full ml-1"
                  style={{ backgroundColor: data.selectedColor }}
                />
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 items-center">
            <Currency
              value={getPriceMatchColorandSize().price}
              valueold={getPriceOldMatchColorandSize()}
            />

            <div className="flex space-x-3 items-center justify-end">
              <IconButton
                disabled={loading}
                onClick={(e) => {
                  handleIconClick(
                    data.id || "",
                    data.product.name,
                    data.product.id,
                    data.selectedSize,
                    data.selectedColor
                  );
                  e.stopPropagation();
                }}
                icon={
                  <Heart
                    size={20}
                    className={`text-gray-600 ${
                      favorite.items.some(
                        (item) =>
                          item.id === data.id &&
                          item.productName === data.product.name &&
                          (data.selectedSize
                            ? item.selectedSize === data.selectedSize
                            : item.selectedSize ===
                              data.product.productdetail.size1.value) &&
                          (data.selectedColor
                            ? item.selectedColor === data.selectedColor
                            : item.selectedColor ===
                              data.product.productdetail.color1.value)
                      )
                        ? "active"
                        : ""
                    }`}
                  />
                }
                text={
                  favorite.items.some(
                    (item) =>
                      item.id === data.id &&
                      (data.selectedSize
                        ? item.selectedSize === data.selectedSize
                        : item.selectedSize ===
                          data.product.productdetail.size1.value) &&
                      (data.selectedColor
                        ? item.selectedColor === data.selectedColor
                        : item.selectedColor ===
                          data.product.productdetail.color1.value)
                  )
                    ? addedMessage
                    : addNewMessage
                }
              />
              <IconButton
                disabled={loading || productQuantityAll}
                onClick={onAddtoCart}
                icon={
                  <ShoppingCart
                    size={20}
                    className={`text-gray-600 ${
                      cartdb.items.some(
                        (item) =>
                          item.product.name === data.product.name &&
                          item.product.id === data.product.id &&
                          item.size === data.selectedSize &&
                          item.color === data.selectedColor
                      )
                        ? "active-cart"
                        : ""
                    }`}
                  />
                }
                text={
                  cartdb.items.some(
                    (item) =>
                      item.product.name === data.product.name &&
                      item.product.id === data.product.id &&
                      item.size === data.selectedSize &&
                      item.color === data.selectedColor
                  )
                    ? addedMessage
                    : addNewMessage
                }
              />
            </div>
          </div>
          <CommentStar
            data={data.product.id}
            comment={data.product.comment}
            languageToUse={languageToUse}
          />
        </div>
        {getPriceMatchColorandSize().percentpromotion > 0 && (
          <div className="home-product-item__favorite">
            <span className="ml-1">
              {decreaseMessage} {getPriceMatchColorandSize().percentpromotion}%
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default LikeItem;
