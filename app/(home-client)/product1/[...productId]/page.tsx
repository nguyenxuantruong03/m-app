import Container from "@/components/ui/container";
import getProduct1 from "@/actions/client/product/get-product1";
import { getProducts1 } from "@/actions/client/products/get-products";
import getProduct10 from "@/actions/client/product/get-product10";
import DetailProduct from "@/components/(client)/info-product/detail-product";
export const revalidate = 86400;

interface PropductPageProps {
  params: {
    productId: string;
  };
}
const ProductPage: React.FC<PropductPageProps> = async ({ params }) => {
  const product = await getProducts1(params.productId);
  const suggestedProducts = await getProduct1({ isFeatured: true });
  const suggestedProduct1 = suggestedProducts.filter(
    (product: any) => product.productType === "PRODUCT1"
  );
  const suggestedProduct10 = suggestedProducts.filter(
    (product: any) => product.productType === "PRODUCT10"
  );

  if (!product) {
    return null;
  }

  return (
    <div className="bg-white">
      <Container>
        <DetailProduct
          data={product}
          images={product.images}
          otherSuggestions={suggestedProduct1}
          routeOtherSuggestions="product1"
          other={suggestedProduct10}
          routeOther="product10"
        />
      </Container>
    </div>
  );
};

export default ProductPage;

export async function generateMetadata({
  params: { productId },
}: PropductPageProps) {
  const post = await getProducts1(`${productId}`); //deduped!
  //deduped loại bỏ trùng lặp trong quá trình xây dựng
  if (!post) {
    return {
      title: "Product Not Found",
    };
  }
  return {
    title: post.heading,
  };
}
