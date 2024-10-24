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
import axios from "axios";
import {
  getColorPrice,
  getSizePrice,
} from "../../export-product-compare/size-color/match-color-size";

interface ProductListProps {
  data: Product[];
  route: string; // Route for navigation
}
const ProductListSingle: React.FC<ProductListProps> = ({ data, route }) => {
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
          toast.error("Có vấn đề khi get dữ liệu!");
        } finally {
          setLoadingFetchDataFavorite(false);
        }
      };
      fetchData();
    }
  }, []);

  return (
    <div className="relative">
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
        className="container-0"
      >
        {data.map((product) => {
          // Hàm tìm giá thấp nhất và khuyến mãi dựa trên số lượng có sẵn
          const findLowestPriceAndPromotion = (productDetail: any) => {
            // Khởi tạo giá thấp nhất là vô cực và khuyến mãi tốt nhất là 0
            let lowestPrice = Infinity;
            let bestPromotion = 0;

            // Duyệt qua các giá trị từ 1 đến 5
            for (let i = 1; i <= 5; i++) {
              // Lấy số lượng, giá và khuyến mãi tương ứng của từng biến thể
              const quantity = productDetail[`quantity${i}`];

              // Nếu số lượng lớn hơn 0 (còn hàng)
              if (quantity !== 0) {
                const price = productDetail[`price${i}`];
                const percentPromotion = productDetail[`percentpromotion${i}`];

                // Cập nhật giá thấp nhất và khuyến mãi tốt nhất nếu giá hiện tại thấp hơn giá thấp nhất đã lưu
                if (price < lowestPrice) {
                  lowestPrice = price;
                  bestPromotion = percentPromotion;
                }
              }
            }

            // Nếu tất cả số lượng đều bằng 0 (hết hàng), quay lại lấy giá trị đầu tiên
            if (lowestPrice === Infinity) {
              lowestPrice = productDetail.price1;
              bestPromotion = productDetail.percentpromotion1;
            }

            // Trả về giá thấp nhất và khuyến mãi tốt nhất
            return { price: lowestPrice, percentPromotion: bestPromotion };
          };

          // Tìm giá và khuyến mãi hợp lệ từ chi tiết sản phẩm
          const validPriceAndPromotion = findLowestPriceAndPromotion(
            product.productdetail
          );

          // Tính giá sau khuyến mãi
          const discountedPrice = validPriceAndPromotion
            ? validPriceAndPromotion.price *
              ((100 - validPriceAndPromotion.percentPromotion) / 100)
            : null;

          // Giá gốc (trước khuyến mãi)
          const discountedPriceOld = validPriceAndPromotion.price;

          // ----------Tìm size và color thấp đến cao của sản phẩm ----------------
          // Hàm tìm thông tin giá thấp nhất cùng với kích thước, màu sắc và khuyến mãi tốt nhất
          const findLowestPriceDetails = (productDetail: any) => {
            // Khởi tạo giá thấp nhất là vô cực, khuyến mãi tốt nhất là 0 và kích thước, màu sắc tốt nhất là null
            let lowestPrice = Infinity;
            let bestSize = null;
            let bestColor = null;
            let bestPromotion = 0;

            // Duyệt qua các giá trị từ 1 đến 5
            for (let i = 1; i <= 5; i++) {
              // Lấy số lượng, giá, khuyến mãi, kích thước và màu sắc tương ứng của từng biến thể
              const quantity = productDetail[`quantity${i}`];

              // Nếu số lượng lớn hơn 0 (còn hàng)
              if (quantity !== 0) {
                const price = productDetail[`price${i}`];
                const percentPromotion = productDetail[`percentpromotion${i}`];
                const size = productDetail[`size${i}`]?.value;
                const color = productDetail[`color${i}`]?.value;

                // Tính giá sau khuyến mãi
                const discountedPrice =
                  price * ((100 - percentPromotion) / 100);

                // Cập nhật giá thấp nhất, kích thước, màu sắc và khuyến mãi tốt nhất nếu giá hiện tại thấp hơn giá thấp nhất đã lưu
                if (discountedPrice < lowestPrice) {
                  lowestPrice = discountedPrice;
                  bestSize = size;
                  bestColor = color;
                  bestPromotion = percentPromotion;
                }
              }
            }

            // Nếu tất cả số lượng đều bằng 0 (hết hàng), quay lại lấy giá trị của biến thể đầu tiên
            if (lowestPrice === Infinity) {
              lowestPrice = productDetail.price1;
              bestSize = productDetail[`size1`]?.value;
              bestColor = productDetail[`color1`]?.value;
              bestPromotion = productDetail.percentpromotion1;
            }

            // Trả về thông tin giá thấp nhất, khuyến mãi, kích thước và màu sắc tốt nhất
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

          if (!availableSize && !availableColor) {
            toast.error("Sản phẩm đã hết hàng!");
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
                toast.success(
                  "Sản phẩm đã được cập nhật số lượng trong giỏ hàng."
                );
              } else {
                cart.addItem(
                  productWithQuantity,
                  quantity,
                  null,
                  userId?.id || "",
                  size,
                  color
                );
              }
            },
            1000 // Adjust the debounce time (in milliseconds) based on your preference
          );

          //--------Dùng debounce ngăn chặn hành thi add liên tục của database---------
          const debouncedOnAddtoCartDb = debounce(
            async (event: React.MouseEvent<HTMLButtonElement>) => {
              event.stopPropagation();

              await toast.promise(
                axios.post("/api/client/cart/get-items", {
                  userId: userId?.id || "",
                }),
                {
                  loading: "Loading...",
                  success: (response) => {
                    const cartItemData = response.data;
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
                      throw new Error("Số lượng sản phẩm trong kho không đủ!");
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
                        cartdb.updateQuantity(
                          existingCartItem.id,
                          existingCartItem.quantity + quantity,
                          null,
                          userId?.id || ""
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
                    } catch (error) {
                      toast.error(
                        "Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng."
                      );
                    } finally {
                      setLoading(false);
                    }

                    return existingCartItem
                      ? "Sản phẩm đã được cập nhật số lượng trong giỏ hàng."
                      : "Sản phẩm đã thêm vào giỏ hàng.";
                  },
                  error: (error) => {
                    return error.message || "Failed to add product to cart!";
                  },
                }
              );
            },
            1000 // Adjust the debounce time (in milliseconds) based on your preference
          );

          const onAddtoCart: React.MouseEventHandler<HTMLButtonElement> = (
            event
          ) => {
            if (userId?.role !== "ADMIN") {
              debouncedOnAddtoCart(event);
            } else {
              debouncedOnAddtoCartDb(event);
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
                      userId?.id || ""
                    );
                  } else {
                    await favorite.addItem(favoriteProduct);
                  }
                } catch (error) {
                  toast.error(
                    favoriteData
                      ? `Không thể xóa lưu sản phẩm!`
                      : `Không thể lưu sản phẩm!`
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
            <SwiperSlide key={product.id} className={`${productQuantityAll && "overflow-hidden"}`}>
              <div
                onClick={() => handleClick(product.productdetail.name1)}
                className="px-3 bg-white group cursor-pointer rounded-xl border space-y-4 shadow-inner relative "
              >
                {productQuantityAll && (
                  <>
                    {/* Overlay mờ và text "Hết hàng" */}
                    <div
                      onClick={() => handleClick(product.name)}
                      className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-[9998]"
                    >
                      <div className="fixed z-[9999] top-[3px] right-[-95px] bg-red-500 text-white py-[15px] w-[350px] text-center transform rotate-[45deg] font-bold text-lg tracking-[2px] overflow-hidden">
                        <span className="inline-block duration-500 ease-in-out transform transition-transform w-full absolute left-[13%] top-1/2 translate-y-[-50%]">
                          Hết hàng
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
                {/* Kiểm tra xemn nếu như ko có đã bán thì hiển thị value old nếu có thì ẩn valueold */}
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
                        <span className="mr-1">Đã bán:</span>
                        <span>{formatSoldValue(product.sold) || 0}</span>
                      </div>
                    )}
                  </div>
                )}
                
                      <CommentStar data={product.id} comment={product.comment}/>
                      
              </div>
              <div className="home-product-item__favorite">
                <span className="ml-1">
                  Giảm {product.productdetail.percentpromotion1}%
                </span>
              </div>
              <div className="transition w-full px-6 top-24 left-0 md:top-2 md:left-12 absolute">
                <div className="flex gap-x-2 justify-center">
                  <IconButton
                    disabled={loading}
                    onClick={onPreview}
                    icon={<Expand size={20} className="text-gray-600" />}
                    text="Mở rộng"
                  />
                  <IconButton
                    disabled={productQuantityAll || loading}
                    onClick={onAddtoCart}
                    icon={
                      <ShoppingCart
                        className={`${
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
                    text={`${productQuantityAll ? "Hết hàng" : "Thêm mới"}`}
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
                        ? "Đã lưu"
                        : "Thả Tim"
                    }`}
                  />
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      {
        data.length > 5 && (
          <PrevNextSwiper />
        )
      }
    </div>
  );
};

export default ProductListSingle;
