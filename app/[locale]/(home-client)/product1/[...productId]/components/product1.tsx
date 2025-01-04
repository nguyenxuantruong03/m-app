"use client";
import getProduct1 from "@/actions/client/product/get-product1";
import { getProducts1 } from "@/actions/client/products/get-products";
import DetailProduct from "@/components/(client)/info-product/detail-product";
import { useEffect, useState } from "react";
import { Product } from "@/types/type";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";
export const revalidate = 86400;

interface PropductPageProps {
  params: {
    productId: string;
  };
}
const Product1: React.FC<PropductPageProps> = ({ params }) => {
  const t = useTranslations()
  const [product, setProduct] = useState<Product | null>(null);
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const product = await getProducts1(params.productId);
        const suggestedProducts = await getProduct1({
          isFeatured: undefined,
          limit: 30
        });
        setProduct(product);
        setSuggestedProducts(suggestedProducts.products);
      } catch (error) {
        toast.error(t("product.productNotFound"));
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const suggestedProduct1 = suggestedProducts.filter(
    (product: any) => product.productType === "PRODUCT1"
  );
  const suggestedProduct10 = suggestedProducts.filter(
    (product: any) => product.productType === "PRODUCT10"
  );

  return (
    <DetailProduct
      loading={loading}
      data={product}
      images={product?.images}
      otherSuggestions={suggestedProduct1}
      routeOtherSuggestions="product1"
      other={suggestedProduct10}
      routeOther="product10"
    />
  );
};

export default Product1;
