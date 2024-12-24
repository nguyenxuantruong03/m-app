import Container from "@/components/ui/container";
import { getProducts11 } from "@/actions/client/products/get-products";
import { getProductDescriptionMeta, getProductNotFoundMessage } from "@/translate/translate-client";
import Product11 from "./components/product11";
import NewsPage from "@/components/(client)/news/news";
import { currentUser } from "@/lib/auth";
export const revalidate = 86400;

interface PropductPageProps {
  params: {
    productId: string;
  };
}
const ProductPage: React.FC<PropductPageProps> = ({ params }) => {
  return (
    <Container>
    <Product11 params={params}/>
    <NewsPage />
</Container>
  );
};

export default ProductPage;

export async function generateMetadata({ params: { productId } }: PropductPageProps) {
  const user = await currentUser();
  const languageToUse = user?.language || "vi";
  const productNotFoundMessage = getProductNotFoundMessage(languageToUse)
  const product = await getProducts11(productId);
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