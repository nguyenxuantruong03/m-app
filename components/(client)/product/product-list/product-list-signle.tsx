"use client";
import { Swiper } from "swiper/react";
import { SwiperSlide } from "swiper/react";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Autoplay } from "swiper/modules";
import {
  CartItemType,
  FavoriteProduct,
  Product,
  ProductDetail,
} from "@/types/type";
import Image from "next/image";
import Currency from "@/components/ui/currency";
import { useRouter } from "next/navigation";
import PrevNextSwiper from "./prevnextswiper";
import "./product-list.css";
import useCart from "@/hooks/client/use-cart";
import { MouseEventHandler, useEffect, useState } from "react";
import toast from "react-hot-toast";
import IconButton from "@/components/ui/icon-button";
import { Expand, Heart, ShoppingCart } from "lucide-react";
import { debounce } from "lodash";
import useFavorite from "@/hooks/client/db/use-favorite";
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

interface ProductListProps {
  data: Product[];
  route: string; // Route for navigation
}
const ProductListSingle: React.FC<ProductListProps> = ({
  data,
  route,
}) => {
  const t = useTranslations()
  const router = useRouter();
  const cart = useCart();
  const cartdb = useCartdb();
  const userId = useCurrentUser();
  const favorite = useFavorite();
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [alertGuestModal, setAlertGuestModal] = useState(false);
  const [openPreviewModal, setOpenPreviewModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null); // Add currentProduct state
  const [loadingRetchdataFavorite, setLoadingFetchDataFavorite] =
    useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (productId: string) => {
    router.push(`/${route}/${productId}`);
  };

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

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)} // Kích hoạt hover
      onMouseLeave={() => setIsHovered(false)} // Tắt hover
    >
      {currentProduct && ( // Only render PreviewModal if currentProduct is set
        <PreviewModal
          isOpen={openPreviewModal}
          onClose={() => setOpenPreviewModal(false)}
          product={currentProduct}
        />
      )}
      <AlertGuestModal
        isOpen={alertGuestModal}
        onClose={() => setAlertGuestModal(false)}
      />
      <Swiper
        slidesPerView={5}
        spaceBetween={30}
        freeMode={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          320: { slidesPerView: 2, spaceBetween: 20 },
          480: { slidesPerView: 2, spaceBetween: 20 },
          768: { slidesPerView: 3, spaceBetween: 20 },
          1025: { slidesPerView: 5, spaceBetween: 20 },
          1400: { slidesPerView: 5, spaceBetween: 20 },
        }}
        modules={[FreeMode, Autoplay]}
        className="container-0 space-top"
      >
        {data.map((product) => {
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
                const discountedPrice =
                  price * ((100 - percentPromotion) / 100);

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
          const lowestPriceDetails = findLowestPriceDetails(
            product.productdetail
          );

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
            const { price: priceSize } = getSizePrice(product, availableSize);
            const { price: priceColor } = getColorPrice(
              product,
              availableColor
            );
            const highestPrice = Math.max(priceSize, priceColor);

            switch (highestPrice) {
              case product.productdetail.price5 *
                ((100 - product.productdetail.percentpromotion5) / 100):
                return product.productdetail.quantity5;
              case product.productdetail.price4 *
                ((100 - product.productdetail.percentpromotion4) / 100):
                return product.productdetail.quantity4;
              case product.productdetail.price3 *
                ((100 - product.productdetail.percentpromotion3) / 100):
                return product.productdetail.quantity3;
              case product.productdetail.price2 *
                ((100 - product.productdetail.percentpromotion2) / 100):
                return product.productdetail.quantity2;
              default:
                return product.productdetail.quantity1;
            }
          };

          //--------Dùng debounce ngăn chặn hành thi add liên tục của local---------
          const debouncedOnAddtoCart = debounce(
            (event: React.MouseEvent<HTMLButtonElement>) => {
              event.stopPropagation();

              //CUID: tạo ra một 1 id theo CUID tránh checked trùng với nhau
              const cartId = cuid();
              const size = availableSize;
              const color = availableColor;

              const productWithQuantity = {
                ...product,
                quantity,
                selectedWarranty: cart.getSelectedItemWarranty(product.id),
                cartId,
                warranty: "",
                size,
                color,
              };

              const existingCartItem = cart.items.find(
                (item) =>
                  item.id === product.id &&
                  item.size === size &&
                  item.color === color
              );

              if (existingCartItem) {
                const existingQuantity = existingCartItem.quantity ?? 0;
                cart.updateQuantity(
                  existingCartItem.cartId,
                  existingQuantity + quantity,
                  null,
                  userId?.id || ""
                );
                toast.success(t("product.productQuantityUpdated"));
              } else {
                cart.addItem(
                  productWithQuantity,
                  quantity,
                  null,
                  userId?.id || "",
                  size,
                  color,
                );
                toast.success(t("cart.productAdded"))
              }
            },
            1000 // Adjust the debounce time (in milliseconds) based on your preference
          );

          //--------Dùng debounce ngăn chặn hành thi add liên tục của database---------
          const debouncedOnAddtoCartDb = debounce(
            async (event: React.MouseEvent<HTMLButtonElement>) => {
              event.stopPropagation();

              await toast.promise(
                (async () => {
                  // Fetch cart data using getCart
                  const cartItemData = await getCart({
                    userId: userId?.id || "",
                  });

                  const size = availableSize;
                  const color = availableColor;
                  const maxQuantity = getQuantityMatchColorandSize();

                  const matchingItem = cartItemData.find(
                    (item: CartItemType) =>
                      item.product.name === product.name &&
                      item.product.id === product.id &&
                      item.size === size &&
                      item.color === color
                  );

                  const matchingQuantity = matchingItem
                    ? matchingItem.quantity
                    : 0;

                  const compareQuantityExistingAndAvailable =
                    matchingQuantity >= maxQuantity && maxQuantity > 0;

                  if (compareQuantityExistingAndAvailable) {
                    throw new Error(t("product.insufficientStock"));
                  }

                  const productWithQuantity = {
                    ...product,
                    quantity,
                    selectedWarranty: cartdb.getSelectedItemWarranty(
                      product.id
                    ),
                  };

                  const existingCartItem = cartdb.items.find(
                    (item) =>
                      item.product.name === product.name &&
                      item.product.id === product.id &&
                      item.size === size &&
                      item.color === color
                  );

                  try {
                    setLoading(true);
                    if (existingCartItem) {
                      // Update the quantity of the existing item
                      cartdb.updateQuantity(
                        existingCartItem.id,
                        existingCartItem.quantity + quantity,
                        null,
                        userId?.id || "",
                      );
                    } else {
                      // Add the new item to the cart
                      cartdb.addItem(
                        productWithQuantity,
                        quantity,
                        null,
                        userId?.id || "",
                        availableSize,
                        availableColor
                      );
                    }
                  } catch (error) {
                    toast.error(t("product.addToCartError"));
                  } finally {
                    setLoading(false);
                  }

                  return existingCartItem
                    ? t("product.productQuantityUpdated")
                    : t("product.productAddedToCart");
                })(),
                {
                  loading: t("loading.loading"),
                  success: (response) => response,
                  error: (error) => error.message || t("toastError.somethingWentWrong"),
                }
              );
            },
            1000 // Adjust the debounce time (in milliseconds) based on your preference
          );

          const onAddtoCart: React.MouseEventHandler<HTMLButtonElement> = (
            event
          ) => {
            if (userId?.role !== "GUEST" && userId?.id) {
              debouncedOnAddtoCartDb(event);
            } else {
              debouncedOnAddtoCart(event);
            }
          };

          const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
            event.stopPropagation();
            setCurrentProduct(product);
            setOpenPreviewModal(true);
          };

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
                  productName: product.name,
                  productId: productId,
                  product: product,
                  userId: userId?.id || "",
                  selectedSize: size,
                  selectedColor: color,
                };

                try {
                  setLoadingFetchDataFavorite(true);
                  if (favoriteData && favoriteData.id) {
                    await favorite.removeItem(
                      favoriteData.id,
                      userId?.id || "",
                    );
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
          ); // Adjust the debounce time (in milliseconds) based on your preference

          const handleIconClick = (
            productId: string,
            productName: string,
            size: string,
            color: string
          ) => {
            debouncedHandleIconClick(productId, productName, size, color);
          };

          //Kiểm tra tất cả sản phẩm có === 0 không
          const productQuantityAll = [1, 2, 3, 4, 5].every(
            (i) =>
              product.productdetail[`quantity${i}` as keyof ProductDetail] === 0
          );

          return (
            <SwiperSlide key={product.id}>
              <div className="group p-3 bg-white cursor-pointer rounded-xl border shadow-inner relative ">
                <div onClick={() => handleClick(product.name)}>
                  <div className="space-y-2">
                    {productQuantityAll && (
                      <>
                        {/* Overlay mờ và text "Hết hàng" */}
                        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center z-[9997]">
                          {/* Cũ */}
                          {/* <div className="fixed z-[9999] top-[3px] right-[-95px] bg-red-600 text-white py-[15px] w-[350px] text-center transform rotate-[45deg] font-bold text-lg tracking-[2px] overflow-hidden">
                            <span className="inline-block duration-500 ease-in-out transform transition-transform w-full absolute left-[13%] top-1/2 translate-y-[-50%]">
                              {t("product.outOfStock")}
                            </span>
                          </div> */}
                          {/* Mới */}
                          <div className="tag-outstock">
                            <span className="tag-outstock-text">
                              {t("product.outOfStock")}
                            </span>
                          </div>
                        </div>
                      </>
                    )}
                    {/* Images and actions */}
                    <div className="aspect-square rounded-xl bg-gray-100 relative  ">
                      <Image
                        src={product?.images?.[0].url}
                        fill
                        alt="Image"
                        className="aspect-square object-cover rounded-xl "
                        blurDataURL="/images/image-placeholder.webp"
                        loading="lazy"
                      />
                    </div>

                    {/* Description */}
                    <div>
                      <p className="font-semibold text-sm md:text-base single-line-ellipsis">
                        {product.heading}
                      </p>
                      <p className="text-xs md:text-sm text-gray-500 single-line-ellipsis">
                        {product.productdetail.category.name}
                      </p>
                    </div>
                    {/* Kiểm tra xem nếu như ko có đã bán thì hiển thị value old nếu có thì ẩn valueold */}
                    {product.sold === 0 ? (
                      <div className="flex items-center justify-between">
                        <Currency
                          value={discountedPrice || 0}
                          valueold={discountedPriceOld}
                        />
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <Currency value={discountedPrice || 0} />
                        {product.sold > 0 && (
                          <div className="flex items-center text-sm font-medium">
                            <span className="mr-1">{t("product.sold")}:</span>
                            <span>{formatSoldValue(product.sold) || 0}</span>
                          </div>
                        )}
                      </div>
                    )}
                    <CommentStar
                      data={product.id}
                      comment={product.comment}
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
                <div className="transition w-full px-6 top-24 left-0 md:top-2 md:left-12 absolute opacity-0 group-hover:opacity-100 group-hover:visible z-[9998]">
                  <div className="flex gap-x-2 justify-center">
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
                                    item.product.name === product.name &&
                                    item.product.id === product.id &&
                                    item.size === availableSize &&
                                    item.color === availableColor
                                )
                                ? "active-cart"
                                : ""
                              : cart.items.some(
                                  (item) =>
                                    item.id === product.id &&
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
                          product.id,
                          product.name,
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
                                item.productName === product.name &&
                                item.productId === product.id &&
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
                            item.productName === product.name &&
                            item.productId === product.id &&
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
            </SwiperSlide>
          );
        })}
        {data.length > 5 && (
          <div
            className={` ${
              isHovered ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
          >
            <PrevNextSwiper />
          </div>
        )}
      </Swiper>
    </div>
  );
};

export default ProductListSingle;
