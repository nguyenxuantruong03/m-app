import { ShoppingBag, LoaderCircle, Plus, X } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import { Hint } from "@/components/ui/hint";
import { useEffect, useState, MouseEventHandler } from "react";
import axios from "axios";
import { Product, ProductDetail, Image as ImageData } from "@prisma/client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";
import {
  getColorPrice,
  getSizePrice,
} from "../(client)/export-product-compare/size-color/match-color-size";
import { debounce } from "lodash";
import { useCurrentUser } from "@/hooks/use-current-user";
import { CartItemType } from "@/types/type";
import useCartdb from "@/hooks/client/db/use-cart-db";
import Currency from "../ui/currency";
import PreviewModal from "../(client)/modal/preview-modal";

interface ProductWithImages extends Product {
  images: ImageData[];
  productdetail: ProductDetail;
}

interface ShippingCartInLiveProps {
  isPin?: boolean;
}
const ShoppingCardInLive = ({ isPin = true }: ShippingCartInLiveProps) => {
  const router = useRouter();
  const userId = useCurrentUser();
  const cartdb = useCartdb();
  const [data, setData] = useState<ProductWithImages[]>([]);
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null); // Add currentProduct state
  const [openPreviewModal, setOpenPreviewModal] = useState(false);
  const [isShowPin, setIsShowPin] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/getAllProductNotQuery`
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const productTypeDisplayNames: Record<string, string> = {
    PRODUCT: "Pin",
    PRODUCT1: "Quạt",
    PRODUCT2: "Ống nhựa, ống lưới xanh",
    PRODUCT3: "Dây điện",
    PRODUCT4: "Đá cắt",
    PRODUCT5: "Ổ khóa",
    PRODUCT6: "Keo",
    PRODUCT7: "Ổ cắm, mặt ổ cắm",
    PRODUCT8: "Sơn",
    PRODUCT9: "Vật liệu nhà tắm",
    PRODUCT10: "Bóng đèn",
    PRODUCT11: "Đồ thường dùng",
  };

  // Nhóm các sản phẩm theo productType, chỉ lấy sản phẩm isProductShowLive === true
  const groupedProducts = data
    .filter((product) => product.isProductShowLive) // Lọc sản phẩm có isProductShowLive === true
    .reduce((acc: Record<string, ProductWithImages[]>, product) => {
      const productType = product.productType;
      if (!acc[productType]) {
        acc[productType] = [];
      }
      acc[productType].push(product);
      return acc;
    }, {});

  // Sắp xếp productType theo thứ tự product, product1, product2,... product11
  const sortedProductTypes = Object.keys(groupedProducts).sort((a, b) => {
    // Tách phần chuỗi và phần số
    const regex = /^([^\d]*)(\d*)$/; // regex để tách chuỗi và số

    const [, aPrefix, aNumber] = a.match(regex) || [];
    const [, bPrefix, bNumber] = b.match(regex) || [];

    // Nếu cả hai đều có cùng phần chuỗi (ví dụ: 'PRODUCT'), thì sắp xếp theo số
    if (aPrefix === bPrefix) {
      const numA = parseInt(aNumber || "0", 10);
      const numB = parseInt(bNumber || "0", 10);
      return numA - numB;
    }

    // Nếu khác phần chuỗi, sắp xếp theo thứ tự từ điển
    return a.localeCompare(b);
  });

  const getRouteBasedOnProductType = (productType: any) => {
    switch (productType.toLowerCase()) {
      case "ongnhua":
        return "ongnhua";
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

  const handleClickPushProduct = (name: string, productType: string) => {
    const route = getRouteBasedOnProductType(productType);
    // // -----------Log the values for debugging----------------
    // console.log('Product Type:', data.productType);
    // console.log('Route:', route);
    if (route) {
      // Construct the complete URL
      const href = `/${route}/${name}`;
      // Use the Link component for navigation
      router.push(href);
    } else {
      console.error("Invalid route:", route);
    }
  };

  const findLowestPriceAndPromotion = (productDetail: any) => {
    let lowestPrice = Infinity;
    let bestPromotion = 0;

    for (let i = 1; i <= 5; i++) {
      const quantity = productDetail[`quantity${i}`];

      if (quantity > 0) {
        const price = productDetail[`price${i}`];
        const percentPromotion = productDetail[`percentpromotion${i}`];

        if (price < lowestPrice) {
          lowestPrice = price;
          bestPromotion = percentPromotion;
        }
      }
    }

    if (lowestPrice === Infinity) {
      lowestPrice = productDetail.price1;
      bestPromotion = productDetail.percentpromotion1;
    }

    return {
      price: lowestPrice,
      percentPromotion: bestPromotion,
    };
  };

  // Utility function to find the lowest price details
  const findLowestPriceDetails = (productDetail: any) => {
    let lowestPrice = Infinity;
    let bestSize = null;
    let bestColor = null;
    let bestPromotion = 0;

    for (let i = 1; i <= 5; i++) {
      const quantity = productDetail[`quantity${i}`];

      if (quantity > 0) {
        const price = productDetail[`price${i}`];
        const percentPromotion = productDetail[`percentpromotion${i}`];
        const size = productDetail[`size${i}`]?.value;
        const color = productDetail[`color${i}`]?.value;

        const discountedPrice = price * ((100 - percentPromotion) / 100);

        if (discountedPrice < lowestPrice) {
          lowestPrice = discountedPrice;
          bestSize = size;
          bestColor = color;
          bestPromotion = percentPromotion;
        }
      }
    }

    if (lowestPrice === Infinity) {
      lowestPrice = productDetail.price1;
      bestSize = productDetail.size1?.value;
      bestColor = productDetail.color1?.value;
      bestPromotion = productDetail.percentpromotion1;
    }

    return {
      price: lowestPrice,
      percentPromotion: bestPromotion,
      size: bestSize,
      color: bestColor,
    };
  };

  //Tìm kiếm quantity dụa trên size và color
  const getQuantityMatchColorandSize = (
    product: any,
    availableSize: any,
    availableColor: any
  ) => {
    const { price: priceSize } = getSizePrice(product as any, availableSize);
    const { price: priceColor } = getColorPrice(product as any, availableColor);
    const highestPrice = Math.max(priceSize, priceColor);

    switch (highestPrice) {
      case Number(product.productdetail.price5) *
        ((100 - Number(product.productdetail.percentpromotion5)) / 100):
        return Number(product.productdetail.quantity5);
      case Number(product.productdetail.price4) *
        ((100 - Number(product.productdetail.percentpromotion4)) / 100):
        return Number(product.productdetail.quantity4);
      case Number(product.productdetail.price3) *
        ((100 - Number(product.productdetail.percentpromotion3)) / 100):
        return Number(product.productdetail.quantity3);
      case Number(product.productdetail.price2) *
        ((100 - Number(product.productdetail.percentpromotion2)) / 100):
        return Number(product.productdetail.quantity2);
      default:
        return Number(product.productdetail.quantity1);
    }
  };

  //--------Dùng debounce ngăn chặn hành thi add liên tục của database---------
  const debouncedOnAddtoCartDb = debounce(
    async (
      event: React.MouseEvent<HTMLButtonElement>,
      availableSize: any,
      availableColor: any,
      product: any
    ) => {
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
            const maxQuantity = getQuantityMatchColorandSize(
              product,
              availableSize,
              availableColor
            );

            const matchingItem = cartItemData.find(
              (item: CartItemType) =>
                item.product.name === product.name &&
                item.product.id === product.id &&
                item.size === size &&
                item.color === color
            );

            const matchingQuantity = matchingItem ? matchingItem.quantity : 0;

            const compareQuantityExistingAndAvailable =
              matchingQuantity >= maxQuantity && maxQuantity > 0;

            if (compareQuantityExistingAndAvailable) {
              throw new Error("Số lượng sản phẩm trong kho không đủ!");
            }

            const productWithQuantity = {
              ...product,
              quantity,
              selectedWarranty: cartdb.getSelectedItemWarranty(product.id),
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
                  productWithQuantity as any,
                  quantity,
                  null,
                  userId?.id || "",
                  availableSize,
                  availableColor
                );
              }
            } catch (error) {
              toast.error("Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng.");
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

  if (data.filter((item) => item.isProductShowLive === true).length === 0) {
    return (
      <div>
        <LoaderCircle className="h-5 w-5 animate-spin text-gray-500" />
      </div>
    );
  }

  // Create a mapping for productId to continuousIndex
  const productIndexMap: Record<string, number> = {};
  // Initialize continuousIndex
  let continuousIndex = 0;

  return (
    <div className="relative">
      <Sheet>
        <SheetTrigger>
          {data.filter((item) => item.isProductShowLive === true).length >
            0 && (
            <div>
              <Hint label="Shopping">
                <div className="relative cursor-pointer">
                  <ShoppingBag className="text-yellow-500 w-9 h-9 hover:bg-white/10 p-1.5 rounded-lg" />
                  <div className="absolute top-0 right-0 flex items-center justify-center bg-white w-4 h-4 text-xs rounded-full border border-gray-300">
                    {
                      data.filter((item) => item.isProductShowLive === true)
                        .length
                    }
                  </div>
                </div>
              </Hint>
            </div>
          )}
        </SheetTrigger>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle className="flex items-center">Shopping List</SheetTitle>
          </SheetHeader>
          <div className="space-y-6">
            {/* Hiển thị từng nhóm sản phẩm */}
            {sortedProductTypes.map((productType) => (
              <div key={productType}>
                {/* Heading productType */}
                <h2 className="text-2xl font-bold mb-4 text-blue-600">
                  {productTypeDisplayNames[productType] || productType}
                </h2>

                {/* Các sản phẩm thuộc productType */}
                <div className="grid grid-rows-1 gap-3">
                  {groupedProducts[productType].map(
                    (product: ProductWithImages) => {
                      //Logic này lấy index Product
                      continuousIndex++;
                      // Map productId to its continuousIndex
                      productIndexMap[product.id] = continuousIndex;
                      // Hàm tìm giá thấp nhất và khuyến mãi dựa trên số lượng có sẵn
                      const validPriceAndPromotion =
                        findLowestPriceAndPromotion(product.productdetail);
                      const lowestPriceDetails = findLowestPriceDetails(
                        product.productdetail
                      );

                      const availableSize = lowestPriceDetails.size;
                      const availableColor = lowestPriceDetails.color;

                      // Tính giá sau khuyến mãi
                      const discountedPrice = validPriceAndPromotion
                        ? validPriceAndPromotion.price *
                          ((100 - validPriceAndPromotion.percentPromotion) /
                            100)
                        : null;

                      // Giá gốc (trước khuyến mãi)
                      const discountedPriceOld = validPriceAndPromotion.price;

                      if (!availableSize && !availableColor) {
                        toast.error("Sản phẩm đã hết hàng!");
                        return;
                      }

                      const onAddtoPushCart: React.MouseEventHandler<
                        HTMLButtonElement
                      > = (event) => {
                        setLoading(true);
                        debouncedOnAddtoCartDb(
                          event,
                          availableSize,
                          availableColor,
                          product
                        );
                      };

                      const onPreview: MouseEventHandler<HTMLButtonElement> = (
                        event
                      ) => {
                        event.stopPropagation();
                        setCurrentProduct(product);
                        setOpenPreviewModal(true);
                      };

                      //Kiểm tra tất cả sản phẩm có === 0 không
                      const productQuantityAll = [1, 2, 3, 4, 5].every(
                        (i) =>
                          product.productdetail[
                            `quantity${i}` as keyof ProductDetail
                          ] === 0
                      );
                      return (
                        <div
                          key={product.id}
                          className="p-2 max-w-xl rounded-md shadow-xl"
                        >
                          {currentProduct && ( // Only render PreviewModal if currentProduct is set
                            <PreviewModal
                              isOpen={openPreviewModal}
                              onClose={() => setOpenPreviewModal(false)}
                              product={currentProduct as any}
                            />
                          )}
                          <div className="flex">
                            <div className="relative">
                              <Image
                                width={100}
                                height={80}
                                className="object-cover rounded-md cursor-pointer"
                                src={product.images[0].url}
                                onClick={() =>
                                  handleClickPushProduct(
                                    product.name,
                                    product.productType
                                  )
                                }
                                alt="404"
                              />
                              <span className="absolute bg-slate-300 top-0 left-0 text-white text-xs font-bold py-1 px-2">
                                {continuousIndex}
                              </span>
                            </div>
                            <div className="ml-8 flex-grow space-y-2">
                              <p className="text-md font-semibold break-words max-w-[11rem] overflow-hidden line-clamp-2">
                                {product.heading}
                              </p>
                              {/* Kiểm tra xemn nếu như ko có đã bán thì hiển thị value old nếu có thì ẩn valueold */}
                              <div className="flex items-center justify-between">
                                <Currency
                                  value={discountedPrice || 0}
                                  valueold={discountedPriceOld}
                                />
                              </div>

                              <span className="text-sm text-gray-300">
                                Đã bán: {product.sold}
                              </span>

                              <div className="flex items-center justify-end border-gray-300 px-2">
                                <button
                                  onClick={onPreview}
                                  disabled={productQuantityAll || loading}
                                  className="p-1.5 rounded-l-lg bg-gray-300" // Added padding and rounded left corner
                                >
                                  <Plus className="w-5 h-5" />
                                </button>
                                <button
                                  onClick={onAddtoPushCart}
                                  disabled={productQuantityAll || loading}
                                  className="p-1.5 rounded-r-lg text-sm bg-red-500 px-2 text-white" // Added padding and rounded right corner
                                >
                                  Mua
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            ))}
            <div
              className="fixed bottom-10 right-10 cursor-pointer"
              onClick={() => router.push("/cart")}
            >
              <Hint label="Giỏ hàng">
                <div className="rounded-full p-3 bg-orange-500">
                  <ShoppingBag className="text-white w-6 h-6" />
                </div>
              </Hint>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {isPin && (
        <>
          {data
            .filter((product) => product.isProductLivePin === true) // Lọc sản phẩm
            .map((product) => {
              //Get index dựa vào productId
              // Map productId to its continuousIndex
              const indexProductMatchInSheet = productIndexMap[product.id];
              // Hàm tìm giá thấp nhất và khuyến mãi dựa trên số lượng có sẵn
              const validPriceAndPromotion = findLowestPriceAndPromotion(
                product.productdetail
              );
              const lowestPriceDetails = findLowestPriceDetails(
                product.productdetail
              );

              const availableSize = lowestPriceDetails.size;
              const availableColor = lowestPriceDetails.color;

              // Tính giá sau khuyến mãi
              const discountedPrice = validPriceAndPromotion
                ? validPriceAndPromotion.price *
                  ((100 - validPriceAndPromotion.percentPromotion) / 100)
                : null;

              // Giá gốc (trước khuyến mãi)
              const discountedPriceOld = validPriceAndPromotion.price;

              if (!availableSize && !availableColor) {
                toast.error("Sản phẩm đã hết hàng!");
                return;
              }

              const onAddtoPushCart: React.MouseEventHandler<
                HTMLButtonElement
              > = (event) => {
                setLoading(true);
                debouncedOnAddtoCartDb(
                  event,
                  availableSize,
                  availableColor,
                  product
                );
              };

              const onPreview: MouseEventHandler<HTMLButtonElement> = (
                event
              ) => {
                event.stopPropagation();
                setCurrentProduct(product);
                setOpenPreviewModal(true);
              };

              //Kiểm tra tất cả sản phẩm có === 0 không
              const productQuantityAll = [1, 2, 3, 4, 5].every(
                (i) =>
                  product.productdetail[
                    `quantity${i}` as keyof ProductDetail
                  ] === 0
              );
              return (
                <>
                  {isShowPin && (
                    <div
                      key={product.id}
                      className="absolute left-1.5 bottom-12 flex bg-white max-w-xl rounded-md shadow-xl p-2 pr-28"
                    >
                      {currentProduct && ( // Only render PreviewModal if currentProduct is set
                        <PreviewModal
                          isOpen={openPreviewModal}
                          onClose={() => setOpenPreviewModal(false)}
                          product={currentProduct as any}
                        />
                      )}
                      <div
                        className="absolute right-1 top-0 cursor-pointer"
                        onClick={() => setIsShowPin(false)}
                      >
                        <div className="p-1 hover:bg-gray-300 hover:bg-opacity-50 rounded-full">
                          <X className="w-7 h-7 p-1" />
                        </div>
                      </div>
                      <Image
                        width={100}
                        height={80}
                        className="object-contain rounded-md cursor-pointer"
                        src={product.images[0].url}
                        onClick={() =>
                          handleClickPushProduct(
                            product.name,
                            product.productType
                          )
                        }
                        alt="404"
                      />
                      <span className="absolute bg-slate-300 top-0 left-0 text-white text-xs font-bold py-1 px-2">
                        {indexProductMatchInSheet}
                      </span>
                      <div className="ml-8 space-y-2">
                        <p className="text-md font-semibold max-w-[6rem] overflow-hidden whitespace-nowrap text-ellipsis">
                          {product.heading}
                        </p>
                        {/* Kiểm tra xemn nếu như ko có đã bán thì hiển thị value old nếu có thì ẩn valueold */}
                        <div className="flex items-center justify-between">
                          <Currency value={discountedPrice || 0} />
                        </div>

                        <div className="text-sm text-gray-300">
                          Đã bán: {product.sold}
                        </div>

                        <div className="flex items-center justify-end border-gray-300 px-2">
                          <button
                            onClick={onPreview}
                            disabled={productQuantityAll || loading}
                            className="p-1.5 rounded-l-lg bg-gray-300" // Added padding and rounded left corner
                          >
                            <Plus className="w-5 h-5" />
                          </button>
                          <button
                            onClick={onAddtoPushCart}
                            disabled={productQuantityAll || loading}
                            className="p-1.5 rounded-r-lg text-sm bg-red-500 px-2 text-white" // Added padding and rounded right corner
                          >
                            Mua
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              );
            })}
        </>
      )}
    </div>
  );
};

export default ShoppingCardInLive;
