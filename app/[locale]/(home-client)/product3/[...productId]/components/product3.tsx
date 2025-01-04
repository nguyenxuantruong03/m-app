"use client";
import getProduct3 from "@/actions/client/product/get-product3";
import { getProducts3 } from "@/actions/client/products/get-products";
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
const Product3: React.FC<PropductPageProps> = ({ params }) => {
  const t = useTranslations()
  const [product, setProduct] = useState<Product | null>(null);
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const [storedLanguage, setStoredLanguage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const product = await getProducts3(params.productId);
        const suggestedProducts = await getProduct3({
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

  const suggestedProduct3 = suggestedProducts.filter(
    (product: any) => product.productType === "PRODUCT3"
  );
  const suggestedProduct6 = suggestedProducts.filter(
    (product: any) => product.productType === "PRODUCT6"
  );

  return (
    <DetailProduct
      loading={loading}
      data={product}
      images={product?.images}
      otherSuggestions={suggestedProduct3}
      routeOtherSuggestions="product3"
      other={suggestedProduct6}
      routeOther="product6"
    />
  );
};

export default Product3;
