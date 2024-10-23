"use client";
import { Image as ImageData, Product, ProductDetail } from "@prisma/client";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FormSaleProduct } from "./form-toggle-card";
import { useRouter } from "next/navigation";
import LoadingPageComponent from "@/components/ui/loading";
import { Hint } from "@/components/ui/hint";
import Currency from "@/components/ui/currency";
import { SquarePen } from "lucide-react";

interface ProductWithImages extends Product {
  images: ImageData[];
  productdetail: ProductDetail;
  originalIndex?: number;
}

const ListProductItem = () => {
  const router = useRouter();
  const [data, setData] = useState<ProductWithImages[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/getAllProductNotQuery`
        );

        const productsWithIndex = response.data.map(
          (product: ProductWithImages) => ({
            ...product,
            originalIndex: undefined, // Khởi tạo originalIndex là undefined
          })
        );

        setData(productsWithIndex); // Lưu vào state
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
      console.error("Invalid route:", route);
    }
  };

  if (!data.length) {
    return (
      <div>
        <LoadingPageComponent />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Hiển thị từng nhóm sản phẩm */}
      {sortedProductTypes.map((productType) => (
        <div key={productType}>
          {/* Heading productType */}
          <h2 className="text-2xl font-bold my-2 text-blue-600">
            {productTypeDisplayNames[productType] || productType}
          </h2>

          {/* Các sản phẩm thuộc productType */}
          <div className="flex flex-wrap gap-3">
            {groupedProducts[productType].map(
              (product: ProductWithImages, index) => {
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
                      const percentPromotion =
                        productDetail[`percentpromotion${i}`];

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
                  return {
                    price: lowestPrice,
                    percentPromotion: bestPromotion,
                  };
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
                    className="bg-white p-2 max-w-xl rounded-md shadow-xl"
                  >
                    <div className="grid grid-cols-2 gap-2">
                      <div className="relative">
                        <Hint label="View product" side="bottom">
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
                          <span className="absolute bg-slate-300 top-0 left-0 text-white text-xs font-bold py-1 px-2">
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
                        <p className="text-lg text-gray-300 font-semibold truncate w-44">
                          Đã bán: <span>{product.sold}</span>
                        </p>
                        <p className="text-lg text-gray-300 font-semibold truncate w-44">
                          Tồn kho: <span>{totalQuantity}</span>
                        </p>
                        <p className="text-lg text-gray-300 font-semibold truncate w-44">
                          Giảm giá:{" "}
                          <span>{validPriceAndPromotion.percentPromotion}</span>
                        </p>

                        <FormSaleProduct
                          id={product.id}
                          label="ProductSale"
                          valueTimeSale={product.timeSale}
                          valueIsSale={product.isSale}
                          disabled={totalQuantity === 0 || loading}
                          totalQuantity={totalQuantity}
                          setLoading={setLoading}
                          setData={setData}
                          loading={loading}
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
