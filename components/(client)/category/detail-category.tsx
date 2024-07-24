"use client";
import LoadingPageComponent from "@/components/ui/loading";
import MobileFilter from "@/components/(client)/filter-category/mobile-filter";
import Filter from "@/components/(client)/filter-category/filter";
import PriceRangeCategory from "@/components/ui/price-change-ranger-category";
import { SortButton } from "@/components/ui/sortButton";
import BillboardCategory from "@/components/(client)/slider-item/billboard/billboard-category";
import ProductCard from "@/components/(client)/product/productcard-category/productcard";
import { Billboard, Color, Size, Product } from "@/types/type";
import {
  ArrowDownAZ,
  ArrowDownWideNarrow,
  ArrowDownZA,
  ArrowUpNarrowWide,
  Percent,
} from "lucide-react";
import { useMemo } from "react";

const sortButtons = [
  {
    label: "Giá cao đến thấp",
    sortType: "priceHighToLow",
    icon: <ArrowDownWideNarrow className="w-5 h-5" />,
  },
  {
    label: "Giá thấp đến cao",
    sortType: "priceLowToHigh",
    icon: <ArrowUpNarrowWide className="w-5 h-5 " />,
  },
  {
    label: "Tên A đến Z",
    sortType: "nameAToZ",
    icon: <ArrowDownAZ className="w-5 h-5 " />,
  },
  {
    label: "Tên Z đến A",
    sortType: "nameZToA",
    icon: <ArrowDownZA className="w-5 h-5" />,
  },
  {
    label: "Khuyến mãi hot",
    sortType: "percentPromotionHighToLow",
    icon: <Percent className="w-5 h-5" />,
  },
];

interface DetailCategoryProps {
  billboard: Billboard | null;
  size: Size[];
  color: Color[];
  product: Product[];
  minPrice: number;
  maxPrice: number;
  maxPriceInDatas: number;
  handlePriceChange: (min: number, max: number) => void;
  handleSortChange: (value: string) => void;
  sortOrder: string;
  route: string;
}

const DetailCategory: React.FC<DetailCategoryProps> = ({
  billboard,
  size,
  color,
  product,
  minPrice,
  maxPrice,
  maxPriceInDatas,
  handlePriceChange,
  handleSortChange,
  sortOrder,
  route,
}) => {
  const filterProductsByPrice = (products: Product[]) => {
    return products.filter(
      (product) =>
        product.productdetail.price1 *
          ((100 - product.productdetail.percentpromotion1) / 100) >=
          minPrice &&
        product.productdetail.price1 *
          ((100 - product.productdetail.percentpromotion1) / 100) <=
          maxPrice
    );
  };

  const sortedProduct = useMemo(() => {
    let sortedArray = [...product];

    switch (sortOrder) {
      case "priceHighToLow":
        sortedArray.sort(
          (a, b) => b.productdetail.price1 - a.productdetail.price1
        );
        break;
      case "priceLowToHigh":
        sortedArray.sort(
          (a, b) => a.productdetail.price1 - b.productdetail.price1
        );
        break;
      case "nameAToZ":
        sortedArray.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "nameZToA":
        sortedArray.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "percentPromotionHighToLow":
        sortedArray.sort(
          (a, b) =>
            b.productdetail.percentpromotion1 -
            a.productdetail.percentpromotion1
        );
        break;
      default:
        break;
    }
    return sortedArray;
  }, [product, sortOrder]);

  return (
    <>
      <div className="mt-28 flex items-center justify-center px-2.5">
        <BillboardCategory data={billboard} />
      </div>
      <div className="px-4 sm:px-6 lg:px-8 pb-24 my-5">
        <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
          <MobileFilter size={size} color={color} />
          {/* Desktop and laptop */}
          <div className="hidden lg:block">
            <Filter valueKey="sizeId" name="Sizes" data={size} />
            <Filter valueKey="colorId" name="Colors" data={color} />
          </div>
          <div className="mt-6 lg:col-span-4 lg:mt-0">
            <div className="">
              <div className="mb-4">
                <PriceRangeCategory
                  minPrice={minPrice}
                  maxPrice={maxPrice}
                  maxPriceInDatas={maxPriceInDatas}
                  onPriceChange={handlePriceChange}
                />
              </div>
              <div className="flex justify-start items-center mb-4 w-full overflow-x-auto ">
                <div className="flex space-x-2">
                  {sortButtons.map((button, index) => (
                    <SortButton
                      key={index}
                      onClick={() => handleSortChange(button.sortType)}
                      active={sortOrder === button.sortType}
                      label={button.label}
                      icon={button.icon}
                    />
                  ))}
                </div>
              </div>
              {sortedProduct.length === 0 && <LoadingPageComponent />}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filterProductsByPrice(sortedProduct).map((item) => (
                  <ProductCard key={item.id} data={item} route={route} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailCategory;
