"use client";
import getProduct2 from "@/actions/client/product/get-product2";
import { getProducts2 } from "@/actions/client/products/get-products";
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
const Product2: React.FC<PropductPageProps> = ({ params }) => {
  const t = useTranslations()
  const [product, setProduct] = useState<Product | null>(null);
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const product = await getProducts2(params.productId);
        const suggestedProducts = await getProduct2({
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

  const suggestedProduct2 = suggestedProducts.filter(
    (product: any) => product.productType === "PRODUCT2"
  );
  const suggestedProduct = suggestedProducts.filter(
    (product: any) => product.productType === "PRODUCT"
  );

  return (
    <DetailProduct
      loading={loading}
      data={product}
      images={product?.images}
      otherSuggestions={suggestedProduct2}
      routeOtherSuggestions="product2"
      other={suggestedProduct}
      routeOther="product0"
    />
  );
};

export default Product2;
