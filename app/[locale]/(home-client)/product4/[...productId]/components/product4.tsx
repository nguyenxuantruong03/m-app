"use client";
import getProduct4 from "@/actions/client/product/get-product4";
import { getProducts4 } from "@/actions/client/products/get-products";
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
const Product4: React.FC<PropductPageProps> = ({ params }) => {
  const t = useTranslations()
  const [product, setProduct] = useState<Product | null>(null);
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const product = await getProducts4(params.productId);
        const suggestedProducts = await getProduct4({
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

  const suggestedProduct4 = suggestedProducts.filter(
    (product: any) => product.productType === "PRODUCT4"
  );
  const suggestedProduct2 = suggestedProducts.filter(
    (product: any) => product.productType === "PRODUCT2"
  );

  return (
    <DetailProduct
      loading={loading}
      data={product}
      images={product?.images}
      otherSuggestions={suggestedProduct4}
      routeOtherSuggestions="product4"
      other={suggestedProduct2}
      routeOther="product2"
    />
  );
};

export default Product4;
