import Container from "@/components/ui/container";
import getProduct5 from "@/actions/client/product/get-product5";
import { getProducts5 } from "@/actions/client/products/get-products";
import getProduct8 from "@/actions/client/product/get-product8";
import DetailProduct from "@/components/(client)/info-product/detail-product";
export const revalidate = 86400;

interface PropductPageProps {
  params: {
    productId: string;
  };
}
const ProductPage: React.FC<PropductPageProps> = async ({ params }) => {
  const product = await getProducts5(params.productId);
  const suggestedProducts = await getProduct5({ isFeatured: true });
  const suggestedProduct5 = suggestedProducts.filter(
    (product: any) => product.productType === "PRODUCT5"
  );
  const suggestedProduct8 = suggestedProducts.filter(
    (product: any) => product.productType === "PRODUCT8"
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
          otherSuggestions={suggestedProduct5}
          routeOtherSuggestions="product5"
          other={suggestedProduct8}
          routeOther="product8"
        />
      </Container>
    </div>
  );
};

export default ProductPage;

export async function generateMetadata({params :{productId}}:PropductPageProps ) {
  const post = await getProducts5(`${productId}`); //deduped!
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