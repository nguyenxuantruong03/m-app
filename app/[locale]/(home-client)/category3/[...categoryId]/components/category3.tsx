"use client";
import getProduct3 from "@/actions/client/product/get-product3";
import { useEffect, useState } from "react";
import DetailCategory from "@/components/(client)/category/detail-category";
import { Product } from "@/types/type";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";
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

const Category3: React.FC<CategoryPageProps> = ({ params, searchParams }) => {
  const t = useTranslations()
  const [product, setProduct] = useState<Product[]>([]);
  const [sortOrder, setSortOrder] = useState<string>("");
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [maxPriceInDatas, setMaxPriceInDatas] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState<number>(9); // Default là 9 sản phẩm mỗi trang
  const [currentPage, setCurrentPage] = useState<number>(1); //Page
  const [pagination, setPagination] = useState<{
    currentPage: number;
    totalPages: number;
  } | null>(null);

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

        const { products, pagination } = await getProduct3({
          colorId: searchParams.colorId, 
          sizeId: searchParams.sizeId,
          categoryId: params.categoryId,
          isFeatured: undefined,
          page: currentPage,
          limit: pageSize, // Số sản phẩm mỗi trang
        });

        // Tìm giá cao nhất trong danh sách sản phẩm đã lọc
        const highestPrice = products.reduce(
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
        setProduct(products); // Cập nhật danh sách sản phẩm đã lọc
      } catch (error) {
        toast.error(t("category.categoryNotFound"));
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [currentPage,pageSize,searchParams.colorId,searchParams.sizeId,params.categoryId]);

  return (
    <DetailCategory
      loading={loading}
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
      route="product3"
    />
  );
};

export default Category3;
