"use client";
import getColors from "@/actions/client/get-colors";
import getProduct7 from "@/actions/client/product/get-product7";
import getSizes from "@/actions/client/get-size";
import Container from "./../../../../components/ui/container";
import getBillboard from "@/actions/client/billboard/get-billboard";
import { useEffect, useState } from "react";
import { Billboard, Color, Product, Size } from "@/types/type";
import DetailCategory from "@/components/(client)/category/detail-category";
import { useCurrentUser } from "@/hooks/use-current-user";
import { getCategoryMessage } from "@/translate/translate-client";
import toast from "react-hot-toast";
import LoadingPageComponent from "@/components/ui/loading";
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

const CategoryPage: React.FC<CategoryPageProps> = ({
  params,
  searchParams,
}) => {
  const user = useCurrentUser();
  const [billboard, setBillboard] = useState<Billboard | null>(null);
  const [product, setProduct] = useState<Product[]>([]);
  const [size, setSize] = useState<Size[]>([]);
  const [color, setColor] = useState<Color[]>([]);
  const [sortOrder, setSortOrder] = useState<string>("");
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [maxPriceInDatas, setMaxPriceInDatas] = useState<number>(0);
  const [storedLanguage, setStoredLanguage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [categoryName, setCategoryName] = useState<string>("");

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
  const categoryMessage = getCategoryMessage(languageToUse);

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
        // Sử dụng Promise.all để lấy tất cả dữ liệu cùng lúc
        const [billboardData, productData, sizeData, colorData] =
          await Promise.all([
            getBillboard(
              `${process.env.NEXT_PUBLIC_CATEGORIES7}`,
              languageToUse
            ),
            getProduct7({
              isFeatured: undefined,
              language: languageToUse,
            }),
            getSizes(),
            getColors(languageToUse),
          ]);

        // Tìm kiếm category.id === một trong các giá trị trong params.categoryId
        const filteredProductData = productData.filter((product) =>
          params.categoryId.includes(product.productdetail.categoryId)
        );

        // Lấy tên category từ sản phẩm đầu tiên (nếu có)
        const categoryName =
          filteredProductData.length > 0
            ? filteredProductData[0].productdetail.category.name
            : "";

        // Tìm giá cao nhất trong danh sách sản phẩm
        const highestPrice = filteredProductData.reduce(
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
        setMaxPrice(Math.floor(highestPrice));
        setMaxPriceInDatas(Math.floor(highestPrice));
        setBillboard(billboardData);
        setProduct(filteredProductData);
        setSize(sizeData);
        setColor(colorData);
        setCategoryName(categoryName);
      } catch (error) {
        toast.error(categoryMessage.notFound);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.categoryId, searchParams.sizeId, searchParams.colorId]);

  useEffect(() => {
    if (loading) {
      document.title = categoryMessage.loading;
    } else if (categoryName) {
      document.title = categoryName;
    } else {
      document.title = categoryMessage.default;
    }
  }, [categoryName, loading]);

  return (
    <>
      {loading ? (
        <LoadingPageComponent />
      ) : (
        <Container>
          <DetailCategory
            languageToUse={languageToUse}
            billboard={billboard}
            size={size}
            color={color}
            product={product}
            minPrice={minPrice}
            maxPrice={maxPrice}
            maxPriceInDatas={maxPriceInDatas}
            handlePriceChange={handlePriceChange}
            handleSortChange={handleSortChange}
            sortOrder={sortOrder}
            route="product7"
          />
        </Container>
      )}
    </>
  );
};

export default CategoryPage;
