"use client";

import { Product } from "@/types/type";
import NoResults from "@/components/ui/no-result";
import RelatedTagDaydien from "./list-related-tag/related-tag-daydien";
import RelatedTagOngnhua from "./list-related-tag/related-tag-ongnhua";
import RelatedTagOcam from "./list-related-tag/related-tag-ocam";
import RelatedTagBongden from "./list-related-tag/related-tag-bongden";
import RelatedTagSon from "./list-related-tag/related-tag-son";
import dynamic from "next/dynamic";
import FlipClockCountdown from "@leenguyen/react-flip-clock-countdown";
import "@leenguyen/react-flip-clock-countdown/dist/index.css";

const ProductListSingle = dynamic(
  () => import("./product-list/product-list-signle"),
  { ssr: false }
);
const ProductList = dynamic(() => import("./product-list/product-list"), {
  ssr: false,
});

import { useEffect, useState } from "react";
import "./product-list/product-list.css";
import ProductListSale from "./product-list/product-list-sale";
import { Zap } from "lucide-react";

interface ProductMainListProps {
  saleProduct: Product[];
  daydien: Product[];
  ocam: Product[];
  ongnhua: Product[];
  bongden: Product[];
  son: Product[];
  maxTimeSale: Date | null;
  aggregatedProductTypes: { productType: string; count: number }[];
}
const MainProduct: React.FC<ProductMainListProps> = ({
  saleProduct,
  daydien,
  ocam,
  ongnhua,
  bongden,
  son,
  maxTimeSale,
  aggregatedProductTypes,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  const productTypeDisplayNames: Record<string, string> = {
    PRODUCT: "Pin",
    PRODUCT1: "Quạt",
    PRODUCT2: "Ống nhựa",
    PRODUCT3: "Dây điện",
    PRODUCT4: "Đá cắt",
    PRODUCT5: "Ổ khóa",
    PRODUCT6: "Keo",
    PRODUCT7: "Ổ cắm",
    PRODUCT8: "Sơn",
    PRODUCT9: "Vật liệu nhà tắm",
    PRODUCT10: "Bóng đèn",
    PRODUCT11: "Đồ thường dùng",
  };

  useEffect(() => {
    const showTimeout = 5 * 24 * 60 * 60 * 1000; // 5 days in milliseconds
    const hideTimeout = 2 * 24 * 60 * 60 * 1000; // 2 days in milliseconds

    const interval = setInterval(
      () => {
        setIsVisible((prevVisible) => !prevVisible);
      },
      isVisible ? hideTimeout : showTimeout
    );

    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <div className="mx-auto max-w-7xl">
      {saleProduct.length > 0 && (
        <>
          <div
            className={`bg-black bg-opacity-90 rounded-md p-3 ${
              isVisible ? "block" : "hidden"
            }`}
          >
            <div className="flex item-center justify-between">
              {maxTimeSale ? (
                <div className="flex items-center space-x-1 mb-3 xl:mb-0">
                  <div className="flex items-center">
                    <span className="hidden xl:flex items-center text-3xl font-black text-[#de0024] mr-0.5">
                      F<span><Zap fill="#de0024" className="w-7 h-7"/></span>ash
                    </span>
                    <span className="text-3xl font-bold text-[#de0024] mr-1">
                      Sale:
                    </span>
                  </div>
                  <FlipClockCountdown
                    to={new Date(maxTimeSale)}
                    renderMap={[true, true, true, true]} // Show hours, minutes, seconds, but not days
                    showLabels={false}
                    digitBlockStyle={{
                      width: 24,
                      height: 24,
                      fontSize:24,
                      color: "black",
                      background: "white",
                    }}
                    className="mt-1.5"
                    separatorStyle={{ color: "white", size: "3px" }}
                  />
                </div>
              ) : null}
              <div>
                <div className="content text-[16px] md:text-[30px] hidden xl:block">
                  <div className="content__container h-[51px] pl-11 pr-[28rem] mt-2.5">
                    <p className="content__container__text">
                      Bán chạy
                    </p>

                    <ul className="content__container__list pl-[8.5rem] text-[30px] mt-0">
                      {aggregatedProductTypes.map(({ productType, count }) => (
                        <li
                          key={productType}
                          className="m-0 leading-[50px]"
                        >
                          {productTypeDisplayNames[productType] || productType}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="relative hidden xl:block">
                <div className="absolute left-[-368px] bottom-[-72px]">
                  <div className="scene">
                    <div className="forest">
                      <div className="tree tree1">
                        <div className="branch branch-top"></div>
                        <div className="branch branch-middle"></div>
                      </div>

                      <div className="tree tree2">
                        <div className="branch branch-top"></div>
                        <div className="branch branch-middle"></div>
                        <div className="branch branch-bottom"></div>
                      </div>

                      <div className="tree tree3">
                        <div className="branch branch-top"></div>
                        <div className="branch branch-middle"></div>
                        <div className="branch branch-bottom"></div>
                      </div>

                      <div className="tree tree4">
                        <div className="branch branch-top"></div>
                        <div className="branch branch-middle"></div>
                        <div className="branch branch-bottom"></div>
                      </div>

                      <div className="tree tree5">
                        <div className="branch branch-top"></div>
                        <div className="branch branch-middle"></div>
                        <div className="branch branch-bottom"></div>
                      </div>

                      <div className="tree tree6">
                        <div className="branch branch-top"></div>
                        <div className="branch branch-middle"></div>
                        <div className="branch branch-bottom"></div>
                      </div>

                      <div className="tree tree7">
                        <div className="branch branch-top"></div>
                        <div className="branch branch-middle"></div>
                        <div className="branch branch-bottom"></div>
                      </div>
                    </div>

                    <div className="tent">
                      <div className="roof"></div>
                      <div className="roof-border-left">
                        <div className="roof-border roof-border1"></div>
                        <div className="roof-border roof-border2"></div>
                        <div className="roof-border roof-border3"></div>
                      </div>
                      <div className="entrance">
                        <div className="door left-door">
                          <div className="left-door-inner"></div>
                        </div>
                        <div className="door right-door">
                          <div className="right-door-inner"></div>
                        </div>
                      </div>
                    </div>

                    <div className="floor">
                      <div className="ground ground1"></div>
                      <div className="ground ground2"></div>
                    </div>

                    <div className="fireplace">
                      <div className="support"></div>
                      <div className="support"></div>
                      <div className="bar"></div>
                      <div className="hanger"></div>
                      <div className="smoke"></div>
                      <div className="pan"></div>
                      <div className="fire">
                        <div className="line line1">
                          <div className="particle particle1"></div>
                          <div className="particle particle2"></div>
                          <div className="particle particle3"></div>
                          <div className="particle particle4"></div>
                        </div>
                        <div className="line line2">
                          <div className="particle particle1"></div>
                          <div className="particle particle2"></div>
                          <div className="particle particle3"></div>
                          <div className="particle particle4"></div>
                        </div>
                        <div className="line line3">
                          <div className="particle particle1"></div>
                          <div className="particle particle2"></div>
                          <div className="particle particle3"></div>
                          <div className="particle particle4"></div>
                        </div>
                      </div>
                    </div>

                    <div className="time-wrapper">
                      <div className="time">
                        <div className="day"></div>
                        <div className="night">
                          <div className="moon"></div>
                          <div className="star star1 star-big"></div>
                          <div className="star star2 star-big"></div>
                          <div className="star star3 star-big"></div>
                          <div className="star star4"></div>
                          <div className="star star5"></div>
                          <div className="star star6"></div>
                          <div className="star star7"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <ProductListSale data={saleProduct} />
          </div>
        </>
      )}

      <>
        <h1 className="mb-4 mt-4 md:mt-10 font-bold text-3xl md:ml-6 lg:ml-0">
          Dây điện
        </h1>
        <RelatedTagDaydien />
        {daydien.length === 0 && <NoResults />}
        <ProductList data={daydien} productType="daydien" />
      </>

      <>
        <h1 className="mb-4 mt-4 md:mt-10 font-bold text-3xl md:ml-6 lg:ml-0">
          Ổ cắm,mặt ổ cắm
        </h1>
        <RelatedTagOcam />
        {ocam.length === 0 && <NoResults />}
        <ProductListSingle data={ocam} route="ocam" />
      </>

      <>
        <h1 className="mb-4 mt-4 md:mt-10 font-bold text-3xl md:ml-6 lg:ml-0">
          Ống nhựa, Ống lưới xanh
        </h1>
        <RelatedTagOngnhua />
        {ongnhua.length === 0 && <NoResults />}
        <ProductList data={ongnhua} productType="ongnhua" />
      </>

      <>
        <h1 className="mb-4 mt-4 md:mt-10 font-bold text-3xl md:ml-6 lg:ml-0">
          Bóng đèn
        </h1>
        <RelatedTagBongden />
        {bongden.length === 0 && <NoResults />}
        <ProductList data={bongden} productType="bongden" />
      </>

      <>
        <h1 className="mb-4 mt-4 md:mt-10 font-bold text-3xl md:ml-6 lg:ml-0">
          Sơn
        </h1>
        <RelatedTagSon />
        {son.length === 0 && <NoResults />}
        <ProductListSingle data={son} route="son" />
      </>
    </div>
  );
};

export default MainProduct;
