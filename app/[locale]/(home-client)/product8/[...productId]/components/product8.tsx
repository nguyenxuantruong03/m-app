"use client";

import getProduct8 from "@/actions/client/product/get-product8";
import { getProducts8 } from "@/actions/client/products/get-products";
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
const Product8: React.FC<PropductPageProps> = ({ params }) => {
  const t = useTranslations()
  const [product, setProduct] = useState<Product | null>(null);
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const product = await getProducts8(params.productId);
        const suggestedProducts = await getProduct8({
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

  const suggestedProduct8 = suggestedProducts.filter(
    (product: any) => product.productType === "PRODUCT8"
  );
  const suggestedProduct3 = suggestedProducts.filter(
    (product: any) => product.productType === "PRODUCT3"
  );

  return (
    <DetailProduct
      loading={loading}
      data={product}
      images={product?.images}
      otherSuggestions={suggestedProduct8}
      routeOtherSuggestions="product8"
      productlistsuggest2={true}
      other={suggestedProduct3}
      routeOther="product3"
    />
  );
};

export default Product8;
