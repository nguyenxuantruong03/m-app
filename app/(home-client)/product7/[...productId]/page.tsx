"use client";
import Container from "@/components/ui/container";
import getProduct7 from "@/actions/client/product/get-product7";
import { getProducts7 } from "@/actions/client/products/get-products";
import DetailProduct from "@/components/(client)/info-product/detail-product";
import { useEffect, useState } from "react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Product } from "@/types/type";
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

  useEffect(() => {
    const fetchData = async () => {
      const product = await getProducts7(params.productId, languageToUse);
      const suggestedProducts = await getProduct7({
        isFeatured: true,
        language: languageToUse,
      });
      setProduct(product);
      setSuggestedProducts(suggestedProducts);
    };
    fetchData();
  }, []);

  const suggestedProduct7 = suggestedProducts.filter(
    (product: any) => product.productType === "PRODUCT7"
  );
  const suggestedProduct9 = suggestedProducts.filter(
    (product: any) => product.productType === "PRODUCT9"
  );

  if (!product) {
    return null;
  }

  return (
    <Container>
      <DetailProduct
        languageToUse={languageToUse}
        data={product}
        images={product.images}
        otherSuggestions={suggestedProduct7}
        routeOtherSuggestions="product7"
        other={suggestedProduct9}
        routeOther="product9"
      />
    </Container>
  );
};

export default ProductPage;

// export async function generateMetadata({params :{productId}}:PropductPageProps ) {
//   const post = await getProducts7(`${productId}`); //deduped!
// //deduped loại bỏ trùng lặp trong quá trình xây dựng
//   if (!post) {
//     return {
//       title: "Product Not Found",
//     }
//   }
//   return {
//     title: post.heading,
//   };
// }
