"use client";
import Container from "@/components/ui/container";
import getProduct1 from "@/actions/client/product/get-product1";
import { getProducts1 } from "@/actions/client/products/get-products";
// import getProduct10 from "@/actions/client/product/get-product10";
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
        const product = await getProducts1(params.productId, languageToUse);
        const suggestedProducts = await getProduct1({
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

  const suggestedProduct1 = suggestedProducts.filter(
    (product: any) => product.productType === "PRODUCT1"
  );
  const suggestedProduct10 = suggestedProducts.filter(
    (product: any) => product.productType === "PRODUCT10"
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
        otherSuggestions={suggestedProduct1}
        routeOtherSuggestions="product1"
        other={suggestedProduct10}
        routeOther="product10"
      />
    </Container>
  )}
  </>
  );
};

export default ProductPage;