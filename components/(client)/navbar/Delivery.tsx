"use client";
import { useEffect, useState } from "react";
import getAllProduct from "@/actions/client/product/get-all-product";
import "./delivery.css";
import { deliverycolor } from "@/components/(client)/color/color";
import FlipClockCountdown from "@leenguyen/react-flip-clock-countdown";
import "@leenguyen/react-flip-clock-countdown/dist/index.css";
import toast from "react-hot-toast";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";

// Giới hạn số index trên từng thiết bị
const maxIndexMobile = 2;
const maxIndexTablet = 1;

const ImageDelivery = () => {
  const t = useTranslations();
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [animationClass, setAnimationClass] = useState("");

  const productTypeDisplayNames: Record<string, string> = {
    PRODUCT: t("product.pin"),
    PRODUCT1: t("product.fan"),
    PRODUCT2: t("product.pipe"),
    PRODUCT3: t("product.electricWire"),
    PRODUCT4: t("product.cuttingStone"),
    PRODUCT5: t("product.lock"),
    PRODUCT6: t("product.glue"),
    PRODUCT7: t("product.socket"),
    PRODUCT8: t("product.paint"),
    PRODUCT9: t("product.bathroom"),
    PRODUCT10: t("product.lightBlub"),
    PRODUCT11: t("product.commonItem"),
  };

  const [selectedSaleProduct, setSelectedSaleProduct] = useState<any | null>(
    null
  );
  const [selectedHotProductType, setSelectedHotProductType] = useState<
    any | null
  >(null);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width <= 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const featured = await getAllProduct({ isFeatured: true });

        // Lấy sản phẩm có timeSaleStart gần nhất
        const now = new Date(Date.now() + 7 * 60 * 60 * 1000); // Giờ VN
        const saleProducts = featured.filter(
          (p) => p.isSale && p.timeSaleStart && new Date(p.timeSaleStart) > now
        );

        setSelectedSaleProduct(saleProducts[0] || null);

        // Lấy loại sản phẩm bán chạy nhất
        const topSoldTypes = featured
          .sort((a, b) => b.sold - a.sold)
          .slice(0, 5)
          .reduce((acc: Record<string, number>, p) => {
            acc[p.productType] = (acc[p.productType] || 0) + 1;
            return acc;
          }, {});

        let sorted: { productType: string; count: number }[] = Object.entries(
          topSoldTypes
        )
          .map(([productType, count]) => ({ productType, count }))
          .sort((a, b) => b.count - a.count);

        // Nếu không có topSoldTypes (tức là mảng rỗng), chọn random từ productTypeDisplayNames
        if (sorted.length === 0) {
          const allTypes = Object.keys(productTypeDisplayNames);
          const shuffled = allTypes.sort(() => Math.random() - 0.5);
          sorted = shuffled
            .slice(0, 5)
            .map((type) => ({ productType: type, count: 0 }));
        }

        setSelectedHotProductType(sorted[0] || null);
      } catch (err) {
        toast.error(t("toastError.somethingWentWrong"));
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isTablet && currentIndex > maxIndexTablet) {
      setCurrentIndex(maxIndexTablet);
    }
  }, [isTablet, currentIndex]);

  const handleNext = () => {
    setAnimationClass("animate-slide-left");
    setCurrentIndex((prev) =>
      isMobile
        ? prev < maxIndexMobile
          ? prev + 1
          : 0
        : isTablet
        ? prev < maxIndexTablet
          ? prev + 1
          : 0
        : 0
    );
    setTimeout(() => setAnimationClass(""), 300);
  };

  const handlePrev = () => {
    setAnimationClass("animate-slide-right");
    setCurrentIndex((prev) =>
      isMobile
        ? prev > 0
          ? prev - 1
          : maxIndexMobile
        : isTablet
        ? prev > 0
          ? prev - 1
          : maxIndexTablet
        : 0
    );
    setTimeout(() => setAnimationClass(""), 300);
  };

  const Content0 = () => (
    <div className={deliverycolor.bg_rounded__p_mt}>
      <p className="font-medium">{t("product.saleTime")}</p>
      <div className="ml-1.5 font-semibold">
        {loading || !selectedSaleProduct?.timeSaleStart ? (
          <span className="loader-text">{t("product.comingSoon")}</span>
        ) : (
          <FlipClockCountdown
            to={new Date(selectedSaleProduct.timeSaleStart)}
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
      </div>
    </div>
  );

  const Content1 = () => (
    <div className={deliverycolor.bg_rounded__p_mt}>
      <p className="font-medium">{t("product.hotProduct")}</p>
      <div className="loaderproductsale ml-1.5 font-semibold">
        {loading || !selectedHotProductType ? (
          <span className="loader-text">{t("product.commonItem")}</span>
        ) : (
          <span className="loader-text">
            {productTypeDisplayNames[selectedHotProductType.productType] ||
              selectedHotProductType.productType}
          </span>
        )}
      </div>
    </div>
  );

  const Content2 = () => (
    <div className={deliverycolor.bg_not_w}>
      <p className="slider-right-animation font-semibold">
        {t("home.store")} Trường Đạt. {t("info.workingHour")}: 6:00-18:00.{" "}
        {t("info.phoneNumber")}: 0352261103. {t("info.address")}: 457 Lê Văn
        Quới, Phường Bình Trị Đông A, Quận Bình Tân, TP. HCM
      </p>
    </div>
  );

  const ChevronButtons = () =>
    [handlePrev, handleNext].map((fn, i) => (
      <div
        key={i}
        className={`absolute top-1/2 ${
          i === 0 ? "-left-[10px]" : "-right-[10px]"
        } transform -translate-y-1/2`}
      >
        <button onClick={fn}>
          {i === 0 ? (
            <ChevronLeft className="h-12 w-12 text-gray-600" />
          ) : (
            <ChevronRight className="h-12 w-12 text-gray-600" />
          )}
        </button>
      </div>
    ));

  if (!isMounted) return null;

  return (
    <>
      {isMobile ? (
        <div className="grid grid-cols-1 justify-items-center">
          {[<Content0 />, <Content1 />, <Content2 />].map((Component, i) => (
            <div
              key={i}
              className={`${
                currentIndex === i ? "block" : "hidden"
              } transition-all duration-300 ${animationClass}`}
            >
              {Component}
            </div>
          ))}
          <ChevronButtons />
        </div>
      ) : isTablet ? (
        <div>
          {currentIndex === 0 ? (
            <div
              className={`grid grid-cols-2 justify-items-center transition-all duration-300 ${animationClass}`}
            >
              <Content0 />
              <Content1 />
            </div>
          ) : (
            <div
              className={`transition-all duration-300 flex items-center ${animationClass}`}
            >
              <Content2 />
            </div>
          )}
          <ChevronButtons />
        </div>
      ) : (
        <div className="grid grid-cols-3 justify-items-center">
          <Content0 />
          <Content1 />
          <div className="w-1/2">
            <Content2 />
          </div>
        </div>
      )}
    </>
  );
};

export default ImageDelivery;
