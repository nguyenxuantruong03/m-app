"use client";
import { useEffect, useRef, useState } from "react";
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
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageDeliveryProps {
  languageToUse: string;
}

const ImageDelivery = ({ languageToUse }: ImageDeliveryProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [products, setProducts] = useState<any>([]);
  const [randomProductType, setRandomProductType] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [randomTimeSaleStart, setRandomTimeSaleStart] = useState<string | null>(
    null
  );

  const [currentIndex, setCurrentIndex] = useState(0); // Mặc định là 0 cho mobile
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [animationClass, setAnimationClass] = useState<string>("");

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width <= 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const maxIndex = 2;

  const maxIndexIpad = 1;

  const handleNext = () => {
    setAnimationClass("animate-slide-left"); // Thêm animation trượt sang trái
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        isMobile
          ? prevIndex < maxIndex
            ? prevIndex + 1
            : 0
          : isTablet
          ? prevIndex < maxIndexIpad
            ? prevIndex + 1
            : 0
          : 0
      );
      setAnimationClass(""); // Xóa animation sau khi chuyển đổi
    }, 300); // Thời gian khớp với animation CSS
  };
  
  const handlePrev = () => {
    setAnimationClass("animate-slide-right"); // Thêm animation trượt sang phải
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        isMobile
          ? prevIndex > 0
            ? prevIndex - 1
            : maxIndex
          : isTablet
          ? prevIndex > 0
            ? prevIndex - 1
            : maxIndexIpad
          : maxIndex
      );
      setAnimationClass(""); // Xóa animation sau khi chuyển đổi
    }, 300); // Thời gian khớp với animation CSS
  };

  // Kiểm tra và đảm bảo currentIndex không vượt quá maxIndexIpad trên tablet
  useEffect(() => {
    if (isTablet && currentIndex > maxIndexIpad) {
      setCurrentIndex(maxIndexIpad); // Đặt lại currentIndex về 1
    }
  }, [isTablet, currentIndex]); // Theo dõi khi isTablet hoặc currentIndex thay đổi

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
  const timeSaleStartRef = useRef<string | null>(null);
  const displayedTypesRef = useRef<string[]>([]);

  useEffect(() => {
    const now = new Date();
    const nowPlus7Hours = new Date(now.getTime() + 7 * 60 * 60 * 1000);

    const saleProductTest = products.filter((product: any) => {
      return (
        product.isSale === true &&
        new Date(product.timeSaleStart) > nowPlus7Hours
      );
    });

    const timeSaleStartList = saleProductTest
      .map((product: any) => new Date(product.timeSaleStart))
      .sort((a: Date, b: Date) => a.getTime() - b.getTime())
      .slice(0, 3)
      .map((date: Date) => date.toISOString());

    const updateTimeSaleStart = () => {
      if (timeSaleStartList.length > 0) {
        const randomIndex = Math.floor(Math.random() * timeSaleStartList.length);
        timeSaleStartRef.current = timeSaleStartList[randomIndex];
        setRandomTimeSaleStart(timeSaleStartRef.current);
      }

      // Call again in the next animation frame
      requestAnimationFrame(updateTimeSaleStart);
    };

    requestAnimationFrame(updateTimeSaleStart);

    return () => {
      // Cleanup logic if necessary
    };
  }, [products]);

  useEffect(() => {
    setIsMounted(true);

    const productTypeCount: { [key: string]: number } = {};
    const topSoldProducts = products
      .sort((a: any, b: any) => b.sold - a.sold)
      .slice(0, 5);

    topSoldProducts.forEach((product: any) => {
      const type = product.productType;
      productTypeCount[type] = (productTypeCount[type] || 0) + 1;
    });

    const aggregatedProductTypes = Object.entries(productTypeCount)
      .map(([productType, count]) => ({ productType, count }))
      .sort((a, b) => b.count - a.count);

    const updateProductType = () => {
      if (aggregatedProductTypes.length > 0) {
        let availableTypes = aggregatedProductTypes.filter(
          (type) => !displayedTypesRef.current.includes(type.productType)
        );

        if (availableTypes.length === 0) {
          availableTypes = aggregatedProductTypes;
          displayedTypesRef.current = [];
        }

        const randomIndex = Math.floor(Math.random() * availableTypes.length);
        const selectedProductType = availableTypes[randomIndex];

        setRandomProductType(selectedProductType);

        // Update the displayedTypes ref
        displayedTypesRef.current = [
          ...displayedTypesRef.current,
          selectedProductType.productType,
        ];
      }

      // Call again in the next animation frame
      requestAnimationFrame(updateProductType);
    };

    requestAnimationFrame(updateProductType);

    return () => {
      // Cleanup logic if necessary
    };
  }, [products]);

  const Content0 = ({
    randomTimeSaleStart,
    loading,
  }: {
    randomTimeSaleStart: string | null;
    loading: boolean;
  }) => (
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
              <span>
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
    </>
  );

  const Content1 = ({
    randomProductType,
    products,
    loading,
  }: {
    randomProductType: any;
    products: any[];
    loading: boolean;
  }) => (
      <div className={deliverycolor.bg_rounded__p_mt}>
        <p className="font-medium">{hotProductMessage}</p>
        <div className="loaderproductsale ml-1.5 font-semibold">
          {loading || products.length <= 0 || !randomProductType ? (
            <span className="loader-text">
              {items[Math.floor(Math.random() * items.length)]}
            </span>
          ) : (
            <span key={randomProductType.productType} className="loader-text">
              {productTypeDisplayNames[randomProductType.productType] ||
                randomProductType.productType}
            </span>
          )}
        </div>
      </div>
  );

  const Content2 = () => (
      <div className={deliverycolor.bg_not_w}>
        <p className="slider-right-animation font-semibold">
          {storeMessage} Trường Đạt. {workingHourMessage}: 6:00-18:00.{" "}
          {phoneNumberMessage}: 0352261103. {addressMessage}: 457 Lê Văn Quới,
          Phường Bình Trị Đông A, Quận Bình Tân, Thành Phố Hồ Chí Minh
        </p>
      </div>
  );

  const navigationButtons = [
    {
      position: "left",
      onClick: handlePrev,
      icon: <ChevronLeft className="h-12 w-12 text-gray-600" />,
    },
    {
      position: "right",
      onClick: handleNext,
      icon: <ChevronRight className="h-12 w-12 text-gray-600" />,
    },
  ];

  if (!isMounted) {
    return null;
  }

  return (
    <>
      {isMobile ? (
        <div className="grid grid-cols-1 justify-items-center">
          {/* Điều kiện hiển thị */}
          <div
            className={`${
              currentIndex === 0 ? "block" : "hidden"
            } transition-all duration-300 ${animationClass}`}
          >
            {/* Nội dung 0 */}
            <Content0
              randomTimeSaleStart={randomTimeSaleStart}
              loading={loading}
            />
          </div>

          <div
            className={`${
              currentIndex === 1 ? "block" : "hidden"
            } transition-all duration-300 ${animationClass}`}
          >
            {/* Nội dung 1 */}
            <Content1
              randomProductType={randomProductType}
              products={products}
              loading={loading}
            />
          </div>

          <div
            className={`${
              currentIndex === 2 ? "block" : "hidden"
            } transition-all duration-300 ${animationClass}`}
          >
            {/* Nội dung 2 */}
            <Content2 />
          </div>

          {/* Chevron buttons */}
          {navigationButtons.map((button, index) => (
            <div
              key={index}
              className={`absolute top-1/2 ${
                button.position === "left" ? "-left-[10px]" : "-right-[10px]"
              } transform -translate-y-1/2`}
            >
              <button onClick={button.onClick}>{button.icon}</button>
            </div>
          ))}
        </div>
      ) : isTablet ? (
        <div>
          {/* Điều kiện hiển thị */}
          <div
            className={`${
              currentIndex === 0 ? "block" : "hidden"
            } transition-all duration-300 ${animationClass}`}
          >
            {/* Nội dung 0 */}
            <div className="grid grid-cols-2 justify-items-center">
              <Content0
                randomTimeSaleStart={randomTimeSaleStart}
                loading={loading}
              />
              <div>
                {/* Nội dung 1 */}
                <Content1
                  randomProductType={randomProductType}
                  products={products}
                  loading={loading}
                />
              </div>
            </div>
          </div>

          <div
            className={`${
              currentIndex === 1 ? "block" : "hidden"
            } transition-all duration-300 flex items-center ${animationClass}`}
          >
            {/* Nội dung 2 */}
            <Content2 />
          </div>

          {/* Chevron buttons */}
          {navigationButtons.map((button, index) => (
            <div
              key={index}
              className={`absolute top-1/2 ${
                button.position === "left" ? "-left-[10px]" : "-right-[10px]"
              } transform -translate-y-1/2`}
            >
              <button onClick={button.onClick}>{button.icon}</button>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-3 justify-items-center">
          <Content0
            randomTimeSaleStart={randomTimeSaleStart}
            loading={loading}
          />
          <div>
            <Content1
              randomProductType={randomProductType}
              products={products}
              loading={loading}
            />
          </div>
          <div className="w-1/2">
            <Content2 />
          </div>
        </div>
      )}
    </>
  );
};

export default ImageDelivery;
