"use client";
import getProduct3 from "@/actions/client/product/get-product3";
import { getProducts3 } from "@/actions/client/products/get-products";
import DetailProduct from "@/components/(client)/info-product/detail-product";
import { useEffect, useState } from "react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Product } from "@/types/type";
import toast from "react-hot-toast";
import { getProductMessage } from "@/translate/translate-client";
export const revalidate = 86400;

interface PropductPageProps {
  params: {
    productId: string;
  };
}
const Product3: React.FC<PropductPageProps> = ({ params }) => {
  const user = useCurrentUser();
  const [product, setProduct] = useState<Product | null>(null);
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const [storedLanguage, setStoredLanguage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if we're running on the client side
    if (typeof window !== "undefined") {
      const language = localStorage.getItem("language");
      setStoredLanguage(language);
    }
  }, []);

  const languageToUse =
    user?.id && user?.role !== "GUEST"
      ? user?.language
      : storedLanguage || "vi";
  const productMessage = getProductMessage(languageToUse);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const product = await getProducts3(params.productId, languageToUse);
        const suggestedProducts = await getProduct3({
          isFeatured: undefined,
          language: languageToUse,
          limit: 30
        });
        setProduct(product);
        setSuggestedProducts(suggestedProducts.translations);
      } catch (error) {
        toast.error(productMessage.notFound);
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
      languageToUse={languageToUse}
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
