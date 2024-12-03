"use client";

import Container from "@/components/ui/container";
import getProduct8 from "@/actions/client/product/get-product8";
import { getProducts8 } from "@/actions/client/products/get-products";
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

  const languageToUse =
    user?.id && user?.role !== "GUEST"
      ? user?.language
      : storedLanguage || "vi";

  useEffect(() => {
    const fetchData = async () => {
      const product = await getProducts8(params.productId, languageToUse);
      const suggestedProducts = await getProduct8({
        isFeatured: true,
        language: languageToUse,
      });
      setProduct(product);
      setSuggestedProducts(suggestedProducts);
    };
    fetchData();
  }, []);

  const suggestedProduct8 = suggestedProducts.filter(
    (product: any) => product.productType === "PRODUCT8"
  );
  const suggestedProduct3 = suggestedProducts.filter(
    (product: any) => product.productType === "PRODUCT3"
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
        otherSuggestions={suggestedProduct8}
        routeOtherSuggestions="product8"
        productlistsuggest2={true}
        other={suggestedProduct3}
        routeOther="product3"
      />
    </Container>
  );
};

export default ProductPage;

// export async function generateMetadata({params :{productId}}:PropductPageProps ) {
//   const post = await getProducts8(`${productId}`); //deduped!
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
