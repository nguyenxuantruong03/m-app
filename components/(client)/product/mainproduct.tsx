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
import RelatedTagPin from "./list-related-tag/related-tag-pin";
import RelatedTagDaCat from "./list-related-tag/related-tag-dacat";
import RelatedTagOkhoa from "./list-related-tag/related-tag-okhoa";
import RelatedTagKeo from "./list-related-tag/related-tag-keo";
import RelatedTagVatlieunhatam from "./list-related-tag/related-tag-vatlieunhatam";
import RelatedTagDothuongdung from "./list-related-tag/related-tag-dothuongdung";
import RelatedTagQuat from "./list-related-tag/related-tag-quat";

interface ProductMainListProps {
  saleProduct: Product[];
  pin: Product[];
  quat: Product[];
  ongnhua: Product[];
  daydien: Product[];
  dacat: Product[];
  okhoa: Product[];
  keo: Product[];
  ocam: Product[];
  son: Product[];
  vatlieunhatam: Product[];
  bongden: Product[];
  dothuongdung: Product[];
  maxTimeSale: Date | null;
  aggregatedProductTypes: { productType: string; count: number }[];
}
const MainProduct: React.FC<ProductMainListProps> = ({
  saleProduct,
  pin,
  quat,
  ongnhua,
  daydien,
  dacat,
  okhoa,
  keo,
  ocam,
  son,
  vatlieunhatam,
  bongden,
  dothuongdung,
  maxTimeSale,
  aggregatedProductTypes,
}) => {
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

  return (
    <div className="mx-auto max-w-7xl">
      {saleProduct.length > 0 && (
        <>
          <div
            className="bg-black bg-opacity-90 rounded-md p-3"
          >
            <div className="flex item-center justify-between">
              {maxTimeSale ? (
                <div className="flex items-center space-x-1 mb-3 xl:mb-0">
                  <div className="flex items-center">
                    <span className="hidden xl:flex items-center text-3xl font-black text-[#de0024] mr-0.5">
                      F
                      <span>
                        <Zap fill="#de0024" className="w-7 h-7" />
                      </span>
                      ash
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
                      fontSize: 24,
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
                    <p className="content__container__text">Bán chạy</p>

                    <ul className="content__container__list pl-[8.5rem] text-[30px] mt-0">
                      {aggregatedProductTypes.map(({ productType, count }) => (
                        <li key={productType} className="m-0 leading-[50px]">
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
        <h1 className="mb-4 mt-4 md:mt-10 font-bold text-3xl md:ml-6 lg:ml-0 text-slate-900 dark:text-slate-200">
          Quạt
        </h1>
        <RelatedTagQuat />
        {quat.length === 0 && <NoResults />}
        <ProductList data={quat} route="product1" />
      </>

      <>
        <h1 className="mb-4 mt-4 md:mt-10 font-bold text-3xl md:ml-6 lg:ml-0 text-slate-900 dark:text-slate-200">
          Dây điện
        </h1>
        <RelatedTagDaydien />
        {daydien.length === 0 && <NoResults />}
        <ProductList data={daydien} route="product3" />
      </>

      <>
        <h1 className="mb-4 mt-4 md:mt-10 font-bold text-3xl md:ml-6 lg:ml-0 text-slate-900 dark:text-slate-200">
          Ổ cắm,mặt ổ cắm
        </h1>
        <RelatedTagOcam />
        {ocam.length === 0 && <NoResults />}
        <ProductListSingle data={ocam} route="product7" />
      </>

      <>
        <h1 className="mb-4 mt-4 md:mt-10 font-bold text-3xl md:ml-6 lg:ml-0 text-slate-900 dark:text-slate-200">
          Ống nhựa, Ống lưới xanh
        </h1>
        <RelatedTagOngnhua />
        {ongnhua.length === 0 && <NoResults />}
        <ProductListSingle data={ongnhua} route="product2" />
      </>

      <>
        <h1 className="mb-4 mt-4 md:mt-10 font-bold text-3xl md:ml-6 lg:ml-0 text-slate-900 dark:text-slate-200">
          Bóng đèn
        </h1>
        <RelatedTagBongden />
        {bongden.length === 0 && <NoResults />}
        <ProductList data={bongden} route="product10" />
      </>

      {/* ------Không được ưa tiên hiển thị nếu ko có isFeatured--------- */}
      {pin.length > 0 && (
        <>
          <h1 className="mb-4 mt-4 md:mt-10 font-bold text-3xl md:ml-6 lg:ml-0 text-slate-900 dark:text-slate-200">
            Pin
          </h1>
          <RelatedTagPin />
          <ProductListSingle data={pin} route="product0" />
        </>
      )}

      {son.length > 0 && (
        <>
          <h1 className="mb-4 mt-4 md:mt-10 font-bold text-3xl md:ml-6 lg:ml-0 text-slate-900 dark:text-slate-200">
            Sơn
          </h1>
          <RelatedTagSon />
          <ProductListSingle data={son} route="son" />
        </>
      )}

      {dacat.length > 0 && (
        <>
          <h1 className="mb-4 mt-4 md:mt-10 font-bold text-3xl md:ml-6 lg:ml-0 text-slate-900 dark:text-slate-200">
            Đá cắt
          </h1>
          <RelatedTagDaCat />
          <ProductListSingle data={dacat} route="product4" />
        </>
      )}

      {okhoa.length > 0 && (
        <>
          <h1 className="mb-4 mt-4 md:mt-10 font-bold text-3xl md:ml-6 lg:ml-0 text-slate-900 dark:text-slate-200">
            Ổ khóa
          </h1>
          <RelatedTagOkhoa />
          <ProductListSingle data={okhoa} route="product5" />
        </>
      )}

      {keo.length > 0 && (
        <>
          <h1 className="mb-4 mt-4 md:mt-10 font-bold text-3xl md:ml-6 lg:ml-0 text-slate-900 dark:text-slate-200">
            Keo
          </h1>
          <RelatedTagKeo />
          <ProductListSingle data={keo} route="product6" />
        </>
      )}

      {vatlieunhatam.length > 0 && (
        <>
          <h1 className="mb-4 mt-4 md:mt-10 font-bold text-3xl md:ml-6 lg:ml-0 text-slate-900 dark:text-slate-200">
            Vật liệu nhà tắm
          </h1>
          <RelatedTagVatlieunhatam />
          <ProductListSingle data={vatlieunhatam} route="product9" />
        </>
      )}

      {dothuongdung.length > 0 && (
        <>
          <h1 className="mb-4 mt-4 md:mt-10 font-bold text-3xl md:ml-6 lg:ml-0 text-slate-900 dark:text-slate-200">
            Đồ thường dùng
          </h1>
          <RelatedTagDothuongdung />
          <ProductListSingle data={dothuongdung} route="product11" />
        </>
      )}
    </div>
  );
};

export default MainProduct;
