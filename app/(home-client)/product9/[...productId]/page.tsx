"use client";
import Container from "@/components/ui/container";
import getProduct9 from "@/actions/client/product/get-product9";
import { getProducts9 } from "@/actions/client/products/get-products";
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
      const product = await getProducts9(params.productId, languageToUse);
      const suggestedProducts = await getProduct9({
        isFeatured: true,
        language: languageToUse,
      });
      setProduct(product);
      setSuggestedProducts(suggestedProducts);
    };
    fetchData();
  }, []);

  const suggestedProduct9 = suggestedProducts.filter(
    (product: any) => product.productType === "PRODUCT9"
  );
  const suggestedProduct10 = suggestedProducts.filter(
    (product: any) => product.productType === "PRODUCT10"
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
        otherSuggestions={suggestedProduct9}
        routeOtherSuggestions="product9"
        productlistsuggest2={true}
        other={suggestedProduct10}
        routeOther="product10"
      />
    </Container>
  );
};

export default ProductPage;

// export async function generateMetadata({params :{productId}}:PropductPageProps ) {
//   const post = await getProducts9(`${productId}`); //deduped!
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
