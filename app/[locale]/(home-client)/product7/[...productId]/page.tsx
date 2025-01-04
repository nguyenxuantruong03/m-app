import Container from "@/components/ui/container";
import { getProducts7 } from "@/actions/client/products/get-products";
import Product7 from "./components/product7";
import NewsPage from "@/components/(client)/news/news";
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
      <Product7 params={params} />
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
  const product = await getProducts7(productId);

  const title = product ? product.heading : t("productNotFound");
  const description = product
  ? product.description || t("productDescriptionMeta", {heading: product.heading})
  : t("productNotFound");

return {
  title,
  description,
};
}
