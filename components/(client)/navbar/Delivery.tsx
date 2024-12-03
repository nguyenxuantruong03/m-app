"use client";
import { useEffect, useState } from "react";
import getAllProduct from "@/actions/client/product/get-all-product";
import "./delivery.css";
import { deliverycolor } from "@/components/(client)/color/color";
import FlipClockCountdown from "@leenguyen/react-flip-clock-countdown";
import "@leenguyen/react-flip-clock-countdown/dist/index.css";
import toast from "react-hot-toast";
import {
  getPhoneNumberMessage,
  getToastError,
  translateAddress,
  translateComingSoon,
  translateHotProduct,
  translateHuntSaleLater,
  translateSaleTime,
  translateStore,
  translateWorkingHours,
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
  translateBathroom,
  translateCommonUse,
} from "@/translate/translate-client";

interface ImageDeliveryProps {
  languageToUse: string;
}

const ImageDelivery = ({ languageToUse }: ImageDeliveryProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [products, setProducts] = useState<any>([]);
  const [randomProductType, setRandomProductType] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [displayedTypes, setDisplayedTypes] = useState<string[]>([]);
  const [randomTimeSaleStart, setRandomTimeSaleStart] = useState<string | null>(
    null
  );

  //languages
  const toastErrorMessage = getToastError(languageToUse);
  const saleTimeMessage = translateSaleTime(languageToUse);
  const comingSoonMessage = translateComingSoon(languageToUse);
  const huntSaleLaterMessage = translateHuntSaleLater(languageToUse);
  const hotProductMessage = translateHotProduct(languageToUse);
  const storeMessage = translateStore(languageToUse);
  const workingHourMessage = translateWorkingHours(languageToUse);
  const phoneNumberMessage = getPhoneNumberMessage(languageToUse);
  const addressMessage = translateAddress(languageToUse);
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

  const items = [
    pipeMessage,
    lightBlubMessage,
    pinMesage,
    electricWireMessage,
    paintMessage,
    lockMessage,
    fanMessage,
    glueMessage,
    socketMessage,
    cuttingStoneMessage,
    bathroomMessage,
    commonUseMessage,
  ];

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const products = await getAllProduct({
          isFeatured: true,
          language: languageToUse,
        });
        setProducts(products);
      } catch (error) {
        toast.error(toastErrorMessage);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  //Random ngẫu nhiên time sale
  useEffect(() => {
    const now = new Date();
    const nowPlus7Hours = new Date(now.getTime() + 7 * 60 * 60 * 1000);

    const saleProductTest = products.filter((product: any) => {
      return (
        product.isSale === true &&
        new Date(product.timeSaleStart) > nowPlus7Hours
      );
    });

    // Sort the products by timeSaleStart and take the first 3
    const timeSaleStartList = saleProductTest
      .map((product: any) => new Date(product.timeSaleStart))
      .sort((a: Date, b: Date) => a.getTime() - b.getTime())
      .slice(0, 3)
      .map((date: Date) => date.toISOString()); // Convert dates back to ISO strings or format as needed

    const intervalId = setInterval(() => {
      if (timeSaleStartList.length > 0) {
        const randomIndex = Math.floor(
          Math.random() * timeSaleStartList.length
        );
        const selectedTimeSaleStart = timeSaleStartList[randomIndex];
        setRandomTimeSaleStart(selectedTimeSaleStart); // Lưu timeSaleStart ngẫu nhiên vào state
      }
    }, 4500); // Cứ sau 4500ms sẽ chọn ngẫu nhiên một timeSaleStart

    return () => {
      clearInterval(intervalId); // Dọn dẹp interval khi component unmount
    };
  }, [products]); // Chạy lại khi products thay đổi

  useEffect(() => {
    setIsMounted(true);
    const intervalId = setInterval(() => {
      const topSoldProducts = products
        .sort((a: any, b: any) => b.sold - a.sold)
        .slice(0, 5);

      const productTypeCount: { [key: string]: number } = {};
      topSoldProducts.forEach((product: any) => {
        const type = product.productType;
        productTypeCount[type] = (productTypeCount[type] || 0) + 1;
      });

      const aggregatedProductTypes = Object.entries(productTypeCount)
        .map(([productType, count]) => ({ productType, count }))
        .sort((a, b) => b.count - a.count);

      // Check if we have displayed all product types
      if (aggregatedProductTypes.length > 0) {
        let availableTypes = aggregatedProductTypes.filter(
          (type) => !displayedTypes.includes(type.productType)
        );

        // If all types have been displayed, reset the displayed types
        if (availableTypes.length === 0) {
          availableTypes = aggregatedProductTypes;
          setDisplayedTypes([]);
        }

        // Randomly select a product type from the available types
        const randomIndex = Math.floor(Math.random() * availableTypes.length);
        const selectedProductType = availableTypes[randomIndex];

        setRandomProductType(selectedProductType);
        setDisplayedTypes((prev) => [...prev, selectedProductType.productType]);
      }
    }, 4500); // Change the random product type every second

    return () => {
      clearInterval(intervalId);
    };
  }, [products, displayedTypes]); // Add displayedTypes as a dependency

  if (!isMounted) {
    return null;
  }

  return (
    <>
      {!randomTimeSaleStart || loading ? (
        <div>
          <div className={deliverycolor.bg_rounded__p_mt}>
            <p className="font-medium">{saleTimeMessage} </p>
            <div className="loader-disabled ml-1.5 font-semibold">
              <span className="loader-text">{comingSoonMessage}</span>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className={deliverycolor.bg_rounded__p_mt}>
            <p className="font-medium ">{huntSaleLaterMessage}</p>
            <div className="loader ml-1.5 font-semibold">
              <span className="">
                {randomTimeSaleStart && (
                  <FlipClockCountdown
                    to={new Date(randomTimeSaleStart)}
                    renderMap={[true, true, true, true]}
                    showLabels={false}
                    digitBlockStyle={{
                      width: 16,
                      height: 16,
                      fontSize: 16,
                      color: "white",
                      background: "black",
                    }}
                    separatorStyle={{ color: "black", size: "1px" }}
                  />
                )}
              </span>
            </div>
          </div>
        </div>
      )}

      <div>
        <div className={deliverycolor.bg_rounded__p_mt}>
          <p className="font-medium">{hotProductMessage}</p>
          <div className="loaderproductsale ml-1.5 font-semibold">
            {loading || products.length <= 0 || !randomProductType ? (
              <span className="loader-text">
                {items[Math.floor(Math.random() * items.length)]}
              </span>
            ) : (
              <>
                {randomProductType && (
                  <span
                    key={randomProductType.productType}
                    className="loader-text"
                  >
                    {productTypeDisplayNames[randomProductType.productType] ||
                      randomProductType.productType}
                  </span>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <div>
        <div className={deliverycolor.bg_not_w}>
          <p className="slider-right-animation font-semibold">
            {storeMessage} Trường Đạt. {workingHourMessage}: 6:00-18:00.{" "}
            {phoneNumberMessage}: 0352261103. {addressMessage}: 457 Lê Văn Quới,
            Phường Bình Trị Đông A, Quận Bình Tân, Thành Phố Hồ Chí Minh
          </p>
        </div>
      </div>
    </>
  );
};

export default ImageDelivery;
