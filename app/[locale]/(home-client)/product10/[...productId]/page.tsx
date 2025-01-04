import Container from "@/components/ui/container";
import { getProducts10 } from "@/actions/client/products/get-products";
import NewsPage from "@/components/(client)/news/news";
import Product10 from "./components/product10";
import { currentUser } from "@/lib/auth";
import { getTranslations } from "next-intl/server";
export const revalidate = 86400;

interface PropductPageProps {
  params: {
    productId: string;
  };
}
const ProductPage: React.FC<PropductPageProps> = ({ params }) => {
  return (
    <Container>
      <Product10 params={params} />
      <NewsPage />
    </Container>
  );
};

export default ProductPage;

export async function generateMetadata({
  params: { productId },
}: PropductPageProps) {
  const user = await currentUser();
  const languageToUse = user?.language || "vi";
  const t = await getTranslations({languageToUse, namespace: "product"})
  const product = await getProducts10(productId);

  const title = product ? product.heading : t("productNotFound");
  const description = product
  ? product.description || t("productDescriptionMeta", {heading: product.heading})
  : t("productNotFound");

return {
  title,
  description,
};
}