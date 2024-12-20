"use client";
import PriceRangeCategory from "@/components/ui/price-change-ranger-category";
import { SortButton } from "@/components/ui/sortButton";
import ProductCard from "@/components/(client)/product/productcard-category/productcard";
import { Product } from "@/types/type";
import {
  ArrowDownAZ,
  ArrowDownWideNarrow,
  ArrowDownZA,
  ArrowUpNarrowWide,
  Percent,
} from "lucide-react";
import { Dispatch, SetStateAction, useMemo } from "react";
import {
  translateHotDeals,
  translateSortHighToLow,
  translateSortLowToHigh,
  translateSortNameAToZ,
  translateSortNameZToA,
} from "@/translate/translate-client";
import NoResults from "@/components/ui/no-result";
import CategorySkeleton from "../skeleton/category-skeleton";
import { PaginationWithLinks } from "@/components/ui/pagination-with-links";

interface DetailCategoryProps {
  product: Product[];
  minPrice: number;
  maxPrice: number;
  maxPriceInDatas: number;
  handlePriceChange: (min: number, max: number) => void;
  handleSortChange: (value: string) => void;
  sortOrder: string;
  route: string;
  languageToUse: string;
  loading: boolean;
  pagination: {
    currentPage: number;
    totalPages: number;
  } | null;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  pageSize: number;
  setPageSize: Dispatch<SetStateAction<number>>;
}

const DetailCategory: React.FC<DetailCategoryProps> = ({
  product,
  minPrice,
  maxPrice,
  maxPriceInDatas,
  handlePriceChange,
  handleSortChange,
  sortOrder,
  route,
  languageToUse,
  loading,
  pagination,
  setCurrentPage,
  pageSize,
  setPageSize,
}) => {
  //language
  const sortHighToLowMessage = translateSortHighToLow(languageToUse);
  const sortLowtoHighMessage = translateSortLowToHigh(languageToUse);
  const sortNameAToZMessage = translateSortNameAToZ(languageToUse);
  const sortNameZToAMessage = translateSortNameZToA(languageToUse);
  const hotDealsMessage = translateHotDeals(languageToUse);

  const sortButtons = [
    {
      label: sortHighToLowMessage,
      sortType: "priceHighToLow",
      icon: <ArrowDownWideNarrow className="w-5 h-5" />,
    },
    {
      label: sortLowtoHighMessage,
      sortType: "priceLowToHigh",
      icon: <ArrowUpNarrowWide className="w-5 h-5 " />,
    },
    {
      label: sortNameAToZMessage,
      sortType: "nameAToZ",
      icon: <ArrowDownAZ className="w-5 h-5 " />,
    },
    {
      label: sortNameZToAMessage,
      sortType: "nameZToA",
      icon: <ArrowDownZA className="w-5 h-5" />,
    },
    {
      label: hotDealsMessage,
      sortType: "percentPromotionHighToLow",
      icon: <Percent className="w-5 h-5" />,
    },
  ];

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
    <div className="mt-6 lg:col-span-4 lg:mt-0">
      <div className="my-4">
        <PriceRangeCategory
          minPrice={minPrice}
          maxPrice={maxPrice}
          maxPriceInDatas={maxPriceInDatas}
          onPriceChange={handlePriceChange}
          languageToUse={languageToUse}
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
      {product.length > 9 && pagination && (
        <PaginationWithLinks
          page={pagination.currentPage}
          pageSize={pageSize}
          totalPages={pagination.totalPages}
          languageToUse={languageToUse}
          setCurrentPage={setCurrentPage}
          pageSizeSelectOptions={{
            pageSizeOptions: [3, 6, 9, 12, 15, 18, 21, 24, 30, 36, 42],
            onPageSizeChange: (newPageSize: number) => setPageSize(newPageSize),
          }}
        />
      )}
      <div className="my-10">
        {loading ? (
          <CategorySkeleton />
        ) : (
          <>
            {sortedProduct.length === 0 && <NoResults />}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {filterProductsByPrice(sortedProduct).map((item) => (
                <ProductCard
                  key={item.id}
                  data={item}
                  route={route}
                  languageToUse={languageToUse}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {product.length > 9 && pageSize > 3 && pagination && (
        <PaginationWithLinks
          page={pagination.currentPage}
          pageSize={pageSize}
          totalPages={pagination.totalPages}
          languageToUse={languageToUse}
          setCurrentPage={setCurrentPage}
          pageSizeSelectOptions={{
            pageSizeOptions: [3, 6, 9, 12, 24, 36, 42],
            onPageSizeChange: (newPageSize: number) => setPageSize(newPageSize),
          }}
        />
      )}
    </div>
  );
};

export default DetailCategory;
