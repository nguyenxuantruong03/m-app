import Container from "@/components/ui/container";
import Product2 from "./components/product2";
import NewsPage from "@/components/(client)/news/news";
import { getProducts2 } from "@/actions/client/products/get-products";
import { currentUser } from "@/lib/auth";
import { getProductDescriptionMeta, getProductNotFoundMessage } from "@/translate/translate-client";
export const revalidate = 86400;

interface PropductPageProps {
  params: {
    productId: string;
  };
}
const ProductPage: React.FC<PropductPageProps> = ({ params }) => {
  return (
    <Container>
      <Product2 params={params} />
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
  const productNotFoundMessage = getProductNotFoundMessage(languageToUse);
  const product = await getProducts2(productId, languageToUse);
  const productDescriptionMetaMessage = getProductDescriptionMeta(languageToUse,product)

  const title = product ? product.heading : productNotFoundMessage;
  const description = product
  ? product.description || productDescriptionMetaMessage
  : productNotFoundMessage;

return {
  title,
  description,
};
}
