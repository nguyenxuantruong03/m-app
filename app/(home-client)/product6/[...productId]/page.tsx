import Container from "@/components/ui/container";
import getProduct6 from "@/actions/client/product/get-product6";
import { getProducts6 } from "@/actions/client/products/get-products";
import getProduct1 from "@/actions/client/product/get-product1";
import DetailProduct from "@/components/(client)/info-product/detail-product";
export const revalidate = 86400;

interface PropductPageProps {
  params: {
    productId: string;
  };
}
const ProductPage: React.FC<PropductPageProps> = async ({ params }) => {
  const product = await getProducts6(params.productId);
  const suggestedProducts = await getProduct6({ isFeatured: true });
  const suggestedProduct6 = suggestedProducts.filter(
    (product: any) => product.productType === "PRODUCT6"
  );
  const suggestedProduct1 = suggestedProducts.filter(
    (product: any) => product.productType === "PRODUCT1"
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
          otherSuggestions={suggestedProduct6}
          routeOtherSuggestions="product6"
          other={suggestedProduct1}
          routeOther="product1"
        />
      </Container>
    </div>
  );
};

export default ProductPage;

export async function generateMetadata({params :{productId}}:PropductPageProps ) {
  const post = await getProducts6(`${productId}`); //deduped!
//deduped loại bỏ trùng lặp trong quá trình xây dựng 
  if (!post) {
    return {
      title: "Product Not Found",
    }
  }
  return {
    title: post.heading,
  };
}