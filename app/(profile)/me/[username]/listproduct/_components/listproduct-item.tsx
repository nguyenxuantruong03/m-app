"use client";
import { Image as ImageData, Product, ProductDetail } from "@prisma/client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FormToggleCard } from "./form-toggle-card";
import { useRouter } from "next/navigation";
import { Hint } from "@/components/ui/hint";
import Currency from "@/components/ui/currency";
import { useCurrentUser } from "@/hooks/use-current-user";
import { getAllProductNotQuery } from "@/actions/client/products/get-products";
import {
  getListProductItem,
  getProductListMessage,
  getToastError,
  translateBathroom,
  translateCommonUse,
  translateCuttingStone,
  translateElectricWire,
  translateFan,
  translateGlue,
  translateLightBulb,
  translateLock,
  translatePaint,
  translatePin,
  translatePipe,
  translateSocket,
} from "@/translate/translate-client";
import toast from "react-hot-toast";
import NoResults from "@/components/ui/no-result";
import ListProductSkeleton from "@/components/(client)/skeleton/listproduct-skeleton";

interface ProductWithImages extends Product {
  images: ImageData[];
  productdetail: ProductDetail;
  originalIndex?: number;
}

const ListProductItem = () => {
  const user = useCurrentUser();
  const router = useRouter();
  const [data, setData] = useState<ProductWithImages[]>([]);
  const [loading, setLoading] = useState(true);
  const [storedLanguage, setStoredLanguage] = useState<string | null>(null);

  useEffect(() => {
    // Check if we're running on the client side
    if (typeof window !== "undefined") {
      const language = localStorage.getItem("language");
      setStoredLanguage(language);
    }
  }, []);

  //languages
  const languageToUse =
    user?.id && user?.role !== "GUEST"
      ? user?.language
      : storedLanguage || "vi";
  const toastErroMessage = getToastError(languageToUse);
  const pinMesage = translatePin(languageToUse);
  const fanMessage = translateFan(languageToUse);
  const pipeMessage = translatePipe(languageToUse);
  const electricWireMessage = translateElectricWire(languageToUse);
  const cuttingStoneMessage = translateCuttingStone(languageToUse);
  const lockMessage = translateLock(languageToUse);
  const glueMessage = translateGlue(languageToUse);
  const socketMessage = translateSocket(languageToUse);
  const paintMessage = translatePaint(languageToUse);
  const bathroomMessage = translateBathroom(languageToUse);
  const lightBlubMessage = translateLightBulb(languageToUse);
  const commonUseMessage = translateCommonUse(languageToUse);
  const listProductItemMessage = getListProductItem(languageToUse);
  const productListMessage = getProductListMessage(languageToUse);

  useEffect(() => {
    if (loading ) {
      document.title = productListMessage.loading;
    } else {
      document.title = productListMessage.productList;
    }
  }, [loading]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const products = await getAllProductNotQuery(languageToUse);

        const productsWithIndex = products.map((product: any) => ({
          ...product,
          originalIndex: undefined, // Khởi tạo originalIndex là undefined
        }));

        setData(productsWithIndex); // Lưu vào state
      } catch (error) {
        toast.error(toastErroMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const productTypeDisplayNames: Record<string, string> = {
    PRODUCT: pinMesage,
    PRODUCT1: fanMessage,
    PRODUCT2: pipeMessage,
    PRODUCT3: electricWireMessage,
    PRODUCT4: cuttingStoneMessage,
    PRODUCT5: lockMessage,
    PRODUCT6: glueMessage,
    PRODUCT7: socketMessage,
    PRODUCT8: paintMessage,
    PRODUCT9: bathroomMessage,
    PRODUCT10: lightBlubMessage,
    PRODUCT11: commonUseMessage,
  };

  // Mảng để giữ thứ tự productType
  const productTypeOrder = [
    "PRODUCT",
    "PRODUCT1",
    "PRODUCT2",
    "PRODUCT3",
    "PRODUCT4",
    "PRODUCT5",
    "PRODUCT6",
    "PRODUCT7",
    "PRODUCT8",
    "PRODUCT9",
    "PRODUCT10",
    "PRODUCT11",
  ];

  // Nhóm các sản phẩm theo productType
  const groupedProducts = data.reduce(
    (acc: Record<string, ProductWithImages[]>, product) => {
      const productType = product.productType;
      if (!acc[productType]) {
        acc[productType] = [];
      }
      acc[productType].push(product);
      return acc;
    },
    {}
  );

  // Tạo một biến để theo dõi chỉ số toàn cục khi lặp qua từng nhóm sản phẩm
  let currentIndex = 0;

  // Lặp qua thứ tự productType để đảm bảo thứ tự
  for (const productType of productTypeOrder) {
    if (groupedProducts[productType]) {
      groupedProducts[productType].forEach((product) => {
        if (product.isProductShowLive) {
          product.originalIndex = currentIndex; // Gán chỉ số cho sản phẩm
          currentIndex += 1; // Tăng chỉ số
        }
      });
    }
  }

  // Sắp xếp sản phẩm trong mỗi nhóm theo originalIndex
  for (const productType of productTypeOrder) {
    if (groupedProducts[productType]) {
      groupedProducts[productType].sort(
        (a, b) => (a.originalIndex ?? 0) - (b.originalIndex ?? 0)
      );
    }
  }

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

  const handleClick = (name: string, productType: string) => {
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
      toast.error(toastErroMessage);
    }
  };

  if(loading) return <ListProductSkeleton />

  if (!data.length) {
    return (
      <div>
        <NoResults />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Hiển thị từng nhóm sản phẩm */}
      {sortedProductTypes.map((productType) => (
        <div key={productType}>
          {/* Heading productType */}
          <h2 className="text-2xl font-bold mb-4 text-blue-600">
            {productTypeDisplayNames[productType] || productType}
          </h2>

          {/* Các sản phẩm thuộc productType */}
          <div className="flex flex-wrap gap-3">
            {groupedProducts[productType].map(
              (product: ProductWithImages, index) => {
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
                const lowestPriceDetails = findLowestPriceDetails(
                  product.productdetail
                );

                // Kích thước và màu sắc tốt nhất từ thông tin tìm được
                const availableSize = lowestPriceDetails.size;
                const availableColor = lowestPriceDetails.color;
                const availablePrice = lowestPriceDetails.price;
                const availablePercentPromotion =
                  lowestPriceDetails.percentPromotion;

                // Tính giá sau khuyến mãi
                const discountedPrice = lowestPriceDetails
                  ? availablePrice * ((100 - availablePercentPromotion) / 100)
                  : null;

                // Giá gốc (trước khuyến mãi)
                const discountedPriceOld = availablePrice;

                const quantities = [
                  product.productdetail.quantity1 ?? 0,
                  product.productdetail.quantity2 ?? 0,
                  product.productdetail.quantity3 ?? 0,
                  product.productdetail.quantity4 ?? 0,
                  product.productdetail.quantity5 ?? 0,
                ];

                const totalQuantity = quantities.reduce(
                  (total, qty) => total + qty,
                  0
                );

                return (
                  <div
                    key={product.id}
                    className="dark:bg-slate-900 bg-slate-200 p-2 max-w-xl rounded-md shadow-xl"
                  >
                    <div className="grid grid-cols-2 gap-2">
                      <div className="relative">
                        <Hint
                          label={listProductItemMessage.viewProduct}
                          side="bottom"
                        >
                          <Image
                            width={200}
                            height={200}
                            className="object-cover rounded-md cursor-pointer"
                            src={product.images[0].url}
                            onClick={() =>
                              handleClick(product.name, product.productType)
                            }
                            alt="404"
                          />
                        </Hint>
                        {product.originalIndex !== undefined && (
                          <span className="absolute dark:bg-slate-200 bg-slate-900 top-0 left-0 text-slate-900 dark:text-slate-200 text-xs font-bold py-1 px-2">
                            {product.originalIndex + 1}
                          </span>
                        )}
                      </div>

                      <div className="space-y-2">
                        <p className="text-lg font-semibold truncate w-44">
                          {product.heading}
                        </p>
                        <div className="flex items-center justify-between">
                          <Currency
                            value={discountedPrice || 0}
                            valueold={discountedPriceOld}
                          />
                        </div>
                        <p className="text-lg text-slate-900 dark:text-slate-200 font-semibold truncate w-44">
                          {listProductItemMessage.sold} :{" "}
                          <span>{product.sold}</span>
                        </p>
                        <p className="text-lg text-slate-900 dark:text-slate-200 font-semibold truncate w-44">
                          {listProductItemMessage.stock} :{" "}
                          <span>{totalQuantity}</span>
                        </p>

                        <FormToggleCard
                          id={product.id}
                          labelPin={listProductItemMessage.productLivePin}
                          labelShowLive={listProductItemMessage.productShowLive}
                          valueisProductLivePin={product.isProductLivePin}
                          valueisProductShowLive={product.isProductShowLive}
                          disabled={totalQuantity === 0 || loading}
                          totalQuantity={totalQuantity}
                          setLoading={setLoading}
                          setData={setData}
                          languageToUse={languageToUse}
                        />
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListProductItem;
