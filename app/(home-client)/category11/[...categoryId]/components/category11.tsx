"use client";
import getProduct11 from "@/actions/client/product/get-product11";
import { useEffect, useState } from "react";
import { Product } from "@/types/type";
import DetailCategory from "@/components/(client)/category/detail-category";
import { useCurrentUser } from "@/hooks/use-current-user";
import { getCategoryNotFoundMessage } from "@/translate/translate-client";
import toast from "react-hot-toast";
export const revalidate = 7200;

interface CategoryPageProps {
  params: {
    categoryId: string;
  };
  searchParams: {
    colorId: string;
    sizeId: string;
  };
}

const Category11: React.FC<CategoryPageProps> = ({ params, searchParams }) => {
  const user = useCurrentUser();
  const [product, setProduct] = useState<Product[]>([]);
  const [sortOrder, setSortOrder] = useState<string>("");
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [maxPriceInDatas, setMaxPriceInDatas] = useState<number>(0);
  const [storedLanguage, setStoredLanguage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState<number>(9); // Default là 9 sản phẩm mỗi trang
  const [currentPage, setCurrentPage] = useState<number>(1); //Page
  const [pagination, setPagination] = useState<{
    currentPage: number;
    totalPages: number;
  } | null>(null);

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
  const categoryMessage = getCategoryNotFoundMessage(languageToUse);

  const handlePriceChange = (min: number, max: number) => {
    setMinPrice(min);
    setMaxPrice(max);
  };

  const handleSortChange = (value: string) => {
    setSortOrder(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const { translations, pagination } = await getProduct11({
          colorId: searchParams.colorId, 
          sizeId: searchParams.sizeId,
          categoryId: params.categoryId,
          isFeatured: undefined,
          language: languageToUse,
          page: currentPage,
          limit: pageSize, // Số sản phẩm mỗi trang
        });

        // Tìm giá cao nhất trong danh sách sản phẩm đã lọc
        const highestPrice = translations.reduce(
          (max, product) =>
            product.productdetail.price1 *
              ((100 - product.productdetail.percentpromotion1) / 100) +
              1000000 >
            max
              ? product.productdetail.price1 *
                  ((100 - product.productdetail.percentpromotion1) / 100) +
                1000000
              : max,
          0
        );
        setPagination(pagination);
        setMaxPrice(Math.floor(highestPrice));
        setMaxPriceInDatas(Math.floor(highestPrice));
        setProduct(translations); // Cập nhật danh sách sản phẩm đã lọc
      } catch (error) {
        toast.error(categoryMessage);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [currentPage,pageSize,searchParams.colorId,searchParams.sizeId,params.categoryId,languageToUse,categoryMessage]);

  return (
    <DetailCategory
      loading={loading}
      languageToUse={languageToUse}
      product={product}
      minPrice={minPrice}
      maxPrice={maxPrice}
      maxPriceInDatas={maxPriceInDatas}
      handlePriceChange={handlePriceChange}
      handleSortChange={handleSortChange}
      sortOrder={sortOrder}
      pagination={pagination}
      setCurrentPage={setCurrentPage}
      pageSize={pageSize}
      setPageSize={setPageSize}
      route="product11"
    />
  );
};

export default Category11;
