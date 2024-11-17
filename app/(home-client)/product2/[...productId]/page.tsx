import Container from "@/components/ui/container";
import getProduct2 from "@/actions/client/product/get-product2";
import { getProducts2 } from "@/actions/client/products/get-products";
import getProduct from "@/actions/client/product/get-product";
import DetailProduct from "@/components/(client)/info-product/detail-product";
export const revalidate = 86400;

interface PropductPageProps {
  params: {
    productId: string;
  };
}
const ProductPage: React.FC<PropductPageProps> = async ({ params }) => {
   const product = await getProducts2(params.productId);
  const suggestedProducts = await getProduct2({ isFeatured: true });
  const suggestedProduct2 = suggestedProducts.filter(
    (product: any) => product.productType === "PRODUCT2"
  );
  const suggestedProduct = suggestedProducts.filter(
    (product: any) => product.productType === "PRODUCT"
  );

  if (!product) {
    return null;
  }

  return (
      <Container>
        <DetailProduct
          data={product}
          images={product.images}
          otherSuggestions={suggestedProduct2}
          routeOtherSuggestions="product2"
          other={suggestedProduct}
          routeOther="product0"
        />
      </Container>
  );
};

export default ProductPage;

export async function generateMetadata({params :{productId}}:PropductPageProps ) {
  const post = await getProducts2(`${productId}`); //deduped!
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