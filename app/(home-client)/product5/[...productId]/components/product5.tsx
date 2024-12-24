"use client";
import getProduct5 from "@/actions/client/product/get-product5";
import { getProducts5 } from "@/actions/client/products/get-products";
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
const Product5: React.FC<PropductPageProps> = ({ params }) => {
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

  //language
  const languageToUse =
    user?.id && user?.role !== "GUEST"
      ? user?.language
      : storedLanguage || "vi";
  const productMessage = getProductMessage(languageToUse);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const product = await getProducts5(params.productId);
        const suggestedProducts = await getProduct5({
          isFeatured: undefined,
          limit: 30
        });
        setProduct(product);
        setSuggestedProducts(suggestedProducts.products);
      } catch (error) {
        toast.error(productMessage.notFound);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const suggestedProduct5 = suggestedProducts.filter(
    (product: any) => product.productType === "PRODUCT5"
  );
  const suggestedProduct8 = suggestedProducts.filter(
    (product: any) => product.productType === "PRODUCT8"
  );

  return (
    <DetailProduct
      loading={loading}
      languageToUse={languageToUse}
      data={product}
      images={product?.images}
      otherSuggestions={suggestedProduct5}
      routeOtherSuggestions="product5"
      other={suggestedProduct8}
      routeOther="product8"
    />
  );
};

export default Product5;
