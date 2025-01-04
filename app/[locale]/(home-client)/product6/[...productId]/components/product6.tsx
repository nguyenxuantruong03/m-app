"use client";
import getProduct6 from "@/actions/client/product/get-product6";
import { getProducts6 } from "@/actions/client/products/get-products";
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
const Product6: React.FC<PropductPageProps> = ({ params }) => {
  const t = useTranslations()
  const [product, setProduct] = useState<Product | null>(null);
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const product = await getProducts6(params.productId);
        const suggestedProducts = await getProduct6({
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

  const suggestedProduct6 = suggestedProducts.filter(
    (product: any) => product.productType === "PRODUCT6"
  );
  const suggestedProduct1 = suggestedProducts.filter(
    (product: any) => product.productType === "PRODUCT1"
  );

  return (
    <DetailProduct
      loading={loading}
      data={product}
      images={product?.images}
      otherSuggestions={suggestedProduct6}
      routeOtherSuggestions="product6"
      other={suggestedProduct1}
      routeOther="product1"
    />
  );
};

export default Product6;
