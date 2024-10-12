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
import { CartItemType, Order, OrderItem, ProductType } from "@/types/type";
import axios from "axios";
import {
  PackageCheck,
  PackageMinus,
  PackageSearch,
  PackageX,
  Pin,
  ChevronsRight,
  Truck,
  Repeat,
  ChevronLeft
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import "../../../components/style.css";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import useCartdb from "@/hooks/client/db/use-cart-db";
import { PackageModal } from "@/components/(client)/modal/packageProdct-modal";
import { ReturnProduct } from "@/components/(client)/modal/returnProduct-modal";
import { ReviewModal } from "@/components/(client)/modal/review-product-packageProduct-modal";
import FormatDate from "@/components/format-Date";
import StatusProduct from "../../../components/ui/statusProduct";

const WareHouseDetail = ({
  params,
}: {
  params: { prepareProductId: string };
}) => {
  const router = useRouter();
  const user = useCurrentUser();
  const cartdb = useCartdb();
  const [data, setData] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openReturnProduct, setOpenReturnProduct] = useState(false);
  const [openReview, setOpenReview] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [matchingItemData, setmatchingItemData] = useState<Order>();

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

  useEffect(() => {
    if (openReview || openReturnProduct) {
      document.body.style.overflow = 'hidden'; // Ngăn chặn cuộn
    } else {
      document.body.style.overflow = 'auto'; // Khôi phục cuộn
    }

    // Clean up function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [openReview, openReturnProduct]);

  useEffect(() => {
    if (data.length > 0) {
      const order = data.find((item) => item.id === params.prepareProductId);
      if (order) {
        const navbarOrder = generateNavbarOrder(order);
        const activeItem = navbarOrder.findIndex((item) => item.active);

        if (activeItem !== -1) {
          // Check if the active item is "Da_giao" and set the step accordingly
          if (
            navbarOrder[activeItem].status === "Da_nhan_tra_hang" ||
            navbarOrder[activeItem].status === "Da_giao"
          ) {
            setCurrentStep(activeItem + 2); // Set to active item's index + 2 if "Đã giao"
          } else {
            setCurrentStep(activeItem + 1); // Set current step to active item's index + 1 for other cases
          }
        }
      }
    }
  }, [data, params.prepareProductId]);

  const generateNavbarOrder = (order: Order) => [
    {
      label: "Chờ xác nhận",
      icon: <Pin className="w-4 h-4" />,
      active: order.status === "Cho_xac_nhan",
      status: "Cho_xac_nhan",
    },
    {
      label: "Soạn hàng",
      icon: <PackageSearch className="w-4 h-4" />,
      active: order.status === "Soan_hang",
      status: "Soan_hang",
    },
    {
      label: "Chờ lấy hàng",
      icon: <Truck className="w-4 h-4" />,
      active: order.status === "Cho_lay_hang",
      status: "Cho_lay_hang",
    },
    {
      label: "Đang giao",
      icon: <ChevronsRight className="w-4 h-4" />,
      active: order.status === "Dang_giao",
      status: "Dang_giao",
    },
    {
      label: "Đã hủy",
      icon: <PackageX className="w-4 h-4" />,
      active: order.status === "Da_huy",
      status: "Da_huy",
    },
    {
      label: "Giao lại hàng",
      icon: <Repeat className="w-4 h-4" />,
      active: order.status === "Giao_lai_hang",
      status: "Giao_lai_hang",
    },
    {
      label: "Đã giao",
      icon: <PackageCheck className="w-4 h-4" />,
      active: order.status === "Da_giao",
      status: "Da_giao",
    },
    {
      label: "Trả hàng",
      icon: <PackageMinus className="w-4 h-4" />,
      active: order.status === "Tra_hang",
      status: "Tra_hang",
    },
    {
      label: "Shipper đang đến",
      icon: <PackageCheck className="w-4 h-4" />,
      active: order.status === "Shipper_dang_den",
      status: "Shipper_dang_den",
    },
    {
      label: "Hàng đã trả",
      icon: <PackageCheck className="w-4 h-4" />,
      active: order.status === "Da_nhan_tra_hang",
      status: "Da_nhan_tra_hang",
    },
  ];

  const getRouteBasedOnProductType = (productType: any) => {
    switch (productType.toLowerCase()) {
      case "ongnhua":
        return "ongnhua";
      case "quat":
        return "quat";
      case "bongden":
        return "bongden";
      case "daydien":
        return "daydien";
      case "ocam":
        return "ocam";
      case "son":
        return "son";
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
      console.error("Invalid route:", route);
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
      setmatchingItemData(matchId[0]);
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
          router.push("/cart");
          setLoading(false);
        }
      };

      onAddtoPushCart();
    });
  };

  const matchId = data.filter(
    (item: Order) => item.id === params.prepareProductId
  );

  return (
    <div>
      {openReview && (
        <>
          <div className="fixed inset-0 bg-black/80 h-full w-full z-40 flex items-center justify-center">
            <div className="h-max w-3/4 max-w-md border rounded-md gap-4 bg-slate-900 p-6 shadow-lg transition ease-in-out z-50">
              <ReviewModal
                isOpen={openReview}
                order={matchId[0]}
                onClose={() => setOpenReview(false)}
              />
            </div>
          </div>
        </>
      )}
      <PackageModal
        isOpen={open}
        order={matchingItemData || undefined}
        onClose={() => setOpen(false)}
        user={user}
      />
      {!loading && matchId.length === 0 && (
        <>
          <div className="flex justify-center">
            <Image src="/images/no-cart.png" alt="" width="108" height="98" />
          </div>
          <div className="flex justify-center my-2">
            <p className="text-neutral-500">Đơn hàng của bạn còn trống</p>
          </div>
          <div className="flex justify-center my-2">
            <Button
              disabled={loading}
              onClick={handleBuyNow}
              className="hover:underline"
            >
              Mua ngay
            </Button>
          </div>
        </>
      )}

      {loading && <LoadingPageComponent />}

      {
        matchId.map((order:Order) =>(
          <div key={order.id} className="bg-zinc-400 bg-opacity-10 rounded-b-md mb-0.5 p-3">
<div className="flex items-center justify-between">
                  <div className="text-sm flex items-center">
                  <ChevronLeft className="w-5 h-5 mr-1"/> TRỞ LẠI
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm">MÃ ĐƠN HÀNG: {order.id}</span>
                    <Separator
                      orientation="vertical"
                      className="border-gray-300 h-5 mx-2"
                    />
                    {order.status === "Cho_xac_nhan" && (
                      <StatusProduct
                        updatedAt={order.updatedAt}
                        titleStatus="Chờ xác nhận"
                        noneTitleStatus={false}
                        classTitleStatus="text-yellow-600"
                        status="ĐANG XỬ LÝ"
                        classStatus="text-red-500"
                      />
                    )}
                    {order.status === "Soan_hang" && (
                      <StatusProduct
                        updatedAt={order.updatedAt}
                        titleStatus="Chuẩn bị hàng"
                        noneTitleStatus={false}
                        classTitleStatus="text-yellow-600"
                        status="SOẠN HÀNG"
                        classStatus="text-red-500"
                      />
                    )}
                    {order.status === "Cho_lay_hang" && (
                      <StatusProduct
                        updatedAt={order.updatedAt}
                        titleStatus="Chuyển hàng cho shipper"
                        noneTitleStatus={false}
                        classTitleStatus="text-yellow-600"
                        status="BÀN GIAO SHIPPER"
                        classStatus="text-red-500"
                      />
                    )}
                    {order.status === "Dang_giao" && (
                      <StatusProduct
                        updatedAt={order.updatedAt}
                        titleStatus="Đơn hàng đang giao"
                        noneTitleStatus={false}
                        classTitleStatus="text-yellow-600"
                        status="ĐANG GIAO"
                        classStatus="text-red-500"
                      />
                    )}
                    {order.status === "Giao_lai_hang" && (
                      <StatusProduct
                        updatedAt={order.updatedAt}
                        titleStatus="Giao lại hàng"
                        noneTitleStatus={false}
                        classTitleStatus="text-yellow-600"
                        status="ĐANG GIAO LẠI HÀNG"
                        classStatus="text-red-500"
                      />
                    )}
                    {order.status === "Da_giao" && (
                      <StatusProduct
                        updatedAt={order.updatedAt}
                        titleStatus="Giao hàng thành công"
                        noneTitleStatus={false}
                        classTitleStatus="text-green-600"
                        status="HOÀN THÀNH"
                        classStatus="text-red-500"
                      />
                    )}
                    {order.status === "Da_huy" && (
                      <StatusProduct
                        updatedAt={order.updatedAt}
                        titleStatus="Đơn hơn đã hủy"
                        noneTitleStatus={false}
                        classTitleStatus="text-red-600"
                        status="HỦY ĐƠN HÀNG"
                        classStatus="text-red-500"
                      />
                    )}
                    {order.status === "Tra_hang" && (
                      <StatusProduct
                        updatedAt={order.updatedAt}
                        titleStatus="Trả hàng lại shop"
                        noneTitleStatus={false}
                        classTitleStatus="text-red-600"
                        status="TRẢ HÀNG"
                        classStatus="text-red-500"
                      />
                    )}
                    {order.status === "Shipper_chuan_bi" && (
                      <StatusProduct
                        updatedAt={order.updatedAt}
                        titleStatus="Shipper đang xác nhận đơn hàng"
                        noneTitleStatus={false}
                        classTitleStatus="text-red-600"
                        status="SHIPPER CHUẨN BỊ ĐẾN"
                        classStatus="text-red-500"
                      />
                    )}
                    {order.status === "Shipper_dang_den" && (
                      <StatusProduct
                        updatedAt={order.updatedAt}
                        titleStatus="Shipper đang đến nhận lại hàng"
                        noneTitleStatus={false}
                        classTitleStatus="text-red-600"
                        status="NHẬN HÀNG"
                        classStatus="text-red-500"
                      />
                    )}
                    {order.status === "Da_nhan_tra_hang" && (
                      <StatusProduct
                        updatedAt={order.updatedAt}
                        titleStatus="Đã nhận lại hàng có vấn đề"
                        noneTitleStatus={false}
                        classTitleStatus="text-red-600"
                        status="TRẢ HÀNG THÀNH CÔNG"
                        classStatus="text-red-500"
                      />
                    )}
                    {order.status === "Nhan_tai_cua_hang" && (
                      <StatusProduct
                        updatedAt={order.updatedAt}
                        titleStatus="Nhận tại cửa hàng"
                        noneTitleStatus={false}
                        classTitleStatus="text-yellow-600"
                        status="NHẬN HÀNG TẠI CỬA HÀNG"
                        classStatus="text-red-500"
                      />
                    )}
                    {order.status === "Soan_hang_nhan_tai_cua_hang" && (
                      <StatusProduct
                        updatedAt={order.updatedAt}
                        titleStatus="Đang soạn hàng"
                        noneTitleStatus={false}
                        classTitleStatus="text-yellow-600"
                        status="SOẠN HÀNG"
                        classStatus="text-red-500"
                      />
                    )}
                    {order.status === "Da_soan_hang_xong" && (
                      <StatusProduct
                        updatedAt={order.updatedAt}
                        titleStatus="Đã soạn hàng xong"
                        noneTitleStatus={false}
                        classTitleStatus="text-yellow-600"
                        status="KHÁCH HÀNG ĐẾN NHẬN"
                        classStatus="text-red-500"
                      />
                    )}
                    {order.status === "Da_nhan_tai_cua_hang" && (
                      <StatusProduct
                        updatedAt={order.updatedAt}
                        titleStatus="Giao hàng thành công"
                        noneTitleStatus={false}
                        classTitleStatus="text-green-600"
                        status="HOÀN THÀNH"
                        classStatus="text-red-500"
                      />
                    )}
                  </div>
                </div>
                </div>
        ))
      }

      {matchId.map((order: Order) => {
        const navbarOrder = generateNavbarOrder(order);

        //so sánh updatedAt nếu > hơn 3 ngày thì ẩn
        const updatedAt = new Date(order.updatedAt);
        const threeDaysLater = new Date(updatedAt);
        threeDaysLater.setDate(updatedAt.getDate() + 3);

        const isOverThreeDays = new Date() > threeDaysLater;
        return (
          <>
            <div
              key={order.id}
              className="flex items-center max-w-36 bg-zinc-400 bg-opacity-10 rounded-t-md py-16 max-w-7xl overflow-y-auto"
            >
              <div className="flex">
                {navbarOrder?.map((item, i) => (
                  <div
                    key={i}
                    className={`step-item ${
                      currentStep === i + 1 && "active"
                    } ${i + 1 < currentStep && "complete"} `}
                  >
                    <div className="step">{item.icon}</div>
                    <p className="text-slate-900 text-sm">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
            {openReturnProduct && (
              <>
                <div className="fixed inset-0 bg-black/80 h-full w-full z-40 flex items-center justify-center">
                  <div className="h-max w-3/4 max-w-md border rounded-md gap-4 bg-slate-900 p-6 shadow-lg transition ease-in-out z-50">
                    <ReturnProduct
                      order={order}
                      onClose={() => setOpenReturnProduct(false)}
                      user={user}
                    />
                  </div>
                </div>
              </>
            )}

            {!isOverThreeDays &&
              !order.returnProduct &&
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
                          onClick={() => setOpenReview(true)}
                        >
                          Đánh giá
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div
                    className="bg-[#fbf5e8] rounded-t-md mt-px px-5 py-3"
                    onClick={() => setOpenReturnProduct(true)}
                  >
                    <div className="flex">
                      <div className="w-3/4"></div>
                      <div className="w-1/4">
                        <Button
                          disabled={loading}
                          variant="outline"
                          className="bg-transparent"
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

                  <div className="separatorCustom" />
                  <div className="bg-zinc-400 bg-opacity-10 px-5 py-3">
                    <div className="flex">
                      <div className="w-1/4 space-y-2">
                        <p className="font-semibold">Địa chỉ nhận hàng</p>
                        <p className="text-sm">{order.name}</p>
                        <p className="text-gray-400 text-xs">{order.phone}</p>
                        <p className="text-gray-400 text-xs">{order.address}</p>
                        <p className="text-gray-400 text-xs">
                          {order.adressOther}
                        </p>
                      </div>
                      <div className="w-3/4">
                        {/* TODO: Làm google map hiển thị vị trí hiện tại của shipper hoặc ẩn  */}
                      </div>
                    </div>
                  </div>
                </>
              )}
          </>
        );
      })}

      {matchId.map((order: Order) => (
        <div key={order.id} className="bg-zinc-400 bg-opacity-10 p-5 mt-5">
          {order.orderItem.map((orderItem: OrderItem, index: number) => {
            const imageUrl: string | undefined =
              orderItem?.product?.images[0].url; // Adjust this line according to your actual data structure
            const productHeading = orderItem?.product?.heading || "404";

            //GetPrice dựa vào size và color
            const getPriceMatchColorandSize = () => {
              if (orderItem.product && orderItem.size && orderItem.color) {
                const {
                  price: priceSize,
                  percentpromotion: percentpromotionSize,
                } = getSizePrice(orderItem.product, orderItem.size);
                const {
                  price: priceColor,
                  percentpromotion: percentpromotionColor,
                } = getColorPrice(orderItem.product, orderItem.color);

                return Math.ceil(Math.max(priceSize, priceColor));
              }
              return 0; // Fallback price if product or productct is undefined
            };

            return (
              <>
                <div
                  key={orderItem.id}
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
                      toast.error("Sản phẩm đang gặp vấn đề!");
                    }
                  }}
                  className="flex items-center cursor-pointer"
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
                      Phân loại màu:
                      <div
                        className="h-4 w-4 rounded-full ml-2"
                        style={{ backgroundColor: orderItem.color }}
                      />
                    </p>
                    <p className="text-xs text-gray-500">
                      Phân loại kích thước: {orderItem.size}
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
            <span>Thành tiền:</span>{" "}
            <Currency value={calculateTotalPrice(order)} />
          </div>
          <div>
            <Separator className="my-2 bg-gray-300" />
            <div className="flex items-center justify-between">
              <div>Phương thức thanh toán:</div>
              <div>
                {order.isPaid === false ? (
                  <span>Thanh toán tiền mặt</span>
                ) : (
                  <span>Thanh toán online</span>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WareHouseDetail;
