import Container from "@/components/ui/container";
import getProduct4 from "@/actions/client/product/get-product4";
import { getProducts4 } from "@/actions/client/products/get-products";
import getProduct2 from "@/actions/client/product/get-product2";
import DetailProduct from "@/components/(client)/info-product/detail-product";
export const revalidate = 86400;

interface PropductPageProps {
  params: {
    productId: string;
  };
}
const ProductPage: React.FC<PropductPageProps> = async ({ params }) => {
  const product = await getProducts4(params.productId);
  const suggestedProducts = await getProduct4({ isFeatured: true });
  const suggestedProduct4 = suggestedProducts.filter(
    (product: any) => product.productType === "PRODUCT4"
  );
  const suggestedProduct2 = suggestedProducts.filter(
    (product: any) => product.productType === "PRODUCT2"
  );
  
  if (!product) {
    return null;
  }

  return (
      <Container>
        <DetailProduct
          data={product}
          images={product.images}
          otherSuggestions={suggestedProduct4}
          routeOtherSuggestions="product4"
          other={suggestedProduct2}
          routeOther="product2"
        />
      </Container>
  );
};

export default ProductPage;

export async function generateMetadata({params :{productId}}:PropductPageProps ) {
  const post = await getProducts4(`${productId}`); //deduped!
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