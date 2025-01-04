"use client";
import getProduct9 from "@/actions/client/product/get-product9";
import { getProducts9 } from "@/actions/client/products/get-products";
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
const Product9: React.FC<PropductPageProps> = ({ params }) => {
  const t = useTranslations()
  const [product, setProduct] = useState<Product | null>(null);
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const product = await getProducts9(params.productId);
        const suggestedProducts = await getProduct9({
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

  const suggestedProduct9 = suggestedProducts.filter(
    (product: any) => product.productType === "PRODUCT9"
  );
  const suggestedProduct10 = suggestedProducts.filter(
    (product: any) => product.productType === "PRODUCT10"
  );

  return (
    <DetailProduct
      loading={loading}
      data={product}
      images={product?.images}
      otherSuggestions={suggestedProduct9}
      routeOtherSuggestions="product9"
      productlistsuggest2={true}
      other={suggestedProduct10}
      routeOther="product10"
    />
  );
};

export default Product9;
