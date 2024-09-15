"use client";
import {
  getColorPrice,
  getSizePrice,
} from "@/components/(client)/export-product-compare/size-color/match-color-size";
import Currency from "@/components/ui/currency";
import LoadingPageComponent from "@/components/ui/loading";
import { Separator } from "@/components/ui/separator";
import { useCurrentUser } from "@/hooks/use-current-user";
import { formatter } from "@/lib/utils";
import { CartItemType, Order, OrderItem } from "@/types/type";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import StatusProduct from "../components/ui/statusProduct";
import { Button } from "@/components/ui/button";
import SearchPackageProduct from "../components/search-packageProduct";
import FormatDate from "@/components/format-Date";
import Link from "next/link";
import useCartdb from "@/hooks/client/db/use-cart-db";
import { ReviewModal } from "@/components/(client)/modal/review-product-packageProduct-modal";
import { PackageModal } from "@/components/(client)/modal/packageProdct-modal";
import { ReturnProduct } from "@/components/(client)/modal/returnProduct-modal";

const Delivery = () => {
  const router = useRouter();
  const user = useCurrentUser();
  const cartdb = useCartdb();
  const [data, setData] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [matchingItemData, setmatchingItemData] = useState<Order>();
  const [openReview, setOpenReview] = useState(false);
  const [openReturnProduct, setOpenReturnProduct] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order>();

  // Function to handle opening the review modal with a specific order
  const handleOpenReview = (order: Order) => {
    setSelectedOrder(order); // Set the selected order
    setOpenReview(true); // Open the review modal
  };

  const handleOpenReturnProduct = (order: Order) => {
    setSelectedOrder(order); // Set the selected order
    setOpenReturnProduct(true);
  };

  const handleBuyNow = () => {
    router.push("/home-product");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/warehouse`
        );

        setData(response.data);
      } catch (error) {
        toast.error("Fetch data error!");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user?.id]);

  // Sorting function to sort orders based on status
  const sortOrders = (orders: Order[]) => {
    const orderPriority = {
      Dang_giao: 1,
      Soan_hang: 2,
      Da_soan_hang_xong: 3,
      Tra_hang: 4,
      Giao_lai_hang: 5,
      Shipper_dang_den: 6,
      Nhan_tai_cua_hang: 7,
      Soan_hang_nhan_tai_cua_hang: 8,
      Cho_lay_hang: 9,
      Cho_xac_nhan: 10,
      Da_huy: 11,
      Da_giao: 12,
      Da_nhan_tai_cua_hang: 13,
    };

    return orders.sort((a, b) => {
      const priorityA =
        orderPriority[a.status as keyof typeof orderPriority] || 9;
      const priorityB =
        orderPriority[b.status as keyof typeof orderPriority] || 9;
      return priorityA - priorityB;
    });
  };

  const sortedData = sortOrders(data);

  const handleBuyAgainClick = (order: Order) => {
    // Helper function to get the quantity based on the highest price
    const getQuantityMatchColorandSize = (orderItem: OrderItem) => {
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

        const { productdetail } = orderItem.product;
        switch (highestPrice) {
          case productdetail.price5 *
            ((100 - productdetail.percentpromotion5) / 100):
            return productdetail.quantity5;
          case productdetail.price4 *
            ((100 - productdetail.percentpromotion4) / 100):
            return productdetail.quantity4;
          case productdetail.price3 *
            ((100 - productdetail.percentpromotion3) / 100):
            return productdetail.quantity3;
          case productdetail.price2 *
            ((100 - productdetail.percentpromotion2) / 100):
            return productdetail.quantity2;
          default:
            return productdetail.quantity1;
        }
      }
      return 0;
    };

    // Check if any item is out of stock
    const isAnyItemOutOfStock = order.orderItem.some(
      (orderItem) => getQuantityMatchColorandSize(orderItem) === 0
    );

    if (isAnyItemOutOfStock) {
      setmatchingItemData(order);
      setOpen(true);
      return;
    }

    // Proceed to add to cart if all items are in stock
    order.orderItem.forEach((orderItem) => {
      const onAddtoPushCart = async () => {
        if (user?.role === "GUEST" || !user?.id) return;

        if (!orderItem.size && !orderItem.color) {
          toast.error("Không tìm thấy số lượng của sản phẩm!");
          return;
        }

        if (!orderItem.product) {
          toast.error("Không tìm thấy sản phẩm!");
          return;
        }

        try {
          setLoading(true);
          const response = await axios.post("/api/client/cart/get-items", {
            userId: user.id,
          });
          const cartItemData = response.data;

          const matchingItem = cartItemData.filter(
            (item: CartItemType) =>
              item.product.name === orderItem.product?.name &&
              item.product.id === orderItem.product?.id &&
              item.size === orderItem.size &&
              item.color === orderItem.color
          );

          const maxQuantity = getQuantityMatchColorandSize(orderItem);

          if (matchingItem.length > 0) {
            const isQuantityExceeded = matchingItem.every(
              (item: CartItemType) =>
                item.quantity >= maxQuantity && maxQuantity !== undefined
            );

            if (isQuantityExceeded) {
              return;
            }
          }

          // Check in cartdb for existing items
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
              // Update quantity if the product already exists in the cart
              cartdb.updateQuantity(
                existingCartItem.id,
                existingCartItem.quantity + 1,
                orderItem.warranty || null,
                user.id
              );
            } else {
              // Add the product to the cart
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
          toast.error("Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng.");
        } finally {
          router.push("/cart")
          setLoading(false);
        }
      };

      onAddtoPushCart();
    });
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

  return (
    <>
      {!loading && <SearchPackageProduct order={data} />}

      {!loading && sortedData.length === 0 && (
        <>
          <div className="flex justify-center">
            <Image src="/images/no-cart.png" alt="" width="108" height="98" />
          </div>
          <div className="flex justify-center my-2">
            <p className="text-neutral-500">Đơn hàng của bạn còn trống</p>
          </div>
          <div className="flex justify-center my-2">
            <Button onClick={handleBuyNow} className="hover:underline">
              {" "}
              Mua ngay
            </Button>
          </div>
        </>
      )}

      {loading && <LoadingPageComponent />}

      {sortedData.map((order: Order) => {
        //so sánh updatedAt nếu > hơn 3 ngày thì ẩn
        const updatedAt = new Date(order.updatedAt);
        const threeDaysLater = new Date(updatedAt);
        threeDaysLater.setDate(updatedAt.getDate() + 3);

        const isOverThreeDays = new Date() > threeDaysLater;

        return (
          <>
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
                      onClick={() =>
                        router.push(`/warehouse/package-product/${order.id}`)
                      }
                    >
                      {openReturnProduct && (
                        <>
                          <div className="fixed inset-0 bg-black/80 h-full w-full z-40 flex items-center justify-center">
                            <div className="h-max w-3/4 max-w-md border rounded-md gap-4 bg-slate-900 p-6 shadow-lg transition ease-in-out z-50">
                              <ReturnProduct
                                order={selectedOrder}
                                onClose={() => setOpenReturnProduct(false)}
                                user={user}
                              />
                            </div>
                          </div>
                        </>
                      )}

                      {openReview && (
                        <>
                            <ReviewModal
                              isOpen={openReview}
                              order={selectedOrder}
                              onClose={() => setOpenReview(false)}
                            />
                        </>
                      )}
                      <PackageModal
                        isOpen={open}
                        order={matchingItemData || undefined}
                        onClose={() => setOpen(false)}
                        user={user}
                      />
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
                          Phân loại màu:
                          <div
                            className="h-4 w-4 rounded-full ml-2"
                            style={{ backgroundColor: selectedColor }}
                          />
                        </p>
                        <p className="text-xs text-gray-500">
                          Phân loại kích thước: {selectedSize}
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
                      titleStatus="Chờ xác nhận"
                      classTitleStatus="text-yellow-600"
                      noneTitleStatus={true}
                      status="ĐANG XỬ LÝ"
                      classStatus="text-red-500"
                    />
                  )}
                  {order.status === "Soan_hang" && (
                    <StatusProduct
                      updatedAt={order.updatedAt}
                      titleStatus="Chuẩn bị hàng"
                      classTitleStatus="text-yellow-600"
                      noneTitleStatus={true}
                      status="SOẠN HÀNG"
                      classStatus="text-red-500"
                    />
                  )}
                  {order.status === "Cho_lay_hang" && (
                    <StatusProduct
                      updatedAt={order.updatedAt}
                      titleStatus="Chuyển hàng cho shipper"
                      classTitleStatus="text-yellow-600"
                      noneTitleStatus={true}
                      status="BÀN GIAO SHIPPER"
                      classStatus="text-red-500"
                    />
                  )}
                  {order.status === "Dang_giao" && (
                    <StatusProduct
                      updatedAt={order.updatedAt}
                      titleStatus="Đơn hàng đang giao"
                      classTitleStatus="text-yellow-600"
                      noneTitleStatus={true}
                      status="ĐANG GIAO"
                      classStatus="text-red-500"
                    />
                  )}
                  {order.status === "Giao_lai_hang" && (
                    <StatusProduct
                      updatedAt={order.updatedAt}
                      titleStatus="Giao lại hàng"
                      classTitleStatus="text-yellow-600"
                      noneTitleStatus={true}
                      status="ĐANG GIAO LẠI HÀNG"
                      classStatus="text-red-500"
                    />
                  )}
                  {order.status === "Da_giao" && (
                    <StatusProduct
                      updatedAt={order.updatedAt}
                      titleStatus="Giao hàng thành công"
                      classTitleStatus="text-green-600"
                      noneTitleStatus={true}
                      status="HOÀN THÀNH"
                      classStatus="text-red-500"
                    />
                  )}
                  {order.status === "Da_huy" && (
                    <StatusProduct
                      updatedAt={order.updatedAt}
                      titleStatus="Đơn hơn đã hủy"
                      classTitleStatus="text-red-600"
                      noneTitleStatus={true}
                      status="HỦY ĐƠN HÀNG"
                      classStatus="text-red-500"
                    />
                  )}
                  {order.status === "Tra_hang" && (
                    <StatusProduct
                      updatedAt={order.updatedAt}
                      titleStatus="Trả hàng lại shop"
                      classTitleStatus="text-red-600"
                      noneTitleStatus={true}
                      status="TRẢ HÀNG"
                      classStatus="text-red-500"
                    />
                  )}
                  {order.status === "Shipper_chuan_bi" && (
                    <StatusProduct
                      updatedAt={order.updatedAt}
                      titleStatus="Shipper đang xác nhận đơn hàng"
                      classTitleStatus="text-red-600"
                      noneTitleStatus={true}
                      status="SHIPPER CHUẨN BỊ ĐẾN"
                      classStatus="text-red-500"
                    />
                  )}
                  {order.status === "Shipper_dang_den" && (
                    <StatusProduct
                      updatedAt={order.updatedAt}
                      titleStatus="Shipper đang đến nhận lại hàng"
                      classTitleStatus="text-red-600"
                      noneTitleStatus={true}
                      status="NHẬN HÀNG"
                      classStatus="text-red-500"
                    />
                  )}
                  {order.status === "Da_nhan_tra_hang" && (
                    <StatusProduct
                      updatedAt={order.updatedAt}
                      titleStatus="Đã nhận lại hàng có vấn đề"
                      classTitleStatus="text-red-600"
                      noneTitleStatus={true}
                      status="TRẢ HÀNG THÀNH CÔNG"
                      classStatus="text-red-500"
                    />
                  )}
                  {order.status === "Nhan_tai_cua_hang" && (
                    <StatusProduct
                      updatedAt={order.updatedAt}
                      titleStatus="Nhận tại cửa hàng"
                      classTitleStatus="text-yellow-600"
                      noneTitleStatus={true}
                      status="NHẬN HÀNG TẠI CỬA HÀNG"
                      classStatus="text-red-500"
                    />
                  )}
                  {order.status === "Soan_hang_nhan_tai_cua_hang" && (
                    <StatusProduct
                      updatedAt={order.updatedAt}
                      titleStatus="Đang soạn hàng"
                      classTitleStatus="text-yellow-600"
                      noneTitleStatus={true}
                      status="Soạn hàng"
                      classStatus="text-red-500"
                    />
                  )}
                  {order.status === "Da_soan_hang_xong" && (
                    <StatusProduct
                      updatedAt={order.updatedAt}
                      titleStatus="Đã soạn hàng xong"
                      classTitleStatus="text-yellow-600"
                      noneTitleStatus={true}
                      status="KHÁCH HÀNG ĐẾN NHẬN"
                      classStatus="text-red-500"
                    />
                  )}
                  {order.status === "Da_nhan_tai_cua_hang" && (
                    <StatusProduct
                      updatedAt={order.updatedAt}
                      titleStatus="Giao hàng thành công"
                      classTitleStatus="text-green-600"
                      noneTitleStatus={true}
                      status="HOÀN THÀNH"
                      classStatus="text-red-500"
                    />
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <span>Thành tiền:</span>{" "}
                  <Currency value={calculateTotalPrice(order)} />
                </div>
              </div>
            </div>

            {!isOverThreeDays && !order.returnProduct && 
              (order.status === "Da_giao" ||
                order.status === "Nhan_tai_cua_hang") && (
                <>
                  <div className="bg-[#fbf5e8] rounded-t-md mt-px px-5 py-3">
                    <div className="flex">
                      <div className="w-3/4">
                        <p className="text-xs text-gray-400">
                          Nếu hàng nhận được có vấn đề, bạn có thể gửi yêu cầu
                          Trả hàng/Hoàn tiền trước trước 3 ngày kể từ ngày bạn
                          nhận.
                        </p>
                        <p className="text-xs text-gray-400">
                          Giải quết đơn hàng trước{" "}
                          {
                            <FormatDate
                              subtractiontime={true}
                              data={threeDaysLater}
                            />
                          }
                          .
                        </p>
                        <p className="text-xs text-gray-400">
                          Có vấn đề về đơn hàng liên hệ số điện thoại{" "}
                          <Link href="tel:0352261103" className="underline">
                            0352261103
                          </Link>{" "}
                        </p>
                      </div>
                      <div className="w-1/4">
                        <Button
                          disabled={loading}
                          className="bg-red-500"
                          onClick={() => handleOpenReview(order)}
                        >
                          Đánh giá
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#fbf5e8] rounded-t-md mt-px px-5 py-3">
                    <div className="flex">
                      <div className="w-3/4"></div>
                      <div className="w-1/4">
                        <Button
                          disabled={loading}
                          variant="outline"
                          className="bg-transparent"
                          onClick={() => handleOpenReturnProduct(order)}
                        >
                          Yêu cầu Trả Hàng/Hoàn Tiền
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#fbf5e8] rounded-t-md mt-px px-5 py-3">
                    <div className="flex">
                      <div className="w-3/4"></div>
                      <div className="w-1/4">
                        <Button
                          disabled={loading}
                          variant="outline"
                          className="bg-transparent"
                        >
                          <Link href="tel:0352261103">Liên hệ của hàng</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#fbf5e8] rounded-t-md mt-px px-5 py-3">
                    <div className="flex">
                      <div className="w-3/4"></div>
                      <div className="w-1/4">
                        <Button
                          disabled={loading}
                          variant="outline"
                          className="bg-transparent"
                          onClick={() => handleBuyAgainClick(order)}
                        >
                          Mua lại
                        </Button>
                      </div>
                    </div>
                  </div>
                </>
              )}
          </>
        );
      })}
    </>
  );
};

export default Delivery;
