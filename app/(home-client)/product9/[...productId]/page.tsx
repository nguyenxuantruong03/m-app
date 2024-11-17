import Container from "@/components/ui/container";
import getProduct9 from "@/actions/client/product/get-product9";
import { getProducts9 } from "@/actions/client/products/get-products";
import getProduct10 from "@/actions/client/product/get-product10";
import DetailProduct from "@/components/(client)/info-product/detail-product";
export const revalidate = 86400;

interface PropductPageProps {
  params: {
    productId: string;
  };
}
const ProductPage: React.FC<PropductPageProps> = async ({ params }) => {
  const product = await getProducts9(params.productId);
  const suggestedProducts = await getProduct9({ isFeatured: true });
  const suggestedProduct9 = suggestedProducts.filter(
    (product: any) => product.productType === "PRODUCT9"
  );
  const suggestedProduct10 = suggestedProducts.filter(
    (product: any) => product.productType === "PRODUCT10"
  );
  if (!product) {
    return null;
  }

  return (
      <Container>
        <DetailProduct
          data={product}
          images={product.images}
          otherSuggestions={suggestedProduct9}
          routeOtherSuggestions="product9"
          productlistsuggest2={true}
          other={suggestedProduct10}
          routeOther="product10"
        />
      </Container>
  );
};

export default ProductPage;

export async function generateMetadata({params :{productId}}:PropductPageProps ) {
  const post = await getProducts9(`${productId}`); //deduped!
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