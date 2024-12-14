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
  ChevronLeft,
  MapPinned,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import StatusProduct from "../../components/ui/statusProduct";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import useCartdb from "@/hooks/client/db/use-cart-db";
import { PackageModal } from "@/components/(client)/modal/packageProdct-modal";
import { ReturnProduct } from "@/components/(client)/modal/returnProduct-modal";
import { ReviewModal } from "@/components/(client)/modal/review-product-packageProduct-modal";
import FormatDate from "@/components/format-Date";
import "../../components/style.css";
import getWareHouse from "@/actions/client/warehouse";
import {
  getToastError,
  translateInsufficientStock,
  getProductNotFoundMessage,
  translateEmptyOrder,
  getBuyNowTranslation,
  translateColorCategory,
  translateSizeCategory,
  translateWaitingForConfirmation,
  translateProcessing,
  translatePreparingGoods,
  translatePackingGoods,
  translateShippedToShipper,
  translateHandedOverToShipper,
  translateOrderShipping,
  translateDelivering,
  translateReDelivering,
  translateReDeliveringNow,
  translateDeliverySuccessful,
  translateCompleted,
  translateOrderCancelled,
  translateCancelOrder,
  translateReturnToShop,
  translateReturnItem,
  translateShipperConfirmingOrder,
  translateShipperPreparingToArrive,
  translateShipperPickingUpOrder,
  translateReceiveItem,
  translateItemReceivedWithIssue,
  translateReturnItemSuccess,
  translatePickUpAtStore,
  translatePickUpAtStoreUpperCase,
  translatePreparingOrder,
  translatePrepareOrder,
  translateOrderPrepared,
  translateCustomerPickUp,
  translateReturnRequestInfo,
  translateResolveOrderFirst,
  translateOrderIssueContact,
  translateRate,
  translateReturnRefund,
  translateContactStore,
  translateBuyAgain,
  translateTotalAmount,
  translateDeliveryAddress,
  translateBack,
  translateOrderCodeUpperCase,
  translatePaymentMethod,
  translateCashPayment,
  translateOnlinePayment,
  translateWaitForPickup,
  translateDeliveringNormal,
  translateCancelled,
  translateDelivered,
  translateReturnItemNormal,
  translateShipperOnTheWay,
  translateReturnedItem,
  getWareHouseLocationProduct,
  getLoadingMessage,
} from "@/translate/translate-client";
import LocationProduct from "@/components/(client)/location-product/location-product";
import getCart from "@/actions/client/cart";

const WareHouseDetail = ({
  params,
}: {
  params: { packageProductId: string };
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
  const [storedLanguage, setStoredLanguage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    // Check if we're running on the client side
    if (typeof window !== "undefined") {
      const language = localStorage.getItem("language");
      setStoredLanguage(language);
    }
  }, []);

  //language
  const languageToUse =
    user?.id && user?.role !== "GUEST"
      ? user?.language
      : storedLanguage || "vi";
  const toastErrorMessage = getToastError(languageToUse);
  const insufficientStockMessage = translateInsufficientStock(languageToUse);
  const productNotFoundMessage = getProductNotFoundMessage(languageToUse);
  const emptyOrderMessage = translateEmptyOrder(languageToUse);
  const BuyNowMessage = getBuyNowTranslation(languageToUse);
  const colorCategoryMessage = translateColorCategory(languageToUse);
  const sizeCategoryMessage = translateSizeCategory(languageToUse);

  const waitingforConfirmationMessage =
    translateWaitingForConfirmation(languageToUse);
  const processingMessage = translateProcessing(languageToUse);
  const preparingGoodsMessage = translatePreparingGoods(languageToUse);
  const packingGoodsMessage = translatePackingGoods(languageToUse);
  const shippedToShipperMessage = translateShippedToShipper(languageToUse);
  const handedOverToShipperMessage =
    translateHandedOverToShipper(languageToUse);
  const OrderShippingMessage = translateOrderShipping(languageToUse);
  const deliveringMessage = translateDelivering(languageToUse);
  const reDeliveringMessage = translateReDelivering(languageToUse);
  const reDeliveringNowMessage = translateReDeliveringNow(languageToUse);
  const deliverySuccessfulMessage = translateDeliverySuccessful(languageToUse);
  const completedMessage = translateCompleted(languageToUse);
  const orderCancelledMessage = translateOrderCancelled(languageToUse);
  const cancelOrderMessage = translateCancelOrder(languageToUse);
  const returnToShopMessage = translateReturnToShop(languageToUse);
  const returnItemMessage = translateReturnItem(languageToUse);
  const shipperConfirmingOrderMessage =
    translateShipperConfirmingOrder(languageToUse);
  const shipperPreparingToArriveMessage =
    translateShipperPreparingToArrive(languageToUse);
  const shipperPickingUpOrderMessage =
    translateShipperPickingUpOrder(languageToUse);
  const receiveItemMessage = translateReceiveItem(languageToUse);
  const itemReceivedWithIssueMessage =
    translateItemReceivedWithIssue(languageToUse);
  const returnItemSuccessMessage = translateReturnItemSuccess(languageToUse);
  const PickUpAtStoreMessage = translatePickUpAtStore(languageToUse);
  const pickUpAtStoreUpperCaseMessage =
    translatePickUpAtStoreUpperCase(languageToUse);
  const preparingOrderMessage = translatePreparingOrder(languageToUse);
  const prepareOrderMessage = translatePrepareOrder(languageToUse);
  const oderPreparedMessage = translateOrderPrepared(languageToUse);
  const customerPickUpMessage = translateCustomerPickUp(languageToUse);

  const waitForPickUpMessage = translateWaitForPickup(languageToUse);
  const DeliveringNormalMessage = translateDeliveringNormal(languageToUse);
  const cancelledMessage = translateCancelled(languageToUse);
  const deliveredMessage = translateDelivered(languageToUse);
  const returnItemNormalMessage = translateReturnItemNormal(languageToUse);
  const shipperOnTheWayMessage = translateShipperOnTheWay(languageToUse);
  const returnedItemMessage = translateReturnedItem(languageToUse);

  const backMessage = translateBack(languageToUse);
  const orderCodeUpperCaseMessage = translateOrderCodeUpperCase(languageToUse);
  const returnRequestInfoMessage = translateReturnRequestInfo(languageToUse);
  const resolveOrderFirstMessage = translateResolveOrderFirst(languageToUse);
  const orderIssueContactMessage = translateOrderIssueContact(languageToUse);
  const RateMessage = translateRate(languageToUse);
  const returnRefundMessage = translateReturnRefund(languageToUse);
  const contactStoreMessage = translateContactStore(languageToUse);
  const buyAgaginMessage = translateBuyAgain(languageToUse);
  const deliveryAddressMessage = translateDeliveryAddress(languageToUse);
  const totalAmountMessage = translateTotalAmount(languageToUse);
  const paymentMethodMessage = translatePaymentMethod(languageToUse);
  const cashPayementMessage = translateCashPayment(languageToUse);
  const onlinePaymentMessage = translateOnlinePayment(languageToUse);
  const warehouseLocaltionProductMessage =
  getWareHouseLocationProduct(languageToUse);
  const loadingMessage = getLoadingMessage(languageToUse);

  const handleBuyNow = () => {
    router.push("/home-product");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const warehouse = await getWareHouse(languageToUse);
        setData(warehouse);
      } catch (error) {
        toast.error(toastErrorMessage);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user?.id]);

  useEffect(() => {
    if (openReview || openReturnProduct) {
      document.body.style.overflow = "hidden"; // Ngăn chặn cuộn
    } else {
      document.body.style.overflow = "auto"; // Khôi phục cuộn
    }

    // Clean up function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openReview, openReturnProduct]);

  useEffect(() => {
    if (data.length > 0) {
      const order = data.find((item) => item.id === params.packageProductId);
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
  }, [data, params.packageProductId]);

  const generateNavbarOrder = (order: Order) => [
    {
      label: waitingforConfirmationMessage,
      icon: <Pin className="w-4 h-4" />,
      active: order.status === "Cho_xac_nhan",
      status: "Cho_xac_nhan",
    },
    {
      label: prepareOrderMessage,
      icon: <PackageSearch className="w-4 h-4" />,
      active: order.status === "Soan_hang",
      status: "Soan_hang",
    },
    {
      label: waitForPickUpMessage,
      icon: <Truck className="w-4 h-4" />,
      active: order.status === "Cho_lay_hang",
      status: "Cho_lay_hang",
    },
    {
      label: DeliveringNormalMessage,
      icon: <ChevronsRight className="w-4 h-4" />,
      active: order.status === "Dang_giao",
      status: "Dang_giao",
    },
    {
      label: cancelledMessage,
      icon: <PackageX className="w-4 h-4" />,
      active: order.status === "Da_huy",
      status: "Da_huy",
    },
    {
      label: reDeliveringMessage,
      icon: <Repeat className="w-4 h-4" />,
      active: order.status === "Giao_lai_hang",
      status: "Giao_lai_hang",
    },
    {
      label: deliveredMessage,
      icon: <PackageCheck className="w-4 h-4" />,
      active: order.status === "Da_giao",
      status: "Da_giao",
    },
    {
      label: returnItemNormalMessage,
      icon: <PackageMinus className="w-4 h-4" />,
      active: order.status === "Tra_hang",
      status: "Tra_hang",
    },
    {
      label: shipperOnTheWayMessage,
      icon: <PackageCheck className="w-4 h-4" />,
      active: order.status === "Shipper_dang_den",
      status: "Shipper_dang_den",
    },
    {
      label: returnedItemMessage,
      icon: <PackageCheck className="w-4 h-4" />,
      active: order.status === "Da_nhan_tra_hang",
      status: "Da_nhan_tra_hang",
    },
  ];

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
      toast.error(toastErrorMessage);
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
          toast.error(insufficientStockMessage);
          return;
        }

        if (!orderItem.product) {
          toast.error(productNotFoundMessage);
          return;
        }

        try {
          setLoading(true);
        
          // Sử dụng getCart thay cho axios.post
          const cartItemData = await getCart({
            userId: user.id, // Lấy userId từ user object
            language: languageToUse, // Ngôn ngữ sử dụng
          });
        
          // Tìm sản phẩm trong giỏ hàng
          const matchingItem = cartItemData.filter(
            (item: CartItemType) =>
              item.product.name === orderItem.product?.name &&
              item.product.id === orderItem.product?.id &&
              item.size === orderItem.size &&
              item.color === orderItem.color
          );
        
          const maxQuantity = getQuantityMatchColorandSize(orderItem);
        
          // Kiểm tra nếu số lượng đã vượt quá
          if (matchingItem.length > 0) {
            const isQuantityExceeded = matchingItem.every(
              (item: CartItemType) =>
                item.quantity >= maxQuantity && maxQuantity !== undefined
            );
        
            if (isQuantityExceeded) {
              return;
            }
          }
        
          // Kiểm tra giỏ hàng trong cartdb cho các sản phẩm đã có
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
              // Cập nhật số lượng nếu sản phẩm đã có trong giỏ hàng
              cartdb.updateQuantity(
                existingCartItem.id,
                existingCartItem.quantity + 1,
                orderItem.warranty || null,
                user.id,
                languageToUse
              );
            } else {
              // Thêm sản phẩm vào giỏ hàng nếu chưa có
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
          toast.error(toastErrorMessage);
        } finally {
          router.push("/cart");
          setLoading(false);
        }
      };

      onAddtoPushCart();
    });
  };

  const matchId = data.filter(
    (item: Order) => item.id === params.packageProductId
  );

  useEffect(() => {
    if (loading ) {
      document.title = loadingMessage.loading;
    } else {
      document.title = matchId[0].orderItem[0].product?.name || matchId[0].name;
    }
}, [loading]);

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
                languageToUse={languageToUse}
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
        languageToUse={languageToUse}
      />
      {!loading && matchId.length === 0 && (
        <>
          <div className="flex justify-center">
            <Image src="/images/no-cart.png" alt="" width="108" height="98" />
          </div>
          <div className="flex justify-center my-2">
            <p className="text-neutral-500">{emptyOrderMessage}</p>
          </div>
          <div className="flex justify-center my-2">
            <Button
              disabled={loading}
              onClick={handleBuyNow}
              className="hover:underline"
            >
              {BuyNowMessage}
            </Button>
          </div>
        </>
      )}

      {loading && <LoadingPageComponent />}

      {matchId.map((order: Order) => (
        <div
          key={order.id}
          className="bg-zinc-400 bg-opacity-10 rounded-b-md mb-0.5 p-3"
        >
          {/* Modal Map Location Shipper đến người dùng */}
          {isModalOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[99999999]"
              onClick={closeModal}
            >
              <div
                className="relative bg-white dark:bg-slate-900 p-4 rounded-lg w-full max-w-7xl"
                onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside the image
              >
                <LocationProduct
                  userShipperId={order.shipper.id}
                  locationLat={order.shipper.locationLat}
                  locationLng={order.shipper.locationLng}
                />
                <button
                  onClick={closeModal}
                  className="absolute cursor-pointer top-2 right-2 flex items-center justify-center text-xl rounded-full text-slate-900 w-6 h-6 bg-gray-300 hover:bg-gray-400"
                >
                  &times;
                </button>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between">
            <Link
              href="/warehouse/package-product"
              className="text-sm flex items-center text-slate-900 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-200"
            >
              <ChevronLeft className="w-7 h-7 md:w-5 md:h-5 mr-1" />{" "}
              <span className="hidden md:block">{backMessage}</span>
            </Link>
            <div className="flex items-center">
              <span className="w-9/12 md:w-6/12 lg:w-full text-sm text-slate-900 dark:text-slate-200">
                <span className="font-semibold">
                  {orderCodeUpperCaseMessage}
                </span>{" "}
                {order.id}
              </span>
              <Separator
                orientation="vertical"
                className="border-gray-300 h-5 mx-2"
              />
              {order.status === "Cho_xac_nhan" && (
                <StatusProduct
                  updatedAt={order.updatedAt}
                  titleStatus={waitingforConfirmationMessage}
                  classTitleStatus="text-yellow-600"
                  noneTitleStatus={true}
                  status={processingMessage}
                  languageToUse={languageToUse}
                  classStatus="text-red-500"
                />
              )}
              {order.status === "Soan_hang" && (
                <StatusProduct
                  updatedAt={order.updatedAt}
                  titleStatus={preparingGoodsMessage}
                  classTitleStatus="text-yellow-600"
                  noneTitleStatus={true}
                  status={packingGoodsMessage}
                  languageToUse={languageToUse}
                  classStatus="text-red-500"
                />
              )}
              {order.status === "Cho_lay_hang" && (
                <StatusProduct
                  updatedAt={order.updatedAt}
                  titleStatus={shippedToShipperMessage}
                  classTitleStatus="text-yellow-600"
                  noneTitleStatus={true}
                  status={handedOverToShipperMessage}
                  languageToUse={languageToUse}
                  classStatus="text-red-500"
                />
              )}
              {order.status === "Dang_giao" && (
                <StatusProduct
                  updatedAt={order.updatedAt}
                  titleStatus={OrderShippingMessage}
                  classTitleStatus="text-yellow-600"
                  noneTitleStatus={true}
                  status={deliveringMessage}
                  languageToUse={languageToUse}
                  classStatus="text-red-500"
                />
              )}
              {order.status === "Giao_lai_hang" && (
                <StatusProduct
                  updatedAt={order.updatedAt}
                  titleStatus={reDeliveringMessage}
                  classTitleStatus="text-yellow-600"
                  noneTitleStatus={true}
                  status={reDeliveringNowMessage}
                  languageToUse={languageToUse}
                  classStatus="text-red-500"
                />
              )}
              {order.status === "Da_giao" && (
                <StatusProduct
                  updatedAt={order.updatedAt}
                  titleStatus={deliverySuccessfulMessage}
                  classTitleStatus="text-green-600"
                  noneTitleStatus={true}
                  status={completedMessage}
                  languageToUse={languageToUse}
                  classStatus="text-red-500"
                />
              )}
              {order.status === "Da_huy" && (
                <StatusProduct
                  updatedAt={order.updatedAt}
                  titleStatus={orderCancelledMessage}
                  classTitleStatus="text-red-600"
                  noneTitleStatus={true}
                  status={cancelOrderMessage}
                  languageToUse={languageToUse}
                  classStatus="text-red-500"
                />
              )}
              {order.status === "Tra_hang" && (
                <StatusProduct
                  updatedAt={order.updatedAt}
                  titleStatus={returnToShopMessage}
                  classTitleStatus="text-red-600"
                  noneTitleStatus={true}
                  status={returnItemMessage}
                  languageToUse={languageToUse}
                  classStatus="text-red-500"
                />
              )}
              {order.status === "Shipper_chuan_bi" && (
                <StatusProduct
                  updatedAt={order.updatedAt}
                  titleStatus={shipperConfirmingOrderMessage}
                  classTitleStatus="text-red-600"
                  noneTitleStatus={true}
                  status={shipperPreparingToArriveMessage}
                  languageToUse={languageToUse}
                  classStatus="text-red-500"
                />
              )}
              {order.status === "Shipper_dang_den" && (
                <StatusProduct
                  updatedAt={order.updatedAt}
                  titleStatus={shipperPickingUpOrderMessage}
                  classTitleStatus="text-red-600"
                  noneTitleStatus={true}
                  status={receiveItemMessage}
                  languageToUse={languageToUse}
                  classStatus="text-red-500"
                />
              )}
              {order.status === "Da_nhan_tra_hang" && (
                <StatusProduct
                  updatedAt={order.updatedAt}
                  titleStatus={itemReceivedWithIssueMessage}
                  classTitleStatus="text-red-600"
                  noneTitleStatus={true}
                  status={returnItemSuccessMessage}
                  languageToUse={languageToUse}
                  classStatus="text-red-500"
                />
              )}
              {order.status === "Nhan_tai_cua_hang" && (
                <StatusProduct
                  updatedAt={order.updatedAt}
                  titleStatus={PickUpAtStoreMessage}
                  classTitleStatus="text-yellow-600"
                  noneTitleStatus={true}
                  status={pickUpAtStoreUpperCaseMessage}
                  languageToUse={languageToUse}
                  classStatus="text-red-500"
                />
              )}
              {order.status === "Soan_hang_nhan_tai_cua_hang" && (
                <StatusProduct
                  updatedAt={order.updatedAt}
                  titleStatus={preparingOrderMessage}
                  classTitleStatus="text-yellow-600"
                  noneTitleStatus={true}
                  status={prepareOrderMessage}
                  languageToUse={languageToUse}
                  classStatus="text-red-500"
                />
              )}
              {order.status === "Da_soan_hang_xong" && (
                <StatusProduct
                  updatedAt={order.updatedAt}
                  titleStatus={oderPreparedMessage}
                  classTitleStatus="text-yellow-600"
                  noneTitleStatus={true}
                  status={customerPickUpMessage}
                  languageToUse={languageToUse}
                  classStatus="text-red-500"
                />
              )}
              {order.status === "Da_nhan_tai_cua_hang" && (
                <StatusProduct
                  updatedAt={order.updatedAt}
                  titleStatus={deliverySuccessfulMessage}
                  classTitleStatus="text-green-600"
                  noneTitleStatus={true}
                  status={completedMessage}
                  languageToUse={languageToUse}
                  classStatus="text-red-500"
                />
              )}
            </div>
          </div>
        </div>
      ))}

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
                    <p className="text-slate-900 dark:text-slate-200 text-sm">
                      {item.label}
                    </p>
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
                      languageToUse={languageToUse}
                    />
                  </div>
                </div>
              </>
            )}

            {!isOverThreeDays &&
              !order.returnProduct &&
              (order.status === "Da_giao" ||
                order.status === "Da_nhan_tai_cua_hang") && (
                <>
                  <div className="bg-[#fbf5e8] dark:bg-slate-700 rounded-t-md mt-px px-5 py-3">
                    <div className="flex">
                      <div className="w-3/4">
                        <p className="text-xs text-gray-400 dark:text-slate-200">
                          {returnRequestInfoMessage}
                        </p>
                        <p className="text-xs text-gray-400">
                          {resolveOrderFirstMessage}
                          {
                            <FormatDate
                              subtractiontime={true}
                              data={threeDaysLater}
                              language={languageToUse}
                            />
                          }
                          .
                        </p>
                        <p className="text-xs text-gray-400 dark:text-slate-200">
                          {orderIssueContactMessage}
                          <Link href="tel:0352261103" className="underline">
                            0352261103
                          </Link>{" "}
                        </p>
                      </div>
                      <div className="w-[40%] md:w-1/4">
                        <Button
                          disabled={loading}
                          className="bg-red-500 text-slate-900 dark:text-slate-200 dark:hover:text-slate-900"
                          onClick={() => setOpenReview(true)}
                        >
                          {RateMessage}
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div
                    className="bg-[#fbf5e8] dark:bg-slate-700 rounded-t-md mt-px px-2 md:px-5 py-3"
                    onClick={() => setOpenReturnProduct(true)}
                  >
                    <div className="flex">
                      <div className="w-3/4"></div>
                      <div className="w-[40%] md:w-1/4">
                        <Button
                          disabled={loading}
                          variant="outline"
                          className="bg-transparent text-slate-900 dark:text-slate-200 dark:border px-1 dark:border-white text-xs md:text-sm"
                        >
                          {returnRefundMessage}
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#fbf5e8] dark:bg-slate-700 rounded-t-md mt-px px-2 md:px-5 py-3">
                    <div className="flex">
                      <div className="w-3/4"></div>
                      <div className="w-[40%] md:w-1/4">
                        <Button
                          disabled={loading}
                          variant="outline"
                          className="bg-transparent text-slate-900 dark:text-slate-200 dark:border dark:border-white text-xs md:text-sm"
                        >
                          <Link href="tel:0352261103">
                            {contactStoreMessage}
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#fbf5e8] dark:bg-slate-700 rounded-t-md mt-px px-2 md:px-5 py-3">
                    <div className="flex">
                      <div className="w-3/4"></div>
                      <div className="w-[40%] md:w-1/4">
                        <Button
                          disabled={loading}
                          variant="outline"
                          className="bg-transparent text-slate-900 dark:text-slate-200 dark:border dark:border-white text-xs md:text-sm"
                          onClick={() => handleBuyAgainClick(order)}
                        >
                          {buyAgaginMessage}
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="separatorCustom" />
                  <div className="bg-zinc-400 bg-opacity-10 px-5 py-3">
                  <div className="flex flex-wrap">
                      <div className="w-full md:w-1/2 p-2">
                        <p className="font-semibold text-sky-500">
                          {deliveryAddressMessage}
                        </p>
                        <p className="text-sm text-slate-900 dark:text-slate-200">
                          {order.name}
                        </p>
                        <p className="text-gray-400 text-sm">{order.phone}</p>
                        <p className="text-gray-400 text-xs break-words">
                          {order.address}
                        </p>
                        <p className="text-gray-400 text-xs">
                          {order.adressOther}
                        </p>
                      </div>
                      <div className="w-full md:w-1/2 p-2">
                        {order.shipper ? (
                          <div className="space-y-2">
                            <p className="font-semibold text-sky-500">
                              {warehouseLocaltionProductMessage.deliveryInfo}
                            </p>
                            <div className="flex items-center space-x-1">
                              <span className="font-semibold text-slate-900 dark:text-slate-200">
                                {warehouseLocaltionProductMessage.deliveryName}
                              </span>
                              <span className="text-slate-900 dark:text-slate-200">
                                {order.shipper.name}
                              </span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <span className="font-semibold text-slate-900 dark:text-slate-200">
                                Email:
                              </span>
                              <span className="text-slate-900 dark:text-slate-200">
                                {order.shipper.email}
                              </span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <span className="font-semibold text-slate-900 dark:text-slate-200">
                                {warehouseLocaltionProductMessage.phoneNumber}:
                              </span>
                              <span className="text-slate-900 dark:text-slate-200">
                                {order.shipper.phonenumber}
                              </span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <span className="font-semibold text-slate-900 dark:text-slate-200">
                                {
                                  warehouseLocaltionProductMessage.deliveryStatus
                                }
                                :
                              </span>
                              <span className=" text-slate-900 dark:text-slate-200">
                                {order.shipper.isSharingLocation ? (
                                  <span className="text-green-500">
                                    {
                                      warehouseLocaltionProductMessage.delivering
                                    }
                                  </span>
                                ) : (
                                  <span className="text-yellow-500">
                                    {warehouseLocaltionProductMessage.inTransit}
                                  </span>
                                )}
                              </span>
                            </div>
                            <Button
                              variant="destructive"
                              onClick={openModal}
                              className="mt-3"
                            >
                              {warehouseLocaltionProductMessage.orderLocation}{" "}
                              <MapPinned className="w-5 h-5" />
                            </Button>
                          </div>
                        ) : (
                          <div className="flex justify-center items-center h-full">
                            <span className="text-md font-semibold text-yellow-500">
                              {warehouseLocaltionProductMessage.awaitingPickup}
                            </span>
                          </div>
                        )}
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
                      toast.error(toastErrorMessage);
                    }
                  }}
                  className="flex items-center cursor-pointer"
                >
                  <div className="w-3/12 md:w-1/6 lg:w-1/12">
                    {typeof imageUrl === "string" ? (
                      <Image
                        src={imageUrl}
                        alt={productHeading}
                        className="border border-gray-300"
                        width={100}
                        height={100}
                        blurDataURL="/images/image-placeholder.webp"
                        loading="lazy"
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
                    <p className="truncate max-w-[8rem] md:max-w-xs lg:max-w-lg xl:max-w-xl text-slate-900 dark:text-slate-200">
                      {orderItem.product?.heading}
                    </p>
                    <p className="flex text-xs text-gray-500 dark:text-gray-400">
                      {colorCategoryMessage}
                      <div
                        className="h-4 w-4 rounded-full ml-2"
                        style={{ backgroundColor: orderItem.color }}
                      />
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {sizeCategoryMessage} {orderItem.size}
                    </p>
                    <p className="text-slate-900 dark:text-slate-200">
                      x{orderItem.quantity}
                    </p>
                  </div>
                  <div className="w-4/12 md:w-1/5 text-end text-slate-900 dark:text-slate-200">
                    {formatter.format(getPriceMatchColorandSize())}
                  </div>
                </div>

                <Separator className="my-2 bg-gray-300" />
              </>
            );
          })}

          {/* Đây là return ngoài order còn bên trong kia orderItem nó sẽ lặp lại trên mỗi Item còn đây chỉ lặp trên 1 order 1 cái*/}
          <div className="flex items-center justify-between mt-8">
            <span className="text-slate-900 dark:text-slate-200 text-sm md:text-base">
              {totalAmountMessage}
            </span>{" "}
            <Currency value={calculateTotalPrice(order)} />
          </div>
          <div>
            <Separator className="my-2 bg-gray-300" />
            <div className="flex items-center justify-between">
              <div className="text-slate-900 dark:text-slate-200 text-sm md:text-base">
                {paymentMethodMessage}
              </div>
              <div>
                {order.isPaid === false ? (
                  <span className="text-yellow-500 text-sm md:text-base">
                    {cashPayementMessage}
                  </span>
                ) : (
                  <span className="text-green-500 text-sm md:text-base">
                    {onlinePaymentMessage}
                  </span>
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
