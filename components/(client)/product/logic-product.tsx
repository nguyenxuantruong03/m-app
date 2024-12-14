"use client";
import getAllProduct from "@/actions/client/product/get-all-product";
import MainProduct from "./mainproduct";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useEffect, useState } from "react";
import LoadingPageComponent from "@/components/ui/loading";

const LogicProduct = () => {
  const user = useCurrentUser();
  const [products, setProducts] = useState<any[]>([]);
  const [storedLanguage, setStoredLanguage] = useState<string | null>(null);
  const [loading,setLoading] = useState(false)

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

  useEffect(() => {
    const fetchData = async () => {
      try{
        setLoading(true)
        const products = await getAllProduct({
          isFeatured: true,
          language: languageToUse,
        });
        setProducts(products);
      }catch(error){

      }finally{
        setLoading(false)
      }
    };
    fetchData();
  }, []);

  // Lọc sản phẩm có `isSale` là true và có `timeSaleEnd` và `timeSaleStart`
  const saleProduct = products
    .filter((product: any) => {
      const now = new Date();
      const nowPlus7Hours = new Date(now.getTime() + 7 * 60 * 60 * 1000); // Thêm 7 tiếng
      return (
        product.isSale === true &&
        new Date(product.timeSaleStart) < nowPlus7Hours &&
        new Date(product.timeSaleEnd) > nowPlus7Hours
      );
    })
    // Sắp xếp theo số lượng sold từ cao đến thấp
    .sort((a: any, b: any) => b.sold - a.sold);

  // Lọc sản phẩm có `isSale` là true và có `timeSaleStart và `timeSaleEnd`
  const saleProducts = products.filter(
    (product: any) =>
      product.isSale === true && product.timeSaleStart && product.timeSaleEnd
  );
  // Tìm sản phẩm có `timeSaleEnd` lớn nhất
  const maxTimeSaleProduct = saleProducts.reduce((max, product) => {
    const maxTimeSale = max.timeSaleEnd ?? 0; // Nếu max.timeSaleEnd là undefined, sử dụng 0
    const currentTimeSale = product.timeSaleEnd ?? 0; // Nếu product.timeSaleEnd là undefined, sử dụng 0
    return maxTimeSale > currentTimeSale ? max : product;
  }, saleProducts[0]); // Khởi tạo với sản phẩm đầu tiên trong danh sách

  // Alternatively, if you want to default to the current date:
  const maxTimeSale =
    maxTimeSaleProduct && maxTimeSaleProduct.timeSaleEnd !== undefined
      ? new Date(maxTimeSaleProduct.timeSaleEnd)
      : null; // Handle undefined properly
  const pin = products.filter(
    (product: any) =>
      product.productType === "PRODUCT" &&
      product.isFeatured === true &&
      product.isSale === false
  );
  const quat = products.filter(
    (product: any) => product.productType === "PRODUCT1"
  );
  const ongnhua = products.filter(
    (product: any) => product.productType === "PRODUCT2"
  );
  const daydien = products.filter(
    (product: any) => product.productType === "PRODUCT3"
  );
  const dacat = products.filter(
    (product: any) =>
      product.productType === "PRODUCT4" &&
      product.isFeatured === true &&
      product.isSale === false
  );
  const okhoa = products.filter(
    (product: any) =>
      product.productType === "PRODUCT5" &&
      product.isFeatured === true &&
      product.isSale === false
  );
  const keo = products.filter(
    (product: any) =>
      product.productType === "PRODUCT6" &&
      product.isFeatured === true &&
      product.isSale === false
  );
  const ocam = products.filter(
    (product: any) => product.productType === "PRODUCT7"
  );
  const son = products.filter(
    (product: any) =>
      product.productType === "PRODUCT8" &&
      product.isFeatured === true &&
      product.isSale === false
  );
  const vatlieunhatam = products.filter(
    (product: any) =>
      product.productType === "PRODUCT9" &&
      product.isFeatured === true &&
      product.isSale === false
  );
  const bongden = products.filter(
    (product: any) => product.productType === "PRODUCT10"
  );
  const dothuongdung = products.filter(
    (product: any) =>
      product.productType === "PRODUCT11" &&
      product.isFeatured === true &&
      product.isSale === false
  );

  // Sắp xếp sản phẩm theo số lượng đã bán
  const topSoldProducts = products
    .sort((a: any, b: any) => b.sold - a.sold)
    .slice(0, 5); // Lấy 5 sản phẩm bán chạy nhất

  // Cộng dồn số lượng sản phẩm theo productType
  const productTypeCount: { [key: string]: number } = {};

  topSoldProducts.forEach((product: any) => {
    const type = product.productType;
    // Nếu productType đã tồn tại trong đối tượng thì cộng dồn, nếu chưa thì khởi tạo
    if (productTypeCount[type]) {
      productTypeCount[type] += 1; // Tăng số lượng lên 1
    } else {
      productTypeCount[type] = 1; // Khởi tạo số lượng là 1
    }
  });

  // Chuyển đổi đối tượng thành mảng và sắp xếp theo count
  const aggregatedProductTypes = Object.entries(productTypeCount)
    .map(([productType, count]) => ({ productType, count }))
    .sort((a, b) => b.count - a.count); // Sắp xếp theo count từ cao đến thấp
  return (
    <>
        <MainProduct
        loading={loading}
          saleProduct={saleProduct}
          pin={pin}
          quat={quat}
          ongnhua={ongnhua}
          daydien={daydien}
          dacat={dacat}
          okhoa={okhoa}
          keo={keo}
          ocam={ocam}
          son={son}
          vatlieunhatam={vatlieunhatam}
          bongden={bongden}
          dothuongdung={dothuongdung}
          maxTimeSale={maxTimeSale}
          aggregatedProductTypes={aggregatedProductTypes}
          languageToUse={languageToUse}
        />
    </>
  );
};

export default LogicProduct;
