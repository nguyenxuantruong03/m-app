"use client";
import getProduct10 from "@/actions/client/product/get-product10";
import { getProducts10 } from "@/actions/client/products/get-products";
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
const Product10: React.FC<PropductPageProps> = ({ params }) => {
  const t = useTranslations()
  const [product, setProduct] = useState<Product | null>(null);
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const product = await getProducts10(params.productId);
        const suggestedProducts = await getProduct10({
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

  const suggestedProduct10 = suggestedProducts.filter(
    (product: any) => product.productType === "PRODUCT10"
  );
  const suggestedProduct8 = suggestedProducts.filter(
    (product: any) => product.productType === "PRODUCT8"
  );

  return (
    <DetailProduct
      loading={loading}
      data={product}
      images={product?.images}
      otherSuggestions={suggestedProduct10}
      routeOtherSuggestions="product10"
      productlistsuggest2={true}
      other={suggestedProduct8}
      routeOther="product8"
    />
  );
};

export default Product10;
