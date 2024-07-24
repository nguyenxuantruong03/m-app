"use client";
import getColors from "@/actions/client/get-colors";
import getProduct5 from "@/actions/client/product/get-product5";
import getSizes from "@/actions/client/get-size";
import Container from "./../../../../components/ui/container";
import getBillboard from "@/actions/client/billboard/get-billboard";
import { useEffect, useState } from "react";
import { Billboard, Color, Product, Size } from "@/types/type";
import DetailCategory from "@/components/(client)/category/detail-category";
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
  const [billboard, setBillboard] = useState<Billboard | null>(null);
  const [product, setProduct] = useState<Product[]>([]);
  const [size, setSize] = useState<Size[]>([]);
  const [color, setColor] = useState<Color[]>([]);
  const [sortOrder, setSortOrder] = useState<string>("");
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [maxPriceInDatas, setMaxPriceInDatas] = useState<number>(0);

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
        const billboardData = await getBillboard(
          "272c1f9f-3844-4c24-9c57-19d9ee48562c"
        );
        const productData = await getProduct5({
        });
        const sizeData = await getSizes();
        const colorData = await getColors();
        
        // Tìm giá cao nhất trong danh sách sản phẩm
        const highestPrice = productData.reduce(
          (max, product) =>
            product.productdetail.price1 * ((100 - product.productdetail.percentpromotion1) / 100) + 1000000 >
            max
              ? product.productdetail.price1 * ((100 - product.productdetail.percentpromotion1) / 100) + 1000000
              : max,
          0
        );
        setMaxPrice(Math.floor(highestPrice));
        setMaxPriceInDatas(Math.floor(highestPrice)) 
        setBillboard(billboardData);
        setProduct(productData);
        setSize(sizeData);
        setColor(colorData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [params.categoryId, searchParams.sizeId, searchParams.colorId]);
  return (
    <div className="bg-white">
      <Container>
      <DetailCategory 
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
        route="product5"
        />
      </Container>
    </div>
  );
};

export default CategoryPage;