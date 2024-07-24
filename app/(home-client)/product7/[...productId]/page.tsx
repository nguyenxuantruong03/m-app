import Container from "@/components/ui/container";
import getProduct7 from "@/actions/client/product/get-product7";
import { getProducts7 } from "@/actions/client/products/get-products";
import getProduct9 from "@/actions/client/product/get-product9";
import DetailProduct from "@/components/(client)/info-product/detail-product";
export const revalidate = 86400;

interface PropductPageProps {
  params: {
    productId: string;
  };
}
const ProductPage: React.FC<PropductPageProps> = async ({ params }) => {
  const [product, suggestedProducts, suggestedProducts9] = await Promise.all([
    getProducts7(params.productId),
    getProduct7({}),
    getProduct9({})
  ]);

  if (!product) {
    return null;
  }

  return (
    <div className="bg-white">
      <Container>
        <DetailProduct
          data={product}
          images={product.images}
          otherSuggestions={suggestedProducts}
          routeOtherSuggestions="product7"
          other={suggestedProducts9}
          routeOther="product9"
        />
      </Container>
    </div>
  );
};

export default ProductPage;

export async function generateMetadata({params :{productId}}:PropductPageProps ) {
  const post = await getProducts7(`${productId}`); //deduped!
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