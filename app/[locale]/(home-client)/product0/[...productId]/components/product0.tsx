"use client";
import getProduct from "@/actions/client/product/get-product";
import { getProducts } from "@/actions/client/products/get-products";
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
const Product0: React.FC<PropductPageProps> = ({ params }) => {
  const t = useTranslations()
  const [product, setProduct] = useState<Product | null>(null);
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const product = await getProducts(params.productId);
        const suggestedProducts = await getProduct({
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

  const suggestedProduct = suggestedProducts.filter(
    (product: any) => product.productType === "PRODUCT"
  );
  const suggestedProduct7 = suggestedProducts.filter(
    (product: any) => product.productType === "PRODUCT7"
  );

  return (
          <DetailProduct
            loading={loading}
            data={product}
            images={product?.images}
            otherSuggestions={suggestedProduct}
            routeOtherSuggestions="product0"
            other={suggestedProduct7}
            routeOther="product7"
          />
  );
};

export default Product0;
