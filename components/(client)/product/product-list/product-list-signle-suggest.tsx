"use client";
import { Swiper } from "swiper/react";
import { SwiperSlide } from "swiper/react";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Autoplay } from "swiper/modules";
import { Product, ProductDetail } from "@/types/type";
import Image from "next/image";
import Currency from "@/components/ui/currency";
import { useRouter } from "next/navigation";
import "./product-list.css";
import useLike from "@/hooks/client/use-like";
import toast from "react-hot-toast";
import { debounce } from "lodash";
import { Expand, Heart, ShoppingCart } from "lucide-react";
import { MouseEventHandler, useState } from "react";
import useCart from "@/hooks/client/use-cart";
import IconButton from "@/components/ui/icon-button";
import CommentStar from "../star-comment/star-comment";
import { useCurrentUser } from "@/hooks/use-current-user";
import PreviewModal from "@/components/(client)/modal/preview-modal";
import useCartdb from "@/hooks/client/db/use-cart-db";
import { formatSoldValue } from "@/lib/utils";
import cuid from 'cuid';

interface ProductListProps {
  data: Product[];
  route: string; // Route for navigation
}
const ProductListSingleSuggest: React.FC<ProductListProps> = ({
  data,
  route,
}) => {
  const router = useRouter();
  const like = useLike();
  const cart = useCart();
  const cartdb = useCartdb();
  const [quantity, setQuantity] = useState(1);
  const userId = useCurrentUser();
  const [openPreviewModal, setOpenPreviewModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null); // Add currentProduct state

  const handleClick = (productId: string) => {
    router.push(`/${route}/${productId}`);
  };

  return (
    <>
      {currentProduct && ( // Only render PreviewModal if currentProduct is set
        <PreviewModal
          isOpen={openPreviewModal}
          onClose={() => setOpenPreviewModal(false)}
          product={currentProduct}
        />
      )}
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
                (item) => item.id === product.id &&
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
            (event: React.MouseEvent<HTMLButtonElement>) => {
              event.stopPropagation();

              const size = availableSize;
              const color = availableColor;

              const productWithQuantity = {
                ...product,
                quantity,
                selectedWarranty: cartdb.getSelectedItemWarranty(product.id),
              };

              const existingCartItem = cartdb.items.find(
                (item) => item.id === product.id &&
                item.size === size &&
                item.color === color
              );

              if (existingCartItem) {
                cartdb.updateQuantity(
                  existingCartItem.id,
                  existingCartItem.quantity + quantity,
                  null,
                  userId?.id || ""
                );
                toast.success(
                  "Sản phẩm đã được cập nhật số lượng trong giỏ hàng."
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

          //Handle add like và sử dụng debounce sau 1 giay mới được add được thêm vào giỏ hàng ngăn chặn hành vi spam
          const debouncedHandleIconClick = debounce((productId: string) => {
            const productToLike = data.find(
              (product) => product.id === productId
            );

            if (productToLike) {
              const isLiked = like.items.some((item) => item.id === productId);

              if (isLiked) {
                like.removeItem(productId);
              } else {
                like.addItem(productToLike, userId);
              }
            } else {
              toast.error(`Product with id ${productId} not found.`);
            }
          }, 1000); // Adjust the debounce time (in milliseconds) based on your preference

          const handleIconClick = (productId: string) => {
            debouncedHandleIconClick(productId);
          };

          //Kiểm tra tất cả sản phẩm có === 0 không
          const productQuantityAll = [1, 2, 3, 4, 5].every(
            (i) =>
              product.productdetail[`quantity${i}` as keyof ProductDetail] === 0
          );

          return (
            <>
              <SwiperSlide key={product.id} className="overflow-hidden">
                <div
                  onClick={() => handleClick(product.name)}
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
                  <CommentStar data={product.id} />
                </div>
                <div className="home-product-item__favorite">
                  <span className="mr-1">
                    Giảm {product.productdetail.percentpromotion1}%
                  </span>
                </div>
                <div className="transition w-full px-6 top-24 left-0 md:top-2 md:left-12 absolute">
                  <div className="flex gap-x-2 justify-center">
                    <IconButton
                      onClick={onPreview}
                      icon={<Expand size={20} className="text-gray-600" />}
                      text="Mở rộng"
                    />
                    <IconButton
                      disabled={productQuantityAll}
                      onClick={onAddtoCart}
                      icon={
                        <ShoppingCart size={20} className="text-gray-600" />
                      }
                      text={`${productQuantityAll ? "Hết hàng" : "Thêm mới"}`}
                    />
                    <IconButton
                      onClick={() => handleIconClick(product.id)}
                      icon={
                        <Heart
                          size={20}
                          className={`text-gray-600 ${
                            like.items.some((item) => item.id === product.id)
                              ? "active"
                              : ""
                          }`}
                        />
                      }
                      text="Thả tim"
                    />
                  </div>
                </div>
              </SwiperSlide>
            </>
          );
        })}
      </Swiper>
    </>
  );
};

export default ProductListSingleSuggest;
