"use client";
import getProduct from "@/actions/client/product/get-product";
import Container from "@/components/ui/container";
import { getProducts } from "@/actions/client/products/get-products";
import DetailProduct from "@/components/(client)/info-product/detail-product";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useEffect, useState } from "react";
import { Product } from "@/types/type";
import LoadingPageComponent from "@/components/ui/loading";
import toast from "react-hot-toast";
import { getProductMessage } from "@/translate/translate-client";
export const revalidate = 86400;

interface PropductPageProps {
  params: {
    productId: string;
  };
}
const ProductPage: React.FC<PropductPageProps> = ({ params }) => {
  const user = useCurrentUser();
  const [product, setProduct] = useState<Product>();
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const [storedLanguage, setStoredLanguage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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
        const product = await getProducts(params.productId, languageToUse);
        const suggestedProducts = await getProduct({
          isFeatured: undefined,
          language: languageToUse,
        });
        setProduct(product);
        setSuggestedProducts(suggestedProducts);
      } catch (error) {
        toast.error(productMessage.notFound);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (loading) {
      document.title = productMessage.loading;
    } else if (product?.heading) {
      document.title = product.heading;
    } else {
      document.title = productMessage.default;
    }
  }, [product, loading]);

  const suggestedProduct = suggestedProducts.filter(
    (product: any) => product.productType === "PRODUCT"
  );
  const suggestedProduct7 = suggestedProducts.filter(
    (product: any) => product.productType === "PRODUCT7"
  );

  if (!product) {
    return null;
  }

  return (
    <>
      {loading ? (
        <LoadingPageComponent />
      ) : (
        <Container>
          <DetailProduct
            languageToUse={languageToUse}
            data={product}
            images={product.images}
            otherSuggestions={suggestedProduct}
            routeOtherSuggestions="product0"
            other={suggestedProduct7}
            routeOther="product7"
          />
        </Container>
      )}
    </>
  );
};

export default ProductPage;
