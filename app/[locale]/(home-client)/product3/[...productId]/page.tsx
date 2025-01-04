import Container from "@/components/ui/container";
import Product3 from "./components/product3";
import NewsPage from "@/components/(client)/news/news";
import { currentUser } from "@/lib/auth";
import { getProducts3 } from "@/actions/client/products/get-products";
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
      <Product3 params={params} />
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
  const product = await getProducts3(productId);

  const title = product ? product.heading : t("productNotFound");
  const description = product
  ? product.description || t("productDescriptionMeta", {heading: product.heading})
  : t("productNotFound");

return {
  title,
  description,
};
}
