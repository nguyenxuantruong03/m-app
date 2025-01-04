"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Currency from "@/components/ui/currency";
import "../product-list/product-list.css";
import {
  CartItemType,
  FavoriteProduct,
  Product,
  ProductDetail,
} from "@/types/type";
import useCart from "@/hooks/client/use-cart";
import { MouseEventHandler, useEffect, useState } from "react";
import toast from "react-hot-toast";
import IconButton from "@/components/ui/icon-button";
import { Expand, Heart, ShoppingCart } from "lucide-react";
import useFavorite from "@/hooks/client/db/use-favorite";
import { debounce } from "lodash";
import CommentStar from "../star-comment/star-comment";
import { useCurrentUser } from "@/hooks/use-current-user";
import PreviewModal from "@/components/(client)/modal/preview-modal";
import useCartdb from "@/hooks/client/db/use-cart-db";
import { formatSoldValue } from "@/lib/utils";
import cuid from "cuid";
import { AlertGuestModal } from "@/components/modals/alert-guest-login-modal";
import {
  getColorPrice,
  getSizePrice,
} from "../../export-product-compare/size-color/match-color-size";
import getCart from "@/actions/client/cart";
import { useTranslations } from "next-intl";

interface ProductCardProps {
  data: Product;
  route: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  data,
  route,
}) => {
  const router = useRouter();
  const cart = useCart();
  const cartdb = useCartdb();
  const userId = useCurrentUser();
  const favorite = useFavorite();
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [openPreviewModal, setOpenPreviewModal] = useState(false);
  const [alertGuestModal, setAlertGuestModal] = useState(false);
  const [loadingRetchdataFavorite, setLoadingFetchDataFavorite] =
    useState(false);
  const t = useTranslations()

  useEffect(() => {
    if (userId?.role !== "GUEST" && userId?.id) {
      const fetchData = async () => {
        try {
          setLoadingFetchDataFavorite(true);
          await favorite.fetchFavoriteItems(userId?.id || "");
        } catch (error) {
          toast.error(t("toastError.somethingWentWrong"));
        } finally {
          setLoadingFetchDataFavorite(false);
        }
      };
      fetchData();
    }
  }, []);

  //Handle add favorite và sử dụng debounce sau 1 giay mới được add được thêm vào giỏ hàng ngăn chặn hành vi spam
  const debouncedHandleIconClick = debounce(
    async (
      productId: string,
      productName: string,
      size: string,
      color: string
    ) => {
      if (userId?.role !== "GUEST" && userId?.id) {
        //Check favorite coi tất cả giá trị so sánh có tìm ra được được favoriteProduct không nếu có thì lấy id của favorite.
        const favoriteData = favorite.items.find(
          (item) =>
            item.productName === productName &&
            item.productId === productId &&
            item.selectedSize === availableSize &&
            item.selectedColor === availableColor
        );

        //CUID: tạo ra một 1 id theo CUID tránh checked trùng với nhau
        const idFavorite = cuid();
        const favoriteProduct: FavoriteProduct = {
          id: idFavorite,
          productName: data.name,
          productId: productId,
          product: data,
          userId: userId?.id || "",
          selectedSize: size,
          selectedColor: color,
        };

        try {
          setLoadingFetchDataFavorite(true);
          if (favoriteData && favoriteData.id) {
            await favorite.removeItem(favoriteData.id, userId?.id || "");
            toast.success(t("product.productRemovedFromWishlist"));
          } else {
            if(!userId){
              toast.error(t("action.loginToAddToWishlist"))
            }

            if(favoriteData){
              toast.error(t("product.productSaved"))
            }
            await favorite.addItem(favoriteProduct);
            toast.success(t("product.productToWishlist"))
          }
        } catch (error) {
          toast.error(
            favoriteData
              ? t("product.cannotRemoveSavedProduct")
              : t("product.cannotSaveProduct")
          );
        } finally {
          setLoadingFetchDataFavorite(false);
        }
      } else {
        setAlertGuestModal(true);
      }
    },
    1000
  );

  const handleIconClick = (
    productId: string,
    productName: string,
    size: string,
    color: string
  ) => {
    debouncedHandleIconClick(productId, productName, size, color);
  };

  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    setOpenPreviewModal(true);
  };

  // ----------Tìm size và color thấp đến cao của sản phẩm ----------------
  // Hàm tìm thông tin giá thấp nhất cùng với kích thước, màu sắc và khuyến mãi tốt nhất
  const findLowestPriceDetails = (productDetail: any) => {
    let lowestPrice = Infinity;
    let bestSize = null;
    let bestColor = null;
    let bestPromotion = 0;

    // Duyệt qua các biến thể từ 1 đến 5
    for (let i = 1; i <= 5; i++) {
      const quantity = productDetail[`quantity${i}`];

      // Bỏ qua nếu không có quantity hoặc quantity là 0
      if (!quantity || quantity === 0) continue;

      // Lấy các giá trị tương ứng
      const price = productDetail[`price${i}`];
      const percentPromotion = productDetail[`percentpromotion${i}`];
      const size = productDetail[`size${i}`]?.value || null;
      const color = productDetail[`color${i}`]?.value || null;

      // Kiểm tra tính hợp lệ của giá và khuyến mãi
      if (price != null && percentPromotion != null) {
        const discountedPrice = price * ((100 - percentPromotion) / 100);

        // Cập nhật nếu giá sau khuyến mãi thấp hơn giá thấp nhất hiện tại
        if (discountedPrice < lowestPrice) {
          lowestPrice = discountedPrice;
          bestSize = size;
          bestColor = color;
          bestPromotion = percentPromotion;
        }
      }
    }

    // Xử lý trường hợp tất cả quantity đều bằng 0 hoặc không có giá trị hợp lệ
    if (lowestPrice === Infinity) {
      lowestPrice = productDetail.price1 || 0;
      bestSize = productDetail[`size1`]?.value || null;
      bestColor = productDetail[`color1`]?.value || null;
      bestPromotion = productDetail.percentpromotion1 || 0;
    }

    // Trả về kết quả
    return {
      price: lowestPrice,
      percentPromotion: bestPromotion,
      size: bestSize,
      color: bestColor,
    };
  };

  // Sử dụng hàm để tìm thông tin giá thấp nhất cùng với kích thước và màu sắc
  const lowestPriceDetails = findLowestPriceDetails(data.productdetail);

  // Kích thước và màu sắc tốt nhất từ thông tin tìm được
  const availableSize = lowestPriceDetails.size;
  const availableColor = lowestPriceDetails.color;
  const availablePrice = lowestPriceDetails.price;
  const availablePercentPromotion = lowestPriceDetails.percentPromotion;

  // Tính giá sau khuyến mãi
  const discountedPrice = lowestPriceDetails
    ? availablePrice * ((100 - availablePercentPromotion) / 100)
    : null;

  // Giá gốc (trước khuyến mãi)
  const discountedPriceOld = availablePrice;

  //Nếu không có size và color thì trả về trống
  if (!availableSize && !availableColor) {
    return;
  }

  //Tìm kiếm quantity dụa trên size và color
  const getQuantityMatchColorandSize = () => {
    const { price: priceSize } = getSizePrice(data, availableSize);
    const { price: priceColor } = getColorPrice(data, availableColor);
    const highestPrice = Math.max(priceSize, priceColor);

    switch (highestPrice) {
      case data.productdetail.price5 *
        ((100 - data.productdetail.percentpromotion5) / 100):
        return data.productdetail.quantity5;
      case data.productdetail.price4 *
        ((100 - data.productdetail.percentpromotion4) / 100):
        return data.productdetail.quantity4;
      case data.productdetail.price3 *
        ((100 - data.productdetail.percentpromotion3) / 100):
        return data.productdetail.quantity3;
      case data.productdetail.price2 *
        ((100 - data.productdetail.percentpromotion2) / 100):
        return data.productdetail.quantity2;
      default:
        return data.productdetail.quantity1;
    }
  };

  const onAddtoCart: MouseEventHandler<HTMLButtonElement> = async (event) => {
    if (userId?.role !== "GUEST" && userId?.id) {
      event.stopPropagation();

      await toast.promise(
        (async () => {
          const cartItemData = await getCart({
            userId: userId?.id || "",
          });

          const size = availableSize;
          const color = availableColor;
          const maxQuantity = getQuantityMatchColorandSize();

          const matchingItem = cartItemData.find(
            (item: CartItemType) =>
              item.product.name === data.name &&
              item.product.id === data.id &&
              item.size === size &&
              item.color === color
          );

          const matchingQuantity = matchingItem ? matchingItem.quantity : 0;

          const compareQuantityExistingAndAvailable =
            matchingQuantity >= maxQuantity && maxQuantity > 0;

          if (compareQuantityExistingAndAvailable) {
            throw new Error(t("product.insufficientStock"));
          }

          const productWithQuantity = {
            ...data,
            quantity,
            selectedWarranty: cartdb.getSelectedItemWarranty(data.id),
          };

          const existingCartItem = cartdb.items.find(
            (item) =>
              item.product.name === data.name &&
              item.product.id === data.id &&
              item.size === size &&
              item.color === color
          );
          setLoading(true);

          if (existingCartItem) {
            cartdb.updateQuantity(
              existingCartItem.id,
              existingCartItem.quantity + quantity,
              null,
              userId?.id || "",
            );
          } else {
            cartdb.addItem(
              productWithQuantity,
              quantity,
              null,
              userId?.id || "",
              availableSize,
              availableColor
            );
          }

          return existingCartItem
            ? t("product.productQuantityUpdated")
            : t("product.productAddedToCart");
        })(),
        {
          loading: t("loading.loading"),
          success: (message) => message,
          error: (error) => error.message || t("toastError.somethingWentWrong"),
        }
      );
    } else {
      event.stopPropagation();

      //CUID: tạo ra một 1 id theo CUID tránh checked trùng với nhau
      const cartId = cuid();
      const size = availableSize;
      const color = availableColor;
      const productWithQuantity = {
        ...data,
        quantity,
        selectedWarranty: cart.getSelectedItemWarranty(data.id),
        cartId,
        warranty: "",
        size,
        color,
      };

      const existingCartItem = cart.items.find(
        (item) =>
          item.id === data.id && item.size === size && item.color === color
      );

      try {
        setLoading(true);
        if (existingCartItem) {
          const existingQuantity = existingCartItem.quantity ?? 0;
          await cart.updateQuantity(
            existingCartItem.cartId,
            existingQuantity + quantity,
            null,
            userId?.id || ""
          );
          toast.success(t("product.productQuantityUpdated"));
        } else {
          await cart.addItem(
            productWithQuantity,
            quantity,
            null,
            userId?.id || "",
            size,
            color,
          );
          toast.success(t("cart.productAdded"))
        }
      } catch (error) {
        toast.error(t("product.addToCartError"));
      } finally {
        setLoading(false);
      }
    }
  };

  const handleClick = () => {
    router.push(`/${route}/${data?.name}`);
  };

  //Kiểm tra tất cả sản phẩm có === 0 không
  const productQuantityAll = [1, 2, 3, 4, 5].every(
    (i) => data.productdetail[`quantity${i}` as keyof ProductDetail] === 0
  );

  return (
    <>
      <AlertGuestModal
        isOpen={alertGuestModal}
        onClose={() => setAlertGuestModal(false)}
      />
      <PreviewModal
        isOpen={openPreviewModal}
        onClose={() => setOpenPreviewModal(false)}
        product={data}
      />
        <div className="bg-white group cursor-pointer rounded-xl border p-3 relative">
          <div className="space-y-2">
            {productQuantityAll && (
              <>
                {/* Overlay mờ và text "Hết hàng" */}
                <div
                  onClick={handleClick}
                  className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center z-[9997]"
                >
                {/* Cũ */}
                  {/* <div className="absolute z-[9999] top-[3px] right-[-95px] bg-red-500 text-white py-[15px] w-[350px] text-center transform rotate-[45deg] font-bold text-lg tracking-[2px] overflow-hidden">
                    <span className="inline-block duration-500 ease-in-out transform transition-transform w-full absolute left-[13%] top-1/2 translate-y-[-50%]">
                      {t("product.outOfStock")}
                    </span>
                  </div> */}
                {/* Mới */}
                    <div className="tag-outstock">
                      <span className="tag-outstock-text">{t("product.outOfStock")}</span>
                    </div>
                </div>
              </>
            )}
            {/* Images and actions */}
            <div
              className="aspect-square rounded-xl bg-gray-100"
              onClick={handleClick}
            >
              <Image
                src={data?.images?.[0].url}
                blurDataURL="/images/image-placeholder.webp"
                width="500"
                height="500"
                alt="Image"
                className="aspect-square object-cover rounded-md"
                loading="lazy"
              />
              <div className="opacity-0 z-[9998] group-hover:opacity-100 transition w-full pr-6 top-40 absolute">
                <div className="flex gap-x-6 justify-center">
                  <IconButton
                    disabled={loading}
                    onClick={onPreview}
                    icon={<Expand size={20} className="text-gray-600" />}
                    text={t("action.expand")}
                  />
                  <IconButton
                    disabled={productQuantityAll || loading}
                    onClick={onAddtoCart}
                    icon={
                      <ShoppingCart
                        className={`text-gray-600 ${
                          userId?.role !== "GUEST" && userId?.id
                            ? cartdb.items.some(
                                (item) =>
                                  item.product.name === data.name &&
                                  item.product.id === data.id &&
                                  item.size === availableSize &&
                                  item.color === availableColor
                              )
                              ? "active-cart"
                              : ""
                            : cart.items.some(
                                (item) =>
                                  item.id === data.id &&
                                  item.size === availableSize &&
                                  item.color === availableColor
                              )
                            ? "active-cart"
                            : ""
                        }`}
                      />
                    }
                    text={`${
                      productQuantityAll ? t("product.outOfStock") : t("action.addNew")
                    }`}
                  />

                  <IconButton
                    disabled={loading || loadingRetchdataFavorite}
                    onClick={() =>
                      handleIconClick(
                        data.id,
                        data.name,
                        availableSize,
                        availableColor
                      )
                    }
                    className={`${
                      userId?.role === "GUEST" || !userId?.id ? "hidden" : ""
                    }`}
                    icon={
                      <Heart
                        size={20}
                        className={`text-gray-600 ${
                          favorite.items.some(
                            (item) =>
                              item.productName === data.name &&
                              item.productId === data.id &&
                              item.selectedSize === availableSize &&
                              item.selectedColor === availableColor
                          )
                            ? "active"
                            : ""
                        }`}
                      />
                    }
                    text={`${
                      favorite.items.some(
                        (item) =>
                          item.productName === data.name &&
                          item.productId === data.id &&
                          item.selectedSize === availableSize &&
                          item.selectedColor === availableColor
                      )
                        ? t("action.saved")
                        : t("action.heart")
                    }`}
                  />
                </div>
              </div>
            </div>
            {/* Description */}
            <div>
              <p className="font-semibold text-base single-line-ellipsis">
                {data.heading}
              </p>
              <p className="text-sm text-gray-500 single-line-ellipsis">
                {data.productdetail.category?.name}
              </p>
            </div>
            {/* Kiểm tra xemn nếu như ko có đã bán thì hiển thị value old nếu có thì ẩn valueold */}
            {data.sold === 0 ? (
              <div className="flex items-center justify-between">
                <Currency
                  value={discountedPrice || 0}
                  valueold={discountedPriceOld}
                />
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <Currency value={discountedPrice || 0} />
                {data.sold > 0 && (
                  <div className="flex items-center text-sm font-medium">
                    <span className="mr-1">{t("product.sold")}:</span>
                    <span>{formatSoldValue(data.sold) || 0}</span>
                  </div>
                )}
              </div>
            )}
            <CommentStar
              data={data.id}
              comment={data.comment}
            />
          </div>

          {availablePercentPromotion > 0 && (
            <div className="home-product-item__favorite">
              <span className="ml-1">
                {t("action.decrease")} {availablePercentPromotion}%
              </span>
            </div>
          )}
        </div>
    </>
  );
};

export default ProductCard;
